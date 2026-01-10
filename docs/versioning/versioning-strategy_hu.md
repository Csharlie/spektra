# Verziókezelési Stratégia

## Kontextus

A Spektra egy platform két különálló réteggel:
- **Engine csomagok** - Újrafelhasználható, kliens-agnosztikus platform kód
- **Project alkalmazások** - Kliens-specifikus telepíthető alkalmazások

Minden rétegnek különböző verziókezelési igényei vannak:
- Az engine verziók az API stabilitást kommunikálják a fogyasztók felé
- A projekt verziók a deployment mérföldköveket követik
- Az egyik réteg változásai lehetnek vagy nem lehetnek hatással a másikra

Világos verziókezelési szabályok nélkül a csapatok nem tudják:
- Megállapítani, hogy egy frissítés biztonságos-e
- Megérteni a törő vs. nem törő változtatásokat
- Nyomon követni, mi változott a kiadások között
- Koordinálni a frissítéseket a workspace-ek között

## Döntés

A Spektra **Szemantikus Verziókezelést (SemVer)** használ réteg-specifikus értelmezéssel.

### SemVer Formátum

```
MAJOR.MINOR.PATCH

Példa: 2.3.5
```

| Verzió | Jelentés | Mikor Emeljük | Példa |
|---------|---------|--------------|---------|
| **MAJOR** | Törő változás | API változások, architektúra változások | `1.x.x → 2.0.0` |
| **MINOR** | Új funkció | Új komponensek, új funkciók | `2.1.x → 2.2.0` |
| **PATCH** | Bug javítás | Javítások, refaktorálások, dokumentációk | `2.3.4 → 2.3.5` |

### Pre-release-ek

```
2.0.0-alpha.1   # Korai tesztelés
2.0.0-beta.1    # Funkció teljes, tesztelés
2.0.0-rc.1      # Release candidate
2.0.0           # Stabil kiadás
```

## Struktúra

### Engine Verziókezelés

Minden engine csomagnak saját verziója van:

```json
// engine/packages/core/package.json
{
  "name": "@spektra/core",
  "version": "1.2.3"
}

// engine/packages/themes/package.json
{
  "name": "@spektra/themes",
  "version": "1.0.5"
}
```

**Kulcs elv:** A csomagok különböző ütemben fejlődhetnek.

### Project Verziókezelés

A projektek használhatnak vagy nem használhatnak verziókat:

```json
// projects/bellator/package.json
{
  "name": "bellator",
  "version": "1.0.0",  // Opcionális
  "private": true
}
```

**Kulcs elv:** A projekt verziók deployment mérföldköveket követnek, nem API stabilitást.

### Függőség Verziókezelés

#### Engine → Engine (Workspace Protocol)

```json
// engine/packages/core/package.json
{
  "dependencies": {
    "@spektra/themes": "workspace:*"
  }
}
```

**Jelentés:** Mindig a legfrissebb lokális verziót használja (fejlesztés során).

#### Project → Engine (Link Protocol)

```json
// projects/bellator/package.json
{
  "dependencies": {
    "@spektra/core": "link:../../engine/packages/core"
  }
}
```

**Jelentés:** Mindig a lokális engine-t használja (fejlesztés során).

#### Publikált Verziók (Jövőbeli)

```json
{
  "dependencies": {
    "@spektra/core": "^2.1.0"
  }
}
```

**Jelentés:** Fogadj el minor és patch frissítéseket, major-t nem.

## Szabályok

### Engine Csomag Verziókezelés

#### MAJOR Verzió Emelés (Törő Változások)

Emeld a MAJOR-t amikor:

1. **Publikus API változások**
   ```typescript
   // v1.x.x
   export const Button: React.FC<ButtonProps> = ({ label }) => ...
   
   // v2.0.0 - MAJOR emelés
   export const Button: React.FC<ButtonProps> = ({ children }) => ...
   // Törő: 'label' prop eltávolítva
   ```

2. **Komponens prop interface változások**
   ```typescript
   // v1.x.x
   interface HeroProps {
     title: string;
   }
   
   // v2.0.0 - MAJOR emelés
   interface HeroProps {
     data: HeroData;  // Törő: alakzat változott
   }
   ```

3. **Architekturális változások**
   - UI rétegek hozzáadása vagy eltávolítása
   - Réteg felelősségek változtatása
   - Új guardrail szabályok, amelyek megtörik a meglévő kódot

