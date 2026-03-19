# Spektra Platform — Bootstrap Log

Kronológikus napló: mi jött létre, mikor, miért.

---

## Fázis 1 — Monorepo csontváz (2026-03-19) · #1 `1f57f01`

**Commit:** `chore: init platform monorepo`

### Mi jött létre

```
platform/
├── package.json               ← workspace root, private: true
├── pnpm-workspace.yaml        ← packages/*, apps/*, tools/*
├── turbo.json                 ← build/dev/lint/test/clean pipeline
├── tsconfig.base.json         ← strict, ES2022, React JSX, composite
├── .eslintrc.cjs              ← eslint-plugin-boundaries import szabályok
├── commitlint.config.js       ← conventional commits (feat, fix, chore, ...)
├── .husky/pre-commit           ← lint-staged futtatás commit előtt
├── .husky/commit-msg           ← commitlint ellenőrzés commit message-re
├── .npmrc                     ← shamefully-hoist=false, strict-peer-dependencies
└── .gitignore                 ← node_modules, dist, .turbo, .yalc, coverage
```

### Miért

- **pnpm + Turborepo** — iparági standard monorepo tooling, workspace protocol-lal
- **eslint-plugin-boundaries** — import határ szabályok MINDEN package között (types→senki, data→types, runtime→types+data, B→E→M hierarchia, stb.)
- **commitlint + husky** — conventional commits az elejétől, hogy a history rendben legyen mire changeset/release jön
- **strict TypeScript** — noUncheckedIndexedAccess, isolatedModules, forceConsistentCasingInFileNames
- **.npmrc strict-peer-dependencies** — nem engedi a hiányzó peer dependency-ket csendben telepíteni

### DevDependencies (root)

| Csomag | Verzió | Cél |
|---|---|---|
| turbo | ^2.0 | monorepo build orchestration |
| typescript | ^5.5 | nyelv |
| eslint | ^9.0 | linting |
| eslint-plugin-boundaries | ^4.0 | import határ guardrails |
| husky | ^9.1 | git hooks |
| lint-staged | ^16.0 | staged fájlokon lint |
| @commitlint/cli | ^19.0 | commit message validáció |
| @commitlint/config-conventional | ^19.0 | conventional commits preset |
| @changesets/cli | ^2.27 | versioning (később, npm publish-kor) |

### Döntések

