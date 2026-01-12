# Architekturális Guardrails

## Kontextus

A Spektra architektúrája szigorú elválasztáson alapul:
- **Engine** (platform/motor) - kliens-agnosztikus, újrafelhasználható komponensek
- **Projects** - kliens-specifikus alkalmazások adatokkal és CMS logikával

Automatizált kikényszerítés nélkül a fejlesztők és AI asszisztensek véletlenül:
- Importálhatnak projekt-specifikus kódot az engine-be
- Hozzáadhatnak CMS függőségeket az engine-hez
- Hard-code-olhatnak kliens neveket vagy URL-eket
- Megsérthetik a réteghatárokat

A guardrails azért léteznek, hogy ezeket a sértéseket **lehetetlenné** tegyék eszközökkel, nem fegyelemmel.

## Döntés

A Spektra **ESLint guardrails**-eken keresztül kényszeríti ki az architekturális szabályokat, amelyek automatikusan elutasítják a nem megfelelő kódot.

### Alap Elv

> Az engine-nek **platform-szintű** kódnak kell maradnia, amely open-source-ként publikálható és bármely kliens projektben újrafelhasználható.

### Mit Védenek a Guardrails

1. **Engine tisztaság** - Nincs projekt-specifikus logika
2. **Adatforrás agnosztikusság** - Nincsenek CMS könyvtárak vagy fetch logika
3. **Kliens függetlenség** - Nincsenek hard-code-olt kliens nevek
4. **Réteghatárok** - A komponensek tiszteletben tartják a UI hierarchiát

## Struktúra

### Guardrail Implementáció

```
engine/packages/config/
└── eslint/
    ├── index.js              # Alap ESLint konfig
    └── engine-guardrails.js  # 🔒 GUARDRAIL SZABÁLYOK
```

### Szabály Kategóriák

#### 1. Import Korlátozások

```javascript
// engine-guardrails.js
'no-restricted-imports': ['error', {
  patterns: [
    {
      group: ['**/projects/**'],
      message: '🔒 Engine nem importálhat a projects workspace-ből'
    },
    {
      group: ['axios', '@apollo/client', 'graphql', 'wordpress'],
      message: '🔒 Engine-nek adatforrás-agnosztikusnak kell lennie'
    }
  ]
}]
```

#### 2. Szintaxis Korlátozások

```javascript
'no-restricted-syntax': ['error',
  {
    selector: "Literal[value=/bellator|client-a/i]",
    message: '🔒 Nincsenek kliens nevek az engine kódban'
  },
  {
    selector: "Literal[value=/wordpress|wp-json|graphql|rest-api/i]",
    message: '🔒 Nincsenek CMS referenciák az engine kódban'
  }
]
```

## Szabályok

### ❌ TILTOTT az Engine-ben

#### 1. Importálás Projects-ból

```typescript
// ❌ SOHA - Engine függ a projekttől
import { BellatorConfig } from '../../../projects/bellator/config';
```

**Miért:** Az engine-nek projekt-agnosztikusnak kell lennie. A projektek importálnak az engine-ből, soha fordítva.

#### 2. CMS-Specifikus Könyvtárak

```typescript
// ❌ SOHA - Adatforrástól függővé teszi az engine-t
import axios from 'axios';
import { useQuery } from '@apollo/client';
import { getWordPressData } from 'wordpress-lib';
```

**Miért:** Az engine adatokat kap props-okon keresztül. Az adat lekérés a projektekben történik.

#### 3. Hard-Code-olt Kliens Nevek

```typescript
// ❌ SOHA - Kliens-specifikus logika
const clientName = 'bellator';
if (project === 'client-a') {
  // ...
}
```

**Miért:** Az engine kódnak működnie kell bármely kliens számára.

#### 4. Hard-Code-olt CMS Referenciák

```typescript
// ❌ SOHA - CMS-specifikus logika
const endpoint = '/wp-json/wp/v2/posts';
const cmsType = 'wordpress';
const query = gql`{ posts { title } }`;
```

**Miért:** Az engine nem tudja és nem is érdekli, honnan származnak az adatok.

