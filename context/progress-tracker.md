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

- **Feature 06 (About View Redesign)** — `about-view.tsx` rewritten as a client component; all Sanity image fetching removed; `TestimonialList` removed. `/about/page.tsx` simplified to render `<AboutView />` only — sub-route switching (`?sub=`) removed. All five sections redesigned with brand system and GSAP ScrollTrigger animations (no Framer Motion): `community-research.tsx` (stat cards in Alabaster, vertical video in constrained portrait container), `studio-time.tsx` (placeholder image + SectionLink to /about/events), `leadership.tsx` (left-border stats in Well Red), `learning-outcomes.tsx` (Alabaster full-bleed strip, asymmetric rounded outcome cards), `lab-values.tsx` (static 5-image carousel). All components renamed to kebab-case; old PascalCase files deleted. Mobile fixes: `overflow-x-hidden`, `w-full` video wrapper for centering, `md:rotate-*` on images.

---

- **Feature 07 (Events View Redesign)** — `events-view.tsx` rewritten as a client component; all Sanity image fetching removed. `/about/events/page.tsx` updated to render `<EventsView />` — "Coming Soon" placeholder replaced. Three sections built with brand system and GSAP ScrollTrigger animations: `events-intro.tsx` (bold Outfit heading "Hackathons. Open Houses. Showcases." with Well Red accent), `events-upcoming.tsx` (featured card + 3-card grid with numbered Outfit cards, colored tag badges in Well Red/gold/sky/grass), `events-gallery.tsx` (polaroid-style cards with alternating rotations on Alabaster strip). Map removed. All text uses Outfit font throughout. No Framer Motion; no Sanity fetches; no horizontal overflow.

  - **Feature 07.1 (About View Playful Style Pass)** — Applied same Outfit-font playful style from events view to all about components. `about-view.tsx` intro rewritten as bold Outfit heading ("Research. Community. Human-Centered Computing.") with Well Red label and body copy. `community-research.tsx` stat cards redesigned as 2-col grid with large Outfit bold numbers (`text-5xl`). `leadership.tsx` stat numbers switched to `font-outfit font-bold text-3xl`. `studio-time.tsx` link switched to `font-outfit`. `learning-outcomes.tsx` category badges switched to `font-outfit font-bold uppercase`.

---

- **Feature 08 (News View Redesign)** — `NewsTimeline.tsx` → `news-timeline.tsx` and `NewsCategoryLegend.tsx` → `news-category-legend.tsx` renamed via two-step git mv. `news-timeline.tsx` rewritten with: bold Outfit intro heading ("What's happening in the lab."), branded category filter pills (Alabaster inactive / colored active, no shadcn dependencies), playful year section headers with large watermark number (`text-9xl text-thunder/5`) behind foreground label + Well Red rule, news item cards with colored left border per category, Outfit font throughout, GSAP ScrollTrigger fade-up for year headers and cards. `news-view.tsx` updated to import from kebab-case paths. `/about/news/page.tsx` updated to render `NewsView` — "Coming Soon" removed. All Sanity fetching and filter/grouping logic preserved.

  - **Feature 08.1 (Testimonials Smooth Height Transition)** — Side cards (abs !== 0) now cap quote text at ~6 lines via `maxHeight: 176px` on the `[data-quote]` element; center card expands to unconstrained `2000px`. Both card `maxHeight` and quote `maxHeight` animate in GSAP `onUpdate` using `this.ratio` so the text height grows/shrinks in sync with card movement — no abrupt snap. Transition duration bumped to 0.75s for a smoother feel. Code cleanup: `QUOTE_SIDE_H`/`QUOTE_FULL_H` hoisted to module-level constants, `lerp` helper extracted, duplicate nav buttons collapsed to a single mapped array.

---

- **Feature 09 (Research View Redesign)** — `CommonResearchAreas.tsx`, `ResearchAccordionItem.tsx`, `ResearchAtHCI.tsx`, `ResearchCard.tsx` deleted. New files: `research-intro.tsx` (bold Outfit heading "AI. Accessibility. Social Computing." with Well Red label and mission copy), `research-category.tsx` (reusable section component rendered 3× — alternating Alabaster/white full-bleed strips, faint watermark index number, right-border tagline, YouTube embed, paper grid), `research-card.tsx` (brand-styled card — Outfit title, `line-clamp-4` description, pill action buttons in Alabaster/Well Red). `research-view.tsx` rewritten as server component fetching all 3 categories via existing Sanity queries. All three category accent colors: Gen AI = Well Red, Accessibility = Sky, Social Computing = Grass. GSAP ScrollTrigger animations with `immediateRender: false` and `once: true` throughout. No Framer Motion, no shadcn Accordion, no raw gray Tailwind colors.

