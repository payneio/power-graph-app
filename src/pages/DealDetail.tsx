import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Handshake, ArrowLeft, Plus } from "lucide-react"
import { useDeal } from "@/services/api/hooks/useDeals"
import PartyRoleBadge from "@/components/PartyRoleBadge"
import QualityRating from "@/components/QualityRating"
import LoadingState from "@/components/LoadingState"
import { formatDate, formatCurrency } from "@/lib/format"
import AddPartyDialog from "@/components/dialogs/AddPartyDialog"

export default function DealDetail() {
  const { id } = useParams<{ id: string }>()
  const { data: deal, isLoading, isError } = useDeal(id!)
  const [showAddParty, setShowAddParty] = useState(false)

  if (isLoading) return <LoadingState />
  if (isError || !deal)
    return (
      <p className="py-8 text-center text-sm text-[var(--destructive)]">
        Deal not found.
      </p>
    )

  return (
    <div>
      <Link
        to="/deals"
        className="mb-4 inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Deals
      </Link>

      <div className="mb-6 rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10">
            <Handshake className="h-6 w-6 text-[var(--primary)]" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{deal.description}</h1>
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-[var(--muted)]">
              {deal.amount != null && (
                <span className="text-sm font-medium text-[var(--foreground)]">
                  {formatCurrency(deal.amount, deal.currency)}
                </span>
              )}
              {deal.instrument && <span>Instrument: {deal.instrument}</span>}
              {deal.status && <span>Status: {deal.status}</span>}
              {deal.date && <span>Date: {formatDate(deal.date)}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Parties</h2>
          <button
            onClick={() => setShowAddParty(true)}
            className="flex items-center gap-1 rounded-md border border-[var(--border)] px-2.5 py-1.5 text-xs text-[var(--muted)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            <Plus className="h-3 w-3" />
            Add Party
          </button>
        </div>
        {deal.parties.length === 0 ? (
          <p className="py-4 text-center text-sm text-[var(--muted)]">
            No parties yet.
          </p>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {deal.parties.map((party, i) => {
              const path =
                party.entity_type === "Person"
                  ? `/persons/${party.entity_id}`
                  : `/organizations/${party.entity_id}`
              return (
                <div key={`${party.entity_id}-${i}`} className="flex items-center gap-3 py-3">
                  <PartyRoleBadge role={party.role} />
                  <Link
                    to={path}
                    className="text-sm hover:text-[var(--primary)]"
                  >
                    {party.name}
                  </Link>
                  <span className="ml-auto text-xs text-[var(--muted)]">
                    {party.entity_type}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="mb-4 text-sm font-semibold">Sources</h2>
        {deal.sources.length === 0 ? (
          <p className="py-4 text-center text-sm text-[var(--muted)]">
            No sources.
          </p>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {deal.sources.map((source) => (
              <div
                key={source.id}
                className="flex items-center gap-3 py-3"
              >
                <Link
                  to={`/sources/${source.id}`}
                  className="text-sm hover:text-[var(--primary)]"
                >
                  {source.name}
                </Link>
                <span className="rounded bg-[var(--border)] px-1.5 py-0.5 text-[10px] uppercase text-[var(--muted)]">
                  {source.type}
                </span>
                <QualityRating rating={source.quality_rating} />
                {source.url && (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-xs text-[var(--primary)] hover:underline"
                  >
                    Link
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddParty && (
        <AddPartyDialog dealId={id!} onClose={() => setShowAddParty(false)} />
      )}
    </div>
  )
}
