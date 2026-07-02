# Spec 13 — Sponsors View Redesign

## Goal

Redesign the Sponsors section to match the brand system established across About, Research, People, and Pathways views. Keep all existing Sanity data fetching and data structures untouched. Replace the shadcn Card / Popover / Button / Checkbox filter with raw Tailwind. Redesign the sponsor card using `SectionTitle` for the name, Outfit font throughout, and consistent Framer Motion animation. Add a "Become a Sponsor" nav link at the bottom matching the people-nav-card pattern. Simplify the tier filter to a horizontal pill-chip bar identical to `PeopleFilter`.

---

## 1. Route Structure (unchanged)

Keep existing routes — no migration needed:

```
src/app/(core)/(tabBar)/sponsors/
  page.tsx           ← server component, fetches via getSponsors(), renders SponsorsView
  become/
    page.tsx         ← existing, renders BecomeASponsorView
```

---

## 2. Module Structure

Rewrite in place. Rename PascalCase files to kebab-case via two-step git mv:

```
src/modules/sponsors/ui/
  views/
    sponsors-view.tsx            ← rewrite: main view with filter + grid + become-sponsor link
    become-a-sponsor-view.tsx    ← keep as-is (already redesigned)
  components/
    sponsor-card.tsx             ← rewrite: new brand-aligned card (was SponsorCard.tsx)
    sponsor-filter.tsx           ← rewrite: new pill-chip tier filter (was TierLegend.tsx)
    sponsors-become-banner.tsx   ← new: "Become a Sponsor" nav card at bottom of view
```

Delete `SponsorCard.tsx`, `TierLegend.tsx`, `SponsorList.tsx` after replacements are in place.

---

## 3. Sponsors View — `sponsors-view.tsx`

Convert to a client component (needed for filter state). Keep `getSponsors()` fetch in the page server component and pass `sponsors` as a prop.

### Layout (top to bottom)

```
<div className="space-y-12">
  {/* Intro header */}
  {/* Tier filter */}
  {/* Sponsor grid */}
  {/* Become a Sponsor nav card */}
</div>
```

### Part A — Intro Header

Two-element stack (no two-column layout needed — sponsors content is full-width):

- Small red uppercase label (`font-outfit text-sm font-medium text-well-red uppercase tracking-widest`):
  `"Our Sponsors"`
- Bold Outfit heading (`font-outfit font-medium text-4xl md:text-5xl text-thunder leading-tight`):
  `"The organizations that make our work possible."`
- Body copy (`text-p1 text-thunder/65 leading-relaxed max-w-2xl`):
  `"Thank you to our sponsors for your generous support. Your contributions help the HCI Lab continue to grow, innovate, and empower students to make a real impact through research and design."`

Animate with Framer Motion `animate` (above fold):
```tsx
<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
```

### Part B — Tier Filter (`sponsor-filter.tsx`)

See §5.

### Part C — Sponsor Grid

Single-column list (matching current layout — sponsors have detailed info):

```
<div className="flex flex-col gap-6">
  {filtered.map((sponsor, i) => (
    <motion.div key={sponsor._id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" as const, delay: i * 0.07 }}>
      <SponsorCard sponsor={sponsor} />
    </motion.div>
  ))}
</div>
```

Use per-card `animate` (not `whileInView` container) so filter changes re-animate correctly — same fix used in `people-view.tsx`.

### Part D — Become a Sponsor Nav Card

After the sponsor grid, a nav link to `/sponsors/become` using the same `people-nav-card` pattern:

```tsx
<div className="border-t border-thunder/8 mt-8">
  <Link href="/sponsors/become" className="people-nav-card group flex flex-col gap-3 py-8 border-b border-thunder/8">
    <SectionTitle>Become a Sponsor</SectionTitle>
    <p className="text-p1 text-thunder/60 leading-relaxed max-w-xl">
      Partner with the Temple HCI Lab to support student researchers and advance human-centered technology.
    </p>
    <span className="inline-flex items-center gap-1.5 font-outfit text-sm font-semibold uppercase tracking-widest text-thunder group-hover:text-well-red transition-colors w-fit mt-1">
      Learn More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </span>
  </Link>
</div>
```

Add GSAP stagger for `.people-nav-card` in a `useEffect` (same pattern as `people-view.tsx`).

---

## 4. Sponsor Card — `sponsor-card.tsx`

Remove shadcn `Card`. No expand/collapse toggle — display grant info inline in a clean collapsible if grants exist, or just show them always. Simplify to a clean bordered card.

### Layout

```
rounded-2xl border border-thunder/10 bg-white shadow-sm hover:shadow-md hover:border-thunder/20 transition-all duration-200 overflow-hidden
```

### Content