---

- **Feature 10 (Research Layout & Sub-Routes)** — Research moved from `(landing)` to `(tabBar)` route group. Three sub-routes added: `/research/gen-ai-education`, `/research/accessibility-technology`, `/research/social-computing`, each fetching from Sanity and rendering via shared `ResearchTopicView`. Overview page (`/research`) rewritten with: placeholder hero image + heading, 3 teaser category cards (`ResearchOverviewCard`), featured video, Alabaster join banner (`ResearchJoinBanner`). Navbar updated with Research as parent + 3 children. `TabBarClient` updated with research case using real paths (not `?sub=`) and `isActive` updated to handle both real-path and query-param patterns. Home hero cards and `quick-introduction.tsx` updated to route each card to its matching topic. New components: `research-hero.tsx`, `research-overview-card.tsx`, `research-join-banner.tsx`, `research-topic-view.tsx`. Old `(landing)/research` deleted.

  - **Feature 10.2 (Topic Page Videos)** — Added featured video section to each research topic page, placed after the other-topics link list and before the join banner. Video data (`videoUrl`, `videoTitle`, `videoDescription`) sourced from `CATEGORIES` in `research-data.ts` by matching the current label. Video URLs updated: Gen AI → `Pq-d6wipGRQ`, Accessibility → `QuJmaYuhKH0`, Future of Work → `pUbHCAl1vco`. Layout matches the research overview video block: left half iframe (16:9, rounded), right column with "Featured" label, title, and description. GSAP ScrollTrigger fade-up animation applied.

  - **Feature 10.1 (Research Polish)** — Interactive GSAP parallax logo added to research overview hero (`research-hero-logo.tsx`): mouse-driven ±28px XY + ±12deg 3D tilt on logo, counter-moving rings for depth, idle float loops. Topic pages restructured to two-column hero matching overview layout; three distinct animated logos: Gen AI (mouse parallax + tilt), Accessibility (orbiting dots + rotating dashed ring + pulse), Future of Work (idle ripples + hover burst). Research area icons updated from PNG images to Lucide icons (`BrainCircuit`, `PersonStanding`, `WandSparkles`) across home hero cards, quick-introduction cards, and all three topic logo components. "Social Computing" renamed to "Future of Work" throughout: navbar, tab bar, `research-data.ts`, `research-topic-view.tsx`, `research-intro.tsx`, hero banner (via `LABEL_OVERRIDES` in `hero.tsx`); description updated to reflect Future of Work content. Home hero research area icon size doubled to `w-10 h-10`. Category order locked to Gen AI → Accessibility → Future of Work everywhere.

  - **Feature 10.3 (Research Card Animation & Bug Fixes)** — Home hero floating card bug fixed: added `gsap.killTweensOf(card)` at the top of the scroll handler so entrance tweens don't conflict with the scroll-driven position updates when navigating to the page mid-scroll. Research card borders improved in topic view: `border border-thunder/15` with `hover:shadow-lg hover:border-thunder/25 transition-all duration-200` for clear visual separation. Research card entrance animation replaced: removed GSAP ScrollTrigger stagger (which fired mid-scroll leaving cards partially animated) in favor of Framer Motion `whileInView` + `staggerChildren: 0.1` with `viewport={{ once: true, amount: 0.1 }}` — animation now fires once when the grid enters view and plays to completion independently of scroll speed.

---

