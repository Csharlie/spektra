# Tesztelési Stratégia

## Áttekintés

A Spektra monorepo minimális, de betartatható tesztelési baseline-t alkalmaz a publikus API-k védelmére. A tesztelési infrastruktúra professzionális, skálázható, és tisztán elkülöníti a production kódot a tesztektől.

## Alapelvek

### Tesztelési Filozófia

- ✅ **API-központú tesztelés**: A tesztek a publikus API-t védik, nem az implementációs részleteket
- ✅ **Tiszta struktúra**: Tesztek elkülönítve a `test/` mappákban
- ✅ **Production tisztaság**: `src/` mappák csak production kódot tartalmaznak
- ❌ **Projektek tesztmentesek**: `projects/*` mappák nem tartalmaznak teszteket
- ❌ **Nincs snapshot testing**: Elkerüljük a törékeny snapshot teszteket
- ❌ **Nincs CSS tesztelés**: Nem teszteljük a Tailwind class-okat vagy stílusokat

### Architektúra Döntés

```
engine/
├── vitest.config.ts         # Root konfiguráció
├── vitest.setup.ts          # Globális setup
└── packages/
    ├── core/
    │   ├── src/              # Production kód
    │   ├── test/             # Unit tesztek
    │   │   └── Button.test.tsx
    │   ├── vitest.config.ts  # Package-specifikus config
    │   └── package.json      # "test": "vitest run"
    └── themes/
        ├── corporate/        # Production kód
        ├── test/             # Integration tesztek
        │   └── CorporateTheme.test.tsx
        ├── vitest.config.ts
        └── package.json      # "test": "vitest run"
```

## Technológiai Stack

### Fő Függőségek

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

### Miért Vitest?

- **Vite integráció**: Natív támogatás a Vite build rendszerhez
- **Gyorsaság**: ESM-first, modern és gyors
- **TypeScript támogatás**: Out-of-the-box TypeScript support
- **Jest kompatibilis API**: Könnyű migráció Jest-ről

## Konfiguráció

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

**Kulcs elemek:**
- `globals: true` - `describe`, `it`, `expect` globálisan elérhető
- `environment: 'jsdom'` - Browser-szerű környezet React komponensekhez
- `include` - Csak `packages/**/test/**` tesztek
- `exclude` - Explicit `projects/**` kizárása

### Setup File

```typescript
// engine/vitest.setup.ts
import '@testing-library/jest-dom/vitest';
```

Ez hozzáadja a `jest-dom` matcher-eket (`toBeInTheDocument`, `toBeDisabled`, stb.).

### Package-szintű Config

Minden tesztelt package saját `vitest.config.ts`-t kap:

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

## Teszt Típusok

### Unit Tesztek (packages/core)

**Célja**: Egyedi UI komponensek funkcionalitásának validálása

**Példa: Button komponens**

```typescript
// packages/core/test/Button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../components/primitives/Button';

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

**Mit tesztelünk:**
- ✅ Komponens renderelődik
- ✅ Eseménykezelők működnek (onClick, onChange, stb.)
- ✅ Props hatása (disabled, isLoading, stb.)
- ✅ Látható tartalom helyesen jelenik meg

**Mit NEM tesztelünk:**
- ❌ CSS osztályok
- ❌ Tailwind utility class-ok
- ❌ DOM struktúra részletei
- ❌ Stílus kalkulációk

### Integration Tesztek (packages/themes)

**Célja**: Theme-ek és template-ek közötti integráció validálása

**Példa: Corporate Theme + Landing Template**

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

**Mit tesztelünk:**
- ✅ Template komponensek helyes összeállítása
- ✅ Core UI komponensek megjelenése a template-ben
- ✅ Theme objektum struktúrája
- ✅ Konfiguráció validáció

**Mit NEM tesztelünk:**
- ❌ Core UI komponensek mock-olása (valódi komponenseket használunk)
- ❌ Visual regression
- ❌ Browser-specifikus renderelés

## Futtatás

### Lokális Futtatás

```bash
# Root workspace
cd engine

# Összes teszt futtatása
pnpm test

# Specifikus package tesztelése
cd packages/core
pnpm test

# Watch mode (fejlesztés során)
pnpm test -- --watch

