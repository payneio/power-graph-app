import { cn } from "@/lib/utils"

const colors: Record<string, string> = {
  buyer: "bg-green-500/10 text-green-400",
  seller: "bg-amber-500/10 text-amber-400",
  advisor: "bg-blue-500/10 text-blue-400",
  guarantor: "bg-purple-500/10 text-purple-400",
  investor: "bg-cyan-500/10 text-cyan-400",
  lender: "bg-indigo-500/10 text-indigo-400",
  borrower: "bg-red-500/10 text-red-400",
}

export default function PartyRoleBadge({ role }: { role: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded px-2 py-0.5 text-xs font-medium",
        colors[role] ?? "bg-gray-500/10 text-gray-400",
      )}
    >
      {role}
    </span>
  )
}
