# Storybook Documentation

## 1. Introduction

### What is Storybook?

Storybook is an open-source tool for developing and documenting UI components in isolation. It allows you to develop and test components independently without running the entire application.

### Why Use Storybook in Spektra Engine?

- **Component Catalog**: All UI components visible and testable in one place
- **Visual Documentation**: Interactive examples for every component
- **Isolated Development**: Develop components outside the full application context
- **Design System**: Central reference point for the design system
- **Testing**: Foundation for visual and interaction testing
- **Collaboration**: Common interface between developers and designers

### Project Structure

```
engine/
├── .storybook/              # Storybook configuration
│   ├── main.ts              # Main configuration
│   ├── preview.ts           # Preview settings
│   ├── preview-final.css    # Global styles
│   ├── tailwind.config.js   # Tailwind configuration
│   └── postcss.config.js    # PostCSS settings
├── packages/
│   ├── core/
│   │   └── stories/         # Core component stories
│   │       └── Button.stories.tsx
│   └── themes/
│       └── stories/         # Theme component stories
│           └── Hero.stories.tsx
└── package.json             # Storybook dependencies
```

## 2. How It Works

### Architecture

Storybook consists of the following main elements:

1. **Main configuration** (`.storybook/main.ts`): Story file locations, addons, framework settings
2. **Preview configuration** (`.storybook/preview.ts`): Global decorators and parameters
3. **Story files**: Different states and variants of components
4. **Addons**: Additional functionality (controls, documentation, etc.)

### Configuration Overview

#### Main Configuration (`.storybook/main.ts`)

```typescript
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const config: StorybookConfig = {
  // Story file locations (glob patterns)
  stories: [
    '../packages/core/stories/**/*.stories.@(ts|tsx)',
    '../packages/themes/stories/**/*.stories.@(ts|tsx)',
  ],
  
  // Addons (extensions)
  addons: [
    '@storybook/addon-essentials',    // Essential features
    '@storybook/addon-interactions',  // Interaction testing
    '@storybook/addon-docs',          // Documentation generation
  ],
  
  // Framework (React + Vite)
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  
  // Enable documentation
  docs: {},
  
  // Customize Vite configuration
  async viteFinal(config) {
    return mergeConfig(config, {
      css: {
        postcss: {
          plugins: [
            tailwindcss(path.resolve(__dirname, 'tailwind.config.js')),
            autoprefixer(),
          ],
        },
      },
      resolve: {
        alias: {
          '@spektra/core': path.resolve(__dirname, '../packages/core'),
        },
      },
    });
  },
};

export default config;
```

**Key elements:**
- **stories**: Glob patterns for finding story files
- **addons**: List of installed extensions
- **framework**: Using React + Vite
- **viteFinal**: Tailwind CSS and alias settings

#### Preview Configuration (`.storybook/preview.ts`)

```typescript
import type { Preview } from '@storybook/react';
import './preview-final.css';  // Import global styles

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,  // Color controls
        date: /Date$/i,                 // Date controls
      },
    },
    docs: {
      toc: true,  // Enable table of contents
    },
  },
};

export default preview;
```

### Addons and Extensions

#### Installed Addons:

1. **@storybook/addon-essentials** - Essential features:
   - Controls: Dynamic prop modification
   - Actions: Event logging
   - Viewport: Responsive views
   - Backgrounds: Background color switching
   - Toolbars: Custom toolbar elements

2. **@storybook/addon-interactions** - Interaction testing:
   - Simulate user interactions
   - Use play functions
   - Automated testing

3. **@storybook/addon-docs** - Documentation generation:
   - Automatic prop tables
   - Display JSDoc comments
   - Markdown support
   - Code snippets

### Tailwind CSS Integration

Storybook has its own Tailwind configuration (`.storybook/tailwind.config.js`), which:
- Includes files from core and themes packages
- Stays in sync with the project's main Tailwind settings
- Ensures design token availability

## 3. Starting and Usage

### Starting Development Mode

```bash
# From workspace root (spektra/)
cd engine
pnpm storybook
```

This starts the Storybook dev server at `http://localhost:6006`.

**Features in development mode:**
- ✅ Hot reload (automatic refresh on file changes)
- ✅ Live preview
- ✅ Interactive controls
- ✅ Full addon functionality

