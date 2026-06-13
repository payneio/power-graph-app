import { useParams, Link } from "react-router-dom"
import { Building2, ArrowLeft } from "lucide-react"
import {
  useOrganization,
  useOrganizationConnections,
} from "@/services/api/hooks/useOrganizations"
import ConnectionList from "@/components/ConnectionList"
import EntityTypeBadge from "@/components/EntityTypeBadge"
import LoadingState from "@/components/LoadingState"
import { formatDateTime } from "@/lib/format"

export default function OrganizationDetail() {
  const { id } = useParams<{ id: string }>()
  const { data: org, isLoading, isError } = useOrganization(id!)
  const { data: connections } = useOrganizationConnections(id!)

  if (isLoading) return <LoadingState />
  if (isError || !org)
    return (
      <p className="py-8 text-center text-sm text-[var(--destructive)]">
        Organization not found.
      </p>
    )

  return (
    <div>
      <Link
        to="/organizations"
        className="mb-4 inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Organizations
      </Link>

      <div className="mb-6 rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10">
            <Building2 className="h-6 w-6 text-[var(--primary)]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold">{org.name}</h1>
              <EntityTypeBadge type={org.type} />
            </div>
            {org.description && (
              <p className="mt-1 text-sm text-[var(--muted)]">
                {org.description}
              </p>
            )}
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-[var(--muted)]">
              {org.jurisdiction && (
                <span>Jurisdiction: {org.jurisdiction}</span>
              )}
              <span>{org.connection_count} connections</span>
              <span>Created: {formatDateTime(org.created_at)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="mb-4 text-sm font-semibold">Connections</h2>
        {connections ? (
          <ConnectionList connections={connections} />
        ) : (
          <LoadingState message="Loading connections..." />
        )}
      </div>
    </div>
  )
}
