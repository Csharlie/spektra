import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LandingPageTemplate,
  Hero,
  Features,
  About,
  Contact,
  Gallery,
  useDocumentTitle,
  useMetaDescription,
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

// Icon mapping for features
const iconMap: Record<string, any> = {
  Zap,
  Shield,
  TrendingUp,
  Users,
  Target,
  Award,
};

interface HomePageProps {
  data: {
    site: any;
    content: any;
    gallery: any;
  };
}

/**
 * LandingPage - Project-Level Landing Page
 * 
 * PURPOSE:
 * This is the default landing page (route "/") for the baseline project.
 * It demonstrates how to compose engine sections and project-level UI.
 * 
 * ARCHITECTURE NOTE:
 * - Receives ALL data via props from App.tsx
 * - Uses engine sections (@spektra/core) for layout
 * - This is a pure composition layer
 * - NOT a template (project-specific page)
 * 
 * PROMOTION PATH:
 * If this exact composition is needed by 2+ projects, it may be promoted
 * to an engine template. Until then, it remains project-scoped.
 */
const LandingPage: React.FC<HomePageProps> = ({ data }) => {
  const { site, content, gallery } = data;
  const navigate = useNavigate();
  
  // Set document title and meta description
  useDocumentTitle(`${site.name} - ${site.description}`);
  useMetaDescription(site.description);

  const handleContactSubmit = async (formData: any) => {
    console.log('Contact form submitted:', formData);
    // TODO: Implement actual form submission logic
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleNavClick = (href: string) => {
    // If it's a route (starts with /), use React Router navigation
    if (href.startsWith('/')) {
      navigate(href);
    } 
    // If it's a hash link, scroll to section
    else if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <LandingPageTemplate
      navigation={{
        logoText: site.name,
        links: content.navigation.links.map((link: any) => ({
          ...link,
          onClick: () => handleNavClick(link.href),
        })),
        cta: {
          text: content.navigation.cta,
          onClick: () => handleNavClick('#contact'),
        },
      }}
      footer={{
        logoText: site.name,
        description: site.description,
        sections: content.footer.sections,
        copyright: `© ${new Date().getFullYear()} ${site.name}. Minden jog fenntartva.`,
        socialLinks: [
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
            icon: <Linkedin className="w-5 h-5" />,
            href: site.social.linkedin,
            label: 'LinkedIn',
          },
        ],
      }}
    >
      {/* Hero Section */}
      <div id="home">
        <Hero
          subtitle={content.hero.subtitle}
          title={content.hero.title}
          description={content.hero.description}
          primaryCTA={{
            text: content.hero.primaryCTA.text,
            onClick: () => scrollToSection(content.hero.primaryCTA.href),
          }}
          secondaryCTA={{
            text: content.hero.secondaryCTA.text,
            onClick: () => scrollToSection(content.hero.secondaryCTA.href),
          }}
        />
      </div>

      {/* Features Section */}
      <div id="features">
        <Features
          subtitle={content.features.subtitle}
          title={content.features.title}
          columns={3}
          features={content.features.items.map((feature: any) => ({
            icon: iconMap[feature.iconName] || Zap,
            title: feature.title,
            description: feature.description,
          }))}
        />
      </div>

      {/* About Section */}
      <div id="about">
        <About
          subtitle={content.about.subtitle}
          title={content.about.title}
          content={
            <>
              <p className="mb-4">
                {content.about.content.paragraph1}
              </p>
              <p>
                {content.about.content.paragraph2}
              </p>
            </>
          }
          stats={content.about.stats}
          cta={{
            text: content.about.cta.text,
            onClick: () => scrollToSection('#contact'),
          }}
          image={content.about.image}
          imagePosition="right"
        />
      </div>

      {/* Gallery Section */}
      <div id="gallery">
        <Gallery
          subtitle={content.gallery.subtitle}
          title={content.gallery.title}
          description={content.gallery.description}
          images={gallery.images}
        />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <Contact
          subtitle={content.contact.subtitle}
          title={content.contact.title}
          description={content.contact.description}
          onSubmit={handleContactSubmit}
          contactInfo={site.contact}
        />
      </div>
    </LandingPageTemplate>
  );
};

export default LandingPage;
