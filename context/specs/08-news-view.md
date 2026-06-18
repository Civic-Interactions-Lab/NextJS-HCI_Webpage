# 08 — News View Redesign

Redesign the `/about/news` route using the HCI Lab brand system. Keep all existing Sanity data fetching — `getAllNews()` and the `News` type — intact. The goal is a playful, on-brand visual redesign of the timeline display, not a data model change.

## Scope & Constraints

- **Keep Sanity fetching**: `news-view.tsx` stays a server component using `getAllNews()`. Do not remove or replace the data fetch.
- **Keep `UploadNews`**: render it below the timeline as before.
- **Keep category filter logic**: the filter state, `useMemo` grouping by year, and `scrollToYear` behavior are all worth keeping — just reskin the UI.
- **Brand system**: Outfit font throughout (no Oxanium `heading-*` or `label-*` classes), Thunder/Well Read/Alabaster colors.
- **GSAP for animations**: use GSAP ScrollTrigger for fade-up/stagger animations. No Framer Motion.

## Design Direction

Match the playful tone of Feature 07 (events view) and Feature 07.1 (about view):
- Bold Outfit headings for page title and year markers
- Well Red accents on category badges, timeline spine, and year labels
- Alabaster backgrounds on card strips or alternating rows
- Large decorative year numbers as watermark-style backgrounds (like the "01", "02" numbers in events cards)

## Sections

### 1. Page Intro

- Small `font-outfit text-sm font-medium text-well-red uppercase tracking-widest` label: "Lab News"
- Bold `font-outfit font-medium text-4xl md:text-5xl text-thunder` heading, e.g. "What's happening in the lab."
- Short body paragraph in `text-p1 text-thunder/70`.

### 2. Category Filter Bar

- Reskin `NewsCategoryLegend` (or inline the filter) using brand colors.
- Category pill buttons: Outfit font, active state uses filled Well Red or the category color, inactive uses Alabaster bg with thunder/60 text.
- Keep the existing `onFilterChange` callback prop interface so the filter logic doesn't change.

### 3. Timeline

The timeline is the centrepiece. Make it playful:

#### Year Anchor Navigation (sidebar)

- Sticky left sidebar on `md+`: replace gray text buttons with bold `font-outfit font-bold text-xl text-thunder/30 hover:text-well-red` year labels.
- Active year (closest to viewport) highlights in Well Red.
- Remove the generic "Year" heading — just show the year numbers stacked vertically.

#### Year Section Headers

- Each year rendered as a large bold number: `font-outfit font-bold text-7xl md:text-9xl text-thunder/8` as a decorative background watermark behind a smaller `font-outfit font-semibold text-2xl text-thunder` foreground label.
- A thin Well Red horizontal rule below the year header.

#### News Item Cards

Replace the plain `flex gap-4` row with styled cards:

- Each card: `bg-white rounded-2xl shadow-sm hover:shadow-md border border-thunder/8 p-5 md:p-6` with a transition.
- Left: colored category dot/stripe (4px left border in the category color) or a colored left accent bar.
- Image (if present): `w-full md:w-48 rounded-xl overflow-hidden object-cover aspect-video` — keep `getImageSrc()`.
- Title: `font-outfit font-medium text-lg text-thunder` — link version: same + `hover:text-well-red underline`.
- Description: `text-p2 text-thunder/65`.
- Category badge: `font-outfit text-xs font-medium text-white px-3 py-1 rounded-full` using existing category color map.
- Date: `font-outfit text-sm text-thunder/40` below description.

#### Timeline Spine

- Replace the plain `w-0.5 bg-primary-red-900` bar with a `w-0.5 bg-well-red/30` spine that connects cards vertically.
- Optional: add a small Well Red dot (`w-2 h-2 rounded-full bg-well-red`) at the top of each card's connector.

### 4. Animation

Use GSAP ScrollTrigger:

- Year section headers: fade up (`opacity 0→1`, `y: 40→0`, duration 0.6, `power2.out`), `start: "top 85%"`, `once: true`.
- News cards: stagger fade-up within each year group (`stagger: 0.1`, same duration/ease), trigger on the year section container.
- Use `immediateRender: false` on any `gsap.from` targeting elements that may already be in view on mount (bottom of page).
- Use `gsap.context()` with cleanup in `useEffect` return.

## File Conventions

- Rename `NewsTimeline.tsx` → `news-timeline.tsx` and `NewsCategoryLegend.tsx` → `news-category-legend.tsx` via two-step git mv.
- `news-view.tsx` stays a server component (no `"use client"` at the view level).
- `news-timeline.tsx` is `"use client"` (it uses state and GSAP).

## Check When Done

- `pnpm build` passes with no TypeScript or lint errors.
- `/about/news` renders `NewsView` with real Sanity data.
- Category filter still works — toggling categories shows/hides items correctly.
- Year sidebar navigation scrolls to the correct section.
- All typography uses Outfit font — no Oxanium `heading-*` or `label-*` classes.
- Brand colors (Thunder, Well Red, Alabaster) used consistently.
- GSAP scroll animations fire for year headers and news cards.
- No Framer Motion imports anywhere in the news module.
- No horizontal overflow on mobile.
- `UploadNews` still renders below the timeline.
