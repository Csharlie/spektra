# Spektra

Spektra is a multi-workspace mono-repository for building data-driven websites with a clean, enforced architecture.

## Architecture

The repository consists of two **isolated** pnpm workspaces:

### 1. Engine Workspace (`/engine`)

The **platform/engine** - contains only reusable, client-agnostic platform logic:

- **packages/core**: Render engine, UI components, hooks, design system
- **packages/themes**: Design tokens and theme configurations
- **packages/data-utils**: Pure utility functions for data manipulation (NO fetch/CMS logic)
- **packages/config**: Build tooling and configuration

**Rules:**
- ❌ NO client names
- ❌ NO CMS logic (GraphQL, REST, fetch)
- ✅ ONLY render logic, components, utilities

### 2. Projects Workspace (`/projects`)

**Deployable applications** - each project is a standalone app:

- **bellator**: Bellator project application
- **autozeno**: Autozeno project application

**Structure per project:**
```
projects/bellator/
├── src/
│   ├── data/                    # Single source of truth
│   │   ├── site.ts             # Manifest
│   │   ├── sources/            # CMS/static data sources
│   │   │   ├── wp/             # WordPress integration (optional)
│   │   │   └── static/         # Static data
│   │   └── loaders/
│   │       └── loadSiteData.ts # Data loading logic
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
// In project: bellator/src/main.tsx
import { App } from '@spektra/core/app/App';
import { loadSiteData } from './data';

loadSiteData().then((siteData) => {
  <App data={siteData} />
});
```

## Development

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

# Run specific project
pnpm dev:bellator
# or
pnpm dev:autozeno
```

## Benefits

- ✅ **Clean separation**: Engine is client-agnostic
- ✅ **Data-driven**: All data comes from project's `data/` folder
- ✅ **Isolated workspaces**: No dependency leakage
- ✅ **Scalable**: Easy to add new projects
- ✅ **Maintainable**: Clear boundaries and responsibilities
