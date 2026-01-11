/**
 * AppShell Component
 * 
 * Provides a basic shell structure for the application.
 * Contains header with navigation placeholder and main content wrapper.
 * 
 * This component does NOT:
 * - Handle routing logic
 * - Implement layout behavior
 * - Manage navigation state
 * 
 * Children are rendered as-is in the main section.
 */

import React, { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with navigation placeholder */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="text-xl font-semibold">Spektra</div>
            <div className="flex gap-4">
              {/* Navigation placeholder - actual links defined in routing */}
              <a href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </a>
              <a href="/products" className="text-gray-600 hover:text-gray-900">
                Products
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
