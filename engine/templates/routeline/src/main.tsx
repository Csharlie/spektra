/**
 * Main Entry Point - Routeline Template
 * 
 * Simplified entry point that delegates routing to App component.
 * 
 * ARCHITECTURE:
 * - Routing is handled in App.tsx
 * - AppShell is applied at the App level
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
