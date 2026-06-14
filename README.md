# power-graph-app

Web frontend for [power-graph](../power-graph) — an intelligence research UI for
exploring powerful people and their connections.

A React + Vite + TypeScript single-page app that talks to the power-graph API.
Part of the [castle](https://github.com/payneio) platform.

## Development

```bash
pnpm install      # Install dependencies
pnpm dev          # Start the Vite dev server (http://localhost:5173)
pnpm build        # Build the production bundle to dist/
pnpm preview      # Preview the production build
```

Set the API base URL via `VITE_API_BASE_URL` (in `.env`) to point at a running
power-graph instance.

## License

Copyright (C) 2026 Paul Payne. Licensed under the GNU AGPLv3 — see [LICENSE](LICENSE).
