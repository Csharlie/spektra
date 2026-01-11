/**
 * App Component - Routeline Template
 * 
 * Defines application routing with AppShell wrapper.
 * Routes reference layouts from @spektra/core.
 * 
 * ARCHITECTURE:
 * - AppShell provides header and main wrapper
 * - Routes are explicitly defined (no dynamic routing)
 * - Layouts are imported from engine core (as stubs)
 * - No layout implementation happens here
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingLayout } from '@spektra/core';
import { AppShell } from './AppShell';

/**
 * ProductsLayout - stub reference
 * This layout exists as a stub in @spektra/core
 * Implementation is NOT part of this template
 */
const ProductsLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <div className="p-8 bg-gray-100">
        <h1 className="text-2xl font-bold">Products Layout (Stub)</h1>
        <p className="text-gray-600">This is a placeholder. Actual layout implementation is in @spektra/core</p>
      </div>
      {children}
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          {/* Landing route - uses LandingLayout from core */}
          <Route 
            path="/" 
            element={
              <LandingLayout
                navigation={{ logo: 'Spektra', links: [] }}
                footer={{ sections: [], copyright: '© 2026' }}
              >
                <div className="p-8">
                  <h1 className="text-3xl font-bold">Welcome to Routeline</h1>
                  <p className="mt-4 text-gray-600">This template demonstrates routing with AppShell.</p>
                </div>
              </LandingLayout>
            } 
          />
          
          {/* Products route - uses ProductsLayout stub */}
          <Route 
            path="/products" 
            element={
              <ProductsLayout>
                <div className="p-8">
                  <h2 className="text-2xl font-bold">Products Content</h2>
                  <p className="mt-4 text-gray-600">Product listing goes here.</p>
                </div>
              </ProductsLayout>
            } 
          />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
