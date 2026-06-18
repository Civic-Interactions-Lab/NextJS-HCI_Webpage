# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Redesign — in progress

## Current Goal

- TBD

---

## Stack

| Layer       | Technology                      | Version  |
| ----------- | ------------------------------- | -------- |
| Framework   | Next.js + TypeScript            | 16 / 5   |
| UI          | Tailwind CSS + shadcn/ui        | v4       |
| Animation   | GSAP + ScrollTrigger            | 3        |
| CMS         | Sanity                          | v4       |
| Maps        | Mapbox + react-map-gl           | 3 / 8    |
| Deployment  | Docker + nginx + GitHub Actions | —        |
| Webhook     | Python / Flask                  | 3        |

---

## Completed

- **Feature 00 (Initial Build)** — Full site built and deployed. Next.js 16 + React 19 + TypeScript + Tailwind v4 + shadcn/ui. Sanity v4 CMS integrated with Studio at `/studio`; schemas for people, research, news, sponsors, FAQs, testimonials, and conferences; GROQ query helpers per content type; live preview via `SanityLive`. All six public routes implemented as feature modules (home, about, people, research, sponsors, courses, join) with content sourced from Sanity. Shared layout (Navbar, Footer, Hero, TabBar) with route groups `(core)`, `(tabBar)`, `(landing)`. Mapbox map on About page. Framer Motion animations throughout. Site password middleware gate. Docker + nginx deployment on `cis-linux1.temple.edu`; GitHub Actions publishes image to GHCR; Flask webhook service triggers redeploy on push.

---

- **Feature 01 (Base Style System)** — Oxanium (weight 500) added to `next/font/google` and applied as `--font-oxanium` CSS variable. Typography utility classes added to `globals.css` in a clearly separated redesign section: `.heading-1`–`.heading-6` (Oxanium, 60→28px), `.label-1`–`.label-5` (Oxanium, 45→16px), `.text-p1`–`.text-p3` (Outfit Light, 18→14px). Existing styles untouched. Build clean.

---

- **Feature 02 (HCI Navbar)** — `src/components/hci-navbar.tsx` created. Nav data defined inline with typed `NavItem`/`NavSubItem` shape. Sub-routes: About (`/about/events`, `/about/news`, `/about/contact`), People (`/people/alumni`, `/people/collaborators`), Sponsors (`/sponsors/become`). Desktop: Thunder bg, dropdown panel with featured image card + remaining links for items with children, active route highlighted in Well Read. Mobile: full-screen Thunder overlay with single-open accordion. Typography uses `.label-5`/`.label-4`/`.text-p3` classes. Existing `Navbar.tsx` untouched. Build clean.

  - **Feature 02.1 (Navbar refinements, beyond spec)** — Scroll-driven background: navbar starts fully transparent with a `h-32` dark gradient overlay (`from-black/80`) for text legibility, transitions to solid Thunder using a smoothstep curve over 200px of scroll (no hard cutoff). Full viewport width — no `max-w` constraint. Dropdown alignment: About anchors `left-0`, all other dropdowns anchor `right-0` to stay on screen. Left column redesigned to feature the parent route (not first child) with its own image, label, and description. Right column contains all children, `justify-start`. Descriptions added to all parent routes and all child items; displayed below labels in both desktop dropdown and mobile accordion. Desktop dropdown widened to `min-w-[560px]`, left column widened to `w-64`.

---

- **Feature 03 (Hero Cover)** — `Hero.tsx` renamed to `hero.tsx` and rewritten. Static `COVER_MAP` inside the component maps all 12 routes/sub-routes to `/images/cover/6-studio.JPG` (placeholder). Title derived from `usePathname()` path segments — no `?sub=` query params. Single-segment paths render an `<h1>` in `.heading-6`; two-segment paths render a breadcrumb (`Parent / Child`) with the parent in `.text-p2 text-white/60` and the child in `.heading-6 text-white`. Small hero height reduced to `h-[80px] md:h-[100px]`. Backward-compatible: when `height="large"`, `image`, or `title` props are provided (home page usage), falls through to the original large-hero layout. `(tabBar)/layout.tsx` and `(landing)/layout.tsx` both simplified — all Sanity image fetching removed, `<Hero />` rendered with no props. Build clean.

---

- **Feature 04 (Layout Cleanup & Missing Routes)** — Removed `(tabBar)/layout.tsx` and `(landing)/layout.tsx`; both route groups now inherit directly from `(core)/layout.tsx`. Moved `<Hero />` into the core layout so it renders once for all routes. Hero home content (title, subtitle, CTA) hardcoded inside `hero.tsx` for the `pathname === "/"` case; `home-view.tsx` no longer renders Hero or accepts those props. Created six placeholder "Coming Soon" pages for all child routes defined in `hci-navbar.tsx`: `/about/events`, `/about/news`, `/about/contact`, `/people/alumni`, `/people/collaborators`, `/sponsors/become`. Build clean; all 15 routes render correctly.

  - **Feature 04.1 (Layout fixes)** — Lifted `max-w-7xl mx-auto w-full px-6 md:px-12 pt-12 pb-20` from home-view into the core layout `<main>` so all routes share the same content constraints. Removed duplicate `mt-12 pb-20` from home-view's inner wrapper. Extracted `<CallToActionSection />` out of home-view and into the core layout as a `<HomeCta />` client wrapper that renders only on `pathname === "/"`, positioned above the footer.

