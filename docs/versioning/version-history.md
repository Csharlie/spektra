# Version History

This document tracks major version milestones in the Spektra project.

## Version Overview

| Version | Date | Branch/Tag | Description |
|---------|------|------------|-------------|
| v0.4.0 | 2026-01-10 | `dev` | Engine-based platform architecture |
| v0.1.0-legacy | 2026-01-10 | `main` (archived) | Original Spektra platform |

## v0.4.0 - Engine-Based Platform (2026-01-10)

**Status:** Current development baseline

**Branch:** `dev`

**Major Changes:**
- Complete architectural rewrite
- Introduction of engine/projects workspace separation
- PNPM workspace-based monorepo structure
- TurboRepo build orchestration
- Strict architectural guardrails via ESLint
- Component layer system (UI/Features/Sections/Templates)
- Data-driven, client-agnostic engine design

**Breaking Changes:**
- ⚠️ **Non-backward compatible** with v0.1.0-legacy
- Complete project structure redesign
- New component architecture
- Different build system

**Migration:**
- Not possible - v0.4.0 is a platform reboot
- Legacy projects must remain on v0.1.0-legacy

**Documentation:**
- [UI Architecture](../architecture/ui-architecture.md)
- [Validation Pipeline](../validation/validation-pipeline.md)
- [Guardrails](../validation/guardrails.md)
- [Package Management](../tooling/package-management.md)
- [Versioning Strategy](../versioning/versioning-strategy.md)

---

## v0.1.0-legacy - Original Platform (Archived)

**Status:** Archived - preserved for reference

**Tag:** `v0.1.0-legacy` (on `main` branch)

**Description:**
The original Spektra platform implementation before the engine-based rewrite. This version represents the initial approach to building data-driven websites.

**Access:**
```bash
# View legacy code
git checkout v0.1.0-legacy

# Create a branch from legacy (if needed)
git checkout -b legacy-hotfix v0.1.0-legacy
```

**Characteristics:**
- Monolithic structure
- Client-specific implementations
- No strict architectural boundaries
- Pre-guardrails system

**Why Archived:**
The v0.4.0 rewrite introduced fundamental architectural changes that made backward compatibility impractical. The legacy version is preserved as a tag for historical reference and potential emergency access.

---

## Version Scheme

Spektra follows [Semantic Versioning](https://semver.org/) with platform-specific interpretation:

### Pre-1.0 (Current State)

**Format:** `0.MINOR.PATCH`

- `0.x.x` indicates the platform is **pre-stable**
- Breaking changes are expected between minor versions
- Major architectural shifts are allowed

**Examples:**
- `0.1.0-legacy` → Original platform
- `0.4.0` → Engine-based platform (breaking rewrite)
- `0.4.1` → Bug fixes on engine platform
- `0.5.0` → New engine features (may break)

### Post-1.0 (Future)

**Format:** `MAJOR.MINOR.PATCH`

Once the platform reaches stability:
- `MAJOR` → Breaking API changes
- `MINOR` → New features, backward compatible
- `PATCH` → Bug fixes

**Example:**
- `1.0.0` → First stable release
- `1.1.0` → New components added
- `2.0.0` → Breaking architecture change

---

## Release Tags

### Current Tags

```bash
# List all version tags
git tag -l "v*"

# Expected output:
# v0.1.0-legacy
# v0.4.0
```

### Tag Naming Convention

- **Platform versions:** `vMAJOR.MINOR.PATCH`
- **Legacy versions:** `vMAJOR.MINOR.PATCH-legacy`
- **Pre-releases:** `vMAJOR.MINOR.PATCH-alpha.N`, `-beta.N`, `-rc.N`

### Accessing Versions

```bash
# Checkout specific version (read-only)
git checkout v0.4.0

# Create working branch from version
git checkout -b feature/new-component v0.4.0

# Return to development
git checkout dev
```

---

## Migration Paths

### From v0.1.0-legacy to v0.4.0

**Status:** ❌ **Not Supported**

The architectural differences are too significant for automated migration. Projects must be rebuilt using the new platform structure.

**Recommended Approach:**
1. Keep legacy projects on `v0.1.0-legacy`
2. Build new projects on `v0.4.0+`
3. Gradually migrate content (not code) to new projects

### Future Versions

Starting from v0.4.0, migration paths will be documented for each version bump:
- Minor versions (0.4.x → 0.5.x): Migration guide provided
- Patch versions (0.4.0 → 0.4.1): Drop-in compatible

---

## Changelog

See individual package `CHANGELOG.md` files for detailed changes:

- [engine/packages/core/CHANGELOG.md](../../engine/packages/core/CHANGELOG.md)
- [engine/packages/themes/CHANGELOG.md](../../engine/packages/themes/CHANGELOG.md)
- [engine/packages/data-utils/CHANGELOG.md](../../engine/packages/data-utils/CHANGELOG.md)

---

## Related Documentation

- [Versioning Strategy](./versioning-strategy.md) - How versions are determined
- [UI Architecture](../architecture/ui-architecture.md) - Component version impacts
- [Guardrails](../validation/guardrails.md) - Architectural stability
- [Package Management](../tooling/package-management.md) - Dependency versioning

---

**Last Updated:** 2026-01-10
