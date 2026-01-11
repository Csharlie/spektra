# Continuous Integration Pipeline

## Overview

The Spektra repository uses GitHub Actions to automatically validate every push and pull request. This ensures code quality and prevents unstable builds from being merged.

## Workflow File

**Location:** `.github/workflows/ci.yml`

## Triggers

The CI pipeline runs automatically on:

- **Push** to any branch
- **Pull Request** to any branch

## Pipeline Steps

### 1. Environment Setup
- **OS:** Ubuntu Latest
- **Node.js:** LTS version
- **Package Manager:** PNPM 8

### 2. Dependency Caching
- PNPM store is cached using GitHub Actions cache
- Cache key based on `pnpm-lock.yaml` hash
- Significantly speeds up subsequent runs

### 3. Installation
- Engine dependencies: `cd engine && pnpm install --frozen-lockfile`
- Projects dependencies: `cd projects && pnpm install --frozen-lockfile`

### 4. Quality Checks

#### Lint
```bash
cd engine && pnpm lint
```
Runs ESLint across all engine packages via Turborepo.

#### Build
```bash
cd engine && pnpm build
cd projects && pnpm build:bellator
```
Builds all packages and projects to ensure compilation succeeds.

#### Test
```bash
cd engine && pnpm test
```
Runs tests when available (gracefully skips if not configured).

## Quality Gate Behavior

- ✅ All steps must pass for the workflow to succeed
- ❌ Any failure blocks the entire pipeline
- 🚫 Failed builds cannot be merged (when branch protection is enabled)

## Benefits

### For Developers
- Immediate feedback on code quality
- Prevents accidental breaking changes
- Catches issues before review

### For Maintainers
- Enforced code standards
- Consistent build process
- Protected main branch

### For the Project
- Stable codebase
- Reliable deployments
- Reduced debugging time

## Monitoring

Check workflow status:
1. Go to **GitHub Repository**
2. Click **Actions** tab
3. View recent workflow runs

Each commit shows:
- ✅ Green checkmark = passed
- ❌ Red X = failed
- 🟡 Yellow dot = in progress

## Local Validation

Run the same checks locally before pushing:

```bash
# Engine checks
cd engine
pnpm install
pnpm lint
pnpm build
pnpm test

# Projects checks
cd projects
pnpm install
pnpm build:bellator
```

## Troubleshooting

### Build Failed: Lint Errors
- Run `pnpm lint` locally
- Fix reported issues
- Commit and push again

### Build Failed: Compilation Errors
- Run `pnpm build` locally
- Check TypeScript errors
- Fix type issues

### Build Failed: Test Failures
- Run `pnpm test` locally
- Fix failing tests
- Ensure all assertions pass

## Integration with Branch Protection

Recommended GitHub branch protection rules for `main`:

1. Require status checks to pass before merging
2. Require branches to be up to date before merging
3. Enable "CI / Quality Gate" as required check

This ensures no broken code enters the main branch.

## Future Enhancements

Potential additions (not currently implemented):

- Code coverage reporting
- Performance benchmarks
- Visual regression testing
- Automated dependency updates
- Security scanning

---

**Status:** ✅ Active and Enforced  
**Last Updated:** 2026-01-10
