# Temple HCI Lab Website

Public website for Temple University's Human-Computer Interaction research group — a content-managed, server-rendered Next.js site. All content (people, research, news, sponsors, FAQs, testimonials, events, conferences) is managed by lab staff through an embedded Sanity Studio at `/studio`; there is no other database.

## Stack

| Layer      | Technology                      | Notes                                                  |
| ---------- | -------------------------------- | ------------------------------------------------------- |
| Framework  | Next.js 16 + TypeScript          | App Router, Server Components by default                |
| UI         | Tailwind CSS v4 + shadcn/ui      | CSS-only config via `@theme inline` in `globals.css` — no `tailwind.config.js`. Radix primitives under shadcn. |
| Animation  | Framer Motion + GSAP/ScrollTrigger | Mixed use across older/newer sections                  |
| CMS        | Sanity v4 (`next-sanity`)       | Sole source of truth for content; live preview via `SanityLive` |
| Maps       | Mapbox + react-map-gl            | Location map on the About page                          |
| Deployment | Docker + nginx + GitHub Actions | Self-hosted on `cis-linux1.temple.edu`; image published to GHCR |
| Webhook    | Python / Flask                   | Separate service; receives GitHub push events, pulls + restarts the site stack |

## File Structure

- `src/app` — App Router pages/routes. Route groups: `(core)` wraps public pages with Navbar/Footer; `(home)` for the home page; `(tabBar)` for tab-navigated sections (About, People, Sponsors, Research).
- `src/modules/<feature>` — Feature modules (`home`, `about`, `people`, `research`, `sponsors`, `pathways`, `join`), each owning:
  - `ui/views/` — top-level page compositions, one per route
  - `ui/components/` — feature-scoped components used only within that module
  - `constants/` — hardcoded data arrays (nav links, category lists, etc.)
- `src/components` — shared layout/UI components (`hci-navbar.tsx`, `hero.tsx`, `nav-cards-list.tsx`, `cta-banner.tsx`, `view-intro-header.tsx`, footer, etc.) and `ui/` for shadcn/ui primitives (do not modify these after install).
- `src/constants` — cross-module shared constants, e.g. `route-images.ts` (`ROUTE_IMAGES` map + `getRouteImage()` helper — the single source of truth for the hero/banner image per route, used by both `hero.tsx` and `nav-cards-list.tsx`).
- `src/sanity` — Sanity CMS integration: `schemaTypes/` (schema definitions), `lib/<content-type>/` (one GROQ query helper file per content type), image URL builder, live preview client.
- `src/lib` — shared utilities (`cn`, `getImageSrc`, `formatDate`, etc.).
- `webhook` — standalone Python/Flask service (separate Docker Compose project) that redeploys the site on a GitHub push webhook.
- `public/images` — static image assets, notably `public/images/cover/*` used throughout `ROUTE_IMAGES` and page hero/intro sections.

## Features / Routes

- `/` — Home: lab intro, community hub, recent news and papers.
- `/about`, `/about/events`, `/about/news`, `/about/contact` — lab values, events, news timeline, location map, contact.
- `/people`, `/people/alumni`, `/people/collaborators` — member directories.
- `/research`, `/research/gen-ai-education`, `/research/accessibility-technology`, `/research/future-of-work` — research overview + topic pages (each with a featured video, `research-hero.tsx` SVG topic logo, and grid of papers).
- `/sponsors`, `/sponsors/become` — sponsor list by tier, become-a-sponsor CTA.
- `/pathways` — course list, job outcomes, other opportunities.
- `/join` — FAQ + apply CTA.
- `/verify` — optional site password gate (see below).
- `/studio/...` — embedded Sanity Studio.

### Sanity Content Types

`people`, `research`, `news`, `sponsors`, `faqType`, `testimonials`, `conference`, `event`, `question`.

### Site Access Gate

Optional `SITE_PASSWORD` env var enforced in middleware — when set, all routes redirect to `/verify` until the correct password is submitted; a 24-hour cookie then marks the visitor as verified. Applies to all routes except `/api`, static files, and `/verify` itself.

## Conventions

- **TypeScript strict**; avoid `any`; validate unknown external input at system boundaries.
- **Server Components by default** — add `"use client"` only when a component needs browser interactivity/hooks.
- **Never modify `src/components/ui/*`** (shadcn/ui primitives) — extend behavior in app-level components instead.
- **All content comes from Sanity** — never hard-code editorial content in components; GROQ queries live in `src/sanity/lib/<content-type>/`, one file per content type; components receive data as props and never call Sanity directly.
- **Styling** — use the CSS custom property tokens defined in `globals.css` (`bg-alabaster`, `text-thunder`, `text-well-red`, etc.) — no raw Tailwind color classes (`zinc-*`, hex values). Border radius scale: `rounded-xl` small, `rounded-2xl` cards, `rounded-3xl` modals/overlays.
- **Typography** — Oxanium for headings/logos, Outfit (Medium for subheadings, Light for body) elsewhere; brand colors: Well Red `#AA2C45` primary, Deep Red `#620719` hover/pressed, Thunder `#292727` dark surfaces, Alabaster `#F5F5F0` light background; Grass/Sky/Gold as highlight-only accents (never for logos, never paired together). Never use Well Red/Deep Red as text on a Thunder background.
- **File naming** — kebab-case, named after responsibility rather than technology.
- **Package manager** — `pnpm`, not `npm`.
