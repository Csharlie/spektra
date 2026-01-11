/**
 * Main Entry Point - Routeline Template
 * 
 * Simplified entry point that delegates routing to App component.
 * 
 * ARCHITECTURE:
 * - DesignSystemProvider wraps the entire application
 * - Routing is handled in App.tsx
 * - AppShell is applied at the App level
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { DesignSystemProvider } from '@spektra/core';
import { App } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DesignSystemProvider initialSystem="base">
      <App />
    </DesignSystemProvider>
  </React.StrictMode>
);
  </React.StrictMode>,
);
