/**
 * App Component - Routeline Template
 * 
 * Defines application routing with AppShell wrapper.
 * Routes map to page components.
 * 
 * ARCHITECTURE:
 * - AppShell provides header and main wrapper
 * - Routes are explicitly defined (no dynamic routing)
 * - Pages are thin wrappers over layouts
 * - No layout logic happens here
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './AppShell';
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';

export function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          {/* Landing route */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Products route */}
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
