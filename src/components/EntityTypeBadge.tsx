import { cn } from "@/lib/utils"

const colors: Record<string, string> = {
  corporation: "bg-blue-500/10 text-blue-400",
  llc: "bg-cyan-500/10 text-cyan-400",
  nonprofit: "bg-green-500/10 text-green-400",
  government: "bg-amber-500/10 text-amber-400",
  political: "bg-red-500/10 text-red-400",
  trust: "bg-purple-500/10 text-purple-400",
  fund: "bg-indigo-500/10 text-indigo-400",
  other: "bg-gray-500/10 text-gray-400",
}

export default function EntityTypeBadge({ type }: { type: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded px-2 py-0.5 text-xs font-medium",
        colors[type] ?? colors.other,
      )}
    >
      {type}
    </span>
  )
}