4. **Függőség major frissítések**
   ```json
   // v1.x.x
   "react": "^18.0.0"
   
   // v2.0.0 - MAJOR emelés
   "react": "^19.0.0"
   ```

5. **Eltávolított komponensek vagy funkciók**
   ```typescript
   // v1.x.x
   export { OldComponent } from './OldComponent';
   
   // v2.0.0 - MAJOR emelés
   // OldComponent eltávolítva
   ```

#### MINOR Verzió Emelés (Új Funkciók)

Emeld a MINOR-t amikor:

1. **Új komponensek hozzáadva**
   ```typescript
   // v1.2.x
   export { Button, Input } from './ui';
   
   // v1.3.0 - MINOR emelés
   export { Button, Input, Badge } from './ui';
   // Nem törő: Badge új
   ```

2. **Új props (opcionális) hozzáadva**
   ```typescript
   // v1.2.x
   interface ButtonProps {
     children: React.ReactNode;
   }
   
   // v1.3.0 - MINOR emelés
   interface ButtonProps {
     children: React.ReactNode;
     icon?: React.ReactNode;  // Opcionális: nem törő
   }
   ```

3. **Új opcionális funkciók**
   - Új design system tokenek
   - Új utility függvények
   - Új hook-ok

4. **Nem törő függőség frissítések**
   ```json
   // v1.2.x
   "clsx": "^1.2.0"
   
   // v1.3.0 - MINOR emelés
   "clsx": "^2.0.0"  // Ha nincs törő változás a használatban
   ```

5. **Javított validáció vagy eszközök**
   - Új ESLint szabályok, amelyek nem törik a meglévő kódot
   - Jobb hibaüzenetek
   - Teljesítmény javítások

#### PATCH Verzió Emelés (Bug Javítások)

Emeld a PATCH-et amikor:

1. **Bug javítások**
   ```typescript
   // v1.2.4
   const result = value + 1;  // Bug: rossz számítás
   
   // v1.2.5 - PATCH emelés
   const result = value * 2;  // Javítva
   ```

2. **Dokumentáció frissítések**
   - README változások
   - JSDoc javítások
   - Példák hozzáadva

3. **Refaktorálás (nincs viselkedés változás)**
   ```typescript
   // v1.2.4 - Rendetlen kód
   const x = a + b; const y = x * 2; return y;
   
   // v1.2.5 - PATCH emelés - Refaktorálva
   return (a + b) * 2;
   ```

4. **Stílus javítások**
   - CSS bug javítások
   - Vizuális javítások, amelyek nem változtatják az API-t

5. **Függőség patch frissítések**
   ```json
   // v1.2.4
   "react": "18.2.0"
   
   // v1.2.5 - PATCH emelés
   "react": "18.2.1"
   ```

### Project Verziókezelés

A projektek egyszerűbb verziókezelést használnak a deployment-ekhez kötve:

```
1.0.0 - Kezdeti indítás
1.1.0 - Új funkció telepítve
1.1.1 - Gyorsjavítás telepítve
2.0.0 - Nagy újratervezés
```

**Ökölszabály:**
- MAJOR: Újratervezés, nagy refaktor, felhasználó által látható törő változás
- MINOR: Új funkció, új oldal, tartalom frissítés
- PATCH: Bug javítás, kis finomítás

### Verzió Koordináció

#### 1. Szcenárió: Engine Változás, Projektek Érintetlenek

```
Engine:
  @spektra/core: 1.2.3 → 1.2.4 (bug javítás)

Projects:
  bellator: 1.0.0 (nincs változás)
  autozeno: 2.1.0 (nincs változás)
```

**Akció:** Frissítsd az engine-t, újratelepítsd a projekteket csak ha szükséges.

#### 2. Szcenárió: Törő Engine Változás

```
Engine:
  @spektra/core: 1.5.0 → 2.0.0 (törő)

Projects:
  bellator: 1.0.0 → 2.0.0 (nagy refaktor szükséges)
  autozeno: 2.1.0 → 3.0.0 (nagy refaktor szükséges)
```

**Akció:** 
1. Emeld az engine MAJOR-t
2. Frissítsd a projekteket az új API használatára
3. Emeld a projekt MAJOR-t
4. Telepítsd amikor stabil

#### 3. Szcenárió: Project Változás, Engine Érintetlen

```
Engine:
  @spektra/core: 1.5.0 (nincs változás)

Projects:
  bellator: 1.0.0 → 1.1.0 (új oldal hozzáadva)
```

