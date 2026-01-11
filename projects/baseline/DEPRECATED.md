# ⚠️ DEPRECATION NOTICE

**This project has been promoted to a canonical template.**

## New Location

The canonical Spektra project template is now at:

```
engine/templates/baseline/
```

## Migration Complete

This directory (`projects/baseline`) should be **removed** or **archived** to avoid confusion.

The template at `engine/templates/baseline/` is now the single source of truth for:
- New project scaffolding
- Architectural reference
- Best practices documentation

## Creating New Projects

Use the create-client script:

```bash
cd scripts
node create-client.js new-client-name
```

## Action Required

**Please delete or archive this directory:**

```bash
# Option 1: Delete
rm -rf projects/baseline

# Option 2: Archive
mv projects/baseline projects/examples/baseline-archived
```

Then update `projects/package.json` and `projects/pnpm-workspace.yaml` if they reference this project.

---

**Date**: 2026-01-11
**Reason**: Promoted to canonical template at `engine/templates/baseline`
