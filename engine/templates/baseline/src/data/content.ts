/**
 * Content data
 * All text content, copy, and labels
 * Replace these values with your project-specific content
 */

export interface BaselineContent {
  navigation: {
    cta: string;
    links: Array<{
      label: string;
      href: string;
    }>;
  };
  hero: {
    subtitle: string;
    title: string;
    description: string;
    primaryCTA: {
      text: string;
      href: string;
    };
    secondaryCTA: {
      text: string;
      href: string;
    };
  };
  features: {
    subtitle: string;
    title: string;
    items: Array<{
      iconName: string;
      title: string;
      description: string;
    }>;
  };
  about: {
    subtitle: string;
    title: string;
    content: {
      paragraph1: string;
      paragraph2: string;
    };
    cta: {
      text: string;
    };
    stats: Array<{
      value: string;
      label: string;
    }>;
    image: string;
  };
  gallery: {
    subtitle: string;
    title: string;
    description: string;
  };
  contact: {
    subtitle: string;
    title: string;
    description: string;
  };
  featureHighlight: {
    title: string;
    description: string;
    features: Array<{
      iconName: string;
      text: string;
    }>;
    actions?: {
      primary?: {
        text: string;
        href: string;
      };
      secondary?: {
        text: string;
        href: string;
      };
    };
  };
  footer: {
    sections: Array<{
      title: string;
      links: Array<{
        label: string;
        href: string;
      }>;
    }>;
  };
}

/**
 * Project content data
 * Replace with your project-specific content
 */
export const baselineContent: BaselineContent = {
  navigation: {
    cta: 'Kapcsolat',
    links: [
      { label: 'Főoldal', href: '/' },
      { label: 'Szolgáltatások', href: '#features' },
      { label: 'Rólunk', href: '#about' },
      { label: 'Galéria Oldal', href: '/gallery' },
      { label: 'Kapcsolat', href: '#contact' },
    ],
  },
  
  hero: {
    subtitle: 'Üdvözöljük',
    title: 'Innováció és Megbízhatóság',
    description: 'Professzionális megoldások, amelyek segítenek vállalkozásának növekedésében és sikerében',
    primaryCTA: {
      text: 'Kezdjük el',
      href: '#contact',
    },
    secondaryCTA: {
      text: 'Tudjon meg többet',
      href: '#features',
    },
  },
  
  features: {
    subtitle: 'Miért válasszon minket?',
    title: 'Szolgáltatásaink',
    items: [
      {
        iconName: 'Zap',
        title: 'Gyors megoldások',
        description: 'Hatékony és gyors implementáció, hogy vállalkozása időben elérje céljait.',
      },
      {
        iconName: 'Shield',
        title: 'Biztonság',
        description: 'Megbízható és biztonságos rendszerek, amelyek védik vállalkozását.',
      },
      {
        iconName: 'TrendingUp',
        title: 'Növekedés',
        description: 'Skálázható megoldások, amelyek együtt növekednek vállalkozásával.',
      },
      {
        iconName: 'Users',
        title: 'Csapat',
        description: 'Tapasztalt szakemberek, akik elkötelezettek a sikere iránt.',
      },
      {
        iconName: 'Target',
        title: 'Célzott megoldások',
        description: 'Személyre szabott megközelítés, amely az Ön egyedi igényeire épül.',
      },
      {
        iconName: 'Award',
        title: 'Minőség',
        description: 'Kiváló minőségű szolgáltatások és folyamatos innováció.',
      },
    ],
  },
  
  about: {
    subtitle: 'Rólunk',
    title: 'Kik vagyunk?',
    content: {
      paragraph1: 'Több mint 10 éve segítünk vállalkozásoknak digitális megoldásokkal. Csapatunk tapasztalt szakemberekből áll, akik szenvedélyesen dolgoznak azon, hogy ügyfeleink sikeresek legyenek.',
      paragraph2: 'Hiszünk abban, hogy a technológia és a kreativitás kombinációjával egyedülálló értéket tudunk teremteni. Minden projekthez egyedi megközelítéssel állunk, figyelembe véve az ügyfél specifikus igényeit.',
    },
    cta: {
      text: 'Ismerjen meg minket',
    },
    stats: [
      { value: '500+', label: 'Elégedett ügyfél' },
      { value: '10+', label: 'Év tapasztalat' },
      { value: '50+', label: 'Csapattagok' },
      { value: '98%', label: 'Ügyfél elégedettség' },
    ],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop',
  },
  
  gallery: {
    subtitle: 'Portfolio',
    title: 'Projekteink',
    description: 'Nézze meg néhány sikeres projektünket és munkáinkat',
  },
  
  contact: {
    subtitle: 'Kapcsolat',
    title: 'Vegye fel velünk a kapcsolatot',
    description: 'Szívesen válaszolunk kérdéseire és segítünk projektje megvalósításában.',
  },
  
  featureHighlight: {
    title: 'Kiemelt Funkcióink',
    description: 'Fedezze fel azokat a modern megoldásokat, amelyek megkülönböztetik szolgáltatásainkat a piacon. Minden funkció ügyfeleink visszajelzései alapján került kidolgozásra.',
    features: [
      {
        iconName: 'Sparkles',
        text: 'Automatizált munkafolyamatok, amelyek időt és költséget takarítanak meg',
      },
      {
        iconName: 'Lock',
        text: 'Vállalati szintű biztonság és adatvédelem minden platformon',
      },
      {
        iconName: 'Zap',
        text: 'Valós idejű teljesítmény monitoring és analitika',
      },
      {
        iconName: 'Globe',
        text: 'Többnyelvű támogatás és globális infrastruktúra',
      },
    ],
    actions: {
      primary: {
        text: 'Próbálja ki most',
        href: '#contact',
      },
      secondary: {
        text: 'Részletek megtekintése',
        href: '#features',
      },
    },
  },
  
  footer: {
    sections: [
      {
        title: 'Cég',
        links: [
          { label: 'Rólunk', href: '#about' },
          { label: 'Csapatunk', href: '#team' },
          { label: 'Karrier', href: '#career' },
          { label: 'Sajtó', href: '#press' },
        ],
      },
      {
        title: 'Szolgáltatások',
        links: [
          { label: 'Webfejlesztés', href: '#web' },
          { label: 'Marketing', href: '#marketing' },
          { label: 'Consulting', href: '#consulting' },
          { label: 'Support', href: '#support' },
        ],
      },
      {
        title: 'Jogi',
        links: [
          { label: 'Adatvédelem', href: '#privacy' },
          { label: 'Felhasználási feltételek', href: '#terms' },
          { label: 'Cookie szabályzat', href: '#cookies' },
          { label: 'GDPR', href: '#gdpr' },
        ],
      },
    ],
  },
};
