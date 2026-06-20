# Spec 12 — Pathways View (rename from Courses)

## Goal

Rename the "Courses" section to "Pathways" across all routing, modules, and navigation. Redesign the view with the same playful Outfit-font brand system used in About, Research, and People. Restructure the content around the provided narrative — intro, start with a course + featured course cards, job outcomes, and other opportunities. All animation via Framer Motion (no GSAP in this view). Brand colors and Outfit typography throughout.

---

## 1. Rename — Files, Routes, and Nav

### Route

```
src/app/(core)/(landing)/courses/   →   src/app/(core)/(landing)/pathways/
```

- Rename the folder. Update `page.tsx` to import from `pathways` module.

### Module

```
src/modules/courses/   →   src/modules/pathways/
```

Rename all files inside:
- `courses-view.tsx` → `pathways-view.tsx`
- `CourseList.tsx` → `course-list.tsx`
- `JobOutcomes.tsx` → `job-outcomes.tsx`
- `OtherOpportunities.tsx` → `other-opportunities.tsx`

### Navbar (`src/components/hci-navbar.tsx`)

Update the Courses nav item:
- `label: "Courses"` → `label: "Pathways"`
- `href: "/courses"` → `href: "/pathways"`

### TabBarClient (`src/components/TabBarClient.tsx`)

Update the courses case to `/pathways`.

### Sanity image settings (`src/sanity/lib/imageSettings/coursesImages.ts`)

Rename to `pathwaysImages.ts`, update function name and `sectionKey` filter if applicable.

### `sanity.config.ts`

Update any desk item filtering on `sectionKey match "courses-*"` to `"pathways-*"`.

---

## 2. Page Structure

`pathways-view.tsx` has four sections in sequence, all in a single `space-y-20` container:

```
§A  Intro header — "Explore Human-Centered Technology"
§B  Start with a Course — intro text + Featured Courses grid
§C  Job Outcomes — job titles + company/university logos
§D  Other Opportunities — community orgs + OwlHacks etc.
```

---

## 3. §A — Intro Header

Two-column layout, same pattern as Research and People intro:

**Left column** (`flex-1`):
- Small red uppercase label: `"Temple HCI Lab"`
- Bold Outfit heading (`text-4xl md:text-5xl lg:text-6xl`):
  `"Explore Human-Centered"` then `"Technology."` — last word in Well Red
- Body copy (`text-p1 text-thunder/65 leading-relaxed`):
  > "The Temple HCI Lab helps students explore careers in technology, design, research, and AI. Whether you are curious about user experience design, data visualization, artificial intelligence, or academic research, there are multiple ways to get involved."

**Right column** (`w-full lg:w-[420px] shrink-0`):
- Image: `/images/cover/6-studio.JPG` — `rounded-2xl overflow-hidden`, `h-[320px] lg:h-[440px]`, `object-cover`

---

## 4. §B — Start with a Course

### Intro block (full width, `max-w-2xl`)

- Small red uppercase label: `"Your Pathway Starts Here"`
- Outfit heading (`text-3xl font-medium`): `"Start with a Course"`
- Body copy:
  > "Many students begin their journey in human-computer interaction (HCI), user experience (UX) design, artificial intelligence (AI), and data visualization through our undergraduate courses. These classes introduce students to the principles of designing human-centered technology while building practical skills that are valued in industry and research careers."
  >
  > "Students learn skills in UX design, user research, AI literacy, data storytelling, and human-centered technology development. Many students use these courses as a pathway into undergraduate research, internships, leadership opportunities, and careers in technology."

### Featured Courses grid

