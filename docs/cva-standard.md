# CVA Standard and Variant Architecture Guide

This document defines a system-wide, implementation-ready standard for Class Variance Authority (CVA) usage. It is designed for automated coding agents to apply consistently across projects. It is platform-level only and contains no client-specific references.

Last updated: 2026-03-24

---

## 1. Scope and goals

Goals:
1. Replace hardcoded Tailwind classes in platform components with CVA variants.
2. Centralize styling decisions in semantic tokens and variant props.
3. Provide stable, scalable styling contracts for clients and future sections.
4. Ensure variants map cleanly to design tokens and themes.

Non-goals:
1. No changes to runtime, adapters, or CMS contracts are required.
2. No client-specific styles should be embedded in platform code.
3. No visual redesign is required unless explicitly requested.

---

## 2. Core principles

1. Variants express intent, not raw styling.
2. Tokens are the only color source (no direct hex or raw palette in module code).
3. Base styles are minimal and stable; variants add deltas.
4. Defaults are explicit and consistent across components.
5. Client overrides happen via props, not by className strings.

---

## 3. Allowed CVA usage zones

Allowed:
1. `packages/components/src/basics/*`
2. `packages/components/src/modules/*`
3. `packages/components/src/elements/*` (only if element is reused widely)

Not allowed:
1. `packages/sections/*` (definitions only)
2. `packages/templates/*` (layout only)
3. `packages/runtime/*` (logic only)
4. `packages/data/*` (logic only)
5. `packages/themes/*` (tokens only)
6. Client apps should only use CVA if they are implementing custom components, not to override platform components.

---

## 4. Token constraints

All colors and surfaces must use semantic tokens:
1. `bg-background`, `text-foreground`
2. `bg-muted`, `text-muted-foreground`
3. `bg-surface`, `border-border`
4. `text-accent`, `bg-accent`, `text-accent-foreground`

Never use raw palette colors inside platform modules:
1. `bg-gray-900`, `text-blue-600`, `bg-white`
2. Hex values

Reason:
1. Tokens are themeable and stable.
2. Raw colors break client theming and create visual drift.

---

## 5. Variant naming conventions

Variant names must be semantic and repeatable across components:
1. `colorScheme` (e.g. `light`, `dark`) — color token selection
2. `variant` (e.g. `light`, `dark`, `transparent`) — behavioral/appearance mode (use INSTEAD of colorScheme when values go beyond light/dark)
3. `layout` (e.g. `centered`, `split`, `stacked`)
4. `size` (e.g. `sm`, `md`, `lg`, `full`)
5. `density` (e.g. `compact`, `default`, `spacious`)
6. `tone` (e.g. `neutral`, `brand`, `subtle`)

Rule: `colorScheme` and `variant` must NOT coexist in the same component.
Use `colorScheme` when the only distinction is light vs dark token sets.
Use `variant` when additional modes exist beyond light/dark (e.g. `transparent` overlay).

Avoid component-specific or design-specific names:
1. `purple`
2. `heroBlue`
3. `neon`

---

## 6. Variant defaults

Every CVA definition must include `defaultVariants`.

Standard default conventions:
1. `colorScheme: "light"`
2. `layout: "centered"` (if applicable)
3. `size: "default"` or `"md"`
4. `density: "default"`

---

## 7. Variant surface area rules

Variants should not overlap in purpose:
1. `colorScheme` controls color tokens only.
2. `layout` controls spacing and structural layout.
3. `size` controls padding, font size, and height.
4. `density` controls spacing density and gap sizes.

Avoid mixing concerns across variants.

---

## 8. Compound variants

Use compound variants only when needed:
1. If `colorScheme="dark"` and `layout="split"` requires extra adjustments.
2. If `size="full"` and `layout="centered"` requires special alignment.

Keep compound rules minimal and documented.

---

## 9. CVA usage pattern

Standard pattern:
1. Define `cva` with base class and variants.
2. Export `VariantProps` type.
3. Component props extend `VariantProps<typeof ...>`.
4. Merge `className` with `cn()` and CVA output.

