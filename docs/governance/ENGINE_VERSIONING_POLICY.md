# Engine Versioning Policy

**Status**: Enforced  
**Owner**: Platform Team  
**Effective Date**: January 2026  
**Scope**: Spektra Engine (internal platform)  
**Related Documents**:
- [CHANGELOG Policy](./CHANGELOG_POLICY.md)
- [Release Communication Strategy](./RELEASE_COMMUNICATION_STRATEGY.md)

---

## Purpose

This policy defines the **semantic meaning of version numbers** in the Spektra engine and establishes versioning as a deterministic, automated, and auditable process. It formalizes the relationship between code changes and version numbers, ensuring that versioning serves as a reliable state identifier for the platform.

**This is the single source of truth for what version numbers mean in Spektra.**

---

## Versioning Philosophy

### Core Principles

1. **Versions are state identifiers**, not marketing events
2. **Automation is authoritative**, not guidance
3. **PATCH versions are frequent and intentional**, not noise
4. **Semantic Versioning (SemVer) is strictly enforced**
5. **Version history is immutable and auditable**

### Engine as Platform

The Spektra engine is an **internal platform** consumed by multiple consumer projects (baseline, and other client projects). Versioning decisions prioritize:
- **Stability**: Consumers can trust version contracts
- **Auditability**: Every version is traceable to specific changes
- **Predictability**: Version bumps follow deterministic rules

---

## Semantic Versioning Definition

