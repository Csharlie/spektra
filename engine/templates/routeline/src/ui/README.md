# Routeline Project UI

This folder contains the **project-level atomic UI structure** for the routeline template.

## Structure

```
ui/
├── atoms/         # Minimal presentational components
├── molecules/     # Composed atoms, small focused responsibility
└── organisms/     # Feature-complete UI sections
```

## Atomic Design Principles

### Atoms
- Minimal presentational components
- No layout logic
- No hardcoded content
- Props-only rendering

**Examples:** Title, Text, Button

### Molecules
- Compose atoms
- Small, focused responsibility
- Generic and reusable
- No project-specific assumptions

**Examples:** IconText, CTAGroup

### Organisms
- Compose atoms and molecules
- Represent clear UX intent
- Fully data-driven via props
- NO hardcoded text, labels, or links
- NO engine imports
- NO CMS logic

## Baseline Alignment

This structure mirrors the baseline template UI architecture:
- Same layering (atoms → molecules → organisms)
- Same composition principles
- Same promotion criteria

## Promotion Path

Components in this folder are **project-level only**.

When a component is needed by 2+ projects:
1. Refactor to be fully generic
2. Move to `engine/packages/core/components/`
3. Import from engine instead of duplicating

## Notes

- Use engine components from `@spektra/core` as building blocks
- Follow the design system patterns
- Keep components focused and composable
