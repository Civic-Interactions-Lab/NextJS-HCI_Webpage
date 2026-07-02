# 03 — Hero Cover

Replace the Sanity-driven hero with a static image map. Modify the existing `Hero.tsx` in place — rename the file from `Hero.tsx` to `hero.tsx` and rewrite its internals. Update the tabBar layout to no longer pass any props to the hero.

## Files to Modify

- `src/components/Hero.tsx` → rename to `src/components/hero.tsx` and rewrite.
- `src/app/(core)/(tabBar)/layout.tsx` → remove all hero image fetching and pass no props to `<Hero />`.

## Static Image Map

Define all cover images inline inside `hci-hero.tsx`. No Sanity fetching, no props for image data. Every route and sub-route has its own entry — all pointing to the same placeholder for now.

```ts
const COVER_MAP: Record<string, string> = {
  "/about":               "/images/cover/6-studio.JPG",
  "/about/events":        "/images/cover/6-studio.JPG",
  "/about/news":          "/images/cover/6-studio.JPG",
  "/about/contact":       "/images/cover/6-studio.JPG",
  "/research":            "/images/cover/6-studio.JPG",
  "/people":              "/images/cover/6-studio.JPG",
  "/people/alumni":       "/images/cover/6-studio.JPG",
  "/people/collaborators":"/images/cover/6-studio.JPG",
  "/courses":             "/images/cover/6-studio.JPG",
  "/sponsors":            "/images/cover/6-studio.JPG",
  "/sponsors/become":     "/images/cover/6-studio.JPG",
  "/join":                "/images/cover/6-studio.JPG",
}
```

Resolve the image by exact pathname match first, then fall back to the parent segment (e.g., `/about/events` → `/about` if no exact match exists).

## Title Display

Derive the title from the URL path segments — no `?sub=` query params. Use `usePathname()`.

Rules:
- Split the pathname by `/`, filter empty strings.
- First segment = parent label (e.g., `about` → `About`).
- Second segment (if present) = child label (e.g., `events` → `Events`).
- Capitalise each word by splitting on `-` (e.g., `lab-values` → `Lab Values`).

Display:
- If only one segment: show the parent label as `<h1>`.
- If two segments: show `Parent / Child` where `Parent` is dimmer and `/ Child` is the primary bold text. Use the same breadcrumb pattern as the current `Hero.tsx` but driven by path segments, not `?sub=`.

Example:
```
pathname = "/about"         → h1: "About"
pathname = "/about/events"  → breadcrumb: "About / Events"
pathname = "/people/alumni" → breadcrumb: "People / Alumni"
```

## Height

Reduce to roughly one fifth of the current hero height. Current small hero is `h-[300px]`. Target: `h-[80px] md:h-[100px]`. The image should still fill the container with `object-cover`.

Keep the dark overlay (`bg-black/40`) and the bottom-left title layout from the existing Hero.

## Typography

- Parent label (breadcrumb prefix): `.text-p2` (Outfit Light, 16px), `text-white/60`.
- Child label / main title: `.heading-6` (Oxanium Medium, 28px), `text-white`.
- No CTA button. No subtitle. No `showCTA` prop.

## Component API

`Hero` (default export from `hero.tsx`) takes no props. It reads `usePathname()` internally.

Mark `"use client"` — it uses `usePathname`.

## Check When Done

- `pnpm build` passes with no TypeScript or lint errors.
- `Hero.tsx` is renamed to `hero.tsx`; all existing imports updated to match.
- `(tabBar)/layout.tsx` no longer fetches Sanity image data or passes props to `<Hero />`.
- Cover image resolves correctly for each route and sub-route.
- Breadcrumb renders from path segments, not query params.
- Hero height is visibly reduced to roughly one fifth of the original.
- Typography uses `.heading-6` and `.text-p2` classes.
