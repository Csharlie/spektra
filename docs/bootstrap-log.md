# Spektra Platform — Bootstrap Log

Kronológikus napló: mi jött létre, mikor, miért.

---

## Jelenlegi állapot (Architecture Snapshot)

> Utolsó frissítés: v1 stabilizáció (#22–#28)

### Workspace struktúra

```
D:\Projects\spektra\platform\        ← pnpm monorepo + Turborepo
├── packages/                          ← 7 library package
│   ├── types/        @spektra/types       ZERO dep root type contracts
│   ├── data/         @spektra/data        CMS adapter layer (WP, JSON)
│   ├── runtime/      @spektra/runtime     React context, registry, renderer
│   ├── components/   @spektra/components  Atomic UI (B→E→M→W, 16 component)
│   ├── sections/     @spektra/sections    Section definitions (5 section plugin)
│   ├── themes/       @spektra/themes      Tailwind presets (base, corporate, starter)
│   └── templates/    @spektra/templates   Page templates (LandingTemplate)
├── apps/                              ← 1 app
│   └── starter/      @spektra/starter     Vite demo app — full E2E integration
└── docs/
    └── bootstrap-log.md               ← ez a fájl
```

### Dependency graph

```
types ← data ← runtime ← sections
  ↑              ↑          ↑
  └── components ┘          │
  └── themes (izolált)      │
  └── templates ←───────────┘
       ↑
starter (app) ← minden package
```

### Boundary szabályok (eslint-plugin-boundaries)

| Package | Importálhat |
|---------|-------------|
| types | — (ZERO dep) |
| data | types |
| runtime | types, data |
| basics | types |
| elements | types, basics |
| modules | types, basics, elements |
| wrappers | types |
| sections | types, basics, elements, modules, wrappers, runtime |
| themes | — (ZERO @spektra import) |
| templates | types, runtime |

### Tech stack

| | Verzió |
|---|---|
| TypeScript | 5.9.3 |
| React | ^18.3 |
| Vite | ^5.4 |
| Tailwind CSS | ^3.4 |
| pnpm | 9.15.4 |
| Turborepo | 2.8.19 |
| ESLint | 9.39.4 (flat config) |
| Node | ≥18 |

### Commit history

| # | Hash | Leírás |
|---|------|--------|
| 1 | `1f57f01` | chore: init platform monorepo |
| 3 | `7dc87ca` | feat(types): initial type contracts |
| 4 | `eb4884f` | fix: audit — boundaries, rimraf, script cleanup |
| 5 | `ca114e2` | feat(data): cms adapter layer |
| 6 | `3777bcd` | fix(data): normalize wp url, clarify json adapter |
| 8 | `5538d1e` | feat(runtime): react runtime |
| 10 | `77a65c1` | fix(runtime): @types/react ^18, duplicate warn |
| 12 | `bf5598a` | feat(components): atomic design B→E→M→W |
| 14 | `9602207` | feat(sections): platform section definitions |
| 16 | `4f45cfe` | feat(themes): tailwind presets |
| 18 | `5f8b585` | feat(templates): landing template with DI shell |
| 20 | `e3f2fbb` | feat(starter): vite app — full platform integration |
| 22 | `30bd7e3` | docs: architecture snapshot + fix stale references |
| 23 | `21ac257` | fix: serializable CTA contract — CallToAction type |
| 24 | `712034c` | fix: unify image props to canonical Media type |
| 26 | `2dfdb17` | fix(runtime): type erasure boundaries in section pipeline |
| 27 | `0e2057b` | feat(data): runtime SiteData validation at adapter boundary |
| 28 | `9fb4581` | fix(data): tighten runtime validation gaps |

(Páros számok közt hash-update commitok — #2, #7, #9, #11, #13, #15, #17, #19, #21, #25)

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
├── eslint.config.cjs          ← eslint-plugin-boundaries import szabályok (ESLint v9 flat config)
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

1. **Flat packages/** — nincs engine/ almappa, <10 package esetén felesleges a csoportosítás
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

## Fázis 6 — @spektra/sections (...) · #14 `9602207`

**Commit:** `feat(sections): platform section definitions — hero, features, about, contact, gallery`

@spektra/sections — a híd @spektra/components (UI) és @spektra/runtime (SectionDefinition registry) között. Minden platform section type-hoz egy `SectionDefinition<T>` plugin.

### Mi jött létre

```
packages/sections/
├── package.json               ← deps: types + components + runtime; peer: react ^18
├── tsconfig.json              ← refs: [types, components, runtime]
└── src/
    ├── index.ts               ← barrel export + platformSections[] convenience array
    ├── hero.ts                ← heroDefinition: SectionDefinition<HeroBlockProps>
    ├── features.ts            ← featuresDefinition: SectionDefinition<FeaturesBlockProps>
    ├── about.ts               ← aboutDefinition: SectionDefinition<AboutBlockProps>
    ├── contact.ts             ← contactDefinition: SectionDefinition<ContactBlockProps>
    └── gallery.ts             ← galleryDefinition: SectionDefinition<GalleryBlockProps>
```

### Mi változott (`@spektra/types` — PlatformSectionType bővítés)

**Előtte:** `'hero' | 'about' | 'gallery' | 'contact' | 'faq' | 'cta'`
**Utána:** `'hero' | 'features' | 'about' | 'gallery' | 'contact' | 'faq' | 'cta'`

A `'features'` hiányzott az eredeti union-ból, holott a FeaturesBlock platform-szintű komponens. Az `isPlatformSectionType()` runtime helper Set-je is frissült.

### Tervezési döntések

| Döntés | Indok |
|--------|-------|
| 5 section, nem 7 | Footer + NavigationBar ≠ section — layout-szintű, template felelősség. Nem CMS → SectionRenderer flow-ba valók |
| Flat file struktúra | 1 definition = 1 fájl. Subdirectory overkill 5 fájlnál |
| Individual export typed (`SectionDefinition<T>`) | Consumer type safety: `heroDefinition.component` → `ComponentType<HeroBlockProps>` |
| `platformSections` array `SectionDefinition<any>[]` | `ComponentType<T>` kontravariant — mixed collection nem tud `Record<string, unknown>`-nak megfelelni. Az `any` bivariant, így a registry elfogadja |
| `faq` + `cta` type reserved, nincs definition | A types union-ban vannak, de komponens még nincs. Jövőbeli Phase-ben kapnak definíciót |
| Callback-ok (onClick, onSubmit) nem CMS-ből jönnek | A template/app réteg felelőssége a wiring. A section.data a szerializálható props-okat tartalmazza |

### Section → Component mapping

| Section Type | Component | Category | section.data típusa |
|---|---|---|---|
| `hero` | `HeroBlock` | marketing | `HeroBlockProps` |
| `features` | `FeaturesBlock` | marketing | `FeaturesBlockProps` |
| `about` | `AboutBlock` | content | `AboutBlockProps` |
| `contact` | `ContactBlock` | conversion | `ContactBlockProps` |
| `gallery` | `GalleryBlock` | content | `GalleryBlockProps` |

### SectionRenderer flow

```
CMS / JSON adat → SiteDataAdapter.load() → SiteData → Page.sections[]
                                                          ↓
Section { type: 'hero', data: { title, description, ... } }
                                                          ↓
SectionRenderer → registry.resolve('hero') → HeroBlock
                                                          ↓
<HeroBlock {...section.data} />
```

### API surface

```typescript
// Egyéni definíciók (typed)
import { heroDefinition, featuresDefinition } from '@spektra/sections'

// Teljes platform barrel
import { platformSections } from '@spektra/sections'
import { createSectionRegistry, registerSections } from '@spektra/runtime'

const registry = createSectionRegistry()
registerSections(registry, platformSections)

// Kliens override példa:
import { contactDefinition } from '@spektra/sections'
// → registry.register({ ...contactDefinition, component: CustomContactBlock })
```

### Boundary szabályok (eslint.config.cjs)

```
sections → [types, basics, elements, modules, wrappers, runtime]
```

A sections package az egyetlen, ami MINDKÉT irányba importálhat: components rétegeiből (basics–modules) ÉS runtime-ból. Ez a bridge szerepe.

### Függőségek

```
dependencies:
  @spektra/types       workspace:*
  @spektra/components  workspace:*
  @spektra/runtime     workspace:*

peerDependencies:
  react                ^18.0.0

devDependencies:
  @types/react         ^18.3.0
```

---

## Fázis 7 — @spektra/themes (...) · #16 `4f45cfe`

### Cél

Pure Tailwind CSS preset-ek — platform szintű design token-ök (szín, tipográfia, spacing). ZERO @spektra import, ZERO React. Build-time konfigurációk, nem runtime CSS változók.

### Fájlstruktúra

```
packages/themes/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts         ← barrel: basePreset, baseColors, baseTypography, corporatePreset, starterPreset
    ├── base.ts          ← baseColors (blue primary, purple secondary, 50–950), baseTypography (Inter + Lexend), basePreset
    ├── corporate.ts     ← corporateColors (sky primary, teal secondary), corporateTypography (Inter + Poppins), corporatePreset
    └── starter.ts       ← starterPreset — base alias, zero override
```

### Hierarchikus preset cascade

```
basePreset            ← platform foundation (colors, fonts, spacing)
├── corporatePreset   ← professional sky/teal palette, Poppins headings
├── starterPreset     ← zero override — base alias
└── (kliens preset)   ← tailwind.config.ts-ben: presets: [corporatePreset]
```

### Tervezési döntések

| Döntés | Indok |
|--------|-------|
| Pure Tailwind presets, nem runtime CSS vars | Build-time optimalizálás. Tailwind tree-shake-eli a nem használt class-okat. CSS vars runtime overhead |
| ZERO @spektra import | A themes package NEM importál semmit a platform-ból. Tailwind preset = standalone konfiguráció. Boundary: `allow: []` |
| ZERO React | Nincs JSX, nincs React import. `types: []` a tsconfig-ban (nincs @types/react) |
| `content: []` a basePreset-ben | A downstream preset `presets: [basePreset]` megköveteli, hogy a preset `Config`-nak feleljen meg. A `content: []` explicit üres, a végső tailwind.config.ts felülírja |
| `satisfies Config` / `satisfies Partial<Config>` | basePreset `satisfies Config` (teljes), downstream presetek `satisfies Partial<Config>` (a presets[] mező felveszi a base-t) |
| 50–950 tint scale | Tailwind 3.x convention. Teljes paletta: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950 |
| Szétválasztott colors/typography export | `baseColors` és `baseTypography` külön exportálva — consumer félhívhatja csak a színeket, ha custom font-ot akar |
| CVA nem bevezetve | YAGNI — a preset cascade és Record lookup elegendő. CVA értékelése Phase 8-ban, ha compound variant kell |

### Color palette-ek

| Preset | Primary | Secondary |
|--------|---------|-----------|
| base | blue (#3b82f6 500) | purple (#a855f7 500) |
| corporate | sky (#0ea5e9 500) | teal (#14b8a6 500) |
| starter | = base | = base |

### Typography

| Preset | Body (sans) | Display |
|--------|-------------|---------|
| base | Inter | Lexend |
| corporate | Inter | Poppins |
| starter | = base | = base |

### API surface

```typescript
// Preset használat kliens tailwind.config.ts-ben:
import { corporatePreset } from '@spektra/themes'
import type { Config } from 'tailwindcss'

export default {
  presets: [corporatePreset],
  content: ['./src/**/*.{ts,tsx}'],
} satisfies Config

// Vagy csak tokenek használata:
import { baseColors, baseTypography } from '@spektra/themes'
```

### Boundary szabályok (eslint.config.cjs)

```
themes → []   (ZERO @spektra import allowed)
```

A themes package izolált — sem runtime-ot, sem types-ot nem importál. Ez szándékos: a Tailwind preset-eknek nem kell tudniuk a platform típusrendszeréről.

### Függőségek

```
dependencies: (none)

devDependencies:
  tailwindcss          ^3.4.0
  typescript           ^5.9.3
```

---

## Fázis 8 — @spektra/templates (...) · #18 `5f8b585`

### Cél

Page template-ek — layout kompozíciók, amik összerakják a teljes oldalt: header slot → section terület → footer slot. A template a `SiteDataProvider` kontextusán belül él, `useSiteData()` hook-kal olvassa az adatot, és `SectionRenderer`-rel rendereli a page sections-öket.

A NavigationBar és FooterBlock NEM importálható közvetlenül (boundary rule: `templates → [types, runtime]`). Ehelyett **dependency injection**: a consumer app `ComponentType<TemplateShellProps>` props-ként adja be a header/footer komponenseket.

### Fájlstruktúra

```
packages/templates/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts               ← barrel: LandingTemplate + types
    ├── types.ts               ← TemplateShellProps, LandingTemplateProps
    └── LandingTemplate.tsx    ← single-page marketing template
```

### Tervezési döntések

| Döntés | Indok |
|--------|-------|
| Header/footer DI (`ComponentType<TemplateShellProps>`) | Boundary rule: `templates → [types, runtime]` — NEM importálhat components-ből. A consumer app wrapperben mappeli a SiteData-t a komponens props-aira |
| `TemplateShellProps = { siteData: SiteData }` | A teljes SiteData-t kapja a shell component, nem részleteket. A consumer a `siteData.navigation`, `siteData.site.name` stb. mezőkből szedi ki, amit akar |
| Template a `SiteDataProvider`-en belül | `useSiteData()` hook-kal kéri az adatot. A Provider a template FELETT van, az app gyökerénél |
| Loading/error a headert/footert nem rendereli | A shell komponenseknek kell a SiteData (navigáció, branding). Amíg nincs adat, nincs mit renderelni → csak loading/error state |
| `pageSlug` prop | Több oldalas SiteData esetén kiválasztja melyik page sections-jeit renderelje. Default: az első page |
| `className` prop felülírja a default layout-ot | Default: `min-h-screen flex flex-col`. Ha a consumer más layout-ot akar, felülírja |
| Csak `LandingTemplate` | YAGNI — a multi-page router template (BrowserRouter + Routes) jövőbeli Phase. A jelenlegi use case-ek (benettcar, starter) mind single-page |
| Nincs document title / meta kezelés | Az app réteg felelőssége. `useEffect(() => { document.title = ... })` vagy react-helmet-async |

### Data flow

```
App.tsx
├── SiteDataProvider adapter={adapter}
│   └── LandingTemplate registry={registry} header={AppHeader} footer={AppFooter}
│       ├── useSiteData() → { data, loading, error }
│       ├── loading? → loading prop vagy default text
│       ├── error? → error prop vagy default div
│       └── data?
│           ├── page = data.pages.find(slug) ?? data.pages[0]
│           ├── Header → <AppHeader siteData={data} />
│           ├── <main> → <SectionRenderer sections={page.sections} registry={registry} />
│           └── Footer → <AppFooter siteData={data} />
```

### Consumer használati minta

```typescript
import { SiteDataProvider } from '@spektra/runtime'
import { LandingTemplate } from '@spektra/templates'
import type { TemplateShellProps } from '@spektra/templates'
import { NavigationBar, FooterBlock } from '@spektra/components'

// Shell wrapper — maps SiteData to NavigationBar props
function AppHeader({ siteData }: TemplateShellProps) {
  return (
    <NavigationBar
      logoText={siteData.site.name}
      links={siteData.navigation.primary.map(item => ({
        label: item.label,
        href: item.href,
      }))}
    />
  )
}

// Shell wrapper — maps SiteData to FooterBlock props
function AppFooter({ siteData }: TemplateShellProps) {
  return (
    <FooterBlock
      logoText={siteData.site.name}
      description={siteData.site.description ?? ''}
      sections={[]}
      copyright={`© ${new Date().getFullYear()} ${siteData.site.name}`}
    />
  )
}

// App composition
function App() {
  return (
    <SiteDataProvider adapter={adapter}>
      <LandingTemplate
        registry={registry}
        header={AppHeader}
        footer={AppFooter}
      />
    </SiteDataProvider>
  )
}
```

### Boundary szabályok (eslint.config.cjs)

```
templates → [types, runtime]
```

A templates package NEM importálhat közvetlenül a components, sections, themes, vagy data rétegekből. Csak a types (type contracts) és runtime (SiteDataProvider, SectionRenderer, SectionRegistry) elérhető. Ez biztosítja, hogy a template layout-logika független a konkrét UI komponensektől.

### Függőségek

```
dependencies:
  @spektra/types       workspace:*
  @spektra/runtime     workspace:*

peerDependencies:
  react                ^18.0.0

devDependencies:
  @types/react         ^18.3.0
```

---

## Fázis 9 — @spektra/starter app (...) · #20 `e3f2fbb`

### Cél

Az első valódi Vite + React app, ami MINDEN platform package-et összefog. Demo adattal működik, scaffoldként szolgál új kliens projektek számára.

Ez az `apps/` mappa első lakója — a `pnpm-workspace.yaml` eddig üres `apps/*` glob-ja most kap tartalmat.

### Fájlstruktúra

```
apps/starter/
├── package.json               ← private app, ALL @spektra/* deps
├── tsconfig.json              ← bundler moduleResolution, noEmit: true
├── vite.config.ts             ← @vitejs/plugin-react
├── tailwind.config.ts         ← presets: [starterPreset] from @spektra/themes
├── postcss.config.js          ← tailwindcss + autoprefixer
├── index.html                 ← Inter + Lexend Google Fonts
└── src/
    ├── main.tsx               ← StrictMode + createRoot entry
    ├── index.css              ← @tailwind base/components/utilities
    ├── App.tsx                ← SiteDataProvider + LandingTemplate composition
    ├── data.ts                ← demoSiteData: SiteData — 5 section demo
    ├── registry.ts            ← createSectionRegistry + platformSections
    └── shell.tsx              ← AppHeader + AppFooter (DI wrappers)
```

### Tervezési döntések

| Döntés | Indok |
|--------|-------|
| `apps/starter/`, nem `packages/` | App, nem library — `private: true`, Vite build, nem tsc. A workspace config (`apps/*`) erre van kitalálva |
| ALL @spektra/* dependencies | A starter app az egyetlen hely, ahol MINDEN platform réteg találkozik: types, data, runtime, components, sections, themes, templates |
| `createJsonAdapter({ data: demoSiteData })` | Mock adapter — inline demo adat, nincs szerver dependency. Prod-ban `createWordPressAdapter()` vagy `createJsonAdapter({ url })` váltja |
| `AppHeader` / `AppFooter` shell wrappers | DI bridge: a template `ComponentType<TemplateShellProps>`-ot vár, a wrapper mappeli a SiteData-t NavigationBar/FooterBlock props-aira. Ez a template↔components boundary respect |
| `starterPreset` a tailwind.config.ts-ben | Platform default theme: blue primary, purple secondary, Inter + Lexend |
| `noEmit: true` tsconfig | App-ot Vite buildeli, nem tsc. A tsconfig csak IDE + type-check-hez kell |
| `bundler` moduleResolution | Vite-kompatibilis: nem kell `.js` extension-t írni import-oknál |
| Magyar demo tartalom | A célpiac nyelve. Az i18n overrideable a section props-okon keresztül |
| `picsum.photos` galéria | Placeholder képek — seed-alapú, determinisztikus URL-ek |

### Data flow (teljes E2E)

```
main.tsx → StrictMode → App
                          ↓
App.tsx
├── adapter = createJsonAdapter({ data: demoSiteData })
├── registry = createSectionRegistry() + registerSections(platformSections)
│
└── <SiteDataProvider adapter={adapter}>
        <LandingTemplate
            registry={registry}
            header={AppHeader}       ← shell.tsx
            footer={AppFooter}       ← shell.tsx
        />
    </SiteDataProvider>
                          ↓
LandingTemplate (useSiteData)
├── data.pages[0] (home)
├── <AppHeader siteData={data} />    → <NavigationBar logoText links />
├── <main>
│     <SectionRenderer sections={page.sections} registry={registry} />
│     ├── hero-1   → <HeroBlock title subtitle description primaryCTA secondaryCTA />
│     ├── features-1 → <FeaturesBlock title subtitle columns features />
│     ├── about-1  → <AboutBlock title subtitle content imagePosition stats />
│     ├── gallery-1 → <GalleryBlock title subtitle description showCategories images />
│     └── contact-1 → <ContactBlock title subtitle description contactInfo />
│   </main>
└── <AppFooter siteData={data} />    → <FooterBlock logoText description sections copyright />
```

### Build output

```
dist/index.html                    0.71 kB │ gzip:  0.40 kB
dist/assets/index-[hash].css       5.08 kB │ gzip:  1.51 kB
dist/assets/index-[hash].js      190.54 kB │ gzip: 60.82 kB
```

### Package-ok közti kapcsolat

```
@spektra/starter (app)
├── @spektra/types       ← type contracts
├── @spektra/data        ← createJsonAdapter
├── @spektra/runtime     ← SiteDataProvider, createSectionRegistry, registerSections
├── @spektra/components  ← NavigationBar, FooterBlock (shell.tsx-ben)
├── @spektra/sections    ← platformSections barrel
├── @spektra/themes      ← starterPreset (tailwind.config.ts-ben)
└── @spektra/templates   ← LandingTemplate
```

### @spektra/themes exports fix

A Vite build során kiderült, hogy a Tailwind config loader (jiti) `require()`-t használ, ami az ESM-only `exports` map-ot nem találta. Fix: `"require": "./dist/index.js"` hozzáadva a themes package.json exports-hoz.

### Függőségek

```
dependencies:
  @spektra/types       workspace:*
  @spektra/data        workspace:*
  @spektra/runtime     workspace:*
  @spektra/components  workspace:*
  @spektra/sections    workspace:*
  @spektra/themes      workspace:*
  @spektra/templates   workspace:*
  react                ^18.3.0
  react-dom            ^18.3.0

devDependencies:
  @types/react         ^18.3.0
  @types/react-dom     ^18.3.0
  @vitejs/plugin-react ^4.3.0
  autoprefixer         ^10.4.0
  postcss              ^8.4.0
  tailwindcss          ^3.4.0
  vite                 ^5.4.0
```

---

## Post-Phase 9 — v1 Stabilitási és Konzisztencia Fixek

> A Phase 1–9 bootstrap után azonosított strukturális hiányosságok javítása.
> Ezek nem új feature-ök, hanem a meglévő contractok élesítése: publish surface, serializable data, egységes content model, type safety boundaries, runtime validáció.
> 6 update, commit #22–#28.

---

### Update #1 — Build stabilitás audit (2026-03-19) · #22 `30bd7e3`

**Probléma:** `TS2688: Cannot find type definition file for 'react'` a templates package-nél.

**Diagnózis:** A `pnpm install` nem futott le teljesen — 403-as registry fetch hiba a `react-dom` tarball-nál. Az `@types/react` symlink hiányzott a `node_modules`-ból. Ez **környezeti probléma** (hálózat/proxy/auth), nem kódhiba.

**Audit eredménye:**

| Package | react peer | @types/react dev | tsconfig types |
|---------|-----------|-----------------|---------------|
| types | — | — | `[]` ✅ |
| data | — | — | `[]` ✅ |
| themes | — | — | `[]` ✅ |
| runtime | ✅ | ✅ | `["react"]` ✅ |
| components | ✅ | ✅ | `["react"]` ✅ |
| sections | ✅ | ✅ | `["react"]` ✅ |
| templates | ✅ | ✅ | `["react"]` ✅ |

**Eredmény:** Minden package korrekt. React-függők: `react` peerDep + `@types/react` devDep + `types: ["react"]`. Nem-React package-ek: `types: []` (explicit üres). Ha a registry fetch sikeres, `pnpm build` 8/8 PASS.

**Javaslat 403 ismétlődése esetén:** `.npmrc` proxy/auth settings ellenőrzés, vagy `pnpm store prune && pnpm install --force`.

**Kódmódosítás:** Nincs — strukturálisan rendben van.

---

### Update #2 — Publish surface + szerializálható CTA contract (2026-03-19) · #23 `21ac257`

Két logikailag összefüggő fix egy commitban: a templates package publish surface hiánya + a CTA callback → href refaktor.

#### 2a) Templates publish surface fix

**Probléma:** A `@spektra/templates` package.json-ból hiányzott az `exports`, `files`, és `publishConfig` mező, miközben a többi publisholható package használja ezeket. Workspace-ben működött, de publish/distribution szinten inkonzisztens volt.

**Fix:**

```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js"
  }
},
"files": ["dist"],
"publishConfig": {
  "access": "public"
}
```

**Döntés:** `require` export szándékosan kihagyva — az csak a themes-nél kellett (jiti/Tailwind config loader). A templates-t kizárólag ESM-ből importálják React appok.

#### 2b) Szerializálható CTA contract

**Probléma:** A HeroBlock és AboutBlock CTA propjai `onClick: () => void` callback-ot vártak. A starter demo data is `onClick: () => {}` függvényeket tartalmazott. Amíg inline mock adat jön, ez működik — de CMS/JSON payload-ból függvényt nem lehet deszerializálni. A `SectionRenderer` simán spread-eli a `section.data`-t propként, tehát ez valós design-törés.

**Érintett komponensek:**

| Komponens | Előtte | Utána |
|-----------|--------|-------|
| `HeroBlock.primaryCTA` | `{ text: string, onClick: () => void }` | `CallToAction` |
| `HeroBlock.secondaryCTA` | `{ text: string, onClick: () => void }` | `CallToAction` |
| `AboutBlock.cta` | `{ text: string, onClick: () => void }` | `CallToAction` |

**Új type:** `packages/types/src/cta.ts`

```typescript
export interface CallToAction {
  text: string
  href?: string
}
```

**Változtatások:**

1. `CallToAction` interface hozzáadva az `@spektra/types`-hoz (új fájl: `cta.ts`, export az `index.ts`-ben)
2. `HeroBlock` / `AboutBlock`: CTA propok `CallToAction`-re cserélve, render: `<Button onClick>` → `<a href>`
3. Starter demo data: `onClick: () => {}` → `href: '#contact'` / `'#features'`

**Nem érintett:** `ContactBlock.onSubmit` — ez optional runtime callback, nem CMS data (a demo data nem is tartalmazza). A `NavigationBar` CTA és link onClick-jai szintén nem érintettek — ezek shell-level DI propok, nem SectionRenderer spread.

**Contract:** CMS/JSON payload → `Section<T>` → `SectionRenderer` spread → component `<a href>`. Függvény sehol nem szerepel az adat-felületen.

---

### Update #3 — Media modell egységesítés (2026-03-19) · #24 `712034c`

**Probléma:** A `@spektra/types` deklarálja a kanonikus `Media` modellt (`src`, `alt`, `width?`, `height?`, `variants?`, `mimeType?`), de a komponensek nem használták:

- `HeroBlock.backgroundImage?: string` — sima string
- `AboutBlock.image?: string` — sima string, alt text a `title`-ből jött
- `GalleryBlock` — saját lokális `GalleryImage { src, alt, category? }` interface

**Fix:**

| Komponens | Előtte | Utána |
|-----------|--------|-------|
| `HeroBlock` | `backgroundImage?: string` | `backgroundImage?: Media` → `.src` a CSS `url()`-ben |
| `AboutBlock` | `image?: string`, `alt={title}` | `image?: Media` → `.src` + `.alt` (helyes alt text) |
| `GalleryBlock` | lokális `GalleryImage { src, alt, category? }` | `Media & { category?: string }` (re-export `GalleryImage` típusként) |

**Starter demo data:** Nem igényelt módosítást — a gallery items `{ src, alt, category }` struktúrája kielégíti a `Media & { category? }` contractot, hero/about nem használ képet a demo-ban.

**Nem érintett:** `FooterBlock.logo?: string` és `NavigationBar.logo?: string` — ezek shell-level DI propok, nem CMS section data. `Logo` komponens szöveges, nem használ képet.

**Eredmény:** A platform content modellje egységes: `CallToAction` (CTA) + `Media` (képek) — mindkettő szerializálható, CMS-kompatibilis, a kanonikus `@spektra/types`-ból jön.

---

### Update #4 — Type erasure boundaries (2026-03-20) · #26 `2dfdb17`

**Commit:** `fix(runtime): explicit type erasure boundaries in section pipeline`

**Probléma:** A section pipeline-ban implicit `any` castok voltak szétszórva: a `SectionDefinition<T>` generic type a registry-ben elveszett, de ez sehol nem volt dokumentálva vagy tudatosan kezelve. A `platformSections` barrel `SectionDefinition<any>[]` típust használt, de ez „véletlenül" működött, nem szándékos architekturális döntés volt.

**Fix — 3 fájl, 1 konzisztens pattern:**

#### 1) `AnySectionDefinition` type (types.ts)

```typescript
export type AnySectionDefinition = SectionDefinition<any>
```

Explicit type alias a típustörlési határhoz. JSDoc komment dokumentálja, hogy ez SZÁNDÉKOS: a heterogén collection-ökben (registry Map, platformSections barrel) nem tartható meg az egyedi `T`. A típusbiztonság a definíció oldalán él, nem a tárolási/render oldalán.

#### 2) Registry interface (section-registry.ts)

`SectionRegistry.register()` → `AnySectionDefinition`-t vár.
`SectionRegistry.resolve()` → `ComponentType<any>`-t ad vissza.
`registerSections()` → `readonly AnySectionDefinition[]`-t fogad.

Minden `// eslint-disable-next-line @typescript-eslint/no-explicit-any` kommenttel jelölve — a disable TUDATOS, nem lustaság.

#### 3) SectionRenderer (section-renderer.tsx)

```typescript
return <Component key={section.id} {...section.data as Record<string, unknown>} />
```

A `section.data` spread-je explicit `as Record<string, unknown>` casttal történik. JSDoc kommentek dokumentálják, hogy ez „a típustörlési határ másik oldala": a garanciát a regisztrációs oldal adja (`SectionDefinition<T>` compiler-ellenőrzés), nem a renderelési oldal.

**Architektúrális döntés:** A type erasure boundary koncepció a platform egyik alapvető mintája. `SectionDefinition<HeroBlockProps>` → compile-time safe a definíció helyén. A registry/barrel/renderer oldalon tudatosan `any` — nincs `unknown` erőltetés, mert az hamis biztonságérzetet adna és felesleges runtime castokat igényelne.

---

### Update #5 — Runtime SiteData validáció (2026-03-20) · #27 `0e2057b`

**Commit:** `feat(data): runtime SiteData validation at adapter boundary`

**Probléma:** Az adapterek (`createJsonAdapter`, `createWordPressAdapter`) bíztak a forrásadatban: a fetch response-t vagy az inline `data`-t közvetlenül `SiteData`-ként kezelték. CMS- vagy JSON-hibás payload csendben jutott el a UI-ig, ahol értelmezhetetlen hibákat okozott (Cannot read property 'map' of undefined, stb.).

**Fix — új fájl: `packages/data/src/validate.ts`**

```typescript
export type SiteDataValidationResult =
  | { valid: true; data: SiteData }
  | { valid: false; errors: string[] }

export function validateSiteData(input: unknown): SiteDataValidationResult
```

**Validált struktúra:**

| Mező | Ellenőrzés |
|------|-----------|
| `site` | object, `name` string, opcionális `description`/`url`/`locale` string |
| `navigation` | object, `primary` array (NavItem validáció), opcionális `footer` array |
| `navigation[].items` | `label` + `href` string, opcionális `external` boolean, rekurzív `children` |
| `pages` | array, min 1 elem, minden page validálva |
| `pages[].slug` | string kötelező |
| `pages[].title` | opcionális string |
| `pages[].sections` | array, minden section validálva |
| `pages[].meta` | opcionális: `title`, `description`, `canonical` string, `ogImage` Media |
| `sections[].id` | string kötelező |
| `sections[].type` | string kötelező |
| `sections[].data` | defined (nem null/undefined) |
| `sections[].meta` | opcionális: `label` + `category` string, opcionális `description` |
| Media (ogImage) | `src` + `alt` string |

**Adapter integráció (`json-adapter.ts`):**

- `fetchFromUrl()` → fetch után `validateSiteData(json)` — invalid response-nál részletes hibaüzenet
- `validateInlineData()` → inline `config.data` is validálva — dev/mock hibákat is megfogja
- Mindkét esetben: `if (!result.valid) throw new Error(result.errors.join('; '))`

**Publikus API (`index.ts`):**

```typescript
export { validateSiteData } from './validate'
export type { SiteDataValidationResult } from './validate'
```

A `validateSiteData` publikus — kliensek is használhatják saját adapter-jeikben vagy teszteléshez.

**Nem validált:** Section `data` tartalma (az section-specifikus, a platform validator nem ismeri a HeroBlockProps-ot). A deep section data validáció a section definition felelőssége lehetne (opcionális `validate` hook a `SectionDefinition`-ben — jövőbeli bővítés).

---

### Update #6 — Validációs gap-ek javítása (2026-03-20) · #28 `9fb4581`

**Commit:** `fix(data): tighten runtime validation gaps`

**Probléma:** Az Update #5-ben bevezetett `validateSiteData()` 4 gyenge pontot tartalmazott az első code review alapján.

**Javított gap-ek:**

#### 1) `NavItem.external` mező (validate.ts)

**Előtte:** Nem validálta az `external` mezőt — bármilyen típus átment.
**Utána:** `if (item.external !== undefined && typeof item.external !== 'boolean')` → hibaüzenet.

#### 2) `Page.title` mező (validate.ts)

**Előtte:** `Page.title`-t nem ellenőrizte (opcionális string az `@spektra/types`-ban, de a validator figyelmen kívül hagyta).
**Utána:** `assertOptionalString(page, 'title', path, errors)` — ha létezik, string kell legyen.

#### 3) `Section.meta` mezők (validate.ts)

**Előtte:** `section.meta` létezését ellenőrizte, de a belső mezőit (`label`, `category`, `description`) nem.
**Utána:** Új `validateSectionMeta()` belső függvény: `label` és `category` kötelező string, `description` opcionális string.

#### 4) JSON adapter inline data bypass (json-adapter.ts)

**Előtte:** `createJsonAdapter({ data: inlineData })` esetén a `config.data` közvetlenül ment tovább — a `validateSiteData()` csak a fetch path-on futott.
**Utána:** Új `validateInlineData()` helper — az inline `data` is átmegy a validáción.

**Eredmény:** A teljes SiteData outer shape validálva van az adapter határon — fetch és inline path egyaránt. A validator 195 soros, ~20 ellenőrzési pontra bontva.
