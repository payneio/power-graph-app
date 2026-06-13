import { useState } from "react"
import Dialog from "./Dialog"
import { useCreateDeal } from "@/services/api/hooks/useDeals"
import { useSources } from "@/services/api/hooks/useSources"

interface Props {
  onClose: () => void
}

export default function CreateDealDialog({ onClose }: Props) {
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [instrument, setInstrument] = useState("")
  const [status, setStatus] = useState("")
  const [sourceId, setSourceId] = useState("")
  const mutation = useCreateDeal()
  const { data: sourcesData } = useSources(0, 100)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    mutation.mutate(
      {
        description,
        date: date || null,
        amount: amount ? parseFloat(amount) : null,
        currency,
        instrument: instrument || null,
        status: status || null,
        source_id: sourceId,
      },
      { onSuccess: onClose },
    )
  }

  return (
    <Dialog title="Create Deal" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs text-[var(--muted)]">
            Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={2}
            className="w-full"
            autoFocus
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs text-[var(--muted)]">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1000000"
              className="w-full"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-[var(--muted)]">
              Currency
            </label>
            <input
              type="text"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs text-[var(--muted)]">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-[var(--muted)]">
              Instrument
            </label>
            <input
              type="text"
              value={instrument}
              onChange={(e) => setInstrument(e.target.value)}
              placeholder="loan, equity, grant"
              className="w-full"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs text-[var(--muted)]">
            Status
          </label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="completed, pending, rumored"
            className="w-full"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-[var(--muted)]">
            Source * (provenance)
          </label>
          <select
            value={sourceId}
            onChange={(e) => setSourceId(e.target.value)}
            required
            className="w-full"
          >
            <option value="">Select a source...</option>
            {sourcesData?.items.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.type})
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
            disabled={!description || !sourceId || mutation.isPending}
            className="rounded-md bg-[var(--primary)] px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {mutation.isPending ? "Creating..." : "Create"}
          </button>
        </div>
        {mutation.isError && (
          <p className="text-xs text-[var(--destructive)]">
            Failed to create deal.
          </p>
        )}
      </form>
    </Dialog>
  )
}
