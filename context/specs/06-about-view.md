# 06 — About View Redesign

Redesign the `/about` route and its existing components using the HCI Lab brand system. This is a visual and layout pass — no new sections, no sub-route logic.

## Scope & Constraints

- **About view only**: `about-view.tsx` renders only the About page content. Remove any sub-route extraction or conditional rendering based on pathname.
- **No Sanity image fetching**: remove all `getAbout*Image()` calls. Use `/images/cover/6-studio.JPG` as a static placeholder for every image, including carousels (array of the same image repeated).
- **Remove TestimonialList**: delete the `<TestimonialList />` section entirely from the view. Do not render it.
- **Brand system**: follow the same typography, color, and spacing rules as the home view redesign (Feature 05).

## Design Principles

- **Brand typography**: `.heading-*` (Oxanium) for section titles, `.label-*` for tags and stat numbers, `.text-p*` (Outfit Light) for body copy. No raw `font-semibold`, `font-bold`, or arbitrary font sizes.
- **Brand colors**: Thunder (`#292727`) for primary text, Well Read (`#AA2C45`) for accents and highlights, Alabaster (`#F5F5F0`) for section backgrounds. No off-brand grays or blues.
- **Breathing room**: consistent `space-y-20` between sections. Each section visually distinct via background shift, padding, or divider.
- **Playful but professional**: use asymmetric layouts, accent bars, colored stat callouts, and subtle rotations where appropriate — never at the expense of readability or brand consistency.

## Sections to Redesign

All components live in `src/modules/about/ui/components/`. Redesign each in place.

### 1. Intro / HighlightStatement

- Replace with a clean two-column layout: large `.heading-3` accent phrase on the left (e.g. "THE Temple HCI Lab") in Well Red, and `.text-p1` body copy on the right.
- Add a subtle Well Red left border or underline to the accent phrase.
- No card or box needed — open, airy layout.

### 2. CommunityResearch

- Section title: `.heading-4` with a Well Read accent bar on the left.
- Stat callouts (`77 undergrads`, `~45 active researchers`): large `.label-1` or `.label-2` number in Well Read, followed by `.text-p2` descriptor inline or below. Place stats in a 2-col grid or a highlighted Alabaster strip.
- Body copy: `.text-p1`.
- Right column: use the placeholder image (`/images/cover/6-studio.JPG`) in a rounded card, slightly rotated or offset for a playful feel.

### 3. StudioTime

- Section title: `.heading-4`.
- Layout: image left, text right on desktop; stacked on mobile.
- Replace Sanity image fetch with `/images/cover/6-studio.JPG` as a static `<Image>` — no `getImageSrc`, no props threading.
- Keep the slight rotation/tape-tag aesthetic if it fits the playful tone; otherwise replace with a clean rounded image card.
- Body: `.text-p1`.

### 4. Leadership

- Section title: `.heading-4`.
- Stat callout (`30+ students presented`): `.label-2` in Well Read + `.text-p2` descriptor.
- Replace Sanity image with `/images/cover/6-studio.JPG` static placeholder.
- Layout: text left, image right on desktop.

### 5. LearningOutcomes

- Section title: `.heading-4`.
- Each outcome card: `.label-3` category badge in the card's accent color (keep existing DESIGN/LEAD/BUILD/SHIP/MEASURE categories), `.text-p2` description.
- Cards arranged in a playful asymmetric grid (not a rigid equal-column grid) — vary border-radius per card as currently done.
- Alabaster background for the section strip.

### 6. LabValues (Image Carousel)

- Section title: `.heading-4`.
- Remove Sanity image fetching. Pass a static array of `{ src: "/images/cover/6-studio.JPG", alt: "Lab values" }` repeated 4–5 times.
- Keep the carousel interaction but ensure it uses the placeholder images.

### 7. Video Section

- The lab has a vertical-aspect-ratio video. Treat it as a portrait (9:16) embed.
- Layout: center the video in a constrained column (`max-w-xs` or `max-w-sm` mx-auto) so the portrait format doesn't stretch awkwardly.
- Surround it with a two-column layout on desktop: video on one side, descriptive text (`.heading-4` title + `.text-p1` body) on the other. On mobile, stack with video below the text.
- Use an `<iframe>` or `<video>` tag depending on whether the source is a URL or a local file — confirm before building.

## Animation

Use GSAP (not Framer Motion) for all animations:

- **Scroll-triggered fade-up**: every section fades in (`opacity: 0 → 1`) and translates up (`y: 40 → 0`) as it enters the viewport. Use `ScrollTrigger` with `start: "top 85%"` and `once: true`.
- **Stagger on lists/grids**: cards and stat items stagger in with `gsap.utils.toArray` + staggered `from` tweens (`stagger: 0.1`).
- **Duration**: `0.6s`, ease `power2.out`.
- **Stat numbers**: optionally animate count-up on scroll-enter for the large stat callouts.
- Use `gsap.context()` with cleanup in `useEffect` return.
- No Framer Motion imports in any about component.

## File Conventions

- Use kebab-case filenames: rename any `PascalCase.tsx` components to `kebab-case.tsx` as you touch them.
- No new files unless a genuinely new sub-component is needed. Redesign in place.

## Check When Done

- `pnpm build` passes with no TypeScript or lint errors.
- `/about` renders correctly — no sub-route logic, no Sanity image fetches.
- `TestimonialList` is not rendered.
- All images use `/images/cover/6-studio.JPG` as placeholder.
- All typography uses `.heading-*`, `.label-*`, `.text-p*` — no raw Tailwind font utilities.
- Brand colors (Thunder, Well Read, Alabaster) used consistently.
- GSAP scroll-triggered animations fire on scroll for every section.
- No Framer Motion imports anywhere in the about module.
- No horizontal overflow on mobile.
- Video section handles portrait aspect ratio gracefully on all breakpoints.
