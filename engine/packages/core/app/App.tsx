import React from 'react';
import { DesignSystemProvider } from '../design-system/DesignSystemContext';
import type { SiteData } from '../types/SiteData';

interface AppProps {
  data: SiteData;
}

export const App: React.FC<AppProps> = ({ data }) => {
  // This is the main engine component that renders based on SiteData
  const { theme, pages } = data;

  return (
    <DesignSystemProvider theme={theme}>
      <div className="app">
        {/* Render logic based on data */}
        {pages.map((page, index) => (
          <div key={index} data-page={page.slug}>
            {/* Page rendering logic will go here */}
          </div>
        ))}
      </div>
    </DesignSystemProvider>
  );
};
