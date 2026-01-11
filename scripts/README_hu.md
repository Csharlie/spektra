# create-project

Interaktív script új Spektra projektek létrehozásához a baseline sablonból.

## Funkciók

- ✅ Interaktív promptok a projekt beállításához
- ✅ Automatikus baseline sablon másolás
- ✅ Package.json konfiguráció
- ✅ Környezeti változók beállítása (.env)
- ✅ Márkanév integráció VITE_SITE_NAME-en keresztül

## Használat

A repository root mappájából:

```bash
pnpm create-project
```

## Interaktív folyamat

A script bekéri a következő adatokat:

### 1. Projekt mappa név
```
Projekt mappa név (csak kisbetűk, számok, kötőjelek):
```

- Csak kisbetűket, számokat és kötőjeleket tartalmazhat
- A `projects/` mappában létrejövő mappa neve lesz
- A package.json `name` mezőjében is ez szerepel

Példa: `sajat-ugyfelem`

### 2. Weboldal/Márka megjelenítendő név
```
Weboldal / márka megjelenítendő név:
```

- Bármilyen karaktert tartalmazhat (szóközök, nagybetűk, speciális karakterek)
- A `.env` fájlban `VITE_SITE_NAME`-ként lesz beállítva
- Ez jelenik meg az alkalmazásban oldal névként

Példa: `Saját Ügyfelem Kft.`

## Mit csinál

1. **Validálja a bemenetet**
   - Mappa név formátum
   - Célmappa nem létezik
   - Megjelenítendő név nem üres

2. **Másolja a sablont**
   - Forrás: `engine/templates/baseline/`
   - Cél: `projects/<mappa-nev>/`
   - Minden fájl és mappa rekurzívan

3. **Frissíti a package.json-t**
   - Beállítja a `name` mezőt a mappa névre

4. **Létrehozza a .env fájlt**
   - Beállítja `VITE_SITE_NAME=<megjeleno-nev>`
   - Megőrzi a létező környezeti változókat ha vannak

5. **Integráció a site.ts-sel**
   - A baseline sablon használja:
     ```typescript
     name: import.meta.env.VITE_SITE_NAME || 'Spektra Project'
     ```
   - A márkanév automatikusan megjelenik az alkalmazásban

## Példa

```bash
$ pnpm create-project

🚀 Új projekt létrehozása

Projekt mappa név (csak kisbetűk, számok, kötőjelek): pelda-ceg
Weboldal / márka megjelenítendő név: Példa Cég Kft.

📦 Projekt létrehozása...

✅ Projekt sikeresen létrehozva!

📦 Mappa név:        pelda-ceg
🏷️  Megjelenített név: Példa Cég Kft.
📍 Helye:            projects/pelda-ceg

Következő lépések:
  cd projects/pelda-ceg
  pnpm install
  pnpm dev
```

## Eredmény struktúra

```
projects/pelda-ceg/
├── .env                    # VITE_SITE_NAME=Példa Cég Kft.
├── package.json            # { "name": "pelda-ceg" }
├── src/
│   └── data/
│       └── site.ts         # Használja az import.meta.env.VITE_SITE_NAME-t
└── ... (összes baseline fájl)
```

## Követelmények

- Node.js >=18.0.0
- pnpm >=8.0.0
- tsx (telepítve dev dependency-ként)

## Hibakezelés

A script validálja és tiszta hibaüzeneteket ad a következő esetekben:

- Üres mappa név
- Érvénytelen mappa név formátum (nagybetűk, speciális karakterek)
- A mappa már létezik
- Üres megjelenítendő név
- Hiányzó baseline sablon

Minden hiba nem-nulla kóddal lép ki és részletes magyar nyelvű üzeneteket jelenít meg.
