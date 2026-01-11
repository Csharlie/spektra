# Storybook Dokumentáció

## 1. Bevezetés

### Mi az a Storybook?

A Storybook egy nyílt forráskódú eszköz UI komponensek izolált fejlesztéséhez és dokumentálásához. Lehetővé teszi, hogy komponenseket függetlenül fejlessz és tesztelj, anélkül, hogy a teljes alkalmazást el kellene indítani.

### Miért használjuk a Spektra Engine-ben?

- **Komponens-katalógus**: Egyetlen helyen láthatók és tesztelhetők az összes UI komponens
- **Vizuális dokumentáció**: Interaktív példák minden komponenshez
- **Izolált fejlesztés**: Komponenseket a teljes alkalmazás kontextusán kívül fejleszthetünk
- **Design rendszer**: A design system központi referencia pontja
- **Tesztelés**: Vizuális és interakciós tesztek alapja
- **Együttműködés**: Közös felület fejlesztők és designerek között

### Projekt felépítés

```
engine/
├── .storybook/              # Storybook konfiguráció
│   ├── main.ts              # Fő konfiguráció
│   ├── preview.ts           # Preview beállítások
│   ├── preview-final.css    # Globális stílusok
│   ├── tailwind.config.js   # Tailwind konfiguráció
│   └── postcss.config.js    # PostCSS beállítások
├── packages/
│   ├── core/
│   │   └── stories/         # Core komponens story-k
│   │       └── Button.stories.tsx
│   └── themes/
│       └── stories/         # Téma komponens story-k
│           └── Hero.stories.tsx
└── package.json             # Storybook függőségek
```

## 2. Működés

### Architektúra

A Storybook a következő fő elemekből áll:

1. **Main konfiguráció** (`.storybook/main.ts`): Story fájlok helye, addon-ok, framework beállítások
2. **Preview konfiguráció** (`.storybook/preview.ts`): Globális dekorátorok és paraméterek
3. **Story fájlok**: Komponensek különböző állapotai és variánsai
4. **Addon-ok**: Kiegészítő funkciók (kontrollok, dokumentáció, stb.)

### Konfiguráció áttekintése

#### Main konfiguráció (`.storybook/main.ts`)

```typescript
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const config: StorybookConfig = {
  // Story fájlok helye (glob minták)
  stories: [
    '../packages/core/stories/**/*.stories.@(ts|tsx)',
    '../packages/themes/stories/**/*.stories.@(ts|tsx)',
  ],
  
  // Addon-ok (bővítmények)
  addons: [
    '@storybook/addon-essentials',    // Alapvető funkciók
    '@storybook/addon-interactions',  // Interakció tesztelés
    '@storybook/addon-docs',          // Dokumentáció generálás
  ],
  
  // Framework (React + Vite)
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  
  // Dokumentáció engedélyezése
  docs: {},
  
  // Vite konfiguráció testreszabása
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

**Kulcs elemek:**
- **stories**: Glob minták a story fájlok megtalálásához
- **addons**: Telepített bővítmények listája
- **framework**: React + Vite használata
- **viteFinal**: Tailwind CSS és alias beállítások

#### Preview konfiguráció (`.storybook/preview.ts`)

```typescript
import type { Preview } from '@storybook/react';
import './preview-final.css';  // Globális stílusok importálása

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,  // Szín kontrollok
        date: /Date$/i,                 // Dátum kontrollok
      },
    },
    docs: {
      toc: true,  // Tartalomjegyzék engedélyezése
    },
  },
};

export default preview;
```

### Addon-ok és kiegészítők

#### Telepített addon-ok:

1. **@storybook/addon-essentials** - Alapvető funkciók:
   - Controls: Prop-ok dinamikus módosítása
   - Actions: Esemény logolás
   - Viewport: Responsive nézetek
   - Backgrounds: Háttérszín váltás
   - Toolbars: Egyéni toolbar elemek

2. **@storybook/addon-interactions** - Interakció tesztelés:
   - Felhasználói interakciók szimulálása
   - Play függvények használata
   - Automatizált tesztelés

3. **@storybook/addon-docs** - Dokumentáció generálás:
   - Automatikus prop táblák
   - JSDoc kommentek megjelenítése
   - Markdown támogatás
   - Code snippetek

### Tailwind CSS integráció

A Storybook saját Tailwind konfigurációval rendelkezik (`.storybook/tailwind.config.js`), amely:
- Tartalmazza a core és themes package fájljait
- Szinkronban van a projekt fő Tailwind beállításaival
- Biztosítja a design tokenek elérhetőségét

## 3. Indítás és használat

### Fejlesztői mód indítása

```bash
# A workspace root-ból (spektra/)
cd engine
pnpm storybook
```

Ez elindítja a Storybook fejlesztői szervert a `http://localhost:6006` címen.

