# Spektra - A Multi‑client Frontend Platform

## Technikai Áttekintés

### Mi a Spektra?
A Spektra egy **multi‑client frontend platform** React + Vite + Tailwind stacken. A cél: **egységes tartalom‑modell**, **section‑alapú renderelés**, és **szigorú architekturális guardrail** a skálázhatóságért.

### Miért platform, miért section?
1. **Platform**: közös, újrahasznosítható architektúra több klienshez.
2. **Section**: a tartalom egysége. A CMS/JSON payload is “section” formában érkezik, ezért a renderelés is ezt követi.
3. **Guardrail**: import boundary szabályokkal és zero‑dep core‑ral könnyebb nagyban gondolkodni.

### Miért platform?
Egyedi app helyett **platformot** építünk, mert:
1. Több ügyfél/app is azonos alapokra épülhet.
2. Az adat‑ és tartalommodell egységes marad.
3. A fejlesztési döntések egyszer történnek meg, és mindenhol ugyanúgy működnek.

### Miért section‑alapú a Spektra?
A weboldalak tartalma **blokkokból** áll:
1. Hero
2. Features
3. About
4. Gallery
5. Contact

Ezt hívjuk **section‑nek**.  
Ha a tartalom section‑ökben érkezik, akkor egyszerű:
1. Betöltjük a section listát.
2. Minden section‑t a megfelelő komponensre fordítunk.
3. A data mezőt props‑ként átadjuk.

### Workspace struktúra (fő csomagok)
1. `@spektra/types`  
   Zero‑dep típuskontraktusok (SiteData, Section, Media, CTA).
2. `@spektra/data`  
   Adapter réteg (WordPress/JSON) + runtime SiteData validáció.
3. `@spektra/runtime`  
   React runtime: context, registry, renderer.
4. `@spektra/components`  
   Atomic UI komponensek.
5. `@spektra/sections`  
   Platform section definíciók.
6. `@spektra/themes`  
   Tailwind preset + semantic token layer.
7. `@spektra/layouts`  
   Oldalsablonok (pl. Landing).
8. `apps/playground`  
   Vite playground app — development & demo.

### Adapter, Runtime és Render – egyszerűen
1. **Adapter**: az a réteg, ami megszerzi és Spektra formára alakítja az adatot.
2. **Runtime**: az a réteg, ami “életre kelti” az adatot.
3. **Render**: a runtime megjeleníti a section‑öket.

Képletesen:
1. Az adapter megszerzi az adatot.
2. A runtime “megtanítja” a platformnak, hogy melyik section milyen komponens.
3. A render lerajzolja mindezt a képernyőre.

### Spektra‑specifikus fogalmak (közérthetően)
1. **SectionDefinition**  
   Azt mondja meg, hogy egy adott section milyen komponenshez tartozik.
2. **SectionRegistry**  
   Nyilvántartja a section definíciókat (mint egy plugin lista).
3. **SiteDataProvider**  
   Betölti az adatot és elérhetővé teszi az appban.
4. **SectionRenderer**  
   Végigmegy a section listán és kirendereli.

### Adatfolyam (adapter → runtime → render)
1. **Adapter** (`@spektra/data`)  
   `createWordPressAdapter` vagy `createJsonAdapter` lekéri a nyers adatot.
2. **Validáció** (`validateSiteData`)  
   Ellenőrzi a SiteData külső szerkezetét (site, navigation, pages, sections).
3. **Runtime** (`@spektra/runtime`)  
   `SiteDataProvider` betölti az adatot, és `SectionRegistry`‑n keresztül feloldja a section típust.
4. **Render**  
   `SectionRenderer` a SectionDefinition alapján rendereli a konkrét React komponenseket.

### Példa: Hogyan működik együtt (röviden)
1. A backend/CMS adatot ad → adapter átalakítja Spektra formára.
2. A runtime validálja és betölti.
3. A render megjeleníti.

Ez a Spektra “futása” a gyakorlatban.

### Mi az az Adapter a Spektrában?
Az **@spektra/data** az adat bejövő kapuja:
1. Adapter factory-k (WordPress, JSON) lekérik a nyers adatot.
2. A nyers adatot Spektra **SiteData** formára alakítják.
3. A validáció kiszűri a hibás payloadokat még a runtime előtt.

### Mi az a Runtime a Spektrában?
Az **@spektra/runtime** a platform futtató közege:
1. **SiteDataProvider**  
   Betölti az adatot az adapterből, és state‑et ad (`data`, `loading`, `error`).
2. **SectionRegistry**  
   Típus → komponens feloldás. Ezzel bővíthető a platform (plugin‑szerűen).
3. **SectionRenderer**  
   A `sections[]` listából létrehozza a React elemeket a regisztrált definíciók alapján.

### Mi az a Render a Spektrában?
“Render” itt nem a React általános fogalma, hanem a **section pipeline** utolsó lépése:
1. A `Section` objektumból **type** és **data** jön.
2. A registry ezt **komponensre fordítja**.
3. A `data` **props‑ként kerül szétosztásra** a konkrét komponensnek.

### Monorepo röviden (Spektrában)
A Spektra **pnpm monorepo** + **Turborepo**:
1. **Monorepo**: több csomag és app egy repo‑ban, közös verziózással és szabályokkal.
2. **pnpm**: gyors, determinisztikus node package manager, workspace támogatással.
3. **Turborepo**: task‑orchestration (build/dev/lint/test), cache‑elt futásokkal.

Spektrában ez azt jelenti, hogy a core csomagok (types, data, runtime, components, stb.) **egymásra épülnek**, és a build pipeline **párhuzamosan, cache‑elve** fut.

### Mi az a monorepo és miért jó?
**Monorepo** = egyetlen kódbázis, több csomaggal.
1. Minden csomag ugyanabban a repo‑ban van.
2. Nem kell külön verziók és külön repo‑k között zsonglőrködni.
3. Könnyebb egységes szabályokat és minőséget tartani.

### Miért pnpm?
1. Gyors és determinisztikus install.
2. Workspace‑ekhez ideális.
3. Kevesebb “dependency hell”.

### Miért Turborepo?
1. Egy helyről futtatja a build/lint/test feladatokat.
2. Cache‑el: ha semmi nem változott, nem fut újra.
3. Párhuzamosítja a feladatokat.

### Mit jelent ez a Spektrára vetítve?
1. A Spektra csomagjai egymásra épülnek.
2. Ha csak egy csomag változik, a többi nem buildelődik feleslegesen.
3. A fejlesztés gyorsabb, stabilabb, és kiszámíthatóbb.
