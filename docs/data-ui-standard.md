# Data UI Standard and Semantic Markup Guide

This document defines a system-wide, implementation-ready standard for:
1. Data UI attributes (`data-ui-*`)
2. Semantic HTML tags
3. CVA usage boundaries

It is written to be handed to an automated coding agent (e.g. VS Code Copilot, Claude) to implement consistently across projects. It is platform-level only and contains no client-specific references.

Last updated: 2026-03-24

---

## 1. Scope and goals

Goals:
1. Make UI elements machine-readable for AI, automation, analytics, and E2E tests.
2. Ensure attribute usage is stable across refactors and styling changes.
3. Keep markup semantic, accessible, and consistent.
4. Avoid redundant or purely stylistic metadata.

Non-goals:
1. This spec does not require changes to runtime logic.
2. This spec does not require changes to the data model or CMS contracts.
3. This spec does not introduce new dependencies, unless explicitly approved.

---

## 2. Core principles

1. Functional over stylistic.
   Data UI attributes must describe function, not appearance.
2. Stable identifiers.
   IDs must remain stable across reordering and layout changes.
3. Minimal necessary metadata.
   Only include attributes required to identify, interpret, or automate.
4. Single source of truth.
   Do not duplicate meaning between `className` and `data-ui-*`.
5. Semantic HTML first.
   Use native HTML5 semantic tags whenever possible.

---

## 3. Data UI attribute taxonomy

The standard list of allowed attributes is:
1. `data-ui-id`
2. `data-ui-type`
3. `data-ui-role`
4. `data-ui-action`
5. `data-ui-target`
6. `data-ui-trigger`
7. `data-ui-status`
8. `data-ui-visible`
9. `data-ui-active`
10. `data-ui-component`
11. `data-ui-value`
12. `data-ui-label`
13. `data-ui-required`
14. `data-ui-format`

Any `data-ui-*` attribute not in this list is disallowed by default.

---

## 4. Why certain attributes are disallowed

Disallowed attributes:
1. `data-ui-class`
2. `data-ui-state`
3. `data-ui-variant`
4. `data-ui-slot`
5. `data-ui`

Reasons:
1. These describe styling, presentation, or internal implementation, not function.
2. They drift when CSS or component structure changes.
3. They duplicate meanings already covered by allowed attributes.
4. They degrade machine interpretability by adding non-functional noise.

Special note on `data-ui-class`:
1. It duplicates `className` but is less precise.
2. It does not express what the element does.
3. It becomes incorrect after any visual redesign.
4. It should be replaced by `data-ui-action`, `data-ui-type`, or `data-ui-role`.

If a legacy system depends on any disallowed attribute, migrate usage to allowed attributes and then remove the legacy attribute.

---

## 5. Required attributes by element category

### 5.1 Root component or section
Required:
1. `data-ui-id`
2. `data-ui-role`
3. `data-ui-component`

Optional:
1. `data-ui-status`
2. `data-ui-visible`

### 5.2 Interactive element (button, link, toggle)
Required:
1. `data-ui-id`
2. `data-ui-type`
3. `data-ui-action`
4. `data-ui-trigger`

Optional:
1. `data-ui-target`
2. `data-ui-active`
3. `data-ui-status`

### 5.3 Form element (form)
Required:
1. `data-ui-id`
2. `data-ui-type="form"`
3. `data-ui-action="submit-form"`
4. `data-ui-trigger="submit"`

Optional:
1. `data-ui-status`
2. `data-ui-visible`

### 5.4 Input field (input, textarea, select)
Required:
1. `data-ui-id`
2. `data-ui-type` (see §5.6 for canonical values)
3. `data-ui-required`
4. `data-ui-format`

Optional:
1. `data-ui-label`
2. `data-ui-value`
3. `data-ui-status`

### 5.5 Non-interactive content
Required:
1. `data-ui-id` if the element must be referenceable
2. `data-ui-role` if the element has a semantic function

Optional:
1. `data-ui-label` for ambiguous text

### 5.6 Canonical `data-ui-type` values

The following is the closed list of allowed `data-ui-type` values.
Do not invent new type values; use the closest match.

Interactive elements:
1. `button`
2. `link`
3. `toggle`

Form controls:
1. `input`
2. `textarea`
3. `select`
4. `checkbox`
5. `radio`
6. `form`

Content elements:
1. `image`
2. `icon`
3. `badge`
4. `card`

Structural elements:
1. `section`
2. `nav`
3. `header`
4. `footer`

### 5.7 Canonical `data-ui-role` values

The following is the canonical list of allowed `data-ui-role` values.
New roles may only be added if none of the below covers the intent.
Any new role must be documented in this list before use.

ARIA landmark roles (standard HTML5):
1. `banner`
2. `navigation`
3. `main`
4. `complementary`
5. `contentinfo`
6. `region`