**Funkciók fejlesztői módban:**
- ✅ Hot reload (automatikus frissítés fájlváltozáskor)
- ✅ Élő előnézet
- ✅ Interaktív kontrollok
- ✅ Teljes addon funkciók

### Build készítése

Statikus HTML/JS build készítése telepítéshez:

```bash
cd engine
pnpm build-storybook
```

Ez létrehoz egy `storybook-static/` mappát, amely hosztolható.

### Böngésző használat

A Storybook felület részei:

```
┌─────────────────────────────────────────────────────┐
│ [🏠] [📖 Docs] [🎨 Addons]                Toolbar  │
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│ 📁 Core  │        Canvas / Docs                     │
│   └─ UI  │                                          │
│     └─🔘 │       [Komponens előnézet]              │
│          │                                          │
│ 📁 Themes│                                          │
│          │                                          │
│          │                                          │
├──────────┴──────────────────────────────────────────┤
│ Controls | Actions | Interactions | Accessibility  │
└─────────────────────────────────────────────────────┘
```

**Elemek:**
1. **Sidebar** (bal): Story-k hierarchikus listája
2. **Canvas**: Komponens élő előnézete
3. **Docs tab**: Generált dokumentáció
4. **Addons panel** (lent): Kontrollok, akciók, stb.
5. **Toolbar** (fent): Viewport, háttér, téma váltás

### Navigáció

- **Story váltás**: Kattints a sidebar-ban
- **Canvas ↔ Docs**: Tabok a fenti panelen
- **Controls módosítása**: Addons panel → Controls tab
- **Teljes képernyő**: F gomb vagy toolbar ikon
- **Zoom**: Ctrl/Cmd + +/- vagy toolbar

## 4. Új komponens story létrehozása

### Hol helyezzük el a story fájlokat?

**Core komponensek** (button, input, card, stb.):
```
engine/packages/core/stories/ComponentName.stories.tsx
```

**Téma komponensek** (hero, footer, navbar, stb.):
```
engine/packages/themes/stories/ComponentName.stories.tsx
```

### Story fájl alapszerkezet

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../components/path/to/ComponentName';

/**
 * JSDoc komment a komponensről.
 * 
 * ## When to use
 * - Használati esetek
 * 
 * ## When NOT to use
 * - Amikor ne használd
 */