---

- **Feature 05 (Home View Redesign)** — Rewrote all four home view components in place using the HCI Lab brand system. `QuickIntroduction`: Oxanium `.heading-4` titles with Well Red left accent bars, bordered rounded research area cards with staggered fade-up animation. `RecentPapers`: two-column layout retained, research items in bordered cards with `.label-4` titles, featured image with Alabaster caption strip. `HubCommunitySection`: Alabaster full-bleed background via `-mx-6 md:-mx-12`, removed off-brand floating tags, clean two-column layout with `.text-p1` body. `RecentNewsSection`: unified card grid (1→2→3 col) for both mobile and desktop, image cards with hover scale, `.label-4` titles, Well Red date/featured tags — eliminating the separate mobile/desktop duplicate layouts. All sections use `whileInView` fade-up animations with `staggerChildren: 0.1` on card lists. No raw Tailwind font utilities; no horizontal overflow on mobile. Build clean.

  - **Feature 05.1 (Home Hero Animation — Migrate to GSAP)** — Rewrote `home-hero.tsx` scroll-driven hero with scroll-triggered animations and dropped Framer Motion entirely. Rolling HCI logo entrance animates left→right with growing scale, leaving a clip-path trace that reveals the "Temple HCI Lab" title text. Title chars cascade out on scroll via GSAP stagger timeline. Hero container height shrinks on scroll via a direct scroll listener. Title scales from 1→0.55 over 320px via GSAP ScrollTrigger scrub. Intro box fades/slides in on load then drifts off on scroll. Research cards animate in with staggered entrance and scroll-driven background color + position. "Check out our research focus" heading tracks hero height and fades out instantly at scroll start. All `motion.div`, `useScroll`, and `useTransform` removed; `framer-motion` import dropped. Pure GSAP + ScrollTrigger throughout.

  - **Feature 05.2 (Home Hero Polish, Testimonials & Scroll Restoration)** — Testimonials carousel built with GSAP circular transitions: 3-card layout, side cards scale to 0.82/opacity 0.45/height-capped at 440px, filled Lucide Quote icons, chevron navigation with wrap-around pre-snap. Hero intro box rewritten with clip-path reveal from the right (concurrent with logo/title animation); skips entrance on mid-page reload. Hero research cards fixed for mid-page reload: measurement temporarily restores hero height before `getBoundingClientRect`; cards skip entrance animation and immediately place at correct scroll-driven position if `scrollY >= 20` on mount. Hero fixed container click-blocking fixed: `pointer-events-none` on container, `pointer-events-auto` on intro box; card pointer events disabled via scroll handler when user scrolls past the hero. Full-app `ScrollRestorationManager` removed (was breaking browser-native scroll restoration by setting `manual`); replaced with home-page-scoped `ScrollRestoration` component that saves/restores scroll position via sessionStorage only on the home route, resetting to `auto` on unmount.

  - **Feature 05.3 (Navbar & Home Polish)** — Navbar reworked: scroll-driven background transitions to translucent white (`rgba(255,255,255,0.85)`) with subtle box-shadow; height set to 68px; nav links switched to Outfit `text-lg`; "Temple HCI Lab" label also Outfit. `CallToActionSection.tsx` renamed to `call-to-action-section.tsx`, migrated from Framer Motion to GSAP ScrollTrigger; `home-cta.tsx` wrapper deleted — component used directly in `(home)/layout.tsx`, removed from `(core)/layout.tsx`. Testimonials: "Meet the people →" `SectionLink` added below the title linking to `/people`. Hero research cards: top-right arrow removed; "See more →" arrow animates right on hover. "Learn more about us" button: border-only (no hover background), arrow animates on hover.

---

## In Progress

- None.

## Next Up

- TBD

---

## Open Questions

- None yet.

## Architecture Decisions

- Tailwind v4 CSS-based token config via `@theme inline` in `globals.css` — no `tailwind.config.js`.
- Do not modify generated `src/components/ui/*` files after shadcn installation.
- Sanity is the sole content source of truth — no content hard-coded in component files.
- Server Components by default; `"use client"` only where browser interactivity is required.

## Session Notes

- Next.js 16.0.7 with React 19.2.0 and TypeScript 5.
- Tailwind v4 — config is CSS-only via `@theme inline` in `globals.css`; no `tailwind.config.js`.
- shadcn/ui components live in `src/components/ui/`; do not modify after installation.
- Sanity v4 with `next-sanity` v11; Studio embedded at `/studio` via catch-all route.
- pnpm v11 as package manager; `onlyBuiltDependencies` set for esbuild, sharp, and unrs-resolver to fix blocked build scripts.
- Docker multi-stage build with `output: standalone` in `next.config.ts`.
- Flask webhook runs as a separate Docker Compose project (`webhook/docker-compose.yml`) so a redeploy does not recycle the receiver itself.
