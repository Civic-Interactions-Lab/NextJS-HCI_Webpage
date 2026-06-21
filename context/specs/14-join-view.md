# Spec 14: Join View Redesign

## Goal

Redesign the `/join` page to match the visual language established in other redesigned views (people, research, sponsors, pathways). Remove the accordion pattern, replace the old `CallToActionSection`, and apply consistent brand styles and animations.

## Current State

- `join-view.tsx` is a server component that fetches FAQs from Sanity and renders them using a shadcn `Accordion` + `AnimatedAccordionItem`
- `CallToActionSection` (the full-width Well Red strip with logo) is rendered inline inside the view
- Uses old class names (`text-gray-900`, `font-bold`) instead of brand system

## Layout Structure

### 1. Intro Header
Use `ViewIntroHeader` (same as other views):
- `label`: "Join the Lab"
- `titlePrefix`: "Have questions before"
- `titleAccent`: "joining us?"
- `body`: short welcoming paragraph about open applications for undergrad/grad students
- No CTA link
- Use a studio cover image

### 2. FAQ Section — Plain `<dl>` (no accordion)

Replace the accordion with a semantic `<dl>` (definition list) — best practice for FAQ SEO:
- Each FAQ is a `<dt>` (question) + `<dd>` (answer) pair
- Renders all questions and answers visible at all times (no toggling needed)
- Search engines can index all content without JavaScript
- Structure per item:
  - `<dt>`: `SectionTitle` for the question text
  - `<dd>`: `text-p1 text-thunder/65 leading-relaxed` for the answer, with `mt-2 mb-10`
- Wrap the `<dl>` with a subtle top border `border-t border-thunder/8`
- Stagger entrance animation: Framer Motion `whileInView` + `staggerChildren` on the container, `fadeUp` variant per item (same `{ opacity: 0, y: 24 }` → `{ opacity: 1, y: 0 }` pattern)

### 3. CTA Strip — Outside the view

The `CallToActionSection` (old Well Red strip) should be **removed** from inside `join-view.tsx`.

Instead, add `CtaBanner` at the **page level** in `src/app/(core)/(tabBar)/join/page.tsx` — rendered outside and after `<JoinView />` so it gets full-width layout treatment consistent with how it appears on other pages.

Use:
```tsx
<CtaBanner
  label="Ready to Apply?"
  title="Join the Temple HCI Lab."
  body="We welcome undergraduate and graduate students passionate about human-centered design, AI, accessibility, and social computing."
  ctaLabel="Apply Now"
  ctaHref="https://docs.google.com/forms/d/e/1FAIpQLScuzv5spPPiuG0sSvb7KFvMucBhJtgParffTVDwC7dWefcCMQ/viewform"
/>
```

## Animation

- Use Framer Motion throughout (no GSAP needed here)
- `ViewIntroHeader` handles its own entrance animations
- FAQ list: `motion.dl` with `whileInView="visible"` + `staggerChildren: 0.08`, `once: true`
- Each `motion.div` wrapping `dt`+`dd` uses `fadeUp` variant: `{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }`

## Brand / Style Rules

- Remove all: `text-gray-*`, `font-bold`, `border-gray-*`, shadcn Accordion, `AnimatedAccordionItem`, `CallToActionSection`
- `join-view.tsx` becomes a `"use client"` component (needs Framer Motion); data fetching moves to the page server component and is passed as a prop
- Page spacing: `space-y-16` wrapper
- Section label above FAQ list: `font-outfit text-sm font-medium text-thunder/40 uppercase tracking-widest mb-6`

## Files to Touch

- `src/modules/join/ui/views/join-view.tsx` — full rewrite
- `src/app/(core)/(tabBar)/join/page.tsx` — add data fetching + render `CtaBanner` outside view
- No new components needed (reuse `ViewIntroHeader`, `SectionTitle`, `CtaBanner`)
