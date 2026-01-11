import React from 'react';
import { Text } from '../atoms/Text';

export interface IconTextProps {
  icon: React.ReactNode;
  text: string;
  className?: string;
}

/**
 * IconText molecule - composes atoms
 * Small, focused responsibility: display an icon with text
 * Generic and reusable, no project-specific assumptions
 */
export const IconText: React.FC<IconTextProps> = ({ icon, text, className = '' }) => {
  return (
    <div className={className}>
      {icon}
      <Text content={text} />
    </div>
  );
};
