# Spec 15: Remove Unused Components & Dependencies

## Goal

Clean up leftover components, shadcn UI primitives, and dependencies that are no longer used anywhere in the redesigned codebase.

## Instructions

### 1. Audit and delete unused components

Scan `src/components/`, `src/modules/`, and `src/components/ui/` for any files that have zero imports across the codebase. Delete them.

Focus areas:
- Old PascalCase components that were replaced by kebab-case redesigned versions
- shadcn UI primitives that are no longer consumed by any view or component
- Leftover module components from views that have been fully redesigned

### 2. Remove unused constants and hooks

Check `src/constants/` and any custom hooks for files with zero imports. Delete them.

### 3. Convex and Clerk

Already uninstalled — no action needed. The annotation/feedback system has been extracted to Desktop and is no longer part of this project.

### 4. Verify build is clean

Run `pnpm run build` after deletions to confirm no broken imports.
