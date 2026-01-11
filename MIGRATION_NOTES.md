# Baseline Template Migration Notes

**Date**: 2026-01-11  
**Migration Type**: Promotion from project to canonical template

## Summary

The `projects/baseline` reference implementation has been successfully promoted to a canonical project template at `engine/templates/baseline/`.

## Changes Made

### 1. Template Creation

**Source**: `projects/baseline/`  
**Destination**: `engine/templates/baseline/`  
**Method**: Full copy with sanitization

All files were copied preserving:
- Folder structure
- Configuration files
- UI architecture (atoms/molecules/organisms)
- Data-driven design pattern
- Build and dev setup

### 2. Sanitization

Project-specific data was replaced with neutral placeholders:

| Original | Replaced With |
|----------|---------------|
| `"name": "baseline"` | `"name": "spektra-project"` |
| `Baseline` | `Spektra Project` |
| `info@baseline.example` | `info@example.com` |
| `localhost:3003` | `localhost:5173` |

### 3. Documentation Updates

**Created**:
- `engine/templates/baseline/README.md` - Comprehensive template guide
- `engine/templates/README.md` - Templates directory overview
- `projects/examples/README.md` - Examples directory explanation
- `projects/baseline/DEPRECATED.md` - Deprecation notice

**Updated**:
- `scripts/create-client.js` - Now uses `engine/templates/baseline/`
- `engine/CHANGELOG.md` - Added unreleased changes
- `README.md` (root) - Added template information

### 4. Archival

**Status**: `projects/baseline/` marked as DEPRECATED

A `DEPRECATED.md` file was added to the original baseline project directory to guide users to the new template location. The directory should be manually deleted or moved to `projects/examples/baseline-archived/` when ready.

## Usage After Migration

### Creating New Projects

**Old Way** (deprecated):
```bash
cp -r projects/baseline projects/new-client
```

**New Way** (canonical):
```bash
cd scripts
node create-client.js

# Follow prompts:
# Projekt neve: new-client
# Oldal neve: New Client
```

### Template Location

```
engine/
  templates/
    baseline/          ← Canonical template
      src/
        data/          ← Data files with placeholders
        pages/         ← Example pages
        ui/            ← Project-level UI components
      index.html
      package.json
      vite.config.ts
      README.md        ← Template documentation
```

## Validation Checklist

- [x] Template copied successfully
- [x] Project-specific data sanitized
- [x] Engine boundaries maintained (no projects/* references)
- [x] create-client.js updated
- [x] Documentation created/updated
- [x] Original baseline marked as deprecated
- [x] CHANGELOG updated
- [x] README updated

## Breaking Changes

None. This is an internal structural change that does not affect existing projects.

## Next Steps

1. **Test the create-client script**:
   ```bash
   cd scripts
   node create-client.js test-project
   ```

2. **Verify new project structure**:
   ```bash
   cd projects/test-project
   pnpm install
   pnpm dev
   ```

3. **Remove deprecated baseline** (when ready):
   ```bash
   rm -rf projects/baseline
   # or
   mv projects/baseline projects/examples/baseline-archived
   ```

4. **Update workspace configs** (if needed):
   - `projects/pnpm-workspace.yaml`
   - `projects/package.json`

## Rollback Plan

If issues are discovered:

1. The original `projects/baseline/` still exists (marked deprecated)
2. Revert `scripts/create-client.js` to use `projects/baseline/`
3. Remove `engine/templates/baseline/`
4. Document issues for future migration attempt

## Related Documentation

- [engine/templates/baseline/README.md](../engine/templates/baseline/README.md) - Template usage guide
- [docs/versioning/versioning-strategy_hu.md](../docs/versioning/versioning-strategy_hu.md) - Version management
- [docs/architecture/ui-architecture_hu.md](../docs/architecture/ui-architecture.md) - UI architecture rules

## Impact Analysis

### Affected Components
- ✅ Engine: New templates directory added
- ✅ Scripts: create-client.js updated
- ⚠️ Projects: baseline marked deprecated (to be removed)
- ✅ Documentation: Updated across repository

### User Impact
- **Developers**: Must use new create-client.js script
- **CI/CD**: No changes required
- **Existing Projects**: No changes required

### Timeline
- **Immediate**: Template available for use
- **Short-term** (1-2 weeks): Test with new projects
- **Medium-term** (1 month): Remove deprecated baseline
- **Long-term**: Template becomes standard for all new Spektra projects

---

**Migration Status**: ✅ COMPLETE  
**Template Status**: ✅ READY FOR USE  
**Deprecated Baseline**: ⚠️ PENDING REMOVAL
