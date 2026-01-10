# Versioning Strategy

## Context

Spektra is a platform with two distinct layers:
- **Engine packages** - Reusable, client-agnostic platform code
- **Project applications** - Client-specific deployables

Each layer has different versioning needs:
- Engine versions communicate API stability to consumers
- Project versions track deployment milestones
- Changes in one layer may or may not affect the other

Without clear versioning rules, teams cannot:
- Know if an upgrade is safe
- Understand breaking vs. non-breaking changes
- Track what changed between releases
- Coordinate updates across workspaces

## Decision

Spektra uses **Semantic Versioning (SemVer)** with layer-specific interpretation.

### SemVer Format

```
MAJOR.MINOR.PATCH

Example: 2.3.5
```

| Version | Meaning | When to Bump | Example |
|---------|---------|--------------|---------|
| **MAJOR** | Breaking change | API changes, architecture changes | `1.x.x → 2.0.0` |
| **MINOR** | New feature | New components, new features | `2.1.x → 2.2.0` |
| **PATCH** | Bug fix | Fixes, refactors, docs | `2.3.4 → 2.3.5` |

### Pre-releases

```
2.0.0-alpha.1   # Early testing
2.0.0-beta.1    # Feature complete, testing
2.0.0-rc.1      # Release candidate
2.0.0           # Stable release
```

## Structure

### Engine Versioning

Each engine package has its own version:

```json
// engine/packages/core/package.json
{
  "name": "@spektra/core",
  "version": "1.2.3"
}

// engine/packages/themes/package.json
{
  "name": "@spektra/themes",
  "version": "1.0.5"
}
```

**Key principle:** Packages can evolve at different rates.

### Project Versioning

Projects may or may not use versions:

```json
// projects/bellator/package.json
{
  "name": "bellator",
  "version": "1.0.0",  // Optional
  "private": true
}
```

**Key principle:** Project versions track deployment milestones, not API stability.

### Dependency Versioning

#### Engine → Engine (Workspace Protocol)

```json
// engine/packages/core/package.json
{
  "dependencies": {
    "@spektra/themes": "workspace:*"
  }
}
```

**Meaning:** Always use latest local version (during development).

#### Project → Engine (Link Protocol)

```json
// projects/bellator/package.json
{
  "dependencies": {
    "@spektra/core": "link:../../engine/packages/core"
  }
}
```

**Meaning:** Always use local engine (during development).

#### Published Versions (Future)

```json
{
  "dependencies": {
    "@spektra/core": "^2.1.0"
  }
}
```

**Meaning:** Accept minor and patch updates, not major.

## Rules

### Engine Package Versioning

#### MAJOR Version Bump (Breaking Changes)

Bump MAJOR when:

1. **Public API changes**
   ```typescript
   // v1.x.x
   export const Button: React.FC<ButtonProps> = ({ label }) => ...
   
   // v2.0.0 - MAJOR bump
   export const Button: React.FC<ButtonProps> = ({ children }) => ...
   // Breaking: 'label' prop removed
   ```

2. **Component prop interface changes**
   ```typescript
   // v1.x.x
   interface HeroProps {
     title: string;
   }
   
   // v2.0.0 - MAJOR bump
   interface HeroProps {
     data: HeroData;  // Breaking: shape changed
   }
   ```

3. **Architectural changes**
   - Adding or removing UI layers
   - Changing layer responsibilities
   - New guardrail rules that break existing code

4. **Dependency major updates**
   ```json
   // v1.x.x
   "react": "^18.0.0"
   
   // v2.0.0 - MAJOR bump
   "react": "^19.0.0"
   ```

5. **Removed components or features**
   ```typescript
   // v1.x.x
   export { OldComponent } from './OldComponent';
   
   // v2.0.0 - MAJOR bump
   // OldComponent removed
   ```

#### MINOR Version Bump (New Features)

Bump MINOR when:

1. **New components added**
   ```typescript
   // v1.2.x
   export { Button, Input } from './ui';
   
   // v1.3.0 - MINOR bump
   export { Button, Input, Badge } from './ui';
   // Non-breaking: Badge is new
   ```

2. **New props (optional) added**
   ```typescript
   // v1.2.x
   interface ButtonProps {
     children: React.ReactNode;
   }
   
   // v1.3.0 - MINOR bump
   interface ButtonProps {
     children: React.ReactNode;
     icon?: React.ReactNode;  // Optional: non-breaking
   }
   ```

3. **New optional features**
   - New design system tokens
   - New utility functions
   - New hooks

