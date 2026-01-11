# Folyamatos Integráció (CI) Pipeline

## Áttekintés

A Spektra repository GitHub Actions-t használ minden push és pull request automatikus validálására. Ez biztosítja a kód minőségét és megakadályozza, hogy instabil build-ek bekerüljenek a main ágba.

## Workflow Fájl

**Elérési út:** `.github/workflows/ci.yml`

## Indítók

A CI pipeline automatikusan fut:

- **Push** esetén bármely ágra
- **Pull Request** esetén bármely ágra

## Pipeline Lépések

### 1. Környezet Beállítása
- **Operációs rendszer:** Ubuntu Latest
- **Node.js:** LTS verzió
- **Csomagkezelő:** PNPM 8

### 2. Függőség Gyorsítótárazás
- A PNPM store gyorsítótárazva van GitHub Actions cache segítségével
- Cache kulcs a `pnpm-lock.yaml` hash alapján
- Jelentősen gyorsítja a későbbi futásokat

### 3. Telepítés
- Engine függőségek: `cd engine && pnpm install --frozen-lockfile`
- Projects függőségek: `cd projects && pnpm install --frozen-lockfile`

### 4. Minőségi Ellenőrzések

#### Lint
```bash
cd engine && pnpm lint
```
ESLint futtatása minden engine package-en Turborepo-n keresztül.

#### Build
```bash
cd engine && pnpm build
cd projects && pnpm build:bellator
```
Minden package és projekt build-elése a sikeres fordítás biztosítására.

#### Test
```bash
cd engine && pnpm test
```
Tesztek futtatása, ha elérhetők (elegánsan kihagyja, ha nincs konfigurálva).

## Quality Gate Viselkedés

- ✅ Minden lépésnek sikeresnek kell lennie
- ❌ Bármelyik hiba blokkolja az egész pipeline-t
- 🚫 Sikertelen build-ek nem merge-elhetők (ha branch védelem aktív)

## Előnyök

### Fejlesztőknek
- Azonnali visszajelzés a kód minőségéről
- Megakadályozza a véletlen breaking változtatásokat
- Elkapja a problémákat review előtt

### Karbantartóknak
- Kikényszerített kód standardok
- Következetes build folyamat
- Védett main ág

### A Projektnek
- Stabil kódbázis
- Megbízható deploy-ok
- Csökkentett debug idő

## Monitoring

Workflow státusz ellenőrzése:
1. Menj a **GitHub Repository**-ba
2. Kattints az **Actions** fülre
3. Nézd meg a legutóbbi workflow futásokat

Minden commit mutatja:
- ✅ Zöld pipa = sikeres
- ❌ Piros X = sikertelen
- 🟡 Sárga pont = folyamatban

## Lokális Validálás

Futtasd ugyanezeket az ellenőrzéseket lokálisan push előtt:

```bash
# Engine ellenőrzések
cd engine
pnpm install
pnpm lint
pnpm build
pnpm test

# Projects ellenőrzések
cd projects
pnpm install
pnpm build:bellator

```

## Hibaelhárítás

### Build Sikertelen: Lint Hibák
- Futtasd a `pnpm lint` parancsot lokálisan
- Javítsd a jelentett problémákat
- Commit-old és push-old újra

### Build Sikertelen: Fordítási Hibák
- Futtasd a `pnpm build` parancsot lokálisan
- Ellenőrizd a TypeScript hibákat
- Javítsd a típus problémákat

### Build Sikertelen: Teszt Hibák
- Futtasd a `pnpm test` parancsot lokálisan
- Javítsd a sikertelen teszteket
- Győződj meg róla, hogy minden assertion átmegy

## Integráció Branch Védelemmel

Ajánlott GitHub branch védelem szabályok a `main` ághoz:

1. Státusz ellenőrzések sikeresek legyenek merge előtt
2. Ágak legyenek naprakészek merge előtt
3. Engedélyezd a "CI / Quality Gate"-et kötelező ellenőrzésként

Ez biztosítja, hogy sérült kód ne kerüljön be a main ágba.

## Jövőbeli Fejlesztések

Lehetséges kiegészítések (jelenleg nincs implementálva):

- Kód lefedettség riportolás
- Teljesítmény benchmark-ok
- Vizuális regressziós tesztelés
- Automatikus függőség frissítések
- Biztonsági ellenőrzés

---

**Státusz:** ✅ Aktív és Kikényszerített  
**Utoljára Frissítve:** 2026-01-10
