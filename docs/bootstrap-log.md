# Spektra Platform — Bootstrap Log

Kronológikus napló: mi jött létre, mikor, miért.

---

## Fázis 1 — Monorepo csontváz (2026-03-19)

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

## Fázis 2 — @spektra/types (2026-03-19)

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

## Post-Phase 2 — Audit fix (2026-03-19)

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

## Fázis 3 — @spektra/data (...)

> _Következő fázis — ide kerül a dokumentáció._
