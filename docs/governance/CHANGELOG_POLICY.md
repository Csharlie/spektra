# CHANGELOG Policy

**Status**: Enforced  
**Owner**: Platform Team  
**Effective Date**: January 2026  
**Related Documents**:
- [Engine Versioning Policy](./ENGINE_VERSIONING_POLICY.md)
- [Release Communication Strategy](./RELEASE_COMMUNICATION_STRATEGY.md)

---

## Purpose

The Spektra engine operates under a **high-frequency versioning model** where every merged change produces a new semantic version. This policy ensures that the CHANGELOG remains a useful signal despite frequent releases, by distinguishing between versions that represent **intentional changes** and those that represent **maintenance snapshots**.

**This policy exists to prevent signal loss in a deterministic versioning environment.**

---

## Context and Rationale

### The Problem

With semantic-release automation:
- Every commit to `main` can trigger a version bump
- PATCH versions are created for non-breaking fixes and maintenance
- Without structure, the CHANGELOG becomes noise

### The Solution

All versions are documented, but **not all are weighted equally**. The CHANGELOG uses explicit categorization to separate intentional changes from maintenance snapshots.

---

## Mandatory CHANGELOG Structure

Every version entry in `CHANGELOG.md` MUST use the following section structure:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Features
New capabilities or enhancements that add value.

### Bug Fixes
Corrections to existing behavior that was incorrect.

### Breaking Changes
Changes that require consumer code modifications.

### Maintenance
Dependency updates, refactoring, internal improvements, CI changes.
```

### Section Definitions

| Section | Purpose | Signal Level |
|---------|---------|--------------|
| **Features** | New functionality or enhancements | HIGH |
| **Bug Fixes** | Corrections to incorrect behavior | MEDIUM-HIGH |
| **Breaking Changes** | API changes requiring consumer updates | CRITICAL |
| **Maintenance** | Internal improvements without API impact | LOW |

---

## Categorization Rules

### Features

**Belongs here**:
- New public APIs
- New components or utilities
- New configuration options
- Enhanced capabilities in existing APIs

**Does NOT belong here**:
- Internal refactoring without API changes
- Performance improvements (unless explicitly advertised)

### Bug Fixes

**Belongs here**:
- Corrections to incorrect behavior
- Fixes to regressions
- Corrections to documentation errors

**Does NOT belong here**:
- Dependency updates that happen to fix issues
- Internal code improvements

### Breaking Changes

**Belongs here**:
- Removed public APIs
- Changed function signatures
- Changed default behaviors
- Renamed exports

**Does NOT belong here**:
- Internal breaking changes (not public API)
- Changes to unstable/experimental APIs (if marked as such)

### Maintenance

**Belongs here**:
- Dependency updates
- Internal refactoring
- CI/CD changes
- Build script improvements
- Documentation structure changes (not content fixes)
- Type improvements without behavior change

**This is the SNAPSHOT CATEGORY.**

---

## Version-Level vs Snapshot-Level Entries

### Version-Level Entries
**Features**, **Bug Fixes**, and **Breaking Changes** are version-level entries. Each entry represents a **specific intentional change** that has value to consumers.

### Snapshot-Level Entries
**Maintenance** entries are snapshot-level. They document the state of the release but do not represent discrete value-add changes.

**Example**:
```markdown
### Maintenance
- Updated dependencies to latest stable versions
- Internal TypeScript refactoring for type safety
- CI pipeline optimization
```

This does NOT mean the version is unimportant. It means the version is a **state snapshot** rather than a feature delivery.

---

## Tooling Alignment

### semantic-release Integration

The CHANGELOG is generated and maintained by `semantic-release` using conventional commits:

| Commit Type | Changelog Section | Version Bump |
|-------------|-------------------|--------------|
| `feat:` | Features | MINOR |
| `fix:` | Bug Fixes | PATCH |
| `BREAKING CHANGE:` | Breaking Changes | MAJOR |
| `chore:`, `docs:`, `refactor:`, `style:`, `test:` | Maintenance | PATCH |

### Commit Message Requirements

To ensure correct categorization:
- Use conventional commit format: `type(scope): message`
- Meaningful types are enforced
- Breaking changes MUST include `BREAKING CHANGE:` footer

---

## Enforcement

### Automated Enforcement
- semantic-release validates commit messages
- CI fails on malformed commit messages
- CHANGELOG generation is automatic and non-negotiable

### Manual Enforcement
- If semantic-release generates incorrect categorization, the **commit message was wrong**
- Retroactive CHANGELOG edits are **forbidden**
- If a version is released with incorrect categorization, the correct approach is:
  - Document the issue
  - Fix commit message conventions going forward
  - Do NOT rewrite history

---

## Signal Management

### High-Frequency Releases Are Expected

The presence of many PATCH versions is **not a problem**. It is a feature of the system.

### Maintenance Versions Are Valid

A version that only contains "Maintenance" entries is:
- A valid release
- A documented state
- NOT a "useless" version

It represents the **current stable state** of the platform.

### Communication vs Documentation

**The CHANGELOG documents all versions.**  
**Release announcements are selective.**

See [Release Communication Strategy](./RELEASE_COMMUNICATION_STRATEGY.md) for how to decide which versions to communicate.

---

## Examples

### Example 1: Feature Release
```markdown
## [1.3.0] - 2026-01-10

### Features
- Added `useThemeContext` hook for accessing theme state
- Introduced `DataGrid` component with sorting and filtering

### Maintenance
- Updated Vite to 5.0.11
- Refactored internal type definitions
```

**Signal**: HIGH - This version delivers new capabilities.

### Example 2: Maintenance Release
```markdown
## [1.2.8] - 2026-01-09

### Maintenance
- Updated React to 18.3.1
- Improved internal build performance
- Updated CI pipeline to use pnpm 8.15
```

**Signal**: LOW - This version is a state snapshot.

### Example 3: Breaking Change Release
```markdown
## [2.0.0] - 2026-01-08

### Breaking Changes
- Removed deprecated `useLegacyTheme` hook
- Changed `Button` component prop `variant` to `style`

### Features
- Introduced new theming system with CSS variables

### Bug Fixes
- Fixed memory leak in `DataTable` component
```

**Signal**: CRITICAL - This version requires consumer action.

---

## Policy Stability

This policy is considered **stable and enforced**. Changes to this policy require:
- Platform team approval
- Documentation of rationale
- Communication to all engine consumers

---

## Related Guardrails

See also:
- [Engine Versioning Policy](./ENGINE_VERSIONING_POLICY.md) - Defines what version numbers mean
- [Release Communication Strategy](./RELEASE_COMMUNICATION_STRATEGY.md) - Defines when to announce versions
- [Guardrails Documentation](../validation/guardrails.md) - Overall quality controls