Section semantic roles:
1. `hero` — primary landing/hero section
2. `brand-bar` — brand or partner showcase strip
3. `gallery` — image or media gallery
4. `service-list` — overview of multiple services
5. `service-detail` — single service deep-dive
6. `about` — company or personal info
7. `team` — team member listing
8. `cta` — call-to-action block (e.g. emergency, promo)
9. `contact` — contact information or form
10. `map` — embedded map or location

Content element roles:
1. `section-title` — primary heading of a section (h2/h3/h4)
2. `section-subtitle` — secondary heading or tagline above the title
3. `section-description` — introductory paragraph below the title
4. `item-title` — heading of a repeated item (card, member, service)
5. `item-description` — description of a repeated item
6. `feedback-title` — heading of a success/error/info feedback block
7. `feedback-description` — body text of a feedback block
8. `meta` — auxiliary metadata (e.g. service area, date, category)
9. `scroll-indicator` — visual scroll cue element
10. `logo` — brand or site logo element

---

## 6. Stable ID rules

Allowed:
1. Slug-based IDs.
   Example: `data-ui-id="nav-link-services"`
2. Domain keys.
   Example: `data-ui-id="gallery-item-audi-rs3"`
3. CMS or data-backed stable keys.
   Example: `data-ui-id="section-hero-home"`

Disallowed:
1. Index-based IDs.
   Example: `data-ui-id="nav-link-0"`
2. CSS-based IDs.
   Example: `data-ui-id="primary-cta"`
3. Random or generated IDs.
   Example: `data-ui-id="id-98123"`

---

## 7. Action metadata rules

When any of these is present:
1. `onClick`
2. `onSubmit`
3. `onChange`
4. `onHover`

Then the element must include:
1. `data-ui-action`
2. `data-ui-trigger`

If the action affects another element, also include:
1. `data-ui-target`

Trigger values must be normalized:
1. `click`
2. `submit`
3. `change`
4. `hover`
5. `focus`
6. `blur`

Action values must be verbs from this canonical list:
1. `open`
2. `close`
3. `toggle`
4. `submit-form`
5. `navigate`
6. `scroll-to`
7. `play`
8. `pause`
9. `filter`
10. `select`
11. `download`
12. `copy`
13. `expand`
14. `collapse`
15. `call`
16. `email`
17. `reset`

New actions may only be added if none of the above covers the intent.
Any new action must be documented in this list before use.

---

## 8. State metadata rules

Use the following fields only if the UI state is actually visible or important:
1. `data-ui-status` with values like `loading`, `error`, `success`, `disabled`.
2. `data-ui-visible` with values `true` or `false`.
3. `data-ui-active` with values `true` or `false`.

Do not use any additional state attributes.

---

## 9. Semantic HTML rules

Required:
1. `header` for page headers.
2. `nav` for navigation bars.
3. `main` for the primary content region.
4. `section` for page sections.
5. `footer` for page footers.
6. `form` for forms.
7. `figure` and `figcaption` when images have captions.

Disallowed:
1. `div` for elements that have a clear semantic tag.

---

## 10. CVA usage rules

1. CVA may be used in `packages/components/src` for modules and basics.
2. CVA must use tokens like `bg-background`, `text-foreground`, `border-border`.
3. Variants must be semantic.
4. Default variants must be defined.
5. Clients must change styling by setting variant props, not by overriding class strings.

---

## 11. Allowed attribute mapping from legacy patterns

If legacy code uses:
1. `data-ui-class` -> remove, or replace with `data-ui-role` or `data-ui-component`.
2. `data-ui-state` -> replace with `data-ui-status`.
3. `data-ui-variant` -> replace with `data-ui-type` or `data-ui-component`.
4. `data-ui-slot` -> replace with `data-ui-label` or `data-ui-component`.
5. `data-ui` -> remove.

---

## 12. Examples

### 12.1 Navigation link
Before:
`data-ui-id="nav-link-0" data-ui-class="nav-link" data-ui-role="link"`

After:
1. `data-ui-id="nav-link-services"`
2. `data-ui-type="link"`
3. `data-ui-role="navigation-link"`
4. `data-ui-action="navigate"`
5. `data-ui-trigger="click"`
6. `data-ui-target="section-services"`

### 12.2 CTA button
Before:
`data-ui-id="hero-primary-cta" data-ui-class="primary-cta" data-ui-role="primary-cta"`

After:
1. `data-ui-id="hero-primary-cta"`
2. `data-ui-type="button"`
3. `data-ui-role="cta"`
4. `data-ui-action="open-contact"`
5. `data-ui-trigger="click"`

### 12.3 Input field
Before:
`<input id="phone" required ... />`

After:
1. `data-ui-id="lead-phone"`
2. `data-ui-type="input"`
3. `data-ui-required="true"`
4. `data-ui-format="phone"`
5. `data-ui-label="Phone number"`

---

## 13. Automated enforcement rules

Minimum checks:
1. No `data-ui-*` attributes outside the allowed list.
2. If `onClick` then `data-ui-action` and `data-ui-trigger` must exist.
3. If `onSubmit` then `data-ui-action="submit-form"` and `data-ui-trigger="submit"` must exist.
4. If `input/textarea/select` then `data-ui-required` and `data-ui-format` must exist.
5. No index-based `data-ui-id`.

