# Kiadás Kommunikációs Stratégia

**Státusz**: Érvényben  
**Tulajdonos**: Platform Csapat  
**Hatálybalépés**: 2026. január  
**Kapcsolódó dokumentumok**:
- [Engine Verziókezelési Irányelv](./ENGINE_VERSIONING_POLICY_hu.md)
- [CHANGELOG Irányelv](./CHANGELOG_POLICY_hu.md)

---

## Cél

Ez a stratégia formálisan elválasztja a **verzió létrehozását** (technikai állapot) a **kiadás kommunikációtól** (üzleti esemény). Nem minden verziót kommunikálunk. Nem minden verzió igényel érdekelt felek figyelmét. Ez az irányelv megvédi az üzleti kommunikációt a verzió inflációtól, miközben fenntartja a technikai precizitást.

**Verzió ≠ Kiadás Bejelentés**

---

## Alapelv

A Spektra engine egy **nagy-frekvenciájú verziókezelési modellt** követ, ahol:
- Minden beolvasztott változtatás létrehoz egy verziót
- A verziók dokumentálják a jelenlegi állapotot
- A kommunikáció szelektív a hatás alapján

**A determinisztikus verziókezelés NEM igényel determinisztikus kommunikációt.**

---

## Meghatározások

### Verzió
Egy **technikai állapot azonosító**, amelyet automatikusan létrehoz a semantic-release.
- A kódbázis történetének egy pontját reprezentálja
- Mindig dokumentált a CHANGELOG-ban
- Mindig meg van jelölve Git-ben
- NEM igényel emberi kommunikációt

**Példa**: `engine-v1.2.8`

### Kiadás Bejelentés
Egy **kommunikált esemény**, ahol az érdekelt feleket tájékoztatjuk egy verzió létezéséről és jelentőségéről.
- Szelektív a hatás alapján
- Emberi döntést igényel
- Több verziót is lefedhet
- Célozza a specifikus közönségeket

**Példa**: "Az Engine 1.3.0 új témázási képességeket vezet be"

---

## Kommunikációs Döntési Mátrix

| Verzió Típus | Funkciók | Törő Változtatások | Hibajavítások | Karbantartás | Kommunikáció Szükséges? |
|--------------|----------|-------------------|---------------|--------------|------------------------|
| **MAJOR** | Bármely | IGEN | Bármely | Bármely | **KÖTELEZŐ** |
| **MINOR** | IGEN | Nem | Bármely | Bármely | **AJÁNLOTT** |
| **PATCH** | Nem | Nem | IGEN | Bármely | **FELTÉTELES** |
| **PATCH** | Nem | Nem | Nem | IGEN | **OPCIONÁLIS** |

### Döntési Szabályok

#### KÖTELEZŐ Kommunikáció
- Minden MAJOR verzió
- Bármely verzió törő változtatásokkal
- Bármely verzió, ami érinti a fogyasztói API-kat

**Indoklás**: A fogyasztóknak tudniuk kell az akciókat igénylő változtatásokról.

#### AJÁNLOTT Kommunikáció
- MINOR verziók új funkciókkal
- Hibajavítások, amelyek ismert problémákat oldanak meg
- Teljesítményjavítások mérhető hatással

**Indoklás**: A fogyasztók profitálnak az új képességek tudatosításából.

#### FELTÉTELES Kommunikáció
- PATCH verziók kritikus hibajavításokkal
- Biztonság-kapcsolatos PATCH verziók
- Nemrég jelentett problémák javításai

**Indoklás**: A súlyosságtól és sürgősségtől függ.

#### OPCIONÁLIS Kommunikáció
- Csak karbantartást tartalmazó PATCH verziók
- Belső refaktorálási verziók
- Függőség-frissítések API hatás nélkül

**Indoklás**: Alacsony külső érték; a CHANGELOG elegendő.

---

## Kommunikációs Csatornák

### Belső Csatornák

#### Platform Csapat Slack
**Közönség**: Engine karbantartók  
**Gyakoriság**: Minden verzió  
**Formátum**: Automatizált értesítés a CI-ból

**Példa**:
```
🚀 Engine v1.2.8 kiadva
📝 Karbantartás: Függőség-frissítések
🔗 https://github.com/org/spektra/releases/tag/engine-v1.2.8
```

#### Projekt Csapat Csatornák
**Közönség**: Fogyasztó projekt csapatok (baseline, autozeno, bellator, stb.)  
**Gyakoriság**: Csak MINOR és MAJOR verziók  
**Formátum**: Manuális értesítés migrációs jegyzetekkel

**Példa**:
```
📢 Engine v1.3.0 Elérhető

Új funkciók:
- useThemeContext hook
- DataGrid komponens

Migráció: Nincsenek törő változtatások
Docs: https://...
```

### Külső Csatornák

#### Kiadási Jegyzetek (GitHub)
**Közönség**: Minden érdekelt fél  
**Gyakoriság**: Minden verzió  
**Formátum**: Automatikusan generált a semantic-release által