### Building for Production

Create a static HTML/JS build for deployment:

```bash
cd engine
pnpm build-storybook
```

This creates a `storybook-static/` folder that can be hosted.

### Browser Usage

Storybook interface sections:

```
┌─────────────────────────────────────────────────────┐
│ [🏠] [📖 Docs] [🎨 Addons]                Toolbar  │
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│ 📁 Core  │        Canvas / Docs                     │
│   └─ UI  │                                          │
│     └─🔘 │       [Component Preview]                │
│          │                                          │
│ 📁 Themes│                                          │
│          │                                          │
│          │                                          │
├──────────┴──────────────────────────────────────────┤
│ Controls | Actions | Interactions | Accessibility  │
└─────────────────────────────────────────────────────┘
```

**Elements:**
1. **Sidebar** (left): Hierarchical list of stories
2. **Canvas**: Live component preview
3. **Docs tab**: Generated documentation
4. **Addons panel** (bottom): Controls, actions, etc.
5. **Toolbar** (top): Viewport, background, theme switching

### Navigation

- **Switch stories**: Click in the sidebar
- **Canvas ↔ Docs**: Tabs in the top panel
- **Modify controls**: Addons panel → Controls tab
- **Fullscreen**: F key or toolbar icon
- **Zoom**: Ctrl/Cmd + +/- or toolbar

## 4. Creating New Component Stories

### Where to Place Story Files?

**Core components** (button, input, card, etc.):
```
engine/packages/core/stories/ComponentName.stories.tsx
```

**Theme components** (hero, footer, navbar, etc.):
```
engine/packages/themes/stories/ComponentName.stories.tsx
```

### Basic Story File Structure

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../components/path/to/ComponentName';

/**
 * JSDoc comment about the component.
 * 
 * ## When to use
 * - Use cases
 * 
 * ## When NOT to use
 * - When not to use it
 */
