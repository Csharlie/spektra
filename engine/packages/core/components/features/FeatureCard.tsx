import React from 'react';
import { cn } from '../../utils/cn';
import { LucideIcon } from 'lucide-react';

export interface FeatureCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  className,
}) => {
  return (
    <div
      data-ui-id="feature-card"
      data-ui-class="feature-card"
      data-ui-role="feature-item"
      className={cn(
        'group p-6 bg-white rounded-xl border border-gray-200 shadow-sm',
        'hover:shadow-lg hover:border-primary-300 transition-all duration-300',
        className
      )}
    >
      {Icon && (
        <div 
          data-ui-id="feature-card-icon"
          data-ui-class="feature-icon"
          data-ui-role="icon-container"
          className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors"
        >
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
      )}
      <h3 
        data-ui-id="feature-card-title"
        data-ui-class="feature-title"
        data-ui-role="heading"
        className="text-xl font-bold text-gray-900 mb-2"
      >
        {title}
      </h3>
      <p 
        data-ui-id="feature-card-description"
        data-ui-class="feature-description"
        data-ui-role="description"
        className="text-gray-600 leading-relaxed"
      >
        {description}
      </p>
    </div>
  );
};