**Tartalom**: Teljes CHANGELOG bejegyzés a verzióhoz.

#### Érdekelt Felek Bejelentései
**Közönség**: Üzleti érdekelt felek, product ownerek  
**Gyakoriság**: Csak MAJOR és jelentős MINOR verziók  
**Formátum**: Összefoglalt email vagy értekezlet frissítés

**Példa**:
```
Tárgy: Engine 2.0.0 Kiadva - Törő Változtatások

A platform csapat kiadta az Engine 2.0.0-t a következő 
törő változtatásokkal, amelyek fogyasztói projekt frissítést igényelnek:

- Eltávolított useLegacyTheme (elavult 1.8.0 óta)
- Button komponens API változtatások

Migrációs határidő: A projekteknek frissíteniük kell 2026. február 1-ig.
Támogatás: Platform csapat fogadóóra minden kedden.
```

---

## Kommunikációs Sablonok

### Sablon: MAJOR Verzió
```markdown
# Engine {verzió} Kiadva — Törő Változtatások

**Kiadás Dátuma**: {dátum}
**Migrációs Határidő**: {dátum + 3 hét}

## Törő Változtatások
{törő változtatások listája migrációs lépésekkel}

## Új Funkciók
{új funkciók listája}

## Migrációs Útmutató
{link a migrációs dokumentációhoz}

## Támogatás
{kapcsolat információ}
```

### Sablon: MINOR Verzió
```markdown
# Engine {verzió} Elérhető — Új Funkciók

**Kiadás Dátuma**: {dátum}

## Újdonságok
{funkciók listája példákkal}

## Hibajavítások
{jelentős javítások listája}

## Hogyan Frissíts
{frissítési utasítások}
```

### Sablon: PATCH Verzió (ha kommunikált)
```markdown
# Engine {verzió} — Kritikus Javítás

**Kiadás Dátuma**: {dátum}

## Javítás Összefoglaló
{javítás leírása és hatása}

## Érintett Verziók
{verziók listája a hibával}

## Frissítés Ajánlott
{frissítési utasítások}
```

---

## Kötegelt Kommunikáció

### Mikor Kötegeljünk
Több PATCH verzió, amely csak Karbantartás bejegyzéseket tartalmaz, kötegelhető egyetlen kommunikációba.

**Példa**:
```
Verziók 1.2.8, 1.2.9, 1.2.10 (jan. 8-10):
- Rutin függőség-frissítések
- Belső teljesítményjavítások
- Nincsenek API változások

Jelenlegi stabil: v1.2.10
```

### Mikor NE Kötegeljünk
- Törő változtatásokat tartalmazó verziók (mindig azonnali kommunikáció)
- Felhasználó-központú hibajavításokat tartalmazó verziók (kommunikáld egyenként)
- MINOR verziók (mindegyik megérdemel dedikált kommunikációt)

---

## Csendes Kiadások

Egy **csendes kiadás** olyan verzió, amely:
- Dokumentált a CHANGELOG-ban
- Megjelölve Git-ben
- Elérhető fogyasztásra
- NEM aktívan kommunikált az érdekelt felek felé

**A csendes kiadások érvényesek és várhatóak.**

### Csendes Kiadás Kritériumai
- Csak karbantartási változtatások
- Belső refaktorálás
- Függőség-frissítések fogyasztói hatás nélkül
- CI/CD fejlesztések

### Példa
```markdown
## [1.2.8] - 2026-01-09

### Karbantartás
- React frissítve 18.3.1 verzióra
- Javult a build teljesítmény
- CI pipeline konfiguráció frissítve
```

**Kommunikáció**: Nem szükséges. A verzió létezik audit nyomvonalként és állapot dokumentációként.

---

## Kommunikációs Időzítés

### Azonnali (1 órán belül)
- MAJOR verziók törő változtatásokkal
- Biztonság-kapcsolatos javítások
- Kritikus hibajavítások

### Aznap
- MINOR verziók funkciókkal
- Jelentős hibajavítások

### Heti Összefoglaló (opcionális)
- Több karbantartási PATCH verzió
- Alacsony prioritású frissítések

---

## Engine mint Platform Kontextus

A Spektra engine egy **belső platform**, nem egy publikus könyvtár. A kommunikációs stratégia ezt tükrözi:

### Belső vs Külső
- **Belső**: Közvetlen kommunikáció lehetséges; szinkron frissítések megvalósíthatóak
- **Külső**: Szélesebb körű bejelentéseket igényelne; még nem alkalmazható

### Fogyasztó Tudatosság
- A fogyasztó projektek az engine-től függnek a package.json-on keresztül
- A projektek megadhatnak verzió tartományokat vagy rögzíthetnek verziókat
- A kommunikáció segít a projekteknek dönteni, mikor frissítsenek

### Verziókezelési Ritmus
- Nagy-frekvenciájú technikai verziókezelés
- Alacsony-frekvenciájú üzleti kommunikáció
- Ez az elválasztás szándékos és egészséges

---

## Anti-minták

