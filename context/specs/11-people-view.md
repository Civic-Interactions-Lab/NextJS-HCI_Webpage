# Spec 11 — People View Redesign

## Goal

Redesign the People section to match the playful-professional Outfit-font brand established in the About and Research views. The parent `/people` page becomes a rich intro with a headline and a "Want to join us?" CTA at the bottom. Sub-routes (`/people/alumni`, `/people/collaborators`) get simple, consistent grid layouts. Cards are smaller, cleaner, and more modern. The role filter is redesigned as a fun pill-chip bar that collapses gracefully on mobile. Animation is consistent with the rest of the site.

---

## 1. Route Structure (unchanged)

Keep existing routes — no migration needed:

```
src/app/(core)/(tabBar)/people/
  page.tsx           ← rewrite: new parent view (see §3)
  alumni/
    page.tsx         ← rewrite: simple alumni grid (see §4)
  collaborators/
    page.tsx         ← rewrite: simple collaborators grid (see §4)
```

Tab bar and navbar entries are already correct.

---

## 2. Module Structure

Replace old components wholesale. New files:

```
src/modules/people/ui/
  views/
    people-view.tsx            ← rewrite: active members view with filter + grid
    alumni-view.tsx            ← new: alumni grid only
    collaborators-view.tsx     ← new: collaborators grid only
  components/
    person-card.tsx            ← rewrite: new smaller, playful card design
    people-filter.tsx          ← rewrite: new pill-chip filter bar
    people-join-banner.tsx     ← new: "Want to join us?" CTA strip at bottom of parent page
```

Delete `PersonCard.tsx`, `RoleLegend.tsx` after new components are in place.

---

## 3. Parent Page — `/people`

### Part A — Intro Header

Two-column layout matching the research topic hero:

- **Left column** (`flex-1`):
  - Small red uppercase label: `"Temple HCI Lab"`
  - Bold Outfit heading (`text-4xl md:text-5xl lg:text-6xl`):
    `"The people behind the research."` — last word in Well Red
  - Italic tagline (`text-p1 text-thunder/60`):
    `"PhD candidates, masters students, undergrads, and high schoolers — all pushing the boundaries of human-computer interaction."`

- **Right column** (`w-full lg:w-[360px] shrink-0`):
  - Decorative element: a stacked collage of 3–4 overlapping rounded-2xl colored tiles (Thunder, Well Red, Alabaster) with the member count centered in large Outfit bold text. Pure CSS/Tailwind — no image needed.
  - Example: `"24 members"` in `font-outfit font-bold text-5xl text-thunder` centered over layered tiles.

### Part B — Active Members Grid

Full list of active members fetched via `getCurrentMembers()`. Rendered with `PeopleFilter` + `PersonCard` grid (see §5 and §6).

- Grid: `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4`
- Filter bar above the grid (see §5)
- No sidebar — filter is horizontal pill bar

### Part C — Join Banner (`people-join-banner.tsx`)

Full-bleed Alabaster strip at the bottom, identical pattern to `ResearchJoinBanner`:

```
-mx-6 md:-mx-12 px-6 md:px-12 py-16 bg-alabaster
```

Content (centered or left-aligned, consistent with other banners):

- Outfit heading (`text-3xl font-medium`): `"Want to join the lab?"`
- Body copy (`text-p1 text-thunder/65`): `"We're always looking for curious, driven students to join our research community. PhD, masters, undergrad — all welcome."`
- Well Red pill button: `"Apply Now"` → links to `/join`

---

## 4. Sub-Route Pages — Alumni & Collaborators

Both pages are server components that fetch their data and render a simple grid. No filter. No intro header needed — the tab bar + Hero cover provides context.

### Alumni (`/people/alumni`)

- Fetch: `getAlumni()`
- Grid: `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4`
- Card variant: show `person.now` ("Now at: …") below the name if present — displayed as `text-xs text-thunder/50 italic`
- No filter

### Collaborators (`/people/collaborators`)

- Fetch: `getCollaborators()`
- Grid: `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4`
- Card variant: show `person.affiliation` below the name
- No filter

---

