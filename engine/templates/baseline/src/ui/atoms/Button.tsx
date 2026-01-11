import React from 'react';

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
}

/**
 * Button atom - minimal presentational component
 * Renders either a button or link based on props
 * No hardcoded content, props-only rendering
 */
export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  href, 
  variant = 'primary',
  className = '' 
}) => {
  if (href) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
};
