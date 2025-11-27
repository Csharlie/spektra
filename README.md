# Spektra - Turborepo Monorepo

GitHub: https://github.com/Csharlie/spektra

Modern React monorepo with Turborepo, Vite, Tailwind CSS és WordPress integráció.

## 🚀 Gyors Indítás

```bash
# 1. Függőségek telepítése
pnpm install

# 2. Client A fejlesztése
pnpm dev:client-a

# 3. Böngészőben nyisd meg
open http://localhost:3000
```

## 📦 Projekt Struktúra

```
spektra/
├── packages/           # Shared packages
│   ├── core/          # UI komponensek
│   ├── data/          # WordPress & API
│   ├── themes/        # Témák
│   └── config/        # Konfigurációk
├── apps/              # Alkalmazások
│   └── client-a/      # Landing page
└── scripts/           # Helper scriptek
```

## 🛠️ Parancsok

### Development
```bash
pnpm dev                    # Minden package dev mode
pnpm dev:client-a          # Csak client-a
```

### Build
```bash
pnpm build                  # Minden build
pnpm build:client-a        # Csak client-a build
```

### Új Ügyfél
```bash
pnpm create-client         # Interaktív ügyfél generátor
```

### Utility
```bash
pnpm lint                   # Lint minden package
pnpm clean                  # Clean build fájlok
```

## 🎨 Testreszabás

### Path-ek átnevezése

Ha átnevezed a package-eket, módosítsd ezeket a fájlokat:

1. `packages/config/paths.js` ⭐ KÖZPONTI PATH CONFIG
2. `pnpm-workspace.yaml`
3. `turbo.json`

## 🔧 Konfiguráció

### WordPress integráció

```bash
# apps/client-a/.env
VITE_WP_API_URL=https://your-wp.com/wp-json/wp/v2
VITE_WP_GRAPHQL_URL=https://your-wp.com/graphql
```

## 📝 License

MIT
