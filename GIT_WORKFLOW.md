# Git Workflow - Spektra Repository struktúra

Ez a dokumentum részletesen leírja a Spektra projekt git repository struktúráját és a munkafolyamatokat.

## Mi ez a repository?

A **spektra-private** egy **privát fork** a nyilvános **Spektra** repository-ból. 

### Repository kapcsolatok:

```
┌─────────────────────────────────────────────────────────────┐
│  github.com/Csharlie/spektra (UPSTREAM - Nyilvános)         │
│  - Nyilvános Spektra projekt                                │
│  - Core packages és közösségi projektek                     │
│  - Közösségi hozzájárulások                                 │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   │ fork
                   ↓
┌─────────────────────────────────────────────────────────────┐
│  github.com/Csharlie/spektra-private (ORIGIN - Privát)      │
│  - Privát munkafolyamat                                     │
│  - Tartalmazza az összes privát app-ot                      │
│  - Extra features, kísérletek                               │
│  - Sync upstream-mel amikor szükséges                       │
└─────────────────────────────────────────────────────────────┘
                   │
                   │ fox-design mappa külön kezelhető
                   ↓
┌─────────────────────────────────────────────────────────────┐
│  github.com/Csharlie/spektra-fox-design (Dedikált)          │
│  - Csak a Fox Design landing page                           │
│  - Teljesen független repository                            │
│  - Nested git a spektra-private-ban                         │
└─────────────────────────────────────────────────────────────┘
```

## Repository felépítés részletesen

### 1. Spektra (UPSTREAM - Nyilvános)
- **URL:** `https://github.com/Csharlie/spektra.git`
- **Típus:** Upstream (forrás repository)
- **Státusz:** Nyilvános
- **Célja:** 
  - Közösségi fejlesztés
  - Nyílt forráskódú landing page framework
  - Általános célú komponensek
- **Tartalom:**
  - `packages/` - core, config, data
  - `projects/` - példa projektek (baseline)
  - **NEM tartalmazza:** privát projektek

### 2. Spektra-Private (ORIGIN - Privát Fork)
- **URL:** `https://github.com/Csharlie/spektra-private.git`
- **Típus:** Origin (saját fő repository)
- **Státusz:** Privát
- **Célja:**
  - Privát fejlesztés
  - Upstream változtatások integrálása
  - Extra app-ok (pl. fox-design) fejlesztése
  - Kísérleti features tesztelése
- **Tartalom:** 
  - MINDEN az upstream-ből + extra dolgok
  - `apps/fox-design/` - **csak itt érhető el** (upstream-be nem kerül)
  - `apps/client-project/` - privát projektek
  - `packages/` - lehet extra package is
  - Konfigurációs fájlok

### 3. Spektra-Fox-Design (Dedikált Repository)
- **URL:** `https://github.com/Csharlie/spektra-fox-design.git`
- **Típus:** Független projekt
- **Státusz:** Privát/Nyilvános (te döntöd el)
- **Lokáció a gépen:** `apps/fox-design/` (nested git repo)
- **Célja:**
  - Fox Design landing page izolált fejlesztése
  - Megosztható ügyfél/team specifikus projekt
  - Egyszerűbb deployment és verziókezelés
- **Tartalom:** 
  - Csak a fox-design mappa tartalma
  - Saját git history
  - Független branching stratégia

## Munkafolyamat

### A) Spektra-Private Repository (Fork munkafolyamat)

Ez a fő munkaterületed. Itt fejlesztesz, és innen szinkronizálsz az upstream-mel.

#### 1. Napi munka - Változtatások commitálása
```powershell
# A root mappában (spektra-private)
git add .
git commit -m "Your commit message"
git push origin main
```

**Fontos:** Minden változtatás (projektek, packages) felkerül a spektra-private-ra.

#### 2. Upstream szinkronizálás (upstream → private)

Az upstream-ből (nyilvános Spektra) lehúzod a legfrissebb változtatásokat a privát fork-odba.

**Mikor?** Rendszeresen, hogy naprakész maradj a közösségi fejlesztésekkel.

