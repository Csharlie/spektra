# Pages

This folder is for **project-specific pages** that do not yet exist in the engine core.

## Purpose

- Contains page components unique to the baseline project
- Houses experimental or project-specific page layouts
- Serves as a staging area before pages become engine templates

## When to Use

Place a page here when:
- It's specific to this project only
- It's being prototyped before engine promotion
- It's not yet reusable across multiple projects

## Promotion Path

When 2+ projects need the same page structure:
1. Refactor into a generic engine template
2. Move to `engine/packages/core/templates/`
3. Import from engine rather than duplicate

## Structure

Pages should compose:
- Project-level organisms from `src/ui/organisms/`
- Engine components from `@spektra/core`
- NO business logic (use contexts/hooks for that)
