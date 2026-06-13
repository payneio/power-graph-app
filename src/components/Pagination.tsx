import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaginationProps {
  total: number
  skip: number
  limit: number
  onPageChange: (skip: number) => void
}

export default function Pagination({
  total,
  skip,
  limit,
  onPageChange,
}: PaginationProps) {
  const currentPage = Math.floor(skip / limit) + 1
  const totalPages = Math.ceil(total / limit)

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between pt-4">
      <span className="text-xs text-[var(--muted)]">
        {skip + 1}–{Math.min(skip + limit, total)} of {total}
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(0, skip - limit))}
          disabled={currentPage === 1}
          className={cn(
            "rounded p-1.5 transition-colors",
            currentPage === 1
              ? "text-[var(--border)]"
              : "text-[var(--muted)] hover:bg-[var(--border)]/50 hover:text-[var(--foreground)]",
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="px-2 text-xs text-[var(--muted)]">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(skip + limit)}
          disabled={currentPage === totalPages}
          className={cn(
            "rounded p-1.5 transition-colors",
            currentPage === totalPages
              ? "text-[var(--border)]"
              : "text-[var(--muted)] hover:bg-[var(--border)]/50 hover:text-[var(--foreground)]",
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
