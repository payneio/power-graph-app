import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Users, Plus, ArrowLeft } from "lucide-react"
import { usePerson, usePersonConnections } from "@/services/api/hooks/usePersons"
import ConnectionList from "@/components/ConnectionList"
import LoadingState from "@/components/LoadingState"
import { formatDateTime } from "@/lib/format"
import AddAliasDialog from "@/components/dialogs/AddAliasDialog"
import AddRefDialog from "@/components/dialogs/AddRefDialog"

export default function PersonDetail() {
  const { id } = useParams<{ id: string }>()
  const { data: person, isLoading, isError } = usePerson(id!)
  const { data: connections } = usePersonConnections(id!)
  const [showAlias, setShowAlias] = useState(false)
  const [showRef, setShowRef] = useState(false)

  if (isLoading) return <LoadingState />
  if (isError || !person)
    return <p className="py-8 text-center text-sm text-[var(--destructive)]">Person not found.</p>

  return (
    <div>
      <Link
        to="/persons"
        className="mb-4 inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Persons
      </Link>

      <div className="mb-6 rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10">
            <Users className="h-6 w-6 text-[var(--primary)]" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{person.name}</h1>
            {person.description && (
              <p className="mt-1 text-sm text-[var(--muted)]">{person.description}</p>
            )}
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-[var(--muted)]">
              {person.nationality && (
                <span>Nationality: {person.nationality}</span>
              )}
              {person.birth_year && <span>Born: {person.birth_year}</span>}
              <span>{person.connection_count} connections</span>
              <span>Created: {formatDateTime(person.created_at)}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setShowAlias(true)}
            className="flex items-center gap-1 rounded-md border border-[var(--border)] px-2.5 py-1.5 text-xs text-[var(--muted)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            <Plus className="h-3 w-3" />
            Add Alias
          </button>
          <button
            onClick={() => setShowRef(true)}
            className="flex items-center gap-1 rounded-md border border-[var(--border)] px-2.5 py-1.5 text-xs text-[var(--muted)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            <Plus className="h-3 w-3" />
            Add Reference
          </button>
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

      {showAlias && (
        <AddAliasDialog
          entityId={id!}
          entityType="persons"
          onClose={() => setShowAlias(false)}
        />
      )}
      {showRef && (
        <AddRefDialog
          entityId={id!}
          entityType="persons"
          onClose={() => setShowRef(false)}
        />
      )}
    </div>
  )
}
