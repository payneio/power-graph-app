import { useState } from "react"
import { Plus, FileText, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"
import { useSources } from "@/services/api/hooks/useSources"
import QualityRating from "@/components/QualityRating"
import Pagination from "@/components/Pagination"
import LoadingState from "@/components/LoadingState"
import EmptyState from "@/components/EmptyState"
import CreateSourceDialog from "@/components/dialogs/CreateSourceDialog"
import { formatDate } from "@/lib/format"

const PAGE_SIZE = 24

export default function SourceList() {
  const [skip, setSkip] = useState(0)
  const [showCreate, setShowCreate] = useState(false)
  const { data, isLoading, isError } = useSources(skip, PAGE_SIZE)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Sources</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--primary)]/90"
        >
          <Plus className="h-4 w-4" />
          Create Source
        </button>
      </div>

      {isLoading && <LoadingState />}
      {isError && (
        <p className="py-8 text-center text-sm text-[var(--destructive)]">
          Failed to load sources.
        </p>
      )}

      {data && data.items.length === 0 && (
        <EmptyState
          title="No sources found"
          description="Sources provide provenance for all assertions"
        />
      )}

      {data && data.items.length > 0 && (
        <>
          <div className="space-y-2">
            {data.items.map((source) => (
              <Link
                key={source.id}
                to={`/sources/${source.id}`}
                className="flex items-center gap-4 rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--primary)]/50"
              >
                <FileText className="h-4 w-4 shrink-0 text-[var(--primary)]" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">
                      {source.name}
                    </span>
                    <span className="rounded bg-[var(--border)] px-1.5 py-0.5 text-[10px] uppercase text-[var(--muted)]">
                      {source.type}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-[var(--muted)]">
                    {source.publication_date && (
                      <span>{formatDate(source.publication_date)}</span>
                    )}
                  </div>
                </div>
                <QualityRating rating={source.quality_rating} />
                {source.url && (
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[var(--muted)]" />
                )}
              </Link>
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
        <CreateSourceDialog onClose={() => setShowCreate(false)} />
      )}
    </div>
  )
}
