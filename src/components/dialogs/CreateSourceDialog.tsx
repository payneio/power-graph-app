import { useState } from "react"
import Dialog from "./Dialog"
import { useCreateSource } from "@/services/api/hooks/useSources"
import type { SourceType } from "@/types"

const SOURCE_TYPES: SourceType[] = [
  "news",
  "government",
  "court",
  "sec",
  "lobbyist",
  "campaign",
  "corporate",
  "academic",
  "other",
]

interface Props {
  onClose: () => void
}

export default function CreateSourceDialog({ onClose }: Props) {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [type, setType] = useState<SourceType>("other")
  const [qualityRating, setQualityRating] = useState("")
  const [publicationDate, setPublicationDate] = useState("")
  const mutation = useCreateSource()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    mutation.mutate(
      {
        name,
        url: url || null,
        type,
        quality_rating: qualityRating ? parseInt(qualityRating) : null,
        publication_date: publicationDate || null,
      },
      { onSuccess: onClose },
    )
  }

  return (
    <Dialog title="Create Source" onClose={onClose}>
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
            placeholder="NY Times article, SEC filing..."
            className="w-full"
            autoFocus
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
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs text-[var(--muted)]">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as SourceType)}
              className="w-full"
            >
              {SOURCE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-[var(--muted)]">
              Quality (1-5)
            </label>
            <select
              value={qualityRating}
              onChange={(e) => setQualityRating(e.target.value)}
              className="w-full"
            >
              <option value="">Unrated</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} star{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs text-[var(--muted)]">
            Publication Date
          </label>
          <input
            type="date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
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
            Failed to create source.
          </p>
        )}
      </form>
    </Dialog>
  )
}