#### 5. Lefelé Irányuló Réteg Importok

```typescript
// ❌ SOHA - Atoms nem importálhat Molecules-ból
// components/primitives/Button.tsx-ben
import { Card } from '../features/Card';

// ❌ SOHA - Molecules nem importálhat Organisms-ból
// components/features/Card.tsx-ben
import { Hero } from '../sections/Hero';
```

**Miért:** Sérti a UI architektúra hierarchiát.

### ✅ ENGEDÉLYEZETT az Engine-ben

#### 1. Absztrakt Adat Szerződések

```typescript
// ✅ OK - Generikus interface
export interface SiteData {
  site: SiteInfo;
  pages: Page[];
}

export interface HeroData {
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
}
```

**Miért:** Definiálja, milyen adatokra van szüksége a komponenseknek, nem azt, honnan származnak.

#### 2. Tiszta Utility Függvények

```typescript
// ✅ OK - Forrás-agnosztikus utility
export function merge<T>(a: T, b: Partial<T>): T {
  return { ...a, ...b };
}

export function normalize(data: unknown): SiteData {
  // Validációs és transzformációs logika
}
```

**Miért:** A generikus segédfüggvények bármilyen adatforrással működnek.

#### 3. Adatvezérelt Komponensek

```typescript
// ✅ OK - Adatokat kap props-on keresztül
export const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <Button href={data.ctaUrl}>{data.ctaText}</Button>
    </section>
  );
};
```

**Miért:** A komponens nem tudja és nem is érdekli, honnan származtak az adatok.

#### 4. Felfelé Irányuló Réteg Importok

```typescript
// ✅ OK - Molecules importálhat Atoms-ból
// components/features/Card.tsx-ben
import { Button } from '../primitives/Button';
import { Heading } from '../primitives/Heading';

// ✅ OK - Organisms importálhat Molecules-ból
// components/sections/Hero.tsx-ben
import { Card } from '../features/Card';
```

**Miért:** Tiszteletben tartja a UI architektúra hierarchiát.

### ✅ KÖTELEZŐ a Projects-ban

#### 1. Adat Betöltési Logika

```typescript
// ✅ KÖTELEZŐ - projects/bellator/src/data/loaders/-ben
export async function loadSiteData(): Promise<SiteData> {
  const wpData = await fetchFromWordPress();
  const staticData = getStaticContent();
  return merge(wpData, staticData);
}
```

**Miért:** A projektek birtokolják az adatforrást és a CMS integrációt.

#### 2. CMS Integráció

```typescript
// ✅ KÖTELEZŐ - projects/bellator/src/data/sources/wp/-ben
import axios from 'axios';

export async function fetchFromWordPress() {
  const response = await axios.get('/wp-json/wp/v2/posts');
  return response.data;
}
```

**Miért:** A CMS logika a projekt rétegbe tartozik, nem az engine-be.

#### 3. Konfiguráció és Manifest

```typescript
// ✅ KÖTELEZŐ - projects/bellator/config/-ben
export const siteConfig = {
  name: 'Bellator Gym',
  url: 'https://bellator.com',
  // ... kliens-specifikus konfig
};
```

**Miért:** Minden projektnek saját konfigurációja van.

## Eszköz Hatás

### ESLint Integráció

Minden engine csomagnak ki kell terjesztenie a guardrails konfigot:

```javascript
// packages/core/.eslintrc.js
module.exports = require('@spektra/config/eslint');
```

### Pre-Commit Hook-ok

A guardrails automatikusan futnak commit előtt:

```bash
# .husky/pre-commit
pnpm lint-staged
```

Ha sértés észlelhető:
```
❌ Error: 🔒 Engine nem importálhat a projects workspace-ből
   Import from '../../../projects/bellator' nem engedélyezett
```

A commit blokkolva van, amíg nincs javítva.

### CI/CD Pipeline

A guardrails futnak a continuous integration-ben:

```yaml
# .github/workflows/validate.yml
- name: Run ESLint Guardrails
  run: pnpm lint
```

