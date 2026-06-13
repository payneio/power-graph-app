import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Search } from "lucide-react"
import { useSearch } from "@/services/api/hooks/useSearch"
import type { SearchResult } from "@/types"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  large?: boolean
  className?: string
}

export default function SearchBar({ large, className }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const { data: results } = useSearch(debouncedQuery)

  function navigateToResult(result: SearchResult) {
    const id = result.canonical_id ?? result.id
    const type = result.type.toLowerCase()
    if (type === "person") navigate(`/persons/${id}`)
    else if (type === "organization") navigate(`/organizations/${id}`)
    else if (type === "deal") navigate(`/deals/${id}`)
    else if (type === "source") navigate(`/sources/${id}`)
    setOpen(false)
    setQuery("")
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="relative">
        <Search
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]",
            large ? "h-5 w-5" : "h-4 w-4",
          )}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search persons, organizations, deals..."
          className={cn(
            "w-full border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] rounded-lg",
            large ? "py-3 pl-11 pr-4 text-base" : "py-2 pl-9 pr-3 text-sm",
          )}
        />
      </div>
      {open && results && results.length > 0 && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] shadow-lg">
          {results.map((result, i) => (
            <button
              key={`${result.type}-${result.canonical_id ?? result.id}-${i}`}
              onClick={() => navigateToResult(result)}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-[var(--border)]/50 first:rounded-t-lg last:rounded-b-lg"
            >
              <span className="rounded bg-[var(--primary)]/10 px-1.5 py-0.5 text-xs font-medium text-[var(--primary)]">
                {result.type}
              </span>
              <span className="truncate">{result.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
