import React from 'react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { ArrowRight } from 'lucide-react';

export interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryCTA?: {
    text: string;
    onClick: () => void;
  };
  secondaryCTA?: {
    text: string;
    onClick: () => void;
  };
  backgroundImage?: string;
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  className,
}) => {
  return (
    <section
      className={cn(
        'relative min-h-[600px] flex items-center justify-center',
        'bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700',
        className
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      <div className="container mx-auto px-4 py-20 text-center">
        {subtitle && (
          <p className="text-primary-200 font-semibold text-lg mb-4 animate-fade-in">
            {subtitle}
          </p>
        )}
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up">
          {title}
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto mb-10 animate-fade-in-up animation-delay-200">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
          {primaryCTA && (
            <Button
              size="xl"
              variant="primary"
              onClick={primaryCTA.onClick}
              className="bg-white text-primary-700 hover:bg-gray-100"
            >
              {primaryCTA.text}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          )}
          
          {secondaryCTA && (
            <Button
              size="xl"
              variant="outline"
              onClick={secondaryCTA.onClick}
              className="border-white text-white hover:bg-white/10"
            >
              {secondaryCTA.text}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
