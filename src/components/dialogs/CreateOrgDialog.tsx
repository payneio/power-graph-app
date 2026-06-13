import { useState } from "react"
import Dialog from "./Dialog"
import { useCreateOrganization } from "@/services/api/hooks/useOrganizations"
import type { OrgType } from "@/types"

const ORG_TYPES: OrgType[] = [
  "corporation",
  "llc",
  "nonprofit",
  "government",
  "political",
  "trust",
  "fund",
  "other",
]

interface Props {
  onClose: () => void
}

export default function CreateOrgDialog({ onClose }: Props) {
  const [name, setName] = useState("")
  const [type, setType] = useState<OrgType>("other")
  const [jurisdiction, setJurisdiction] = useState("")
  const [description, setDescription] = useState("")
  const mutation = useCreateOrganization()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    mutation.mutate(
      {
        name,
        type,
        jurisdiction: jurisdiction || null,
        description: description || null,
      },
      { onSuccess: onClose },
    )
  }

  return (
    <Dialog title="Create Organization" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs text-[var(--muted)]">
            Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full"
            autoFocus
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs text-[var(--muted)]">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as OrgType)}
              className="w-full"
            >
              {ORG_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-[var(--muted)]">
              Jurisdiction
            </label>
            <input
              type="text"
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              placeholder="Delaware, US"
              className="w-full"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs text-[var(--muted)]">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full"
          />
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
            disabled={!name || mutation.isPending}
            className="rounded-md bg-[var(--primary)] px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {mutation.isPending ? "Creating..." : "Create"}
          </button>
        </div>
        {mutation.isError && (
          <p className="text-xs text-[var(--destructive)]">
            Failed to create organization.
          </p>
        )}
      </form>
    </Dialog>
  )
}
