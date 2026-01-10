# Engine Verziókezelési Irányelv

**Státusz**: Érvényben  
**Tulajdonos**: Platform Csapat  
**Hatálybalépés**: 2026. január  
**Hatókör**: Spektra Engine (belső platform)  
**Kapcsolódó dokumentumok**:
- [CHANGELOG Irányelv](./CHANGELOG_POLICY_hu.md)
- [Kiadás Kommunikációs Stratégia](./RELEASE_COMMUNICATION_STRATEGY_hu.md)

---

## Cél

Ez az irányelv meghatározza a **verziószámok szemantikus jelentését** a Spektra engine-ben, és a verziókezelést determinisztikus, automatizált és auditálható folyamatként rögzíti. Formalizálja a kód változtatások és verziószámok közötti kapcsolatot, biztosítva, hogy a verziókezelés megbízható állapot azonosítóként szolgáljon a platform számára.

**Ez az egyetlen igazság forrása arra vonatkozóan, hogy mit jelentenek a verziószámok a Spektrában.**

---

## Verziókezelési Filozófia

### Alapelvek

1. **A verziók állapot azonosítók**, nem marketing események
2. **Az automatizálás tekintélyelvű**, nem útmutató
3. **A PATCH verziók gyakoriak és szándékosak**, nem zaj
4. **A Szemantikus Verziókezelés (SemVer) szigorúan érvényesített**
5. **A verzió történet megváltoztathatatlan és auditálható**

### Engine mint Platform

A Spektra engine egy **belső platform**, amelyet több fogyasztó projekt használ (baseline, autozeno, bellator, stb.). A verziókezelési döntések prioritásai:
- **Stabilitás**: A fogyasztók megbízhatnak a verzió szerződésekben
- **Auditálhatóság**: Minden verzió visszavezethető specifikus változtatásokhoz
- **Kiszámíthatóság**: A verzió növelések determinisztikus szabályokat követnek

---

## Szemantikus Verziókezelés Meghatározás

