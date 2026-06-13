import { Link, Outlet, useLocation } from "react-router-dom"
import {
  Search,
  Users,
  Building2,
  Handshake,
  FileText,
  Network,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { path: "/", icon: Search, label: "Search" },
  { path: "/persons", icon: Users, label: "Persons" },
  { path: "/organizations", icon: Building2, label: "Organizations" },
  { path: "/deals", icon: Handshake, label: "Deals" },
  { path: "/sources", icon: FileText, label: "Sources" },
]

export default function Layout() {
  const location = useLocation()

  return (
    <div className="flex h-screen">
      <nav className="flex w-56 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--card)]">
        <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-4">
          <Network className="h-5 w-5 text-[var(--primary)]" />
          <span className="text-sm font-semibold">Power Graph</span>
        </div>
        <div className="flex flex-1 flex-col gap-1 p-2">
          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                    : "text-[var(--muted)] hover:bg-[var(--border)]/50 hover:text-[var(--foreground)]",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