4. **Non-breaking dependency updates**
   ```json
   // v1.2.x
   "clsx": "^1.2.0"
   
   // v1.3.0 - MINOR bump
   "clsx": "^2.0.0"  // If no breaking changes in usage
   ```

5. **Improved validation or tooling**
   - New ESLint rules that don't break existing code
   - Better error messages
   - Performance improvements

#### PATCH Version Bump (Bug Fixes)

Bump PATCH when:

1. **Bug fixes**
   ```typescript
   // v1.2.4
   const result = value + 1;  // Bug: wrong calculation
   
   // v1.2.5 - PATCH bump
   const result = value * 2;  // Fixed
   ```

2. **Documentation updates**
   - README changes
   - JSDoc improvements
   - Examples added

3. **Refactoring (no behavior change)**
   ```typescript
   // v1.2.4 - Messy code
   const x = a + b; const y = x * 2; return y;
   
   // v1.2.5 - PATCH bump - Refactored
   return (a + b) * 2;
   ```

4. **Styling fixes**
   - CSS bug fixes
   - Visual improvements that don't change API

5. **Dependency patch updates**
   ```json
   // v1.2.4
   "react": "18.2.0"
   
   // v1.2.5 - PATCH bump
   "react": "18.2.1"
   ```

### Project Versioning

Projects use simpler versioning tied to deployments:

```
1.0.0 - Initial launch
1.1.0 - New feature deployed
1.1.1 - Hotfix deployed
2.0.0 - Major redesign
```

**Rule of thumb:**
- MAJOR: Redesign, major refactor, user-facing breaking change
- MINOR: New feature, new page, content update
- PATCH: Bug fix, small tweak

### Version Coordination

#### Scenario 1: Engine Change, Projects Unaffected

```
Engine:
  @spektra/core: 1.2.3 → 1.2.4 (bug fix)

Projects:
  bellator: 1.0.0 (no change)
  autozeno: 2.1.0 (no change)
```

**Action:** Update engine, redeploy projects only if needed.

#### Scenario 2: Breaking Engine Change

```
Engine:
  @spektra/core: 1.5.0 → 2.0.0 (breaking)

Projects:
  bellator: 1.0.0 → 2.0.0 (major refactor needed)
  autozeno: 2.1.0 → 3.0.0 (major refactor needed)
```

**Action:** 
1. Bump engine MAJOR
2. Update projects to use new API
3. Bump project MAJOR
4. Deploy when stable

#### Scenario 3: Project Change, Engine Unaffected

```
Engine:
  @spektra/core: 1.5.0 (no change)

Projects:
  bellator: 1.0.0 → 1.1.0 (new page added)
```

**Action:** Bump project MINOR, deploy project.

## Tooling Impact

### Version Management Commands

#### Bump Version

```bash
# Manual bump in package.json
cd engine/packages/core
# Edit package.json: "version": "1.2.3" → "1.3.0"

# Or use npm version (works with PNPM)
pnpm version minor
pnpm version major
pnpm version patch
```

#### Check Versions

```bash
# List all package versions
pnpm list --depth=0

# Check specific package
pnpm list @spektra/core
```

### Changelog Management

#### CHANGELOG.md Format

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-01-10

### Breaking Changes
- Changed Button `label` prop to `children`
- Removed deprecated OldComponent

### Added
- New Badge component
- Icon prop to Button (optional)

### Fixed
- Button click handler not firing on mobile

## [1.2.3] - 2025-12-15

### Fixed
- Typography scale calculation error
```

#### Maintaining Changelog

1. **During development:** Add to "Unreleased" section
2. **Before release:** Move to versioned section
3. **Include migration guide** for breaking changes

### Git Tagging

```bash
# Tag engine package release
cd engine/packages/core
git tag @spektra/core@1.3.0
git push origin @spektra/core@1.3.0

# Tag project release
cd projects/bellator
git tag bellator@1.1.0
git push origin bellator@1.1.0
```

### Automated Versioning (Future)

#### Semantic Release

```bash
# Automatically determines version from commit messages
npm install -D semantic-release

# Commit format:
# feat: new component → MINOR bump
# fix: bug fix → PATCH bump
# BREAKING CHANGE: api change → MAJOR bump
```

#### Changesets

```bash
# Track version changes across monorepo
pnpm add -D @changesets/cli
pnpm changeset init

# Create changeset
pnpm changeset
# Select packages changed
# Describe changes
# Commit changeset

# Release
pnpm changeset version  # Bumps versions
pnpm changeset publish  # Publishes packages
```

### CI/CD Integration

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - '@spektra/**'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm build
      - run: pnpm publish --access public
```

### Copilot Version Awareness

