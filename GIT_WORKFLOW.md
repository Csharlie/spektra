# Git Workflow - Spektra Repository struktúra

Ez a dokumentum leírja, hogyan kezeljük a Spektra projekt git repository struktúráját.

## Repository felépítés

A projektünk két külön git repository-t használ:

### 1. Fő repository (spektra-private)
- **Origin:** `https://github.com/Csharlie/spektra-private.git`
- **Upstream:** `https://github.com/Csharlie/spektra.git` (public fork)
- **Tartalom:** 
  - A teljes monorepo struktúra
  - `apps/client-a/` - ez szinkronizálódhat az upstream-mel
  - `packages/` - core, config, data, themes
  - Konfigurációs fájlok (package.json, pnpm-workspace.yaml, stb.)

### 2. Fox Design repository (spektra-fox-design)
- **Origin:** `https://github.com/Csharlie/spektra-fox-design.git`
- **Lokáció:** `apps/fox-design/`
- **Státusz:** Külön git repository a fő repo-n belül
- **Tartalom:** Fox Design landing page és kapcsolódó fájlok

## Munkafolyamat

### Fő repository (spektra-private)

#### Változtatások commitálása
\`\`\`powershell
# A root mappában
git add .
git commit -m "Your commit message"
git push origin main
\`\`\`

#### Upstream szinkronizálás
\`\`\`powershell
# Upstream változtatások lehúzása
git fetch upstream
git merge upstream/main

# Vagy rebase használatával
git rebase upstream/main
\`\`\`

#### Push upstream-be (ha van hozzáférésed)
\`\`\`powershell
git push upstream main
\`\`\`

**Fontos:** A fox-design mappa automatikusan ki van zárva a .gitignore-ban, így nem fog felkerülni az upstream-be.

### Fox Design repository

#### Változtatások commitálása
\`\`\`powershell
# Navigálj a fox-design mappába
cd apps\fox-design

# Standard git workflow
git add .
git commit -m "Your commit message"
git push origin main
\`\`\`

#### Pull legfrissebb változtatások
\`\`\`powershell
cd apps\fox-design
git pull origin main
\`\`\`

## Gyakori műveletek

### Új feature fejlesztése a fő repo-ban
\`\`\`powershell
# Root mappában
git checkout -b feature/your-feature-name
# Fejlesztés...
git add .
git commit -m "Add feature: your feature"
git push origin feature/your-feature-name
\`\`\`

### Új feature fejlesztése fox-design-ban
\`\`\`powershell
cd apps\fox-design
git checkout -b feature/your-feature-name
# Fejlesztés...
git add .
git commit -m "Add feature: your feature"
git push origin feature/your-feature-name
\`\`\`

### Status ellenőrzés mindkét repo-ban
\`\`\`powershell
# Fő repo
git status

# Fox design repo
cd apps\fox-design
git status
cd ..\..
\`\`\`

## Hibakezelés

### Ha véletlenül commitáltad a fox-design-t a fő repo-ba

A .gitignore megakadályozza ezt, de ha mégis előfordulna:

\`\`\`powershell
# Unstage
git reset HEAD apps/fox-design

# Vagy ha már commit-oltad
git reset --soft HEAD~1
\`\`\`

### Ha mindkét repo-ban vannak nem commitált változtatások

Mindig commitálj először a belső repo-ban (fox-design), aztán a külső-ben:

\`\`\`powershell
# 1. Fox design commit
cd apps\fox-design
git add .
git commit -m "Fox design changes"
cd ..\..

# 2. Fő repo commit
git add .
git commit -m "Main repo changes"
\`\`\`

## Megjegyzések

- A fox-design mappa saját .git könyvtárral rendelkezik
- A két repository teljesen független egymástól
- A fő repo .gitignore-ja kizárja a fox-design mappát
- Így a fox-design soha nem fog felkerülni az upstream spektra repo-ba
