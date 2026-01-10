# Validation Pipeline

## Context

Spektra requires strict validation to ensure:
- Code quality and consistency across all packages
- Architectural rules are never violated
- Builds are reproducible and reliable
- Breaking changes are caught before merge

The validation pipeline is the **gatekeeper** that prevents broken, non-compliant code from entering the codebase.

## Decision

Spektra uses a multi-stage validation pipeline powered by **TurboRepo** and **PNPM workspaces**. All validation must pass before code can be merged.

### Validation Stages

1. **Lint** - ESLint checks for code quality and architectural violations
2. **Type Check** - TypeScript ensures type safety
3. **Build** - TurboRepo builds all packages in dependency order
4. **Test** - Unit and integration tests (when implemented)

## Structure

### Validation Entry Points

```
engine/
├── package.json           # Scripts: lint, build, test
├── turbo.json            # TurboRepo task configuration
└── packages/
    ├── core/
    │   └── package.json  # Local: lint, build, test
    ├── themes/
    │   └── package.json
    ├── data-utils/
    │   └── package.json
    └── config/
        ├── eslint/
        │   ├── index.js              # Base ESLint config
        │   └── engine-guardrails.js  # Architectural rules
        └── typescript/
            ├── base.json             # Base TypeScript config
            └── react.json            # React-specific config

projects/
├── package.json          # Scripts: lint, build
└── [project]/
    └── package.json      # Per-project validation
```

### TurboRepo Configuration

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "build/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    }
  }
}
```

## Rules

### What "Passing Validation" Means

✅ **Code is valid when:**
1. `pnpm lint` exits with code 0 (no errors, warnings allowed if documented)
2. `pnpm build` completes successfully for all packages
3. `pnpm test` passes all test suites (when implemented)
4. No architectural guardrail violations detected

❌ **Code is invalid when:**
1. Any ESLint error is present
2. TypeScript compilation fails
3. Build fails or produces errors
4. Tests fail or crash
5. Circular dependencies detected

### Validation Sequence

#### 1. Lint Stage

```bash
cd engine
pnpm lint
```

**What it checks:**
- Code style consistency (Prettier)
- Potential bugs and anti-patterns
- Architectural guardrails (no project imports, no CMS libs)
- Import order and unused imports
- React hooks rules

**Guardrails enforced:**
- `no-restricted-imports`: Blocks imports from `projects/`
- `no-restricted-syntax`: Detects client/CMS names in strings
- Custom rules from `engine-guardrails.js`

#### 2. Type Check Stage

TypeScript runs automatically during `build`, but can be run standalone:

```bash
pnpm tsc --noEmit
```

**What it checks:**
- Type correctness
- Missing or incorrect props
- Unsafe type assertions
- Unused variables and imports

#### 3. Build Stage

```bash
cd engine
pnpm build
```

**TurboRepo execution:**
1. Analyzes dependency graph
2. Builds packages in correct order
3. Caches successful builds
4. Parallelizes independent builds

**What it produces:**
- `dist/` folders with compiled code
- Type declarations (`.d.ts`)
- Source maps for debugging

**Build outputs cached by Turbo:**
- `dist/**`
- `.next/**`
- `build/**`

#### 4. Test Stage (Future)

```bash
cd engine
pnpm test
```

**Planned test types:**
- Unit tests (Vitest)
- Component tests (React Testing Library)
- Integration tests
- Visual regression tests (optional)

### Validation in CI/CD

**Pre-commit hooks (Husky):**
```bash
# In engine/.husky/pre-commit
pnpm lint-staged
```

**Runs on:**
- Changed files only
- Auto-fixes when possible
- Blocks commit if errors present

**GitHub Actions (Future):**
```yaml
# .github/workflows/validate.yml
- run: pnpm install
- run: pnpm lint
- run: pnpm build
- run: pnpm test
```

**Runs on:**
- Every pull request
- Every push to main
- Nightly builds (optional)

## Tooling Impact

### PNPM Workspace

PNPM ensures:
- Dependencies are shared and deduplicated
- Each package has isolated `node_modules`
- Link dependencies work correctly

### TurboRepo

Turbo provides:
- **Caching**: Builds only what changed
- **Parallelization**: Runs tasks concurrently
- **Task dependencies**: Ensures correct build order
- **Remote caching**: Share cache across team (optional)

**Cache hits:**
- If nothing changed, build completes in <1 second
- Turbo computes hash of source files and dependencies
- Cache stored in `node_modules/.cache/turbo/`

### ESLint

ESLint configuration is centralized:
```javascript
// packages/config/eslint/index.js
module.exports = {
  extends: [
    './engine-guardrails.js',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ]
};
```

All packages inherit this config:
```javascript
// packages/core/.eslintrc.js
module.exports = require('@spektra/config/eslint');
```

### TypeScript

TypeScript config is inherited:
```json
// packages/core/tsconfig.json
{
  "extends": "@spektra/config/typescript/react.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

### Copilot Integration

Copilot must:
1. Run validation before suggesting code as "complete"
2. Check lint errors in changed files
3. Suggest fixes for validation errors
4. Never commit code that fails validation

## Versioning Notes

Pipeline changes affect versioning:
- **Adding new validation stage**: MINOR (non-breaking, improves quality)
- **Making existing check stricter**: MAJOR (may break existing code)
- **Fixing false positives**: PATCH
- **New guardrail rule**: MAJOR (breaks non-compliant code)

## Related Docs

- [Guardrails](./guardrails.md) - Architectural constraints enforced
- [UI Architecture](../architecture/ui-architecture.md) - What guardrails protect
- [Package Management](../tooling/package-management.md) - PNPM and Turbo setup
- [Versioning Strategy](../versioning/versioning-strategy.md) - When to bump versions

## Troubleshooting

### Build fails with "Cannot find module"
- Run `pnpm install` in the workspace root
- Check if `link:` dependencies are correct
- Clear Turbo cache: `pnpm clean`

### Lint errors not showing in editor
- Ensure ESLint extension is installed
- Check `.vscode/settings.json` for ESLint config
- Restart ESLint server: `Ctrl+Shift+P` → "Restart ESLint Server"

### Turbo cache not working
- Check `turbo.json` `outputs` configuration
- Verify file changes with `git status`
- Force rebuild: `pnpm build --force`

### Type errors in IDE but build succeeds
- Restart TypeScript server: `Ctrl+Shift+P` → "Restart TS Server"
- Check if `tsconfig.json` is correct
- Ensure all dependencies are installed
