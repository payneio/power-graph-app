# power-graph-app

Intelligence research frontend for the Power Graph service.

## Stack

React 19, Vite 7, TypeScript 5.9, Tailwind CSS 4, React Query v5, lucide-react

## Commands

```bash
pnpm install          # Install deps
pnpm run dev          # Dev server on :5174
pnpm run build        # Production build → dist/
pnpm run lint         # ESLint
pnpm run preview      # Preview production build
```

## API

Dev server proxies `/api` → `localhost:9003` (power-graph service).
Production served by Caddy at `/power-graph-app`, API at `/power-graph`.
