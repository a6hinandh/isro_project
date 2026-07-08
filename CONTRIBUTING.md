# Contributing to Astra-Q Frontend

## Setup

```bash
npm ci
cp .env.example .env   # Firebase web config
npm run dev            # proxies /api to a local backend on :8000
```

## Before you open a PR

```bash
npm run lint         # eslint — must be clean
npm run typecheck    # tsc -b, strict mode — must be clean
npm run test -- --run
npm run build
```

CI runs all four.

## Ground rules

- **TypeScript strict stays strict** — no `any`, no `@ts-ignore` without a comment explaining why.
- **Styling is Tailwind only.** Design tokens live in `src/index.css` under `@theme`; use them (`text-accent-400`, `glass`, `bg-space-900`) rather than hardcoded colors. No new CSS files.
- **API calls go through `src/lib/api.ts`** (`apiGet/apiPost/…`) so auth headers and error handling stay centralized. Add response types to `src/lib/types.ts`, mirroring the backend's `schemas.py`.
- **Keep the bundle lean.** Heavy dependencies must be lazy-loaded into their own chunk (see `ExplorerPage`). Check `npm run build` output before and after.
- **Components stay small.** Page shells in `pages/`, feature logic in `features/<area>/`, reusable primitives in `components/ui/`.
- **Test user-facing behavior** with Testing Library (queries by role/label), mock the network with `vi.stubGlobal("fetch", …)` — no real API calls in tests.
- Preserve accessibility: interactive elements need accessible names (`aria-label` on icon buttons), modals are `role="dialog"`.
