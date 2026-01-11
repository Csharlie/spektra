# Data Loaders

This folder contains data assembly and loading logic.

## Purpose

Mirrors the baseline template data loader architecture:
- Aggregates data from site.ts, content.ts, and other sources
- Provides a single entry point for data access
- Keeps data assembly logic separate from components

## Structure

```
loaders/
└── loadSiteData.ts    # Main data assembly entry point
```

## Usage

Data loaders are called at the application level (typically in main.tsx)
and the assembled data is passed down to components via props or context.

## Notes

- This is a structural placeholder for the routeline template
- Follows the same layering principles as baseline
- Extend based on project-specific data needs
