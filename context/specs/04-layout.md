# 04 — Layout Cleanup & Missing Routes

## Goals

1. Create all missing child routes defined in `hci-navbar.tsx` that do not yet have pages.
2. Remove the `layout.tsx` files from `(tabBar)` and `(landing)` route groups — they now share the same root layout. Keep the route group folders for organisation but delete their `layout.tsx`.

## Missing Routes to Create

Based on `src/components/hci-navbar.tsx`, the following child routes need `page.tsx` files. All child route pages are placeholder "Coming Soon" views — do not build real content for them.

| Route | File to create |
| ----- | -------------- |
| `/about/events` | `src/app/(core)/(tabBar)/about/events/page.tsx` |
| `/about/news` | `src/app/(core)/(tabBar)/about/news/page.tsx` |
| `/about/contact` | `src/app/(core)/(tabBar)/about/contact/page.tsx` |
| `/people/alumni` | `src/app/(core)/(tabBar)/people/alumni/page.tsx` |
| `/people/collaborators` | `src/app/(core)/(tabBar)/people/collaborators/page.tsx` |
| `/sponsors/become` | `src/app/(core)/(tabBar)/sponsors/become/page.tsx` |

Main routes (`/about`, `/people`, `/sponsors`, `/research`, `/courses`, `/join`) already have pages — do not touch them.

## Placeholder View

Each missing child route renders a simple coming-soon placeholder. No imports from Sanity, no data fetching.

```tsx
export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
      <p className="label-3 text-thunder">Coming Soon</p>
      <p className="text-p2 text-thunder/60">This page is under construction.</p>
    </div>
  );
}
```

## Layout Files to Remove

Delete the following files. Keep the route group directories themselves.

- `src/app/(core)/(tabBar)/layout.tsx`
- `src/app/(core)/(landing)/layout.tsx`

After deletion, both route groups inherit the root `src/app/(core)/layout.tsx` directly.

## Hero Placement After Layout Removal

The `<Hero />` component was previously rendered inside both removed layouts. After their deletion, move `<Hero />` into the root `src/app/(core)/layout.tsx` so it renders once for all routes under `(core)`.

## Check When Done

- `pnpm build` passes with no TypeScript or lint errors.
- All six child routes (`/about/events`, `/about/news`, `/about/contact`, `/people/alumni`, `/people/collaborators`, `/sponsors/become`) render the coming-soon placeholder.
- `(tabBar)/layout.tsx` and `(landing)/layout.tsx` are deleted.
- `<Hero />` renders correctly on all routes including home, sub-pages, and child routes.
- No regressions on existing main routes.