**Akció:** Emeld a projekt MINOR-t, telepítsd a projektet.

## Eszköz Hatás

### Verzió Kezelési Parancsok

#### Verzió Emelés

```bash
# Manuális emelés a package.json-ban
cd engine/packages/core
# Szerkeszd a package.json-t: "version": "1.2.3" → "1.3.0"

# Vagy használd az npm version-t (működik PNPM-mel)
pnpm version minor
pnpm version major
pnpm version patch
```

#### Verziók Ellenőrzése

```bash
# Összes csomag verzió listázása
pnpm list --depth=0

# Specifikus csomag ellenőrzése
pnpm list @spektra/core
```

### Changelog Kezelés

#### CHANGELOG.md Formátum

```markdown
# Changelog

Minden jelentős változás ebben a fájlban lesz dokumentálva.

A formátum a [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) alapján készült,
és ez a projekt a [Szemantikus Verziókezelés](https://semver.org/spec/v2.0.0.html)-t követi.

## [2.0.0] - 2026-01-10

### Törő Változások
- Button `label` prop megváltoztatva `children`-re
- Elavult OldComponent eltávolítva

### Hozzáadva
- Új Badge komponens
- Icon prop a Button-hoz (opcionális)

### Javítva
- Button kattintás kezelő nem működött mobilon

## [1.2.3] - 2025-12-15

### Javítva
- Typography skála számítási hiba
```

#### Changelog Karbantartása

1. **Fejlesztés közben:** Adj hozzá az "Unreleased" szekcióhoz
2. **Kiadás előtt:** Mozgasd a verzióhoz rendelt szekcióba
3. **Tartalmazz migrációs útmutatót** a törő változásokhoz

### Git Tagelés

```bash
# Engine csomag kiadás tagelése
cd engine/packages/core
git tag @spektra/core@1.3.0
git push origin @spektra/core@1.3.0

# Project kiadás tagelése
cd projects/bellator
git tag bellator@1.1.0
git push origin bellator@1.1.0
```

### Automatizált Verziókezelés (Jövőbeli)

#### Semantic Release

```bash
# Automatikusan meghatározza a verziót a commit üzenetekből
npm install -D semantic-release

# Commit formátum:
# feat: új komponens → MINOR emelés
# fix: bug javítás → PATCH emelés
# BREAKING CHANGE: api változás → MAJOR emelés
```

#### Changesets

```bash
# Verzió változások követése a monorepo-ban
pnpm add -D @changesets/cli
pnpm changeset init

# Changeset létrehozása
pnpm changeset
# Válaszd ki a megváltozott csomagokat
# Írd le a változásokat
# Commitold a changeset-et

# Kiadás
pnpm changeset version  # Emeli a verziókat
pnpm changeset publish  # Publikálja a csomagokat
```

### CI/CD Integráció

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - '@spektra/**'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm build
      - run: pnpm publish --access public
```

### Copilot Verzió Tudatosság

A Copilot-nak:
1. **Ellenőriznie kell a CHANGELOG.md-t** törő változások javaslata előtt
2. **Verzió emelést kell javasolnia** API változtatások során
3. **Changelog bejegyzést kell hozzáadnia** jelentős változásokhoz
4. **Figyelmeztetnie kell a törő változásokról** implementálás előtt

**Példa:**
```typescript
// Copilot prop név változtatást javasol
// Előtte:
interface Props {
  label: string;
}

// Copilot javasolja:
// ⚠️ FIGYELMEZTETÉS: Ez egy TÖRŐ VÁLTOZÁS
// - Emeld a verziót 2.0.0-ra
// - Adj hozzá migrációs útmutatót a CHANGELOG-hoz
interface Props {
  children: React.ReactNode;
}
```

## Verziókezelési Jegyzetek

Ez a dokumentum maga is követi a verziókezelést:
- **Új verziókezelési szabályok hozzáadása**: MINOR (bővíti az útmutatást)
- **Meglévő szabályok változtatása**: MAJOR (megváltoztatja az értelmezést)
- **Elírások vagy példák javítása**: PATCH

## Kapcsolódó Dokumentumok

- [UI Architektúra](../architecture/ui-architecture_hu.md) - Az architekturális változások MAJOR verziót érintenek
- [Guardrails](../validation/guardrails_hu.md) - Az új guardrails MAJOR verziót érintenek
- [Validációs Pipeline](../validation/validation-pipeline_hu.md) - A validációs változások érintik a verziókezelést
- [Csomagkezelés](../tooling/package-management_hu.md) - Hogyan deklaráljuk a verziókat

## Gyakori Verziókezelési Szcenáriók

### Szcenárió: Új Komponens Hozzáadása

```
Jelenlegi: @spektra/core@1.5.2

