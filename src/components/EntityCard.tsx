import { Link } from "react-router-dom"
import { Users, Building2 } from "lucide-react"
import type { PersonResponse, OrganizationResponse } from "@/types"
import { formatDateTime } from "@/lib/format"

interface PersonCardProps {
  person: PersonResponse
}

export function PersonCard({ person }: PersonCardProps) {
  return (
    <Link
      to={`/persons/${person.canonical_id}`}
      className="block rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--primary)]/50"
    >
      <div className="flex items-start gap-3">
        <Users className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium">{person.name}</h3>
          {person.description && (
            <p className="mt-1 truncate text-xs text-[var(--muted)]">
              {person.description}
            </p>
          )}
          <div className="mt-2 flex items-center gap-3 text-xs text-[var(--muted)]">
            {person.nationality && <span>{person.nationality}</span>}
            {person.birth_year && <span>b. {person.birth_year}</span>}
            <span>{person.connection_count} connections</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

interface OrgCardProps {
  org: OrganizationResponse
}

export function OrgCard({ org }: OrgCardProps) {
  return (
    <Link
      to={`/organizations/${org.canonical_id}`}
      className="block rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--primary)]/50"
    >
      <div className="flex items-start gap-3">
        <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-medium">{org.name}</h3>
            <EntityTypeBadge type={org.type} />
          </div>
          {org.description && (
            <p className="mt-1 truncate text-xs text-[var(--muted)]">
              {org.description}
            </p>
          )}
          <div className="mt-2 flex items-center gap-3 text-xs text-[var(--muted)]">
            {org.jurisdiction && <span>{org.jurisdiction}</span>}
            <span>{org.connection_count} connections</span>
            <span>{formatDateTime(org.created_at)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function EntityTypeBadge({ type }: { type: string }) {
  return (
    <span className="rounded bg-[var(--border)] px-1.5 py-0.5 text-[10px] font-medium uppercase text-[var(--muted)]">
      {type}
    </span>
  )
}
