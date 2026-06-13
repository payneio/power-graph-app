import { useState } from "react"
import Dialog from "./Dialog"
import { useAddPersonAlias } from "@/services/api/hooks/usePersons"

interface Props {
  entityId: string
  entityType: "persons" | "organizations"
  onClose: () => void
}

export default function AddAliasDialog({ entityId, onClose }: Props) {
  const [name, setName] = useState("")
  const [lang, setLang] = useState("")
  const [script, setScript] = useState("")
  const mutation = useAddPersonAlias(entityId)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    mutation.mutate(
      {
        name,
        lang: lang || null,
        script: script || null,
      },
      { onSuccess: onClose },
    )
  }

  return (
    <Dialog title="Add Alias" onClose={onClose}>
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
            placeholder="Alternative name"
            className="w-full"
            autoFocus
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs text-[var(--muted)]">
              Language
            </label>
            <input
              type="text"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              placeholder="en, ru, zh..."
              className="w-full"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-[var(--muted)]">
              Script
            </label>
            <input
              type="text"
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="latin, cyrillic..."
              className="w-full"
            />
          </div>
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
            {mutation.isPending ? "Adding..." : "Add Alias"}
          </button>
        </div>
        {mutation.isError && (
          <p className="text-xs text-[var(--destructive)]">
            Failed to add alias.
          </p>
        )}
      </form>
    </Dialog>
  )
}
