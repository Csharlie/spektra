# Platform Migration Plan (General)

This document describes a client-agnostic migration path for moving any project to the Spektra platform.
It intentionally avoids client-specific details, data, or endpoints. Client-specific plans live in the
client repo under its own docs folder.

## Scope
- Platform packages only (types, data, runtime, components, sections, templates, themes)
- Generic adapter strategy (JSON or WordPress)
- Build, lint, and runtime validation flow

## Recommended Flow
1. Confirm target SiteData contract (site, navigation, pages, sections)
2. Define section types and their data shape
3. Implement section registry and template wiring
4. Implement adapter mapping (JSON or WordPress)
5. Validate SiteData at runtime (validateSiteData)
6. Run build/lint and verify rendering

## Notes
- Do not store client content or endpoints here
- Keep this doc stable and reusable for any client