- **Feature 11 (People View Redesign)** — All three people routes redesigned to match the brand system from About and Research views. Parent `/people`: two-column intro header ("The people behind the research." with Well Red last word, decorative layered tile collage showing live member count), horizontal scrollable pill-chip filter bar (All + one chip per status, no shadcn, active state in Well Red), 4-column grid of new `PersonCard`, Alabaster "Want to join the lab?" banner at bottom linking to `/join`. `/people/alumni` and `/people/collaborators`: simple server-component grids using the same `PersonCard` — no filter, no header overhead. New `PersonCard`: square avatar crop, role pill badge using `statusColors`, affiliation below, alumni `now` field in italic — clickable as `<a>` only when URL exists. New `PeopleFilter`: raw `<button>` pill chips, horizontal scroll, no popover or checkboxes. Animation: Framer Motion `whileInView` + `staggerChildren: 0.07` for all grids; GSAP `people-header-line` stagger for intro header. All old `PeopleView`, `PersonCard.tsx`, `RoleLegend.tsx` replaced; no shadcn `Card`, `Button`, `Checkbox`, or `Popover` in new components. Outfit font throughout.

---

- **Feature 12 (Pathways View)** — Renamed "Courses" → "Pathways" across all routing, modules, nav, and Sanity config. New route: `/pathways` (replacing `/courses`). New module: `src/modules/pathways/` with `pathways-data.ts` (courses, companies, universities, organizations), `course-card.tsx`, `course-list.tsx`, `job-outcomes.tsx`, `other-opportunities.tsx`, and `pathways-view.tsx`. View structure: intro two-column hero (heading + studio image), "Start with a Course" section with intro text + 5 featured course cards grid (CIS 1014/3603/3655/3755/4398) + catalog link, Job Outcomes with role pill badges + company/university logo grids on Alabaster, Other Opportunities full-bleed Alabaster strip with org logos. Framer Motion only — `animate` for above-fold header, `whileInView` + `staggerChildren` for course cards, `whileInView` fade-up for sections below. Updated: `hci-navbar.tsx`, `navItems.ts`, `hero.tsx`, `sanity.config.ts`, `imageSettings.ts`, `pathwaysImages.ts`. Deleted `src/modules/courses/` and `src/app/(core)/(landing)/courses/`.

  - **Feature 12.1 (Pathways & People Polish)** — Applied `SectionTitle` (colored dots + Outfit heading) to all section headings in the Pathways view: "Start with a Course", "Job Outcomes", "Other Opportunities"; removed the red uppercase label tags above each ("Your Pathway Starts Here", "Where You'll Go", "Beyond the Classroom"). Research overview topic links (`research-view.tsx`) switched from plain `h3` to `SectionTitle` with GSAP stagger entrance (`.other-card`, `stagger: 0.12`) matching the topic sub-page pattern. People section nav links added to all three people views: `/people` shows Alumni + Collaborators links; `/people/alumni` shows Current Members + Collaborators; `/people/collaborators` shows Current Members + Alumni — all using `SectionTitle`, tagline, arrow, and GSAP stagger. New `CollaboratorCard` component: Well Red circular avatar with initials, name, affiliation, bordered card with shadow — replacing the generic `PersonCard` in the collaborators grid. TypeScript `ease: "easeOut" as const` fix applied across all Framer Motion variant objects site-wide.

---

- **Feature 13 (Sponsors View Redesign)** — Rewrote sponsors section to match the brand system. `SponsorCard.tsx`, `TierLegend.tsx`, `SponsorList.tsx` deleted; replaced with kebab-case counterparts. `sponsor-card.tsx`: shadcn `Card` removed, logo left / `SectionTitle` name + description right, grants listed inline with Well Red dot accent, bordered card with shadow, wraps in `<a>` when URL exists. `sponsor-filter.tsx`: shadcn Popover/Button/Checkbox removed; horizontal pill-chip bar (All + Supporter/Partner/Champion/Visionary), Well Red active state, matching `PeopleFilter` pattern. `sponsors-view.tsx`: converted to client component accepting `sponsors` prop; Outfit intro header with red label + heading + body; per-card Framer Motion `animate` fade-up with index delay (re-animates on filter); "Become a Sponsor" nav card at bottom using `people-nav-card` GSAP stagger pattern + `SectionTitle`. Page `sponsors/page.tsx` simplified to server component that fetches and passes sponsors as prop. All `font-jetbrains-mono`, `text-gray-*`, `border-gray-*`, `text-primary-red-*` removed.

  - **Feature 13.1 (Component refactors & polish)** — Extracted two shared components used across multiple views. `CtaBanner` (`src/components/cta-banner.tsx`): replaces `ResearchJoinBanner` and `PeopleJoinBanner` (both deleted); accepts `label`, `title`, `body`, `ctaLabel`, `ctaHref` props; handles internal `<Link>` vs external/mailto `<a>` automatically; used in research-view, research-topic-view, people-view, and become-a-sponsor-view. `ViewIntroHeader` (`src/components/view-intro-header.tsx`): replaces the repeated two-column intro header (red label + large h1 + body + optional CTA link + image) across sponsors-view, become-a-sponsor-view, pathways-view, and people-view; accepts `label`, `titlePrefix`, `titleAccent`, `body`, `imageSrc`, `imageAlt`, optional `ctaLabel`/`ctaHref`; image sized at `460px × 340px` (horizontal landscape). `SectionTitle` moved outside the card container in both `sponsor-card.tsx` and tier cards in `become-a-sponsor-view.tsx`. Hero breadcrumb: parent text bumped to `text-xl md:text-2xl`; `LABEL_OVERRIDES` map added so `/sponsors/become` renders "Become a Sponsor" instead of "Become".

