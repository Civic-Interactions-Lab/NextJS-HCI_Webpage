# 02 — HCI Navbar

Redesign the site navigation as a new standalone component. Do not modify or delete `src/components/Navbar.tsx` — the existing site must remain unaffected. All work goes into a new file.

## Goals

- Replace the flat nav link list with a self-contained nav data structure defined inside the component.
- Sub-routes use real URL path segments (`/about/history`, not `?sub=history`) so each sub-page is indexable by search engines.
- Routes that have sub-routes render a rich dropdown panel on desktop and an accordion on mobile, similar to the UChicago CS reference screenshots.
- Apply the new typography classes and brand colors from `ui-context.md`.

## File to Create

`src/components/hci-navbar.tsx`

Do not modify `src/components/Navbar.tsx` or `src/constants/navItems.ts`.

## Nav Data Structure

Define the nav data inline inside `hci-navbar.tsx`. No separate constants file. Shape:

```ts
type NavSubItem = {
  label: string
  href: string
  image?: string   // optional cover image path for dropdown featured card
  description?: string
}

type NavItem = {
  label: string
  href: string
  children?: NavSubItem[]
}
```

Top-level items and their sub-routes, derived from the existing module structure in `src/modules/`:

```
About          /about
  ├─ Events              /about/events
  ├─ News                /about/news
  └─ Contact             /about/contact

Research       /research        (no children)

People         /people
  ├─ Alumni              /people/alumni
  └─ Collaborators       /people/collaborators

Courses        /courses         (no children)

Sponsors       /sponsors
  └─ Become a Sponsor    /sponsors/become

Join           /join            (no children)
```

Use `public/images/cover/6-studio.JPG` as the placeholder `image` value on the first sub-item of any parent that has children.

## Desktop Behavior

- Fixed top navbar, full width, Thunder (`#292727`) background.
- Logo on the left (use existing `<Logo />` component).
- Nav links centered or right-aligned.
- Items without children: plain link, navigates directly.
- Items with children: clicking or hovering the label opens a dropdown panel below the navbar.
  - Dropdown has a dark semi-transparent background (`bg-thunder/95` with backdrop blur).
  - Left column: featured card — image, sub-item label, and description. Use `image` from the first child.
  - Right column: remaining sub-items as plain text links, separated by a thin divider.
  - Clicking outside or moving off the nav closes the dropdown.
- Active route is indicated with a `text-well-red` underline or accent.
- Nav link text: `.label-5` (Oxanium Medium, 16px), white color.

## Mobile Behavior (below `md` breakpoint)

- Hamburger icon button on the right opens a full-screen overlay menu.
- Overlay: Thunder background, full viewport height, scrollable.
- Logo top-left, close (`X`) button top-right.
- Each top-level item renders as a row with a chevron if it has children.
- Tapping a parent row expands an accordion below it showing child links.
- Child links are plain text, indented, separated by a subtle border.
- Only one accordion open at a time.
- Nav text: `.label-4` (Oxanium Medium, 18px) for parents, `.text-p2` (Outfit Light, 16px) for children.
- Text color: white on Thunder background (see accessibility rules in `ui-context.md`).

## Styling Rules

- Background: `bg-thunder` (`#292727`).
- Text on Thunder: white or Alabaster only — never Well Read or Deep Red (WCAG rule from `ui-context.md`).
- Active / hover accent: `text-well-red` or a `bg-well-red` underline indicator.
- Dropdown panel border: subtle white/10 border on top.
- Use `rounded-2xl` for the dropdown panel corners.
- Icons: Lucide React — `Menu` for hamburger, `X` for close, `ChevronDown` for parent items.

## Component API

`HciNavbar` (default export from `hci-navbar.tsx`) takes no props. It reads the current pathname via `usePathname()` from `next/navigation` to highlight the active route.

Mark the component `"use client"` — it requires interactivity for dropdown and mobile menu state.

## Check When Done

- `pnpm build` passes with no TypeScript or lint errors.
- Existing pages still use the old `Navbar` and are visually unchanged.
- Desktop dropdown opens on items with children and closes on outside click.
- Mobile overlay opens, accordion expands one section at a time, and closes cleanly.
- Sub-routes resolve to real URL paths (verify in browser address bar).
- Typography uses `.heading-*` / `.label-*` / `.text-p*` classes, not arbitrary Tailwind font sizes.
- No Well Read or Deep Red text appears on Thunder backgrounds.