Változás: Új Gallery komponens hozzáadása
Döntés: MINOR emelés
Új: @spektra/core@1.6.0

Indoklás: Új funkció, nem törő
```

### Szcenárió: Kötelező Prop Változtatása

```
Jelenlegi: @spektra/core@1.6.0

Változás: Button megköveteli a 'variant' prop-ot (korábban opcionális volt)
Döntés: MAJOR emelés
Új: @spektra/core@2.0.0

Indoklás: Törő változás - a meglévő kód hibásodni fog
```

### Szcenárió: Vizuális Bug Javítása

```
Jelenlegi: @spektra/core@2.0.0

Változás: Button hover szín javítása
Döntés: PATCH emelés
Új: @spektra/core@2.0.1

Indoklás: Bug javítás, nincs API változás
```

### Szcenárió: Opcionális Prop Hozzáadása

```
Jelenlegi: @spektra/core@2.0.1

Változás: Opcionális 'icon' prop hozzáadása a Button-hoz
Döntés: MINOR emelés
Új: @spektra/core@2.1.0

Indoklás: Új funkció, visszafelé kompatibilis
```

### Szcenárió: Komponens Elavulásának Jelölése (Nem Eltávolítás)

```
Jelenlegi: @spektra/core@2.1.0

Változás: OldButton megjelölése elavultként, figyelmeztetés hozzáadása
Döntés: MINOR emelés
Új: @spektra/core@2.2.0

Indoklás: Nem törő - a komponens még működik
Megjegyzés: Eltávolítás a következő MAJOR verzióban
```

### Szcenárió: React Függőség Frissítése

```
Jelenlegi: @spektra/core@2.2.0
React: ^18.0.0

Változás: Frissítés React 19-re
Döntés: MAJOR emelés
Új: @spektra/core@3.0.0

Indoklás: A fogyasztóknak frissíteniük kell a React-ot
```

## Verzió Döntési Fa

```
┌─────────────────────────────────────┐
│  Változott az API szerződés?         │
└──────────┬──────────────────────────┘
           │
     ┌─────┴─────┐
     │Igen       │Nem
     ▼           ▼
┌─────────────────┐    ┌────────────────────────┐
│ Törő?           │    │ Új funkcionalitás?     │
└────┬────────────┘    └────┬───────────────────┘
     │                      │
 ┌───┴───┐            ┌─────┴─────┐
 │Igen   │Nem         │Igen       │Nem
 ▼       ▼            ▼           ▼
MAJOR   MINOR        MINOR       PATCH
```

## Migrációs Útmutatók

MAJOR verzió emelésénél tartalmazz migrációs útmutatót a CHANGELOG-ban:

```markdown
## [2.0.0] - 2026-01-10

### Törő Változások

#### Button Komponens API Megváltoztatva

**Előtte (v1.x):**
```typescript
<Button label="Kattints rám" />
```

**Utána (v2.0):**
```typescript
<Button>Kattints rám</Button>
```

**Migráció:**
1. Cseréld le az összes `label` prop-ot children-re
2. Keresés: `<Button label="`
3. Csere: `<Button>` és záró tag hozzáadása

**Automatizált migráció:**
```bash
npx @spektra/migrate-button-v1-to-v2
```
```

## Publikálási Munkafolyamat

### 1. Fejlesztés

```bash
# Dolgozz feature branch-en
git checkout -b feature/new-gallery

# Változtatások
# Tesztelés lokálisan

# Commit
git commit -m "feat(core): Gallery komponens hozzáadása"
```

### 2. Pre-Release

```bash
# Verzió emelés
cd engine/packages/core
pnpm version minor  # 1.5.2 → 1.6.0

# CHANGELOG frissítése
# 1.6.0 bejegyzés hozzáadása

# Commit
git add .
git commit -m "chore(core): v1.6.0 kiadás"
```

### 3. Kiadás

```bash
# Tagelés
git tag @spektra/core@1.6.0

# Push
git push origin main
git push origin @spektra/core@1.6.0

# Publikálás (ha publikus)
pnpm publish
```

### 4. Post-Release

```bash
# Függő projektek frissítése
cd projects/bellator
# Tesztelés az új engine verzióval
pnpm install

# Deploy ha szükséges
pnpm build
```