const meta = {
  title: 'Category/Subcategory/ComponentName',  // Sidebar hierarchy
  component: ComponentName,
  parameters: {
    layout: 'centered',  // or 'fullscreen', 'padded'
    docs: {
      description: {
        component: 'Brief description of the component.',
      },
    },
  },
  tags: ['autodocs'],  // Automatic documentation generation
  argTypes: {
    propName: {
      control: 'select',  // or 'text', 'boolean', 'number'
      options: ['option1', 'option2'],
      description: 'Prop description',
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default story
 */
export const Default: Story = {
  args: {
    propName: 'value',
  },
};

/**
 * Variant story
 */
export const Variant: Story = {
  args: {
    propName: 'different value',
  },
};
```

### Meta Configuration in Detail

#### Title (hierarchy)

```typescript
title: 'Core/UI/Button'
// Result:
// 📁 Core
//   └─ 📁 UI
//      └─ 🔘 Button
```

**Conventions:**
- `Core/UI/*` - Basic UI components
- `Core/Form/*` - Form components
- `Core/Layout/*` - Layout components
- `Themes/Sections/*` - Theme sections
- `Themes/Templates/*` - Full pages

#### Parameters

```typescript
parameters: {
  layout: 'centered',      // Component placement
  // 'centered' - centered
  // 'fullscreen' - full width
  // 'padded' - surrounded by padding
  
  docs: {
    description: {
      component: 'Component description...',
    },
  },
  
  backgrounds: {
    default: 'dark',       // Default background
    values: [
      { name: 'dark', value: '#333' },
      { name: 'light', value: '#fff' },
    ],
  },
}
```

#### Tags

```typescript
tags: ['autodocs']  // Automatic documentation page
```

#### ArgTypes (controls)

```typescript
argTypes: {
  variant: {
    control: 'select',          // Dropdown
    options: ['primary', 'secondary'],
    description: 'Visual style',
    table: {
      defaultValue: { summary: 'primary' },
      type: { summary: 'string' },
    },
  },
  
  size: {
    control: 'radio',           // Radio buttons
    options: ['sm', 'md', 'lg'],
  },
  
  label: {
    control: 'text',            // Text input
  },
  
  isActive: {
    control: 'boolean',         // Checkbox
  },
  
  count: {
    control: { 
      type: 'number',           // Number input
      min: 0, 
      max: 100, 
      step: 5 
    },
  },
  
  color: {
    control: 'color',           // Color picker
  },
  
  startDate: {
    control: 'date',            // Date picker
  },
  
  onClick: {
    action: 'clicked',          // Action log
  },
}
```

### Creating Stories

#### Simple Story

```typescript
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Click me',
  },
};
```

#### Story with Render Function

```typescript
export const CustomRender: Story = {
  args: {
    text: 'Hello',
  },
  render: (args) => (
    <div className="space-y-4">
      <ComponentName {...args} />
      <ComponentName {...args} variant="secondary" />
    </div>
  ),
};
```

#### Story with Play Function (interaction)

```typescript
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const Interactive: Story = {
  args: {
    label: 'Submit',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    await userEvent.click(button);
    await expect(button).toHaveTextContent('Submit');
  },
};
```

### Examples

#### Button Component (Core)

```typescript
// engine/packages/core/stories/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/ui/Button';

const meta = {
  title: 'Core/UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading...',
    isLoading: true,
  },
};
```

#### Hero Component (Themes)

```typescript
// engine/packages/themes/stories/Hero.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from '@spektra/core';

const meta = {
  title: 'Themes/Sections/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Build Something Amazing',
    description: 'Create beautiful websites with our component library.',
    primaryCTA: {
      text: 'Get Started',
      onClick: () => console.log('Get Started clicked'),
    },
  },
};

export const WithBackgroundImage: Story = {
  args: {
    title: 'Transform Your Ideas',
    backgroundImage: 'https://images.unsplash.com/photo-1234',
    primaryCTA: {
      text: 'Explore',
      onClick: () => console.log('Explore clicked'),
    },
  },
};
```

## 5. Component Documentation

### JSDoc Comments

Use JSDoc comments in your component TypeScript definition:

```typescript
/**
 * Button component for triggering various actions.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="lg">
 *   Click Me
 * </Button>
 * ```
 */
export interface ButtonProps {
  /**
   * Visual style variant of the button
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  
  /**
   * Size of the button
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Display loading state
   */
  isLoading?: boolean;
  
  /**
   * Button child elements (text or icons)
   */
  children: React.ReactNode;
  
  /**
   * Click event handler
   */
  onClick?: () => void;
}
```

### Autodocs Feature

The `tags: ['autodocs']` automatically generates a documentation page:

- **Prop table**: Types, defaults, descriptions
- **Code examples**: Source code for every story
- **Interactive canvas**: Testable component
- **JSDoc content**: Component and prop descriptions

### Story Descriptions

Add descriptions to every story with JSDoc comments:

```typescript
/**
 * Default button with primary variant.
 * Use this for the most important actions (Submit, Save, Continue).
 */
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

/**
 * Loading state with spinner icon.
 * The button is automatically disabled during loading.
 */
export const Loading: Story = {
  args: {
    children: 'Loading...',
    isLoading: true,
  },
};
```

### Usage Guidelines

Provide contextual information in the meta JSDoc comment:

```typescript
/**
 * Button component for triggering actions and navigation.
 * 
 * ## When to use
 * - Submit forms (submit, save)
 * - Navigate between steps or pages
 * - Trigger modals, dialogs, or other UI changes
 * 
 * ## When NOT to use
 * - For navigation between pages (use Link instead)
 * - For non-interactive labels (use text elements)
 * - Inside interactive elements like other buttons
 * 
 * ## Accessibility
 * - Use meaningful text, avoid "Click here"
 * - Loading state has aria-busy="true"
 * - Disabled state has aria-disabled="true"
 * 
 * ## Best practices
 * - Use primary variant for only 1-2 buttons in a view
 * - Use danger variant for destructive actions
 * - Disable button during loading state
 */
```

### Markdown Documentation

You can also create separate MDX files:

```mdx
{/* Button.docs.mdx */}
import { Meta, Canvas, Story } from '@storybook/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

# Button Component

The Button component is the basic interactive element in the application.

## Variants

<Canvas of={ButtonStories.Primary} />
<Canvas of={ButtonStories.Secondary} />
<Canvas of={ButtonStories.Outline} />

## Usage Examples

### Form Submit
```tsx
<form onSubmit={handleSubmit}>
  <Button type="submit" variant="primary">
    Save
  </Button>
</form>
```
```

## 6. Best Practices

### Story Naming

```typescript
// ✅ Good - Descriptive and understandable
export const Primary: Story = { ... }
export const WithIcon: Story = { ... }
export const LoadingState: Story = { ... }

// ❌ Bad - Not informative
export const Story1: Story = { ... }
export const Test: Story = { ... }
```

### Args Organization

```typescript
// ✅ Good - Logical defaults
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Button',
  },
};

// Variants only override differences
export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};
```

### Component Isolation

```typescript
// ✅ Good - All data mocked
export const WithData: Story = {
  args: {
    user: {
      name: 'John Doe',
      email: 'john@example.com',
    },
  },
};