1. **Flat packages/** — nincs engine/ almappa, 8 package esetén felesleges a csoportosítás
2. **ESLint flat config (.cjs)** — ESLint v9 flat config formátum
3. **--no-verify az első commiton** — husky hook még nem tud lint-staged-et futtatni .ts fájlok nélkül
4. **GitHub repo:** `https://github.com/Csharlie/spektra` → `D:\Projects\spektra\platform\`

---

## Fázis 2 — @spektra/types (2026-03-19) · #3 `7dc87ca`

**Commit:** `feat(types): initial type contracts`

### Mi jött létre

```
packages/types/
├── package.json               ← @spektra/types, ZERO dependencies
├── tsconfig.json              ← composite, types: [] (NO React, NO DOM)
└── src/
    ├── index.ts               ← barrel export (MINDEN type)
    ├── section.ts             ← PlatformSectionType, SectionType<T>, Section<T>, SectionMeta
    ├── media.ts               ← Media, MediaVariant, MediaSource
    ├── navigation.ts          ← Navigation, NavItem
    ├── page.ts                ← Page, PageMeta
    ├── site.ts                ← SiteData, SiteMeta
    ├── theme.ts               ← ThemeConfig, ThemeColors, ThemeFonts
    └── adapter.ts             ← SiteDataAdapter interface
```

### Mi változott az sp-engine-hez képest

| sp-engine (régi) | @spektra/types (új) | Miért |
|---|---|---|
| `Section.data: unknown` | `Section<T>.data: T` | Generic — type-safe section data |
| `Section.type: string` | `PlatformSectionType` union + `SectionType<Client>` | Kontrollált, bővíthető |
| Media: nem létezett | `Media { src, alt, width, height, variants }` | Egységes képkezelés |
| `Navigation \| NavItem[]` | Csak `Navigation { primary, footer }` | Egységesítés |
| `ogImage?: string` | `ogImage?: Media` | Media típust használ |
| SiteData.navigation optional | SiteData.navigation required | Site-nak mindig van navigációja |
| `isPlatformSectionType` nem létezett | Runtime helper + ReadonlySet | Section type validáció |

### Guardrails aktív

- `tsconfig.json types: []` → React import = TS error
- `package.json dependencies: {}` → ZERO dependency, pont
- Barrel export only `type` + egyetlen runtime helper (`isPlatformSectionType`)

### Döntések

1. **NavItem.external** mező hozzáadva — külső link jelölés (target="_blank")
2. **SectionMeta opcionális a Section-ön** — definition-ben kötelező, de a raw CMS adatban nem biztos, hogy van
3. **ThemeConfig** a runtime theme metadata-hoz — NEM a Tailwind preset (az @spektra/themes-ben lesz)
4. **Section.type marad `string`** a Section interface-ben, nem `SectionType` — mert a generic-nél a kliens bővítését is engedni kell

---

## Post-Phase 2 — Audit fix (2026-03-19) · #4 `eb4884f`

**Commit:** `fix: audit — boundaries pattern, rimraf, script cleanup`

Code review után 4 problémát azonosítottunk és javítottunk egyben.

### 1. `check-boundaries` script eltávolítva (package.json)

**Mi volt:** `"check-boundaries": "node scripts/check-boundaries.js"` — a hivatkozott `scripts/` mappa nem létezett, a script törött volt.

**Mi lett:** Eltávolítva. A boundary ellenőrzés az `eslint-plugin-boundaries` rule-okon keresztül fut a lint pipeline-ban, dedikált script nem szükséges egyelőre.

**TODO (Phase 5-6):** Ha szükség lesz futásidejű `package.json dependencies` auditra (pl. hogy egy package ne importáljon olyat, ami nincs a `dependencies`-ben), akkor visszahozzuk dedikált scriptként.

### 2. `rm -rf` → `rimraf` (packages/types/package.json)

**Mi volt:** `"clean": "rm -rf dist *.tsbuildinfo"` — POSIX parancs, Windows-on nem fut.

**Mi lett:** `"clean": "rimraf dist *.tsbuildinfo"` + `rimraf ^6.1.3` root devDependency. Cross-platform, minden jövőbeli package clean scriptje is ezt fogja használni.

### 3. Boundaries pattern javítás (eslint.config.cjs)

**Mi volt:** `pattern: ['packages/types/*']` — csak egy szint mélyre illeszkedett, a `packages/types/src/section.ts` útvonal nem matchelt → az összes boundary rule de facto kikapcsolt állapotban volt.

**Mi lett:** `pattern: ['packages/types/src/**']` — minden element pattern `src/**` végződésű lett, ami pontosan illeszkedik az ESLint `files` glob által vizsgált fájlútvonalakra. Ez volt a legkritikusabb javítás: e nélkül a guardrail rendszer nem működött.

### 4. Bootstrap log frissítés

**Mi volt:** Fázis 1 fájl-fában `.eslintrc.cjs` szerepelt, pedig az ESLint v9 flat config migráció részeként a Phase 2 commitban `eslint.config.cjs`-re lett átnevezve.

**Mi lett:** A korábbi log bejegyzés NEM lett felülírva (történelmi pontosság). Helyette ez a post-phase entry dokumentálja az eltérést. A logban innentől a tényleges fájlnév: `eslint.config.cjs`.

---

## Fázis 3 — @spektra/data (2026-03-19) · #5 `ca114e2`

**Commit:** `feat(data): cms adapter layer — wordpress + json factories`

### Mi jött létre

```
packages/data/
├── package.json               ← @spektra/data, egyetlen dep: @spektra/types
├── tsconfig.json              ← composite, noEmit: false, project ref → types
└── src/
    ├── index.ts               ← barrel export (adapter factories + config types)
    ├── wordpress.ts           ← createWordPressAdapter factory
    └── json-adapter.ts        ← createJsonAdapter factory (URL vagy inline)
```

### Architektúrális döntések

1. **ZERO external dependency** — natív `fetch`, nem axios. A package-nek egyetlen függősége van: `@spektra/types: workspace:*`
2. **ZERO React** — tiszta async TS. React hook-ok (useSiteData, stb.) a `@spektra/runtime` package-be kerülnek
3. **Factory pattern** — `createWordPressAdapter(config)` és `createJsonAdapter(config)` → mindkettő `SiteDataAdapter`-t ad vissza
4. **mapResponse a projekt adja** — a WP adapter nem tartalmaz beépített mapping logikát, mert minden WP site más REST endpoint struktúrát használ. A `mapResponse: (response: unknown) => SiteData` config param a kliens feladata
5. **No Apollo/GraphQL** — a WP REST adapter natív fetch-et használ. GraphQL adapter később adható hozzá, ha kell
6. **No caching, no retry** — az adapter réteg felelőssége a fetch + transform. Cache és retry logika a runtime rétegbe tartozik
7. **tsconfig project references** — `"references": [{ "path": "../types" }]` biztosítja a helyes build sorrendet

### Forrásanyag

| Forrás | Mi lett belőle |
|---|---|
| sp-benettcar-consumer `wordpressAdapter.ts` | `wordpress.ts` — ugyanaz a fetch+map pattern, de factory-ként (SiteDataAdapter-t ad vissza) és konfigurálható endpoint-tel |
| sp-benettcar-consumer `loadSiteData.ts` | A mock/fallback pattern → `json-adapter.ts` inline `data` módban |
| spektra-private `wp/rest/client.ts` | NEM vettük át — axios-ból natív fetch-re váltottunk |
| spektra-private `wp/rest/hooks.ts` | KIZÁRVA — React hook, @spektra/runtime-ba tartozik |
| spektra-private `wp/graphql/*` | KIZÁRVA — Apollo dependency, YAGNI. Később Phase-ölhető ha kell |
| spektra-legacy `data-utils/*` | KIZÁRVA — normalize/merge/validate stub-ok, nem hoznak értéket |

### API surface

```typescript
// WordPress adapter — configurable REST endpoint + custom mapper
import { createWordPressAdapter } from '@spektra/data'

const adapter = createWordPressAdapter({
  apiBase: 'https://example.com',
  endpoint: '/wp-json/benettcar/v1/page/home',  // default: /wp-json/spektra/v1/site
  mapResponse: (raw) => transformWpResponse(raw), // projekt-specifikus mapping
  auth: { token: '...' },                         // opcionális Bearer token
})

const siteData = await adapter.load()

// JSON adapter — dev/mock/static
import { createJsonAdapter } from '@spektra/data'

const mock = createJsonAdapter({ data: mockSiteData })     // inline
const remote = createJsonAdapter({ url: '/data/site.json' }) // fetch
```

### Guardrails aktív

- `dependencies: { "@spektra/types": "workspace:*" }` — egyetlen dep, ZERO external
- `tsconfig.json types: []` → @types/* auto-inclusion blokkolva
- `eslint-plugin-boundaries` rule: `from: 'data', allow: ['types']` — más package-ből nem importálhat
- Barrel export: csak factory function-ök + config type-ok

### Build fix megjegyzés

A build teszt során kiderült, hogy a `tsbuildinfo` cache félrevezető: `tsc` zéró hibával futott le, de `dist/` nem jött létre. Oka: composite + incremental mode-ban a régi `.tsbuildinfo` azt gondolta, minden up-to-date, de a dist/ mappa nem létezett (clean után). A `clean` script (`rimraf dist *.tsbuildinfo`) ezért törli mindkettőt. Ez a types package-t is érintette — itt is pótoltuk a hiányzó dist-et.

---

## Post-Phase 3 — Data adapter fix (2026-03-19) · #6 `3777bcd`

**Commit:** `fix(data): normalize wp url slash, clarify json adapter url+data behavior`

Code review után 2 issue javítva.

### 1. WordPress URL double-slash normalizálás (wordpress.ts)

**Mi volt:** `${apiBase}${endpoint}` — ha `apiBase` trailing slash-sel végződött és `endpoint` leading slash-sel kezdődött (default), dupla `//` keletkezett. Egyes proxy-k/hostok érzékenyek erre.

**Mi lett:** `apiBase` trailing slash-e levágva, `endpoint` leading slash-e megőrizve → mindig pontosan egy `/` a kettő között.

### 2. JSON adapter url+data viselkedés tisztázása (json-adapter.ts)

**Mi volt:** Ha `url` és `data` is meg volt adva, `load()` mindig az inline `data`-t adta vissza (mert az `if (config.data)` előbb volt). Ez meglepetést okozhatott: prodban a remote adat helyett a beégetett mock maradt.

**Mi lett:** A viselkedés explicit és dokumentált (JSDoc-ban), a kód szétválasztva:
- **url only**: `load()` + `revalidate()` is fetch-el
- **data only**: `load()` inline-t ad, revalidate nincs
- **url + data**: `load()` → instant inline (gyors first paint), `revalidate()` → fetch (frissítés)

---

## Fázis 4 — @spektra/runtime (2026-03-19) · #8 `5538d1e`

**Commit:** `feat(runtime): react runtime — context, registry, renderer`

### Mi jött létre

```
packages/runtime/
├── package.json               ← @spektra/runtime, dep: types, peer: react ^18
├── tsconfig.json              ← composite, types: ["react"], project ref → types
└── src/
    ├── index.ts               ← barrel export
    ├── types.ts               ← SectionDefinition<T> (React-aware plugin contract)
    ├── section-registry.ts    ← createSectionRegistry + registerSections
    ├── section-renderer.tsx   ← SectionRenderer component
    └── context.tsx            ← SiteDataProvider + useSiteData hook
```

### Mi változott az sp-engine-hez képest

| sp-engine (régi) | @spektra/runtime (új) | Miért |
|---|---|---|
| `AppRuntime` component — all-in-one | `SiteDataProvider` + `SectionRenderer` szétválasztva | Separation of concerns: context ≠ rendering |
| `SiteData` useState + useEffect kézzel az App-ban | `SiteDataProvider` automatikus adapter.load() | Nincs boilerplate a kliens App-ban |
| Nincs loading/error state kezelés | `useSiteData()` → `{ data, loading, error }` | Strukturált állapotkezelés |
| `registry.resolve()` csak component-et ad | `SectionRegistry` interface: resolve + has + types() | Introspection lehetőség (debug, admin UI) |
| `SectionDefinition.component: ComponentType<any>` | `SectionDefinition<T>.component: ComponentType<T>` | Type-safe section data |
| `SectionDefinition.metadata: { label?, category? }` | `SectionDefinition.metadata: SectionMeta` (from @spektra/types) | Közös SectionMeta type a types package-ből |
| Ismeretlen section → dev-only `<div>` | Ismeretlen section → `null` (vagy custom `fallback` prop) | Nincs Vite-specifikus `import.meta.env` dependency |

### Architektúrális döntések

1. **SiteDataProvider + useSiteData** — Az sp-engine-ben az App.tsx-ben volt kézzel `useState<SiteData | null>` + `useEffect(() => adapter.load().then(…))`. Most ez platform-szintű: a Provider mount-kor hívja `adapter.load()`-ot, cleanup-pal (`cancelled` flag) véd a race condition ellen
2. **SectionRenderer szeparálva** — az sp-engine AppRuntime-ja egyben volt a section loop-pal. Most a SectionRenderer önálló component: újrafelhasználható layout-okon belül szeletekre (pl. csak header sections, csak content sections)
3. **fallback prop** a SectionRenderer-en — `import.meta.env.DEV` Vite-specifikus, platform package-ben nem használható. Helyette a kliens adhat `fallback` callback-et ismeretlen section type-okra
4. **React = peerDependency** — a runtime nem hozza magával a react-et, a kliens app-é a felelősség. `@types/react` devDependency a build-hez
5. **Nincs @spektra/data import** — a boundary rule (`runtime → types, data`) engedi, de a runtime nem importál közvetlenül data-ból. Az adapter-t a kliens adja props-ként a Provider-nek. Laza coupling.
6. **SectionRegistry interface** — az sp-engine-ben az object literal volt a registry. Most explicit interface: `register`, `resolve`, `has`, `types()`. A `has` + `types()` debug/admin UI-nak fontos

### Forrásanyag

| Forrás | Mi lett belőle |
|---|---|
| sp-engine `runtime/AppRuntime.tsx` | Szétválasztva: `context.tsx` (Provider) + `section-renderer.tsx` (rendering) |
| sp-engine `runtime/sectionRegistry.ts` | `section-registry.ts` — ugyanaz a Map pattern, de SectionDefinition-nel és explicit interface-szel |
| sp-benettcar-consumer `App.tsx` useState+useEffect | Beolvadt a `SiteDataProvider`-be — kliensnél nem kell többé kézzel kezelni |
| sp-engine `SectionDefinition` type | `types.ts` — generic `<T>`, SectionMeta import |
| spektra-private `DesignSystemContext` | Pattern átvéve (createContext + Provider + hook), de SiteData-ra alkalmazva |
| sp-modules hooks (`useDocumentTitle`, stb.) | KIZÁRVA — utility hook-ok, nem runtime responsibility |
| spektra-private `data/wp/rest/hooks.ts` | KIZÁRVA — CMS-specifikus React hook, ez az adapter réteg felelőssége |

### API surface

```typescript
import {
  SiteDataProvider,
  useSiteData,
  createSectionRegistry,
  registerSections,
  SectionRenderer,
} from '@spektra/runtime'
import type { SectionDefinition } from '@spektra/runtime'

// 1. Registry létrehozás + section pluginok regisztrálása
const registry = createSectionRegistry()
registerSections(registry, [heroDefinition, aboutDefinition, ...])

// 2. Provider → az app gyökerében
function App() {
  return (
    <SiteDataProvider adapter={myAdapter}>
      <Layout />
    </SiteDataProvider>
  )
}

// 3. Consume data + render
function Layout() {
  const { data, loading, error } = useSiteData()
  if (loading) return <Spinner />
  if (error) return <Error message={error.message} />
  if (!data) return null

  const page = data.pages[0]
  return (
    <SectionRenderer
      sections={page.sections}
      registry={registry}
      fallback={(type) => `Missing: ${type}`}
    />
  )
}
```

### Guardrails aktív

- `dependencies: { "@spektra/types": "workspace:*" }` — egyetlen real dep
- `peerDependencies: { "react": "^18.0.0" }` — React a kliens hozza
- `tsconfig.json types: ["react"]` → csak React típusok engedélyezve
- `eslint-plugin-boundaries` rule: `from: 'runtime', allow: ['types', 'data']`
- Barrel export: Provider, hook, registry factory, renderer, types

---

## Post-Phase 4 — Runtime fix (2026-03-19) · #10 `77a65c1`

**Commit:** `fix(runtime): align @types/react to ^18, warn on duplicate section registration`

Code review után 2 issue javítva.

### 1. @types/react verzió összehangolás (package.json)

**Mi volt:** `devDependencies: { "@types/react": "^19.2.14" }` miközben `peerDependencies: { "react": "^18.0.0" }`. A React 19 types inkompatibilis API-kat tartalmaznak (pl. `useRef` signature változás), ami hamis TS hibákat okozhat React 18-as fogyasztói appokban.

**Mi lett:** `@types/react: "^18.3.0"` — szinkronban a peer dependency-vel.

### 2. Section registry duplicate warning (section-registry.ts)

**Mi volt:** `register()` csendben felülírta az azonos type-ú korábbi definíciót. Több plugin regisztrálásánál ez rejtett, order-dependent bug-ot okozhat.

**Mi lett:** `console.warn` hozzáadva, ha már létezik azonos type. Policy: "utolsó nyer, de figyelmeztet". Nem error, mert a kliens override (pl. custom hero a platform default hero helyett) legitim use case.

---

## Fázis 5 — @spektra/components (...) · #12 `bf5598a`

**Commit:** `feat(components): atomic design component library (B→E→M→W)`

@spektra/components — az UI réteg teljes implementációja, 4-szintű atomi hierarchiával.

### Mi jött létre

```
packages/components/
├── package.json               ← clsx, tailwind-merge, lucide-react; peer: react ^18
├── tsconfig.json              ← noEmit: false, types: ["react"], refs: [types]
└── src/
    ├── index.ts               ← barrel export (minden publikus szimbólum)
    ├── utils/
    │   └── cn.ts              ← clsx + tailwind-merge composition utility
    ├── basics/                ← (B) atomok — CSAK types-tól importálnak
    │   ├── Button.tsx         ← variant/size/fullWidth/isLoading, forwardRef
    │   ├── Card.tsx           ← padding/shadow/hover variantek
    │   ├── Input.tsx          ← label/error/helperText, forwardRef
    │   └── Textarea.tsx       ← label/error/helperText, forwardRef
    ├── elements/              ← (E) molekulák — basics + types
    │   ├── FeatureCard.tsx    ← LucideIcon + title + description
    │   ├── ContactFormField.tsx ← type-aware Input/Textarea wrapper
    │   └── Logo.tsx           ← gradient text, size variantek
    ├── modules/               ← (M) organizmusok — basics + elements + types
    │   ├── HeroBlock.tsx      ← CTA pair, background image, animation classes
    │   ├── FeaturesBlock.tsx  ← configurable grid (2/3/4 col), FeatureCard lista
    │   ├── AboutBlock.tsx     ← image position, stats grid, CTA
    │   ├── ContactBlock.tsx   ← form validation, success state, contact info
    │   ├── GalleryBlock.tsx   ← responsive grid, category filter, lightbox
    │   ├── FooterBlock.tsx    ← section links, social icons, copyright
    │   └── NavigationBar.tsx  ← fixed navbar, mobile hamburger, CTA
    └── wrappers/              ← (W) strukturális — CSAK types-tól, cn()-tól
        ├── Container.tsx      ← max-width + responsive padding
        └── Section.tsx        ← spacing + background variantek
```

### Tervezési döntések

| Döntés | Indok |
|--------|-------|
| `cn()` lokális utility, nem külön package | Egyetlen felhasználó (components), DRY elég ezen a szinten |
| `lucide-react` dep, nem peer | Icon-ok a komponensek integráns részei, nem cserélhetők |
| Wrappers → CSAK types import | B→E→M hierarchia-független layout primitívek |
| LandingLayout NEM wrapper | NavigationBar + FooterBlock importálna → ez template szintű, @spektra/templates-be kerül |
| Magyar default labels (ContactBlock) | i18n overrideable, de a default a célpiac nyelve |
| Tailwind-safe grid mapping (Record lookup) | JIT-kompatibilis, nincs dinamikus class interpoláció |

### Boundary szabályok (eslint.config.cjs)

```
basics   → [types]
elements → [types, basics]
modules  → [types, basics, elements]
wrappers → [types]
```

Mindegyik `eslint-plugin-boundaries` által kikényszerített. `pnpm --filter @spektra/components run lint` → PASS.

### Függőségek

```
dependencies:
  @spektra/types   workspace:*
  clsx             ^2.1.0
  tailwind-merge   ^2.6.0
  lucide-react     ^0.460.0

peerDependencies:
  react            ^18.0.0

devDependencies:
  @types/react     ^18.3.0
```

---

## Fázis 6 — @spektra/sections (...)

> _Következő fázis — ide kerül a dokumentáció._
