import { useState, useEffect } from "react"
import { Search, Plus } from "lucide-react"
import { usePersons } from "@/services/api/hooks/usePersons"
import { useOrganizations } from "@/services/api/hooks/useOrganizations"
import { PersonCard, OrgCard } from "@/components/EntityCard"
import Pagination from "@/components/Pagination"
import LoadingState from "@/components/LoadingState"
import EmptyState from "@/components/EmptyState"
import CreatePersonDialog from "@/components/dialogs/CreatePersonDialog"
import CreateOrgDialog from "@/components/dialogs/CreateOrgDialog"
import type { PersonResponse, OrganizationResponse } from "@/types"

const PAGE_SIZE = 24

export default function EntityList({ type }: { type: "persons" | "organizations" }) {
  const [skip, setSkip] = useState(0)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [showCreate, setShowCreate] = useState(false)

  const isPerson = type === "persons"

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    setSkip(0)
    setSearch("")
    setDebouncedSearch("")
  }, [type])

  const persons = usePersons(
    isPerson ? skip : 0,
    isPerson ? PAGE_SIZE : 1,
    isPerson ? debouncedSearch || undefined : undefined,
  )
  const orgs = useOrganizations(
    !isPerson ? skip : 0,
    !isPerson ? PAGE_SIZE : 1,
    !isPerson ? debouncedSearch || undefined : undefined,
  )

  const isLoading = isPerson ? persons.isLoading : orgs.isLoading
  const isError = isPerson ? persons.isError : orgs.isError
  const total = isPerson ? persons.data?.total ?? 0 : orgs.data?.total ?? 0
  const items = isPerson ? persons.data?.items : orgs.data?.items

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">
          {isPerson ? "Persons" : "Organizations"}
        </h1>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--primary)]/90"
        >
          <Plus className="h-4 w-4" />
          Create
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${type}...`}
          className="w-full rounded-lg py-2 pl-9 pr-3 text-sm"
        />
      </div>

      {isLoading && <LoadingState />}

      {isError && (
        <p className="py-8 text-center text-sm text-[var(--destructive)]">
          Failed to load {type}.
        </p>
      )}

      {items && items.length === 0 && (
        <EmptyState
          title={`No ${type} found`}
          description={
            search
              ? "Try a different search term"
              : `Create your first ${isPerson ? "person" : "organization"}`
          }
        />
      )}

      {items && items.length > 0 && (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {isPerson
              ? (items as PersonResponse[]).map((person) => (
                  <PersonCard key={person.canonical_id} person={person} />
                ))
              : (items as OrganizationResponse[]).map((org) => (
                  <OrgCard key={org.canonical_id} org={org} />
                ))}
          </div>
          <Pagination
            total={total}
            skip={skip}
            limit={PAGE_SIZE}
            onPageChange={setSkip}
          />
        </>
      )}

      {showCreate && isPerson && (
        <CreatePersonDialog onClose={() => setShowCreate(false)} />
      )}
      {showCreate && !isPerson && (
        <CreateOrgDialog onClose={() => setShowCreate(false)} />
      )}
    </div>
  )
}
