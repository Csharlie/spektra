# Contributing to Spektra

Ez a dokumentáció részletesen leírja, hogyan kell új core komponenseket fejleszteni és integrálni a Spektra rendszerbe, miközben fenntartjuk a privát projektek elkülönítését.

## Tartalomjegyzék

1. [Repository struktúra](#repository-struktúra)
2. [Fejlesztési workflow](#fejlesztési-workflow)
3. [Új core komponens létrehozása](#új-core-komponens-létrehozása)
4. [Git workflow és repo szinkronizáció](#git-workflow-és-repo-szinkronizáció)
5. [Best practices](#best-practices)
6. [Példa: Gallery komponens integrációja](#példa-gallery-komponens-integrációja)

---

## Repository struktúra

### 1. **spektra** (Public Upstream Repository)
- **URL:** `https://github.com/Csharlie/spektra`
- **Cél:** Nyílt forráskódú, közösségi projekt - **UPSTREAM**
- **Tartalom:**
  - `packages/core` - Alapvető, újrafelhasználható komponensek
  - `packages/data` - Adatkezelési utilities
  - `packages/themes` - Téma rendszer
  - `packages/config` - Konfigurációs fájlok
  - `apps/client-a` - Demo alkalmazás (public)
- **NEM tartalmazza:** Privát klienseket és projekteket

### 2. **spektra-private** (Private Fork)
- **URL:** `https://github.com/Csharlie/spektra-private`
- **Cél:** Privát fejlesztési környezet - **FORK az upstream-ből**
- **Tartalom:**
  - Ugyanazok a `packages/` mint az upstream (szinkronizálva)
  - `apps/bellator-gym` - Privát ügyfél projekt
  - `apps/client-a` - Szinkronban az upstream verzióval
  - Egyéb privát projektek
- **Működés:** 
  - Fejlesztés itt történik
  - Upstream változások lehúzhatók: `git pull upstream main`
  - Core változások szelektíven push-olhatók upstream-be

### 3. **spektra-bellator-gym** (Dedikált Client Repository)
- **URL:** `https://github.com/Csharlie/spektra-bellator-gym`
- **Cél:** Egyedi kliens projekt önálló repo-ban
- **Tartalom:** Csak a Bellator Gym projekt fájljai

---

## Fejlesztési workflow

### Alapelv: Fork & Sync

```
┌─────────────────────────────────────────────────────────────┐
│  spektra (upstream)          spektra-private (fork)         │
│  ────────────────            ───────────────────            │
│       │                             │                        │
│       │  git pull upstream main     │                        │
│       │ <──────────────────────────┐│                        │
│       │                             ││                        │
│       │                      [Fejlesztés]                    │
│       │                             ││                        │
│       │  git push upstream main     ││                        │
│       │ ────────────────────────────>│                        │
│       │  (csak packages/core)        │                        │
│       │                              │                        │
│   [Public]                    [Private clients]              │
└─────────────────────────────────────────────────────────────┘
```

### Miért ez a workflow?

- **Biztonság:** Privát kliensek nem kerülnek nyilvános repo-ba
- **Tesztelés:** Privát projektben teszteljük az új komponenseket
- **Reusability:** Core komponensek mindenki számára elérhetők
- **Szinkronizáció:** Upstream változások könnyen lehúzhatók
- **Verziókezelés:** Egyértelmű, mi privát és mi public

---

## Új core komponens létrehozása

### 1. lépés: Komponens fejlesztése privát projektben

Ha van egy **privát kliens** (pl. `bellator-gym`), amely tartalmaz egy új funkciót, amit később core komponensnek szeretnénk:

#### Példa: Gallery komponens a Bellator-ban

```
spektra-private/
└── apps/bellator-gym/
    └── components/sections/
        └── Gallery.tsx  ← Kliens-specifikus implementáció
```

**A komponens jellemzői:**
- Tartalmaz kliens-specifikus stílusokat (pl. `gym-yellow` szín)
- Bellator brand elemeket használ
- Működik, tesztelt a kliens projektben

### 2. lépés: Generic verzió készítése a core-ba

#### A) Navigálj a spektra-private packages/core mappájába

```powershell
cd d:\localhost\spektra-private\packages\core
```

#### B) Hozd létre az új komponenst

```powershell
# Új fájl létrehozása
New-Item -ItemType File -Path "components\sections\Gallery.tsx"
```

#### C) Implementáld a generic verziót

**Mire figyelj:**
1. **Távolítsd el a kliens-specifikus dolgokat:**
   - Brand színek (pl. `gym-yellow` → `primary-600`)
   - Kliens-specifikus komponensek (pl. `SectionHeading`)
   - Hardcoded szövegek

2. **Tedd customizálhatóvá:**
   - Props-okkal add át a színeket
   - Rugalmas layout opciók
   - Optional fields

3. **Használj core utilities-t:**
   - `cn()` helper a tailwind class-okhoz
   - Lucide ikonok
   - Base design system

**Példa: Generic Gallery komponens**

```tsx
// packages/core/components/sections/Gallery.tsx
import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';

export interface GalleryImage {
  src: string;
  alt: string;
  category?: string;
}

export interface GalleryProps {
  subtitle?: string;
  title: string;
  description?: string;
  images: GalleryImage[];
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: string;
  showCategories?: boolean;
  className?: string;
  imageClassName?: string;
  filterButtonClassName?: string;
  activeFilterClassName?: string;
}

export const Gallery: React.FC<GalleryProps> = ({
  subtitle,
  title,
  description,
  images,
  columns = { mobile: 2, tablet: 3, desktop: 4 },
  gap = 'gap-4',
  showCategories = true,
  className,
  imageClassName,
  filterButtonClassName,
  activeFilterClassName,
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(images.map(img => img.category).filter(Boolean)))] as string[];
  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <section className={cn('py-20 md:py-32 bg-white', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          {subtitle && (
            <p className="text-sm font-semibold tracking-wider uppercase text-primary-600 mb-2">
              {subtitle}
            </p>
          )}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
        
        {/* Category Filters */}
        {showCategories && categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category || 'all')}
                className={cn(
                  'px-6 py-2 font-semibold uppercase tracking-wider text-sm transition-all rounded-md',
                  filter === category
                    ? activeFilterClassName || 'bg-primary-600 text-white'
                    : filterButtonClassName || 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        )}
        
        {/* Image Grid */}
        <div className={cn('grid', `grid-cols-${columns.mobile} md:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`, gap)}>
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className={cn(
                'relative aspect-square overflow-hidden cursor-pointer group rounded-lg',
                imageClassName
              )}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-primary-400 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};
```

### 3. lépés: Exportok frissítése

#### A) Sections index.ts

```powershell
# Szerkeszd a fájlt
code packages\core\components\sections\index.ts
```

```typescript
// packages/core/components/sections/index.ts
export * from './Hero';
export * from './Features';
export * from './About';
export * from './Contact';
export * from './Navigation';
export * from './Footer';
export * from './Gallery';  // ← ÚJ
```

#### B) Core index.ts már automatikusan exportálja

A `packages/core/index.ts` már tartalmazza:

```typescript
export * from './components/sections';
```

### 4. lépés: Build a core csomag

```powershell
cd d:\localhost\spektra-private\packages\core
pnpm build
```

**Várható kimenet:**
```
> @spektra/core@1.0.0 build
> tsc && vite build

vite v5.4.21 building for production...
✓ 1262 modules transformed.
dist/index.mjs  111.51 kB │ gzip: 24.45 kB
dist/index.cjs  54.79 kB │ gzip: 18.44 kB
✓ built in 9.32s
```

### 5. lépés: Privát kliens frissítése

Most, hogy a Gallery a core-ban van, frissítsd a privát klienst, hogy onnan használja.

#### A) Wrapper komponens készítése (opcionális)

Ha a kliens szeretné megtartani saját stílusát:

```tsx
// spektra-private/apps/bellator-gym/components/sections/Gallery.tsx
import React from 'react';
import { Gallery as CoreGallery, GalleryProps as CoreGalleryProps } from '@spektra/core';
import { SectionHeading } from '../atoms';

export interface GalleryProps extends Omit<CoreGalleryProps, 'filterButtonClassName' | 'activeFilterClassName' | 'showCategories'> {
}

export const Gallery: React.FC<GalleryProps> = ({
  subtitle,
  title,
  description,
  images,
  className,
}) => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle={subtitle}
          title={title}
          description={description}
          align="center"
          className="mb-12"
        />
        
        <CoreGallery
          images={images}
          title=""
          subtitle=""
          description=""
          filterButtonClassName="bg-gray-200 text-gray-700 hover:bg-gray-300"
          activeFilterClassName="bg-gym-yellow text-black"
          className="py-0"
          showCategories={true}
        />
      </div>
    </section>
  );
};
```

#### B) Vagy közvetlen import

```tsx
// Direkt import a core-ból
import { Gallery } from '@spektra/core';

// Használat a HomePage-en
<Gallery
  title="Galéria"
  subtitle="Edzőtermünk"
  images={[...]}
/>
```

---

## Git workflow és repo szinkronizáció

### Setup: Upstream kapcsolat beállítása

Ha még nem tetted meg, add hozzá a spektra upstream remote-ot a spektra-private-hoz:

```powershell
cd d:\localhost\spektra-private

# Ellenőrizd a remote-okat
git remote -v

# Add hozzá az upstream-et (ha még nincs)
git remote add upstream https://github.com/Csharlie/spektra.git

# Ellenőrizd újra
git remote -v
# origin    https://github.com/Csharlie/spektra-private (fetch)
# origin    https://github.com/Csharlie/spektra-private (push)
# upstream  https://github.com/Csharlie/spektra.git (fetch)
# upstream  https://github.com/Csharlie/spektra.git (push)
```

### 1. Upstream változások lehúzása (spektra → spektra-private)

**Amikor:** Valaki más (vagy te a spektra repo-ban) változtatott a core-on, és szeretnéd lehúzni a spektra-private-ba.

### 3. Core változások push-olása upstream-be (spektra-private → spektra)

**FONTOS:** Csak a `packages/` változásokat push-oljuk, privát kliensek nélkül!

#### Módszer 1: Fájlok manuális másolása (biztonságosabb)

Ez a módszer garantálja, hogy csak a kívánt fájlok kerülnek át.
```

**Konfliktus esetén:**

```powershell
# Nézd meg a konfliktusokat
git status

# Oldd meg manuálisan a konfliktusokat, majd
git add .
git commit -m "Merge upstream changes"
git push origin main
```

**Automatikus merge privát módosításokkal:**

```powershell
# Ha csak a packages/ változott upstream-ben, és nem akarsz konfliktust
git fetch upstream main
git merge upstream/main -X ours  # Privát változások előnyben
# vagy
git merge upstream/main -X theirs  # Upstream változások előnyben
```

### 2. Commit a spektra-private-ban (új fejlesztés)

```powershell
cd d:\localhost\spektra-private

# Ellenőrizd a változásokat
git status

# Add hozzá a változásokat
git add packages/core/components/sections/Gallery.tsx
git add packages/core/components/sections/index.ts
git add apps/bellator-gym/components/sections/Gallery.tsx

# Commit
git commit -m "feat(core): Add Gallery component to core

- Add generic Gallery component with lightbox and category filtering
- Update Bellator to use core Gallery with custom styling wrapper
- Customizable props: columns, gap, filter styles
- Responsive grid layout"

# Push a spektra-private repo-ba
git push origin bellator-create-client-ai
```

### 2. Áthelyezés a spektra (public) repo-ba

**FONTOS:** Csak a `packages/` változásokat másoljuk, privát kliensek nélkül!

#### A) Ellenőrizd az upstream kapcsolatot

```powershell
cd d:\localhost\spektra-private

# Listázd a remote-okat
git remote -v

# Ha nincs upstream, add hozzá
git remote add upstream https://github.com/Csharlie/spektra.git
```

#### B) Másold át a fájlokat

```powershell
# Gallery komponens
Copy-Item -Path "d:\localhost\spektra-private\packages\core\components\sections\Gallery.tsx" -Destination "d:\localhost\spektra\packages\core\components\sections\Gallery.tsx" -Force

# Index export
Copy-Item -Path "d:\localhost\spektra-private\packages\core\components\sections\index.ts" -Destination "d:\localhost\spektra\packages\core\components\sections\index.ts" -Force

# Ha voltak egyéb core változások (pl. TypeScript fixek)
Copy-Item -Path "d:\localhost\spektra-private\packages\core\hooks\useDesignSystem.ts" -Destination "d:\localhost\spektra\packages\core\hooks\useDesignSystem.ts" -Force
Copy-Item -Path "d:\localhost\spektra-private\packages\core\contexts\DesignSystemContext.tsx" -Destination "d:\localhost\spektra\packages\core\contexts\DesignSystemContext.tsx" -Force
```

#### C) Ellenőrizd a változásokat

```powershell
cd d:\localhost\spektra
git status
```

**Várható kimenet:**
```
Changes not staged for commit:
#### Módszer 2: Git selective push (haladó)

Ha biztos vagy benne, hogy csak core változásokat akarsz push-olni:

```powershell
cd d:\localhost\spektra-private

# Cherry-pick specifikus commit-okat upstream-be
#### Build a spektra core-bana commit hash-t

# Push csak specifikus fájlokat
git push upstream HEAD:main --force-with-lease  # VIGYÁZZ: csak core commit-ok esetén!
```

**⚠️ FIGYELEM:** Ez az egész private branch-et push-olná! Csak akkor használd, ha:
- Biztos vagy benne, hogy csak packages/ változott
- Nincs privát kliens módosítás a branch-ben

**Biztonságosabb módszer továbbra is a manuális másolás (Módszer 1).**

#### Ellenőrizd a változásokat/components/sections/index.ts
        modified:   packages/core/contexts/DesignSystemContext.tsx
        modified:   packages/core/hooks/useDesignSystem.ts

Untracked files:
        packages/core/components/sections/Gallery.tsx
```

#### D) Build a spektra core-ban

```powershell
cd d:\localhost\spektra\packages\core
pnpm build
```

**Ha van hiányzó dependency (pl. @types/node):**

```powershell
# Root install
cd d:\localhost\spektra
pnpm install

# Core package-be add hozzá
cd packages\core
pnpm add -D @types/node
```

#### Commit és push a public repo-ba

```powershell
cd d:\localhost\spektra

# Add hozzá csak a core változásokat
git add packages/core/

# Commit
git commit -m "feat(core): Add Gallery component to core

- Add generic Gallery component with lightbox and category filtering
- Customizable props: columns, gap, filter styles
- Responsive grid layout
- Fix TypeScript exports in useDesignSystem hook
- Export DesignSystemContextType interface"

# Push a public repo-ba
git push origin main
```

### 4. Dedikált kliens repo frissítése (opcionális)

Ha van dedikált repo a privát kliensnek:

```powershell
cd d:\localhost\spektra-private\apps\bellator-gym

# Inicializáld a git repo-t (ha még nincs)
git init

# Add hozzá a fájlokat
git add -A

# Commit
git commit -m "feat: Update Gallery to use core component with Bellator styling"

# Remote hozzáadása
git remote add origin https://github.com/Csharlie/spektra-bellator-gym.git

# Push
git push -u origin main
```

**Ha már létezik a repo és van konfliktus:**

```powershell
# Pull a remote változásokat
git pull origin main --allow-unrelated-histories

# Konfliktusok megoldása - használd a mi verzióinkat
git checkout --ours .
git add -A
git commit -m "Merge: Use updated version with core Gallery integration"

# Push
git push origin main
```

---

## Best practices

### 1. Komponens tervezés

✅ **DO:**
- Generic interface-ek props-okkal
- Semleges, customizálható színek
- Optional fields minden specifikus funkcióhoz
- Responsive design alapértelmezetten
- Accessibility (aria-label, keyboard navigation)

❌ **DON'T:**
- Hardcoded brand színek
- Kliens-specifikus komponensek importálása
- Nem customizálható layout
- Külső API-k közvetlen hívása

### 2. Naming conventions

```typescript
// Props interface
export interface GalleryProps { }

// Image type
export interface GalleryImage { }

// Komponens
export const Gallery: React.FC<GalleryProps> = ({ }) => { }
```

### 3. File struktura

```
packages/core/
└── components/
    ├── ui/           # Alapvető UI komponensek (Button, Card, stb.)
    ├── features/     # Komplex feature komponensek
    ├── sections/     # Teljes szekciók (Hero, Gallery, stb.)
    └── layouts/      # Oldal szintű elrendezések
```

### 4. Import sorrend

```typescript
// 1. React
import React, { useState } from 'react';

// 2. External libraries
import { X } from 'lucide-react';

// 3. Internal utilities
import { cn } from '../../utils/cn';

// 4. Types
import type { GalleryImage } from './types';
```

### 5. Git commit üzenetek

Használj [Conventional Commits](https://www.conventionalcommits.org/) formátumot:

```
feat(core): Add Gallery component
fix(core): Fix TypeScript export issue
chore(core): Update dependencies
docs: Add contributing guide
```

**Típusok:**
- `feat`: Új feature
- `fix`: Bug fix
- `chore`: Maintenance (build, dependencies)
- `docs`: Dokumentáció
- `refactor`: Code refactoring
- `test`: Tesztek hozzáadása
- `style`: Code formázás

### 6. Branch stratégia

**spektra-private:**
```
main                    # Stabil verzió
├── feature/gallery     # Új feature fejlesztés
├── fix/typescript      # Bug fix
└── bellator-*          # Kliens-specifikus branch-ek
```

**spektra (public):**
```
main                    # Stabil, production-ready
└── develop             # Development (opcionális)
```

---

## Példa: Gallery komponens integrációja

### Teljes workflow lépésről lépésre

#### 1. Fejlesztés a privát projektben

```powershell
# 1. Navigálj a spektra-private-ba
cd d:\localhost\spektra-private

# 2. Checkout a fejlesztési ágra
git checkout -b feature/gallery-component

# 3. Fejlesztés - Bellator Gallery működik
# apps/bellator-gym/components/sections/Gallery.tsx
```

#### 2. Generic komponens létrehozása

```powershell
# 1. Core Gallery létrehozása
cd packages\core\components\sections
New-Item -ItemType File -Path "Gallery.tsx"

# 2. Implementáld a generic verziót (lásd fent)

# 3. Export hozzáadása
# Szerkeszd: packages/core/components/sections/index.ts
# Add hozzá: export * from './Gallery';
```

#### 3. Build és teszt

```powershell
# 1. Core build
cd d:\localhost\spektra-private\packages\core
pnpm build

# 2. Bellator frissítése
# Módosítsd: apps/bellator-gym/components/sections/Gallery.tsx
# Import változtatás: import { Gallery } from '@spektra/core';

# 3. Bellator dev indítása
cd d:\localhost\spektra-private\apps\bellator-gym
pnpm dev

# 4. Teszt: http://localhost:3001
```

#### 4. Commit spektra-private-ba

```powershell
cd d:\localhost\spektra-private

git add packages/core/components/sections/Gallery.tsx
git add packages/core/components/sections/index.ts
git add apps/bellator-gym/components/sections/Gallery.tsx

git commit -m "feat(core): Add Gallery component to core

- Add generic Gallery component with lightbox and category filtering
- Update Bellator to use core Gallery with custom styling wrapper
- Fix TypeScript exports in useDesignSystem hook
- Export DesignSystemContextType interface"

git push origin feature/gallery-component
```

#### 5. Push spektra (public) repo-ba

```powershell
# 1. Pull latest spektra
cd d:\localhost\spektra
git pull origin main

# 2. Másold át a core fájlokat
Copy-Item -Path "d:\localhost\spektra-private\packages\core\components\sections\Gallery.tsx" -Destination "d:\localhost\spektra\packages\core\components\sections\Gallery.tsx" -Force
Copy-Item -Path "d:\localhost\spektra-private\packages\core\components\sections\index.ts" -Destination "d:\localhost\spektra\packages\core\components\sections\index.ts" -Force

# 3. Dependencies check
cd d:\localhost\spektra\packages\core
pnpm install
pnpm add -D @types/node  # Ha kell

# 4. Build
pnpm build

# 5. Commit és push
cd d:\localhost\spektra
git add packages/core/
git commit -m "feat(core): Add Gallery component to core

- Add generic Gallery component with lightbox and category filtering
- Customizable props: columns, gap, filter styles
- Responsive grid layout"

git push origin main
```

#### 6. Client-A frissítése (public demo)

```powershell
cd d:\localhost\spektra\apps\client-a

# 1. Frissítsd a HomePage-t
# pages/Home/index.tsx
```

```tsx
import { Gallery } from '@spektra/core';

// HomePage-ben:
<div id="gallery">
  <Gallery
    subtitle="Portfolio"
    title="Projekteink"
    description="Nézze meg néhány sikeres projektünket"
    images={[
      { 
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', 
        alt: 'Dashboard design', 
        category: 'Web Design' 
      },
      // ... további képek
    ]}
  />
</div>
```

```powershell
# 2. Navigáció frissítése
# config/navigation.ts - add hozzá: { label: 'Galéria', href: '#gallery' }

# 3. Dev indítása
pnpm dev

# 4. Teszt: http://localhost:3001

# 5. Commit
cd d:\localhost\spektra
git add apps/client-a/
git commit -m "feat(client-a): Add Gallery section to homepage"
git push origin main
```

#### 7. Bellator dedikált repo push (opcionális)

```powershell
cd d:\localhost\spektra-private\apps\bellator-gym

# Ha még nincs git repo
git init
git add -A
git commit -m "Initial commit: Bellator Gym with core Gallery integration"

# Remote hozzáadása
git remote add origin https://github.com/Csharlie/spektra-bellator-gym.git

# Push
git push -u origin main
```

---

## Gyakori problémák és megoldások

### 1. TypeScript build hiba: Cannot find module 'path'

**Probléma:**
```
error TS2307: Cannot find module 'path' or its corresponding type declarations.
```

**Megoldás:**
```powershell
cd packages\core
pnpm add -D @types/node
pnpm build
```

### 2. pnpm store location error

**Probléma:**
```
ERR_PNPM_UNEXPECTED_STORE  Unexpected store location
```

**Megoldás:**
```powershell
cd d:\localhost\spektra
pnpm install
```

### 3. Git merge konfliktus

**Probléma:**
```
CONFLICT (add/add): Merge conflict in components/sections/Gallery.tsx
```

**Megoldás - használd a mi verzióinkat:**
```powershell
git checkout --ours .
git add -A
git commit -m "Merge: Resolve conflicts using local version"
```

### 4. Port already in use

**Probléma:**
```
Port 3000 is in use, trying another one...
```

**Megoldás:** Ez normális, Vite automatikusan választ másik portot (3001).

### 5. Tailwind pattern warning

**Probléma:**
```
warn - Your `content` configuration includes a pattern which looks like it's accidentally matching all of `node_modules`
```

**Megoldás:** Ez csak figyelmeztetés, működik. Ha szeretnéd javítani:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/core/components/**/*.{js,ts,jsx,tsx}', // Specifikusabb
  ],
}
```

---

## Upstream szinkronizáció use-case-ek

### Use Case 1: Kollaborátor push-olt core változást

```powershell
# 1. Fetch upstream
cd d:\localhost\spektra-private
git fetch upstream main

# 2. Nézd meg mi változott
git log HEAD..upstream/main --oneline

# 3. Merge vagy rebase
git merge upstream/main
# vagy
git rebase upstream/main

# 4. Resolve conflicts (ha van)
git status
# Javítsd a konfliktusokat, majd
git add .
git commit -m "Merge upstream changes"

# 5. Push private repo-ba
git push origin main

# 6. Test: Build és privát kliens ellenőrzés
cd packages\core
pnpm build
cd ..\..\apps\bellator-gym
pnpm dev
```

### Use Case 2: Upstream hotfix érkezett

```powershell
# Gyors sync kritikus fix esetén
cd d:\localhost\spektra-private
git fetch upstream main
git merge upstream/main --no-edit
git push origin main
```

### Use Case 3: Periodikus sync (hetente/havonta)

```powershell
## Checklist új komponenshez

### Fejlesztés (spektra-private)
- [ ] Komponens generikus és újrafelhasználható
- [ ] Props interface-ek definiálva
- [ ] TypeScript típusok helyesek
- [ ] Responsive design
- [ ] Accessibility (aria-labels)
- [ ] Core utilities használata (cn, stb.)
- [ ] Export hozzáadva sections/index.ts-hez
- [ ] Core build sikeres
- [ ] Privát kliens tesztelve
- [ ] Commit spektra-private-ba

### Upstream push (spektra)
- [ ] Csak core fájlok másolva spektra-ba
- [ ] Build sikeres spektra-ban
- [ ] Commit és push spektra public-ba
- [ ] Client-A frissítve és tesztelve
- [ ] Dokumentáció frissítve

### Upstream sync (amikor mások módosítottak)
- [ ] `git fetch upstream main` lefutott
- [ ] Változások átnézve
- [ ] Merge/rebase sikeres
- [ ] Konfliktusok megoldva (ha voltak)
- [ ] Build sikeres spektra-private-ban
- [ ] Privát kliensek tesztelve
- [ ] Push spektra-private-ba
# Push
git push origin main
```

---

## Összefoglaló parancsok

### Gyors referencia

```powershell
# ===== UPSTREAM SYNC (spektra → spektra-private) =====
cd d:\localhost\spektra-private
git fetch upstream main
git merge upstream/main
git push origin main

# ===== FEJLESZTÉS spektra-private-ban =====
cd d:\localhost\spektra-private
git checkout -b feature/new-component
# ... fejlesztés ...
cd packages\core
pnpm build
git add packages/core/
git commit -m "feat(core): Add new component"
git push origin feature/new-component

# ===== PUSH spektra PUBLIC repo-ba =====
cd d:\localhost\spektra
git pull origin main
# ... másold át a core fájlokat ...
cd packages\core
pnpm build
cd ..\..
git add packages/core/
git commit -m "feat(core): Add new component"
git push origin main

# ===== CLIENT UPDATE =====
cd apps\client-a
# ... frissítsd a kódot ...
pnpm dev
# Teszt: http://localhost:3001
git add apps/client-a/
git commit -m "feat(client-a): Use new component"
git push origin main

# ===== DEDIKÁLT CLIENT REPO (opcionális) =====
cd d:\localhost\spektra-private\apps\[client-name]
git init
git add -A
git commit -m "Initial commit"
git remote add origin https://github.com/Csharlie/spektra-[client-name].git
git push -u origin main
```

---

## Checklist új komponenshez

- [ ] Komponens generikus és újrafelhasználható
- [ ] Props interface-ek definiálva
- [ ] TypeScript típusok helyesek
- [ ] Responsive design
- [ ] Accessibility (aria-labels)
- [ ] Core utilities használata (cn, stb.)
- [ ] Export hozzáadva sections/index.ts-hez
- [ ] Core build sikeres
- [ ] Privát kliens tesztelve
- [ ] Commit spektra-private-ba
- [ ] Csak core fájlok másolva spektra-ba
- [ ] Build sikeres spektra-ban
- [ ] Commit és push spektra public-ba
- [ ] Client-A frissítve és tesztelve
- [ ] Dokumentáció frissítve

---

## További források

- [Spektra Documentation](./README.md)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Kérdések vagy problémák?** Nyiss egy issue-t a GitHub repo-ban!
