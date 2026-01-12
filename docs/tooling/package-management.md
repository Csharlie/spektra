# Package Management

## Context

Spektra is a **monorepo** containing two isolated workspaces:
- **Engine** (`/engine`) - Platform packages
- **Projects** (`/projects`) - Client applications

Managing dependencies, linking packages, and coordinating builds across workspaces requires specialized tooling. Wrong choices lead to:
- Dependency conflicts and version mismatches
- Slow installs and bloated `node_modules`
- Broken local package links
- Inefficient builds that redo unchanged work

## Decision

Spektra uses **PNPM** for package management and **TurboRepo** for build orchestration.

### Why PNPM?

| Feature | NPM | Yarn | PNPM | Why PNPM Wins |
|---------|-----|------|------|---------------|
| **Disk space** | Duplicates all | Duplicates some | Single store | Saves gigabytes |
| **Install speed** | Slow | Fast | Fastest | Parallel + symlinks |
| **Strict deps** | No | Optional | Yes | Prevents phantom deps |
| **Workspace linking** | Manual | Good | Excellent | Native `link:` protocol |
| **Lock file merge conflicts** | Common | Common | Rare | Better format |

### Why TurboRepo?

- **Caching**: Only rebuilds changed packages
- **Parallelization**: Builds independent packages concurrently
- **Task dependencies**: Ensures correct build order
- **Remote caching**: Share cache across team (future)

## Structure

### Workspace Configuration

#### Engine Workspace

```yaml
# engine/pnpm-workspace.yaml
packages:
  - 'packages/*'
```

```json
// engine/package.json
{
  "name": "spektra-engine",
  "private": true,
  "packageManager": "pnpm@8.15.0",
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  }
}
```

#### Projects Workspace

```yaml
# projects/pnpm-workspace.yaml
packages:
  - '*'  # Automatically discovers all projects
```

```json
// projects/package.json
{
  "name": "spektra-projects",
  "private": true,
  "packageManager": "pnpm@8.15.0"
}
```

### Package Dependencies

#### Engine Package

```json
// engine/packages/core/package.json
{
  "name": "@spektra/core",
  "version": "1.0.0",
  "dependencies": {
    "@spektra/themes": "workspace:*",
    "@spektra/data-utils": "workspace:*",
    "react": "^18.0.0"
  }
}
```

**Key points:**
- `workspace:*` links to local packages
- Engine packages only depend on other engine packages
- No dependencies on projects

#### Project Package

```json
// projects/baseline/package.json
{
  "name": "baseline",
  "private": true,
  "dependencies": {
    "@spektra/core": "link:../../engine/packages/core",
    "axios": "^1.6.0"
  }
}
```

**Key points:**
- `link:` creates symlink to engine packages
- Can include CMS libraries (axios, GraphQL, etc.)
- Each project has independent dependencies

### TurboRepo Configuration

```json
// engine/turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "build/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    }
  }
}
```

**What this means:**
- `"dependsOn": ["^build"]` - Build dependencies first
- `"outputs": ["dist/**"]` - Cache these folders
- `"cache": false` - Don't cache dev servers
- `"persistent": true` - Keep dev server running

## Rules

### Installation Rules

#### ✅ DO:

1. **Use PNPM exclusively**
   ```bash
   pnpm install
   pnpm add react
   pnpm remove axios
   ```

2. **Install in correct workspace**
   ```bash
   # Engine package
   cd engine/packages/core
   pnpm add some-library

   # Project
   cd projects/baseline
   pnpm add axios
   ```

3. **Use workspace protocol in engine**
   ```json
   "dependencies": {
     "@spektra/themes": "workspace:*"
   }
   ```

4. **Use link protocol in projects**
   ```json
   "dependencies": {
     "@spektra/core": "link:../../engine/packages/core"
   }
   ```

#### ❌ DON'T:

1. **Use NPM or Yarn**
   ```bash
   # ❌ NEVER
   npm install
   yarn add react
   ```
   **Why:** Breaks PNPM workspace structure and lock file.

2. **Mix workspace protocols**
   ```json
   // ❌ NEVER in projects
   "@spektra/core": "workspace:*"  // Wrong! Use link:
   ```

3. **Add CMS libraries to engine**
   ```bash
   # ❌ NEVER
   cd engine/packages/core
   pnpm add axios
   ```
   **Why:** Violates engine purity guardrails.

4. **Commit `node_modules`**
   ```bash
   # ❌ NEVER
   git add node_modules/
   ```
   **Why:** Wastes repo space, causes conflicts.

### Dependency Management

#### Shared Dependencies

PNPM deduplicates identical versions:

```
.pnpm-store/
  react@18.0.0/
    node_modules/react/

engine/packages/core/node_modules/
  react -> ../../../.pnpm-store/react@18.0.0/node_modules/react

engine/packages/themes/node_modules/
  react -> ../../../.pnpm-store/react@18.0.0/node_modules/react
```

**Benefit:** Install react once, symlink everywhere.

#### Version Pinning

```json
// Root package.json
{
  "pnpm": {
    "overrides": {
      "react": "18.2.0"
    }
  }
}
```

**Use when:** Need to force specific version across all packages.

### Build Commands

#### Engine

```bash
cd engine

# Install all packages
pnpm install

# Build all packages
pnpm build

# Build with forced cache refresh
pnpm build --force

# Watch mode for development
pnpm dev

# Lint all packages
pnpm lint

# Clean build artifacts
pnpm clean
```

#### Projects

```bash
cd projects

# Install all projects
pnpm install

# Run specific project
pnpm dev:bellator

# Build specific project
pnpm build:bellator

# Run all projects (if configured)
pnpm dev
```