const meta = {
  title: 'Category/Subcategory/ComponentName',  // Sidebar hierarchia
  component: ComponentName,
  parameters: {
    layout: 'centered',  // vagy 'fullscreen', 'padded'
    docs: {
      description: {
        component: 'Rövid leírás a komponensről.',
      },
    },
  },
  tags: ['autodocs'],  // Automatikus dokumentáció generálás
  argTypes: {
    propName: {
      control: 'select',  // vagy 'text', 'boolean', 'number'
      options: ['option1', 'option2'],
      description: 'Prop leírása',
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Alapértelmezett story
 */
export const Default: Story = {
  args: {
    propName: 'value',
  },
};

/**
 * Variáns story
 */
export const Variant: Story = {
  args: {
    propName: 'different value',
  },
};
```

### Meta konfiguráció részletesen

#### Title (hierarchia)

```typescript
title: 'Core/UI/Button'
// Eredmény:
// 📁 Core
//   └─ 📁 UI
//      └─ 🔘 Button
```

**Konvenciók:**
- `Core/UI/*` - Alap UI komponensek
- `Core/Form/*` - Űrlap komponensek
- `Core/Layout/*` - Layout komponensek
- `Themes/Sections/*` - Téma szekciók
- `Themes/Layouts/*` - Teljes oldalak

#### Parameters

```typescript
parameters: {
  layout: 'centered',      // Komponens elhelyezése
  // 'centered' - középre igazítva
  // 'fullscreen' - teljes szélesség
  // 'padded' - paddingel körülvéve
  
  docs: {
    description: {
      component: 'Komponens leírása...',
    },
  },
  
  backgrounds: {
    default: 'dark',       // Alapértelmezett háttér
    values: [
      { name: 'dark', value: '#333' },
      { name: 'light', value: '#fff' },
    ],
  },
}
```

#### Tags

```typescript
tags: ['autodocs']  // Automatikus dokumentáció lap
```

#### ArgTypes (kontrollok)

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
    control: 'radio',           // Radio gombok
    options: ['sm', 'md', 'lg'],
  },
  
  label: {
    control: 'text',            // Szöveg input
  },
  
  isActive: {
    control: 'boolean',         // Checkbox
  },
  
  count: {
    control: { 
      type: 'number',           // Szám input
      min: 0, 
      max: 100, 
      step: 5 
    },
  },
  
  color: {
    control: 'color',           // Színválasztó
  },
  
  startDate: {
    control: 'date',            // Dátumválasztó
  },
  
  onClick: {
    action: 'clicked',          // Akció log
  },
}
```

### Story-k létrehozása

#### Egyszerű story

```typescript
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Click me',
  },
};
```

#### Story render funkcióval

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

#### Story play funkcióval (interakció)

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

### Példák

#### Button komponens (Core)

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

#### Hero komponens (Themes)

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

## 5. Komponens dokumentálás

### JSDoc kommentek

A komponens TypeScript definíciójában használj JSDoc kommenteket:

```typescript
/**
 * Button komponens különböző akciók kiváltására.
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
   * A gomb megjelenési variánsa
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  
  /**
   * A gomb mérete
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Betöltési állapot megjelenítése
   */
  isLoading?: boolean;
  
  /**
   * Gomb gyerek elemei (szöveg vagy ikonok)
   */
  children: React.ReactNode;
  
  /**
   * Kattintás esemény kezelő
   */
  onClick?: () => void;
}
```

### Autodocs funkció

A `tags: ['autodocs']` automatikusan generál egy dokumentációs oldalt:

- **Prop táblázat**: Típusok, alapértelmezések, leírások
- **Kód példák**: Minden story forráskódja
- **Interaktív canvas**: Tesztelhető komponens
- **JSDoc tartalom**: Komponens és prop leírások

### Story leírások

Minden story-hoz adj leírást JSDoc kommentekkel:

```typescript
/**
 * Alapértelmezett gomb primary variánssal.
 * Használd ezt a legfontosabb akciókhoz (Submit, Save, Continue).
 */
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

/**
 * Betöltési állapot spinner ikonnal.
 * A gomb automatikusan letiltott állapotba kerül betöltés közben.
 */
export const Loading: Story = {
  args: {
    children: 'Loading...',
    isLoading: true,
  },
};
```

### Használati útmutatók

Adj kontextuális információt a meta JSDoc kommentben:

```typescript
/**
 * Button komponens akciók kiváltására és navigációhoz.
 * 
 * ## When to use
 * - Űrlap elküldése (submit, save)
 * - Lépések vagy oldalak közötti navigáció
 * - Modal-ok, dialog-ok vagy más UI változások kiváltása
 * 
 * ## When NOT to use
 * - Oldalak közötti navigációhoz (használj Link-et)
 * - Nem interaktív címkékhez (használj szöveg elemeket)
 * - Interaktív elemeken belül, mint más gombok
 * 
 * ## Accessibility
 * - Használj értelmes szöveget, kerüld a "Kattints ide"-t
 * - Loading állapotban aria-busy="true"
 * - Disabled állapotban aria-disabled="true"
 * 
 * ## Best practices
 * - Primary variánst csak 1-2 gombra használd egy nézetben
 * - Destructive műveletekhez használj danger variánst
 * - Loading állapot alatt tiltsd le a gombot
 */
```

### Markdown dokumentáció

Készíthetsz külön MDX fájlokat is:

```mdx
{/* Button.docs.mdx */}
import { Meta, Canvas, Story } from '@storybook/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

# Button Komponens

A Button komponens az alapvető interakciós elem az alkalmazásban.

## Variánsok

<Canvas of={ButtonStories.Primary} />
<Canvas of={ButtonStories.Secondary} />
<Canvas of={ButtonStories.Outline} />

## Használati példák

### Űrlap submit
```tsx
<form onSubmit={handleSubmit}>
  <Button type="submit" variant="primary">
    Mentés
  </Button>
</form>
```
```

## 6. Best Practices

### Story elnevezés

```typescript
// ✅ Jó - Descriptive és érthető
export const Primary: Story = { ... }
export const WithIcon: Story = { ... }
export const LoadingState: Story = { ... }

// ❌ Rossz - Nem informatív
export const Story1: Story = { ... }
export const Test: Story = { ... }
```

### Args szervezés

```typescript
// ✅ Jó - Logikus alapértelmezések
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Button',
  },
};