Label above: `"Featured Courses"` in `font-outfit text-sm font-medium text-thunder/40 uppercase tracking-widest`

Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`

Each course card (`course-card.tsx`, new component):
```
rounded-2xl bg-white border border-thunder/10
hover:shadow-md hover:border-thunder/20 transition-all duration-200
p-6 flex flex-col gap-3
```
Content:
- Course code: `font-outfit text-xs font-medium text-well-red uppercase tracking-widest`
- Course name: `font-outfit font-medium text-base text-thunder leading-snug`
- Description: `text-p2 text-thunder/60 leading-relaxed`
- Optional link: if `href` provided, a small `"View course →"` link in Well Red at the bottom

Courses data (hardcoded in `pathways-data.ts`):

| Code | Name | Description |
|---|---|---|
| CIS 1014 | AI for Everyone | A non-technical introduction to artificial intelligence, exploring how AI shapes everyday life, society, and careers across industries. |
| CIS 3603 | User Experience Design | Learn the full UX design process — from user research and wireframing to prototyping and usability testing — applied to real-world products. |
| CIS 3655 | Human-AI Interaction | Examines how people interact with AI systems and how to design AI tools that are explainable, trustworthy, and human-centered. |
| CIS 3755 | Introduction to Data Visualization | Covers principles of visual communication, data storytelling, and hands-on creation of interactive charts and dashboards. |
| CIS 4398 | Projects in CS | A capstone-style course where students tackle real client projects, applying software engineering and design skills in team settings. |

Full course catalog link — place below the grid as a centered text link:
```tsx
<a href="https://stevemacn.github.io/courses" target="_blank" rel="noopener noreferrer"
   className="font-outfit text-sm font-medium text-well-red hover:underline">
  View full course catalog →
</a>
```

---

## 5. §C — Job Outcomes

Rewrite `job-outcomes.tsx` with brand styling. Two-column layout on desktop, stacked on mobile.

**Left — Job Titles**
- Small Well Red label: `"Where You'll Go"`
- Outfit heading (`text-2xl font-medium`): `"What can you do with HCI experience?"`
- Subtext: `"Recent job titles obtained by lab alumni:"`
- List of roles as pill badges (Alabaster bg, `font-outfit text-xs font-medium px-3 py-1.5 rounded-full border border-thunder/10`):
  - Software Engineer, UX/UI Designer, UX Researcher, UX Specialist, Information Architect, Design Researcher

**Right — Logos**
Two sub-sections stacked:

*Companies* — `"Where will you work?"` heading + logo grid
*Graduate schools* — `"Where will you study next?"` heading + logo grid

Keep existing logo data (`companies`, `universities` arrays) and `LogoBadge` component — just restyle:
- Logo badge: `p-3 rounded-xl bg-alabaster hover:shadow-sm transition-shadow`
- Logo image: `h-8 w-auto object-contain`

---

## 6. §D — Other Opportunities

Rewrite `other-opportunities.tsx` with brand styling.

- Small Well Red label: `"Beyond the Classroom"`
- Outfit heading (`text-2xl font-medium`): `"Other Opportunities"`
- Body copy (existing text, restyled to `text-p1 text-thunder/65`)
- Organization logo grid — keep existing `organizations` data, restyle badges same as §C

---

## 7. Animation

All animation via **Framer Motion only** — no GSAP in this view.

### Intro header lines (§A)

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
>
```

Apply to: label, heading, body text — map them as an array with `index` for stagger.

### Studio image (§A right)

```tsx
<motion.div
  initial={{ opacity: 0, x: 30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
>
```

### Course cards grid (§B)

Use `whileInView` + `staggerChildren` — same pattern as research cards:

```tsx
<motion.div
  className="grid ..."
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.1 }}
  variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
>
  <motion.div variants={{
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  }}>
    <CourseCard ... />
  </motion.div>
```

### §C and §D sections

Each section as a `motion.div` with `whileInView`:
```tsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.15 }}
transition={{ duration: 0.6, ease: "easeOut" }}
```

---

## 8. New Files

```
src/modules/pathways/
  ui/
    views/
      pathways-view.tsx          ← rewrite of courses-view.tsx
    components/
      course-card.tsx            ← new: individual course card
      course-list.tsx            ← rewrite of CourseList.tsx
      job-outcomes.tsx           ← rewrite of JobOutcomes.tsx
      other-opportunities.tsx    ← rewrite of OtherOpportunities.tsx
  data/
    pathways-data.ts             ← new: course data array

src/app/(core)/(landing)/pathways/
  page.tsx                       ← rename from courses/page.tsx
```

Delete entire `src/modules/courses/` and `src/app/(core)/(landing)/courses/` after new files are in place.

---

## 9. Brand Constraints

- All text: `font-outfit` — no `font-jetbrains-mono`, no raw gray Tailwind
- No shadcn components
- No GSAP — Framer Motion only in this view
- Accent color: Well Red (`text-well-red`, `bg-well-red`)
- Section backgrounds: alternate white and Alabaster full-bleed (`-mx-6 md:-mx-12 px-6 md:px-12 bg-alabaster`) for §C or §D if desired for visual rhythm
- Placeholder image: `/images/cover/6-studio.JPG` for the intro right column
- All external links open in `target="_blank" rel="noopener noreferrer"`
