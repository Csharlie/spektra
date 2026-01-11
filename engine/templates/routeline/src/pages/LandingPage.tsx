/**
 * LandingPage Component
 * 
 * Thin wrapper over LandingLayout from @spektra/core.
 * Contains no additional logic.
 */

import React from 'react';
import { LandingLayout } from '@spektra/core';

export default function LandingPage() {
  return (
    <LandingLayout
      navigation={{ logo: 'Spektra', links: [] }}
      footer={{ sections: [], copyright: '© 2026' }}
    >
      <div className="p-8">
        <h1 className="text-3xl font-bold">Welcome to Routeline</h1>
        <p className="mt-4 text-gray-600">This template demonstrates routing with AppShell.</p>
      </div>
    </LandingLayout>
  );
}