### ❌ Minden Verziót Bejelenteni
**Probléma**: Kommunikációs fáradtság; az érdekelt felek ignorálják a bejelentéseket.

**Helyes Megközelítés**: Szelektív kommunikáció a hatás alapján.

### ❌ Csendes Kiadások Dokumentálásának Kihagyása
**Probléma**: Audit nyomvonal hiányosságok; homályos verzió történet.

**Helyes Megközelítés**: Dokumentálj minden verziót a CHANGELOG-ban; kommunikálj szelektíven.

### ❌ Törő Változtatás Kommunikáció Késleltetése
**Probléma**: A fogyasztó projektek váratlanul elromolnak.

**Helyes Megközelítés**: Azonnali kommunikáció MAJOR verziókhoz.

### ❌ Karbantartási Verziók Túlmagyarázása
**Probléma**: Zavar, hogy miért léteznek karbantartási verziók.

**Helyes Megközelítés**: Dokumentáld a CHANGELOG-ban; ne kommunikáld, hacsak nem kérdezik.

---

## Felelősségi Mátrix

| Tevékenység | Tulajdonos | Gyakoriság |
|-------------|------------|-----------|
| Verzió létrehozás | semantic-release (automatizált) | Minden main-be merge |
| CHANGELOG generálás | semantic-release (automatizált) | Minden verzió |
| GitHub Kiadási Jegyzetek | semantic-release (automatizált) | Minden verzió |
| Belső Slack értesítés | CI automatizálás | Minden verzió |
| Projekt csapat kommunikáció | Platform csapat | MINOR/MAJOR verziók |
| Érdekelt felek bejelentései | Platform csapat vezető | MAJOR verziók |

---

## Döntési Munkafolyamat

```
┌─────────────────────┐
│  Verzió Kiadva      │
│   (automatizált)    │
└──────────┬──────────┘
           │
           ▼
    ┌──────────────┐
    │ MAJOR?       │──IGEN──▶ Kötelező érdekelt felek kommunikáció
    └──────┬───────┘
           │ NEM
           ▼
    ┌──────────────┐
    │ MINOR?       │──IGEN──▶ Ajánlott projekt csapat kommunikáció
    └──────┬───────┘
           │ NEM
           ▼
    ┌──────────────────────┐
    │ Kritikus hibákat     │──IGEN──▶ Feltételes kommunikáció
    │      javít?          │
    └──────┬───────────────┘
           │ NEM
           ▼
    ┌──────────────────────┐
    │ Csak karbantartás?   │──IGEN──▶ Csendes kiadás (csak CHANGELOG)
    └──────────────────────┘
```

---

## Metrikák és Felülvizsgálat

### Kommunikációs Hatékonyság Metrikák
- Érdekelt felek tudatossága a törő változtatásokról (cél: 100%)
- Fogyasztó projekt frissítések ideje (cél: < 2 hét MAJOR-nél)
- Hamis pozitív kommunikációk (cél: < 10% a bejelentésekből)

### Negyedéves Felülvizsgálat
A platform csapat felülvizsgálja:
- Kommunikációs mintákat
- Érdekelt felek visszajelzéseit
- Verzió gyakoriság vs kommunikációs gyakoriság
- Szükséges módosításokat

---

## Irányelv Stabilitás

Ez a stratégia **stabilnak és érvényben lévőnek** tekintendő. A változtatások megkövetelik:
- Platform csapat konszenzust
- Dokumentáció frissítését
- Érdekelt felek értesítését

---

## Példák

### 1. Példa: MAJOR Verzió Kommunikáció
**Verzió**: `engine-v2.0.0`  
**Tartalom**: Button API törő változtatások  
**Csatornák**: Összes (Slack, email, érdekelt felek értekezlet)  
**Időzítés**: Azonnali

### 2. Példa: MINOR Verzió Kommunikáció
**Verzió**: `engine-v1.3.0`  
**Tartalom**: Új DataGrid komponens  
**Csatornák**: Projekt csapat Slack  
**Időzítés**: Aznap

### 3. Példa: Csendes PATCH Kiadás
**Verzió**: `engine-v1.2.8`  
**Tartalom**: Függőség-frissítések  
**Csatornák**: Egyik sem (csak automatizált GitHub release)  
**Időzítés**: N/A

### 4. Példa: Kötegelt PATCH Kommunikáció
**Verziók**: `engine-v1.2.8`-tól `engine-v1.2.12`-ig  
**Tartalom**: Több karbantartási pillanatfelvétel  
**Csatornák**: Heti összefoglaló a platform csapat Slack-ben  
**Időzítés**: Hét vége

---

## Kapcsolódó Irányelvek

Lásd még:
- [Engine Verziókezelési Irányelv](./ENGINE_VERSIONING_POLICY_hu.md) - Mit jelentenek a verziószámok
- [CHANGELOG Irányelv](./CHANGELOG_POLICY_hu.md) - Hogyan vannak dokumentálva a verziók
- [Verziókezelési Stratégia](../versioning/versioning-strategy_hu.md) - Magas szintű verziókezelési megközelítés
