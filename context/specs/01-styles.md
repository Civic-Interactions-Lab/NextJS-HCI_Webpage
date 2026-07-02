# 01 — Base Style System

Establish the design token layer and typography utility classes that every page and component will reference. All color tokens already exist in `globals.css`. This spec adds the Oxanium font and the heading, label, and paragraph utility classes.

## Goals

- Load Oxanium as the headline typeface via `next/font/google`.
- Define `.heading-1` through `.heading-6` using Oxanium at the scale from `ui-context.md`.
- Define `.label-1` through `.label-5` using Oxanium at the label scale.
- Define `.text-p1` through `.text-p3` using Outfit at the paragraph scale.
- Add all new classes in a clearly marked new section in `globals.css` — do not touch existing styles.

## Color Tokens

Already defined in `globals.css` and available as Tailwind utilities. Reference `ui-context.md` for the full table. Key tokens:

| Tailwind class   | CSS Variable   | Value     |
| ---------------- | -------------- | --------- |
| `bg-alabaster`   | `--alabaster`  | `#F5F5F0` |
| `bg-thunder`     | `--thunder`    | `#292727` |
| `text-well-red`  | `--well-red`   | `#AA2C45` |
| `text-deep-red`  | `--deep-red`   | `#620719` |
| `bg-grass`       | `--grass`      | `#028683` |
| `bg-sky`         | `--sky`        | `#067AAB` |
| `bg-gold`        | `--gold`       | `#E29500` |

## Typography Classes

### Headings — Oxanium Medium

```
.heading-1   60px
.heading-2   55px
.heading-3   50px
.heading-4   42px
.heading-5   36px
.heading-6   28px
```

### Labels — Oxanium Medium

```
.label-1     45px
.label-2     30px
.label-3     28px
.label-4     18px
.label-5     16px
```

### Paragraphs — Outfit Light

```
.text-p1     18px
.text-p2     16px
.text-p3     14px
```

## Files to Change

- `src/app/layout.tsx` — add `Oxanium` to `next/font/google` imports and apply `--font-oxanium` CSS variable on `<body>`.
- `src/app/globals.css` — append new `@theme inline` entry for `--font-oxanium` and new `@layer base` section with all typography classes.

## Check When Done

- `pnpm build` compiles without TypeScript errors.
- No lint errors.
- `.heading-1` through `.heading-6` render in Oxanium.
- `.label-1` through `.label-5` render in Oxanium.
- `.text-p1` through `.text-p3` render in Outfit Light.
- Existing pages are visually unchanged.