```powershell
# 1. Upstream legfrissebb állapotának letöltése
git fetch upstream

# 2. Nézd meg mi változott
git log HEAD..upstream/main --oneline

# 3. Integráld a változtatásokat (merge stratégia)
git merge upstream/main

# VAGY rebase stratégia (tisztább history)
git rebase upstream/main

# 4. Push a privát repo-ba
git push origin main
```

**Mit csinál ez?**
- Lehúzza az upstream változtatásait
- Integrálja őket a privát fork-odba
- A fox-design nem érintett (ki van zárva az upstream-ből)

#### 3. Upstream-be való hozzájárulás (private → upstream)

Ha van egy feature, amit szeretnél megosztani a közösséggel.

**Lépések:**

```powershell
# 1. Készíts egy tiszta feature branch-et
git checkout -b feature/awesome-feature

# 2. Végezd el a változtatásokat (NE módosítsd a fox-design mappát!)
# ... fejlesztés ...

# 3. Commit
git add .
git commit -m "Add awesome feature"

# 4. Push a privát repo-ba
git push origin feature/awesome-feature

# 5. Készíts Pull Request-et GitHub-on
# spektra-private/feature/awesome-feature → spektra/main
```

**Fontos szabályok:**
- ❌ A privát app mappák automatikusan ki vannak zárva (.gitignore)
- ✅ Csak olyan változtatásokat küldj, amik relevánsak a közösségnek
- ✅ Közösségi projektek módosításai OK
- ✅ Package fejlesztések OK

### B) Fox Design Repository (Nested munkafolyamat)

A fox-design egy **nested git repository** - saját .git könyvtárral rendelkezik a spektra-private-on belül.

#### 1. Fox Design fejlesztés és futtatás

**Egyszerűen menj be a mappába:**
```powershell
cd apps\fox-design
pnpm dev
```

**Build:**
```powershell
cd apps\fox-design
pnpm build
```

**Visszatérés a root-ba:**
```powershell
cd ..\..
```

#### 2. Fox Design változtatások commitálása
```powershell
# Navigálj a fox-design mappába
cd apps\fox-design

# Standard git workflow
git status
git add .
git commit -m "Update Fox Design landing page"
git push origin main

# Vissza a root-ba
cd ..\..
```

#### 3. Fox Design pull (legfrissebb változtatások)
```powershell
cd apps\fox-design
git pull origin main
cd ..\..
```

**Miért van külön repo?**
- Dedikált deployment lehetőség
- Független verziókezelés
- Könnyebb megosztás az ügyféllel/team-mel
- Nem keveredik a Spektra framework fejlesztésével

## Gyakori munkafolyamatok

### Scenario 1: Upstream feature integralása

Az upstream-ben jelent meg egy új feature, szeretnéd használni.

```powershell
# 1. Fetch upstream
git fetch upstream

# 2. Check változtatások
git log HEAD..upstream/main --oneline

# 3. Merge
git merge upstream/main

# 4. Tesztelés után push
git push origin main
```

### Scenario 2: Feature fejlesztés upstream-be való küldéshez

Készítesz egy általános komponenst, amit megosztanál a közösséggel.

```powershell
# 1. Branch létrehozása
git checkout -b feature/new-component

# 2. Fejlesztés (packages/core vagy projektek)
# ... kód írás ...

# 3. Commit
git add packages/core/components/primitives/NewComponent.tsx
git commit -m "Add NewComponent to core package"

# 4. Push private repo-ba
git push origin feature/new-component

# 5. GitHub-on: Pull Request spektra-private → spektra
```

### Scenario 3: Fox Design és Private repo párhuzamos fejlesztés

Dolgozol a fox-design-on, és közben módosítasz core package-eket is.

```powershell
# 1. Core package módosítás (spektra-private root)
git add packages/core/
git commit -m "Update core components"

# 2. Fox Design módosítás
cd apps\fox-design
git add .
git commit -m "Integrate new core components"
git push origin main
cd ..\..

# 3. Private repo push
git push origin main
```

**Eredmény:**
- ✅ Core változtatások → spektra-private
- ✅ Fox Design változtatások → spektra-private ÉS spektra-fox-design
- ❌ Fox Design NEM kerül → spektra (upstream)

### Scenario 4: Conflict kezelés upstream merge-nél

