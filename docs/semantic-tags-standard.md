# Semantic HTML Tag Standard: IDs and Classes

This document defines where and how to use `id` and `class` on semantic HTML elements, with implementation-level guidance suitable for automated coding agents. It is platform-level only and contains no client-specific references.

Last updated: 2026-03-24

---

## 1. Scope and goals

Goals:
1. Ensure semantic tags are used correctly (`header`, `nav`, `main`, `section`, `footer`, `form`, etc.).
2. Define when `id` is required, optional, or forbidden on semantic elements.
3. Define when `class` should be present, and what it should encode.
4. Ensure consistent anchors, navigation targets, and automation hooks.
5. Avoid misuse of `id` as a styling or layout tool.

Non-goals:
1. This spec does not define design tokens or CVA usage (see `cva-standard.md`).
2. This spec does not alter runtime behavior.

---

## 2. Core principles

1. `id` is for referenceability (anchors, targets, ARIA relationships).
2. `class` is for styling and layout; it should not carry semantic meaning.
3. Every section in a single-page layout should be anchorable.
4. `id` values must be stable, human-readable, and slug-based.
5. `id` must not duplicate `data-ui-id` semantics.

---

## 3. ID usage rules by semantic tag

### 3.1 `header`
Required:
1. `id` if the header is a navigation target (e.g. `#top`).

Optional:
1. `id` if referenced by ARIA (`aria-labelledby`).

Not required:
1. If header is only structural and never referenced.

Example:
```html
<header id="page-header" class="...">...</header>
```

### 3.2 `nav`
Required:
1. `id` if it is referenced by an internal skip link or ARIA.

Optional:
1. `id` if multiple navs exist (primary, footer, sidebar).

Example:
```html
<nav id="primary-nav" class="...">...</nav>
```

### 3.3 `main`
Required:
1. `id="main-content"` if a skip link exists.

Example:
```html
<main id="main-content" class="...">...</main>
```

### 3.4 `section`
Required:
1. `id` if the section is a navigation target.
2. Every top-level section in a single-page layout must have an `id`.

Optional:
1. Nested sections may omit `id` if not targeted.

Example:
```html
<section id="services" class="...">...</section>
```

### 3.5 `footer`
Optional:
1. `id` if referenced as anchor or ARIA target.

Example:
```html
<footer id="page-footer" class="...">...</footer>
```

### 3.6 `article`
Required:
1. `id` if the article is targetable (e.g. deep links or index).

Optional:
1. Otherwise, not required.

### 3.7 `aside`
Optional:
1. `id` if referenced or toggled (e.g. sidebar).

### 3.8 `form`
Required:
1. `id` if it is targeted by a submit action, link, or label association.

Optional:
1. If the form is the only form on the page and not referenced, it can omit `id`.

### 3.9 `figure`
Optional:
1. `id` if referenced from captions or links.

---

## 4. Class usage rules by semantic tag

### 4.1 General rule
`class` is required when:
1. Styling or layout is applied.
2. CVA variants are used.
3. Tailwind utility classes are needed for spacing, layout, or typography.

`class` is optional when:
1. The element inherits layout and requires no styling.

### 4.2 What `class` must not encode
1. Functional meaning (use `data-ui-role`).
2. Actions (use `data-ui-action`).
3. Types (use `data-ui-type`).
4. State (use `data-ui-status`).

### 4.3 What `class` should encode
1. Layout (`flex`, `grid`, `gap-*`, `container`).
2. Spacing (`py-*`, `px-*`, `mt-*`).
3. Typography (`text-*`, `font-*`, `leading-*`).
4. Visual styling (`bg-*`, `border-*`, `shadow-*`) using tokens.

---

## 5. ID naming conventions

Allowed:
1. Kebab-case: `services`, `contact-form`, `gallery-lightbox`.
2. Stable content-derived slugs: `service-audi`, `team-anna-kovacs`.
3. Section-based names: `section-hero`, `section-gallery`.

Disallowed:
1. Index-based IDs: `section-0`, `nav-link-1`.
2. Random IDs: `id-98234`.
3. CSS-based IDs: `primary-cta`.

---

## 6. When both `id` and `data-ui-id` exist

Purpose split:
1. `id` is for URL anchors (`#services`) and ARIA references (`aria-labelledby`).
2. `data-ui-id` is for automation, E2E tests, and AI interpretation.

Rules:
1. They may have the same string value, and this is RECOMMENDED when there is no conflict.
2. `id` must never depend on `data-ui-id` or vice versa.
3. If an `id` is needed for anchoring AND `data-ui-id` for automation, add both.
4. If only one purpose applies, add only the relevant attribute.
5. `id` is governed by browser uniqueness rules (one per document). `data-ui-id` has no such constraint but should still be unique within a component tree.

Example:
```html
<section id="services" data-ui-id="section-services" data-ui-role="services" class="...">
  ...
</section>
```

Here `id="services"` is the URL anchor (`<a href="#services">`),
and `data-ui-id="section-services"` is the automation hook.

---

## 7. Skip links and `main`

If a skip link exists:
1. `main` must have `id="main-content"`.
2. The skip link must point to `#main-content`.

Example:
```html
<a href="#main-content" class="...">Skip to content</a>
<main id="main-content">...</main>
```

---

## 8. Section anchoring rules

For single-page apps:
1. Every top-level section must have an `id` matching navigation links.
2. Navigation links must point to these section IDs.

Example:
```html
<nav>
  <a href="#services">Services</a>
  <a href="#contact">Contact</a>
</nav>
<section id="services">...</section>
<section id="contact">...</section>
```

---

## 9. Forms and labels

Rules:
1. Inputs must have `id` to match `<label for="...">`.
2. The form itself should have an `id` if it is a target or referenced.

Example:
```html
<form id="contact-form" data-ui-id="contact-form" data-ui-type="form">
  <label for="email">Email</label>
  <input id="email" name="email" data-ui-id="contact-email" data-ui-type="input" />
</form>
```

---

## 10. ARIA relationships

When `aria-labelledby` or `aria-describedby` is used:
1. The referenced elements must have stable `id` values.
2. Those IDs must not be reused elsewhere.

---

## 11. Implementation guidance for automated tools

When applying this standard:
1. Identify every semantic tag in markup.
2. Add `id` only when it is referenceable or targetable.
3. Use stable, slug-based IDs.
4. Avoid adding IDs to purely structural elements.
5. Keep `class` purely for styling, not semantics.
6. If an element is interactive, use data-ui attributes for function.
7. When both `id` and `data-ui-id` are needed, prefer matching values (see §6).

---

End of document.
