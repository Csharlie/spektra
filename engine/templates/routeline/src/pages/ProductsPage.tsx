/**
 * ProductsPage Component
 * 
 * Thin wrapper over ProductsLayout stub.
 * Contains no additional logic.
 */

import React from 'react';

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

export default function ProductsPage() {
  return (
    <ProductsLayout>
      <div className="p-8">
        <h2 className="text-2xl font-bold">Products Content</h2>
        <p className="mt-4 text-gray-600">Product listing goes here.</p>
      </div>
    </ProductsLayout>
  );
}
