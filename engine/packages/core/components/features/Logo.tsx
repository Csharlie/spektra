import React from 'react';
import { cn } from '../../utils/cn';

export interface LogoProps {
  text?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ 
  text = 'Spektra',
  className,
  size = 'md'
}) => {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const hasTextColor = className?.includes('text-');

  return (
    <div className={cn('font-display font-bold', sizes[size], className)}>
      <span className={hasTextColor ? '' : 'bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent'}>
        {text}
      </span>
    </div>
  );
};
