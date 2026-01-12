# Spektra Documentation

**Single source of truth for Spektra architecture, tooling, and workflows.**

## Purpose

This documentation system captures all architectural decisions, validation rules, tooling choices, and workflows used in the Spektra project. It serves as the canonical reference for:

- Developers working on Spektra
- AI assistants (GitHub Copilot)
- New team members onboarding
- Code review standards

## Documentation Structure

### 📐 [Architecture](./architecture/)

Core architectural patterns and design decisions.

- **[UI Architecture](./architecture/ui-architecture.md)** - Component layer structure, Atomic Design mapping, responsibility boundaries

### ✅ [Validation](./validation/)

How code quality and architectural compliance are enforced.

- **[Validation Pipeline](./validation/validation-pipeline.md)** - Build, lint, test flow using TurboRepo
- **[Guardrails](./validation/guardrails.md)** - Architectural constraints and ESLint rules

### 🛠️ [Tooling](./tooling/)

Tools and package management used in Spektra.

- **[Package Management](./tooling/package-management.md)** - PNPM workspaces, TurboRepo integration, dependency management

### 📦 [Versioning](./versioning/)

How versions are managed and what changes require version bumps.

- **[Versioning Strategy](./versioning/versioning-strategy.md)** - SemVer rules, MAJOR/MINOR/PATCH decisions, changelog guidelines

### 🔄 [Workflows](./workflows/)

Development workflows and git processes (planned).

- *Coming soon*

### 📋 [Decisions](./decisions/)

Architecture Decision Records (ADR) (planned).

- *Coming soon*

## Reading Guide

### For New Developers

1. Start with [UI Architecture](./architecture/ui-architecture.md) to understand component structure
2. Read [Guardrails](./validation/guardrails.md) to learn what's forbidden
3. Review [Package Management](./tooling/package-management.md) for PNPM and Turbo usage
4. Check [Validation Pipeline](./validation/validation-pipeline.md) to understand how to validate your code

### For AI Assistants (Copilot)

Before making changes:
1. **Always** read relevant documentation first
2. Check [Guardrails](./validation/guardrails.md) for restrictions
3. Verify layer boundaries in [UI Architecture](./architecture/ui-architecture.md)
4. Respect versioning rules in [Versioning Strategy](./versioning/versioning-strategy.md)

**Key principle:** If unsure, add a TODO comment rather than guessing.

### For Code Reviewers

Use these docs to validate:
- Architectural compliance with [Guardrails](./validation/guardrails.md)
- Proper layer separation per [UI Architecture](./architecture/ui-architecture.md)
- Correct version bumps per [Versioning Strategy](./versioning/versioning-strategy.md)
- All validation passes per [Validation Pipeline](./validation/validation-pipeline.md)

## Document Template

All documentation follows this structure:

```markdown
# Title

## Context
Why this exists, what problem it solves.

## Decision
What was decided. Be explicit and concise.

## Structure
Folders, packages, responsibilities.

## Rules
What is allowed and forbidden.

## Tooling Impact
Impact on PNPM, Turbo, CI/CD, Copilot.

## Versioning Notes
Whether this affects versioning.

## Related Docs
Links to other relevant Spektra docs.
```

## Key Principles

1. **Single Source of Truth** - All decisions documented here, not scattered in code comments
2. **Explicit Over Implicit** - State rules clearly, don't assume understanding
3. **Tooling Enforced** - Where possible, use ESLint/TypeScript/CI to enforce rules
4. **Living Documents** - Update as decisions evolve, don't let docs drift

## Contributing to Docs

### Adding New Documentation

1. Follow the document template above
2. Add links from this index
3. Cross-reference related documents
4. Update versioning notes if architectural

### Updating Existing Documentation

1. **MINOR changes** (clarifications, examples) - No version bump
2. **MAJOR changes** (new rules, changed decisions) - Document in changelog
3. Always check cross-references remain valid

## Quick Reference

### Component Layer Hierarchy

```
Templates (Page layouts)
    ↑
Sections (Organisms - Heroes, Galleries)
    ↑
Features (Molecules - Cards, NavItems)
    ↑
UI (Atoms - Buttons, Inputs)
    ↑
Utils / Hooks / Design System
```

### Validation Commands

```bash
# Engine
cd engine
pnpm install
pnpm lint      # Check code quality
pnpm build     # Build all packages
pnpm test      # Run tests (future)

# Projects
cd projects
pnpm install
cd projects/baseline
pnpm dev         # Run project
pnpm build       # Build project
```

### Version Bump Rules

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| Breaking API change | MAJOR | Prop renamed, component removed |
| New component/feature | MINOR | New Gallery component |
| Bug fix, refactor | PATCH | Fixed button hover color |

### Forbidden in Engine

```typescript
// ❌ NEVER - Project imports
import x from '../../../projects/my-project';

// ❌ NEVER - CMS libraries
import axios from 'axios';

// ❌ NEVER - Client names
const client = 'my-project';

// ❌ NEVER - Downward layer imports
// (Atoms importing Molecules, etc.)
```

## Related Files

These repository root files are related but not part of `/docs`:

- [README.md](../README.md) - Repository overview and quick start
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines and workflows
- [GIT_WORKFLOW.md](../GIT_WORKFLOW.md) - Git branching and upstream sync
- [engine/GUARDRAILS.md](../engine/GUARDRAILS.md) - Original guardrails spec (superseded by [docs/validation/guardrails.md](./validation/guardrails.md))

## Maintenance

This documentation is maintained by:
- Repository owners
- Core contributors
- Automated updates via CI/CD (future)

Last major update: January 2026

---

**Need clarification?** Open an issue or check related docs above.
