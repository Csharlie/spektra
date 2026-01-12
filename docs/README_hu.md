# Spektra Dokumentáció

**Egyetlen igazság forrása a Spektra architektúrához, eszközökhöz és munkafolyamatokhoz.**

## Cél

Ez a dokumentációs rendszer rögzíti az összes architekturális döntést, validációs szabályt, eszközválasztást és munkafolyamatot, amelyeket a Spektra projektben használunk. Kanonikus referenciaként szolgál az alábbiak számára:

- Spektrán dolgozó fejlesztők
- AI asszisztensek (GitHub Copilot)
- Új csapattagok betanítása
- Kódáttekintési szabványok

## Dokumentáció Struktúra

### 📐 [Architektúra](./architecture/)

Alapvető architekturális minták és tervezési döntések.

- **[UI Architektúra](./architecture/ui-architecture_hu.md)** - Komponens réteg struktúra, Atomic Design leképezés, felelősségi határok

### ✅ [Validáció](./validation/)

Hogyan kerül kikényszerítésre a kódminőség és az architekturális megfelelés.

- **[Validációs Pipeline](./validation/validation-pipeline_hu.md)** - Build, lint, test folyamat TurboRepo használatával
- **[Guardrails](./validation/guardrails_hu.md)** - Architekturális megszorítások és ESLint szabályok

### 🛠️ [Eszközök](./tooling/)

A Spektrában használt eszközök és csomagkezelés.

- **[Csomagkezelés](./tooling/package-management_hu.md)** - PNPM workspace-ek, TurboRepo integráció, dependency kezelés

### 📦 [Verziókezelés](./versioning/)

Hogyan kezeljük a verziókat és milyen változtatások igényelnek verzió emelést.

- **[Verziókezelési Stratégia](./versioning/versioning-strategy_hu.md)** - SemVer szabályok, MAJOR/MINOR/PATCH döntések, changelog irányelvek

### 🔄 [Munkafolyamatok](./workflows/)

Fejlesztési munkafolyamatok és git folyamatok (tervezett).

- *Hamarosan*

### 📋 [Döntések](./decisions/)

Architekturális Döntési Rekordok (ADR) (tervezett).

- *Hamarosan*

## Olvasási Útmutató

### Új Fejlesztőknek

1. Kezd a [UI Architektúra](./architecture/ui-architecture_hu.md) dokumentummal a komponens struktúra megértéséhez
2. Olvasd el a [Guardrails](./validation/guardrails_hu.md) dokumentumot, hogy megtudd, mi a tiltott
3. Nézd át a [Csomagkezelés](./tooling/package-management_hu.md) dokumentumot a PNPM és Turbo használatához
4. Ellenőrizd a [Validációs Pipeline](./validation/validation-pipeline_hu.md) dokumentumot, hogy megértsd, hogyan validáld a kódodat

### AI Asszisztenseknek (Copilot)

Változtatások előtt:
1. **Mindig** olvasd el először a releváns dokumentációt
2. Ellenőrizd a [Guardrails](./validation/guardrails_hu.md) dokumentumot a megszorításokért
3. Ellenőrizd a réteghatárokat a [UI Architektúra](./architecture/ui-architecture_hu.md) dokumentumban
4. Tartsd tiszteletben a verziókezelési szabályokat a [Verziókezelési Stratégia](./versioning/versioning-strategy_hu.md) dokumentumban

**Kulcs elv:** Ha bizonytalan vagy, adj hozzá egy TODO kommentet ahelyett, hogy találgatnál.

### Kódáttekintőknek

Használd ezeket a dokumentumokat a validáláshoz:
- Architekturális megfelelés a [Guardrails](./validation/guardrails_hu.md) szerint
- Megfelelő réteg elválasztás a [UI Architektúra](./architecture/ui-architecture_hu.md) szerint
- Helyes verzió emelések a [Verziókezelési Stratégia](./versioning/versioning-strategy_hu.md) szerint
- Minden validáció átmegy a [Validációs Pipeline](./validation/validation-pipeline_hu.md) szerint

## Dokumentum Sablon

Minden dokumentáció ezt a struktúrát követi:

