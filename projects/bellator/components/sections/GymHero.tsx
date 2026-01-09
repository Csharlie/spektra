import React from 'react';
import { cn } from '@spektra/core';
import { ArrowRight } from 'lucide-react';

export interface GymHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  cta?: {
    text: string;
    onClick: () => void;
  };
  secondaryCTA?: {
    text: string;
    onClick: () => void;
  };
  className?: string;
}

export const GymHero: React.FC<GymHeroProps> = ({
  title,
  subtitle,
  description,
  image,
  cta,
  secondaryCTA,
  className,
}) => {
  return (
    <section className={cn('relative h-screen min-h-[600px] flex items-center', className)}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt="Bellator Gym"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {subtitle && (
            <div className="mb-6 inline-block">
              <span className="px-4 py-2 bg-gym-yellow text-black font-black text-sm uppercase tracking-widest">
                {subtitle}
              </span>
            </div>
          )}
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-none tracking-tighter uppercase">
            {title.split(' ').map((word, index) => (
              <React.Fragment key={index}>
                {index === title.split(' ').length - 1 ? (
                  <span className="text-gym-yellow">{word}</span>
                ) : (
                  <>{word} </>
                )}
              </React.Fragment>
            ))}
          </h1>
          
          {description && (
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4">
            {cta && (
              <button
                onClick={cta.onClick}
                className="group px-8 py-4 bg-gym-yellow text-black font-black text-lg uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2"
              >
                {cta.text}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
            
            {secondaryCTA && (
              <button
                onClick={secondaryCTA.onClick}
                className="px-8 py-4 border-2 border-white text-white font-black text-lg uppercase tracking-wider hover:bg-white hover:text-black transition-all"
              >
                {secondaryCTA.text}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-gym-yellow rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-gym-yellow rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
