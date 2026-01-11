# Baseline - Canonical Spektra Reference Project

**THIS IS NOT A REAL CLIENT PROJECT**

This is the canonical reference implementation for Spektra. It reproduces the original Client A design exactly while following the current Spektra architecture.

## Purpose

- **Reference**: Template for all future Spektra projects
- **Validation**: Proves the architecture works 1:1 with the original design
- **Documentation**: Living example of best practices

## Development

```bash
# Development mode
pnpm dev

# Build
pnpm build

# Preview
pnpm preview
```

## Architecture

This project demonstrates the **correct** Spektra architecture:

### Data-Driven Design

All content and configuration lives in `src/data/`:

- **site.ts** - Brand identity, colors, typography, contact info
- **content.ts** - All text content, copy, and labels
- **gallery.ts** - Gallery images and configuration
- **loaders/loadSiteData.ts** - Single entry point for data loading

### Project Structure

```
baseline/
├── src/
│   ├── main.tsx              # Entry point - loads data, renders App
│   ├── data/
│   │   ├── index.ts          # Public data exports
│   │   ├── site.ts           # Brand & visual configuration
│   │   ├── content.ts        # Text content
│   │   ├── gallery.ts        # Gallery data
│   │   ├── types.ts          # Type definitions
│   │   └── loaders/
│   │       └── loadSiteData.ts  # Data assembly
│   └── ui/                   # Project-specific UI (if needed)
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### Architectural Rules

✅ **DO**:
- Keep ALL data in `src/data/`
- Use engine components as-is via `@spektra/core`
- Load data via `loadSiteData()`
- Keep the project as a thin wrapper

❌ **DON'T**:
- Hardcode content in components
- Add client-specific logic to the engine
- Deep import from engine internals
- Store configuration outside `src/data/`

## Visual Parity

This project **exactly matches** the original Client A:

- ✅ Color palette (Blue #3b82f6, Purple #a855f7)
- ✅ Typography (Lexend for headings, Inter for body)
- ✅ Hero layout and structure
- ✅ Features grid (3 columns, 6 items)
- ✅ About section with stats
- ✅ Gallery with filtering
- ✅ Contact form

## Usage as Template

To create a new project from baseline:

1. **Copy the structure**:
   ```bash
   cp -r projects/baseline projects/new-client
   ```

2. **Update branding** in `src/data/site.ts`:
   - Change name, colors, fonts
   - Update contact information

3. **Update content** in `src/data/content.ts`:
   - Replace all text content
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
