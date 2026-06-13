import { Link } from "react-router-dom"
import { ArrowRight, ArrowLeft } from "lucide-react"
import type { Connection } from "@/types"
import { formatRelationshipLabel } from "@/lib/format"

interface ConnectionListProps {
  connections: Connection[]
}

export default function ConnectionList({ connections }: ConnectionListProps) {
  if (connections.length === 0) {
    return (
      <p className="py-4 text-center text-sm text-[var(--muted)]">
        No connections yet.
      </p>
    )
  }

  return (
    <div className="divide-y divide-[var(--border)]">
      {connections.map((conn, i) => {
        const entityId = conn.entity.canonical_id
        const isPerson = conn.entity.labels.includes("Person")
        const path = isPerson
          ? `/persons/${entityId}`
          : `/organizations/${entityId}`

        return (
          <div key={`${conn.type}-${entityId}-${i}`} className="flex items-center gap-3 py-3">
            {conn.direction === "outgoing" ? (
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[var(--muted)]" />
            ) : (
              <ArrowLeft className="h-3.5 w-3.5 shrink-0 text-[var(--muted)]" />
            )}
            <span className="rounded bg-[var(--primary)]/10 px-2 py-0.5 text-xs font-medium text-[var(--primary)]">
              {formatRelationshipLabel(conn.type)}
            </span>
            <Link
              to={path}
              className="truncate text-sm text-[var(--foreground)] hover:text-[var(--primary)]"
            >
              {conn.entity.name}
            </Link>
            <span className="ml-auto text-xs text-[var(--muted)]">
              {isPerson ? "Person" : "Organization"}
            </span>
          </div>
        )
      })}
    </div>
  )
}