A pull request-ek nem merge-elhetők, ha a guardrails meghibásodnak.

### VS Code Integráció

Az ESLint extension valós időben mutatja a guardrail sértéseket:
- Piros aláhúzások a tiltott importokon
- Inline hibaüzenetek
- Gyors javítási javaslatok amikor elérhetők

### Copilot Megszorítások

A GitHub Copilot-nak:
1. **Olvasnia kell a guardrails dokumentációt** mielőtt engine kódot javasolna
2. **Soha nem javasolhat** importokat a `projects/`-ból
3. **Soha nem javasolhat** CMS könyvtár importokat az engine-ben
4. **TODO kommenteket kell hozzáadnia** amikor bizonytalan a struktúráról
5. **Tiszteletben kell tartania a réteghatárokat** a komponens javaslatokban

**Példa Copilot viselkedésre:**

```typescript
// ❌ ROSSZ - Copilot ezt javasolja
import { BellatorConfig } from '../../../projects/bellator';

// ✅ JÓ - Copilot ezt javasolja
// TODO: Adjuk át a konfigot props-on keresztül ahelyett, hogy a projektből importálnánk
export const Component: React.FC<Props> = ({ config }) => {
```

## Verziókezelési Jegyzetek

A guardrail változtatások befolyásolják a verziókezelést:
- **Új guardrail szabály**: MAJOR (megtörheti a meglévő kódot)
- **Szabály enyhítése**: MAJOR (architekturális döntés változás)
- **Hibaüzenetek javítása**: PATCH
- **Hamis pozitívok javítása**: PATCH

## Kapcsolódó Dokumentumok

- [UI Architektúra](../architecture/ui-architecture_hu.md) - Réteghatárok, amelyeket a guardrails védenek
- [Validációs Pipeline](./validation-pipeline_hu.md) - Hogyan kerülnek kikényszerítésre a guardrails
- [Csomagkezelés](../tooling/package-management_hu.md) - Workspace struktúra
- [Verziókezelési Stratégia](../versioning/versioning-strategy_hu.md) - Hatás a verziókra

## Kikényszerítési Történet

### Amikor a Guardrails Hozzáadásra Kerültek

A guardrails-okat az alábbiak megoldására implementálták:
- Véletlen projekt importok a gyors fejlesztés során
- CMS könyvtár szivárgások az engine csomagokba
- Kliens nevek megjelenése az állítólag generikus kódban

### Szabályok Evolúciója

| Verzió | Hozzáadott Szabály | Ok |
|---------|------------|--------|
| 1.0.0 | `no-restricted-imports` a projects/-ra | Engine-projekt összekapcsolás megelőzése |
| 1.0.0 | `no-restricted-imports` CMS libs-re | Engine adatforrás-agnosztikussá tétele |
| 1.1.0 | `no-restricted-syntax` kliens nevekre | Hard-code-olt string-ek elkapása |

## Guardrail Karbantartás

### Új Szabályok Hozzáadása

1. Architekturális sértési minta azonosítása
2. ESLint szabály hozzáadása az `engine-guardrails.js`-hez
3. Tesztelés a meglévő kódbázison
4. Dokumentálás ebben a fájlban
5. Verzió emelés (MAJOR)

### Guardrails Tesztelése

```bash
# Teszt, hogy a guardrails elkapják a sértéseket
cd engine/packages/core
# Tiltott import hozzáadása
echo "import x from '../../../projects/bellator';" >> test.ts
pnpm lint
# Meg kell hibásodjon guardrail hibával
git checkout test.ts
```

### Guardrails Megkerülése (Csak Vészhelyzetben)

```typescript
// eslint-disable-next-line no-restricted-imports
import { something } from '../../../projects/bellator';
// TODO: Távolítsd el ezt az importot - sérti a guardrails-t
```

**Követelmények:**
- TODO kommentet kell tartalmaznia, magyarázva a miértet
- Ticket-tel kell rendelkeznie a megfelelő javításhoz
- Jóváhagyottnak kell lennie kódáttekintésben
- Nem commitolható a main branch-re
