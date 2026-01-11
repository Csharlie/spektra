# Routeline Template

## Overview

The **routeline** template extends the baseline template with routing capabilities and an AppShell component. It provides a foundation for multi-page applications while remaining minimal and extensible.

## Purpose

Use this template when you need:
- Multiple routes in your application
- A consistent application shell (header/navigation)
- Clean separation between routing and layout logic

## What It Provides

### AppShell
- Basic header with navigation placeholder
- Main content wrapper
- No routing or layout logic

### Routing
- React Router integration
- Explicit route definitions
- Layout references from `@spektra/core`

### Routes
- `/` → LandingLayout
- `/products` → ProductsLayout (stub)

## What It Does NOT Provide

- Layout implementations (layouts are external dependencies from core)
- Authentication or route guards
- Dynamic or configuration-driven routing
- Page implementations beyond basic placeholders

## When to Use

**Use routeline instead of baseline when:**
- Your application has multiple pages/routes
- You need consistent navigation across pages
- You want routing structure without layout complexity

**Use baseline instead when:**
- Single-page application is sufficient
- No routing is needed
- Maximum simplicity is required

## Architecture

```
routeline/
├── src/
│   ├── App.tsx           # Routing definitions
│   ├── AppShell.tsx      # Application shell wrapper
│   ├── main.tsx          # Entry point
│   └── ...               # Other baseline components
```

## Dependencies

- `react-router-dom` - routing functionality
- `@spektra/core` - layout references (stubs)
- All baseline dependencies

## Notes

- Layouts are referenced but NOT implemented in this template
- Layout implementations belong in `engine/packages/core/components/layouts`
- This template focuses solely on routing and shell structure
- Baseline template remains unmodified and independent