Copilot should:
1. **Check CHANGELOG.md** before suggesting breaking changes
2. **Suggest version bump** when making API changes
3. **Add changelog entry** for significant changes
4. **Warn about breaking changes** before implementing

**Example:**
```typescript
// Copilot suggests changing prop name
// Before:
interface Props {
  label: string;
}

// Copilot suggests:
// ⚠️ WARNING: This is a BREAKING CHANGE
// - Bump version to 2.0.0
// - Add migration guide to CHANGELOG
interface Props {
  children: React.ReactNode;
}
```

## Versioning Notes

This document itself follows versioning:
- **Adding new versioning rules**: MINOR (expands guidance)
- **Changing existing rules**: MAJOR (changes interpretation)
- **Fixing typos or examples**: PATCH

## Related Docs

- [UI Architecture](../architecture/ui-architecture.md) - Architectural changes affect MAJOR version
- [Guardrails](../validation/guardrails.md) - New guardrails affect MAJOR version
- [Validation Pipeline](../validation/validation-pipeline.md) - Validation changes affect versioning
- [Package Management](../tooling/package-management.md) - How versions are declared

## Common Versioning Scenarios

### Scenario: Adding a New Component

```
Current: @spektra/core@1.5.2

Change: Add new Gallery component
Decision: MINOR bump
New: @spektra/core@1.6.0

Rationale: New feature, non-breaking
```

### Scenario: Changing Required Prop

```
Current: @spektra/core@1.6.0

Change: Button requires 'variant' prop (was optional)
Decision: MAJOR bump
New: @spektra/core@2.0.0

Rationale: Breaking change - existing code will fail
```

### Scenario: Fixing Visual Bug

```
Current: @spektra/core@2.0.0

Change: Fix button hover color
Decision: PATCH bump
New: @spektra/core@2.0.1

Rationale: Bug fix, no API change
```

### Scenario: Adding Optional Prop

```
Current: @spektra/core@2.0.1

Change: Add optional 'icon' prop to Button
Decision: MINOR bump
New: @spektra/core@2.1.0

Rationale: New feature, backward compatible
```

### Scenario: Deprecating Component (Not Removing)

```
Current: @spektra/core@2.1.0

Change: Mark OldButton as deprecated, add warning
Decision: MINOR bump
New: @spektra/core@2.2.0

Rationale: Non-breaking - component still works
Note: Removal in next MAJOR version
```

### Scenario: Upgrading React Dependency

```
Current: @spektra/core@2.2.0
React: ^18.0.0

Change: Upgrade to React 19
Decision: MAJOR bump
New: @spektra/core@3.0.0

Rationale: Consumers must upgrade React
```

## Version Decision Tree

```
┌─────────────────────────────────────┐
│  Did the API contract change?       │
└──────────┬──────────────────────────┘
           │
     ┌─────┴─────┐
     │Yes        │No
     ▼           ▼
┌─────────────────┐    ┌────────────────────────┐
│ Breaking?       │    │ New functionality?     │
└────┬────────────┘    └────┬───────────────────┘
     │                      │
 ┌───┴───┐            ┌─────┴─────┐
 │Yes    │No          │Yes        │No
 ▼       ▼            ▼           ▼
MAJOR   MINOR        MINOR       PATCH
```

## Migration Guides

When bumping MAJOR version, include migration guide in CHANGELOG:

```markdown
## [2.0.0] - 2026-01-10

### Breaking Changes

#### Button Component API Changed

**Before (v1.x):**
```typescript
<Button label="Click me" />
```

**After (v2.0):**
```typescript
<Button>Click me</Button>
```

**Migration:**
1. Replace all `label` props with children
2. Search: `<Button label="`
3. Replace with: `<Button>` and add closing tag

**Automated migration:**
```bash
npx @spektra/migrate-button-v1-to-v2
```
```

## Publishing Workflow

### 1. Development

```bash
# Work on feature branch
git checkout -b feature/new-gallery

# Make changes
# Test locally

# Commit
git commit -m "feat(core): add Gallery component"
```

### 2. Pre-Release

```bash
# Bump version
cd engine/packages/core
pnpm version minor  # 1.5.2 → 1.6.0

# Update CHANGELOG
# Add entry for 1.6.0

# Commit
git add .
git commit -m "chore(core): release v1.6.0"
```

### 3. Release

```bash
# Tag
git tag @spektra/core@1.6.0

# Push
git push origin main
git push origin @spektra/core@1.6.0

# Publish (if public)
pnpm publish
```

### 4. Post-Release

```bash
# Update dependent projects
cd projects/bellator
# Test with new engine version
pnpm install

# Deploy if needed
pnpm build
```
