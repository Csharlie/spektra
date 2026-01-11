# Pages

This folder contains **route-level page components** for the routeline template.

## Purpose

- Contains page components that correspond to application routes
- Thin wrappers over core layouts from `@spektra/core`
- Maps routing structure to layout structure

## Architecture

Pages in routeline template:
- Are route targets (mapped in App.tsx)
- Render corresponding core layouts
- Contain NO styling or business logic
- Pass props to layouts as needed

## Current Pages

- **LandingPage.tsx** - renders LandingLayout from core
- **ProductsPage.tsx** - renders ProductsLayout (stub)

## Baseline Alignment

This structure mirrors the baseline pages architecture:
- Same layering responsibility (route → page → layout)
- Same composition pattern (pages compose layouts)
- Difference: baseline has no routing, routeline does

## Promotion Path

When 2+ projects need the same page structure:
1. Refactor into a generic engine layout
2. Move to `engine/packages/core/components/layouts/`
3. Import from engine rather than duplicate
