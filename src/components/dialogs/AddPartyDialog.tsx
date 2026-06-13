import { useState, useEffect } from "react"
import Dialog from "./Dialog"
import { useAddDealParty } from "@/services/api/hooks/useDeals"
import { useSearch } from "@/services/api/hooks/useSearch"
import type { PartyRole } from "@/types"

const ROLES: PartyRole[] = [
  "buyer",
  "seller",
  "advisor",
  "guarantor",
  "investor",
  "lender",
  "borrower",
]

interface Props {
  dealId: string
  onClose: () => void
}

export default function AddPartyDialog({ dealId, onClose }: Props) {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [entityId, setEntityId] = useState("")
  const [entityType, setEntityType] = useState("Person")
  const [entityName, setEntityName] = useState("")
  const [role, setRole] = useState<PartyRole>("buyer")
  const mutation = useAddDealParty(dealId)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const { data: results } = useSearch(debouncedQuery, 10)

  function selectEntity(id: string, name: string, type: string) {
    setEntityId(id)
    setEntityName(name)
    setEntityType(type === "Organization" ? "Organization" : "Person")
    setSearchQuery("")
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    mutation.mutate(
      { entity_id: entityId, entity_type: entityType, role },
      { onSuccess: onClose },
    )
  }

  return (
    <Dialog title="Add Party to Deal" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs text-[var(--muted)]">
            Entity *
          </label>
          {entityId ? (
            <div className="flex items-center gap-2">
              <span className="rounded bg-[var(--primary)]/10 px-2 py-1 text-sm text-[var(--primary)]">
                {entityName}
              </span>
              <button
                type="button"
                onClick={() => {
                  setEntityId("")
                  setEntityName("")
                }}
                className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                Change
              </button>
            </div>
          ) : (
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a person or organization..."
                className="w-full"
                autoFocus
              />
              {results && results.length > 0 && searchQuery && (
                <div className="absolute top-full z-10 mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] shadow-lg">
                  {results.map((r, i) => (
                    <button
                      key={`${r.canonical_id ?? r.id}-${i}`}
                      type="button"
                      onClick={() =>
                        selectEntity(
                          r.canonical_id ?? r.id ?? "",
                          r.name,
                          r.type,
                        )
                      }
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[var(--border)]/50"
                    >
                      <span className="rounded bg-[var(--border)] px-1.5 py-0.5 text-[10px] uppercase">
                        {r.type}
                      </span>
                      {r.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs text-[var(--muted)]">
            Role *
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as PartyRole)}
            className="w-full"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!entityId || mutation.isPending}
            className="rounded-md bg-[var(--primary)] px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {mutation.isPending ? "Adding..." : "Add Party"}
          </button>
        </div>
        {mutation.isError && (
          <p className="text-xs text-[var(--destructive)]">
            Failed to add party.
          </p>
        )}
      </form>
    </Dialog>
  )
}
