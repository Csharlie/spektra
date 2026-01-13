import React from 'react';
import { FeatureCard, FeatureCardProps } from '../features/FeatureCard';
import { cn } from '../../utils/cn';

export interface FeaturesProps {
  title: string;
  subtitle?: string;
  features: Omit<FeatureCardProps, 'className'>[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export const Features: React.FC<FeaturesProps> = ({
  title,
  subtitle,
  features,
  columns = 3,
  className,
}) => {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section 
      data-ui-id="features-section"
      data-ui-class="features-section"
      data-ui-role="features"
      className={cn('py-20 bg-gray-50', className)}
    >
      <div className="container mx-auto px-4">
        <div 
          data-ui-id="features-header"
          data-ui-class="section-header"
          data-ui-role="section-header"
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {subtitle && (
            <p 
              data-ui-id="features-subtitle"
              data-ui-class="section-subtitle"
              data-ui-role="subtitle"
              className="text-primary-600 font-semibold text-lg mb-4"
            >
              {subtitle}
            </p>
          )}
          <h2 
            data-ui-id="features-title"
            data-ui-class="section-title"
            data-ui-role="heading"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            {title}
          </h2>
        </div>
        
        <div 
          data-ui-id="features-grid"
          data-ui-class="features-grid"
          data-ui-role="feature-list"
          className={cn('grid grid-cols-1 gap-8', gridCols[columns])}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