The engine follows **Semantic Versioning 2.0.0** (https://semver.org/).

**Format**: `MAJOR.MINOR.PATCH`

### Version Component Meanings

| Component | Meaning | When to Increment |
|-----------|---------|-------------------|
| **MAJOR** | Breaking changes | Public API removed or changed incompatibly |
| **MINOR** | New features | Backward-compatible functionality added |
| **PATCH** | Fixes and maintenance | Backward-compatible fixes or internal changes |

---

## MAJOR Version (X.0.0)

### Definition
A MAJOR version increment indicates **breaking changes** that require consumer code modifications.

### Triggers
- Public API removal
- Function signature changes
- Changed default behavior that breaks existing usage
- Renamed or moved exports
- Changed data structures in public APIs

### NOT Triggers
- Internal breaking changes (non-public APIs)
- Changes to experimental/unstable features (if documented as such)
- Dependency major version updates (without API impact)

### Example
```javascript
// v1.x.x
export function createTheme(options: ThemeOptions): Theme

// v2.0.0 — BREAKING CHANGE
export function createTheme(config: ThemeConfig): Theme
```

**Justification**: Function signature changed; consumers must update.

---

## MINOR Version (x.Y.0)

### Definition
A MINOR version increment indicates **new features** that are backward-compatible.

### Triggers
- New public functions, components, or utilities
- New configuration options (with defaults)
- Enhanced existing APIs (additive only)
- New exports

### NOT Triggers
- Internal refactoring without API changes
- Performance improvements (unless advertised as feature)
- Bug fixes

### Example
```javascript
// v1.2.x
export { Button, Card } from './components'

// v1.3.0 — NEW FEATURE
export { Button, Card, DataGrid } from './components'
```

**Justification**: New export added; no breaking changes.

---

## PATCH Version (x.y.Z)

### Definition
A PATCH version increment indicates **backward-compatible fixes or maintenance**.

**CRITICAL**: PATCH does NOT mean "insignificant." It means "non-breaking."

### Triggers
- Bug fixes
- Dependency updates (without API changes)
- Internal refactoring
- Type improvements (non-breaking)
- Documentation fixes
- CI/CD changes
- Build improvements
- Performance optimizations

### Philosophy: PATCH as State Snapshot

In Spektra, **PATCH versions are intentionally frequent**. This is not a flaw; it is a feature of the system.

#### Why PATCH Versions Are Frequent

1. **Dependency Management**: Regular dependency updates create PATCH versions
2. **Continuous Improvement**: Internal refactoring is continuous
3. **State Auditability**: Every state of the codebase is versioned
4. **Rollback Precision**: Fine-grained versions enable precise rollbacks

#### PATCH ≠ Trivial

A PATCH version may include:
- Multiple dependency updates
- Significant internal refactoring
- Performance improvements
- Type system enhancements

**The version documents the state.** The CHANGELOG categorizes the changes.

### Example
```markdown
## [1.2.8] - 2026-01-09

### Maintenance
- Updated React from 18.2.0 to 18.3.1
- Refactored internal theme provider for type safety
- Improved build performance by 15%
```

**Justification**: No public API changes; all improvements are internal or dependencies.

---

## Version Increment Decision Tree

```
┌─────────────────────┐
│   Code Change       │
└──────────┬──────────┘
           │
           ▼
    ┌─────────────────────────┐
    │ Does it break public    │──YES──▶ MAJOR
    │       API?              │
    └──────────┬──────────────┘
               │ NO
               ▼
    ┌─────────────────────────┐
    │ Does it add new public  │──YES──▶ MINOR
    │      functionality?     │
    └──────────┬──────────────┘
               │ NO
               ▼
    ┌─────────────────────────┐
    │  Fix, maintenance, or   │──YES──▶ PATCH
    │   internal change?      │
    └─────────────────────────┘
```

---

## Automation and Tooling

### semantic-release as Single Authority

The Spektra engine uses **semantic-release** to enforce versioning policy.

**Key Properties**:
- Fully automated version determination
- Based on conventional commit messages
- No human discretion in version number assignment
- Immutable version history

### Conventional Commits Mapping

semantic-release determines version increments from commit message prefixes:

| Commit Type | Version Impact | Example |
|-------------|----------------|---------|
| `feat:` | MINOR | `feat: add DataGrid component` |
| `fix:` | PATCH | `fix: resolve Button hover state` |
| `chore:` | PATCH | `chore: update dependencies` |
| `docs:` | PATCH | `docs: fix README typo` |
| `refactor:` | PATCH | `refactor: simplify theme logic` |
| `style:` | PATCH | `style: format code` |
| `test:` | PATCH | `test: add DataGrid unit tests` |
| `BREAKING CHANGE:` | MAJOR | Any commit with `BREAKING CHANGE:` footer |

**Enforcement**: CI pipeline validates commit message format. Non-compliant commits are rejected.

### Git Tag Format

All versions are tagged with an **annotated Git tag**:

**Format**: `engine-vX.Y.Z`

**Example**: `engine-v1.3.0`

**Why Prefixed**:
- Monorepo structure: Distinguishes engine versions from project versions
- Namespace clarity: Avoids tag collisions

**Tag Properties**:
- Created by semantic-release
- Includes release notes
- Cryptographically signed (future enhancement)

---

## Version Lifecycle

### Creation
1. Developer merges PR to `main`
2. CI pipeline runs
3. semantic-release analyzes commits since last version
4. Version number determined automatically
5. CHANGELOG updated
6. Git tag created
7. GitHub release published
8. Package published (if applicable)

### Immutability
Once a version is published:
- **Cannot be changed**
- **Cannot be deleted**
- **Cannot be re-released**

If a version is incorrect:
- Create a new version with the fix
- Document the issue in CHANGELOG
- Do NOT rewrite history

### Deprecation
To deprecate functionality:
1. Mark as deprecated in current version (MINOR)
2. Document in CHANGELOG
3. Allow grace period (typically 2-3 MINOR versions)
4. Remove in next MAJOR version

---

## Version Number Semantics in Spektra

### What MAJOR Means
- **Consumer action required**
- **Breaking changes present**
- **Migration guide mandatory**
- **Communication mandatory**

### What MINOR Means
- **New capabilities available**
- **No breaking changes**
- **Optional for consumers to adopt**
- **Communication recommended**

### What PATCH Means
- **State snapshot**
- **No breaking changes**
- **May include fixes, maintenance, or internal improvements**
- **Communication optional**

**Important**: The frequency of PATCH versions does NOT diminish their validity. Every PATCH version represents a stable, auditable state of the platform.

---

## Policy Rationale

### Why Frequent PATCH Versions?

#### Reason 1: Dependency Management
The engine depends on external packages (React, Vite, TypeScript, etc.). Regular updates keep dependencies current and secure. Each update is a PATCH version.

**Alternative Considered**: Batch dependency updates.  
**Rejected Because**: Batching delays security fixes and creates larger, riskier updates.

#### Reason 2: Continuous Improvement
Internal code quality improvements (refactoring, type enhancements, performance) are continuous. Versioning these changes creates audit trail.

**Alternative Considered**: Only version "significant" changes.  
**Rejected Because**: "Significant" is subjective; automation is objective.

#### Reason 3: Precise Rollbacks
If a consumer project encounters an issue, fine-grained versions enable precise rollback to the last known-good state.

**Alternative Considered**: Fewer versions, broader changes per version.  
**Rejected Because**: Increases blast radius of issues; harder to identify culprit changes.

#### Reason 4: Auditability
Every merged change is traceable to a specific version. This supports compliance, debugging, and historical analysis.

**Alternative Considered**: Squash multiple changes into single versions.  
**Rejected Because**: Loses traceability; makes bisecting issues harder.

### Conservative by Design

The Spektra versioning policy is **intentionally conservative**:
- Err on the side of more versions, not fewer
- Err on the side of documenting changes, not hiding them
- Err on the side of automation, not human discretion

**This conservatism supports stability and trust.**

---

## Consumer Implications

### For Project Teams

Consumer projects (baseline and others) interact with engine versions via `package.json`.

#### Version Pinning
```json
{
  "dependencies": {
    "@spektra/core": "1.3.0"
  }
}
```
**Use when**: Absolute stability required; manual update preferred.

#### Range Specifications
```json
{
  "dependencies": {
    "@spektra/core": "^1.3.0"
  }
}
```
**Use when**: Automatic PATCH updates desired; trust in semantic versioning.

#### Update Strategy
- **MAJOR**: Manual review and migration required
- **MINOR**: Review new features; adopt when beneficial
- **PATCH**: Safe to auto-update (CI will catch issues)

### Version Resolution

Projects use `pnpm` for dependency management. Version resolution follows pnpm rules:
- `^1.3.0` → Latest 1.x.x (MINOR and PATCH updates allowed)
- `~1.3.0` → Latest 1.3.x (PATCH updates only)
- `1.3.0` → Exact version (no updates)

**Recommended**: Use `^` for most cases; use exact pinning only when debugging version-specific issues.

---

## Exceptions and Edge Cases

### No Exceptions
This policy has **no exceptions**. All engine changes follow the same versioning rules.

### Edge Cases

#### Documentation-Only Changes
**Scenario**: Fix typo in README  
**Commit**: `docs: fix typo in README`  
**Result**: PATCH version increment

**Rationale**: Maintains consistent automation; documentation is part of the package.

#### Test-Only Changes
**Scenario**: Add unit tests without code changes  
**Commit**: `test: add DataGrid tests`  
**Result**: PATCH version increment

**Rationale**: Tests are part of the codebase state; version documents that state.

#### CI-Only Changes
**Scenario**: Update GitHub Actions workflow  
**Commit**: `chore: update CI workflow`  
**Result**: PATCH version increment

**Rationale**: CI changes affect build output; version documents the change.

#### Experimental Features
**Scenario**: Add experimental API  
**Commit**: `feat: add experimental useDataStream hook`  
**Result**: MINOR version increment

**Rationale**: Even experimental features are additions; document as such. Mark as experimental in documentation.

---

## Governance and Enforcement

### Automated Enforcement
- semantic-release validates commits
- CI pipeline enforces conventional commit format
- Non-compliant commits cannot be merged

### Manual Oversight
Platform team reviews:
- MAJOR version release notes (manual approval before merge)
- CHANGELOG categorization (post-release validation)
- Consumer project migration support (for MAJOR versions)

### Policy Violations
If versioning policy is violated:
1. Identify root cause (commit message error, semantic-release config issue)
2. Document in incident log
3. Fix root cause
4. **Do NOT rewrite version history**
5. Create corrective version if necessary

---

## Metrics and Monitoring

### Version Frequency Metrics
- Average PATCH versions per week (expected: 3-5)
- Average MINOR versions per month (expected: 1-2)
- Average MAJOR versions per year (expected: 0-1)

### Deviation Indicators
- No versions for >1 week (investigate: is development stalled?)
- >2 MAJOR versions per year (investigate: is API unstable?)
- PATCH frequency >10/week (investigate: is CI over-triggering?)

---

## Historical Context

### Version History Baseline
As of policy effective date (January 2026):
- Current version: `engine-v1.x.x` (exact version depends on current state)
- Total versions: (calculated from Git history)
- Average PATCH frequency: (calculated from recent history)

### Pre-Policy Behavior
Before this policy:
- Versioning was manual
- Inconsistent application of SemVer
- Tribal knowledge determined version bumps

**Post-Policy**:
- Fully automated
- Deterministic and documented
- No human discretion

---

## Long-Term Stability

This policy is designed for **long-term stability**. Future changes will be:
- Rare
- Well-justified
- Communicated in advance
- Backwards-compatible (the policy about the policy is stable)

---

## Related Concepts

### Version vs Release
- **Version**: Technical state identifier (automated)
- **Release**: Communicated event (selective)

See [Release Communication Strategy](./RELEASE_COMMUNICATION_STRATEGY.md).

### Version vs Changelog Entry
- **Version**: Number identifying state
- **Changelog Entry**: Human-readable description of changes

See [CHANGELOG Policy](./CHANGELOG_POLICY.md).

---

## Summary

| Aspect | Policy |
|--------|--------|
| **Versioning Standard** | Semantic Versioning 2.0.0 |
| **Automation** | semantic-release (authoritative) |
| **MAJOR** | Breaking changes only |
| **MINOR** | New features only |
| **PATCH** | Fixes, maintenance, internal changes |
| **Frequency** | High (by design) |
| **Exceptions** | None |
| **Communication** | Selective (see Communication Strategy) |
| **Enforcement** | Automated via CI |

---

## Final Statement

**PATCH versions are not noise. They are precision.**

The Spektra engine operates under a high-frequency versioning model where every change is versioned, documented, and auditable. This is intentional, conservative, and supports long-term platform stability.

Version numbers are state identifiers, not marketing tools. The frequency of versions reflects the continuous evolution of the platform, not instability.

**This policy is enforced, stable, and non-negotiable.**

---

## Policy Metadata

**Version**: 1.0.0  
**Approved By**: Platform Team  
**Next Review Date**: Q3 2026  
**Changelog**: Initial policy creation

---

## Contact

For questions about this policy:
- **Technical**: Platform team Slack channel
- **Process**: Platform team lead
- **Exceptions**: None (but edge cases can be discussed)
