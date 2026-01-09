import React from 'react';
import {
  useDocumentTitle,
  useMetaDescription,
  Footer,
} from '@spektra/core';
import {
  Dumbbell,
  Activity,
  Users,
  Trophy,
  Heart,
  Zap,
  Facebook,
  Instagram,
  Youtube,
} from 'lucide-react';
import { siteConfig } from '../../config/site';
import { navigationLinks, footerSections } from '../../config/navigation';
import { 
  SplitHeroBellatorGym, 
  Programs, 
  Coaches, 
  Gallery, 
  Membership, 
  Testimonials,
  BellatorContact
} from '../../components/sections';
import { BellatorNavigation } from '../../components/organisms/BellatorNavigation';
import { BellatorFooter } from '../../components/organisms/BellatorFooter';

const HomePage: React.FC = () => {
  // Set document title and meta description
  useDocumentTitle(`${siteConfig.name} - ${siteConfig.description}`);
  useMetaDescription(siteConfig.description);

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
    <div className="min-h-screen flex flex-col">
      <BellatorNavigation
        links={navigationLinks.map(link => ({
          ...link,
          onClick: () => scrollToSection(link.href),
        }))}
        cta={{
          text: 'Ingyenes próbaedzés',
          onClick: () => scrollToSection('#contact'),
        }}
      />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div id="home">
        <SplitHeroBellatorGym
          gymSide={{
            subtitle: "Bellator Gym Félegyháza",
            title: "Építsd fel magad",
            description: "Csatlakozz Félegyháza legjobb edzőterméhez, ahol minden eszközöd megvan a célok eléréséhez. Professzionális edzők, modern felszereltség, motiváló közösség.",
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&auto=format&fit=crop",
            cta: {
              text: 'Kezdd el most',
              onClick: () => scrollToSection('#membership'),
            },
            secondaryCTA: {
              text: 'Tudj meg többet',
              onClick: () => scrollToSection('#programs'),
            },
          }}
          squashSide={{
            subtitle: "Squash Pálya Félegyháza",
            title: "Fejleszd a játékodat",
            description: "Fedezd fel a squash dinamikus világát modern pályáinkon. Kezdőktől haladókig mindenkit várunk egyéni és csoportos foglalásokra. Professzionális pályák, motiváló közösség.",
            image: "/bellatorgymhu/images/firefly-squash.png",
            cta: {
              text: 'Foglalj pályát',
              onClick: () => scrollToSection('#contact'),
            },
            secondaryCTA: {
              text: 'Bővebben',
              onClick: () => scrollToSection('#programs'),
            },
          }}
        />
      </div>

      {/* Programs Section */}
      <div id="programs">
        <Programs
          subtitle="Mit kínálunk?"
          title="Edzésprogramjaink"
          description="Válassz a sokszínű edzésprogramjaink közül, amelyek minden szinten és célnál támogatnak."
          programs={[
            {
              icon: Dumbbell,
              title: 'Erőedzés',
              description: 'Építsd fel izomzatodat professzionális súlyzós edzéssel. Modern géppark és szabad súlyok.',
              features: [
                'Teljes körű súlyzós edzőterem',
                'Funkcionális edzőzóna',
                'Személyi edzők segítsége',
                'Egyéni edzéstervek',
              ],
              image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop',
            },
            {
              icon: Activity,
              title: 'Funkcionális edzés',
              description: 'Komplex mozgásformák, amelyek fejlesztik az erőt, állóképességet és koordinációt.',
              features: [
                'CrossFit stílusú edzések',
                'TRX és kettlebell tréning',
                'Kiscsoportos órák',
                'Versenyfelkészítés',
              ],
              image: 'https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?w=800&auto=format&fit=crop',
            },
            {
              icon: Heart,
              title: 'Kardió',
              description: 'Égess kalóriát és fejleszd állóképességedet változatos kardió edzésekkel.',
              features: [
                'Futópadok, kerékpárok, evezőgépek',
                'HIIT edzések',
                'Spinning órák',
                'Pulzusmonitorozás',
              ],
              image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&auto=format&fit=crop',
            },
            {
              icon: Users,
              title: 'Csoportos órák',
              description: 'Motiváló közösségi edzések tapasztalt oktatókkal és energikus társakkal.',
              features: [
                'Spinning, Body Pump, Zumba',
                'Yoga és Pilates',
                'Box órák',
                'Heti 40+ óra',
              ],
              image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop',
            },
            {
              icon: Trophy,
              title: 'Személyi edzés',
              description: '1-1-es figyelemmel egyedi edzésterv és folyamatos támogatás a céljaid eléréséhez.',
              features: [
                'Személyre szabott edzésterv',
                'Táplálkozási tanácsadás',
                'Folyamatos motiváció',
                'Garantált eredmény',
              ],
              image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop',
            },
            {
              icon: Zap,
              title: 'Küzdősportok',
              description: 'Tanulj meg védeni magad, miközben formába hozod tested és erősíted mentális fókuszodat.',
              features: [
                'Boks, kickbox, MMA',
                'Kezdő és haladó szintek',
                'Versenyfelkészítés',
                'Technika fejlesztés',
              ],
              image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&auto=format&fit=crop',
            },
          ]}
        />
      </div>

      {/* Coaches Section */}
      <div id="coaches">
        <Coaches
          subtitle="Csapatunk"
          title="Edzőink"
          description="Tapasztalt, motivált szakemberek, akik segítenek elérni céljaidat."
          coaches={[
            {
              name: 'Nagy Péter',
              title: 'Főedző',
              bio: '15 év tapasztalat az erőedzés és funkcionális tréning területén. NSCA-CPT, CrossFit L2 tanúsítvánnyal rendelkezik.',
              image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&auto=format&fit=crop',
              specialties: ['Erőedzés', 'CrossFit', 'Versenyfelkészítés'],
            },
            {
              name: 'Kovács Anna',
              title: 'Személyi edző',
              bio: 'Személyi edzés és táplálkozási tanácsadás specialistája. Segít elérni az ideális testsúlyt és formát.',
              image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&auto=format&fit=crop',
              specialties: ['Fogyás', 'Alakformálás', 'Táplálkozás'],
            },
            {
              name: 'Szabó Márk',
              title: 'Küzdősport edző',
              bio: 'Profi bokszkarrier után most átadja tudását. Többszörös magyar bajnok és Európa-bajnoki helyezett.',
              image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&auto=format&fit=crop',
              specialties: ['Boks', 'Kickbox', 'MMA'],
            },
            {
              name: 'Kiss Eszter',
              title: 'Csoportos óra oktató',
              bio: 'Energikus órák vezetője, yoga és spinning instruktor. Mindenkit motivál a maximum teljesítményre.',
              image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&auto=format&fit=crop',
              specialties: ['Spinning', 'Yoga', 'Body Pump'],
            },
          ]}
        />
      </div>

      {/* Gallery Section */}
      <div id="gallery">
        <Gallery
          subtitle="Edzőtermünk"
          title="Galéria"
          description="Fedezd fel modern, jól felszerelt edzőtermünket és motiváló környezetünket."
          images={[
            { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop', alt: 'Súlyzós terem', category: 'Facilities' },
            { src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&auto=format&fit=crop', alt: 'Kardió zóna', category: 'Facilities' },
            { src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&auto=format&fit=crop', alt: 'Funkcionális terület', category: 'Facilities' },
            { src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&auto=format&fit=crop', alt: 'Edzés', category: 'Training' },
            { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop', alt: 'Személyi edzés', category: 'Training' },
            { src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop', alt: 'Csoportos óra', category: 'Training' },
            { src: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&auto=format&fit=crop', alt: 'Boksz edzés', category: 'Training' },
            { src: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=600&auto=format&fit=crop', alt: 'Öltöző', category: 'Facilities' },
          ]}
        />
      </div>

      {/* Membership Section */}
      <div id="membership">
        <Membership
          subtitle="Bérletek"
          title="Válaszd ki a neked megfelelő bérletet"
          description="Rugalmas bérletcsomagok minden igényre és költségkeretre."
          plans={[
            {
              name: 'Alapbérlet',
              price: '12,900',
              period: 'hónap',
              description: 'Tökéletes választás azoknak, akik rendszeresen szeretnének edzeni.',
              features: [
                'Korlátlan teremhasználat',
                'Minden gép és eszköz használata',
                'Öltöző és zuhanyzó',
                'Ingyenes Wi-Fi',
                'Mobilapp hozzáférés',
              ],
            },
            {
              name: 'Prémium bérlet',
              price: '19,900',
              period: 'hónap',
              description: 'Extra szolgáltatások azoknak, akik többet szeretnének.',
              features: [
                'Minden Alapbérlet előny',
                'Csoportos órák korlátlanul',
                'Személyi edzői konzultáció (havi 1)',
                'Vendég behozatal (havi 2)',
                'Táplálkozási alapcsomag',
                '10% kedvezmény kiegészítőkből',
              ],
              highlighted: true,
            },
            {
              name: 'VIP bérlet',
              price: '34,900',
              period: 'hónap',
              description: 'A teljes Bellator élmény exkluzív hozzáféréssel.',
              features: [
                'Minden Prémium bérlet előny',
                'Személyi edzés (heti 2 alkalom)',
                'Részletes táplálkozási terv',
                'Prioritás órafoglalás',
                'Vendég behozatal korlátlanul',
                'Exkluzív öltöző használat',
                'Testösszetétel mérés (havi 1)',
              ],
            },
          ]}
          onSelectPlan={(planName) => {
            console.log('Selected plan:', planName);
            scrollToSection('#contact');
          }}
        />
      </div>

      {/* Testimonials Section */}
      <div id="testimonials">
        <Testimonials
          subtitle="Mit mondanak rólunk?"
          title="Vélemények"
          description="Hallgasd meg, mit mondanak elégedett tagjaink az edzőtermünkről."
          testimonials={[
            {
              name: 'Tóth Gábor',
              role: '6 hónapos tag',
              content: 'Lenyűgöző volt az átalakulásom! 15 kilót fogytam és sosem éreztem magam jobbnak. Az edzők fantasztikusak, mindig segítenek.',
              image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop',
              rating: 5,
            },
            {
              name: 'Nagy Viktória',
              role: '1 éves tag',
              content: 'A legjobb döntés volt, hogy csatlakoztam! A közösség fantasztikus, az edzők motiválóak. Imádom a csoportos órákat!',
              image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop',
              rating: 5,
            },
            {
              name: 'Horváth Tamás',
              role: '2 éves tag',
              content: 'Profi környezet, modern eszközök, szakértő edzők. Minden adott a sikerhez. Nagyon ajánlom mindenkinek!',
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop',
              rating: 5,
            },
            {
              name: 'Molnár Zsuzsanna',
              role: '8 hónapos tag',
              content: 'Mindig féltem az edzőtermektől, de itt mindenki barátságos és segítőkész. Most már nem tudnék nélküle élni!',
              image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop',
              rating: 5,
            },
            {
              name: 'Varga Dániel',
              role: '3 éves tag',
              content: 'A személyi edzőm, Péter, segített elérni minden célom. Izomtömeget építettem és sokkal egészségesebb lettem.',
              image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop',
              rating: 5,
            },
            {
              name: 'Fekete Laura',
              role: '4 hónapos tag',
              content: 'A legjobb ár-érték arány! Modern gépek, tiszta környezet, és az edzők valóban törődnek veled.',
              image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop',
              rating: 5,
            },
          ]}
        />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <BellatorContact
          subtitle="Kapcsolat"
          title="Kezdd el még ma!"
          description="Jelentkezz ingyenes próbaedzésre vagy kérdezz bátran! Csapatunk készen áll, hogy segítsen indulni."
          onSubmit={handleContactSubmit}
          contactInfo={siteConfig.contact}
        />
      </div>
      </main>
      
      <BellatorFooter
        logoText={siteConfig.name}
        description={siteConfig.description}
        sections={footerSections}
        copyright={`© ${new Date().getFullYear()} ${siteConfig.name}. Minden jog fenntartva.`}
        socialLinks={[
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
            icon: <Youtube className="w-5 h-5" />,
            href: siteConfig.social.youtube,
            label: 'YouTube',
          },
        ]}
      />
    </div>
  );
};

export default HomePage;
