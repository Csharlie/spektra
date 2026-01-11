import React from 'react';

export interface TitleProps {
  text: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

/**
 * Title atom - minimal presentational component
 * Renders semantic heading elements with provided text
 */
export const Title: React.FC<TitleProps> = ({ text, level = 1, className = '' }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return <Tag className={className}>{text}</Tag>;
};
