import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { DesignSystemProvider } from '@spektra/core';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DesignSystemProvider initialSystem="base">
      <App />
    </DesignSystemProvider>
  </React.StrictMode>,
);
