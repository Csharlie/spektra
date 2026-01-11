# Testing Strategy

## Overview

The Spektra monorepo implements a minimal but enforceable testing baseline to protect public APIs. The testing infrastructure is professional, scalable, and cleanly separates production code from tests.

## Principles

### Testing Philosophy

- ✅ **API-focused testing**: Tests protect public APIs, not implementation details
- ✅ **Clean structure**: Tests isolated in `test/` folders
- ✅ **Production purity**: `src/` folders contain only production code
- ❌ **Projects are test-free**: `projects/*` folders contain no tests
- ❌ **No snapshot testing**: Avoid brittle snapshot tests
- ❌ **No CSS testing**: Don't test Tailwind classes or styles

### Architecture Decision

```
engine/
├── vitest.config.ts         # Root configuration
├── vitest.setup.ts          # Global setup
└── packages/
    ├── core/
    │   ├── src/              # Production code
    │   ├── test/             # Unit tests
    │   │   └── Button.test.tsx
    │   ├── vitest.config.ts  # Package-specific config
    │   └── package.json      # "test": "vitest run"
    └── themes/
        ├── corporate/        # Production code
        ├── test/             # Integration tests
        │   └── CorporateTheme.test.tsx
        ├── vitest.config.ts
        └── package.json      # "test": "vitest run"
```

## Technology Stack

### Core Dependencies

```json
{
  "devDependencies": {
    "vitest": "^4.0.16",
    "@testing-library/react": "^16.3.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/user-event": "^14.6.1",
    "jsdom": "^27.4.0",
    "@vitejs/plugin-react": "^4.7.0"
  }
}
```

### Why Vitest?

- **Vite integration**: Native support for Vite build system
- **Speed**: ESM-first, modern and fast
- **TypeScript support**: Out-of-the-box TypeScript support
- **Jest-compatible API**: Easy migration from Jest

## Configuration

### Root Vitest Config

```typescript
// engine/vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['packages/**/test/**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', 'projects/**'],
    setupFiles: ['./vitest.setup.ts'],
  },
});
```

**Key elements:**
- `globals: true` - `describe`, `it`, `expect` globally available
- `environment: 'jsdom'` - Browser-like environment for React components
- `include` - Only `packages/**/test/**` tests
- `exclude` - Explicit `projects/**` exclusion

### Setup File

```typescript
// engine/vitest.setup.ts
import '@testing-library/jest-dom/vitest';
```

This adds `jest-dom` matchers (`toBeInTheDocument`, `toBeDisabled`, etc.).

### Package-level Config

Each tested package gets its own `vitest.config.ts`:

```typescript
// packages/core/vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['../../vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
```

## Test Types

### Unit Tests (packages/core)

**Purpose**: Validate functionality of individual UI components

**Example: Button component**

```typescript
// packages/core/test/Button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../components/ui/Button';

describe('Button', () => {
  it('renders with children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables button when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

**What we test:**
- ✅ Component renders
- ✅ Event handlers work (onClick, onChange, etc.)
- ✅ Props effect (disabled, isLoading, etc.)
- ✅ Visible content displays correctly

**What we DON'T test:**
- ❌ CSS classes
- ❌ Tailwind utility classes
- ❌ DOM structure details
- ❌ Style calculations

### Integration Tests (packages/themes)

**Purpose**: Validate integration between themes and templates

**Example: Corporate Theme + Landing Template**

```typescript
// packages/themes/test/CorporateTheme.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LandingLayout } from '@spektra/core';
import { corporateTheme } from '../corporate/theme';