```powershell
# 1. Fetch és merge
git fetch upstream
git merge upstream/main

# Ha conflict van:
# 2. Nézd meg a conflictokat
git status

# 3. Szerkeszd a file-okat, oldj meg konfliktusokat
# 4. Stage a megoldott file-okat
git add .

# 5. Commit a merge-t
git commit -m "Merge upstream changes, resolve conflicts"

# 6. Push
git push origin main
```

### Scenario 5: Új app létrehozása (private only)

Készítesz egy új app-ot, ami csak a spektra-private-ban lesz.

```powershell
# 1. Készíts új app-ot
pnpm create vite apps/new-client --template react-ts

# 2. Add hozzá a .gitignore-hoz (ha csak private-ban kell)
# Szerkeszd: .gitignore
# Adj hozzá: apps/new-client/

# 3. Vagy ha mehet az upstream-be is, ne add hozzá
# 4. Commit
git add .
git commit -m "Add new-client app"
git push origin main
```

### Scenario 6: Package.json és pnpm-lock.yaml kezelése upstream merge-nél

**A root `package.json` NEM tartalmaz fox-design script-eket** - így upstream merge-nél nincs conflict!

**Ha mégis van conflict:**

```powershell
# 1. Upstream merge
git fetch upstream
git merge upstream/main

# 2. Ha van conflict a package.json-ban:
# - Fogadd el az upstream változtatásokat
# - NE adj hozzá fox-design script-eket

# 3. pnpm-lock.yaml conflict esetén:
rm pnpm-lock.yaml
pnpm install

# 4. Stage és commit
git add package.json pnpm-lock.yaml
git commit -m "Merge upstream changes"
git push origin main
```

**Fox-design futtatás:** Egyszerűen `cd apps\fox-design` majd `pnpm dev`

## Hasznos parancsok

### Remote-ok ellenőrzése

```powershell
# Root repo (spektra-private)
git remote -v
# Kimenet:
# origin    https://github.com/Csharlie/spektra-private.git
# upstream  https://github.com/Csharlie/spektra.git

# Fox Design repo
cd apps\fox-design
git remote -v
# Kimenet:
# origin    https://github.com/Csharlie/spektra-fox-design.git
cd ..\..
```

### Status mindkét repo-ban

```powershell
# Fő repo status
git status

# Fox design status
cd apps\fox-design
git status
cd ..\..
```

### Branch-ek áttekintése

```powershell
# Lokális és remote branch-ek
git branch -a

# Upstream branch-ek megtekintése
git branch -r --list upstream/*
```

### Upstream összehasonlítás

```powershell
# Milyen commit-ok vannak az upstream-ben, amik nálad nincsenek
git log HEAD..upstream/main --oneline

# Milyen commit-od van neked, amik az upstream-ben nincsenek
git log upstream/main..HEAD --oneline
```

## Hibakezelés és tippek

### Ha véletlenül commitáltad a fox-design-t a fő repo-ba

A .gitignore **megakadályozza**, hogy a fox-design/.git mappa felmegy, de a tartalom igen.
Ha mégis problémád van:

```powershell
# Unstage
git reset HEAD apps/fox-design

# Vagy ha már commitáltad
git reset --soft HEAD~1
```

### Ha mindkét repo-ban vannak változtatások

Mindig commitálj először a belső repo-ban (fox-design), aztán a külső-ben:

```powershell
# 1. Fox design commit
cd apps\fox-design
git add .
git commit -m "Fox design changes"
git push origin main
cd ..\..

# 2. Spektra-private commit
git add .
git commit -m "Main repo changes"
git push origin main
```

### Upstream-ből való pull conflict

Ha az upstream merge conflict-ot okoz:

```powershell
# 1. Backup készítése (opcionális)
git branch backup-before-merge

# 2. Merge attempt
git fetch upstream
git merge upstream/main
# ... conflict ...

# 3. Nézd meg a conflictokat
git status

# 4. Szerkeszd a file-okat
# Keress rá: <<<<<<<, =======, >>>>>>>

# 5. Jelöld megoldottnak
git add .
git merge --continue

# 6. Push
git push origin main
```

### Fox Design "elveszett" módosítások

Ha véletlenül a spektra-private-ban módosítottad a fox-design-t (ne a nested repo-ban):

