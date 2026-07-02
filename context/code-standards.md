# Code Standards

## General

- Keep modules small and single-purpose.
- Fix root causes — do not layer workarounds.
- Do not mix unrelated concerns in one component or route.
- Respect the system boundaries defined in `architecture-context.md`.

## TypeScript

- Strict mode is required throughout the project.
- Avoid `any`; use explicit interfaces or narrowly scoped types.
- Validate unknown external input at system boundaries before trusting it.
- Use `interface` for object contracts.

## Next.js

- Default to React Server Components.
- Add `"use client"` only when the component needs browser interactivity or hooks.
- Keep route handlers focused on a single responsibility.

## Styling

- Use CSS custom property tokens defined in `globals.css` — no raw Tailwind color classes like `zinc-*` or hardcoded hex values.
- Reference tokens through their Tailwind utility names: `bg-base`, `text-copy-primary`, `border-surface-border`, `text-brand`, etc.
- Maintain the border radius scale: `rounded-xl` for small elements, `rounded-2xl` for cards, `rounded-3xl` for modals.

## API Routes

- Validate and parse request input before any logic runs.
- Return consistent, predictable response shapes.
- Keep route handlers thin — push complexity into shared modules.

## Data and Storage

- All content is managed through Sanity Studio — do not hard-code content in component files.
- GROQ queries belong in `src/sanity/lib/<content-type>/` — one file per content type.
- Components receive data as props; they do not call Sanity directly.
- Use `next-sanity` live preview where real-time content updates are needed.

## File Organization

- `src/modules/<feature>/ui/views/` — top-level page compositions per feature; one view per route.
- `src/modules/<feature>/ui/components/` — feature-scoped components used only within that module.
- `src/components/` — shared layout and UI components (Navbar, Footer, Hero, etc.); no business logic.
- `src/components/ui/` — shadcn/ui primitives; do not modify these files.
- `src/sanity/lib/` — GROQ query helpers and Sanity client configuration.
- `src/lib/` — shared utilities and helpers.
- Name files after the responsibility they contain, not the technology.
