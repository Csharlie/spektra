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

## Fázis 2 — @spektra/types (...)

> _Következő fázis — ide kerül a dokumentáció._