```powershell
# 1. Mentsd el a módosításokat
cp -r apps/fox-design apps/fox-design-backup

# 2. Discard changes a root repo-ban
git restore apps/fox-design

# 3. Másold vissza a nested repo-ba
cd apps\fox-design
# Másold vissza a változtatásokat
git add .
git commit -m "Recovered changes"
git push origin main
cd ..\..
```

## Best Practices

### 1. Upstream szinkronizálás gyakorisága
- **Hetente egyszer:** Minimum, hogy ne maradj le sokat
- **Feature fejlesztés előtt:** Mindig frissíts upstream-ből
- **Pull Request előtt:** Győződj meg róla, hogy naprakész vagy

### 2. Commit üzenetek
```
# Jó példák:
✅ "Add Hero component with responsive design"
✅ "Fix navigation menu mobile layout"
✅ "Update upstream: merge v2.1.0 changes"

# Kerülendő:
❌ "update"
❌ "fix"
❌ "wip"
```

### 3. Branch stratégia

**Spektra-private:**
- `main` - stabil, production-ready
- `feature/*` - új feature-ök
- `fix/*` - bugfix-ek
- `upstream/*` - upstream integrációs branch-ek (opcionális)

**Fox-design:**
- `main` - production
- `dev` - development (opcionális)
- `feature/*` - feature-ök

### 4. .gitignore szabályok

A root `.gitignore` tartalmazza:
```gitignore
# Separate repos (managed independently)
apps/fox-design/
```

**Miért?** Ez biztosítja, hogy:
- ✅ Fox-design NEM megy fel upstream-be
- ✅ Fox-design IGEN megy fel spektra-private-ba (nested git miatt)
- ✅ Fox-design saját history-ja védett

### 5. Root package.json szabály

A root `package.json` **NEM tartalmazza** a fox-design script-eket.

**Fox-design futtatás:**
```powershell
cd apps\fox-design
pnpm dev
```

**Miért?**
- Upstream merge-nél nincs conflict
- A root package.json teljesen upstream-kompatibilis
- Egyszerű: csak menj be a mappába és futtasd

### 6. Pull Request szabályok upstream-be

Mielőtt PR-t küldesz spektra-ba:
1. ✅ Csak releváns változtatások (packages)
2. ✅ Ne legyen privát projekt referencia
3. ✅ Ne legyen privát script a root package.json-ban
4. ✅ Tests passed
5. ✅ Dokumentáció frissítve
6. ✅ Conventional commits használata

## Összefoglalás

### Repository irányok:

```
UPSTREAM (spektra)
    ↓ fetch/merge
PRIVATE (spektra-private)  
    ↓ git status/commit/push
REMOTE PRIVATE (GitHub)

Párhuzamosan:

FOX-DESIGN (nested git)
    ↓ git status/commit/push
REMOTE FOX (spektra-fox-design GitHub)
```

### Egyszerű szabályok:

1. **Spektra-private a fő munkaterületed** - itt fejlesztesz mindent
2. **Upstream-ből húzz** - hogy naprakész maradj a közösségi fejlesztésekkel  
3. **Upstream-be csak általános dolgokat küldj** - fox-design és privát feature-ök maradnak private
4. **Fox-design külön kezeld** - ha dolgozol rajta, cd apps/fox-design és onnan dolgozz
5. **Commit sorrendje számít** - nested repo először, aztán parent repo

### Mi megy hova?

| Változtatás | spektra-private | spektra (upstream) | spektra-fox-design |
|-------------|-----------------|--------------------|--------------------|
| packages/ módosítás | ✅ Igen | ✅ Igen (PR-rel) | ❌ Nem |
| fox-design módosítás | ✅ Igen | ❌ NEM | ✅ Igen |
| Privát projekt módosítás | ✅ Igen | ❌ NEM | ❌ Nem |
| config/ módosítás | ✅ Igen | ⚠️ Esetleg (ha általános) | ❌ Nem |

## Kérdések és támogatás

Ha elakadtál, vagy kérdésed van:
1. Nézd meg ezt a dokumentumot
2. Ellenőrizd a git remote-okat és branch-eket
3. Használd a `git status` és `git log` parancsokat
4. GitHub-on nézd meg a PR history-t inspirációért

---

**Készült:** 2025. november 29.  
**Utolsó frissítés:** 2025. november 29.