Example:
```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

const heroVariants = cva(
  'relative w-full flex items-center',
  {
    variants: {
      colorScheme: {
        light: 'bg-background text-foreground',
        dark: 'bg-background text-foreground',
      },
      layout: {
        centered: 'text-center',
        split: 'text-left',
      },
      size: {
        default: 'py-20 md:py-32',
        compact: 'py-12 md:py-20',
        full: 'min-h-screen',
      },
    },
    defaultVariants: {
      colorScheme: 'light',
      layout: 'centered',
      size: 'default',
    },
  }
)

export interface HeroBlockProps extends VariantProps<typeof heroVariants> {
  title: string
  className?: string
}

export function HeroBlock({ colorScheme, layout, size, className, title }: HeroBlockProps) {
  return (
    <section className={cn(heroVariants({ colorScheme, layout, size }), className)}>
      {title}
    </section>
  )
}
```

---

## 10. Props boundaries and client usage

Platform components:
1. Expose variant props in their public API.
2. Do not expose raw class strings as required inputs.
3. `className` may exist but is optional and should be additive.

Client usage:
1. Clients should change look by setting variant props only.
2. Clients should not override base styles with `className` except for edge cases.

---

## 11. Section data and CVA

Section data can include variant props in `data` payload:
1. `colorScheme`
2. `layout`
3. `size`

These are serialized in CMS and passed through `SectionRenderer`.

---

## 12. Component-level variant templates

### 12.1 HeroBlock
Variants:
1. `colorScheme: light | dark`
2. `layout: centered | split`
3. `size: default | compact | full`

### 12.2 AboutBlock
Variants:
1. `colorScheme: light | dark`
2. `imagePosition: left | right`

### 12.3 FeaturesBlock
Variants:
1. `colorScheme: light | dark`
2. `columns: 2 | 3 | 4`

### 12.4 GalleryBlock
Variants:
1. `colorScheme: light | dark`
2. `showCategories: true | false`

### 12.5 ContactBlock
Variants:
1. `colorScheme: light | dark`

### 12.6 NavigationBar
Variants:
1. `variant: light | dark | transparent`

### 12.7 FooterBlock
Variants:
1. `colorScheme: light | dark`

---

## 13. Interaction with design tokens

Tokens must support both light and dark themes:
1. `background`
2. `foreground`
3. `muted`
4. `muted-foreground`
5. `surface`
6. `border`
7. `accent`
8. `accent-foreground`

All modules must rely on these tokens, not literal palette values.

---

## 14. Anti-patterns

Disallowed:
1. `className` as required styling input for layout or colors.
2. Raw palette usage in component bodies.
3. Variants named after brand colors.
4. Duplicate variants that do the same job.

---

## 15. Automated enforcement ideas

Suggested checks:
1. Disallow `bg-white`, `text-gray-*`, `bg-primary-*` in `packages/components/src/modules`.
2. Require `cva()` usage in modules that currently hardcode layout and color.
3. Ensure every `cva()` has `defaultVariants`.
4. Ensure all variant props are typed via `VariantProps`.

---

## 16. Semantic Token Layer

The platform currently uses build-time Tailwind presets with `primary-*` / `secondary-*` color scales.
Semantic tokens (`background`, `foreground`, `muted`, etc.) do NOT yet exist in the codebase.

### 16.1 Implementation approach: CSS custom properties + Tailwind bridge

The token layer uses CSS custom properties defined in `@layer base`, consumed by Tailwind `colors` config.

