import { Loader2 } from "lucide-react"

export default function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 className="h-6 w-6 animate-spin text-[var(--primary)]" />
      <p className="mt-3 text-sm text-[var(--muted)]">{message}</p>
    </div>
  )
}
