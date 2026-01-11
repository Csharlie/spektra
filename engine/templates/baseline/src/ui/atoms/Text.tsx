import React from 'react';

export interface TextProps {
  content: string;
  variant?: 'body' | 'small' | 'caption';
  className?: string;
}

/**
 * Text atom - minimal presentational component
 * Renders text with no layout logic or hardcoded content
 */
export const Text: React.FC<TextProps> = ({ content, variant = 'body', className = '' }) => {
  return <p className={className}>{content}</p>;
};
