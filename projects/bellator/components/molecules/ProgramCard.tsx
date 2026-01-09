import React from 'react';
import { cn } from '@spektra/core';
import { LucideIcon } from 'lucide-react';

export interface ProgramCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
  image?: string;
  className?: string;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  icon: Icon,
  title,
  description,
  features,
  image,
  className,
}) => {
  return (
    <div className={cn(
      'group relative overflow-hidden bg-white rounded-none border-4 border-black transition-all hover:scale-105 hover:shadow-2xl',
      className
    )}>
      {image && (
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
      )}
      
      <div className="p-8">
        <div className="mb-4">
          <div className="w-16 h-16 bg-gym-yellow flex items-center justify-center">
            <Icon className="w-8 h-8 text-black" strokeWidth={2.5} />
          </div>
        </div>
        
        <h3 className="text-2xl font-black mb-3 text-black uppercase tracking-tight">
          {title}
        </h3>
        
        <p className="text-gray-700 mb-4 leading-relaxed">
          {description}
        </p>
        
        {features && features.length > 0 && (
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-gym-yellow mt-2 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gym-yellow transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  );
};
