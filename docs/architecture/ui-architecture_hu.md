# UI Architektúra

## Kontextus

A Spektra szigorú réteges architektúrát használ a komponensek újrafelhasználhatóságának, karbantarthatóságának és a felelősségek egyértelmű elkülönítésének biztosítására. A UI réteget az Atomic Design elvek újraértelmezésével strukturáltuk, alkalmazva a Spektra filozófiájához: **adatvezérelt, kliens-agnosztikus komponensek**.

A probléma, amit ez megold:
- Megelőzi a komponens spagettit, ahol minden mindent importál
- Kikényszeríti az egyértelmű felelősségi határokat
- Lehetővé teszi a komponensek újrafelhasználását projektek között
- Fenntartja az engine függetlenségét a projekt-specifikus logikától

## Döntés

A Spektra az Atomic Design-t alkalmazza a következő explicit leképezéssel:

| Atomic Design | Spektra Réteg | Hely | Leírás |
|---------------|---------------|----------|-------------|
| **Atoms** | **UI** | `engine/packages/core/components/ui/` | Primitív, egycélú elemek (gombok, inputok, ikonok) |
| **Molecules** | **Features** | `engine/packages/core/components/features/` | Egyszerű funkcionális egységek (kártyák, form csoportok, navigációs elemek) |
| **Organisms** | **Sections** | `engine/packages/core/components/sections/` | Komplex, önálló elrendezési blokkok (hero-k, galériák, footer-ek) |
| **Templates** | **Layouts** | `engine/packages/core/components/layouts/` | Oldal szintű elrendezések (landing page, blog layout) |

### Miért ez a leképezés?

- **UI** = Atoms: Világos elnevezés - ezek tiszta UI primitívek
- **Features** = Molecules: A feature-ök UI elemekből állnak össze
- **Sections** = Organisms: A szekciók láthatóak az oldalakon mint különálló blokkok
- **Templates** = Templates: 1:1 leképezés, nincs zavar

## Struktúra

```
engine/packages/core/
├── components/
│   ├── ui/                    # Atoms: Button, Input, Icon, Badge
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Icon.tsx
│   ├── features/              # Molecules: Card, NavItem, FormGroup
│   │   ├── Card.tsx
│   │   ├── NavItem.tsx
│   │   └── FormGroup.tsx
│   ├── sections/              # Organisms: Hero, Gallery, Footer
│   │   ├── Hero.tsx
│   │   ├── Gallery.tsx
│   │   └── Footer.tsx
│   └── layouts/               # Layouts: LandingLayout, BlogLayout
│       ├── LandingPage.tsx
│       └── BlogLayout.tsx
├── hooks/                     # Újrafelhasználható React hook-ok
├── utils/                     # Segédfüggvények
└── design-system/             # Téma és design tokenek
```

## Szabályok

### Import Hierarchia (Csak Felfelé)

A komponensek CSAK az alattuk lévő rétegekből importálhatnak:

```
Templates
    ↑ importálhat
Sections (Organisms)
    ↑ importálhat
Features (Molecules)
    ↑ importálhat
UI (Atoms)
    ↑ importálhat
Utils / Hooks / Design System
```

### ✅ ENGEDÉLYEZETT:

1. **UI (Atoms)**
   - Import: utils, hooks, design system
   - Export: primitív komponensek
   - Props: minimális, generikus (text, onClick, variant)

2. **Features (Molecules)**
   - Import: UI komponensek, utils, hooks
   - Export: funkcionális egységek
   - Props: típusos, specifikus (user: User, onSubmit: Function)

3. **Sections (Organisms)**
   - Import: Features, UI, utils, hooks
   - Export: elrendezési szekciók
   - Props: adatvezérelt (data: HeroData)

4. **Templates**
   - Import: Sections, Features, UI
   - Export: teljes oldal elrendezések
   - Props: átfogó adatok (pageData: PageData)

### ❌ TILTOTT:

1. **Lefelé irányuló importok**
   ```tsx
   // ❌ SOHA - Atoms nem importálhat Molecules-ból
   // ui/Button.tsx-ben
   import { Card } from '../features/Card';
   ```

2. **Rétegek átugrása**
   ```tsx
   // ❌ SOHA - Molecules nem importálhat Organisms-ból
   // features/Card.tsx-ben
   import { Hero } from '../sections/Hero';
   ```

3. **Kereszt-réteg testvér importok**
   ```tsx
   // ❌ SOHA - Section nem importálhat közvetlenül másik Section-t
   // sections/Hero.tsx-ben
   import { Footer } from './Footer'; // Használj kompozíciót helyette
   ```

