# UI Architecture

## Context

Spektra uses a strict layered architecture to ensure component reusability, maintainability, and clear separation of concerns. The UI layer is structured using a reinterpretation of Atomic Design principles, adapted to fit the Spektra philosophy: **data-driven, client-agnostic components**.

The problem this solves:
- Prevents component spaghetti where everything imports everything
- Enforces clear responsibility boundaries
- Enables component reuse across projects
- Maintains engine independence from project-specific logic

## Decision

Spektra adopts Atomic Design with the following explicit mapping:

| Atomic Design | Spektra Layer | Location | Description |
|---------------|---------------|----------|-------------|
| **Atoms** | **UI** | `engine/packages/core/components/ui/` | Primitive, single-purpose elements (buttons, inputs, icons) |
| **Molecules** | **Features** | `engine/packages/core/components/features/` | Simple functional units (cards, form groups, navigation items) |
| **Organisms** | **Sections** | `engine/packages/core/components/sections/` | Complex, standalone layout blocks (heroes, galleries, footers) |
| **Templates** | **Layouts** | `engine/packages/core/components/layouts/` | Page-level layouts (landing page, blog layout) |

### Why this mapping?

- **UI** = Atoms: Clear naming - these are pure UI primitives
- **Features** = Molecules: Features are composed of UI elements
- **Sections** = Organisms: Sections are visible on pages as distinct blocks
- **Layouts** = Templates: Page-level compositions

## Structure

```
engine/packages/core/
├── components/
│   ├── ui/                    # Atoms: Button, Input, Icon, Badge
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Icon.tsx
│   ├── features/              # Molecules: Card, NavItem, FormGroup
│   │   ├── Card.tsx
│   │   ├── NavItem.tsx
│   │   └── FormGroup.tsx
│   ├── sections/              # Organisms: Hero, Gallery, Footer
│   │   ├── Hero.tsx
│   │   ├── Gallery.tsx
│   │   └── Footer.tsx
│   └── layouts/               # Layouts: LandingLayout, BlogLayout
│       ├── LandingLayout.tsx
│       └── BlogLayout.tsx
├── hooks/                     # Reusable React hooks
├── utils/                     # Helper functions
└── design-system/             # Theme and design tokens
```

## Rules

### Import Hierarchy (Upward Only)

Components can ONLY import from layers below them:

```
Layouts
    ↑ can import
Sections (Organisms)
    ↑ can import
Features (Molecules)
    ↑ can import
UI (Atoms)
    ↑ can import
Utils / Hooks / Design System
```

### ✅ ALLOWED:

1. **UI (Atoms)**
   - Import: utils, hooks, design system
   - Export: primitive components
   - Props: minimal, generic (text, onClick, variant)

2. **Features (Molecules)**
   - Import: UI components, utils, hooks
   - Export: functional units
   - Props: typed, specific (user: User, onSubmit: Function)

3. **Sections (Organisms)**
   - Import: Features, UI, utils, hooks
   - Export: layout sections
   - Props: data-driven (data: HeroData)

4. **Templates**
   - Import: Sections, Features, UI
   - Export: full page layouts
   - Props: comprehensive data (pageData: PageData)

### ❌ FORBIDDEN:

1. **Downward imports**
   ```tsx
   // ❌ NEVER - Atoms cannot import from Molecules
   // In ui/Button.tsx
   import { Card } from '../features/Card';
   ```

2. **Skipping layers**
   ```tsx
   // ❌ NEVER - Molecules cannot import Organisms
   // In features/Card.tsx
   import { Hero } from '../sections/Hero';
   ```

3. **Cross-layer sibling imports**
   ```tsx
   // ❌ NEVER - Section cannot import another Section directly
   // In sections/Hero.tsx
   import { Footer } from './Footer'; // Use composition instead
   ```

4. **Project imports in engine**
   ```tsx
   // ❌ NEVER - Engine cannot import from projects
   import { BellatorConfig } from '../../../projects/bellator/config';
   ```

### Component Responsibility Rules

#### UI (Atoms)
- **Purpose:** Primitive, generic, reusable
- **Data:** No business logic, no data fetching
- **Styling:** Design tokens only
- **Example:** Button, Input, Icon, Badge, Link

```tsx
// ✅ Good Atom
export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick 
}) => {
  return (
    <button className={cn('btn', `btn-${variant}`)} onClick={onClick}>
      {children}
    </button>
  );
};
```

#### Features (Molecules)
- **Purpose:** Functional units combining UI atoms
- **Data:** Receives typed data via props
- **Composition:** Uses 2-4 UI components
- **Example:** Card, NavItem, FormGroup, PriceBox

```tsx
// ✅ Good Molecule
export const Card: React.FC<CardProps> = ({ title, description, image }) => {
  return (
    <div className="card">
      <Image src={image} alt={title} />
      <Heading level={3}>{title}</Heading>
      <Text>{description}</Text>
    </div>
  );
};
```

#### Sections (Organisms)
- **Purpose:** Complex, standalone page sections
- **Data:** Receives structured data via props
- **Composition:** Uses Features and UI
- **Example:** Hero, Gallery, Testimonials, Footer

```tsx
// ✅ Good Organism
export const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section className="hero">
      <Container>
        <Heading level={1}>{data.title}</Heading>
        <Text>{data.description}</Text>
        <Button href={data.ctaUrl}>{data.ctaText}</Button>
      </Container>
    </section>
  );
};
```

#### Templates
- **Purpose:** Full page layouts
- **Data:** Receives complete page data
- **Composition:** Composes Sections
- **Example:** LandingPage, BlogPost, ProductPage

```tsx
// ✅ Good Template
export const LandingPage: React.FC<LandingPageProps> = ({ data }) => {
  return (
    <>
      <Hero data={data.hero} />
      <Features data={data.features} />
      <Testimonials data={data.testimonials} />
      <Footer data={data.footer} />
    </>
  );
};
```

## Tooling Impact

### ESLint Enforcement

The `engine/packages/config/eslint/engine-guardrails.js` enforces:
- No imports from `projects/`
- No CMS-specific libraries
- No client-specific string literals

### Build Validation

TurboRepo ensures:
- Dependency order is correct
- Build fails if circular dependencies exist
- Each layer builds independently

### TypeScript

- All components must be strongly typed
- Props interfaces must be exported
- Data contracts must be defined in `types/`

### Copilot Instructions

GitHub Copilot must:
1. Read this document before creating components
2. Respect layer boundaries strictly
3. Add TODO comments when structure is ambiguous
4. Never assume intent - ask or infer from existing patterns

## Versioning Notes

Changes to this architecture are **MAJOR** version bumps:
- Adding/removing layers = MAJOR
- Changing layer responsibilities = MAJOR
- Renaming layers = MAJOR

Component changes within layers:
- New components = MINOR
- Component API changes = MAJOR (breaking)
- Bug fixes = PATCH

## Related Docs

- [Validation Pipeline](../validation/validation-pipeline.md) - How builds are validated
- [Guardrails](../validation/guardrails.md) - Architectural constraints
- [Package Management](../tooling/package-management.md) - PNPM and Turbo usage
- [Versioning Strategy](../versioning/versioning-strategy.md) - SemVer rules
