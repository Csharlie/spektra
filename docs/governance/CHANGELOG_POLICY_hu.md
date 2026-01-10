# CHANGELOG Irányelv

**Státusz**: Érvényben  
**Tulajdonos**: Platform Csapat  
**Hatálybalépés**: 2026. január  
**Kapcsolódó dokumentumok**:
- [Engine Verziókezelési Irányelv](./ENGINE_VERSIONING_POLICY_hu.md)
- [Kiadás Kommunikációs Stratégia](./RELEASE_COMMUNICATION_STRATEGY_hu.md)

---

## Cél

A Spektra engine egy **nagy-frekvenciájú verziókezelési modell** szerint működik, ahol minden beolvasztott változtatás új szemantikus verziót hoz létre. Ez az irányelv biztosítja, hogy a CHANGELOG olvasható maradjon a gyakori kiadások ellenére is, azáltal, hogy megkülönbözteti a **szándékos változtatásokat** képviselő verziókat azoktól, amelyek **karbantartási pillanatfelvételek**.

**Ez az irányelv azért létezik, hogy megelőzze a jelzésvesztést egy determinisztikus verziókezelési környezetben.**

---

## Kontextus és Indoklás

### A Probléma

A semantic-release automatizációval:
- Minden `main` ágba történő commit verziónövelést válthat ki
- PATCH verziók jönnek létre nem-törő javításokhoz és karbantartáshoz
- Struktúra nélkül a CHANGELOG zajossá válik

### A Megoldás

Minden verzió dokumentált, de **nem mindegyik egyformán súlyozott**. A CHANGELOG explicit kategorizálást alkalmaz, hogy elválassza a szándékos változtatásokat a karbantartási pillanatfelvételektől.

---

## Kötelező CHANGELOG Struktúra

Minden verziobejegyzésnek a `CHANGELOG.md` fájlban a következő szakaszstruktúrát KELL használnia:

```markdown
## [X.Y.Z] - ÉÉÉÉ-HH-NN

### Funkciók
Új képességek vagy fejlesztések, amelyek értéket adnak hozzá.

### Hibajavítások
Meglévő, helytelen viselkedés javításai.

### Törő Változtatások
Olyan változtatások, amelyek megkövetelik a fogyasztói kód módosítását.

### Karbantartás
Függőség-frissítések, refaktorálás, belső fejlesztések, CI változtatások.
```

### Szakasz Meghatározások

| Szakasz | Cél | Jelzési Szint |
|---------|-----|---------------|
| **Funkciók** | Új funkcionalitás vagy fejlesztések | MAGAS |
| **Hibajavítások** | Helytelen viselkedés javításai | KÖZEPES-MAGAS |
| **Törő Változtatások** | API változások, fogyasztói frissítést igényelnek | KRITIKUS |
| **Karbantartás** | Belső fejlesztések API hatás nélkül | ALACSONY |

---

## Kategorizálási Szabályok

### Funkciók

**Ide tartozik**:
- Új publikus API-k
- Új komponensek vagy segédeszközök
- Új konfigurációs opciók
- Meglévő API-k kibővített képességei

**NEM tartozik ide**:
- Belső refaktorálás API változtatások nélkül
- Teljesítményjavítások (hacsak nincs explicit meghirdetve)

### Hibajavítások

**Ide tartozik**:
- Helytelen viselkedés javításai
- Regressziók javításai
- Dokumentációs hibák javításai

**NEM tartozik ide**:
- Függőség-frissítések, amelyek mellékesen javítanak hibákat
- Belső kódjavítások

### Törő Változtatások

**Ide tartozik**:
- Eltávolított publikus API-k
- Megváltozott függvény szignatúrák
- Megváltozott alapértelmezett viselkedések
- Átnevezett exportok

**NEM tartozik ide**:
- Belső törő változtatások (nem publikus API)
- Instabil/kísérleti API-k változtatásai (ha így vannak jelölve)

### Karbantartás

**Ide tartozik**:
- Függőség-frissítések
- Belső refaktorálás
- CI/CD változtatások
- Build szkript fejlesztések
- Dokumentáció struktúra változtatások (nem tartalom javítások)
- Típusjavítások viselkedés változtatás nélkül

**Ez a PILLANATFELVÉTEL KATEGÓRIA.**

---

## Verzió-Szintű vs Pillanatfelvétel-Szintű Bejegyzések

### Verzió-Szintű Bejegyzések
A **Funkciók**, **Hibajavítások** és **Törő Változtatások** verzió-szintű bejegyzések. Minden bejegyzés egy **konkrét szándékos változtatást** képvisel, amely értéket ad a fogyasztóknak.

### Pillanatfelvétel-Szintű Bejegyzések
A **Karbantartás** bejegyzések pillanatfelvétel-szintűek. Dokumentálják a kiadás állapotát, de nem képviselnek diszkrét értéknövelő változtatásokat.

