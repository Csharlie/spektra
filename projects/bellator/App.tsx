import React from 'react';
import HomePage from './pages/Home';
import { getBellatorContent } from './src/data';

function App() {
  // Load all site data from the unified data layer
  const content = getBellatorContent();
  
  return <HomePage content={content} />;
}

export default App;
