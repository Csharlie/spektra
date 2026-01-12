# 🔒 Engine Architectural Guardrails

## Cél

Az **engine** workspace egy **platform-szintű** réteg, amely **kliens-agnosztikus** és **adat-forrás-agnosztikus** kell maradjon. Ezek a guardrail-ek biztosítják az architektúrális fegyelmet.

## Szabályok

### ❌ TILOS

1. **Importálás a projects/ workspace-ből**
   ```typescript
   // ❌ TILOS - engine NEM függhet projektek-specifikus kódtól
   import { something } from '../../projects/my-project/...';
   ```

2. **CMS-specifikus könyvtárak importálása**
   ```typescript
   // ❌ TILOS - engine legyen data-source-agnostic
   import axios from 'axios';
   import { gql } from '@apollo/client';
   import * as wp from 'wordpress';
   ```

3. **Kliens nevek a kódban**
   ```typescript
   // ❌ TILOS - hardcoded client names
   const clientName = 'my-project';
   ```

4. **CMS referenciák a kódban**
   ```typescript
   // ❌ TILOS - CMS-specific literals
   const cmsType = 'wordpress';
   const endpoint = '/wp-json/...';
   ```

### ✅ MEGENGEDETT

1. **Absztrakt interface-ek és típusok**
   ```typescript
   // ✅ OK - generic data contract
   export interface SiteData {
     site: SiteInfo;
     pages: Page[];
   }
   ```

2. **Generikus utility függvények**
   ```typescript
   // ✅ OK - source-agnostic utilities
   export function merge<T>(a: T, b: Partial<T>): T {
     return { ...a, ...b };
   }
   ```

3. **React komponensek data prop-okkal**
   ```typescript
   // ✅ OK - data-driven rendering
   export const Hero: React.FC<HeroProps> = ({ data }) => {
     return <section>{data.title}</section>;
   };
   ```

## Implementáció

### ESLint Guardrails

Az `engine/packages/config/eslint/engine-guardrails.js` fájl tartalmazza:

- **no-restricted-imports**: Blokkolja a projects/ és CMS könyvtárak importját
- **no-restricted-syntax**: Detektálja a kliens/CMS neveket string literalokban

### Pre-commit Hook

A `engine/.husky/pre-commit` hook automatikusan futtatja az ESLint-et minden commit előtt.

### CI/CD Enforcement

A `.github/workflows/engine-guardrails.yml` minden PR-nél és push-nál ellenőrzi:
- ESLint guardrails betartása
- Engine build sikeressége

## Használat

### Lokális ellenőrzés

```bash
cd engine
pnpm lint
```

### Build

```bash
cd engine
pnpm build
```

### Pre-commit automatikus ellenőrzés

A Husky automatikusan fut minden commit előtt. Ha guardrail sérülés van, a commit blokkolva lesz.

## Guardrail Sérülés Esetén

Ha ESLint hibát dob:

1. **Olvasd el a hibaüzenetet** - pontosan megmondja, mi a probléma
2. **Ne kerüld ki a szabályt** - javítsd az architektúrát
3. **Ha szükséges**: mozgasd a kódot a projects/ workspace-be

## Példák

### ✅ HELYES Architektúra

**Engine side (platform):**
```typescript
// engine/packages/core/types/SiteData.ts
export interface SiteData {
  site: SiteInfo;
  pages: Page[];
}

// engine/packages/core/app/App.tsx
export const App: React.FC<{ data: SiteData }> = ({ data }) => {
  return <div>{renderPages(data.pages)}</div>;
};
```

**Project side (client):**
```typescript
// projects/bellator/src/data/loaders/loadSiteData.ts
import { SiteData } from '@spektra/core';

export async function loadFromWordPress(): Promise<SiteData> {
  // WordPress-specific fetching logic
  const wpData = await fetch('https://bellator.com/wp-json/...');
  return transformToSiteData(wpData);
}
```

### ❌ ROSSZ Architektúra

```typescript
// ❌ engine/packages/core/fetchers/wordpress.ts - TILOS!
import axios from 'axios';

export async function fetchFromWordPress(url: string) {
  return axios.get(`${url}/wp-json/...`);
}
```

## Kivételek

**NINCSENEK KIVÉTELEK.**

Ha úgy érzed, hogy szükség van CMS-specifikus logikára az engine-ben, akkor hibás az architektúra. Mozgasd a logikát a projects/ workspace-be.

## Kérdések?

Ha nem vagy biztos, hogy egy kód szabályos-e:

1. Futtasd: `pnpm lint`
2. Kérdezz a csapattól code review-ban
3. Amikor kétséged van: tartsd az engine-t általánosnak
