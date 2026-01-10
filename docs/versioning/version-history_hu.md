# Verzió Történet

Ez a dokumentum nyomon követi a Spektra projekt fő verzió mérföldköveit.

## Verzió Áttekintés

| Verzió | Dátum | Branch/Tag | Leírás |
|---------|------|------------|-------------|
| v0.4.0 | 2026-01-10 | `dev` | Engine-alapú platform architektúra |
| v0.1.0-legacy | 2026-01-10 | `main` (archivált) | Eredeti Spektra platform |

## v0.4.0 - Engine-Alapú Platform (2026-01-10)

**Státusz:** Jelenlegi fejlesztési baseline

**Branch:** `dev`

**Fő Változások:**
- Teljes architekturális újraírás
- Engine/projects workspace szétválasztás bevezetése
- PNPM workspace-alapú monorepo struktúra
- TurboRepo build orkesztráció
- Szigorú architekturális guardrails ESLint-en keresztül
- Komponens rétegrendszer (UI/Features/Sections/Templates)
- Adatvezérelt, kliens-agnosztikus engine design

**Törő Változások:**
- ⚠️ **Nem visszafelé kompatibilis** a v0.1.0-legacy verzióval
- Teljes projekt struktúra újratervezés
- Új komponens architektúra
- Eltérő build rendszer

**Migráció:**
- Nem lehetséges - a v0.4.0 egy platform újraindítás
- A legacy projektek a v0.1.0-legacy verzión kell maradjanak

**Dokumentáció:**
- [UI Architektúra](../architecture/ui-architecture_hu.md)
- [Validációs Pipeline](../validation/validation-pipeline_hu.md)
- [Guardrails](../validation/guardrails_hu.md)
- [Csomagkezelés](../tooling/package-management_hu.md)
- [Verziókezelési Stratégia](../versioning/versioning-strategy_hu.md)

---

## v0.1.0-legacy - Eredeti Platform (Archivált)

**Státusz:** Archivált - referencia céljából megőrizve

**Tag:** `v0.1.0-legacy` (a `main` branch-en)

**Leírás:**
Az eredeti Spektra platform implementáció az engine-alapú újraírás előtt. Ez a verzió az adatvezérelt weboldalak építésének kezdeti megközelítését képviseli.

**Hozzáférés:**
```bash
# Legacy kód megtekintése
git checkout v0.1.0-legacy

# Branch létrehozása a legacy-ből (ha szükséges)
git checkout -b legacy-hotfix v0.1.0-legacy
```

**Jellemzők:**
- Monolitikus struktúra
- Kliens-specifikus implementációk
- Nincsenek szigorú architekturális határok
- Guardrails rendszer előtti állapot

**Miért Archivált:**
A v0.4.0 újraírás olyan alapvető architekturális változtatásokat vezetett be, amelyek lehetetlenné tették a visszafelé kompatibilitást. A legacy verzió tag-ként van megőrizve történelmi referencia és potenciális vészhelyzeti hozzáférés céljából.

---

## Verzió Séma

A Spektra a [Szemantikus Verziókezelést](https://semver.org/) követi platform-specifikus értelmezéssel:

### Pre-1.0 (Jelenlegi Állapot)

**Formátum:** `0.MINOR.PATCH`

- `0.x.x` jelzi, hogy a platform **pre-stabil** állapotban van
- Törő változások várhatók a minor verziók között
- Nagy architekturális váltások megengedettek

**Példák:**
- `0.1.0-legacy` → Eredeti platform
- `0.4.0` → Engine-alapú platform (törő újraírás)
- `0.4.1` → Bug javítások az engine platformon
- `0.5.0` → Új engine funkciók (törhetnek)

### Post-1.0 (Jövőbeli)

**Formátum:** `MAJOR.MINOR.PATCH`

Amikor a platform eléri a stabilitást:
- `MAJOR` → Törő API változások
- `MINOR` → Új funkciók, visszafelé kompatibilisek
- `PATCH` → Bug javítások

**Példa:**
- `1.0.0` → Első stabil kiadás
- `1.1.0` → Új komponensek hozzáadva
- `2.0.0` → Törő architektúra változás

---

## Kiadási Tag-ek

### Jelenlegi Tag-ek

```bash
# Összes verzió tag listázása
git tag -l "v*"

# Várható kimenet:
# v0.1.0-legacy
# v0.4.0
```

### Tag Elnevezési Konvenció

- **Platform verziók:** `vMAJOR.MINOR.PATCH`
- **Legacy verziók:** `vMAJOR.MINOR.PATCH-legacy`
- **Pre-release-ek:** `vMAJOR.MINOR.PATCH-alpha.N`, `-beta.N`, `-rc.N`

### Verziók Elérése

```bash
# Specifikus verzió checkout-olása (csak olvasható)
git checkout v0.4.0

# Munka branch létrehozása verzióból
git checkout -b feature/new-component v0.4.0

# Vissza a fejlesztéshez
git checkout dev
```

---

## Migrációs Útvonalak

### v0.1.0-legacy-ről v0.4.0-ra

**Státusz:** ❌ **Nem Támogatott**

Az architekturális különbségek túl jelentősek az automatizált migrációhoz. A projekteket újra kell építeni az új platform struktúrával.

**Ajánlott Megközelítés:**
1. Tartsd a legacy projekteket a `v0.1.0-legacy` verzión
2. Építs új projekteket a `v0.4.0+` verzióra
3. Fokozatosan migráld a tartalmat (nem a kódot) az új projektekbe

### Jövőbeli Verziók

A v0.4.0-tól kezdve minden verzió emeléshez dokumentálva lesznek a migrációs útvonalak:
- Minor verziók (0.4.x → 0.5.x): Migrációs útmutató biztosítva
- Patch verziók (0.4.0 → 0.4.1): Drop-in kompatibilis

---

## Changelog

Nézd meg az egyedi csomag `CHANGELOG.md` fájlokat a részletes változásokért:

- [engine/packages/core/CHANGELOG.md](../../engine/packages/core/CHANGELOG.md)
- [engine/packages/themes/CHANGELOG.md](../../engine/packages/themes/CHANGELOG.md)
- [engine/packages/data-utils/CHANGELOG.md](../../engine/packages/data-utils/CHANGELOG.md)

---

## Kapcsolódó Dokumentáció

- [Verziókezelési Stratégia](./versioning-strategy_hu.md) - Hogyan határozódnak meg a verziók
- [UI Architektúra](../architecture/ui-architecture_hu.md) - Komponens verzió hatások
- [Guardrails](../validation/guardrails_hu.md) - Architekturális stabilitás
- [Csomagkezelés](../tooling/package-management_hu.md) - Függőség verziókezelés

---

**Utolsó Frissítés:** 2026-01-10