// ❌ Bad - External dependency (API, store)
export const WithRealData: Story = {
  render: () => <UserProfile userId={fetchFromAPI()} />
};
```

### Responsive Testing

```typescript
export const Mobile: Story = {
  args: { ... },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Tablet: Story = {
  args: { ... },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
```

## 7. Troubleshooting

### Port Already in Use (6006)

**Problem**: `Error: Port 6006 is already in use`

**Solution 1** - Stop process in PowerShell:
```powershell
Get-NetTCPConnection -LocalPort 6006 -ErrorAction SilentlyContinue | 
  ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

**Solution 2** - Use different port:
```bash
pnpm storybook -- --port 6007
```

### Build Errors

**Problem**: TypeScript errors during build

**Solution**:
```bash
# Type check
cd engine
pnpm run build

# If needed, update dependencies
pnpm install
```

### CSS/Tailwind Issues

**Problem**: Tailwind classes not working

**Check**:
1. Does `.storybook/tailwind.config.js` include correct content paths?
2. Is `preview-final.css` imported in `preview.ts`?
3. Does PostCSS configuration include Tailwind plugin?

**Solution**:
```javascript
// .storybook/tailwind.config.js
module.exports = {
  content: [
    '../packages/core/**/*.{ts,tsx}',
    '../packages/themes/**/*.{ts,tsx}',
    './**/*.{ts,tsx}',
  ],
  // ... additional configuration
};
```

### Story Not Appearing

**Problem**: New story not visible in Storybook

**Check**:
1. File name: `*.stories.tsx` or `*.stories.ts`
2. Correct location in `stories/` folder
3. Exporting meta object: `export default meta`
4. At least one exported story exists

**Solution** - Restart Storybook:
```bash
# Ctrl+C in terminal, then:
pnpm storybook
```

### Alias Issues

**Problem**: `Cannot find module '@spektra/core'`

**Solution** - Check alias settings in `.storybook/main.ts`:
```typescript
resolve: {
  alias: {
    '@spektra/core': path.resolve(__dirname, '../packages/core'),
    '@spektra/themes': path.resolve(__dirname, '../packages/themes'),
  },
}
```

### Slow Build

**Problem**: Storybook loads slowly

**Optimization**:
1. Limit number of story files in `main.ts`
2. Use lazy loading for large components
3. Reduce number of addons if not using them

## 8. Useful Commands

```bash
# Development mode (hot reload)
pnpm storybook

# Static build
pnpm build-storybook

# Preview build locally
npx http-server storybook-static

# Clear Storybook cache
rm -rf node_modules/.cache/storybook

# Update to latest version
pnpm add -Dw storybook@latest @storybook/react@latest @storybook/react-vite@latest
```

## 9. Additional Resources

- [Official Storybook Documentation](https://storybook.js.org/docs)
- [Storybook + Vite](https://storybook.js.org/docs/react/builders/vite)
- [Storybook + TypeScript](https://storybook.js.org/docs/react/configure/typescript)
- [Writing Stories Guide](https://storybook.js.org/docs/react/writing-stories/introduction)
- [Addon Documentation](https://storybook.js.org/docs/react/essentials/introduction)

## 10. Summary

Storybook is the central documentation and development tool for Spektra Engine. Use it to:

✅ Create stories for every new UI component  
✅ Document use cases with JSDoc comments  
✅ Test different states and variants  
✅ Maintain stories alongside components  
✅ Use as reference for design decisions  

A well-maintained Storybook is the foundation for consistent and quality UI development! 🎨
