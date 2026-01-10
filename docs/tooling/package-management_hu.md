# Csomagkezelés

## Kontextus

A Spektra egy **monorepo**, amely két izolált workspace-t tartalmaz:
- **Engine** (`/engine`) - Platform csomagok
- **Projects** (`/projects`) - Kliens alkalmazások

A függőségek kezelése, csomagok linkelése és build-ek koordinálása a workspace-ek között speciális eszközöket igényel. Rossz választások vezetnek:
- Függőségi konfliktusokhoz és verzió eltérésekhez
- Lassú telepítésekhez és felfújt `node_modules`-okhoz
- Törött lokális csomag linkekhez
- Ineffektív build-ekhez, amelyek újracsinálják a változatlan munkát

## Döntés

A Spektra **PNPM**-et használ csomagkezelésre és **TurboRepo**-t build orkesztrációra.

### Miért PNPM?

| Funkció | NPM | Yarn | PNPM | Miért Nyer a PNPM |
|---------|-----|------|------|---------------|
| **Lemez hely** | Mindent duplikál | Néhányat duplikál | Egyetlen tároló | Gigabyte-okat takarít meg |
| **Telepítési sebesség** | Lassú | Gyors | Leggyorsabb | Párhuzamos + symlink-ek |
| **Szigorú deps** | Nem | Opcionális | Igen | Megelőzi a fantom deps-t |
| **Workspace linkelés** | Manuális | Jó | Kiváló | Natív `link:` protokoll |
| **Lock fájl merge konfliktusok** | Gyakori | Gyakori | Ritka | Jobb formátum |

### Miért TurboRepo?

- **Caching**: Csak a megváltozott csomagokat build-eli újra
- **Párhuzamosítás**: Független csomagokat egyidejűleg build-eli
- **Task függőségek**: Biztosítja a helyes build sorrendet
- **Távoli caching**: Cache megosztása a csapaton keresztül (jövőbeli)

## Struktúra

### Workspace Konfiguráció

#### Engine Workspace

```yaml
# engine/pnpm-workspace.yaml
packages:
  - 'packages/*'
```

```json
// engine/package.json
{
  "name": "spektra-engine",
  "private": true,
  "packageManager": "pnpm@8.15.0",
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  }
}
```

#### Projects Workspace

```yaml
# projects/pnpm-workspace.yaml
packages:
  - 'bellator'
  - 'autozeno'
  - 'baseline'
  - 'client-a'
```

```json
// projects/package.json
{
  "name": "spektra-projects",
  "private": true,
  "packageManager": "pnpm@8.15.0"
}
```

### Csomag Függőségek

#### Engine Csomag

```json
// engine/packages/core/package.json
{
  "name": "@spektra/core",
  "version": "1.0.0",
  "dependencies": {
    "@spektra/themes": "workspace:*",
    "@spektra/data-utils": "workspace:*",
    "react": "^18.0.0"
  }
}
```

**Kulcs pontok:**
- `workspace:*` lokális csomagokhoz linkel
- Engine csomagok csak más engine csomagoktól függnek
- Nincsenek függőségek a projektekre

#### Project Csomag

```json
// projects/bellator/package.json
{
  "name": "bellator",
  "private": true,
  "dependencies": {
    "@spektra/core": "link:../../engine/packages/core",
    "@spektra/themes": "link:../../engine/packages/themes",
    "axios": "^1.6.0"
  }
}
```

**Kulcs pontok:**
- `link:` symlink-et hoz létre az engine csomagokhoz
- Tartalmazhat CMS könyvtárakat (axios, GraphQL, stb.)
- Minden projektnek független függőségei vannak

### TurboRepo Konfiguráció

```json
// engine/turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "build/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    }
  }
}
```

**Mit jelent ez:**
- `"dependsOn": ["^build"]` - Build-eli először a függőségeket
- `"outputs": ["dist/**"]` - Cache-eli ezeket a mappákat
- `"cache": false` - Ne cache-elje a dev szervereket
- `"persistent": true` - Tartsa futva a dev szervert

## Szabályok

### Telepítési Szabályok

#### ✅ CSINÁLD:

1. **Használj kizárólag PNPM-et**
   ```bash
   pnpm install
   pnpm add react
   pnpm remove axios
   ```

2. **Telepíts a helyes workspace-ben**
   ```bash
   # Engine csomag
   cd engine/packages/core
   pnpm add some-library

   # Project
   cd projects/bellator
   pnpm add axios
   ```

3. **Használj workspace protokollt az engine-ben**
   ```json
   "dependencies": {
     "@spektra/themes": "workspace:*"
   }
   ```

4. **Használj link protokollt a projektekben**
   ```json
   "dependencies": {
     "@spektra/core": "link:../../engine/packages/core"
   }
   ```

