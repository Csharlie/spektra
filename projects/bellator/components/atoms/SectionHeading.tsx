import React from 'react';
import { cn } from '@spektra/core';

export interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  dark?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  subtitle,
  title,
  description,
  align = 'center',
  dark = false,
  className,
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const textColorClasses = dark
    ? 'text-white'
    : 'text-gray-900';

  const subtitleColorClasses = dark
    ? 'text-gym-yellow'
    : 'text-gym-yellow';

  const descriptionColorClasses = dark
    ? 'text-gray-300'
    : 'text-gray-600';

  return (
    <div className={cn('space-y-4', alignmentClasses[align], className)}>
      {subtitle && (
        <p className={cn(
          'text-sm font-bold tracking-wider uppercase',
          subtitleColorClasses
        )}>
          {subtitle}
        </p>
      )}
      <h2 className={cn(
        'text-4xl md:text-5xl lg:text-6xl font-black tracking-tight',
        textColorClasses
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          'text-lg md:text-xl max-w-3xl',
          align === 'center' && 'mx-auto',
          descriptionColorClasses
        )}>
          {description}
        </p>
      )}
    </div>
  );
};
