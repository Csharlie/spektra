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
    <div 
      data-ui-id="landing-layout"
      data-ui-class="page-layout"
      data-ui-role="layout"
      className="min-h-screen flex flex-col"
    >
      <Navigation {...navigation} />
      <main 
        data-ui-id="main-content"
        data-ui-class="content-area"
        data-ui-role="main-content"
        className="flex-grow"
      >
        {children}
      </main>
      <Footer {...footer} />
    </div>
  );
};
