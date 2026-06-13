import { useState } from "react"
import Dialog from "./Dialog"
import { useCreatePerson } from "@/services/api/hooks/usePersons"

interface Props {
  onClose: () => void
}

export default function CreatePersonDialog({ onClose }: Props) {
  const [name, setName] = useState("")
  const [birthYear, setBirthYear] = useState("")
  const [nationality, setNationality] = useState("")
  const [description, setDescription] = useState("")
  const mutation = useCreatePerson()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    mutation.mutate(
      {
        name,
        birth_year: birthYear ? parseInt(birthYear) : null,
        nationality: nationality || null,
        description: description || null,
      },
      { onSuccess: onClose },
    )
  }

  return (
    <Dialog title="Create Person" onClose={onClose}>
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
              Birth Year
            </label>
            <input
              type="number"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              placeholder="1970"
              className="w-full"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-[var(--muted)]">
              Nationality
            </label>
            <input
              type="text"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              placeholder="US"
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
            Failed to create person.
          </p>
        )}
      </form>
    </Dialog>
  )
}
