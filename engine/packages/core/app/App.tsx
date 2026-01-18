import React from 'react';
import { Hero } from '../components/sections/Hero';
import type { SiteData, Section } from '../types/SiteData';

export interface AppProps {
  data: SiteData;
}

export const App: React.FC<AppProps> = ({ data }) => {
  const { pages } = data;

  const renderSection = (section: Section) => {
    switch (section.type) {
      case 'hero':
        return (
          <Hero
            key={section.id}
            title={section.data.title}
            subtitle={section.data.subtitle}
            description={section.data.description || ''}
            primaryCTA={section.data.primaryCTA}
            secondaryCTA={section.data.secondaryCTA}
          />
        );
      default:
        return <div key={section.id}>Unknown section type: {section.type}</div>;
    }
  };

  return (
    <div className="app">
      {pages.map((page, index) => (
        <div key={index} data-page={page.slug}>
          {page.sections?.map((section) => renderSection(section))}
        </div>
      ))}
    </div>
  );
};
