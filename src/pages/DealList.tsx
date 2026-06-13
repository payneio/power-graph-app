import { useState } from "react"
import { Plus } from "lucide-react"
import { useDeals } from "@/services/api/hooks/useDeals"
import DealCard from "@/components/DealCard"
import Pagination from "@/components/Pagination"
import LoadingState from "@/components/LoadingState"
import EmptyState from "@/components/EmptyState"
import CreateDealDialog from "@/components/dialogs/CreateDealDialog"

const PAGE_SIZE = 24

export default function DealList() {
  const [skip, setSkip] = useState(0)
  const [showCreate, setShowCreate] = useState(false)
  const { data, isLoading, isError } = useDeals(skip, PAGE_SIZE)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Deals</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--primary)]/90"
        >
          <Plus className="h-4 w-4" />
          Create Deal
        </button>
      </div>

      {isLoading && <LoadingState />}
      {isError && (
        <p className="py-8 text-center text-sm text-[var(--destructive)]">
          Failed to load deals.
        </p>
      )}

      {data && data.items.length === 0 && (
        <EmptyState
          title="No deals found"
          description="Create your first deal to get started"
        />
      )}

      {data && data.items.length > 0 && (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
          <Pagination
            total={data.total}
            skip={skip}
            limit={PAGE_SIZE}
            onPageChange={setSkip}
          />
        </>
      )}

      {showCreate && (
        <CreateDealDialog onClose={() => setShowCreate(false)} />
      )}
    </div>
  )
}
