# Project Source Structure Contract

## Context

As Spektra introduced multiple project templates (baseline, routeline), structural divergence emerged between templates. This created ambiguity for tooling, scaffolding scripts, and long-term maintainability.

To prevent template-level improvisation and architectural drift, a canonical **project-level source structure contract** is required.

This document defines the mandatory `src/` structure that **all Spektra projects and project templates must follow**, regardless of routing or feature complexity.

---

## Decision

All Spektra projects **must use an identical `src` folder structure**.

Project templates (baseline, routeline, future variants) **may differ in behavior**, but **must not differ in structural layout**.

The following `src` structure is mandatory and non-negotiable:

```
src/
├─ data/
├─ pages/
├─ ui/
├─ App.tsx
├─ main.tsx
└─ index.css
```

---

## Structure

### `src/data/`

**Purpose:** Project-level data and constants.

Allowed content:

* static configuration
* constants and enums
* navigation definitions
* mock or CMS-free content

Disallowed:

* API logic
* fetch calls
* global state management

Ownership: **project**

---

### `src/pages/`

**Purpose:** Route-level entry points.

A page represents a **route boundary**, not a layout or design unit.

Characteristics:

* thin wrapper components
* may reference routing context
* may wrap layouts
* must not contain design or layout logic

Typical usage:

```tsx
export function ProductsPage() {
  return <ProductsLayout />;
}
```

Ownership: **project**

---

### `src/ui/`

**Purpose:** Project-specific UI components.

Used for components that:

* are reused across pages
* are not generic enough for `engine/core`

Examples:

* Navigation
* Footer
* project-specific widgets

Disallowed:

* reusable design-system components
* layouts

Ownership: **project**

---

### `src/App.tsx`

**Purpose:** Project orchestration.

Responsibilities:

* application composition
* routing setup (if applicable)
* AppShell integration

Notes:

* Baseline template: renders a single page
* Routeline template: defines router and page mapping

---

### `src/main.tsx`

Standard React entry point. No project-specific logic allowed.

---

### `src/index.css`

Project-level global styles.

Tailwind base imports and minimal global overrides only.

---

## Rules

The following rules are enforced:

* All project templates must include **all** directories listed above
* No template may introduce additional top-level folders inside `src`
* Layouts must never live under `pages`
* Routing logic must never live inside layouts
* Core UI must never be duplicated inside project `ui`

Violations indicate architectural drift and must be corrected.

---

## Tooling Impact

* `create-project` script can assume a fixed project structure
* Templates can be swapped without structural migration
* CI and validation rules can target deterministic paths
* Copilot prompts can rely on stable folder semantics

---

## Versioning Notes

This is a **structural contract introduction**.

* Breaking change: ❌ (applies before v1.0)
* Version impact: **minor (pre-v1 stabilization)**

---

## Related Docs

* `/docs/architecture/templates.md`
* `/docs/architecture/layouts.md`
* `/docs/workflows/project-scaffolding.md`
