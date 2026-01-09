import React from 'react';
import { Button, ButtonProps } from '../atoms/Button';

export interface CTAGroupProps {
  primaryAction?: ButtonProps;
  secondaryAction?: ButtonProps;
  className?: string;
}

/**
 * CTAGroup molecule - composes Button atoms
 * Displays one or more call-to-action buttons
 * Generic and reusable, data-driven via props
 */
export const CTAGroup: React.FC<CTAGroupProps> = ({ 
  primaryAction, 
  secondaryAction, 
  className = '' 
}) => {
  return (
    <div className={className}>
      {primaryAction && (
        <Button 
          label={primaryAction.label}
          onClick={primaryAction.onClick}
          href={primaryAction.href}
          variant={primaryAction.variant}
          className={primaryAction.className}
        />
      )}
      {secondaryAction && (
        <Button 
          label={secondaryAction.label}
          onClick={secondaryAction.onClick}
          href={secondaryAction.href}
          variant={secondaryAction.variant}
          className={secondaryAction.className}
        />
      )}
    </div>
  );
};
