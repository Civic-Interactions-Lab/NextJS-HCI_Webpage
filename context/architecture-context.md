# Architecture Context

## Stack

| Layer          | Technology                        | Role                                                                 |
| -------------- | --------------------------------- | -------------------------------------------------------------------- |
| Framework      | Next.js 16 + TypeScript           | Full-stack app with server/client boundaries via App Router          |
| UI             | Tailwind CSS v4 + shadcn/ui       | Component composition and styling (Radix UI primitives underneath)   |
| Animation      | Framer Motion                     | Page transitions and interactive motion                              |
| CMS            | Sanity v4                         | Headless content management for all site data                        |
| Maps           | Mapbox + react-map-gl             | Interactive location map on the About page                           |
| Deployment     | Docker + nginx + GitHub Actions   | Self-hosted on cis-linux1.temple.edu; image published via GHCR       |
| Webhook        | Python / Flask                    | GitHub push webhook that triggers a docker pull + restart on the server |

## System Boundaries

- `src/app` — App Router pages and API routes. Route groups: `(core)` wraps all public pages with Navbar/Footer; `(landing)` for full-page routes; `(tabBar)` for tab-navigated pages (About, People, Sponsors).
- `src/modules` — Feature modules, each owning its own `ui/views` and `ui/components`. Modules: `home`, `about`, `people`, `research`, `sponsors`, `courses`, `join`.
- `src/components` — Shared layout and UI components (Navbar, Footer, Hero, TabBar, etc.) and `ui/` for shadcn/ui primitives.
- `src/sanity` — Sanity CMS integration: schema types, GROQ query helpers per content type, image builder, and live preview client.
- `src/lib` — Shared utilities (`cn`, etc.).
- `webhook` — Standalone Python/Flask app (separate Docker service) for receiving GitHub webhooks and triggering deploys.
- `public` — Static assets: logos, images, icons, videos.

## Storage Model

- **Sanity**: all site content — people profiles, research papers, news, sponsors, FAQs, testimonials, and conference info. Managed via the embedded Studio at `/studio`.
- There is no relational database (no Prisma/PostgreSQL). Sanity is the sole source of truth for all content.

## Content Types (Sanity Schema)

| Type             | Purpose                                       |
| ---------------- | --------------------------------------------- |
| `people`         | Lab members with role, bio, image, links      |
| `research`       | Research papers with authors, tags, year      |
| `news`           | Lab news items with category and date         |
| `sponsors`       | Sponsor logos, tiers, and links               |
| `faqType`        | FAQ entries                                   |
| `testimonials`   | Student/alumni testimonials                   |
| `conference`     | Conference travel records                     |
- **Site password** (`SITE_PASSWORD` env var): an optional middleware-level gate. If set, all routes redirect to `/verify` until the correct password is submitted and a 24-hour cookie is set.

## Route Structure

- `/` — Home: lab intro, community hub, recent news and papers (`modules/home`)
- `/about` — About: lab values, events, testimonials, news timeline, map (`modules/about`)
- `/people` — People: member cards by role (`modules/people`)
- `/sponsors` — Sponsors: sponsor list by tier and become-a-sponsor CTA (`modules/sponsors`)
- `/research` — Research: papers and common research areas (`modules/research`)
- `/courses` — Courses: course list, job outcomes, opportunities (`modules/courses`)
- `/join` — Join: FAQ and CTA (`modules/join`)
- `/verify` — Site password gate
- `/studio/...` — Embedded Sanity Studio (CMS)
- `/api/auth/verify` — Site password POST handler

## Deployment Architecture

- GitHub Actions builds the production Docker image and pushes it to GHCR on each push to `main`.
- The Flask webhook service (port 9000, exposed as 9001 on the host) receives GitHub push events, runs `deploy.sh` which pulls the new image and restarts the site stack.
- The site stack (Next.js + nginx) binds to `127.0.0.1:80`; Apache on the host terminates TLS for `hci.temple.edu`.
- The webhook service is a separate Docker Compose project so a deploy does not recycle the receiver itself.

## Invariants

1. `components/ui/*` (shadcn/ui) must not be modified — extend behavior in app-level components instead.
2. All content mutations go through Sanity Studio; no content is hard-coded in component files.
3. Client components (`"use client"`) are used only where browser interactivity is required; prefer Server Components for data-fetching pages.
4. The site password gate (middleware) applies to all routes except `/api`, static files, and `/verify` itself.