**Step 1 — CSS variables in the client's `index.css`:**

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222 47% 11%;
    --muted: 210 40% 96%;
    --muted-foreground: 215 16% 47%;
    --surface: 0 0% 100%;
    --border: 214 32% 91%;
    --accent: 210 40% 96%;
    --accent-foreground: 222 47% 11%;
  }

  [data-color-scheme="dark"] {
    --background: 222 47% 11%;
    --foreground: 210 40% 98%;
    --muted: 217 33% 17%;
    --muted-foreground: 215 20% 65%;
    --surface: 217 33% 17%;
    --border: 217 33% 17%;
    --accent: 217 33% 17%;
    --accent-foreground: 210 40% 98%;
  }
}
```

**Step 2 — Tailwind config maps CSS vars to utility classes:**

```typescript
// In theme preset or client tailwind.config.ts
colors: {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
  surface: 'hsl(var(--surface))',
  border: 'hsl(var(--border))',
  accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
}
```

**Step 3 — Components use semantic classes:**

`bg-background text-foreground` → resolves to CSS vars → different values under `[data-color-scheme="dark"]`.

### 16.2 Brand colors vs semantic tokens

| Layer | Where defined | Purpose | Example |
|-------|--------------|---------|--------|
| Brand colors | `@spektra/themes` preset | Build-time palette | `primary-600`, `secondary-500` |
| Semantic tokens | CSS vars in client `index.css` | Runtime theme slots | `bg-background`, `text-foreground` |

Brand colors (primary/secondary) remain in Tailwind presets — they are used for gradients, accents, and brand-specific elements.
Semantic tokens are the DEFAULT for surfaces, text, borders — they enable light/dark switching.

### 16.3 Token table

| Token | Tailwind class | CSS var | Light default | Dark default |
|-------|---------------|---------|---------------|-------------|
| background | `bg-background` | `--background` | white | slate-900 |
| foreground | `text-foreground` | `--foreground` | slate-900 | slate-50 |
| muted | `bg-muted` | `--muted` | slate-100 | slate-800 |
| muted-foreground | `text-muted-foreground` | `--muted-foreground` | slate-500 | slate-400 |
| surface | `bg-surface` | `--surface` | white | slate-800 |
| border | `border-border` | `--border` | slate-200 | slate-700 |
| accent | `bg-accent` | `--accent` | slate-100 | slate-800 |
| accent-foreground | `text-accent-foreground` | `--accent-foreground` | slate-900 | slate-50 |
| destructive | `bg-destructive` | `--destructive` | red-500 | red-600 |
| destructive-foreground | `text-destructive-foreground` | `--destructive-foreground` | white | white |

---

## 17. colorScheme Mechanism

The `colorScheme` variant does NOT toggle a global dark mode.
It applies per-section via a `data-color-scheme` attribute on the section wrapper element.

### 17.1 How it works

1. Section data includes `colorScheme: "dark"` (or `"light"`, default).
2. The platform Section wrapper renders `<section data-color-scheme={colorScheme}>`.
3. CSS vars under `[data-color-scheme="dark"]` override `:root` values within that subtree.
4. CVA variant maps `colorScheme` to structural adjustments only (e.g. different ring colors).
   The actual color switching happens via CSS vars, NOT duplicate Tailwind class lists.

### 17.2 CVA colorScheme variant: what it controls

```typescript
colorScheme: {
  light: '',  // no extra classes — :root CSS vars apply
  dark: '',   // no extra classes — [data-color-scheme="dark"] CSS vars apply
}
```

If a component needs structural differences between light/dark (e.g. different border opacity, ring color),
use compound variants:

```typescript
compoundVariants: [
  { colorScheme: 'dark', className: 'ring-white/10' },
]
```

### 17.3 data-color-scheme responsibility

The `data-color-scheme` attribute can be set at **two levels**:

1. **Section wrapper** (`Section.tsx`) — when the page uses the generic `Section` wrapper
   to compose layout, the wrapper applies `data-color-scheme={colorScheme}`.
2. **Module components** (HeroBlock, AboutBlock, etc.) — modules render their own `<section>`
   element and do NOT use the Section wrapper. They accept a `colorScheme` prop and apply
   `data-color-scheme={colorScheme ?? undefined}` directly on their root `<section>`.

**Rule:** The attribute must appear exactly once per section subtree — never both on a wrapping
`Section` AND on the inner module. Since platform modules render their own `<section>`, they
own the attribute. The Section wrapper is for custom/composed layouts only.

```tsx
// Module pattern (HeroBlock, AboutBlock, etc.) — module owns the attribute
<section data-color-scheme={colorScheme ?? undefined} className={...}>

// Wrapper pattern (Section.tsx) — for custom compositions
<Section colorScheme="dark"><CustomContent /></Section>
```

---

## 18. Section Data → Variant Props TypeScript

### 18.1 How variant props flow from CMS to component

```
CMS/JSON → Section<T>.data → SectionRenderer → <Component {...data} />
```

Variant props (`colorScheme`, `layout`, `size`) live INSIDE `T` — they are regular component props.
No special runtime handling is needed; `SectionRenderer` already spreads `section.data`.

### 18.2 TypeScript pattern

```typescript
// Component props include variant props
export interface HeroBlockProps extends VariantProps<typeof heroVariants> {
  title: string
  description?: string
  className?: string
}

