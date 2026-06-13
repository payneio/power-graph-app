import { Network } from "lucide-react"
import SearchBar from "@/components/SearchBar"

export default function SearchHome() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <Network className="mb-4 h-12 w-12 text-[var(--primary)]" />
      <h1 className="mb-2 text-2xl font-bold">Power Graph</h1>
      <p className="mb-8 text-sm text-[var(--muted)]">
        Intelligence research tool — search entities, explore connections
      </p>
      <SearchBar large className="w-full max-w-xl" />
    </div>
  )
}
