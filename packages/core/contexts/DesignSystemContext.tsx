import React, { createContext, useContext, useState, useEffect } from 'react';
import { baseTheme, Theme } from '../design-systems/base/theme';

interface DesignSystemContextType {
  currentSystem: 'base' | 'material' | 'radix';
  theme: Theme;
  switchDesignSystem: (system: 'base' | 'material' | 'radix') => void;
}

const DesignSystemContext = createContext<DesignSystemContextType | undefined>(undefined);

export interface DesignSystemProviderProps {
  children: React.ReactNode;
  initialSystem?: 'base' | 'material' | 'radix';
}

export const DesignSystemProvider: React.FC<DesignSystemProviderProps> = ({ 
  children, 
  initialSystem = 'base' 
}) => {
  const [currentSystem, setCurrentSystem] = useState(initialSystem);
  const [theme, setTheme] = useState<Theme>(baseTheme);

  useEffect(() => {
    setTheme(baseTheme);
  }, [currentSystem]);

  const switchDesignSystem = (system: 'base' | 'material' | 'radix') => {
    setCurrentSystem(system);
  };

  return (
    <DesignSystemContext.Provider value={{ 
      currentSystem, 
      theme, 
      switchDesignSystem 
    }}>
      {children}
    </DesignSystemContext.Provider>
  );
};

export const useDesignSystem = () => {
  const context = useContext(DesignSystemContext);
  if (!context) {
    throw new Error('useDesignSystem must be used within DesignSystemProvider');
  }
  return context;
};
