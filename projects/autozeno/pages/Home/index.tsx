import React from 'react';
import {
  LandingPageTemplate,
  Hero,
  Features,
  About,
  Contact,
} from '@spektra/core';
import { 
  Zap, 
  Shield, 
  TrendingUp, 
  Users, 
  Target, 
  Award,
  Facebook,
  Instagram,
  Linkedin,
} from 'lucide-react';
import { siteConfig } from '../../config/site';
import { navigationLinks, footerSections } from '../../config/navigation';

const HomePage: React.FC = () => {
  const handleContactSubmit = async (data: any) => {
    console.log('Contact form submitted:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LandingPageTemplate
      navigation={{
        logoText: siteConfig.name,
        links: navigationLinks.map(link => ({
          ...link,
          onClick: () => scrollToSection(link.href),
        })),
        cta: {
          text: 'Kapcsolat',
          onClick: () => scrollToSection('#contact'),
        },
      }}
      footer={{
        logoText: siteConfig.name,
        description: siteConfig.description,
        sections: footerSections,
        copyright: `© ${new Date().getFullYear()} ${siteConfig.name}. Minden jog fenntartva.`,
        socialLinks: [
          {
            icon: <Facebook className="w-5 h-5" />,
            href: siteConfig.social.facebook,
            label: 'Facebook',
          },
          {
            icon: <Instagram className="w-5 h-5" />,
            href: siteConfig.social.instagram,
            label: 'Instagram',
          },
          {
            icon: <Linkedin className="w-5 h-5" />,
            href: siteConfig.social.linkedin,
            label: 'LinkedIn',
          },
        ],
      }}
    >
      <div id="home">
        <Hero
          subtitle="Üdvözöljük"
          title="Innováció és Megbízhatóság"
          description="Professzionális megoldások, amelyek segítenek vállalkozásának növekedésében és sikerében"
          primaryCTA={{
            text: 'Kezdjük el',
            onClick: () => scrollToSection('#contact'),
          }}
          secondaryCTA={{
            text: 'Tudjon meg többet',
            onClick: () => scrollToSection('#features'),
          }}
        />
      </div>

      <div id="features">
        <Features
          subtitle="Miért válasszon minket?"
          title="Szolgáltatásaink"
          columns={3}
          features={[
            {
              icon: Zap,
              title: 'Gyors megoldások',
              description: 'Hatékony és gyors implementáció, hogy vállalkozása időben elérje céljait.',
            },
            {
              icon: Shield,
              title: 'Biztonság',
              description: 'Magas szintű adatbiztonság és megfelelés az iparági szabványoknak.',
            },
            {
              icon: TrendingUp,
              title: 'Növekedés',
              description: 'Skálázható megoldások, amelyek együtt növekednek a vállalkozásával.',
            },
            {
              icon: Users,
              title: 'Szakértő csapat',
              description: 'Tapasztalt szakemberek, akik elkötelezettek az Ön sikere iránt.',
            },
            {
              icon: Target,
              title: 'Célzott stratégia',
              description: 'Személyre szabott megközelítés, amely az Ön egyedi igényeire épül.',
            },
            {
              icon: Award,
              title: 'Minőség',
              description: 'Kiváló minőségű szolgáltatások és folyamatos innováció.',
            },
          ]}
        />
      </div>

      <div id="about">
        <About
          subtitle="Rólunk"
          title="Kik vagyunk?"
          content={
            <>
              <p className="mb-4">
                Több mint 10 éve segítünk vállalkozásoknak digitális megoldásokkal. 
                Csapatunk tapasztalt szakemberekből áll, akik szenvedélyesen dolgoznak 
                azon, hogy ügyfeleink sikeresek legyenek.
              </p>
              <p>
                Hiszünk abban, hogy a technológia és a kreativitás kombinációjával 
                egyedülálló értéket tudunk teremteni. Minden projekthez egyedi 
                megközelítéssel állunk, figyelembe véve az ügyfél specifikus igényeit.
              </p>
            </>
          }
          stats={[
            { value: '500+', label: 'Elégedett ügyfél' },
            { value: '10+', label: 'Év tapasztalat' },
            { value: '50+', label: 'Csapattagok' },
            { value: '98%', label: 'Ügyfél elégedettség' },
          ]}
          cta={{
            text: 'Ismerjen meg minket',
            onClick: () => scrollToSection('#contact'),
          }}
          image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop"
          imagePosition="right"
        />
      </div>

      <div id="contact">
        <Contact
          subtitle="Kapcsolat"
          title="Vegye fel velünk a kapcsolatot"
          description="Szívesen válaszolunk kérdéseire és segítünk projektje megvalósításában."
          onSubmit={handleContactSubmit}
          contactInfo={siteConfig.contact}
        />
      </div>
    </LandingPageTemplate>
  );
};

export default HomePage;