4. **Project importok az engine-ben**
   ```tsx
   // ❌ SOHA - Engine nem importálhat projects-ból
   import { BellatorConfig } from '../../../projects/bellator/config';
   ```

### Komponens Felelősségi Szabályok

#### UI (Atoms)
- **Cél:** Primitív, generikus, újrafelhasználható
- **Adat:** Nincs üzleti logika, nincs adat lekérés
- **Stílus:** Csak design tokenek
- **Példa:** Button, Input, Icon, Badge, Link

```tsx
// ✅ Jó Atom
export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick 
}) => {
  return (
    <button className={cn('btn', `btn-${variant}`)} onClick={onClick}>
      {children}
    </button>
  );
};
```

#### Features (Molecules)
- **Cél:** Funkcionális egységek UI atomok kombinálásával
- **Adat:** Típusos adatokat kap props-on keresztül
- **Kompozíció:** 2-4 UI komponenst használ
- **Példa:** Card, NavItem, FormGroup, PriceBox

```tsx
// ✅ Jó Molecule
export const Card: React.FC<CardProps> = ({ title, description, image }) => {
  return (
    <div className="card">
      <Image src={image} alt={title} />
      <Heading level={3}>{title}</Heading>
      <Text>{description}</Text>
    </div>
  );
};
```

#### Sections (Organisms)
- **Cél:** Komplex, önálló oldal szekciók
- **Adat:** Strukturált adatokat kap props-on keresztül
- **Kompozíció:** Features-t és UI-t használ
- **Példa:** Hero, Gallery, Testimonials, Footer

```tsx
// ✅ Jó Organism
export const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section className="hero">
      <Container>
        <Heading level={1}>{data.title}</Heading>
        <Text>{data.description}</Text>
        <Button href={data.ctaUrl}>{data.ctaText}</Button>
      </Container>
    </section>
  );
};
```

#### Templates
- **Cél:** Teljes oldal elrendezések
- **Adat:** Teljes oldal adatokat kap
- **Kompozíció:** Sections-t komponál
- **Példa:** LandingPage, BlogPost, ProductPage

```tsx
// ✅ Jó Template
export const LandingPage: React.FC<LandingPageProps> = ({ data }) => {
  return (
    <>
      <Hero data={data.hero} />
      <Features data={data.features} />
      <Testimonials data={data.testimonials} />
      <Footer data={data.footer} />
    </>
  );
};
```

## Eszköz Hatás

### ESLint Kikényszerítés

A `engine/packages/config/eslint/engine-guardrails.js` kikényszeríti:
- Nincs import a `projects/`-ból
- Nincsenek CMS-specifikus könyvtárak
- Nincsenek kliens-specifikus string literálok

### Build Validáció

A TurboRepo biztosítja:
- A dependency sorrend helyes
- A build meghibásodik, ha körkörös függőségek léteznek
- Minden réteg önállóan build-elődik

### TypeScript

- Minden komponensnek erősen típusosnak kell lennie
- A props interface-eket exportálni kell
- Az adat szerződéseket a `types/`-ban kell definiálni

### Copilot Utasítások

A GitHub Copilot-nak:
1. Olvasnia kell ezt a dokumentumot komponensek létrehozása előtt
2. Szigorúan tiszteletben kell tartania a réteghatárokat
3. TODO kommenteket kell hozzáadnia, amikor a struktúra kétértelmű
4. Soha nem feltételezheti a szándékot - kérdezzen vagy következtessen a meglévő mintákból

## Verziókezelési Jegyzetek

Az architektúra változtatásai **MAJOR** verzió emelések:
- Rétegek hozzáadása/eltávolítása = MAJOR
- Réteg felelősségek változtatása = MAJOR
- Rétegek átnevezése = MAJOR

Komponens változtatások a rétegeken belül:
- Új komponensek = MINOR
- Komponens API változtatások = MAJOR (törő)
- Bug javítások = PATCH

## Kapcsolódó Dokumentumok

- [Validációs Pipeline](../validation/validation-pipeline_hu.md) - Hogyan validálódnak a build-ek
- [Guardrails](../validation/guardrails_hu.md) - Architekturális megszorítások
- [Csomagkezelés](../tooling/package-management_hu.md) - PNPM és Turbo használat
- [Verziókezelési Stratégia](../versioning/versioning-strategy_hu.md) - SemVer szabályok
