# Architectural Guardrails

## Context

Spektra's architecture depends on strict separation between:
- **Engine** (platform/motor) - client-agnostic, reusable components
- **Projects** - client-specific applications with data and CMS logic

Without automated enforcement, developers and AI assistants can accidentally:
- Import project-specific code into the engine
- Add CMS dependencies to the engine
- Hard-code client names or URLs
- Violate layer boundaries

Guardrails exist to make these violations **impossible** through tooling, not discipline.

## Decision

Spektra enforces architectural rules through **ESLint guardrails** that automatically reject non-compliant code.

### Core Principle

> The engine must remain **platform-level** code that can be open-sourced and reused across any client project.

### What Guardrails Protect

1. **Engine purity** - No project-specific logic
2. **Data source agnosticism** - No CMS libraries or fetch logic
3. **Client independence** - No hard-coded client names
4. **Layer boundaries** - Components respect UI hierarchy

## Structure

### Guardrail Implementation

```
engine/packages/config/
└── eslint/
    ├── index.js              # Base ESLint config
    └── engine-guardrails.js  # 🔒 GUARDRAIL RULES
```

### Rule Categories

#### 1. Import Restrictions

```javascript
// engine-guardrails.js
'no-restricted-imports': ['error', {
  patterns: [
    {
      group: ['**/projects/**'],
      message: '🔒 Engine cannot import from projects workspace'
    },
    {
      group: ['axios', '@apollo/client', 'graphql', 'wordpress'],
      message: '🔒 Engine must be data-source agnostic'
    }
  ]
}]
```

#### 2. Syntax Restrictions

```javascript
'no-restricted-syntax': ['error',
  {
    selector: "Literal[value=/bellator|client-a/i]",
    message: '🔒 No client names in engine code'
  },
  {
    selector: "Literal[value=/wordpress|wp-json|graphql|rest-api/i]",
    message: '🔒 No CMS references in engine code'
  }
]
```

## Rules

### ❌ FORBIDDEN in Engine

#### 1. Importing from Projects

```typescript
// ❌ NEVER - Engine depends on project
import { BellatorConfig } from '../../../projects/bellator/config';
```

**Why:** Engine must be project-agnostic. Projects import from engine, never the reverse.

#### 2. CMS-Specific Libraries

```typescript
// ❌ NEVER - Makes engine dependent on data source
import axios from 'axios';
import { useQuery } from '@apollo/client';
import { getWordPressData } from 'wordpress-lib';
```

**Why:** Engine receives data via props. Data fetching happens in projects.

#### 3. Hard-Coded Client Names

```typescript
// ❌ NEVER - Client-specific logic
const clientName = 'bellator';
if (project === 'client-a') {
  // ...
}
```

**Why:** Engine code must work for any client.

#### 4. Hard-Coded CMS References

```typescript
// ❌ NEVER - CMS-specific logic
const endpoint = '/wp-json/wp/v2/posts';
const cmsType = 'wordpress';
const query = gql`{ posts { title } }`;
```

**Why:** Engine doesn't know or care where data comes from.

#### 5. Downward Layer Imports

```typescript
// ❌ NEVER - Atoms cannot import Molecules
// In components/primitives/Button.tsx
import { Card } from '../features/Card';

// ❌ NEVER - Molecules cannot import Organisms
// In components/features/Card.tsx
import { Hero } from '../sections/Hero';
```

**Why:** Violates UI architecture hierarchy.

### ✅ ALLOWED in Engine

#### 1. Abstract Data Contracts

```typescript
// ✅ OK - Generic interface
export interface SiteData {
  site: SiteInfo;
  pages: Page[];
}

export interface HeroData {
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
}
```

**Why:** Defines what data components need, not where it comes from.

#### 2. Pure Utility Functions

```typescript
// ✅ OK - Source-agnostic utility
export function merge<T>(a: T, b: Partial<T>): T {
  return { ...a, ...b };
}

export function normalize(data: unknown): SiteData {
  // Validation and transformation logic
}
```

**Why:** Generic helpers work with any data source.

#### 3. Data-Driven Components

```typescript
// ✅ OK - Receives data via props
export const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <Button href={data.ctaUrl}>{data.ctaText}</Button>
    </section>
  );
};
```

**Why:** Component doesn't know or care where data came from.

#### 4. Upward Layer Imports

```typescript
// ✅ OK - Molecules can import Atoms
// In components/features/Card.tsx
import { Button } from '../primitives/Button';
import { Heading } from '../primitives/Heading';

// ✅ OK - Organisms can import Molecules
// In components/sections/Hero.tsx
import { Card } from '../features/Card';
```

