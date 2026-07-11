# Contributing to AstraQ Frontend

Thank you for considering contributing to AstraQ! This guide will help you get started.

## Development Setup

```bash
git clone https://github.com/a6hinandh/AstraQ_Frontend.git
cd AstraQ_Frontend
npm ci
cp .env.example .env   # Firebase web config
npm run dev            # Proxies /api to a local backend on :8000
```

## Development Workflow

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all checks pass (see below)
4. Open a pull request with a clear description

## Before Opening a PR

All of the following must pass:

```bash
npm run lint         # ESLint — must be clean
npm run typecheck    # tsc -b, strict mode — must be clean
npm run test -- --run
npm run build        # Production build must succeed
```

CI runs all four checks on every pull request.

## Code Standards

### TypeScript

- **Strict mode stays strict** — no `any`, no `@ts-ignore` without a comment explaining why.
- Define response types in `src/lib/types.ts`, mirroring the backend's Pydantic schemas.
- Prefer explicit return types on exported functions.

### Styling

- **Tailwind CSS only.** No new CSS files, no inline `style` attributes unless dynamic.
- Design tokens live in `src/index.css` under `@theme`. Use semantic token names (`text-accent-400`, `glass`, `bg-space-900`) rather than hardcoded hex colors.
- Mobile-first responsive design: start with mobile layout, add `sm:`, `md:`, `lg:` breakpoints.

### Components

- Page shells in `pages/`, feature logic in `features/<area>/`, reusable primitives in `components/ui/`.
- Keep components focused — under 200 lines is a good target.
- Colocate feature-specific hooks and types with their feature.

### API Integration

- All API calls go through `src/lib/api.ts` (`apiGet`/`apiPost`/...) so auth headers and error handling stay centralized.
- Never hardcode API URLs — use the configured base URL.

### Performance

- Heavy dependencies must be lazy-loaded into their own chunk (see `ExplorerPage` pattern).
- Check `npm run build` output before and after adding dependencies.
- Avoid unnecessary re-renders — memoize expensive computations.

### Accessibility

- Interactive elements need accessible names (`aria-label` on icon-only buttons).
- Modals use `role="dialog"` with proper focus management.
- Color contrast must meet WCAG AA standards against the dark background.
- Keyboard navigation must work for all interactive elements.

### Testing

- Test user-facing behavior with Testing Library (queries by role/label).
- Mock the network with `vi.stubGlobal("fetch", ...)` — no real API calls in tests.
- Focus on interaction flows and edge cases, not implementation details.

## Commit Messages

Use imperative mood in the subject line:

```
Add voice input toggle to chat interface
Fix sidebar not closing on mobile navigation
Update knowledge graph color tokens
```

## Questions?

Open a GitHub issue for questions about contributing. We're happy to help!
