# UI Context

## Theme

Light only. No dark mode. The visual language follows the official Temple HCI Lab stylesheet — clean white and Alabaster backgrounds, Temple red as the primary brand color, Thunder as the dark neutral surface, and secondary accent colors for highlights.

All brand colors are defined as CSS custom properties in `globals.css` and mapped to Tailwind tokens via `@theme inline`. Components must use these tokens — no hardcoded hex values or raw Tailwind color classes.

## Color Palette

### Identity Colors

| Name       | CSS Variable    | Hex       | Usage                                      |
| ---------- | --------------- | --------- | ------------------------------------------ |
| Well Read  | `--well-red`    | `#AA2C45` | Primary brand color; buttons, links, CTAs  |
| Deep Red   | `--deep-red`    | `#620719` | Hover states, pressed states, dark accents |
| Thunder    | `--thunder`     | `#292727` | Dark surfaces, footers, navbar backgrounds |
| Alabaster  | `--alabaster`   | `#F5F5F0` | Page background, light section fills       |

### Secondary / Accent Colors

| Name  | CSS Variable | Hex       | Usage                                          |
| ----- | ------------ | --------- | ---------------------------------------------- |
| Grass | `--grass`    | `#028683` | Highlight accent; tags, badges, links          |
| Sky   | `--sky`      | `#067AAB` | Highlight accent; info states, secondary links |
| Gold  | `--gold`     | `#E29500` | Highlight accent; featured labels, warnings    |

Secondary colors are for highlighting only. Never use them for logos. Never pair two secondary colors together.

### Accessibility Rules

- **Never** use Well Read (`#AA2C45`) or Deep Red (`#620719`) as font colors on a Thunder (`#292727`) background — this fails WCAG contrast ratio requirements.
- When Thunder is the background, use only pure white (`#FFFFFF`) or Alabaster (`#F5F5F0`) for text.
- Well Read and Deep Red may be used as text colors on white or Alabaster backgrounds.

## Typography

| Role              | Font    | Weight | CSS Variable      |
| ----------------- | ------- | ------ | ----------------- |
| Headings / logos  | Oxanium | Medium | `--font-oxanium`  |
| Subheadings / UI  | Outfit  | Medium | `--font-outfit`   |
| Body text         | Outfit  | Light  | `--font-outfit`   |

- **Oxanium** is the headline typeface — use for all page titles, section headings, and logo lockups.
- **Outfit** covers body text and secondary headings. Use Medium weight for subheadings, Light weight for paragraph text.
- Both fonts are loaded via `next/font/google` and applied as CSS variables on `<html>`.

## Typography Scale

### Headings — Oxanium

| Level | Size  | Tailwind       |
| ----- | ----- | -------------- |
| h1    | 60px  | `text-[60px]`  |
| h2    | 55px  | `text-[55px]`  |
| h3    | 50px  | `text-[50px]`  |
| h4    | 42px  | `text-[42px]`  |
| h5    | 36px  | `text-[36px]`  |
| h6    | 28px  | `text-[28px]`  |

### Labels — Oxanium

| Level | Size  | Tailwind       |
| ----- | ----- | -------------- |
| L1    | 45px  | `text-[45px]`  |
| L2    | 30px  | `text-[30px]`  |
| L3    | 28px  | `text-[28px]`  |
| L4    | 18px  | `text-[18px]`  |
| L5    | 16px  | `text-[16px]`  |

### Paragraphs — Outfit

| Level | Size  | Tailwind       |
| ----- | ----- | -------------- |
| p1    | 18px  | `text-[18px]`  |
| p2    | 16px  | `text-[16px]`  |
| p3    | 14px  | `text-[14px]`  |

## Border Radius

| Context           | Class         |
| ----------------- | ------------- |
| Inline / small UI | `rounded-xl`  |
| Cards / panels    | `rounded-2xl` |
| Modal / overlay   | `rounded-3xl` |

## Component Library

shadcn/ui on top of Tailwind v4. Components live in `src/components/ui/`. Use the `shadcn` CLI to add new components rather than writing them from scratch. Do not modify files in `src/components/ui/` after installation.

## Layout Patterns

- **Navbar** — sticky top bar with white or Thunder background depending on context; contains the HCI Lab logo and primary navigation links.
- **Hero** — full-width image section at the top of tab-bar pages (About, People, Sponsors); image sourced from Sanity.
- **Tab bar** — sticky sub-navigation bar beneath the hero on tab-bar pages; white background with backdrop blur.
- **Page sections** — max-width container (`max-w-6xl`) centered with horizontal padding (`px-8 md:px-12`); sections alternate between white and Alabaster backgrounds for visual separation.
- **Cards** — `rounded-2xl`, white background with a subtle border; used for people, research, sponsors, and news items.
- **Footer** — Thunder background with Alabaster or white text only (see accessibility rules).
- **Modals / dialogs** — centered overlay, `rounded-3xl`, white background with backdrop blur.

## Icons

Lucide React. Stroke-based icons only — no filled variants. Icon sizes: `h-4 w-4` for inline, `h-5 w-5` for buttons, `h-8 w-8` for feature icons in empty states.

## Logo Usage

- **Icon logo** — available in black, white, and Well Read (`#AA2C45`) variants. Use the white or Alabaster variant on Thunder backgrounds.
- **Full name logo** — "Temple University Human-Computer Interaction Lab" lockup.
- **Short name logo** — "Temple HCI Lab" lockup.
- Never render logos using secondary colors (Grass, Sky, Gold).
