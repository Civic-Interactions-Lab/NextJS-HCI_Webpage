# Spec 10 — Research Layout & Sub-Routes

## Goal

Break the research section into a parent overview page (`/research`) and three individual topic pages (`/research/gen-ai-education`, `/research/accessibility-technology`, `/research/social-computing`). Move research into the `(tabBar)` route group so it gets the same tab navigation as About and People. Update the navbar, home hero cards, and TabBarClient to route correctly. Keep the playful Outfit-font brand design consistent throughout.

---

## 1. Route Group Migration

Move the research page from `(landing)` → `(tabBar)`:

```
src/app/(core)/
  (landing)/research/         ← DELETE this entire folder
  (tabBar)/research/
    page.tsx                  ← rewrite: new overview layout (see §4)
    layout.tsx                ← new: wraps all /research/* with TabBar context if needed
    gen-ai-education/
      page.tsx                ← new: Gen AI topic page
    accessibility-technology/
      page.tsx                ← new: Accessibility topic page
    social-computing/
      page.tsx                ← new: Social Computing topic page
```

---

## 2. Navbar Update (`src/components/hci-navbar.tsx`)

Research currently has no children. Add three child routes:

```ts
{
  label: "Research",
  href: "/research",
  description: "Human-centered research across AI, accessibility, and social systems.",
  children: [
    {
      label: "Gen AI & Education",
      href: "/research/gen-ai-education",
      image: "/images/cover/6-studio.JPG",
      description: "Generative AI tools that support teaching and learning.",
    },
    {
      label: "Accessibility Technology",
      href: "/research/accessibility-technology",
      description: "Inclusive design and assistive tech for everyone.",
    },
    {
      label: "Social Computing",
      href: "/research/social-computing",
      description: "How people connect and collaborate through technology.",
    },
  ],
},
```

---

## 3. TabBarClient Update (`src/components/TabBarClient.tsx`)

Add a `/research` case to `getTabBarItems()`:

```ts
case "/research":
case "/research/gen-ai-education":
case "/research/accessibility-technology":
case "/research/social-computing":
  return [
    { label: "Overview",               path: "/research",                        isMain: true },
    { label: "Gen AI & Education",     path: "/research/gen-ai-education" },
    { label: "Accessibility",          path: "/research/accessibility-technology" },
    { label: "Social Computing",       path: "/research/social-computing" },
  ];
```

Update the `isActive` check so it matches exact pathname for research sub-routes (not `?sub=` — these are real paths). The tab bar should highlight the active sub-route correctly.

---

## 4. Research Overview Page (`/research`)

The `ResearchView` in `research-view.tsx` gets a new three-part structure. Replace the current layout entirely.

### Part A — Hero (placeholder)

Full-width banner at the top. Use a placeholder image (`/images/cover/6-studio.JPG`) and placeholder intro text. Layout mirrors the about view intro style:

- Background image with a Thunder overlay gradient
- Outfit bold heading overlay: `"Where Humans Meet Technology."`
- Subtext: a one-liner about the lab's research mission
- This is a static placeholder — no Sanity fetch needed here

### Part B — Category Cards (3 cards, one per topic)

For each of the three categories, show a compact card with:
- Category name (`font-outfit font-medium text-xl`)
- 2–3 sentence description (the same tagline strings from `research-category.tsx`)
- Accent color dot matching the category (Well Red / Sky / Grass)
- A "Learn more →" link pointing to the topic sub-route (`/research/gen-ai-education`, etc.)
- A placeholder image (`/images/cover/6-studio.JPG`) as card thumbnail

Layout: `grid grid-cols-1 md:grid-cols-3 gap-6`

These cards replace the previous always-expanded category sections on the overview page. The overview is now a teaser, not the full content.

### Part C — Bottom Banner

Two stacked elements:

1. **Placeholder video** — embed the Gen AI YouTube video (`https://www.youtube.com/embed/Pq-d6wipGRQ?si=wMHHvnP0XLIiwFAc`) as a featured highlight, same style as in `research-category.tsx`

2. **Join banner** — full-bleed Alabaster strip (`-mx-6 md:-mx-12`) with:
   - Outfit heading: `"Interested in joining our research?"`
   - Short body copy encouraging students to apply
   - Well Red pill CTA button linking to `/join`
   - Same style as `UploadNews` banner in the news view

---

## 5. Individual Topic Pages

Each topic page (`/research/gen-ai-education`, etc.) follows this structure:

### Part A — Topic Header

- Small red uppercase label with the category name
- Bold Outfit heading: the category's tagline (same strings used in `research-category.tsx`)
- Back link: `← All Research` linking to `/research`

### Part B — Papers List

Full list of papers for that category, fetched from Sanity using the existing query functions:
- `gen-ai-education` → `getGenAIEducationResearch()`
- `accessibility-technology` → `getAccessibilityTechnologyResearch()`
- `social-computing` → `getSocialComputingResearch()`

Render using `ResearchCard` in a `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`.

### Part C — Other Topics

A "Explore more research" strip showing the other two categories as compact cards with "View topic →" links. Same grid card style as Part B of the overview (§4B).

---

## 6. Home Hero Cards Update (`src/modules/home/ui/components/home-hero.tsx`)

The three research area cards in the hero currently all link to `/research`. Update each card's `href` to the matching topic route:

```ts
{ id: "assistive-tech",       href: "/research/accessibility-technology", ... }
{ id: "computing-education",  href: "/research/gen-ai-education",          ... }
{ id: "future-of-work",       href: "/research/social-computing",          ... }
```

Also update `quick-introduction.tsx` if it has hardcoded `/research` hrefs — point each card to the correct topic route.

---

## 7. Module Structure

New view and component files:

```
src/modules/research/ui/
  views/
    research-view.tsx              ← rewrite for new overview layout (§4)
    research-topic-view.tsx        ← new: shared layout for individual topic pages (§5)
  components/
    research-intro.tsx             ← keep (reuse in overview hero or topic header)
    research-category.tsx          ← keep (reuse in topic pages if needed)
    research-card.tsx              ← keep
    research-overview-card.tsx     ← new: compact teaser card used in §4B and §5C
    research-join-banner.tsx       ← new: Alabaster join CTA strip (§4C)
```

---

## 8. Animation

Same GSAP pattern as Feature 09 — `power2.inOut`, `start: "top bottom"`, `once: true`, no `immediateRender: false`. Apply to:
- Hero heading fade-up on load
- Category cards staggered fade-up
- Paper cards staggered fade-up on scroll

---

## 9. Brand Constraints

- All text: `font-outfit`
- No Framer Motion, no shadcn Accordion
- Category accent colors: Gen AI = Well Red (`bg-well-red`), Accessibility = Sky (`bg-sky`), Social Computing = Grass (`bg-grass`)
- Placeholder images: `/images/cover/6-studio.JPG` everywhere until real assets exist
- Join banner style: identical to `UploadNews` — Alabaster full-bleed strip, centered content, Well Red pill button