**Why:** Respects UI architecture hierarchy.

### ✅ REQUIRED in Projects

#### 1. Data Loading Logic

```typescript
// ✅ REQUIRED - In projects/bellator/src/data/loaders/
export async function loadSiteData(): Promise<SiteData> {
  const wpData = await fetchFromWordPress();
  const staticData = getStaticContent();
  return merge(wpData, staticData);
}
```

**Why:** Projects own data sourcing and CMS integration.

#### 2. CMS Integration

```typescript
// ✅ REQUIRED - In projects/bellator/src/data/sources/wp/
import axios from 'axios';

export async function fetchFromWordPress() {
  const response = await axios.get('/wp-json/wp/v2/posts');
  return response.data;
}
```

**Why:** CMS logic belongs in project layer, not engine.

#### 3. Configuration and Manifest

```typescript
// ✅ REQUIRED - In projects/bellator/config/
export const siteConfig = {
  name: 'Bellator Gym',
  url: 'https://bellator.com',
  // ... client-specific config
};
```

**Why:** Each project has its own configuration.

## Tooling Impact

### ESLint Integration

Every engine package must extend the guardrails config:

```javascript
// packages/core/.eslintrc.js
module.exports = require('@spektra/config/eslint');
```

### Pre-Commit Hooks

Guardrails run automatically before commit:

```bash
# .husky/pre-commit
pnpm lint-staged
```

If violation detected:
```
❌ Error: 🔒 Engine cannot import from projects workspace
   Import from '../../../projects/bellator' is not allowed
```

Commit is blocked until fixed.

### CI/CD Pipeline

Guardrails run in continuous integration:

```yaml
# .github/workflows/validate.yml
- name: Run ESLint Guardrails
  run: pnpm lint
```

Pull requests cannot merge if guardrails fail.

### VS Code Integration

ESLint extension shows guardrail violations in real-time:
- Red underlines on forbidden imports
- Inline error messages
- Quick fix suggestions when available

### Copilot Constraints

GitHub Copilot must:
1. **Read guardrails documentation** before suggesting engine code
2. **Never suggest** imports from `projects/`
3. **Never suggest** CMS library imports in engine
4. **Add TODO comments** when unsure about structure
5. **Respect layer boundaries** in component suggestions

**Example Copilot behavior:**

```typescript
// ❌ BAD - Copilot suggests this
import { BellatorConfig } from '../../../projects/bellator';

// ✅ GOOD - Copilot suggests this
// TODO: Pass config via props instead of importing from project
export const Component: React.FC<Props> = ({ config }) => {
```

## Versioning Notes

Guardrail changes affect versioning:
- **New guardrail rule**: MAJOR (may break existing code)
- **Relaxing a rule**: MAJOR (architectural decision change)
- **Improving error messages**: PATCH
- **Fixing false positives**: PATCH

## Related Docs

- [UI Architecture](../architecture/ui-architecture.md) - Layer boundaries protected by guardrails
- [Validation Pipeline](./validation-pipeline.md) - How guardrails are enforced
- [Package Management](../tooling/package-management.md) - Workspace structure
- [Versioning Strategy](../versioning/versioning-strategy.md) - Impact on versions

## Enforcement History

### When Guardrails Were Added

Guardrails were implemented to solve:
- Accidental project imports during rapid development
- CMS library leaks into engine packages
- Client names appearing in supposedly generic code

### Evolution of Rules

| Version | Rule Added | Reason |
|---------|------------|--------|
| 1.0.0 | `no-restricted-imports` for projects/ | Prevent engine-project coupling |
| 1.0.0 | `no-restricted-imports` for CMS libs | Keep engine data-source agnostic |
| 1.1.0 | `no-restricted-syntax` for client names | Catch hard-coded strings |

## Guardrail Maintenance

### Adding New Rules

1. Identify architectural violation pattern
2. Add ESLint rule to `engine-guardrails.js`
3. Test against existing codebase
4. Document in this file
5. Bump version (MAJOR)

### Testing Guardrails

```bash
# Test that guardrails catch violations
cd engine/packages/core
# Add forbidden import
echo "import x from '../../../projects/bellator';" >> test.ts
pnpm lint
# Should fail with guardrail error
git checkout test.ts
```

### Bypassing Guardrails (Emergency Only)

```typescript
// eslint-disable-next-line no-restricted-imports
import { something } from '../../../projects/bellator';
// TODO: Remove this import - violates guardrails
```

**Requirements:**
- Must include TODO comment explaining why
- Must have ticket to fix properly
- Must be approved in code review
- Must not be committed to main branch
