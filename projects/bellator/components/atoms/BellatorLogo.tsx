import React from 'react';

interface BellatorLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export const BellatorLogo: React.FC<BellatorLogoProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <div className={`font-bold font-['Lexend'] ${sizeClasses[size]} tracking-tight`}>
      <span className="text-white">Bellator</span>
      {' '}
      <span className="text-primary">Gym</span>
    </div>
  );
};