---

- **Feature 14 (Join View Redesign)** — Rewrote `/join` page to match brand system. `join-view.tsx` converted from async server component to `"use client"` component accepting `faqs: FaqsQueryResult` prop; shadcn `Accordion`, `AnimatedAccordionItem`, and `CallToActionSection` all removed. FAQ section replaced with a semantic `<dl>`/`<dt>`/`<dd>` structure — all answers always visible, fully SEO-indexable without JavaScript; questions use `SectionTitle`, answers use `text-p1 text-thunder/65`, items separated by `border-thunder/8` dividers. Framer Motion `whileInView` stagger on the `<dl>` container with `fadeUp` per item. `ViewIntroHeader` added at the top ("Have questions before joining us?"). `CtaBanner` ("Ready to Apply?") moved to the page level in `join/page.tsx` so it renders full-width outside the content container, with the Google Forms application link. Data fetching moved from view to page server component.

---

- **Feature 15 (Remove Unused Components & Dependencies)** — Deleted all unused/leftover files identified after the redesign: `HighlightStatement.tsx`, `TabBarClient.tsx`, `PersonCard.tsx` (replaced by `person-card.tsx`), `RoleLegend.tsx`, `research-category.tsx`, `research-intro.tsx`, `research-overview-card.tsx`, `HCIOpenHouse.tsx`, `SocialEvents.tsx`, and five unused Sanity imageSettings query helpers (`joinImages`, `pathwaysImages`, `peopleImages`, `researchImages`, `sponsorsImages`). Removed `imageSettings.ts` Sanity schema and its registration from `schemaTypes/index.ts`. Extracted the Convex + Clerk annotation/feedback overlay system to `~/Desktop/hci-annotator/` (with convex backend, all annotation components, providers, and a README for future Chrome extension work), then stripped it from the project — deleted `src/modules/annotations/`, `src/providers/ConvexClientProvider.tsx`, and the `convex/` root directory. Uninstalled `@clerk/nextjs` and `convex` packages via pnpm. Removed `ClerkProvider` wrapper from `src/app/layout.tsx`. Both layouts (`(home)` and `(core)`) cleaned of `AnnotationOverlayWrapper`. Build clean with no errors.

  - **Feature 15.1 (Accessibility & Performance Audit)** — Ran Unlighthouse CI site-wide against the production standalone build (15 routes). Fixed all Lighthouse accessibility failures: changed `<h3>` card titles to `<p>` in `home-hero.tsx` and `quick-introduction.tsx` (heading order h1→h3 skip); added `aria-label` to prev/next carousel buttons in `home-testimonials-section.tsx`; removed mismatched `aria-label` attributes from footer nav links and added `py-2` touch target padding in `Footer.tsx`. Accessibility score improved from 88 → 96 across all routes. Performance improvements: lazy-loaded Google Maps iframe in `LocationMap.tsx` via IntersectionObserver (only injects `src` when scrolled into view, shows pulse placeholder until then) — `/about` score improved from 35 → 63; added correct `sizes` props to `Image fill` components in `events-gallery.tsx` (`50vw/33vw`) and `news-timeline.tsx` (`100vw/192px`) — `/about/news` improved from 46 → 63. Site averages after fixes: Performance 69, Accessibility 97, Best Practices 95, SEO 99.

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