### Workspace Commands

```bash
# Run command in specific package
pnpm --filter @spektra/core build
pnpm --filter bellator dev

# Run command in all packages
pnpm -r build

# Add dependency to specific package
pnpm --filter @spektra/core add react-router-dom
```

## Tooling Impact

### PNPM Features Used

#### 1. Content-Addressable Storage

```
~/.pnpm-store/
  v3/
    files/
      00/
        1a2b3c4d5e... (actual file)
```

All packages share this global store. Identical files are stored once.

#### 2. Symlink Structure

```
node_modules/
  .pnpm/                    # Flat layout
    react@18.0.0/
      node_modules/
        react/              # Actual package
  react -> .pnpm/react@18.0.0/node_modules/react
```

Top-level symlinks point into flat structure.

#### 3. Strict Mode

PNPM enforces:
- Cannot import packages not declared in `package.json`
- Cannot access nested dependencies (phantom deps)

**Example:**
```typescript
// ❌ Fails in PNPM if react-dom not in package.json
import ReactDOM from 'react-dom';  // Even if react includes it
```

Fix:
```bash
pnpm add react-dom
```

### TurboRepo Features Used

#### 1. Task Caching

```bash
# First build
$ pnpm build
✓ @spektra/themes:build (5.2s)
✓ @spektra/core:build (12.8s)

# Second build (no changes)
$ pnpm build
✓ @spektra/themes:build [CACHED]
✓ @spektra/core:build [CACHED]
Done in 0.3s
```

#### 2. Dependency Graph

Turbo automatically detects:
- Which packages depend on which
- What order to build them
- Which can build in parallel

```
@spektra/themes → @spektra/core → bellator
                ↗
@spektra/data-utils
```

Turbo builds:
1. `themes` and `data-utils` in parallel
2. `core` after both complete
3. `bellator` after core completes

#### 3. Incremental Builds

Only rebuilds when:
- Source files changed
- Dependencies changed
- `package.json` changed

Skips when:
- Only unrelated files changed
- Only comments changed

### VS Code Integration

#### Settings

```json
// .vscode/settings.json
{
  "npm.packageManager": "pnpm",
  "eslint.workingDirectories": [
    "engine/packages/core",
    "engine/packages/themes",
    "projects/baseline"
  ]
}
```

#### Tasks

```json
// .vscode/tasks.json
{
  "tasks": [
    {
      "label": "Build Engine",
      "type": "shell",
      "command": "pnpm",
      "args": ["build"],
      "options": {
        "cwd": "${workspaceFolder}/engine"
      }
    }
  ]
}
```

### Copilot Behavior

Copilot must:
1. **Suggest `pnpm`** commands, not npm/yarn
2. **Recommend `link:`** for project → engine dependencies
3. **Recommend `workspace:`** for engine → engine dependencies
4. **Check `package.json`** before suggesting imports
5. **Add dependencies** when suggesting code that needs them

**Example:**
```typescript
// Copilot suggests using axios
import axios from 'axios';

// Copilot also suggests:
// Run: pnpm add axios
```

## Versioning Notes

Package management changes affect versioning:
- **Upgrading PNPM major version**: MAJOR (may break workflows)
- **Adding TurboRepo**: MINOR (improves DX, non-breaking)
- **Changing workspace structure**: MAJOR (breaks existing setup)
- **Adding new package**: MINOR
- **Removing package**: MAJOR

## Related Docs

- [Validation Pipeline](../validation/validation-pipeline.md) - How Turbo runs validation
- [Guardrails](../validation/guardrails.md) - Import restrictions enforced
- [UI Architecture](../architecture/ui-architecture.md) - Package dependencies reflect layers
- [Versioning Strategy](../versioning/versioning-strategy.md) - When to bump versions

## Troubleshooting

### "Cannot find module" errors

```bash
# Delete all node_modules and lockfiles
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
find . -name 'pnpm-lock.yaml' -delete

# Reinstall
cd engine && pnpm install
cd ../projects && pnpm install
```

### Link dependencies broken

```bash
# Check symlinks
ls -la projects/bellator/node_modules/@spektra/

# Should see:
# core -> ../../../engine/packages/core
```

If broken:
```bash
cd projects/bellator
rm -rf node_modules
pnpm install
```

### Turbo cache issues

```bash
# Clear Turbo cache
cd engine
rm -rf node_modules/.cache/turbo

# Force rebuild
pnpm build --force
```

### PNPM version mismatch

```bash
# Check current version
pnpm --version

# Install correct version
npm install -g pnpm@8.15.0

# Verify
pnpm --version  # Should show 8.15.0
```

### Phantom dependency errors

```bash
# Error: Cannot find module 'some-package'
# But it works in NPM!

# Fix: Add missing dependency
pnpm add some-package
```

**Why:** PNPM strict mode catches this, NPM doesn't.

## Migration from NPM/Yarn

### 1. Remove old files

```bash
find . -name 'package-lock.json' -delete
find . -name 'yarn.lock' -delete
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
```

### 2. Create workspace files

```bash
# engine/pnpm-workspace.yaml
echo "packages:\n  - 'packages/*'" > engine/pnpm-workspace.yaml

# projects/pnpm-workspace.yaml
echo "packages:\n  - '*'" > projects/pnpm-workspace.yaml
```

### 3. Install with PNPM

```bash
cd engine && pnpm install
cd ../projects && pnpm install
```

### 4. Update scripts

Replace `npm` with `pnpm` in all `package.json` scripts.

### 5. Update CI/CD

```yaml
# .github/workflows/build.yml
- uses: pnpm/action-setup@v2
  with:
    version: 8.15.0
- run: pnpm install
- run: pnpm build
```