```
<div className="p-5 flex flex-col gap-4">
  {/* Header row: logo left, name + description right */}
  <div className="flex gap-4 items-start">
    {/* Logo */}
    <div className="shrink-0 w-20 h-14 relative rounded-xl overflow-hidden bg-alabaster flex items-center justify-center p-2">
      <Image src={getImageSrc(sponsor.logo)} alt={sponsor.altText || sponsor.name} fill className="object-contain" />
    </div>

    {/* Name + description */}
    <div className="flex flex-col gap-1 flex-1 min-w-0">
      <SectionTitle>{sponsor.name}</SectionTitle>
      <p className="text-p1 text-thunder/65 leading-relaxed">{sponsor.description}</p>
    </div>
  </div>

  {/* Tier pill */}
  {sponsor.tier && (
    <span className="self-start font-outfit text-xs font-medium px-3 py-1 rounded-full bg-alabaster text-thunder/60 border border-thunder/10 uppercase tracking-widest">
      {sponsor.tier}
    </span>
  )}

  {/* Grants list (if any) */}
  {sponsor.grants?.length > 0 && (
    <div className="flex flex-col gap-3 pt-3 border-t border-thunder/8">
      {sponsor.grants.map((grant, i) => (
        <div key={i} className="flex gap-3 items-start">
          <div className="w-1.5 h-1.5 rounded-full bg-well-red mt-2 shrink-0" />
          <div className="flex flex-col gap-0.5">
            <p className="font-outfit font-medium text-sm text-thunder leading-snug">"{grant.title}"</p>
            {grant.grantNumber && <p className="text-[11px] text-thunder/50">#{grant.grantNumber}</p>}
            <p className="text-[11px] text-thunder/50">{formatDateRange(grant.startDate, grant.endDate)} · {formatAmount(grant.amount, grant.currency)}</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
```

If `sponsor.url` exists, wrap the entire card in `<a href={sponsor.url} target="_blank" rel="noopener noreferrer">`.

Keep `formatDateRange` and `formatAmount` helpers — move them into the component file.

---

## 5. Tier Filter — `sponsor-filter.tsx`

Replace the popover/checkbox/shadcn approach with a single horizontal pill-chip bar identical to `PeopleFilter`.

### Tier config (inline in component)

```ts
const TIERS = [
  { key: "supporter", label: "Supporter" },
  { key: "partner",   label: "Partner" },
  { key: "champion",  label: "Champion" },
  { key: "visionary", label: "Visionary" },
];
```

No custom per-tier colors. Use the same brand pill style as `PeopleFilter`:

- Inactive: `bg-alabaster text-thunder/70 border border-thunder/10`
- Active: `bg-well-red text-white border-well-red`
- All chips: `font-outfit text-xs font-medium px-3.5 py-1.5 rounded-full whitespace-nowrap cursor-pointer transition-colors duration-150`

### Behavior

- "All" chip always first — clears all filters
- Multi-select toggles — clicking active chip deselects it
- Show count `"Showing X of Y"` in `text-xs text-thunder/40 font-outfit` when filter is active
- `onFilterChange(tiers: string[])` callback to parent
- No Popover, no Checkbox, no Button from shadcn — raw `<button>` elements only

### Filter logic (in `sponsors-view.tsx`)

```ts
const filtered = useMemo(() => {
  if (activeTiers.length === 0) return sponsors;
  return sponsors.filter((s) => s.tier && activeTiers.includes(s.tier));
}, [sponsors, activeTiers]);
```

---

## 6. Animation

All animations use **Framer Motion** — no GSAP in this view (sponsors view has no parallax hero or GSAP header animation).

| Element | Animation |
|---|---|
| Intro header | `animate` fade-up, `delay: 0`, `duration: 0.7` |
| Sponsor cards | per-card `animate` fade-up with `delay: i * 0.07` (re-animates on filter change) |
| Become a Sponsor nav card | GSAP `.people-nav-card` stagger (matches pattern from people views) |

No `AnimatePresence` — avoid complexity; simple re-render on filter change is sufficient.

---

## 7. Brand Constraints

- All text: `font-outfit` — remove all `font-jetbrains-mono` usages
- Remove all `text-gray-*` / `border-gray-*` — replace with `text-thunder/*` / `border-thunder/*`
- Remove all `text-primary-red-*` — replace with `text-well-red` or `bg-well-red`
- No shadcn `Card`, `Button`, `Checkbox`, `Popover` in new components
- `SectionTitle` for sponsor name in card header
- Tier pill uses Alabaster bg (not per-tier custom colors) — clean and consistent
- Grant list uses a small Well Red dot accent (`bg-well-red`) instead of a filled square
- Keep `getSponsors()` Sanity fetch untouched — only UI layer changes