**Példa**:
```markdown
### Karbantartás
- Függőségek frissítve a legújabb stabil verziókra
- Belső TypeScript refaktorálás a típusbiztonságért
- CI pipeline optimalizálás
```

Ez NEM jelenti azt, hogy a verzió nem fontos. Azt jelenti, hogy a verzió egy **állapot pillanatfelvétel**, nem pedig egy funkció kiszállítás.

---

## Eszközök Illesztése

### semantic-release Integráció

A CHANGELOG-ot a `semantic-release` generálja és tartja karban, hagyományos commitok alapján:

| Commit Típus | Changelog Szakasz | Verzió Növelés |
|--------------|-------------------|----------------|
| `feat:` | Funkciók | MINOR |
| `fix:` | Hibajavítások | PATCH |
| `BREAKING CHANGE:` | Törő Változtatások | MAJOR |
| `chore:`, `docs:`, `refactor:`, `style:`, `test:` | Karbantartás | PATCH |

### Commit Üzenet Követelmények

A helyes kategorizálás biztosításához:
- Használj hagyományos commit formátumot: `type(scope): message`
- Értelmes típusok kötelezőek
- Törő változtatások esetén `BREAKING CHANGE:` footer KÖTELEZŐ

---

## Érvényesítés

### Automatizált Érvényesítés
- A semantic-release validálja a commit üzeneteket
- A CI hibát jelez rosszul formázott commit üzeneteknél
- A CHANGELOG generálás automatikus és nem megkerülhető

### Manuális Érvényesítés
- Ha a semantic-release rossz kategorizálást generál, akkor a **commit üzenet volt hibás**
- Utólagos CHANGELOG szerkesztések **tilosak**
- Ha egy verzió rossz kategorizálással kerül kiadásra, a helyes megközelítés:
  - Dokumentáld a problémát
  - Javítsd a commit üzenet konvenciókat a jövőben
  - NE írd át a történetet

---

## Jelzés Kezelés

### Nagy-Frekvenciájú Kiadások Várhatóak

Sok PATCH verzió jelenléte **nem probléma**. A rendszer egyik funkciója.

### Karbantartási Verziók Érvényesek

Egy verzió, amely csak "Karbantartás" bejegyzéseket tartalmaz:
- Érvényes kiadás
- Dokumentált állapot
- NEM "haszontalan" verzió

A platform **jelenlegi stabil állapotát** reprezentálja.

### Kommunikáció vs Dokumentáció

**A CHANGELOG minden verziót dokumentál.**  
**A kiadás bejelentések szelektívek.**

Lásd a [Kiadás Kommunikációs Stratégia](./RELEASE_COMMUNICATION_STRATEGY_hu.md) dokumentumot, hogy hogyan döntsd el, melyik verziókat kell kommunikálni.

---

## Példák

### 1. Példa: Funkció Kiadás
```markdown
## [1.3.0] - 2026-01-10

### Funkciók
- Hozzáadva `useThemeContext` hook a téma állapot eléréséhez
- Bevezetésre került a `DataGrid` komponens rendezéssel és szűréssel

### Karbantartás
- Vite frissítve 5.0.11 verzióra
- Belső típusdefiníciók refaktorálva
```

**Jelzés**: MAGAS - Ez a verzió új képességeket szállít.

### 2. Példa: Karbantartási Kiadás
```markdown
## [1.2.8] - 2026-01-09

### Karbantartás
- React frissítve 18.3.1 verzióra
- Javult a belső build teljesítmény
- CI pipeline frissítve pnpm 8.15 használatára
```

**Jelzés**: ALACSONY - Ez a verzió egy állapot pillanatfelvétel.

### 3. Példa: Törő Változtatás Kiadás
```markdown
## [2.0.0] - 2026-01-08

### Törő Változtatások
- Eltávolított elavult `useLegacyTheme` hook
- Megváltozott a `Button` komponens `variant` propja `style`-ra

### Funkciók
- Bevezetésre került új témázási rendszer CSS változókkal

### Hibajavítások
- Javítva memória szivárgás a `DataTable` komponensben
```

**Jelzés**: KRITIKUS - Ez a verzió fogyasztói műveletet igényel.

---

## Irányelv Stabilitás

Ez az irányelv **stabilnak és érvényben lévőnek** tekintendő. Az irányelv változtatásai megkövetelik:
- Platform csapat jóváhagyását
- Indoklás dokumentálását
- Kommunikációt minden engine fogyasztó felé

---

## Kapcsolódó Védővonalak

Lásd még:
- [Engine Verziókezelési Irányelv](./ENGINE_VERSIONING_POLICY_hu.md) - Meghatározza mit jelentenek a verziószámok
- [Kiadás Kommunikációs Stratégia](./RELEASE_COMMUNICATION_STRATEGY_hu.md) - Meghatározza mikor kell bejelenteni a verziókat
- [Védővonalak Dokumentáció](../validation/guardrails_hu.md) - Általános minőségi kontrollok
