## [0.13.1](https://github.com/Csharlie/spektra/compare/engine-v0.13.0...engine-v0.13.1) (2026-01-18)

### 🐛 Bug Fixes

* **core:** add type assertions for Section data to resolve TypeScript errors ([32b7715](https://github.com/Csharlie/spektra/commit/32b7715ca9cc5c919e60515471105c6b654d3642))

## [0.13.0](https://github.com/Csharlie/spektra/compare/engine-v0.12.1...engine-v0.13.0) (2026-01-18)

### ✨ Features

* add demo package to pnpm workspace and enhance project creation script ([3929524](https://github.com/Csharlie/spektra/commit/3929524222a3d0ddbf664a1677248f94a35adb45))
* update Navigation component styles and add demo-02 package to workspace ([678467d](https://github.com/Csharlie/spektra/commit/678467d3504acbd2d8a1b47157c35f18502f8ec9))

### 🐛 Bug Fixes

* **Navigation:** change nav class from sticky to fixed for better positioning ([aecd1ee](https://github.com/Csharlie/spektra/commit/aecd1ee2be554cdcb1ce1e07d8930be60b60d631))

### ♻️ Code Refactoring

* **engine:** replace any types with unknown for type safety ([9b7b978](https://github.com/Csharlie/spektra/commit/9b7b978c5fa1241dd66baf2ae7bfb2bfcb7ff289))

### 🔨 Maintenance

* **engine:** update pnpm-lock.yaml to fix CI frozen-lockfile error ([7f80214](https://github.com/Csharlie/spektra/commit/7f8021466b67184b99c2b04593a941ada0b2cafd))
* remove demo from workspace, keep it gitignored ([2a5f084](https://github.com/Csharlie/spektra/commit/2a5f084186ca4d4e3ae593cc05e817fc64ed6d10))

## [0.12.1](https://github.com/Csharlie/spektra/compare/engine-v0.12.0...engine-v0.12.1) (2026-01-17)

### 🐛 Bug Fixes

* **core:** mobil navigáció pozícionálás javítása absolute-ra ([e092bec](https://github.com/Csharlie/spektra/commit/e092becdd9f8f4c7414032417fe9344bcd6b3a13))

## [0.12.0](https://github.com/Csharlie/spektra/compare/engine-v0.11.0...engine-v0.12.0) (2026-01-16)

### ✨ Features

* add specific package 'bcb-test-01' to pnpm workspace configuration ([23d3afe](https://github.com/Csharlie/spektra/commit/23d3afebc0300dfaaaf8acdb2152f2525e59661b))

## [0.11.0](https://github.com/Csharlie/spektra/compare/engine-v0.10.1...engine-v0.11.0) (2026-01-13)

### ✨ Features

* add data attributes for improved accessibility and UI testing ([df2bc69](https://github.com/Csharlie/spektra/commit/df2bc6932a66e7bd0df6047b79fab8ec77b825d1))

## [0.10.1](https://github.com/Csharlie/spektra/compare/engine-v0.10.0...engine-v0.10.1) (2026-01-12)

### ⚠ BREAKING CHANGES

* Major architectural simplification

- Rename components/ui  components/primitives for clearer atomic design terminology
- Remove @spektra/themes package entirely (corporate, ecommerce themes)
- Remove DesignSystemContext and design system infrastructure
- Update all imports across engine and templates
- Update documentation (storybook, guardrails, testing) with new paths
- Move Button, Input, Textarea, Card to primitives folder
- Update package.json exports to reflect new structure
- Clean up workspace config (remove bellator project)
- Enhance create-project script with workspace config auto-update

This simplification reduces complexity and aligns with the core principle
that theming should be handled at the project level, not in the engine.

### ♻️ Code Refactoring

* simplify architecture - rename ui to primitives and remove themes package ([74a047c](https://github.com/Csharlie/spektra/commit/74a047c464c9865199a810855f3fb30e2e147c41))

## [0.10.0](https://github.com/Csharlie/spektra/compare/engine-v0.9.0...engine-v0.10.0) (2026-01-11)

### ✨ Features

* implement routeline template with structured data and page components ([bef0149](https://github.com/Csharlie/spektra/commit/bef0149767c342a1a7ae93c84a137692c0c8a113))

## [0.9.0](https://github.com/Csharlie/spektra/compare/engine-v0.8.3...engine-v0.9.0) (2026-01-11)

### ✨ Features

* add routeline template with routing and AppShell components ([fee2608](https://github.com/Csharlie/spektra/commit/fee26086e6986293b7453fefd588d53b750063b6))

## [0.8.3](https://github.com/Csharlie/spektra/compare/engine-v0.8.2...engine-v0.8.3) (2026-01-11)

### ♻️ Code Refactoring

* remove Bellator project files and configurations ([2099b55](https://github.com/Csharlie/spektra/commit/2099b551a6c6211c153bb3209bd3d0c9f1ba802b))

## [0.8.2](https://github.com/Csharlie/spektra/compare/engine-v0.8.1...engine-v0.8.2) (2026-01-11)

## [0.8.1](https://github.com/Csharlie/spektra/compare/engine-v0.8.0...engine-v0.8.1) (2026-01-11)

### 🔨 Maintenance

* **pages:** add LandingPage component and project-specific UI structure ([a218a00](https://github.com/Csharlie/spektra/commit/a218a008f78b4013c15deb8685ebf2bbb8551f47))

## [0.8.0](https://github.com/Csharlie/spektra/compare/engine-v0.7.0...engine-v0.8.0) (2026-01-11)

### ✨ Features

* **scripts:** add interactive create-project script with brand integration ([4eea1dc](https://github.com/Csharlie/spektra/commit/4eea1dc32b4a9325a5313b10051526fa16b4a579))

## [0.7.0](https://github.com/Csharlie/spektra/compare/engine-v0.6.2...engine-v0.7.0) (2026-01-11)

### ⚠ BREAKING CHANGES

* **templates:** Project creation now uses engine/templates/baseline instead of projects/baseline

Migration path:
- Use 'node scripts/create-client.js' for new projects
- projects/baseline removed (2026-01-11)
- Template is now the single source of truth

Refs: baseline promotion, template scaffolding

### ✨ Features

* **templates:** promote baseline to canonical project template ([131bda8](https://github.com/Csharlie/spektra/commit/131bda89d0a50109862fc3c16fb1e271bf8060bf))

## [Unreleased]

### ✨ Features

* **templates:** Promote projects/baseline to canonical project template at engine/templates/baseline

### 🔨 Maintenance

* **templates:** Archive original projects/baseline as deprecated reference
* **scripts:** Update create-client.js to use engine/templates/baseline
* **docs:** Add comprehensive template documentation and usage guidelines

## [0.6.2](https://github.com/Csharlie/spektra/compare/engine-v0.6.1...engine-v0.6.2) (2026-01-11)

### ⚠ BREAKING CHANGES

* **core:** Architectural refactoring for naming clarity

## Changes

### Renamed Components
- LandingPageTemplate  LandingLayout
- LandingPageTemplateProps  LandingLayoutProps

### Folder Structure
- engine/packages/core/components/templates/  layouts/
- Created engine/templates/ for future project scaffolding

### Updated Imports/Exports
- @spektra/core exports updated
- package.json exports map updated
- All project imports updated (baseline, autozeno)
- All test files updated
- All documentation updated

## Rationale

Establishes clear separation:
- 'layout' = UI page composition (React components)
- 'template' = project scaffolding (future use)

This eliminates naming ambiguity and prevents confusion between
UI components and project starter templates.

## Migration Guide

Projects using LandingPageTemplate must update imports:

\\\	ypescript
// Before
import { LandingPageTemplate } from '@spektra/core';

// After
import { LandingLayout } from '@spektra/core';
\\\

Component usage remains identical, only the name changes.

### ♻️ Code Refactoring

* **core:** rename UI templates to layouts (v0.6.2) ([6a5899e](https://github.com/Csharlie/spektra/commit/6a5899e4c875b0e8879cf660059dc247bfbf503a)), closes [#architecture](https://github.com/Csharlie/spektra/issues/architecture)

## [0.6.1](https://github.com/Csharlie/spektra/compare/engine-v0.6.0...engine-v0.6.1) (2026-01-10)

## [0.6.0](https://github.com/Csharlie/spektra/compare/engine-v0.5.2...engine-v0.6.0) (2026-01-10)

### ✨ Features

* Storybook integrated ([463af55](https://github.com/Csharlie/spektra/commit/463af5541770eb9995a6ff84939ee28dddecf911))

### 🐛 Bug Fixes

* **themes:** add explicit type annotation to Hero.stories meta ([9f25aaf](https://github.com/Csharlie/spektra/commit/9f25aaf10fce609d73fe1c92e5b67551f2c1ed32))

## [0.5.2](https://github.com/Csharlie/spektra/compare/engine-v0.5.1...engine-v0.5.2) (2026-01-10)

### 🔨 Maintenance

* **docs:** Add Release Communication Strategy documentation ([0ca0771](https://github.com/Csharlie/spektra/commit/0ca077122cd0f92b4627891c7f843d4c0ca019bb))

## [0.5.1](https://github.com/Csharlie/spektra/compare/engine-v0.5.0...engine-v0.5.1) (2026-01-10)

### 📚 Documentation

* **engine:** update README with current version and release process details ([42e469e](https://github.com/Csharlie/spektra/commit/42e469e0575a5393cb6254c308473dc0b3ec16e7))

## [0.5.0](https://github.com/Csharlie/spektra/compare/engine-v0.4.0...engine-v0.5.0) (2026-01-10)

### ✨ Features

* add comprehensive CI pipeline documentation for GitHub Actions ([41735f1](https://github.com/Csharlie/spektra/commit/41735f1a87189bd3338e0b5648e080af9c8d543c))
* add continuous integration workflow with GitHub Actions ([5738f80](https://github.com/Csharlie/spektra/commit/5738f80f633b27f6b6aa77203c6fbc9d2baeafa5))
* **core:** validate semantic-release stability ([e2557cc](https://github.com/Csharlie/spektra/commit/e2557cc9014926176f143269e176484703832d6b))
* **engine:** add README documentation ([5a69ca4](https://github.com/Csharlie/spektra/commit/5a69ca4afbb8f9e122c0624f6de61b49d4c88658))
* **engine:** prepare CHANGELOG for semantic-release automation ([e036796](https://github.com/Csharlie/spektra/commit/e036796cd58571654a9635ad7caac81c95ffe9b9))
* **tests:** implement comprehensive testing strategy and initial test cases ([cdaaf36](https://github.com/Csharlie/spektra/commit/cdaaf3680af667c6af27d3cbf3dd6a5a0bf45a7e))

### 🐛 Bug Fixes

* **ci:** enable git credentials for semantic-release push ([692e62c](https://github.com/Csharlie/spektra/commit/692e62cb9704e10bdc91b8dc1b0a9405fab6967d))
* **ci:** upgrade Node.js to v22 for semantic-release v25 compatibility ([9f669d9](https://github.com/Csharlie/spektra/commit/9f669d974823e033a914ed475f0b2548f20ba3a2))
* **ci:** upgrade Node.js version to 20 for semantic-release compatibility ([9bab414](https://github.com/Csharlie/spektra/commit/9bab414a8793d9d5f83aa1b14e130408aa3d1e6c))
* **engine:** correct releaseRules syntax in semantic-release config ([024c2aa](https://github.com/Csharlie/spektra/commit/024c2aa6238a1f60ef56d0fc34e4ce7032956384))
* **tests:** exclude test folders from TypeScript build ([fd06fe2](https://github.com/Csharlie/spektra/commit/fd06fe20398856aa91a2fbd5e312c8634f8e770f))
* update package versions to 0.4.0 across all packages ([c5bae13](https://github.com/Csharlie/spektra/commit/c5bae1362e88b6add3d176144ea509ff5804a061))

### 📚 Documentation

* add version history documentation for v0.1.0-legacy and v0.4.0 ([49b1e2f](https://github.com/Csharlie/spektra/commit/49b1e2fd5a8898070988d7c0a86b92a9c5c72d72))

### 🧪 Tests

* **engine:** validate release automation pipeline ([c306416](https://github.com/Csharlie/spektra/commit/c306416255c65abf65b4d267c8e549e7a10120e3))

### ⚙️ CI/CD

* **engine:** add debug output and fix pnpm version ([9ae6c49](https://github.com/Csharlie/spektra/commit/9ae6c49142ee1b1cf80677a5087c4bafea19cf91))
* **engine:** enable tag fetching in checkout action ([a388553](https://github.com/Csharlie/spektra/commit/a388553fefdeeae504f9d2d2446a884239190301))
* **engine:** retrigger release after baseline tag fix ([d28df5b](https://github.com/Csharlie/spektra/commit/d28df5bf33bf377d635474de7a206de8abcca685))
* **engine:** simplify workflow - remove path filters and complexity ([2f7fb23](https://github.com/Csharlie/spektra/commit/2f7fb23b273b5d9cf86e781fc8ab259a17ca479e))

### 🔨 Maintenance

* **ci:** add conventional-changelog-conventionalcommits dependency ([991e064](https://github.com/Csharlie/spektra/commit/991e0640eb0f4b643dcb71e3642afe9828f0f8db))
* **ci:** add semantic-release dependencies ([58464f6](https://github.com/Csharlie/spektra/commit/58464f69c3173262066c400f438f14d21ef5e059))
* **engine:** enforce deterministic versioning for all changes ([c7ba304](https://github.com/Csharlie/spektra/commit/c7ba3040813198dfc5720b298bd935ccb827a72a))
* **engine:** establish semantic-release baseline at v0.4.0 ([122d101](https://github.com/Csharlie/spektra/commit/122d101987281edbf19b7b6f836f519dc63c4354))
* **engine:** harden commit analysis rules and CI safety ([da7769b](https://github.com/Csharlie/spektra/commit/da7769bc4da8403ecf3fa1e471f15143dbb12188))
* **engine:** implement automated release system with semantic-release ([27b07eb](https://github.com/Csharlie/spektra/commit/27b07eb57ba0892faca3c48a1654145ae3ca1f75))
* **engine:** start clean semantic-release history after v0.4.0 ([2c5fbbb](https://github.com/Csharlie/spektra/commit/2c5fbbbb7ac39b3a50f9f663c7f54aa478513c74))

# Changelog

All notable changes to the Spektra Engine will be documented in this file.

This file is automatically generated by [semantic-release](https://github.com/semantic-release/semantic-release).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]
