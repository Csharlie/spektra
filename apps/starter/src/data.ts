import type { SiteData } from '@spektra/types'

/**
 * Demo site data — showcases all platform section types.
 * In production this comes from a CMS adapter (WordPress, JSON, etc.).
 */
export const demoSiteData: SiteData = {
  site: {
    name: 'Spektra Starter',
    description: 'Multi-client frontend platform bemutató',
    url: 'https://starter.spektra.dev',
    locale: 'hu',
  },
  navigation: {
    primary: [
      { label: 'Főoldal', href: '#hero' },
      { label: 'Szolgáltatások', href: '#features' },
      { label: 'Rólunk', href: '#about' },
      { label: 'Galéria', href: '#gallery' },
      { label: 'Kapcsolat', href: '#contact' },
    ],
    footer: [
      { label: 'Adatvédelem', href: '/adatvedelem' },
      { label: 'ÁSZF', href: '/aszf' },
    ],
  },
  pages: [
    {
      slug: 'home',
      title: 'Főoldal',
      meta: {
        title: 'Spektra Starter — Platform Demo',
        description: 'A Spektra platform bemutató alkalmazás',
      },
      sections: [
        {
          id: 'hero-1',
          type: 'hero',
          data: {
            title: 'Építsd fel a weboldalad a Spektra platformmal',
            subtitle: 'Platform Demo',
            description:
              'Modern, moduláris frontend platform kis- és középvállalkozásoknak. React, Tailwind és TypeScript alapokon.',
            primaryCTA: { text: 'Kapcsolat', href: '#contact' },
            secondaryCTA: { text: 'Szolgáltatások', href: '#features' },
          },
        },
        {
          id: 'features-1',
          type: 'features',
          data: {
            title: 'Szolgáltatások',
            subtitle: 'Amit kínálunk',
            columns: 3 as const,
            features: [
              {
                title: 'Reszponzív Design',
                description: 'Minden eszközön tökéletesen megjelenő, mobilbarát weboldalak.',
              },
              {
                title: 'CMS Integráció',
                description: 'WordPress, headless CMS vagy statikus JSON — bármilyen adatforrás.',
              },
              {
                title: 'Egyedi Arculat',
                description: 'Tailwind theme preset-ek: márkaspecifikus színek és tipográfia.',
              },
              {
                title: 'Gyors Betöltés',
                description: 'Vite build + tree-shaking: csak az kerül a bundle-be, ami kell.',
              },
              {
                title: 'TypeScript',
                description: 'Végig típusbiztos: adatmodelltől a UI komponensekig.',
              },
              {
                title: 'Moduláris Felépítés',
                description: 'Szekciók cserélhetők, bővíthetők — kliensenként testreszabva.',
              },
            ],
          },
        },
        {
          id: 'about-1',
          type: 'about',
          data: {
            title: 'Rólunk',
            subtitle: 'A Spektra Platform',
            content:
              'A Spektra egy modern frontend platform, amely lehetővé teszi kis- és középvállalkozások számára, hogy professzionális weboldalakat építsenek minimális fejlesztői erőforrással. A moduláris architektúra és az újrafelhasználható komponensek révén minden új projekt gyorsabban készül el, mint az előző.',
            imagePosition: 'right' as const,
            stats: [
              { value: '7+', label: 'Platform package' },
              { value: '16+', label: 'UI komponens' },
              { value: '5', label: 'Section típus' },
              { value: '3', label: 'Theme preset' },
            ],
          },
        },
        {
          id: 'gallery-1',
          type: 'gallery',
          data: {
            title: 'Galéria',
            subtitle: 'Munkáink',
            description: 'Válogatás az eddigi projektjeinkből.',
            showCategories: true,
            images: [
              { src: 'https://picsum.photos/seed/sp1/600/400', alt: 'Projekt 1', category: 'Weboldal' },
              { src: 'https://picsum.photos/seed/sp2/600/400', alt: 'Projekt 2', category: 'Weboldal' },
              { src: 'https://picsum.photos/seed/sp3/600/400', alt: 'Projekt 3', category: 'Design' },
              { src: 'https://picsum.photos/seed/sp4/600/400', alt: 'Projekt 4', category: 'Design' },
              { src: 'https://picsum.photos/seed/sp5/600/400', alt: 'Projekt 5', category: 'Weboldal' },
              { src: 'https://picsum.photos/seed/sp6/600/400', alt: 'Projekt 6', category: 'Design' },
            ],
          },
        },
        {
          id: 'contact-1',
          type: 'contact',
          data: {
            title: 'Kapcsolat',
            subtitle: 'Írj nekünk',
            description: 'Kérdésed van? Töltsd ki az alábbi űrlapot, és hamarosan felvesszük veled a kapcsolatot.',
            contactInfo: {
              email: 'hello@spektra.dev',
              phone: '+36 1 234 5678',
              address: 'Budapest, Váci út 1.',
            },
          },
        },
      ],
    },
  ],
}
