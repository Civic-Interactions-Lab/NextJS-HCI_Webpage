# 07 — Events View Redesign

Redesign the `/about/events` route using the HCI Lab brand system. Import and render `EventsView` in the events page. Match the visual language of the home and about view redesigns.

## Scope & Constraints

- **Events view only**: create or rewrite `events-view.tsx` in `src/modules/about/ui/views/`. Import it in `src/app/(core)/(tabBar)/about/events/page.tsx`.
- **No Sanity image fetching**: use `/images/cover/6-studio.JPG` as a static placeholder for all images.
- **Brand system**: follow the same typography, color, and spacing rules as Features 05 and 06.
- **Map**: render a Mapbox map component. Prioritize showing the location pin/marker in the visible area — center and zoom the map so the pinned location is immediately visible on load without any user interaction.

## Design Principles

- **Brand typography**: `.heading-*` (Oxanium) for section titles, `.label-*` for tags and stat numbers, `.text-p*` (Outfit Light) for body copy. No raw `font-semibold`, `font-bold`, or arbitrary font sizes.
- **Brand colors**: Thunder (`#292727`) for primary text, Well Read (`#AA2C45`) for accents and highlights, Alabaster (`#F5F5F0`) for section backgrounds. No off-brand grays or blues.
- **Breathing room**: consistent `space-y-20` between sections. Each section visually distinct.
- **Consistent with home/about**: use the same accent bar, section title, stat callout, and card patterns established in Features 05 and 06.

## Sections

All components live in `src/modules/about/ui/components/` (or a dedicated `events/` subfolder if needed).

### 1. Events Hero / Intro

- Short intro paragraph describing the lab's events culture.
- `.text-p1` body, Well Red left-border accent block (same pattern as about intro).
- No hero image needed — the page already has a shared Hero from core layout.

### 2. Upcoming Events List

- Display a list of upcoming events as cards.
- Each card: placeholder image, `.label-4` event title, `.text-p2` date + location + short description.
- Well Red accent tag (e.g. "Workshop", "Social", "Conference").
- Cards in a 1→2 col grid (mobile → desktop).
- Use placeholder data (hardcoded array of 3–4 events) — no Sanity fetch.

### 3. Map Section

- Section title: `.heading-4` "Where to Find Us".
- Render a Mapbox map (`react-map-gl`) centered on the lab's location.
- **Map priority**: set initial `longitude`, `latitude`, and `zoom` so the marker is centered and visible immediately — do not rely on user pan/zoom to find the location.
- Place a custom marker (Well Red dot or pin) at the lab's coordinates.
- Map container: `w-full h-[400px]` rounded card, `overflow-hidden`.
- Below the map: address text in `.text-p2`.
- Reuse the existing Mapbox token setup already in the codebase.

### 4. Past Events / Gallery

- Section title: `.heading-4` "Past Events".
- Image grid: 2→3 col, all placeholder images (`/images/cover/6-studio.JPG`).
- Subtle hover scale on each image card.
- Optional: small `.label-5` caption below each image.

## Animation

Use GSAP (not Framer Motion) for all animations:

- **Scroll-triggered fade-up**: every section fades in (`opacity: 0 → 1`) and translates up (`y: 40 → 0`) on viewport entry. `ScrollTrigger` with `start: "top 85%"` and `once: true`.
- **Stagger on lists/grids**: event cards and gallery images stagger in with `stagger: 0.1`.
- **Duration**: `0.6s`, ease `power2.out`.
- Use `gsap.context()` with cleanup in `useEffect` return.
- No Framer Motion imports in any events component.

## File Conventions

- Kebab-case filenames throughout.
- `events-view.tsx` is the top-level view component, imported in the page file.
- Sub-components in `src/modules/about/ui/components/` (prefix with `events-` if needed to avoid name collisions).

## Check When Done

- `pnpm build` passes with no TypeScript or lint errors.
- `/about/events` renders `EventsView` — no old placeholder "Coming Soon" content.
- Map renders with the marker visible on initial load without user interaction.
- All images use `/images/cover/6-studio.JPG` as placeholder.
- All typography uses `.heading-*`, `.label-*`, `.text-p*`.
- Brand colors (Thunder, Well Read, Alabaster) used consistently.
- GSAP scroll-triggered animations fire for every section.
- No Framer Motion imports anywhere in the events module.
- No horizontal overflow on mobile.
