# Validációs Pipeline

## Kontextus

A Spektra szigorú validációt igényel a következők biztosítására:
- Kódminőség és konzisztencia minden csomagban
- Az architekturális szabályok soha nem sérülnek
- A build-ek reprodukálhatók és megbízhatók
- A törő változtatások elkapásra kerülnek merge előtt

A validációs pipeline az **őr**, amely megakadályozza, hogy törött, nem megfelelő kód bekerüljön a kódbázisba.

## Döntés

A Spektra egy többszintű validációs pipeline-t használ, amelyet a **TurboRepo** és a **PNPM workspace-ek** hajtanak végre. Minden validációnak át kell mennie, mielőtt a kód merge-elhető.

### Validációs Szakaszok

1. **Lint** - ESLint ellenőrzi a kódminőséget és az architekturális sértéseket
2. **Type Check** - TypeScript biztosítja a típusbiztonságot
3. **Build** - TurboRepo build-eli az összes csomagot függőségi sorrendben
4. **Test** - Unit és integrációs tesztek (amikor implementálva van)

## Struktúra

### Validációs Belépési Pontok

```
engine/
├── package.json           # Script-ek: lint, build, test
├── turbo.json            # TurboRepo task konfiguráció
└── packages/
    ├── core/
    │   └── package.json  # Lokális: lint, build, test
    ├── themes/
    │   └── package.json
    ├── data-utils/
    │   └── package.json
    └── config/
        ├── eslint/
        │   ├── index.js              # Alap ESLint konfig
        │   └── engine-guardrails.js  # Architekturális szabályok
        └── typescript/
            ├── base.json             # Alap TypeScript konfig
            └── react.json            # React-specifikus konfig

projects/
├── package.json          # Script-ek: lint, build
└── [project]/
    └── package.json      # Projekt-enkénti validáció
```

