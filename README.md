<div align="center">
  <h1>🎨 Spektra</h1>
  <p><strong>Modern React Turborepo Monorepo</strong></p>
  <p>Professzionális landing page-ek és web alkalmazások építése újrafelhasználható komponensekkel</p>

  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-18.3-61dafb)](https://reactjs.org/)
  [![Turborepo](https://img.shields.io/badge/Turborepo-2.0-ef4444)](https://turbo.build/)
  
</div>

---

## 📖 Tartalom

- [Áttekintés](#-áttekintés)
- [Főbb Tulajdonságok](#-főbb-tulajdonságok)
- [Technológiai Stack](#-technológiai-stack)
- [Gyors Indítás](#-gyors-indítás)
- [Projekt Struktúra](#-projekt-struktúra)
- [Fejlesztés](#-fejlesztés)
- [Package-ek](#-package-ek)
- [Új Ügyfél Létrehozása](#-új-ügyfél-létrehozása)
- [Testreszabás](#-testreszabás)
- [WordPress Integráció](#-wordpress-integráció)
- [Deployment](#-deployment)
- [Közreműködés](#-közreműködés)

---

## 🎯 Áttekintés

A **Spektra** egy modern, skálázható monorepo architektúra, amely lehetővé teszi többféle ügyfél projekt gyors létrehozását közös UI komponens könyvtárral. Turborepo-t használ a hatékony build-ekhez és Vite-ot a villámgyors fejlesztői élményhez.

### Mire jó?

- 🚀 **Gyors prototípusok**: Új landing page-ek percek alatt
- 🔄 **Újrafelhasználhatóság**: Egyszer írd meg, használd mindenhol
- 🎨 **Design System**: Konzisztens UI minden projekten keresztül
- 📦 **Monorepo előnyök**: Közös kód, könnyű frissítések
- ⚡ **Fejlesztői Élmény**: Hot reload, TypeScript, modern tooling

---

## ✨ Főbb Tulajdonságok

### 🧩 Komponens Könyvtár
- **UI Komponensek**: Button, Input, Card, Textarea és további alap komponensek
- **Feature Komponensek**: FeatureCard, ContactForm, Logo
- **Section Komponensek**: Hero, Features, About, Contact, Navigation, Footer
- **Templates**: Teljes landing page template-ek

### 🎨 Design System
- Testreszabható színpaletta és témák
- Tailwind CSS integráció
- Multiple design system support (base, corporate, ecommerce)
- Konzisztens spacing, typography, és vizuális nyelv

### 🔌 Integráció
- **WordPress REST API** támogatás
- **WordPress GraphQL** támogatás
- Egyszerű JSON API integráció
- Custom hooks az adatkezeléshez

### ⚡ Teljesítmény
- Turborepo caching és párhuzamos build-ek
- Vite alapú villámgyors fejlesztés
- Tree-shaking és optimalizált production build-ek
- TypeScript típusbiztonság

---

## 🛠 Technológiai Stack

### Core
- **[React 18](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vite](https://vitejs.dev/)** - Build tool & dev server
- **[Turborepo](https://turbo.build/)** - Monorepo management
- **[pnpm](https://pnpm.io/)** - Package manager

### Styling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[clsx](https://github.com/lukeed/clsx)** - Conditional classes
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Class merging

### Icons & UI
- **[Lucide React](https://lucide.dev/)** - Icon library

### Data Fetching (Optional)
- **[Axios](https://axios-http.com/)** - HTTP client
- **[Apollo Client](https://www.apollographql.com/)** - GraphQL client

---

## 🚀 Gyors Indítás

### Előfeltételek

```bash
node >= 18.0.0
pnpm >= 8.0.0
```

### Telepítés

```bash
# 1. Repository klónozása
git clone https://github.com/Csharlie/spektra.git
cd spektra

# 2. Függőségek telepítése
pnpm install

# 3. Core package build (első alkalommal)
pnpm build --filter=@spektra/core

# 4. Client-A fejlesztés indítása
pnpm dev:client-a
```

### Böngésző

Nyisd meg: **http://localhost:3000**

---

## 📦 Projekt Struktúra

```
spektra/
│
├── 📁 packages/              # Megosztott package-ek
│   │
│   ├── 📁 config/            # Központi konfigurációk
│   │   ├── paths.js          # ⭐ Központi path kezelés
│   │   ├── eslint/           # ESLint config
│   │   ├── typescript/       # TypeScript config
│   │   └── tailwind/         # Tailwind config
│   │
│   ├── 📁 core/              # UI komponens könyvtár
│   │   ├── components/
│   │   │   ├── ui/           # Alap UI komponensek
│   │   │   ├── features/     # Feature komponensek
│   │   │   ├── sections/     # Section komponensek
│   │   │   └── templates/    # Page template-ek
│   │   ├── design-systems/   # Design system témák
│   │   ├── contexts/         # React contexts
│   │   ├── hooks/            # Custom hooks
│   │   └── utils/            # Utility függvények
│   │
│   ├── 📁 data/              # Adatkezelés
│   │   ├── wp/rest/          # WordPress REST API
│   │   ├── wp/graphql/       # WordPress GraphQL
│   │   └── json/             # JSON API
│   │
│   └── 📁 themes/            # Testreszabott témák
│       ├── corporate/        # Corporate téma
│       └── ecommerce/        # E-commerce téma
│
├── 📁 apps/                  # Alkalmazások
│   └── 📁 client-a/          # Példa landing page
│       ├── pages/            # Oldalak
│       ├── config/           # App konfiguráció
│       └── ...
│
├── 📁 scripts/               # Helper scriptek
│   ├── create-client.js      # Új ügyfél generátor
│   └── sync-deps.js          # Függőség szinkronizáló
│
├── package.json              # Root package.json
├── turbo.json                # Turborepo konfiguráció
└── pnpm-workspace.yaml       # pnpm workspace konfig
```

---

## 💻 Fejlesztés

### Parancsok

#### Development Mode
```bash
# Minden package watch mode-ban
pnpm dev

# Csak egy konkrét app
pnpm dev:client-a

# Több app párhuzamosan (custom)
turbo run dev --filter=client-a --filter=client-b
```

#### Build
```bash
# Minden package build
pnpm build

# Csak egy konkrét app build
pnpm build:client-a

# Csak egy package build
pnpm build --filter=@spektra/core
```

### 🔍 Miért kell a `pnpm build --filter=@spektra/core`?

A **monorepo környezetben** ez a parancs **kritikus fontosságú**, mert:

#### 1. Szelektív Build
```bash
# ❌ Minden csomag buildelése (lassú)
pnpm build                  # ~5 perc az egész projekthez

# ✅ Csak a core buildelése (gyors)
pnpm build --filter=@spektra/core   # ~30 másodperc
```

#### 2. Függőségi Sorrend
A `turbo.json`-ban definiált `"dependsOn": ["^build"]` miatt:
- A `^` karakter jelzi, hogy először a **függőségek** buildelődnek
- Ha módosítod a `@spektra/core`-t, csak azt kell újrabuildelni
- A többi csomag (client-a, themes stb.) használja a friss build-et

#### 3. Gyakorlati Példa

**Helyzet:** Módosítottad a `packages/core/components/ui/Button.tsx` fájlt

```bash
# 1. Csak a core buildelése
pnpm build --filter=@spektra/core

# 2. App indítása a friss core-ral
pnpm dev:client-a
```

**Időmegtakarítás:**
- 🚫 Teljes build: ~5 perc
- ✅ Filter build: ~30 másodperc
- 💰 **Megtakarítás: 90%**

#### 4. Mikor használd?

| Eset | Parancs | Idő |
|------|---------|-----|
| Első telepítés után | `pnpm build --filter=@spektra/core` | 30s |
| Core komponens módosítása | `pnpm build --filter=@spektra/core` | 30s |
| Minden csomag frissítése | `pnpm build` | 5m |
| CI/CD teljes build | `pnpm build` | 5m |

**💡 Pro Tipp:** Fejlesztés közben csak a módosított csomagot build-eld a `--filter` használatával!

#### Linting & Testing
```bash
# Lint minden package
pnpm lint

# Test minden package
pnpm test
```

#### Tisztítás
```bash
# Build artifacts törlése
pnpm clean

# Node modules teljes törlése és újratelepítés
rm -rf node_modules packages/*/node_modules apps/*/node_modules
pnpm install
```

### 🤔 pnpm vs turbo - Mikor melyiket?

A projektben **mindkét parancs** használható, de van különbség:

#### pnpm parancsok (Ajánlott mindennapi használatra)
```bash
pnpm dev:client-a        # Egyszerű, előre definiált
pnpm build:client-a      # Kényelmes shortcut
```

**Előnyök:**
- ✅ Egyszerűbb szintaxis
- ✅ Nem kell turbo-t globálisan telepíteni
- ✅ Jó a 90%-os használati esetekhez
- ✅ Könnyebb megjegyezni

**Háttérben:** A `pnpm dev:client-a` valójában futtatja a `turbo run dev --filter=client-a` parancsot.

#### turbo parancsok (Haladó használatra)
```bash
turbo run dev --filter=client-a --filter=client-b    # Több app egyszerre
turbo run build --force                              # Cache figyelmen kívül hagyása
turbo run build --graph                              # Függőségi gráf megjelenítése
turbo run test --concurrency=5                       # Párhuzamosság beállítása
```

**Előnyök:**
- ✅ Több filter egyidejűleg
- ✅ Speciális Turborepo funkciók
- ✅ Debug és elemzési lehetőségek
- ✅ Teljes kontroll a build folyamat felett

**Használd amikor:**
- 🎯 Több projektet akarsz egyszerre futtatni
- 🎯 Cache-t szeretnél manipulálni
- 🎯 Build optimalizálást végezel
- 🎯 CI/CD pipeline-t állítasz be

**💡 Tipp:** Fejlesztés közben használd a **pnpm** parancsokat, haladó esetekben pedig a **turbo** parancsokat közvetlenül.

---

## 📦 Package-ek

### @spektra/core
UI komponens könyvtár - minden újrafelhasználható komponens

**Import példa:**
```typescript
import { Button, Hero, Features, LandingPageTemplate } from '@spektra/core';
```

### @spektra/data
Adatkezelés WordPress-szel és API-kkal

**Import példa:**
```typescript
import { WordPressRestClient, useRestPosts } from '@spektra/data';
```

### @spektra/themes
Testreszabott témák különböző iparágakhoz

**Import példa:**
```typescript
import { corporateTheme, ecommerceTheme } from '@spektra/themes';
```

### @spektra/config
Megosztott konfigurációk (ESLint, TypeScript, Tailwind)

**Import példa:**
```javascript
// tailwind.config.js
const baseConfig = require('@spektra/config/tailwind/base');
```

---

## 🆕 Új Ügyfél Létrehozása

### Automatikus Generálás

```bash
pnpm create-client
```

A script interaktívan végigvezet a folyamaton:
1. Ügyfél neve (pl. `client-b`)
2. Oldal neve (pl. `Client B`)
3. Automatikusan létrehozza a teljes struktúrát

### Manuális Létrehozás

```bash
# 1. Client-A másolása
cp -r apps/client-a apps/client-b

# 2. package.json szerkesztése
# apps/client-b/package.json
{
  "name": "client-b",
  ...
}

# 3. Site config frissítése
# apps/client-b/config/site.ts
export const siteConfig = {
  name: 'Client B',
  ...
};

# 4. Fejlesztés indítása
pnpm dev --filter=client-b
```

---

## 🎨 Testreszabás

### Színek Módosítása

**packages/config/tailwind/base.js**
```javascript
colors: {
  primary: {
    500: '#3b82f6',  // Változtasd meg a főszínt
    600: '#2563eb',
    // ...
  },
}
```

### Site Konfiguráció

**apps/client-a/config/site.ts**
```typescript
export const siteConfig = {
  name: 'Az Én Projektem',
  description: 'Leírás...',
  contact: {
    email: 'info@example.com',
    phone: '+36 20 123 4567',
    address: 'Budapest, Példa utca 12.',
  },
  social: {
    facebook: 'https://facebook.com/...',
    instagram: 'https://instagram.com/...',
  },
};
```

### Navigáció Testreszabása

**apps/client-a/config/navigation.ts**
```typescript
export const navigationLinks = [
  { label: 'Főoldal', href: '#home' },
  { label: 'Szolgáltatások', href: '#services' },
  // Adj hozzá újakat...
];
```

### Komponensek Testreszabása

Egyszerűen módosítsd a komponenseket vagy hozz létre újakat a `packages/core/components/` alatt.

### Path-ek Átnevezése

Ha átnevezed a package-eket:

1. **packages/config/paths.js** ⭐ Központi konfiguráció
2. **pnpm-workspace.yaml** Workspace definíció
3. **turbo.json** Turborepo konfiguráció

---

## 🔗 WordPress Integráció

### REST API Használata

```typescript
// apps/client-a/.env
VITE_WP_API_URL=https://your-site.com/wp-json/wp/v2

// Komponensben
import { WordPressRestClient, useRestPosts } from '@spektra/data';

const client = new WordPressRestClient(
  import.meta.env.VITE_WP_API_URL
);

function BlogPosts() {
  const { posts, loading, error } = useRestPosts(client);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title.rendered}</h2>
        </article>
      ))}
    </div>
  );
}
```

### GraphQL Használata

```typescript
// apps/client-a/.env
VITE_WP_GRAPHQL_URL=https://your-site.com/graphql

// App setup
import { ApolloProvider } from '@apollo/client';
import { createWordPressGraphQLClient } from '@spektra/data';

const client = createWordPressGraphQLClient(
  import.meta.env.VITE_WP_GRAPHQL_URL
);

<ApolloProvider client={client}>
  <App />
</ApolloProvider>
```

---

## 🚢 Deployment

### Vercel (Ajánlott)

```bash
# 1. Vercel CLI telepítése
npm i -g vercel

# 2. Client-A build
pnpm build:client-a

# 3. Deploy
cd apps/client-a
vercel --prod
```

### Netlify

```bash
# Build command
pnpm build:client-a

# Publish directory
apps/client-a/dist
```

### Manual Deploy

```bash
# Build
pnpm build:client-a

# A dist mappa tartalma hostolható bárhol
apps/client-a/dist/
```

---

## 🤝 Közreműködés

Örömmel fogadunk közreműködéseket! Kérjük:

1. Fork-old a repót
2. Hozz létre egy feature branch-et (`git checkout -b feature/AmazingFeature`)
3. Commit-old a változásokat (`git commit -m 'Add some AmazingFeature'`)
4. Push-old a branch-et (`git push origin feature/AmazingFeature`)
5. Nyiss egy Pull Request-et

### Fejlesztési Irányelvek

- Használj TypeScript-et típusdefiníciókkal
- Kövesd a meglévő kód stílusát
- Írj értelmes commit üzeneteket
- Tesztelj minden új funkciót
- Frissítsd a dokumentációt szükség esetén

---

## 📄 License

MIT License - lásd a [LICENSE](LICENSE) fájlt a részletekért.

---

## 🙏 Köszönetnyilvánítás

- **[Turborepo](https://turbo.build/)** - Monorepo management
- **[Vite](https://vitejs.dev/)** - Build tool
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[Lucide](https://lucide.dev/)** - Icons

---

## 📞 Kapcsolat & Támogatás

- **GitHub Issues**: [github.com/Csharlie/spektra/issues](https://github.com/Csharlie/spektra/issues)
- **GitHub Repo**: [github.com/Csharlie/spektra](https://github.com/Csharlie/spektra)

---

<div align="center">
  <p>Készítve ❤️-vel a modern web fejlesztésért</p>
  <p>⭐ Ha hasznosnak találod, adj egy csillagot a GitHub-on! ⭐</p>
</div>
