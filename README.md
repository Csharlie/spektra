# Spektra

Spektra is a multi-workspace mono-repository for building data-driven websites with a clean, enforced architecture.

## Architecture

The repository consists of two **isolated** pnpm workspaces:

### 1. Engine Workspace (`/engine`)

The **platform/engine** - contains only reusable, client-agnostic platform logic:

- **packages/core**: Render engine, UI components, hooks, design tokens
- **packages/themes**: Design tokens and theme configurations
- **packages/data-utils**: Pure utility functions for data manipulation (NO fetch/CMS logic)
- **packages/config**: Build tooling and configuration
- **templates/**: Project scaffolding templates (baseline, etc.)

**Rules:**
- ❌ NO client names
- ❌ NO CMS logic (GraphQL, REST, fetch)
- ✅ ONLY render logic, components, utilities, templates

### 2. Projects Workspace (`/projects`)

**Deployable applications** - each project is a standalone app.

**Version-Controlled:**
- **baseline**: Canonical reference implementation (tracked in git)

**Note:** Additional client projects may exist locally but are excluded from version control by design.

**Structure per project:**
```
projects/baseline/
├── src/
│   ├── data/                    # Single source of truth
│   │   ├── site.ts             # Manifest
│   │   ├── content.ts          # Content data
│   │   ├── gallery.ts          # Gallery data (optional)
│   │   └── index.ts            # Data exports
│   ├── pages/                  # Page compositions
│   ├── ui/                     # Project-level UI components
│   └── main.tsx                # Application entry point
├── index.html
└── package.json
```

**Rules:**
- ✅ Projects provide data to the engine
- ✅ CMS logic lives in `data/sources/`
- ✅ Each project has its own `pnpm-lock.yaml`

## Connection

Projects use the engine via **link:** dependencies:

```json
{
  "dependencies": {
    "@spektra/core": "link:../../engine/packages/core"
  }
}
```

The engine components receive data ONLY via props:

```tsx
// In project: baseline/src/pages/LandingPage.tsx
import { LandingLayout, Hero, Features } from '@spektra/core';
import { getBaselineData } from '../data';

const data = getBaselineData();
<LandingLayout {...data.site} />
```

## Development

### Creating New Projects

Use the create-project script to scaffold new projects from the canonical template:

```bash
cd scripts
npx tsx create-project.ts

# Follow the prompts:
# - Projekt neve: new-client
# - Oldal neve: New Client Name
```

This creates a new project in `projects/new-client/` based on `engine/templates/baseline`.

### Engine Development

```bash
cd engine
pnpm install
pnpm dev
```

### Project Development

```bash
cd projects
pnpm install

# Run specific project (example)
cd baseline
pnpm dev
```

## Testing

Spektra uses Vitest for unit and integration testing.

**Test Structure:**
- Tests live in `packages/*/test/` folders
- Tests protect **public API**, not implementation details
- Projects (`projects/*`) do **not** contain tests

**Running Tests:**

```bash
cd engine
pnpm test
```

Tests are also executed automatically in CI on every push and pull request.

## Benefits

- ✅ **Clean separation**: Engine is client-agnostic
- ✅ **Data-driven**: All data comes from project's `data/` folder
- ✅ **Isolated workspaces**: No dependency leakage
- ✅ **Scalable**: Easy to add new projects
- ✅ **Maintainable**: Clear boundaries and responsibilities

## Continuous Integration

All pushes and pull requests are automatically validated by GitHub Actions. The CI pipeline ensures:

- Code quality through linting
- Build integrity across all workspaces
- Test execution (when available)

Failed builds cannot be merged, maintaining repository stability.
