# Project Archetype

## Context

During the introduction of multiple project templates (baseline, routeline), it became clear that structural similarity alone (`src` contract) is not sufficient. The baseline project already embodies a **layered architectural pattern** that implicitly defines how projects are expected to be organized.

Without making this pattern explicit, new templates risk becoming structurally valid but architecturally inconsistent.

This document extracts and formalizes the **Project Archetype** from the existing baseline implementation. This archetype represents the canonical way a Spektra project is structured and layered.

---

## Decision

The **baseline project architecture** is promoted to a **Project Archetype**.

All project templates (baseline, routeline, and future templates) **must conform to this archetype**, differing only in behavior (routing, shell usage), not in architectural layering.

The archetype defines:

* mandatory layers
* responsibilities of each layer
* allowed interactions between layers

---

## Structure

### Canonical Project Archetype

```
src/
├─ data/
│  ├─ loaders/
│  ├─ *.ts
│
├─ pages/
│  ├─ *.tsx
│  └─ README.md
│
├─ ui/
│  ├─ atoms/
│  ├─ molecules/
│  ├─ organisms/
│  └─ README.md
│
├─ App.tsx
├─ main.tsx
└─ index.css
```

This structure is mandatory for all Spektra project templates.

---

## Layer Responsibilities

### `data/` – Domain & Content Layer

Purpose:

* domain data
* static content
* types and schemas
* lightweight data loaders

Characteristics:

* no UI rendering
* no routing logic
* no component imports

Allowed:

* constants
* enums
* content descriptors
* simple loader utilities

Forbidden:

* API clients
* React components
* state management

---

### `pages/` – Route Composition Layer

Purpose:

* route-level entry points
* composition of data, layouts, and UI

Characteristics:

* thin wrapper components
* one page per route
* imports layouts and project UI

Example intent:

```tsx
export function ProductsPage() {
  return <ProductsLayout />;
}
```

Forbidden:

* reusable UI primitives
* global styling
* routing configuration

---

### `ui/` – Project UI Layer

Purpose:

* project-specific UI components

Structure:

* atoms: smallest UI units
* molecules: simple compositions
* organisms: larger reusable blocks

Characteristics:

* reusable within the project
* not generic enough for engine/core

Forbidden:

* routing logic
* page-level composition
* core design system duplication

---

### `App.tsx` – Application Orchestration

Purpose:

* application composition
* routing setup (if applicable)
* AppShell integration

Characteristics:

* no visual styling
* no business logic
* coordination only

Behavioral variants:

* baseline: single-page render
* routeline: router + multiple pages

---

## Rules

* All project templates must implement **all archetype layers**
* Templates may add files, but must not remove or collapse layers
* Behavioral differences must live in `App.tsx`, not in structure
* Layouts are always imported from `engine/core/layouts`
* No layer may bypass another layer’s responsibility

---

## Tooling Impact

* Project templates can be validated against a known archetype
* `create-project` scripts can assume architectural consistency
* Copilot prompts can reference explicit layer semantics
* Future automation can enforce layer boundaries

---

## Versioning Notes

This is an **architectural formalization**, not a behavior change.

* Breaking change: ❌ (baseline already conforms)
* Version impact: none (pre-v1 stabilization)

---

## Related Docs

* `/docs/architecture/project-structure.md`
* `/docs/architecture/templates.md`
* `/docs/architecture/layouts.md`