// Section data in JSON/CMS includes variant values
{
  type: 'hero',
  id: 'hero-1',
  data: {
    title: 'Welcome',
    colorScheme: 'dark',   // ← variant prop, part of HeroBlockProps
    layout: 'centered',    // ← variant prop
  }
}
```

No `@spektra/types` changes needed — `Section<T>` is already generic.
The variant props are simply part of the component's props type `T`.

### 18.3 VariantProps and null

CVA `VariantProps` makes all variant fields `T | null | undefined`.
This is by design — missing values fall back to `defaultVariants`.
Do NOT mark variant props as required in component interfaces.

---

## 19. Per-Component Implementation Reference

Concrete before→after for each platform module.
`→` indicates the class change. Only color/surface classes change; layout classes stay.

### 19.1 HeroBlock

| Class (before) | Class (after) | Notes |
|----------------|---------------|-------|
| `bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700` | `bg-background` | Gradient moves to client override or compound variant |
| `text-white` | `text-foreground` | |
| `bg-white` (CTA) | `bg-accent` | |
| `text-primary-600` (CTA) | `text-accent-foreground` | |

Variants: `colorScheme: light \| dark`, `layout: centered \| split`, `size: default \| compact \| full`

### 19.2 AboutBlock

| Class (before) | Class (after) |
|----------------|---------------|
| `bg-white` | `bg-background` |
| `text-gray-900` | `text-foreground` |
| `text-gray-600` | `text-muted-foreground` |
| `bg-gray-50` (stats) | `bg-muted` |

Variants: `colorScheme: light \| dark`, `imagePosition: left \| right`

### 19.3 FeaturesBlock

| Class (before) | Class (after) |
|----------------|---------------|
| `bg-gray-50` | `bg-muted` |
| `text-gray-900` | `text-foreground` |
| `text-gray-600` | `text-muted-foreground` |
| `bg-white` (card) | `bg-surface` |

Variants: `colorScheme: light \| dark`, `columns: 2 \| 3 \| 4`

### 19.4 GalleryBlock

| Class (before) | Class (after) |
|----------------|---------------|
| `bg-white` | `bg-background` |
| `text-gray-900` | `text-foreground` |
| `bg-primary-600` (filter active) | `bg-accent` |

Variants: `colorScheme: light \| dark`, `showCategories: true \| false`

### 19.5 ContactBlock

| Class (before) | Class (after) |
|----------------|---------------|
| `bg-gray-50` | `bg-muted` |
| `text-gray-900` | `text-foreground` |
| `border-gray-300` | `border-border` |
| `bg-white` (input) | `bg-surface` |

Variants: `colorScheme: light \| dark`

### 19.6 NavigationBar

| Class (before) | Class (after) |
|----------------|---------------|
| `bg-white` | `bg-background` |
| `text-gray-900` | `text-foreground` |
| `border-gray-200` | `border-border` |

Variants: `variant: light \| dark \| transparent` (uses `variant`, NOT `colorScheme` — see §5)

### 19.7 FooterBlock

| Class (before) | Class (after) |
|----------------|---------------|
| `bg-gray-900` | `bg-background` |
| `text-white` | `text-foreground` |
| `text-gray-400` | `text-muted-foreground` |

Variants: `colorScheme: light \| dark`

### 19.8 Button (basics)

| Class (before) | Class (after) |
|----------------|---------------|
| `bg-primary-600` | `bg-accent` |
| `text-white` | `text-accent-foreground` |
| `border-gray-300` (outline) | `border-border` |

Variants: `variant: primary \| secondary \| outline \| ghost`, `size: sm \| md \| lg`

### 19.9 Card (basics)

| Class (before) | Class (after) |
|----------------|---------------|
| `bg-white` | `bg-surface` |
| `border-gray-200` | `border-border` |

Variants: `tone: neutral \| brand \| subtle`, `padding: sm \| md \| lg`

---

## 20. Extra system components to consider (often missed)

These are cross-cutting components that often need CVA support:
1. Button (size, variant)
2. Card (tone, padding)
3. Input and Textarea (size, invalid state)
4. Badge / Tag components (tone, size)
5. Section wrappers (spacing density)
6. Container (width, padding, alignment)
7. CTAGroup (layout, density)

If these exist or are added, they must follow the same CVA rules.

---

## 21. Implementation guidance for automated tools

When applying this standard:
1. Ensure the semantic token CSS vars exist in the client `index.css` (see §16.1).
2. Ensure the Tailwind config maps CSS vars to utility classes (see §16.2).
3. Identify modules with hardcoded color classes — use the before→after table in §19.
4. Replace with CVA using token-based classes.
5. Add `VariantProps` to component props.
6. Add `data-color-scheme` attribute to Section wrapper (see §17.3).
7. Update any `Section` data used in demos or tests to include new variant props.
8. Verify `colorScheme` and `variant` do not coexist in the same component (see §5).
9. Avoid refactoring logic or data flow.

---

End of document.
