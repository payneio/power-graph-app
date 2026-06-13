import { useState } from "react"
import Dialog from "./Dialog"
import { useAddPersonRef } from "@/services/api/hooks/usePersons"

interface Props {
  entityId: string
  entityType: "persons" | "organizations"
  onClose: () => void
}

export default function AddRefDialog({ entityId, onClose }: Props) {
  const [system, setSystem] = useState("")
  const [externalId, setExternalId] = useState("")
  const [url, setUrl] = useState("")
  const mutation = useAddPersonRef(entityId)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    mutation.mutate(
      {
        system,
        external_id: externalId,
        url: url || null,
      },
      { onSuccess: onClose },
    )
  }

  return (
    <Dialog title="Add External Reference" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs text-[var(--muted)]">
            System *
          </label>
          <input
            type="text"
            value={system}
            onChange={(e) => setSystem(e.target.value)}
            required
            placeholder="opensecrets, sec, wikipedia..."
            className="w-full"
            autoFocus
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-[var(--muted)]">
            External ID *
          </label>
          <input
            type="text"
            value={externalId}
            onChange={(e) => setExternalId(e.target.value)}
            required
            placeholder="Identifier in the external system"
            className="w-full"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-[var(--muted)]">URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
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
            disabled={!system || !externalId || mutation.isPending}
            className="rounded-md bg-[var(--primary)] px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {mutation.isPending ? "Adding..." : "Add Reference"}
          </button>
        </div>
        {mutation.isError && (
          <p className="text-xs text-[var(--destructive)]">
            Failed to add reference.
          </p>
        )}
      </form>
    </Dialog>
  )
}
