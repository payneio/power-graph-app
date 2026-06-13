import { Link } from "react-router-dom"
import { Handshake } from "lucide-react"
import type { DealResponse } from "@/types"
import { formatDate, formatCurrency } from "@/lib/format"

interface DealCardProps {
  deal: DealResponse
}

export default function DealCard({ deal }: DealCardProps) {
  return (
    <Link
      to={`/deals/${deal.id}`}
      className="block rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--primary)]/50"
    >
      <div className="flex items-start gap-3">
        <Handshake className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium">{deal.description}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
            {deal.amount != null && (
              <span className="font-medium text-[var(--foreground)]">
                {formatCurrency(deal.amount, deal.currency)}
              </span>
            )}
            {deal.instrument && (
              <span className="rounded bg-[var(--border)] px-1.5 py-0.5">
                {deal.instrument}
              </span>
            )}
            {deal.status && (
              <span className="rounded bg-[var(--border)] px-1.5 py-0.5">
                {deal.status}
              </span>
            )}
            {deal.date && <span>{formatDate(deal.date)}</span>}
            <span>{deal.parties.length} parties</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