Az engine a **Szemantikus Verziókezelés 2.0.0** szabványt követi (https://semver.org/).

**Formátum**: `MAJOR.MINOR.PATCH`

### Verzió Komponens Jelentések

| Komponens | Jelentés | Mikor növeljük |
|-----------|----------|----------------|
| **MAJOR** | Törő változtatások | Publikus API eltávolítva vagy inkompatibilisen megváltoztatva |
| **MINOR** | Új funkciók | Visszafelé kompatibilis funkcionalitás hozzáadva |
| **PATCH** | Javítások és karbantartás | Visszafelé kompatibilis javítások vagy belső változtatások |

---

## MAJOR Verzió (X.0.0)

### Meghatározás
Egy MAJOR verzió növelés **törő változtatásokat** jelez, amelyek fogyasztói kód módosításokat igényelnek.

### Kiváltók
- Publikus API eltávolítás
- Függvény szignatúra változtatások
- Alapértelmezett viselkedés változtatása, ami megtöri a meglévő használatot
- Átnevezett vagy áthelyezett exportok
- Megváltozott adatstruktúrák a publikus API-kban

### NEM Kiváltók
- Belső törő változtatások (nem publikus API-k)
- Kísérleti/instabil funkciók változtatásai (ha úgy vannak dokumentálva)
- Függőség major verzió frissítések (API hatás nélkül)

### Példa
```javascript
// v1.x.x
export function createTheme(options: ThemeOptions): Theme

// v2.0.0 — TÖRŐ VÁLTOZTATÁS
export function createTheme(config: ThemeConfig): Theme
```

**Indoklás**: A függvény szignatúra megváltozott; a fogyasztóknak frissíteniük kell.

---

## MINOR Verzió (x.Y.0)

### Meghatározás
Egy MINOR verzió növelés **új funkciókat** jelez, amelyek visszafelé kompatibilisek.

### Kiváltók
- Új publikus függvények, komponensek vagy segédeszközök
- Új konfigurációs opciók (alapértelmezett értékekkel)
- Kibővített meglévő API-k (csak additív)
- Új exportok

### NEM Kiváltók
- Belső refaktorálás API változtatások nélkül
- Teljesítményjavítások (hacsak nincs funkciókként meghirdetve)
- Hibajavítások

### Példa
```javascript
// v1.2.x
export { Button, Card } from './components'

// v1.3.0 — ÚJ FUNKCIÓ
export { Button, Card, DataGrid } from './components'
```

**Indoklás**: Új export hozzáadva; nincsenek törő változtatások.

---

## PATCH Verzió (x.y.Z)

### Meghatározás
Egy PATCH verzió növelés **visszafelé kompatibilis javításokat vagy karbantartást** jelez.

**KRITIKUS**: A PATCH NEM jelent "jelentéktelent". Azt jelenti, hogy "nem-törő".

### Kiváltók
- Hibajavítások
- Függőség-frissítések (API változtatások nélkül)
- Belső refaktorálás
- Típus fejlesztések (nem-törő)
- Dokumentáció javítások
- CI/CD változtatások
- Build fejlesztések
- Teljesítmény optimalizálások

### Filozófia: PATCH mint Állapot Pillanatfelvétel

A Spektrában a **PATCH verziók szándékosan gyakoriak**. Ez nem hiba; a rendszer egyik jellemzője.

#### Miért Gyakoriak a PATCH Verziók

1. **Függőség Kezelés**: Rendszeres függőség-frissítések PATCH verziókat hoznak létre
2. **Folyamatos Fejlesztés**: A belső refaktorálás folyamatos
3. **Állapot Auditálhatóság**: A kódbázis minden állapota verziókezelve van
4. **Visszaállítás Precizitás**: A finomhangolt verziók lehetővé teszik a pontos visszaállításokat

#### PATCH ≠ Triviális

Egy PATCH verzió tartalmazhat:
- Több függőség-frissítést
- Jelentős belső refaktorálást
- Teljesítményjavításokat
- Típusrendszer fejlesztéseket

**A verzió az állapotot dokumentálja.** A CHANGELOG kategorizálja a változtatásokat.

### Példa
```markdown
## [1.2.8] - 2026-01-09

### Karbantartás
- React frissítve 18.2.0-ról 18.3.1-re
- Belső téma provider refaktorálva a típusbiztonságért
- Build teljesítmény javítva 15%-kal
```

**Indoklás**: Nincsenek publikus API változtatások; minden fejlesztés belső vagy függőségek.

---

## Verzió Növelés Döntési Fa

```
┌─────────────────────┐
│   Kód Változtatás   │
└──────────┬──────────┘
           │
           ▼
    ┌─────────────────────────┐
    │ Megtöri a publikus      │──IGEN──▶ MAJOR
    │       API-t?            │
    └──────────┬──────────────┘
               │ NEM
               ▼
    ┌─────────────────────────┐
    │ Új publikus             │──IGEN──▶ MINOR
    │   funkcionalitást ad?   │
    └──────────┬──────────────┘
               │ NEM
               ▼
    ┌─────────────────────────┐
    │  Javítás, karbantartás  │──IGEN──▶ PATCH
    │  vagy belső változás?   │
    └─────────────────────────┘
```

---

## Automatizálás és Eszközök

### semantic-release mint Egyetlen Autoritás

A Spektra engine a **semantic-release**-t használja a verziókezelési irányelv érvényesítésére.

**Fő Tulajdonságok**:
- Teljesen automatizált verzió meghatározás
- Hagyományos commit üzeneteken alapul
- Nincs emberi diszkréció a verziószám hozzárendelésben
- Megváltoztathatatlan verzió történet

### Hagyományos Commit Leképezés

A semantic-release a commit üzenet prefixekből határozza meg a verzió növeléseket:

| Commit Típus | Verzió Hatás | Példa |
|--------------|--------------|-------|
| `feat:` | MINOR | `feat: add DataGrid component` |
| `fix:` | PATCH | `fix: resolve Button hover state` |
| `chore:` | PATCH | `chore: update dependencies` |
| `docs:` | PATCH | `docs: fix README typo` |
| `refactor:` | PATCH | `refactor: simplify theme logic` |
| `style:` | PATCH | `style: format code` |
| `test:` | PATCH | `test: add DataGrid unit tests` |
| `BREAKING CHANGE:` | MAJOR | Bármely commit `BREAKING CHANGE:` footerrel |

**Érvényesítés**: A CI pipeline validálja a commit üzenet formátumot. A nem-megfelelő commitok elutasításra kerülnek.

### Git Tag Formátum

Minden verzió egy **annotált Git tag**-gel van megjelölve:

**Formátum**: `engine-vX.Y.Z`

**Példa**: `engine-v1.3.0`

**Miért Prefixes**:
- Monorepo struktúra: Megkülönbözteti az engine verziókat a projekt verzióktól
- Névtér tisztaság: Elkerüli a tag ütközéseket

**Tag Tulajdonságok**:
- A semantic-release hozza létre
- Tartalmazza a kiadási jegyzeteket
- Kriptográfiailag aláírt (jövőbeli fejlesztés)

---

## Verzió Életciklus

### Létrehozás
1. Fejlesztő egyesít PR-t a `main`-be
2. CI pipeline fut
3. semantic-release elemzi a commitokat az utolsó verzió óta
4. Verziószám automatikusan meghatározva
5. CHANGELOG frissítve
6. Git tag létrehozva
7. GitHub release publikálva
8. Csomag publikálva (ha alkalmazható)

### Megváltoztathatatlanság
Amint egy verzió publikálva van:
- **Nem változtatható meg**
- **Nem törölhető**
- **Nem adható ki újra**

Ha egy verzió helytelen:
- Hozz létre egy új verziót a javítással
- Dokumentáld a problémát a CHANGELOG-ban
- NE írd át a történetet

### Elavulás
Funkcionalitás elavulásához:
1. Jelöld elavultként a jelenlegi verzióban (MINOR)
2. Dokumentáld a CHANGELOG-ban
3. Engedj türelmi időt (jellemzően 2-3 MINOR verzió)
4. Távolítsd el a következő MAJOR verzióban

---

## Verziószám Szemantika a Spektrában

### Mit Jelent a MAJOR
- **Fogyasztói művelet szükséges**
- **Törő változtatások jelen vannak**
- **Migrációs útmutató kötelező**
- **Kommunikáció kötelező**

### Mit Jelent a MINOR
- **Új képességek elérhetőek**
- **Nincsenek törő változtatások**
- **Opcionális a fogyasztók számára**
- **Kommunikáció ajánlott**

### Mit Jelent a PATCH
- **Állapot pillanatfelvétel**
- **Nincsenek törő változtatások**
- **Tartalmazhat javításokat, karbantartást vagy belső fejlesztéseket**
- **Kommunikáció opcionális**

**Fontos**: A PATCH verziók gyakorisága NEM csökkenti azok érvényességét. Minden PATCH verzió a platform egy stabil, auditálható állapotát reprezentálja.

---

## Irányelv Indoklás

### Miért Gyakoriak a PATCH Verziók?

#### 1. Ok: Függőség Kezelés
Az engine külső csomagoktól függ (React, Vite, TypeScript, stb.). A rendszeres frissítések naprakészen és biztonságosan tartják a függőségeket. Minden frissítés egy PATCH verzió.

**Megfontolt Alternatíva**: Kötegelt függőség-frissítések.  
**Elutasítva, Mert**: A kötegelt frissítések késleltetik a biztonsági javításokat és nagyobb, kockázatosabb frissítéseket hoznak létre.

#### 2. Ok: Folyamatos Fejlesztés
A belső kód minőség fejlesztések (refaktorálás, típus fejlesztések, teljesítmény) folyamatosak. Ezek változtatások verziókezelése audit nyomvonalat hoz létre.

**Megfontolt Alternatíva**: Csak "jelentős" változtatások verziókezelése.  
**Elutasítva, Mert**: A "jelentős" szubjektív; az automatizálás objektív.

#### 3. Ok: Pontos Visszaállítások
Ha egy fogyasztó projekt problémába ütközik, a finomhangolt verziók lehetővé teszik az utolsó ismert jó állapotra való pontos visszaállítást.

**Megfontolt Alternatíva**: Kevesebb verzió, szélesebb változtatások verzióként.  
**Elutasítva, Mert**: Növeli a problémák hatótávolságát; nehezebbé teszi a hibás változtatások azonosítását.

#### 4. Ok: Auditálhatóság
Minden beolvasztott változtatás visszavezethető egy specifikus verzióhoz. Ez támogatja a megfelelőséget, hibakeresést és történeti elemzést.

**Megfontolt Alternatíva**: Több változtatás összevonása egyetlen verzióba.  
**Elutasítva, Mert**: Elveszti a nyomon követhetőséget; megnehezíti a problémák kettéosztását.

### Konzervatív Tervezéssel

A Spektra verziókezelési irányelv **szándékosan konzervatív**:
- Több verzió irányába téved, nem kevesebb
- A változtatások dokumentálása irányába téved, nem azok elrejtése
- Az automatizálás irányába téved, nem az emberi diszkréció

**Ez a konzervativizmus támogatja a stabilitást és bizalmat.**

---

## Fogyasztói Következmények

### Projekt Csapatok Számára

A fogyasztó projektek (baseline, autozeno, bellator) az engine verzióival a `package.json`-ön keresztül lépnek kapcsolatba.

#### Verzió Rögzítés
```json
{
  "dependencies": {
    "@spektra/core": "1.3.0"
  }
}
```
**Használd, amikor**: Abszolút stabilitás szükséges; manuális frissítés preferált.

#### Tartomány Specifikációk
```json
{
  "dependencies": {
    "@spektra/core": "^1.3.0"
  }
}
```
**Használd, amikor**: Automatikus PATCH frissítések kívánatosak; bizalom a szemantikus verziókezelésben.

#### Frissítési Stratégia
- **MAJOR**: Manuális áttekintés és migráció szükséges
- **MINOR**: Tekintsd át az új funkciókat; alkalmazd, ha hasznos
- **PATCH**: Biztonságos automatikus frissítés (a CI elkap problémákat)

### Verzió Feloldás

A projektek `pnpm`-et használnak függőség kezeléshez. A verzió feloldás a pnpm szabályait követi:
- `^1.3.0` → Legújabb 1.x.x (MINOR és PATCH frissítések megengedettek)
- `~1.3.0` → Legújabb 1.3.x (csak PATCH frissítések)
- `1.3.0` → Pontos verzió (nincs frissítés)

**Ajánlott**: Használj `^`-t a legtöbb esetben; csak akkor használj pontos rögzítést, ha verzió-specifikus problémákat keresel.

---

## Kivételek és Határesetek

### Nincsenek Kivételek
Ennek az irányelvnek **nincsenek kivételei**. Minden engine változtatás ugyanazokat a verziókezelési szabályokat követi.

### Határesetek

#### Csak Dokumentációs Változtatások
**Forgatókönyv**: Elírás javítása a README-ben  
**Commit**: `docs: fix typo in README`  
**Eredmény**: PATCH verzió növelés

**Indoklás**: Konzisztens automatizálás fenntartása; a dokumentáció a csomag része.

#### Csak Teszt Változtatások
**Forgatókönyv**: Unit tesztek hozzáadása kód változtatások nélkül  
**Commit**: `test: add DataGrid tests`  
**Eredmény**: PATCH verzió növelés

**Indoklás**: A tesztek a kódbázis állapot részei; a verzió dokumentálja ezt az állapotot.

#### Csak CI Változtatások
**Forgatókönyv**: GitHub Actions workflow frissítése  
**Commit**: `chore: update CI workflow`  
**Eredmény**: PATCH verzió növelés

**Indoklás**: A CI változtatások befolyásolják a build kimenetet; a verzió dokumentálja a változtatást.

#### Kísérleti Funkciók
**Forgatókönyv**: Kísérleti API hozzáadása  
**Commit**: `feat: add experimental useDataStream hook`  
**Eredmény**: MINOR verzió növelés

**Indoklás**: Még a kísérleti funkciók is hozzáadások; dokumentáld úgy. Jelöld kísérletinek a dokumentációban.

---

## Irányítás és Érvényesítés

### Automatizált Érvényesítés
- semantic-release validálja a commitokat
- CI pipeline érvényesíti a hagyományos commit formátumot
- Nem-megfelelő commitok nem egyesíthetők

### Manuális Felügyelet
A platform csapat felülvizsgálja:
- MAJOR verzió kiadási jegyzeteket (manuális jóváhagyás merge előtt)
- CHANGELOG kategorizálást (kiadás utáni validálás)
- Fogyasztó projekt migrációs támogatást (MAJOR verzióknál)

### Irányelv Megsértések
Ha a verziókezelési irányelv megsértésre kerül:
1. Azonosítsd a kiváltó okot (commit üzenet hiba, semantic-release konfig probléma)
2. Dokumentáld az incidens naplóban
3. Javítsd a kiváltó okot
4. **NE írd át a verzió történetet**
5. Hozz létre javító verziót, ha szükséges

---

## Metrikák és Monitoring

### Verzió Gyakoriság Metrikák
- Átlagos PATCH verziók hetente (elvárt: 3-5)
- Átlagos MINOR verziók havonta (elvárt: 1-2)
- Átlagos MAJOR verziók évente (elvárt: 0-1)

### Eltérési Indikátorok
- Nincs verzió >1 hétig (vizsgáld: a fejlesztés leállt?)
- >2 MAJOR verzió évente (vizsgáld: az API instabil?)
- PATCH gyakoriság >10/hét (vizsgáld: a CI túl sokat vált ki?)

---

## Történeti Kontextus

### Verzió Történet Alapvonal
Az irányelv hatálybalépésének időpontjában (2026. január):
- Jelenlegi verzió: `engine-v1.x.x` (pontos verzió a jelenlegi állapottól függ)
- Összes verzió: (számított a Git történetből)
- Átlagos PATCH gyakoriság: (számított a közelmúlt történetéből)

### Irányelv Előtti Viselkedés
Ezen irányelv előtt:
- A verziókezelés manuális volt
- Inkonzisztens SemVer alkalmazás
- Törzskönyvi tudás határozta meg a verzió növeléseket

**Irányelv Után**:
- Teljesen automatizált
- Determinisztikus és dokumentált
- Nincs emberi diszkréció

---

## Hosszú Távú Stabilitás

Ez az irányelv **hosszú távú stabilitásra** lett tervezve. A jövőbeli változtatások lesznek:
- Ritkák
- Jól indokoltak
- Előre kommunikáltak
- Visszafelé kompatibilisek (az irányelv az irányelvről stabil)

---

## Kapcsolódó Koncepciók

### Verzió vs Kiadás
- **Verzió**: Technikai állapot azonosító (automatizált)
- **Kiadás**: Kommunikált esemény (szelektív)

Lásd a [Kiadás Kommunikációs Stratégia](./RELEASE_COMMUNICATION_STRATEGY_hu.md) dokumentumot.

### Verzió vs Changelog Bejegyzés
- **Verzió**: Az állapotot azonosító szám
- **Changelog Bejegyzés**: Ember által olvasható változtatások leírása

Lásd a [CHANGELOG Irányelv](./CHANGELOG_POLICY_hu.md) dokumentumot.

---

## Összefoglalás

| Szempont | Irányelv |
|----------|----------|
| **Verziókezelési Szabvány** | Szemantikus Verziókezelés 2.0.0 |
| **Automatizálás** | semantic-release (tekintélyelvű) |
| **MAJOR** | Csak törő változtatások |
| **MINOR** | Csak új funkciók |
| **PATCH** | Javítások, karbantartás, belső változtatások |
| **Gyakoriság** | Magas (tervezetten) |
| **Kivételek** | Nincsenek |
| **Kommunikáció** | Szelektív (lásd Kommunikációs Stratégia) |
| **Érvényesítés** | Automatizált CI-n keresztül |

---

## Záró Nyilatkozat

**A PATCH verziók nem zaj. Precizitás.**

A Spektra engine egy nagy-frekvenciájú verziókezelési modell szerint működik, ahol minden változtatás verziókezelve, dokumentálva és auditálható. Ez szándékos, konzervatív, és támogatja a platform hosszú távú stabilitását.

A verziószámok állapot azonosítók, nem marketing eszközök. A verziók gyakorisága a platform folyamatos evolúcióját tükrözi, nem instabilitást.

**Ez az irányelv érvényesített, stabil és nem tárgyalható.**

---

## Irányelv Metaadat

**Verzió**: 1.0.0  
**Jóváhagyta**: Platform Csapat  
**Következő Felülvizsgálat Dátuma**: 2026 Q3  
**Changelog**: Kezdeti irányelv létrehozás

---

## Kapcsolat

Az irányelvre vonatkozó kérdésekhez:
- **Technikai**: Platform csapat Slack csatorna
- **Folyamat**: Platform csapat vezető
- **Kivételek**: Nincsenek (de határesetek megvitathatók)
