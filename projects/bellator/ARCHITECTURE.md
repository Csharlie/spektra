# Bellator Project - Architecture Documentation

## Migration Status: ✅ COMPLETE

This project has been migrated to follow the Spektra architecture with strict data boundaries.

## Architecture Overview

### Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                         ENGINE                              │
│  (Pure, reusable, client-agnostic platform)                │
│  - Receives data ONLY via props                            │
│  - No imports from projects/                               │
│  - No CMS logic, config, or content                        │
└─────────────────────────────────────────────────────────────┘
                          ▲
                          │ Props only
                          │
┌─────────────────────────────────────────────────────────────┐
│                      PROJECT LAYER                          │
│  App.tsx → getBellatorContent() → HomePage                 │
└─────────────────────────────────────────────────────────────┘
                          ▲
                          │
┌─────────────────────────────────────────────────────────────┐
│                       DATA LAYER                            │
│  src/data/loaders/loadSiteData.ts                          │
│  - SINGLE entry point for all data                         │
│  - Assembles data from multiple sources                    │
│  - Returns unified data object                             │
└─────────────────────────────────────────────────────────────┘
                          ▲
                          │
┌─────────────────────────────────────────────────────────────┐
│                     DATA SOURCES                            │
│  - src/data/content.ts (static content)                    │
│  - config/* (legacy, imported by data layer)               │
│  - CMS (TODO: to be implemented)                           │
└─────────────────────────────────────────────────────────────┘
```

## Project Structure

```
projects/bellator/
├── src/data/                    # 🔒 DATA BOUNDARY - All data lives here
│   ├── loaders/
│   │   └── loadSiteData.ts     # SINGLE entry point for data
│   ├── content.ts               # All static content
│   ├── site.ts                  # Legacy site manifest
│   ├── types.ts                 # Data type definitions
│   └── index.ts
├── config/                      # Legacy config (imported by data layer)
│   ├── site.ts
│   └── navigation.ts
├── pages/
│   └── Home/
│       └── index.tsx            # Receives ALL data via props
├── components/                  # Pure UI components (props only)
│   ├── sections/
│   ├── organisms/
│   ├── molecules/
│   └── atoms/
├── App.tsx                      # Loads data, passes to pages
└── main.tsx                     # Entry point with providers
```

## Key Principles

### ✅ DO:
- ALL data flows through `src/data/loaders/loadSiteData.ts`
- UI components receive data ONLY via props
- Keep engine packages pure and reusable
- Add TODO comments when structure is ambiguous

### ❌ DON'T:
- Import config/content/data directly in UI components
- Fetch data in UI components
- Import project files in engine
- Add client-specific logic to engine

## Data Layer Files

### `src/data/content.ts`
- Contains ALL static content, text, and configuration
- Defines `BellatorContent` interface
- Imports legacy config for migration
- Single source of truth for content

### `src/data/loaders/loadSiteData.ts`
- SINGLE entry point for data assembly
- Transforms content to `SiteData` format
- Placeholder for future CMS integration
- Returns unified data object

### `src/data/types.ts`
- Defines `SiteData` interface (temporary)
- Will be replaced by `@spektra/core` types
- Provides structure until dependencies are installed

## Migration Notes

### Completed:
✅ Created unified data layer in `src/data/`
✅ Moved all static content to `content.ts`
✅ Created `loadSiteData()` as single data entry point
✅ Refactored HomePage to accept data via props
✅ Updated App.tsx to load and pass data
✅ Verified engine purity (no project imports)
✅ Removed direct config imports from pages

### Legacy Files (Still Present):
- `config/site.ts` - Imported by data layer, can be deprecated later
- `config/navigation.ts` - Imported by data layer, can be deprecated later

These files are now only imported by the data layer and can be removed once content.ts is fully integrated.

## Next Steps (TODO)

1. **CMS Integration**
   - Implement CMS data fetching in `loadSiteData.ts`
   - Add error handling and fallback logic
   - Merge CMS data with static content

2. **Type Alignment**
   - Replace temporary types with `@spektra/core` types
   - Ensure `SiteData` interface matches engine expectations
   - Add missing fields (logo, fonts, etc.)

3. **Optimization**
   - Add data caching/memoization if needed
   - Consider lazy loading for large content sections
   - Implement data validation

4. **Cleanup**
   - Remove legacy config files once fully migrated to content.ts
   - Remove `getBellatorContent()` once SiteData is complete
   - Update engine to consume SiteData directly

## Usage Example

```tsx
// App.tsx
import { getBellatorContent } from './src/data';

function App() {
  const content = getBellatorContent();
  return <HomePage content={content} />;
}

// pages/Home/index.tsx
interface HomePageProps {
  content: BellatorContent;
}

const HomePage: React.FC<HomePageProps> = ({ content }) => {
  // Use content directly, no imports needed
  return (
    <div>
      <SplitHeroBellatorGym
        gymSide={content.pages.home.hero.gymSide}
        squashSide={content.pages.home.hero.squashSide}
      />
    </div>
  );
};
```

## Verification

To verify the migration was successful:

1. ✅ No UI components import from `config/`
2. ✅ All data flows through `src/data/`
3. ✅ HomePage accepts `content` prop
4. ✅ App.tsx calls `getBellatorContent()`
5. ✅ Engine has no imports from `projects/`
6. ✅ Project builds without errors

## Questions?

- See `src/data/loaders/loadSiteData.ts` for data flow
- See `src/data/content.ts` for content structure
- Check TODO comments for areas needing review