describe('CorporateTheme Integration', () => {
  it('renders LandingLayout with corporate theme colors', () => {
    const mockNavigation = {
      links: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
      ],
      logoText: 'Corporate',
    };

    const mockFooter = {
      sections: [
        {
          title: 'Links',
          links: [{ label: 'Privacy', href: '/privacy' }],
        },
      ],
      copyright: '2026 Corporate Inc.',
    };

    render(
      <LandingLayout navigation={mockNavigation} footer={mockFooter}>
        <div>Test Content</div>
      </LandingLayout>
    );

    expect(screen.getByText('Corporate')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('corporateTheme contains required color structure', () => {
    expect(corporateTheme.colors).toBeDefined();
    expect(corporateTheme.colors?.primary).toBeDefined();
    expect(corporateTheme.colors?.primary?.['600']).toBe('#0284c7');
  });
});
```

**What we test:**
- ✅ Template components assemble correctly
- ✅ Core UI components appear in template
- ✅ Theme object structure
- ✅ Configuration validation

**What we DON'T test:**
- ❌ Mocking core UI components (use real components)
- ❌ Visual regression
- ❌ Browser-specific rendering

## Running Tests

### Local Execution

```bash
# Root workspace
cd engine

# Run all tests
pnpm test

# Test specific package
cd packages/core
pnpm test

# Watch mode (during development)
pnpm test -- --watch

# Coverage report
pnpm test -- --coverage
```

### CI/CD Integration

Tests run automatically on every push and pull request:

```yaml
# .github/workflows/ci.yml
jobs:
  test:
    steps:
      - name: Run Tests
        run: |
          cd engine
          pnpm test
```

Turbo caches test results:

```json
// turbo.json
{
  "tasks": {
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    }
  }
}
```

## Writing New Tests

### Rules

1. **Location**: `packages/<package-name>/test/<ComponentName>.test.tsx`
2. **Naming**: `<ComponentName>.test.tsx` or `<FeatureName>.test.tsx`
3. **Imports**:
   ```typescript
   import { describe, it, expect, vi } from 'vitest';
   import { render, screen } from '@testing-library/react';
   import userEvent from '@testing-library/user-event';
   ```
4. **Structure**:
   ```typescript
   describe('ComponentName', () => {
     it('describes behavior', () => {
       // Arrange
       // Act
       // Assert
     });
   });
   ```

### Best Practices

#### ✅ DO

```typescript
// Use role-based queries
screen.getByRole('button', { name: /submit/i })

// Test user interactions
const user = userEvent.setup();
await user.click(button);

// Assert visible changes
expect(screen.getByText(/success/i)).toBeInTheDocument();

// Mock only external dependencies
const mockCallback = vi.fn();
```

#### ❌ DON'T

```typescript
// Don't use CSS selectors
container.querySelector('.btn-primary')

// Don't test implementation
expect(component.state.count).toBe(5)

// Don't use snapshots
expect(tree).toMatchSnapshot()

// Don't mock core components in integration tests
vi.mock('@spektra/core')
```

## Common Patterns

### Async Interactions

```typescript
it('handles async operations', async () => {
  const user = userEvent.setup();
  render(<AsyncButton />);
  
  await user.click(screen.getByRole('button'));
  
  // Wait for async change
  expect(await screen.findByText(/loaded/i)).toBeInTheDocument();
});
```

### Form Testing

```typescript
it('submits form with valid data', async () => {
  const handleSubmit = vi.fn();
  const user = userEvent.setup();
  
  render(<ContactForm onSubmit={handleSubmit} />);
  
  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.click(screen.getByRole('button', { name: /submit/i }));
  
  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'test@example.com'
  });
});
```

### Props Variations

```typescript
it.each([
  ['primary', 'bg-primary-600'],
  ['secondary', 'bg-secondary-600'],
  ['danger', 'bg-red-600'],
])('renders %s variant', (variant, expectedClass) => {
  const { container } = render(<Button variant={variant}>Text</Button>);
  // Assert behavior, not class names!
});
```

## Troubleshooting

### Common Issues

**1. "document is not defined"**

Missing jsdom environment:
```typescript
// vitest.config.ts
test: {
  environment: 'jsdom',
}
```

**2. "Cannot read properties of undefined"**

Mock data structure doesn't match component expectations. Check the interface.

**3. "Test timeout"**

Async operation didn't complete:
```typescript
// Use findBy* query instead of waitFor
await screen.findByText(/loaded/i);
```

### Debug Tips

```typescript
// Print rendered DOM
screen.debug();

// Print specific element
screen.debug(screen.getByRole('button'));

// Show all available queries
screen.logTestingPlaygroundURL();
```

## Metrics and Reports

### Current Coverage

```bash
pnpm test -- --coverage
```

**Current state:**
- Test Files: 2 passed
- Tests: 6 passed (4 unit + 2 integration)
- Packages: core, themes

### Future Goals

- [ ] Test data-utils package
- [ ] Additional core UI components (Card, Input, Textarea)
- [ ] Additional theme integration tests (ecommerce)
- [ ] Hook testing
- [ ] Utility function testing

## Maintenance

### When to Update Tests?

1. **API change**: When public interface changes
2. **New feature**: Every new public feature gets a test
3. **Bug fix**: Reproducing test first, then fix
4. **Refactor**: Tests remain unchanged (sign of good API design)

### Test Review Checklist

- [ ] Test is in correct `test/` folder
- [ ] Only tests public API
- [ ] No snapshot, CSS, or implementation testing
- [ ] Follows AAA (Arrange-Act-Assert) structure
- [ ] Uses semantic queries (getByRole, getByLabelText)
- [ ] Async operations handled correctly
- [ ] Meaningful test names and descriptions

## Summary

The Spektra testing strategy:

1. **Minimal but effective**: Protect only critical APIs
2. **Clean separation**: `test/` vs `src/` folder structure
3. **Scalable**: New packages easily testable
4. **CI-ready**: Automatic execution on every push
5. **Maintainable**: Implementation-independent tests

---

**Related Documentation:**
- [CI Pipeline](../workflows/ci-pipeline.md)
- [Validation Pipeline](./validation-pipeline.md)
- [Guardrails](./guardrails.md)
