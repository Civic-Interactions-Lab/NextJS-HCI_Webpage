# Temple University HCI Lab Website

## Overview

The HCI Lab website is the public face of Temple University's Human-Computer Interaction research group. It presents the lab's people, research, courses, sponsors, and events through a content-managed, server-rendered Next.js site. All content is managed by lab staff through an embedded Sanity Studio and served to the public without requiring an account.

## Goals

1. Present the lab's research, people, and mission to prospective students, collaborators, and sponsors.
2. Allow lab staff to manage all site content through Sanity Studio without touching code.
3. Deliver fast, accessible, server-rendered pages with live content updates.
4. Support self-hosted deployment on university infrastructure with automated redeploys on push.

## Core User Flow

### Public Visitor

1. Visitor lands on the home page and gets a quick introduction to the lab.
2. Visitor browses research papers, lab members, sponsors, or upcoming events.
3. Visitor navigates to the Join or Courses page to learn how to get involved.
4. Visitor uses the contact section or social links to reach the lab.

### Lab Staff (Content Editor)

1. Staff visits `/studio` and logs in to Sanity Studio.
2. Staff creates or updates content (people, research, news, sponsors, FAQs, etc.).
3. Changes are published and reflected on the live site immediately via Sanity Live preview.

## Features

### Public Pages

- **Home** — Lab intro, community hub, why HCI Lab, recent news, and recent papers.
- **About** — Lab values, learning outcomes, leadership, studio time, social events, OwlHacks, HCI Open House, community research, conference travel, testimonials, news timeline, world map, and contact section.
- **People** — Lab member directory with role legend and member cards, sourced from Sanity.
- **Research** — Research papers and common research areas, sourced from Sanity.
- **Sponsors** — Sponsor list by tier, sponsor cards, and a become-a-sponsor CTA.
- **Courses** — Course list, job outcomes, and other opportunities.
- **Join** — FAQ and call-to-action for prospective members.

### Content Management

- All site content managed through embedded Sanity Studio at `/studio`.
- Content types: people, research, news, sponsors, FAQs, testimonials, conferences.
- Live preview reflects published changes instantly via `SanityLive`.
- Sanity image pipeline handles all media assets.

### Deployment and Infrastructure

- Docker multi-stage build with nginx reverse proxy.
- Self-hosted on `cis-linux1.temple.edu`; Apache terminates TLS for `hci.temple.edu`.
- GitHub Actions builds and pushes the production image to GHCR on each push to `main`.
- Flask webhook service triggers a `docker compose pull + restart` on each qualifying push.

### Site Access Gate

- Optional site password (`SITE_PASSWORD` env var) enforced at the middleware level.
- All routes redirect to `/verify` until the correct password is submitted.
- Verified state stored as a 24-hour cookie — no user account required.

## Scope

### In Scope

- Public-facing pages for all lab content areas
- Sanity CMS integration for all content types
- Embedded Sanity Studio for staff content editing
- Server-rendered pages with live content updates
- Mapbox interactive map for lab location
- Framer Motion animations and transitions
- Docker-based self-hosted deployment pipeline
- GitHub Actions image publishing to GHCR
- Flask webhook for automated redeploys
- Optional site password gate

### Out of Scope

- User accounts or member login for public visitors
- Real-time collaboration features
- Event registration or ticketing
- Payment or sponsorship processing
- Mobile-native applications

## Success Criteria

1. All public pages render correctly with content sourced from Sanity.
2. Lab staff can create, update, and publish content through Sanity Studio without code changes.
3. A push to `main` triggers an automated redeploy within a reasonable time.
4. The site loads fast and is accessible on desktop and mobile.
5. The site password gate correctly restricts access when `SITE_PASSWORD` is set.