// Változatok csak a különbségeket írják felül
export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};
```

### Komponens izolálás

```typescript
// ✅ Jó - Minden adat mockolt
export const WithData: Story = {
  args: {
    user: {
      name: 'John Doe',
      email: 'john@example.com',
    },
  },
};

// ❌ Rossz - Külső függőség (API, store)
export const WithRealData: Story = {
  render: () => <UserProfile userId={fetchFromAPI()} />
};
```

### Responsive tesztelés

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

### Port foglaltság (6006)

**Probléma**: `Error: Port 6006 is already in use`

**Megoldás 1** - Folyamat leállítása PowerShell-ben:
```powershell
Get-NetTCPConnection -LocalPort 6006 -ErrorAction SilentlyContinue | 
  ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

**Megoldás 2** - Másik port használata:
```bash
pnpm storybook -- --port 6007
```

### Build hibák

**Probléma**: TypeScript hibák a build során

**Megoldás**:
```bash
# Type check
cd engine
pnpm run build

# Ha szükséges, frissítsd a függőségeket
pnpm install
```

### CSS/Tailwind problémák

**Probléma**: Tailwind osztályok nem működnek

**Ellenőrizd**:
1. `.storybook/tailwind.config.js` tartalmazza-e a megfelelő content útvonalakat
2. `preview-final.css` importálva van-e a `preview.ts`-ben
3. PostCSS konfigurációban szerepel-e a Tailwind plugin

**Megoldás**:
```javascript
// .storybook/tailwind.config.js
module.exports = {
  content: [
    '../packages/core/**/*.{ts,tsx}',
    '../packages/themes/**/*.{ts,tsx}',
    './**/*.{ts,tsx}',
  ],
  // ... további konfiguráció
};
```

### Story nem jelenik meg

**Probléma**: Új story nem látható a Storybook-ban

**Ellenőrizd**:
1. Fájl neve: `*.stories.tsx` vagy `*.stories.ts`
2. Helyes helyen van-e a `stories/` mappában
3. Exportálod-e a meta objektumot: `export default meta`
4. Van-e legalább egy exportált story

**Megoldás** - Indítsd újra a Storybook-ot:
```bash
# Ctrl+C a terminálban, majd:
pnpm storybook
```

### Alias problémák

**Probléma**: `Cannot find module '@spektra/core'`

**Megoldás** - Ellenőrizd a `.storybook/main.ts` alias beállításait:
```typescript
resolve: {
  alias: {
    '@spektra/core': path.resolve(__dirname, '../packages/core'),
    '@spektra/themes': path.resolve(__dirname, '../packages/themes'),
  },
}
```

### Lassú build

**Probléma**: Storybook lassan tölt be

**Optimalizálás**:
1. Korlátozd a story fájlok számát a `main.ts`-ben
2. Használj lazy loading-ot nagyméretű komponenseknél
3. Csökkentsd az addon-ok számát, ha nem használod őket

## 8. Hasznos parancsok

```bash
# Fejlesztői mód (hot reload)
pnpm storybook

# Statikus build
pnpm build-storybook

# Build előnézet lokálisan
npx http-server storybook-static

# Storybook cache törlése
rm -rf node_modules/.cache/storybook

# Frissítés a legújabb verzióra
pnpm add -Dw storybook@latest @storybook/react@latest @storybook/react-vite@latest
```

## 9. További források

- [Storybook hivatalos dokumentáció](https://storybook.js.org/docs)
- [Storybook + Vite](https://storybook.js.org/docs/react/builders/vite)
- [Storybook + TypeScript](https://storybook.js.org/docs/react/configure/typescript)
- [Story írás guide](https://storybook.js.org/docs/react/writing-stories/introduction)
- [Addon dokumentáció](https://storybook.js.org/docs/react/essentials/introduction)

## 10. Összefoglalás

A Storybook a Spektra Engine központi dokumentációs és fejlesztési eszköze. Használd:

✅ Minden új UI komponenshez készíts story-kat  
✅ Dokumentáld a használati eseteket JSDoc kommentekkel  
✅ Teszteld a különböző állapotokat és variánsokat  
✅ Tartsd karban a story-kat a komponensekkel együtt  
✅ Használd reference-ként design döntésekhez  

A jól karbantartott Storybook alapja a konzisztens és minőségi UI fejlesztésnek! 🎨
