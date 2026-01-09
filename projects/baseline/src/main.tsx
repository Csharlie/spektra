/**
 * Baseline Entry Point
 * 
 * ROUTING ARCHITECTURE:
 * Routing is a PROJECT RESPONSIBILITY, not an engine concern.
 * 
 * - Routes are defined here (project-level main.tsx)
 * - Pages are concrete pages, NOT templates
 * - Templates may be used INSIDE pages for layout
 * 
 * PROMOTION CRITERIA:
 * If this exact routing pattern is needed by 2+ projects,
 * it may be promoted to an engine utility. Until then,
 * routing remains project-scoped.
 * 
 * RULES:
 * - NO routing logic in pages themselves
 * - Pages MAY use engine sections and project organisms
 * - Pages MUST NOT define their own templates
 * - Pages MUST NOT introduce platform abstractions
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DesignSystemProvider } from '@spektra/core';
import LandingPage from './pages/LandingPage';
import GalleryPage from './pages/GalleryPage';
import { getBaselineData } from './data';
import './index.css';

/**
 * Load site data once at the application level
 * This data is available to all routes
 */
const baselineData = getBaselineData();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DesignSystemProvider initialSystem="base">
      <BrowserRouter>
        <Routes>
          {/* Landing Page - default route */}
          <Route path="/" element={<LandingPage data={baselineData} />} />
          
          {/* Gallery Page - demonstrates project-level organism usage */}
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </BrowserRouter>
    </DesignSystemProvider>
  </React.StrictMode>,
);