## 5. Filter Bar — `people-filter.tsx`

Replace the existing `RoleLegend` popover + desktop section with a single horizontal pill-chip bar that works at all breakpoints.

### Design

- Horizontally scrollable row of pill chips: `flex flex-nowrap gap-2 overflow-x-auto pb-1`
- One "All" chip always first — selected by default, deselects all filters
- One chip per status value (Assistant Professor, PhD Student, Masters Student, Undergraduate, High School)
- Chip style (inactive): `font-outfit text-xs font-medium px-3.5 py-1.5 rounded-full bg-alabaster text-thunder/70 border border-thunder/10 whitespace-nowrap cursor-pointer`
- Chip style (active): swap to `bg-well-red text-white border-well-red`
- Smooth `transition-colors duration-150` on all chips
- No popover, no checkboxes, no shadcn `Button` or `Popover` — raw `<button>` elements only
- Count badge: when filters are active, show `"Showing X of Y"` in `text-xs text-thunder/40 font-outfit` to the right of the chips (or below on very small screens)

### Behavior

- Chips are multi-select toggles — clicking an active chip deselects it
- Clicking "All" clears all active filters
- When any chip is selected, "All" appears unselected
- `onFilterChange(status[])` callback to parent

---

## 6. Person Card — `person-card.tsx`

Smaller, cleaner, and more playful than the current card. No shadcn `Card`. No complex indicator animation.

### Layout

```
rounded-2xl overflow-hidden bg-white border border-thunder/10
hover:shadow-md hover:border-thunder/20 transition-all duration-200
cursor-pointer (only when person.url exists)
```

### Content (top to bottom, centered)

1. **Avatar** — square crop, not circle. `w-full aspect-square object-cover` inside a `relative` wrapper. Fallback: Alabaster bg with initials in `font-outfit font-bold text-2xl text-thunder/40`.
2. **Info strip** — `px-3 py-3` below the image:
   - Name: `font-outfit font-medium text-sm text-thunder leading-snug`
   - Role pill: single small pill badge using the status color from `roleConfig.ts` — `text-[10px] font-outfit font-medium px-2 py-0.5 rounded-full text-white` with `backgroundColor: statusColors[person.status]`
   - `person.affiliation` (if present): `text-[11px] text-thunder/50` below the pill
   - Alumni-only: `person.now` as `text-[10px] text-thunder/40 italic mt-0.5`

### Interaction

- If `person.url` is provided: entire card is clickable, opens in new tab
- Hover: subtle `shadow-md` lift + border darkens — no scale transform
- No expand animation, no indicator circles

---

## 7. Animation

Use **Framer Motion `whileInView` + `staggerChildren`** for all grids — consistent with the research card approach added in Feature 10.3.

### Pattern (reuse exactly)

```tsx
// Container
<motion.div
  className="grid ..."
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.1 }}
  variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
>
  {/* Each card */}
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
    }}
  >
    <PersonCard ... />
  </motion.div>
</motion.div>
```

Apply to:
- Active members grid (parent page)
- Alumni grid
- Collaborators grid

For the intro header, use GSAP (consistent with other view headers — `topic-header-line` pattern from `research-topic-view.tsx`):
```js
gsap.from(".people-header-line", {
  opacity: 0, y: 40, stagger: 0.1, duration: 0.8, ease: "power2.inOut",
  scrollTrigger: { trigger: ".people-header-line", start: "top bottom", once: true },
});
```

---

## 8. Brand Constraints

- All text: `font-outfit` — no `font-jetbrains-mono`, no raw gray Tailwind colors
- No shadcn `Card`, `Button`, `Checkbox`, `Popover` in new components — use raw HTML with Tailwind
- No Framer Motion in the header animation — GSAP only (consistent with other view headers)
- No Framer Motion `AnimatePresence` indicator circles — removed entirely
- Status colors: keep existing `statusColors` from `roleConfig.ts` (Well Red variants)
- Placeholder for the decorative right-column element on parent page: pure CSS layered tiles, no image
- Join banner: identical structure and spacing to `ResearchJoinBanner` in `research-join-banner.tsx`
