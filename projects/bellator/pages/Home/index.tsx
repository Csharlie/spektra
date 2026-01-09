import React from 'react';
import {
  useDocumentTitle,
  useMetaDescription,
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
import type { BellatorContent } from '../../src/data/content';

// Icon mapping for programs section
const iconMap: Record<string, any> = {
  Dumbbell,
  Activity,
  Users,
  Trophy,
  Heart,
  Zap,
};

interface HomePageProps {
  content: BellatorContent;
}

const HomePage: React.FC<HomePageProps> = ({ content }) => {
  const { site, navigation, footer, pages } = content;
  const homeContent = pages.home;

  // Set document title and meta description
  useDocumentTitle(homeContent.meta.title);
  useMetaDescription(homeContent.meta.description);

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
        links={navigation.links.map(link => ({
          ...link,
          onClick: () => scrollToSection(link.href),
        }))}
        cta={{
          text: navigation.ctaText,
          onClick: () => scrollToSection('#contact'),
        }}
      />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div id="home">
        <SplitHeroBellatorGym
          gymSide={{
            ...homeContent.hero.gymSide,
            cta: {
              text: homeContent.hero.gymSide.cta.text,
              onClick: () => scrollToSection('#membership'),
            },
            secondaryCTA: {
              text: homeContent.hero.gymSide.secondaryCTA.text,
              onClick: () => scrollToSection('#programs'),
            },
          }}
          squashSide={{
            ...homeContent.hero.squashSide,
            cta: {
              text: homeContent.hero.squashSide.cta.text,
              onClick: () => scrollToSection('#contact'),
            },
            secondaryCTA: {
              text: homeContent.hero.squashSide.secondaryCTA.text,
              onClick: () => scrollToSection('#programs'),
            },
          }}
        />
      </div>

      {/* Programs Section */}
      <div id="programs">
        <Programs
          subtitle={homeContent.programs.subtitle}
          title={homeContent.programs.title}
          description={homeContent.programs.description}
          programs={homeContent.programs.items.map(program => ({
            ...program,
            icon: iconMap[program.iconName] || Dumbbell,
          }))}
        />
      </div>

      {/* Coaches Section */}
      <div id="coaches">
        <Coaches
          subtitle={homeContent.coaches.subtitle}
          title={homeContent.coaches.title}
          description={homeContent.coaches.description}
          coaches={homeContent.coaches.items}
        />
      </div>

      {/* Gallery Section */}
      <div id="gallery">
        <Gallery
          subtitle={homeContent.gallery.subtitle}
          title={homeContent.gallery.title}
          description={homeContent.gallery.description}
          images={homeContent.gallery.images}
        />
      </div>

      {/* Membership Section */}
      <div id="membership">
        <Membership
          subtitle={homeContent.membership.subtitle}
          title={homeContent.membership.title}
          description={homeContent.membership.description}
          plans={homeContent.membership.plans}
          onSelectPlan={(planName) => {
            console.log('Selected plan:', planName);
            scrollToSection('#contact');
          }}
        />
      </div>

      {/* Testimonials Section */}
      <div id="testimonials">
        <Testimonials
          subtitle={homeContent.testimonials.subtitle}
          title={homeContent.testimonials.title}
          description={homeContent.testimonials.description}
          testimonials={homeContent.testimonials.items}
        />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <BellatorContact
          subtitle={homeContent.contact.subtitle}
          title={homeContent.contact.title}
          description={homeContent.contact.description}
          onSubmit={handleContactSubmit}
          contactInfo={site.contact}
        />
      </div>
      </main>
      
      <BellatorFooter
        logoText={site.name}
        description={site.description}
        sections={footer.sections}
        copyright={`© ${new Date().getFullYear()} ${site.name}. Minden jog fenntartva.`}
        socialLinks={[
          {
            icon: <Facebook className="w-5 h-5" />,
            href: site.social.facebook,
            label: 'Facebook',
          },
          {
            icon: <Instagram className="w-5 h-5" />,
            href: site.social.instagram,
            label: 'Instagram',
          },
          {
            icon: <Youtube className="w-5 h-5" />,
            href: site.social.youtube,
            label: 'YouTube',
          },
        ]}
      />
    </div>
  );
};

export default HomePage;