#### ❌ NE CSINÁLD:

1. **NPM vagy Yarn használata**
   ```bash
   # ❌ SOHA
   npm install
   yarn add react
   ```
   **Miért:** Megtöri a PNPM workspace struktúrát és a lock fájlt.

2. **Workspace protokollok keverése**
   ```json
   // ❌ SOHA a projektekben
   "@spektra/core": "workspace:*"  // Rossz! Használj link:-ot
   ```

3. **CMS könyvtárak hozzáadása az engine-hez**
   ```bash
   # ❌ SOHA
   cd engine/packages/core
   pnpm add axios
   ```
   **Miért:** Sérti az engine tisztaság guardrails-t.

4. **`node_modules` commitolása**
   ```bash
   # ❌ SOHA
   git add node_modules/
   ```
   **Miért:** Pazarolja a repo helyet, konfliktusokat okoz.

### Függőség Kezelés

#### Megosztott Függőségek

A PNPM deduplikálja az azonos verziókat:

```
.pnpm-store/
  react@18.0.0/
    node_modules/react/

engine/packages/core/node_modules/
  react -> ../../../.pnpm-store/react@18.0.0/node_modules/react

engine/packages/themes/node_modules/
  react -> ../../../.pnpm-store/react@18.0.0/node_modules/react
```

**Előny:** Telepítsd a reactot egyszer, symlink-elj mindenhol.

#### Verzió Rögzítés

```json
// Root package.json
{
  "pnpm": {
    "overrides": {
      "react": "18.2.0"
    }
  }
}
```

**Használd amikor:** Specifikus verziót kell kikényszeríteni minden csomagon keresztül.

### Build Parancsok

#### Engine

```bash
cd engine

# Összes csomag telepítése
pnpm install

# Összes csomag build-elése
pnpm build

# Build kényszerített cache frissítéssel
pnpm build --force

# Watch mód fejlesztéshez
pnpm dev

# Összes csomag lintezése
pnpm lint

# Build artifaktok törlése
pnpm clean
```

#### Projects

```bash
cd projects

# Összes projekt telepítése
pnpm install

# Specifikus projekt futtatása
pnpm dev:bellator

# Specifikus projekt build-elése
pnpm build:bellator

# Összes projekt futtatása (ha konfigurálva)
pnpm dev
```

### Workspace Parancsok

```bash
# Parancs futtatása specifikus csomagban
pnpm --filter @spektra/core build
pnpm --filter bellator dev

# Parancs futtatása minden csomagban
pnpm -r build

# Függőség hozzáadása specifikus csomaghoz
pnpm --filter @spektra/core add react-router-dom
```

## Eszköz Hatás

### PNPM Használt Funkciók

#### 1. Tartalom-Címezhető Tárolás

```
~/.pnpm-store/
  v3/
    files/
      00/
        1a2b3c4d5e... (tényleges fájl)
```

Minden csomag megosztja ezt a globális tárolót. Azonos fájlok egyszer vannak tárolva.

#### 2. Symlink Struktúra

```
node_modules/
  .pnpm/                    # Lapos elrendezés
    react@18.0.0/
      node_modules/
        react/              # Tényleges csomag
  react -> .pnpm/react@18.0.0/node_modules/react
```

A felső szintű symlink-ek a lapos struktúrába mutatnak.

#### 3. Szigorú Mód

A PNPM kikényszeríti:
- Nem importálható csomag, ami nincs deklarálva a `package.json`-ban
- Nem lehet hozzáférni beágyazott függőségekhez (fantom deps)

**Példa:**
```typescript
// ❌ Meghibásodik PNPM-ben ha react-dom nincs a package.json-ban
import ReactDOM from 'react-dom';  // Még ha a react tartalmazza is
```

Javítás:
```bash
pnpm add react-dom
```

### TurboRepo Használt Funkciók

#### 1. Task Caching

```bash
# Első build
$ pnpm build
✓ @spektra/themes:build (5.2s)
✓ @spektra/core:build (12.8s)

# Második build (nincs változás)
$ pnpm build
✓ @spektra/themes:build [CACHED]
✓ @spektra/core:build [CACHED]
Kész 0.3s alatt
```

#### 2. Függőségi Gráf

A Turbo automatikusan detektálja:
- Mely csomagok függnek mitől
- Milyen sorrendben kell build-elni őket
- Melyek build-elhetők párhuzamosan

```
@spektra/themes → @spektra/core → bellator
                ↗
@spektra/data-utils
```

A Turbo build-eli:
1. `themes` és `data-utils` párhuzamosan
2. `core` miután mindkettő befejeződött
3. `bellator` miután a core befejeződött

