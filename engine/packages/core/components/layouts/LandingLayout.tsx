import React from 'react';
import { Navigation, NavigationProps } from '../sections/Navigation';
import { Footer, FooterProps } from '../sections/Footer';

export interface LandingLayoutProps {
  navigation: NavigationProps;
  footer: FooterProps;
  children: React.ReactNode;
}

export const LandingLayout: React.FC<LandingLayoutProps> = ({
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