# Coverage report
pnpm test -- --coverage
```

### CI/CD Integráció

A tesztek automatikusan futnak minden push és pull request esetén:

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

Turbo cache-eli a teszt eredményeket:

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

## Új Tesztek Írása

### Szabályok

1. **Hely**: `packages/<package-name>/test/<ComponentName>.test.tsx`
2. **Elnevezés**: `<ComponentName>.test.tsx` vagy `<FeatureName>.test.tsx`
3. **Importok**:
   ```typescript
   import { describe, it, expect, vi } from 'vitest';
   import { render, screen } from '@testing-library/react';
   import userEvent from '@testing-library/user-event';
   ```
4. **Struktúra**:
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
// Használj szerepkör-alapú query-ket
screen.getByRole('button', { name: /submit/i })

// Tesztelj felhasználói interakciókat
const user = userEvent.setup();
await user.click(button);

// Assert látható változásokat
expect(screen.getByText(/success/i)).toBeInTheDocument();

// Mock csak külső függőségeket
const mockCallback = vi.fn();
```

#### ❌ DON'T

```typescript
// Ne használj CSS selector-okat
container.querySelector('.btn-primary')

// Ne teszteld az implementációt
expect(component.state.count).toBe(5)

// Ne használj snapshot-okat
expect(tree).toMatchSnapshot()

// Ne mock-old a core komponenseket integration tesztekben
vi.mock('@spektra/core')
```

## Gyakori Minták

### Aszinkron Interakciók

```typescript
it('handles async operations', async () => {
  const user = userEvent.setup();
  render(<AsyncButton />);
  
  await user.click(screen.getByRole('button'));
  
  // Várj aszinkron változásra
  expect(await screen.findByText(/loaded/i)).toBeInTheDocument();
});
```

### Form Tesztelés

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

### Props Variációk

```typescript
it.each([
  ['primary', 'bg-primary-600'],
  ['secondary', 'bg-secondary-600'],
  ['danger', 'bg-red-600'],
])('renders %s variant', (variant, expectedClass) => {
  const { container } = render(<Button variant={variant}>Text</Button>);
  // Assert viselkedés, nem class nevek!
});
```

## Hibakeresés

### Gyakori Problémák

**1. "document is not defined"**

Hiányzik a jsdom environment:
```typescript
// vitest.config.ts
test: {
  environment: 'jsdom',
}
```

**2. "Cannot read properties of undefined"**

Mock adat struktúra nem egyezik a komponens elvárásaival. Ellenőrizd az interface-t.

**3. "Test timeout"**

Aszinkron művelet nem fejeződött be:
```typescript
// Használj findBy* query-t waitFor helyett
await screen.findByText(/loaded/i);
```

### Debug Tippek

```typescript
// Renderelt DOM kiírása
screen.debug();

// Specifikus elem kiírása
screen.debug(screen.getByRole('button'));

// Összes elérhető query megjelenítése
screen.logTestingPlaygroundURL();
```

## Metrikák és Jelentések

### Aktuális Lefedettség

```bash
pnpm test -- --coverage
```

**Jelenlegi állapot:**
- Test Files: 2 passed
- Tests: 6 passed (4 unit + 2 integration)
- Packages: core, themes

### Jövőbeli Célok

- [ ] data-utils package tesztelése
- [ ] További core UI komponensek (Card, Input, Textarea)
- [ ] További theme integration tesztek (ecommerce)
- [ ] Hook-ok tesztelése
- [ ] Utility függvények tesztelése

## Karbantartás

### Mikor frissítsük a teszteket?

1. **API változás**: Ha a publikus interface változik
2. **Új funkció**: Minden új publikus funkció tesztet kap
3. **Bug fix**: Reprodukáló teszt először, majd fix
4. **Refactor**: Tesztek változatlanok maradnak (jó API design jele)

### Teszt Review Checklist

- [ ] Teszt a helyes `test/` mappában van
- [ ] Csak publikus API-t tesztel
- [ ] Nincs snapshot, CSS, vagy implementáció tesztelés
- [ ] Követi az AAA (Arrange-Act-Assert) struktúrát
- [ ] Használ szemantikus query-ket (getByRole, getByLabelText)
- [ ] Async műveletek helyesen kezelve
- [ ] Értelmes teszt nevek és leírások

## Összefoglalás

A Spektra tesztelési stratégia:

1. **Minimális de hatékony**: Csak a kritikus API-kat védjük
2. **Tiszta szeparáció**: `test/` vs `src/` mappa struktúra
3. **Skálázható**: Új package-ek könnyen tesztelhetők
4. **CI-ready**: Automatikus futtatás minden push-nál
5. **Karbantartható**: Implementáció független tesztek

---

**Kapcsolódó Dokumentáció:**
- [CI Pipeline](../workflows/ci-pipeline_hu.md)
- [Validation Pipeline](./validation-pipeline_hu.md)
- [Guardrails](./guardrails_hu.md)
