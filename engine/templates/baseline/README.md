# Spektra Project Template

**THIS IS A PROJECT TEMPLATE - NOT A RUNNABLE PROJECT**

This is the canonical template for creating new Spektra projects. It is derived from the original `projects/baseline` reference implementation and represents the proven, working structure that all Spektra projects should follow.

## Purpose

This template serves as:

- **Scaffolding Source**: Starting point for all new Spektra projects via `scripts/create-client.js`
- **Architectural Reference**: Demonstrates the correct Spektra project structure
- **Best Practices Guide**: Shows how to properly use engine components and organize project code

## Important Notes

⚠️ **DO NOT** run this template directly (no `pnpm install` or `pnpm dev` here)

⚠️ **DO NOT** customize this template for specific clients

⚠️ **DO** use `scripts/create-client.js` to create new projects from this template

## What Gets Created

When a new project is created from this template, it includes:

### Data-Driven Architecture

All project content lives in `src/data/`:
- `site.ts` - Brand identity, colors, typography, contact info  
- `content.ts` - All text content, copy, and labels
- `gallery.ts` - Gallery images and configuration (if needed)
- `loaders/loadSiteData.ts` - Data assembly entry point

### Clean Project Structure

```
new-project/
├── src/
│   ├── main.tsx              # Entry point with routing
│   ├── data/                 # All project data
│   │   ├── site.ts           # Brand & config
│   │   ├── content.ts        # Text content
│   │   └── loaders/
│   │       └── loadSiteData.ts
│   ├── pages/                # Page compositions
│   └── ui/                   # Project-specific components (if needed)
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Template Philosophy

✅ **Thin Wrapper**: Projects should be minimal, using engine components

✅ **Data-Driven**: All content in `src/data/`, not hardcoded

✅ **Engine-First**: Import from `@spektra/core`, don't duplicate logic

❌ **No Custom Platform Code**: Keep client logic at the project level

❌ **No Engine Modifications**: Never fork engine components into projects

## Creating New Projects

Use the create-client script:

```bash
cd scripts
node create-client.js new-client-name
```

This will:
1. Copy this template to `projects/new-client-name/`
2. Update package.json with the new project name
3. Set up proper dependencies
4. Create a fresh, ready-to-customize project

## Customization After Creation

Once a project is created from this template:

1. **Update branding** in `src/data/site.ts`:
   - Company name, colors, fonts
   - Contact information
   - Social media links

2. **Replace content** in `src/data/content.ts`:
   - Hero text, features, about section
   - Navigation labels
   - Call-to-action text

3. **Add pages** as needed:
   - Create new page components in `src/pages/`
   - Add routes in `src/main.tsx`
   - Use engine layouts and sections

4. **Customize UI** only when necessary:
   - Add project-specific components to `src/ui/`
   - Follow the 3-layer UI architecture (atoms/molecules/organisms)
   - Never duplicate engine components

## Architectural Rules

✅ **DO**:
- Keep ALL data in `src/data/`
- Use engine components via `@spektra/core`
- Load data through `loadSiteData()`
- Keep projects as thin wrappers

❌ **DON'T**:
- Hardcode content in components
- Copy engine code into projects
- Deep import from engine internals
- Add platform abstractions to projects

## Relationship to Original Baseline

This template was promoted from `projects/baseline`, which was the original reference implementation.

**Migration Path**: COMPLETED (2026-01-11)
- `projects/baseline` → removed
- `engine/templates/baseline` → canonical template
- New projects → created from this template via script

## Maintenance

This template should only be updated when:
- Core architectural patterns change
- New best practices are established
- Engine API significantly evolves

Individual project needs should NOT drive template changes.

## Related Documentation

- [UI Architecture](../../docs/architecture/ui-architecture_hu.md) - Understand the 3-layer system
- [Versioning Strategy](../../docs/versioning/versioning-strategy_hu.md) - Version management
- [Package Management](../../docs/tooling/package-management_hu.md) - Dependency handling
- [Validation Pipeline](../../docs/validation/validation-pipeline_hu.md) - Quality gates
   - Adjust navigation, hero, features, etc.

4. **Update gallery** in `src/data/gallery.ts`:
   - Replace images
   - Adjust categories

5. **Install dependencies**:
   ```bash
   cd projects/new-client
   pnpm install
   ```

6. **Run development server**:
   ```bash
   pnpm dev
   ```

## Template Quality Standards

This baseline project represents the **ideal** Spektra project:

- 🎯 Clean and readable code
- 📦 Proper separation of concerns
- 🔒 No client data in engine
- 🎨 1:1 visual match with original
- 📖 Well-documented
- ✨ Production-ready

## Integration with Engine

The project uses only the public `@spektra/core` API:

```tsx
import { 
  App,
  Hero, 
  Features, 
  About, 
  Gallery, 
  Contact,
  LandingLayout 
} from '@spektra/core';
```

No deep imports, no internal APIs, no hacks.

## CMS Integration (Future)

The data loader is ready for CMS integration:

```typescript
// In loadSiteData.ts
const cmsUrl = import.meta.env.VITE_WP_API_URL;
if (cmsUrl) {
  const cmsData = await fetchFromCMS(cmsUrl);
  return mergeCMSWithStatic(cmsData);
}
```

## Status

✅ **Production Ready**  
✅ **Architecture Compliant**  
✅ **Visual Match: 100%**  
✅ **Template Quality: Gold Standard**
