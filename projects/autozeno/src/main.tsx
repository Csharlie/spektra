import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@spektra/core/app/App';
import { loadSiteData } from './data';
import './index.css';

// Load site data and render
loadSiteData().then((siteData) => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App data={siteData} />
    </React.StrictMode>,
  );
});