```markdown
# Cím

## Kontextus
Miért létezik ez, milyen problémát old meg.

## Döntés
Mi lett eldöntve. Légy explicit és tömör.

## Struktúra
Mappák, csomagok, felelősségek.

## Szabályok
Mi engedélyezett és mi tiltott.

## Eszköz Hatás
Hatás a PNPM-re, Turbo-ra, CI/CD-re, Copilot-ra.

## Verziókezelési Jegyzetek
Befolyásolja-e a verziókezelést.

## Kapcsolódó Dokumentumok
Linkek más releváns Spektra dokumentumokhoz.
```

## Kulcs Elvek

1. **Egyetlen Igazság Forrása** - Minden döntés itt van dokumentálva, nem szétszórva kód kommentekben
2. **Explicit az Implicit helyett** - Fogalmazd meg világosan a szabályokat, ne feltételezz megértést
3. **Eszközökkel Kikényszerített** - Ahol lehetséges, használj ESLint/TypeScript/CI-t a szabályok kikényszerítésére
4. **Élő Dokumentumok** - Frissítsd, ahogy a döntések változnak, ne hagyd, hogy a dokumentumok elsodródjanak

## Hozzájárulás a Dokumentációhoz

### Új Dokumentáció Hozzáadása

1. Kövesd a fenti dokumentum sablont
2. Adj hozzá linkeket ebből az indexből
3. Kereszthivatkozz kapcsolódó dokumentumokra
4. Frissítsd a verziókezelési jegyzeteket, ha architekturális

### Meglévő Dokumentáció Frissítése

1. **MINOR változtatások** (pontosítások, példák) - Nincs verzió emelés
2. **MAJOR változtatások** (új szabályok, megváltozott döntések) - Dokumentáld a changelogban
3. Mindig ellenőrizd, hogy a kereszthivatkozások érvényesek maradnak

## Gyors Referencia

### Komponens Réteg Hierarchia

```
Templates (Oldal elrendezések)
    ↑
Sections (Organisms - Heroes, Galleries)
    ↑
Features (Molecules - Cards, NavItems)
    ↑
UI (Atoms - Buttons, Inputs)
    ↑
Utils / Hooks / Design System
```

### Validációs Parancsok

```bash
# Engine
cd engine
pnpm install
pnpm lint      # Kódminőség ellenőrzése
pnpm build     # Összes csomag build-elése
pnpm test      # Tesztek futtatása (jövőbeli)

# Projects
cd projects
pnpm install
cd projects/baseline
pnpm dev         # Projekt futtatása
pnpm build       # Projekt build-elése
```

### Verzió Emelési Szabályok

| Változtatás Típusa | Verzió Emelés | Példa |
|-------------|--------------|---------|
| Törő API változás | MAJOR | Prop átnevezve, komponens eltávolítva |
| Új komponens/funkció | MINOR | Új Gallery komponens |
| Bug javítás, refaktor | PATCH | Button hover szín javítva |

### Tiltott az Engine-ben

```typescript
// ❌ SOHA - Project importok
import x from '../../../projects/my-project';

// ❌ SOHA - CMS könyvtárak
import axios from 'axios';

// ❌ SOHA - Kliens nevek
const client = 'my-project';

// ❌ SOHA - Lefelé irányuló réteg importok
// (Atoms importálnak Molecules-t, stb.)
```

## Kapcsolódó Fájlok

Ezek a repository gyökér fájlok kapcsolódnak, de nem részei a `/docs` mappának:

- [README.md](../README.md) - Repository áttekintés és gyors kezdés
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Hozzájárulási irányelvek és munkafolyamatok
- [GIT_WORKFLOW.md](../GIT_WORKFLOW.md) - Git branching és upstream szinkronizáció
- [engine/GUARDRAILS.md](../engine/GUARDRAILS.md) - Eredeti guardrails specifikáció (felváltva a [docs/validation/guardrails_hu.md](./validation/guardrails_hu.md) által)

## Karbantartás

Ezt a dokumentációt az alábbiak tartják karban:
- Repository tulajdonosok
- Core közreműködők
- Automatizált frissítések CI/CD-n keresztül (jövőbeli)

Utolsó nagy frissítés: 2026. január

---

**Pontosításra van szükség?** Nyiss egy issue-t vagy nézd meg a fenti kapcsolódó dokumentumokat.
