# Spec 09 — Research View Redesign

## Goal

Redesign the research page with three clearly separated, always-visible sections — one per research category — replacing the current accordion pattern. Keep all Sanity data fetching. Apply the same playful Outfit-font brand style used across about/events/news views.

---

## Data Layer (keep as-is)

Use the existing Sanity fetch functions from `src/sanity/lib/research/getResearch.ts`:

- `getGenAIEducationResearch()` → category `"Gen AI & Education"`
- `getAccessibilityTechnologyResearch()` → category `"Accessibility Technology"`
- `getSocialComputingResearch()` → category `"Social Computing"`

Each returns `Research[]`. The `Research` type from `sanity.types` includes:
- `_id`, `title`, `description`, `imageUrl`, `category`, `featured`, `orderRank`
- `actions[]` — array of `{ _key, label, url }` (PDF, Code, Demo, Talk, Cite links)

The existing `ResearchCard` component can be reused or rewritten to match the new style — it currently uses old gray palette and no brand classes. Rewrite it to use brand colors.

Keep the existing YouTube video URLs and static descriptions per category (they're hardcoded in `ResearchAccordionItem.tsx` — copy them into the new components):
- Gen AI & Education: `https://www.youtube.com/embed/Pq-d6wipGRQ?si=wMHHvnP0XLIiwFAc`
- Accessibility Technology: `https://www.youtube.com/embed/QuJmaYuhKH0?si=ZFBhZ6LFrTgnHrwN`
- Social Computing: `https://www.youtube.com/embed/Dv6UydkbkgY?si=xlsh193YsrcW5cgz`

---

## Architecture

Rename all files to kebab-case. Delete old PascalCase files after replacing.

### New files

```
src/modules/research/ui/
  views/
    research-view.tsx          ← rewrite (server component, fetches all 3 categories)
  components/
    research-intro.tsx         ← new: bold Outfit heading intro section
    research-category.tsx      ← new: one section per category (receives data as props)
    research-card.tsx          ← rewrite of ResearchCard.tsx with brand styling
```

Old files to delete:
- `CommonResearchAreas.tsx`
- `ResearchAccordionItem.tsx`
- `ResearchAtHCI.tsx`
- `ResearchCard.tsx`

---

## Section Breakdown

### 1. `research-intro.tsx`

Mirror the intro pattern from `events-intro.tsx` and `about-view.tsx`:

- Small red uppercase label: `"What we explore"`
- Large bold Outfit heading (4xl–6xl): `"AI. Accessibility. Social Computing."`
- Muted body copy about the lab's research mission (pull from the existing `ResearchAtHci` component text)
- Embed the YouTube video from Gen AI section inline here as a featured visual (or keep it inside the Gen AI section — your call, but it should appear prominently)
- No accordion, no border-left treatment from the old design

### 2. `research-category.tsx`

A single reusable component rendered three times — once per category. Each instance gets:

```ts
interface ResearchCategoryProps {
  label: string;           // e.g. "Gen AI & Education"
  tagline: string;         // one-sentence description of the category
  videoUrl: string;        // YouTube embed URL
  videoTitle: string;
  videoDescription: string;
  research: Research[];    // Sanity papers for this category
  accent: string;          // Tailwind color class for the category accent, e.g. "bg-well-red"
  index: number;           // 0 | 1 | 2 — used for stagger offset
}
```

Layout per category section:
- Full-bleed Alabaster strip for every other section (index % 2 === 1), white background for even — same `-mx-6 md:-mx-12` pattern used in `events-gallery.tsx` and `UploadNews`
- Category label as a large watermark number or decorative identifier (like news-timeline year headers) — use the index + 1 as a bold faint background number (`text-9xl text-thunder/5`) with the category name overlaid
- Tagline quote (pull from existing static descriptions) right-aligned with a Well Red right border — mirrors the old `AnswerSection` idea but branded
- YouTube embed: constrained width, rounded corners, `rounded-2xl`
- Research papers grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5` — use the new `research-card.tsx`

### 3. `research-card.tsx`

Rewrite `ResearchCard` with brand styling:
- `bg-white rounded-2xl shadow-sm border border-thunder/8 overflow-hidden hover:shadow-md transition-shadow`
- Image: `h-44 w-full object-cover`
- Title: `font-outfit font-medium text-base text-thunder leading-snug`
- Description: `text-p2 text-thunder/65 leading-relaxed line-clamp-4`
- Action links: pill buttons — `font-outfit text-xs font-medium px-3 py-1 rounded-full bg-alabaster text-thunder/70 hover:bg-well-red hover:text-white transition-colors` with Lucide icons (keep existing icon mapping)
- Remove the expand/collapse "Read more" toggle — just `line-clamp-4` always

---

## Animation (GSAP — consistent with other views)

Use the same pattern established in `events-gallery.tsx`, `news-timeline.tsx`, etc.:

```ts
gsap.registerPlugin(ScrollTrigger);

// In useEffect with gsap.context():
gsap.from(".research-intro", {
  opacity: 0, y: 40, duration: 0.7, ease: "power3.out",
  immediateRender: false,
  scrollTrigger: { trigger: ".research-intro", start: "top bottom", once: true },
});

gsap.from(".category-section", {
  opacity: 0, y: 50, stagger: 0.15, duration: 0.65, ease: "power2.out",
  immediateRender: false,
  scrollTrigger: { trigger: ".category-section", start: "top 85%", once: true },
});

gsap.from(".research-card", {
  opacity: 0, y: 30, stagger: 0.08, duration: 0.5, ease: "power2.out",
  immediateRender: false,
  scrollTrigger: { trigger: ".research-card", start: "top 85%", once: true },
});
```

Always use `immediateRender: false` and `once: true`. No Framer Motion.

---

## Page

Update `src/app/(core)/(tabBar)/research/page.tsx` to import and render the new `ResearchView`. The view itself is a server component — no `"use client"` on the view. Client directive only on child components that use GSAP (`useEffect`).

---

## Brand Constraints

- All text: `font-outfit` (no Oxanium `heading-*` / `label-*` / `font-jetbrains-mono`)
- Colors: Thunder `#292727`, Well Read `#AA2C45`, Alabaster `#F5F5F0`
- Per-category accent colors: Gen AI = `bg-well-red`, Accessibility = `bg-sky`, Social Computing = `bg-grass`
- No shadcn Accordion, no Framer Motion, no raw gray Tailwind colors (`text-gray-*`, `bg-gray-*`)
- `SectionTitle` component is fine to use for subsection headings
