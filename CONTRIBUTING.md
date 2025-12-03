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

### 1. **spektra** (Public Repository)
- **URL:** `https://github.com/Csharlie/spektra`
- **Cél:** Nyílt forráskódú, közösségi projekt
- **Tartalom:**
  - `packages/core` - Alapvető, újrafelhasználható komponensek
  - `packages/data` - Adatkezelési utilities
  - `packages/themes` - Téma rendszer
  - `packages/config` - Konfigurációs fájlok
  - `apps/client-a` - Demo alkalmazás (public)
- **NEM tartalmazza:** Privát klienseket és projekteket

### 2. **spektra-private** (Private Repository)
- **URL:** `https://github.com/Csharlie/spektra-private`
- **Cél:** Privát fejlesztési környezet
- **Tartalom:**
  - Ugyanazok a `packages/` mint a public repo
  - `apps/bellator-gym` - Privát ügyfél projekt
  - `apps/client-a` - Szinkronban a public verzióval
  - Egyéb privát projektek
- **Különbség:** Itt fejlesztünk, aztán szelektíven pusholjuk a public repo-ba

### 3. **spektra-bellator-gym** (Dedikált Client Repository)
- **URL:** `https://github.com/Csharlie/spektra-bellator-gym`
- **Cél:** Egyedi kliens projekt önálló repo-ban
- **Tartalom:** Csak a Bellator Gym projekt fájljai

---

## Fejlesztési workflow

### Alapelv

```
┌─────────────────────────────────────────────────────────────┐
│  1. Fejlesztés a spektra-private-ban                        │
│  2. Privát kliens használja az új feature-t                 │
│  3. Core komponensek → spektra (public)                     │
│  4. Privát kliens → dedikált repo (opcionális)              │
└─────────────────────────────────────────────────────────────┘
```

### Miért ez a workflow?

- **Biztonság:** Privát kliensek nem kerülnek nyilvános repo-ba
- **Tesztelés:** Privát projektben teszteljük az új komponenseket
- **Reusability:** Core komponensek mindenki számára elérhetők
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

### 1. Commit a spektra-private-ban

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
        modified:   packages/core/components/sections/index.ts
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

#### E) Commit és push a public repo-ba

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

### 3. Dedikált kliens repo frissítése (opcionális)

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
    └── templates/    # Page template-ek
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

## Összefoglaló parancsok

### Gyors referencia

```powershell
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
