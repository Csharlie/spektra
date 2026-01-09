import React from 'react';
import { Navigation, NavigationProps } from '../sections/Navigation';
import { Footer, FooterProps } from '../sections/Footer';

export interface LandingPageTemplateProps {
  navigation: NavigationProps;
  footer: FooterProps;
  children: React.ReactNode;
}

export const LandingPageTemplate: React.FC<LandingPageTemplateProps> = ({
  navigation,
  footer,
  children,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation {...navigation} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer {...footer} />
    </div>
  );
};
