# 05 — Home View Redesign

Redesign `home-view.tsx` and its child components using the HCI Lab brand system. Keep the existing section structure and Sanity data fetching intact — this is a visual and layout pass only, not a content change.

## Design Principles

- **Brand typography**: use `.heading-*` (Oxanium) for all section titles, `.label-*` for tags and labels, `.text-p*` (Outfit Light) for body copy. No raw `font-semibold`, `font-bold`, or arbitrary font sizes.
- **Brand colors**: Thunder (`#292727`) for primary text, Well Read (`#AA2C45`) for accents/highlights, Alabaster (`#F5F5F0`) for section backgrounds. Deep Red (`#620719`) only for hover states — never on Thunder backgrounds.
- **Breathing room**: consistent vertical rhythm between sections (`gap` or `space-y` of `16`–`20` on desktop). Each section should feel distinct with clear visual separation — padding, background shift, or divider.
- **Heading hierarchy**: every section has one clear `.heading-*` title. No section should look like plain body text. Subheadings use the next level down.
- **Modern + fun**: subtle background alternation (white ↔ Alabaster), accent underlines or colored labels, clean card layouts. Avoid heavy shadows or skeuomorphic effects.

## Sections to Redesign

All sections live in `src/modules/home/ui/components/`. Redesign each in place — do not rename files or move components.

### 1. QuickIntroduction
- Title: `.heading-4` in Thunder, with a Well Read accent bar on the left or underline.
- Body: `.text-p1` in Thunder/70, max-width constrained for readability (`max-w-2xl` or `max-w-3xl`).
- Clean, spacious layout — no card or box needed.

### 2. RecentPapers (Featured Research)
- Section title: `.heading-4`.
- Each research card: clean white card with subtle border (`border border-thunder/10`), rounded corners (`rounded-2xl`), generous padding.
- Research title: `.label-3` in Thunder.
- Description: `.text-p2` in Thunder/60.
- "Learn more" link: Well Read color, `.label-5`.
- The featured image (if present) spans the top of the card or sits beside the text.
- On mobile: stack cards vertically, full width, no horizontal overflow.

### 3. HubCommunitySection
- Section title: `.heading-4`.
- Background: Alabaster (`bg-[#F5F5F0]`) to distinguish from adjacent white sections. Use negative horizontal margins (`-mx-6 md:-mx-12`) to bleed the background edge-to-edge while keeping content aligned.
- Stats or highlights: large `.label-1` or `.label-2` numbers in Well Read, description in `.text-p2`.
- Image: full-bleed or rounded, not clipped.

### 4. RecentNewsSection
- Section title: `.heading-4`.
- News cards: horizontal layout on desktop (image left, text right), stacked on mobile.
- Card image: `rounded-xl`, fixed height, `object-cover`.
- News title: `.label-4` in Thunder.
- Date/tag: `.label-5` in Well Read.
- Excerpt: `.text-p3` in Thunder/60.
- No horizontal overflow on mobile — cards must be full-width and contained.

## Animation

Use Framer Motion for consistent animations across all sections:

- **Scroll-triggered fade-up**: every section and card fades in and translates up (`y: 24 → 0`, `opacity: 0 → 1`) as it enters the viewport. Use `whileInView` with `once: true` and `viewport: { margin: "-80px" }`.
- **Duration**: `0.5s`, easing `easeOut`.
- **Stagger**: when rendering a list of cards, stagger children by `0.1s` using `variants` + `staggerChildren`.
- **No layout-shift animations** (no width/height changes during load).
- Apply animations at the section level and individual card level — not on text runs inside cards.

## Mobile Fixes

- No horizontal overflow anywhere. Every card, image, and container must be `w-full` and `overflow-hidden` or `overflow-x-hidden` on the section wrapper.
- Cards that are currently side-by-side on desktop must stack (`flex-col`) on mobile.
- Text must not overflow its container — use `line-clamp-2` or `line-clamp-3` on card descriptions where needed.
- Tap targets (buttons, links) must be at least 44px tall.

## Check When Done

- `pnpm build` passes with no TypeScript or lint errors.
- All sections use `.heading-*`, `.label-*`, `.text-p*` typography classes — no raw Tailwind font utilities.
- No horizontal scroll on mobile at any section.
- Framer Motion fade-up animations fire on scroll for each section and stagger correctly on card lists.
- Brand colors (Thunder, Well Read, Alabaster) used consistently — no off-brand grays or blues.
- Section backgrounds alternate or are visually distinct.
