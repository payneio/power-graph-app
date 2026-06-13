import { Star } from "lucide-react"

export default function QualityRating({ rating }: { rating: number | null }) {
  if (rating == null) return <span className="text-xs text-[var(--muted)]">Unrated</span>

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "text-[var(--border)]"
          }`}
        />
      ))}
    </div>
  )
}