---

## 14. Per-Component Data-UI Reference

Concrete `data-ui-*` attributes for each platform component.

### 14.1 HeroBlock

```tsx
<section
  data-ui-id="section-hero"
  data-ui-component="HeroBlock"
  data-ui-role="hero"
>
  <a data-ui-id="hero-primary-cta" data-ui-type="link" data-ui-role="cta"
     data-ui-action="scroll-to" data-ui-trigger="click" data-ui-target="section-contact" />
  <a data-ui-id="hero-secondary-cta" data-ui-type="link" data-ui-role="cta"
     data-ui-action="scroll-to" data-ui-trigger="click" data-ui-target="section-features" />
</section>
```

### 14.2 AboutBlock

```tsx
<section
  data-ui-id="section-about"
  data-ui-component="AboutBlock"
  data-ui-role="about"
>
  <a data-ui-id="about-cta" data-ui-type="link" data-ui-role="cta"
     data-ui-action="scroll-to" data-ui-trigger="click" />
</section>
```

### 14.3 FeaturesBlock

```tsx
<section
  data-ui-id="section-features"
  data-ui-component="FeaturesBlock"
  data-ui-role="features"
>
  {/* FeatureCard */}
  <div data-ui-id="feature-{slug}" data-ui-component="FeatureCard" data-ui-role="feature-item" />
</section>
```

### 14.4 GalleryBlock

```tsx
<section
  data-ui-id="section-gallery"
  data-ui-component="GalleryBlock"
  data-ui-role="gallery"
>
  <button data-ui-id="gallery-filter-{category}" data-ui-type="button"
          data-ui-action="filter" data-ui-trigger="click" data-ui-active="true|false" />
  <figure data-ui-id="gallery-item-{slug}" data-ui-role="gallery-item" />
</section>
```

### 14.5 ContactBlock

```tsx
<section
  data-ui-id="section-contact"
  data-ui-component="ContactBlock"
  data-ui-role="contact"
>
  <form data-ui-id="contact-form" data-ui-type="form"
        data-ui-action="submit-form" data-ui-trigger="submit"
        data-ui-status="idle|loading|success|error">
    <input data-ui-id="contact-name" data-ui-type="input"
           data-ui-required="true" data-ui-format="text" />
    <input data-ui-id="contact-email" data-ui-type="input"
           data-ui-required="true" data-ui-format="email" />
    <input data-ui-id="contact-phone" data-ui-type="input"
           data-ui-required="false" data-ui-format="phone" />
    <textarea data-ui-id="contact-message" data-ui-type="textarea"
              data-ui-required="true" data-ui-format="text" />
    <button data-ui-id="contact-submit" data-ui-type="button"
            data-ui-action="submit-form" data-ui-trigger="click" />
  </form>
</section>
```

### 14.6 NavigationBar

```tsx
<header
  data-ui-id="page-header"
  data-ui-component="NavigationBar"
  data-ui-role="navigation"
>
  <nav data-ui-id="primary-nav">
    <a data-ui-id="nav-link-{slug}" data-ui-type="link"
       data-ui-action="navigate" data-ui-trigger="click"
       data-ui-target="section-{slug}" />
  </nav>
  <button data-ui-id="nav-menu-toggle" data-ui-type="button"
          data-ui-action="toggle" data-ui-trigger="click"
          data-ui-target="mobile-menu" data-ui-active="true|false" />
</header>
```

### 14.7 FooterBlock

```tsx
<footer
  data-ui-id="page-footer"
  data-ui-component="FooterBlock"
  data-ui-role="footer"
>
  <a data-ui-id="footer-link-{slug}" data-ui-type="link"
     data-ui-action="navigate" data-ui-trigger="click" />
  <a data-ui-id="social-{platform}" data-ui-type="link"
     data-ui-action="navigate" data-ui-trigger="click" />
</footer>
```

---

## 15. Decision matrix for adding attributes

Use this matrix during implementation:
1. Is the element interactive.
   If yes, add `data-ui-action` and `data-ui-trigger`.
2. Does the element affect another element.
   If yes, add `data-ui-target`.
3. Is the element a form control.
   If yes, add `data-ui-required` and `data-ui-format`.
4. Is the element a component root or section.
   If yes, add `data-ui-component` and `data-ui-role`.

---

## 16. Implementation guidance for automated tools

When applying this standard:
1. Identify all interactive elements and add action metadata.
2. Remove disallowed `data-ui-*` attributes.
3. Replace index-based IDs with stable IDs.
4. Add missing semantic tags and remove unnecessary `div` wrappers.
5. Do not change runtime logic unless a refactor explicitly requires it.
6. Do not change visual styling unless it is required to add semantic tags.

---

## 17. Notes on future projects

For all new clients:
1. Start with this standard in the template scaffold.
2. Include a lint rule or script to enforce this standard.
3. Prefer stable IDs derived from content or data keys.
4. Keep CVA usage in platform components only.

---

End of document.