#### 3. Inkrementális Build-ek

Csak újra build-el amikor:
- Forrásfájlok változtak
- Függőségek változtak
- `package.json` változott

Átugorja amikor:
- Csak nem kapcsolódó fájlok változtak
- Csak kommentek változtak

### VS Code Integráció

#### Beállítások

```json
// .vscode/settings.json
{
  "npm.packageManager": "pnpm",
  "eslint.workingDirectories": [
    "engine/packages/core",
    "engine/packages/themes",
    "projects/bellator"
  ]
}
```

#### Task-ok

```json
// .vscode/tasks.json
{
  "tasks": [
    {
      "label": "Build Engine",
      "type": "shell",
      "command": "pnpm",
      "args": ["build"],
      "options": {
        "cwd": "${workspaceFolder}/engine"
      }
    }
  ]
}
```

### Copilot Viselkedés

A Copilot-nak:
1. **`pnpm` parancsokat kell javasolnia**, nem npm/yarn-t
2. **`link:` ajánlása** project → engine függőségekhez
3. **`workspace:` ajánlása** engine → engine függőségekhez
4. **`package.json` ellenőrzése** importok javaslata előtt
5. **Függőségek hozzáadása** amikor olyan kódot javasol, ami igényli őket

**Példa:**
```typescript
// Copilot axios használatát javasolja
import axios from 'axios';

// Copilot ezt is javasolja:
// Futtasd: pnpm add axios
```

## Verziókezelési Jegyzetek

Csomagkezelési változtatások befolyásolják a verziókezelést:
- **PNPM major verzió frissítése**: MAJOR (megtörheti a munkafolyamatokat)
- **TurboRepo hozzáadása**: MINOR (javítja a DX-et, nem törő)
- **Workspace struktúra változtatása**: MAJOR (megtöri a meglévő beállítást)
- **Új csomag hozzáadása**: MINOR
- **Csomag eltávolítása**: MAJOR

## Kapcsolódó Dokumentumok

- [Validációs Pipeline](../validation/validation-pipeline_hu.md) - Hogyan futtatja a Turbo a validációt
- [Guardrails](../validation/guardrails_hu.md) - Kikényszerített import korlátozások
- [UI Architektúra](../architecture/ui-architecture_hu.md) - A csomag függőségek tükrözik a rétegeket
- [Verziókezelési Stratégia](../versioning/versioning-strategy_hu.md) - Mikor emeljük a verziókat

## Hibaelhárítás

### "Cannot find module" hibák

```bash
# Töröld az összes node_modules-t és lockfile-t
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
find . -name 'pnpm-lock.yaml' -delete

# Újratelepítés
cd engine && pnpm install
cd ../projects && pnpm install
```

### Link függőségek töröttek

```bash
# Ellenőrizd a symlink-eket
ls -la projects/bellator/node_modules/@spektra/

# Ezt kell látnod:
# core -> ../../../engine/packages/core
```

Ha törött:
```bash
cd projects/bellator
rm -rf node_modules
pnpm install
```

### Turbo cache problémák

```bash
# Turbo cache törlése
cd engine
rm -rf node_modules/.cache/turbo

# Kényszerített rebuild
pnpm build --force
```

### PNPM verzió eltérés

```bash
# Aktuális verzió ellenőrzése
pnpm --version

# Helyes verzió telepítése
npm install -g pnpm@8.15.0

# Ellenőrzés
pnpm --version  # 8.15.0-t kell mutatnia
```

### Fantom függőségi hibák

```bash
# Error: Cannot find module 'some-package'
# De NPM-ben működik!

# Javítás: Hiányzó függőség hozzáadása
pnpm add some-package
```

**Miért:** A PNPM szigorú mód ezt elkapja, az NPM nem.

## Migráció NPM/Yarn-ról

### 1. Régi fájlok eltávolítása

```bash
find . -name 'package-lock.json' -delete
find . -name 'yarn.lock' -delete
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
```

### 2. Workspace fájlok létrehozása

```bash
# engine/pnpm-workspace.yaml
echo "packages:\n  - 'packages/*'" > engine/pnpm-workspace.yaml

# projects/pnpm-workspace.yaml
echo "packages:\n  - '*'" > projects/pnpm-workspace.yaml
```

### 3. Telepítés PNPM-mel

```bash
cd engine && pnpm install
cd ../projects && pnpm install
```

### 4. Script-ek frissítése

Cseréld az `npm`-et `pnpm`-re minden `package.json` scriptben.

### 5. CI/CD frissítése

```yaml
# .github/workflows/build.yml
- uses: pnpm/action-setup@v2
  with:
    version: 8.15.0
- run: pnpm install
- run: pnpm build
```