### TurboRepo Konfiguráció

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "build/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    }
  }
}
```

## Szabályok

### Mit Jelent az "Átmenő Validáció"

✅ **A kód érvényes, amikor:**
1. A `pnpm lint` 0 kóddal lép ki (nincsenek hibák, figyelmeztetések megengedettek ha dokumentáltak)
2. A `pnpm build` sikeresen befejeződik minden csomagra
3. A `pnpm test` átmegy minden teszt suite-on (amikor implementálva van)
4. Nincsenek észlelt architekturális guardrail sértések

❌ **A kód érvénytelen, amikor:**
1. Bármilyen ESLint hiba jelen van
2. TypeScript fordítás meghibásodik
3. Build meghibásodik vagy hibákat produkál
4. Tesztek meghibásodnak vagy összeomlanak
5. Körkörös függőségek észlelése

### Validációs Szekvencia

#### 1. Lint Szakasz

```bash
cd engine
pnpm lint
```

**Mit ellenőriz:**
- Kód stílus konzisztencia (Prettier)
- Potenciális bug-ok és anti-pattern-ek
- Architekturális guardrails (nincs project import, nincsenek CMS libs)
- Import sorrend és használaton kívüli importok
- React hooks szabályok

**Kikényszerített Guardrails:**
- `no-restricted-imports`: Blokkolja a `projects/`-ból való importokat
- `no-restricted-syntax`: Detektálja a kliens/CMS neveket string-ekben
- Egyedi szabályok az `engine-guardrails.js`-ből

#### 2. Type Check Szakasz

A TypeScript automatikusan fut `build` közben, de önállóan is futtatható:

```bash
pnpm tsc --noEmit
```

**Mit ellenőriz:**
- Típus helyesség
- Hiányzó vagy helytelen props
- Nem biztonságos típus állítások
- Használaton kívüli változók és importok

#### 3. Build Szakasz

```bash
cd engine
pnpm build
```

**TurboRepo végrehajtás:**
1. Elemzi a függőségi gráfot
2. Build-eli a csomagokat a helyes sorrendben
3. Cache-eli a sikeres build-eket
4. Párhuzamosítja a független build-eket

**Mit produkál:**
- `dist/` mappák fordított kóddal
- Típus deklarációk (`.d.ts`)
- Source map-ek debuggoláshoz

**Build kimenetek cache-elve Turbo által:**
- `dist/**`
- `.next/**`
- `build/**`

#### 4. Test Szakasz (Jövőbeli)

```bash
cd engine
pnpm test
```

**Tervezett teszt típusok:**
- Unit tesztek (Vitest)
- Komponens tesztek (React Testing Library)
- Integrációs tesztek
- Vizuális regressziós tesztek (opcionális)

### Validáció a CI/CD-ben

**Pre-commit hook-ok (Husky):**
```bash
# engine/.husky/pre-commit-ban
pnpm lint-staged
```

**Futtatva:**
- Csak a megváltozott fájlokon
- Auto-javítás amikor lehetséges
- Blokkolja a commitot ha hibák vannak jelen

**GitHub Actions (Jövőbeli):**
```yaml
# .github/workflows/validate.yml
- run: pnpm install
- run: pnpm lint
- run: pnpm build
- run: pnpm test
```

**Futtatva:**
- Minden pull request-en
- Minden push-on a main-re
- Éjszakai build-ek (opcionális)

## Eszköz Hatás

### PNPM Workspace

A PNPM biztosítja:
- A függőségek megosztottak és deduplikáltak
- Minden csomag izolált `node_modules`-szal rendelkezik
- A link függőségek helyesen működnek

### TurboRepo

A Turbo nyújtja:
- **Caching**: Csak azt build-eli, ami változott
- **Párhuzamosítás**: Task-okat egyidejűleg futtat
- **Task függőségek**: Biztosítja a helyes build sorrendet
- **Távoli caching**: Cache megosztása a csapaton keresztül (opcionális)

**Cache találatok:**
- Ha semmi nem változott, a build < 1 másodperc alatt befejeződik
- A Turbo hash-t számol a forrásfájlokból és függőségekből
- Cache tárolva a `node_modules/.cache/turbo/`-ban

### ESLint

Az ESLint konfiguráció centralizált:
```javascript
// packages/config/eslint/index.js
module.exports = {
  extends: [
    './engine-guardrails.js',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ]
};
```

Minden csomag örökli ezt a konfigot:
```javascript
// packages/core/.eslintrc.js
module.exports = require('@spektra/config/eslint');
```

### TypeScript

A TypeScript konfig örökölt:
```json
// packages/core/tsconfig.json
{
  "extends": "@spektra/config/typescript/react.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

### Copilot Integráció

A Copilot-nak:
1. Futtatnia kell a validációt mielőtt kódot javasolna "kész"-ként
2. Ellenőriznie kell a lint hibákat a megváltozott fájlokban
3. Javításokat kell javasolnia a validációs hibákhoz
4. Soha nem commitolhat kódot, ami meghibásodik a validáción

## Verziókezelési Jegyzetek

A pipeline változtatások befolyásolják a verziókezelést:
- **Új validációs szakasz hozzáadása**: MINOR (nem törő, javítja a minőséget)
- **Meglévő ellenőrzés szigorúbbá tétele**: MAJOR (megtörheti a meglévő kódot)
- **Hamis pozitívok javítása**: PATCH
- **Új guardrail szabály**: MAJOR (megtöri a nem megfelelő kódot)

## Kapcsolódó Dokumentumok

- [Guardrails](./guardrails_hu.md) - Kikényszerített architekturális megszorítások
- [UI Architektúra](../architecture/ui-architecture_hu.md) - Mit védenek a guardrails
- [Csomagkezelés](../tooling/package-management_hu.md) - PNPM és Turbo beállítás
- [Verziókezelési Stratégia](../versioning/versioning-strategy_hu.md) - Mikor emeljük a verziókat

## Hibaelhárítás

### Build meghibásodik "Cannot find module" hibával
- Futtasd a `pnpm install`-t a workspace root-ban
- Ellenőrizd, hogy a `link:` függőségek helyesek
- Töröld a Turbo cache-t: `pnpm clean`

### Lint hibák nem jelennek meg az editorban
- Biztosítsd, hogy az ESLint extension telepítve van
- Ellenőrizd a `.vscode/settings.json`-t az ESLint konfighoz
- Indítsd újra az ESLint szervert: `Ctrl+Shift+P` → "Restart ESLint Server"

### Turbo cache nem működik
- Ellenőrizd a `turbo.json` `outputs` konfigurációját
- Ellenőrizd a fájl változtatásokat a `git status`-szal
- Kényszerítsd a rebuild-et: `pnpm build --force`

### Típus hibák az IDE-ben de a build sikeres
- Indítsd újra a TypeScript szervert: `Ctrl+Shift+P` → "Restart TS Server"
- Ellenőrizd, hogy a `tsconfig.json` helyes
- Biztosítsd, hogy minden függőség telepítve van
