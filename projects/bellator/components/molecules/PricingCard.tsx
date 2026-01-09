import React from 'react';
import { cn } from '@spektra/core';
import { Check } from 'lucide-react';

export interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta?: {
    text: string;
    onClick: () => void;
  };
  className?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  period,
  description,
  features,
  highlighted = false,
  cta,
  className,
}) => {
  return (
    <div className={cn(
      'relative bg-white border-4 transition-all hover:scale-105',
      highlighted 
        ? 'border-gym-yellow shadow-2xl z-10 scale-105' 
        : 'border-black border-8 shadow-lg hover:border-gym-yellow',
      className
    )}>
      {highlighted && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gym-yellow text-black px-6 py-2 font-black text-sm uppercase tracking-wider z-10">
          Népszerű
        </div>
      )}
      
      <div className={cn(
        'p-8',
        highlighted && 'bg-gradient-to-b from-gym-yellow/5 to-transparent'
      )}>
        <h3 className="text-2xl font-black mb-2 text-black uppercase tracking-tight">
          {name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-6">
          {description}
        </p>
        
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-5xl font-black text-black">
              {price}
            </span>
            <span className="text-xl text-gray-600 ml-2">
              Ft
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            / {period}
          </p>
        </div>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-5 h-5 text-gym-yellow mr-3 flex-shrink-0 mt-0.5" strokeWidth={3} />
              <span className="text-gray-700 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        {cta && (
          <button
            onClick={cta.onClick}
            className={cn(
              'w-full py-4 font-black text-lg uppercase tracking-wider transition-all',
              highlighted
                ? 'bg-gym-yellow text-black hover:bg-black hover:text-gym-yellow border-2 border-gym-yellow'
                : 'bg-black text-white hover:bg-gym-yellow hover:text-black border-2 border-black hover:border-gym-yellow'
            )}
          >
            {cta.text}
          </button>
        )}
      </div>
      
      {highlighted && (
        <div className="absolute inset-0 pointer-events-none border-4 border-gym-yellow" />
      )}
    </div>
  );
};
