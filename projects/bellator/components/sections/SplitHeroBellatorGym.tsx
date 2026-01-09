/**
 * SplitHeroBellatorGym komponens
 * 
 * Ez a komponens egy osztott hero szekciót hoz létre, amely két különböző szolgáltatást
 * mutat be egymás mellett (edzőterem és squash). A bal oldalon a hagyományos edzőtermi
 * tartalom jelenik meg, míg a jobb oldalon a squash pálya promóciós anyag.
 * A két oldalt egy dinamikus, ferde elválasztó választja szét, amely vizuálisan
 * érdekes hatást kelt. Mobilon a két oldal egymás alá kerül, megtartva a ferde elválasztót.
 */

import React from 'react';
import { cn } from '@spektra/core';
import { ArrowRight } from 'lucide-react';

// Interface for CTA button configuration
export interface CTAButton {
  text: string;
  onClick: () => void;
}

// Interface for each side of the split hero
export interface HeroSideProps {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  cta?: CTAButton;
  secondaryCTA?: CTAButton;
}

// Main component props
export interface SplitHeroBellatorGymProps {
  // Left side configuration (Gym)
  gymSide: HeroSideProps;
  // Right side configuration (Squash)
  squashSide: HeroSideProps;
  // Optional className for custom styling
  className?: string;
}

export const SplitHeroBellatorGym: React.FC<SplitHeroBellatorGymProps> = ({
  gymSide,
  squashSide,
  className,
}) => {
  return (
    <section 
      className={cn(
        'relative min-h-screen flex flex-col lg:flex-row overflow-hidden',
        className
      )}
      aria-label="Split hero section showcasing gym and squash facilities"
    >
      {/* Left Side - Gym Section */}
      <div 
        className="relative flex-1 flex items-center justify-center min-h-[600px] lg:min-h-screen group"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 top-0 z-0 transition-transform duration-300 ease-out lg:-skew-x-3  max-[768px]:-skew-y-3 overflow-hidden scale-110">
          <div className="absolute inset-0 w-full h-full scale-110">
            <img
              src={gymSide.image}
              alt={gymSide.subtitle || 'Bellator Gym facility'}
              className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 overflow-hidden"
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/50" />
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-12 lg:pb-24 lg:py-0">
          <div className="max-w-2xl mx-auto lg:mx-0 lg:ml-auto lg:mr-16">
            {/* Subtitle Badge */}
            {gymSide.subtitle && (
              <div className="mb-6 inline-block">
                <span 
                  className="px-4 py-2 bg-gym-yellow text-black font-black text-sm uppercase tracking-widest"
                  role="text"
                >
                  {gymSide.subtitle}
                </span>
              </div>
            )}
            
            {/* Main Title with Last Word Highlighted */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-none tracking-tighter uppercase">
              {gymSide.title.split(' ').map((word, index) => (
                <React.Fragment key={index}>
                  {index === gymSide.title.split(' ').length - 1 ? (
                    <span className="text-gym-yellow">{word}</span>
                  ) : (
                    <>{word} </>
                  )}
                </React.Fragment>
              ))}
            </h1>
            
            {/* Description Text */}
            {gymSide.description && (
              <p className="text-lg md:text-xl text-white mb-10 leading-relaxed">
                {gymSide.description}
              </p>
            )}
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {gymSide.cta && (
                <button
                  onClick={gymSide.cta.onClick}
                  className="group px-8 py-4 bg-gym-yellow text-black font-black text-lg uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-gym-yellow focus:ring-offset-2 focus:ring-offset-black"
                  aria-label={gymSide.cta.text}
                >
                  {gymSide.cta.text}
                  <ArrowRight 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                    aria-hidden="true"
                  />
                </button>
              )}
              
              {gymSide.secondaryCTA && (
                <button
                  onClick={gymSide.secondaryCTA.onClick}
                  className="px-8 py-4 border-2 border-white text-white font-black text-lg uppercase tracking-wider hover:bg-white hover:text-black transition-all focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                  aria-label={gymSide.secondaryCTA.text}
                >
                  {gymSide.secondaryCTA.text}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ferde elválasztó vonal - Desktop (vertikális) */}
      <div 
        className="hidden lg:block absolute left-1/2 top-0 w-0.5 h-full bg-primary z-30 pointer-events-none"
        style={{
          transform: 'translateX(-50%) skewX(-3deg)',
        }}
      />

      {/* Ferde elválasztó vonal - Mobile (horizontális) */}
      <div 
        className="lg:hidden absolute w-full h-0.5 bg-primary z-30 pointer-events-none"
        style={{
          top: 'calc(50% - 1px)',
          transform: 'skewY(-3deg)',
        }}
      />

      {/* Right Side - Squash Section */}
      <div className="relative flex-1 flex items-center justify-center min-h-[600px] lg:min-h-screen group">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 max-[768px]:top-7 z-0 transition-transform duration-300 ease-out lg:-skew-x-3  max-[768px]:-skew-y-3 overflow-hidden scale-110">
          <div className="absolute inset-0 w-full h-full">
            <img
              src={squashSide.image}
              alt={squashSide.subtitle || 'Bellator Squash court'}
              className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            />
            {/* Gradient overlay for better text readability - mirrored */}
            <div className="absolute inset-0 bg-gradient-to-bl from-black/90 via-black/70 to-black/50" />
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0 text-right">
          <div className="max-w-2xl mx-auto lg:mx-0 lg:mr-auto lg:ml-16">
            {/* Subtitle Badge - Using Primary Color for Variation */}
            {squashSide.subtitle && (
              <div className="mb-6 inline-block">
                <span 
                  className="px-4 py-2 bg-primary text-black font-black text-sm uppercase tracking-widest"
                  role="text"
                >
                  {squashSide.subtitle}
                </span>
              </div>
            )}
            
            {/* Main Title with Last Word Highlighted */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-none tracking-tighter uppercase">
              {squashSide.title.split(' ').map((word, index) => (
                <React.Fragment key={index}>
                  {index === squashSide.title.split(' ').length - 1 ? (
                    <span className="text-primary">{word}</span>
                  ) : (
                    <>{word} </>
                  )}
                </React.Fragment>
              ))}
            </h1>
            
            {/* Description Text */}
            {squashSide.description && (
              <p className="text-lg md:text-xl text-white mb-10 leading-relaxed">
                {squashSide.description}
              </p>
            )}
            
            {/* CTA Buttons */}
            <div className="flex flex-col-reverse sm:flex-row-reverse gap-4">
              
              {squashSide.secondaryCTA && (
                <button
                  onClick={squashSide.secondaryCTA.onClick}
                  className="px-8 py-4 border-2 border-white text-white font-black text-lg uppercase tracking-wider hover:bg-white hover:text-black transition-all focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                  aria-label={squashSide.secondaryCTA.text}
                >
                  {squashSide.secondaryCTA.text}
                </button>
              )}
              {squashSide.cta && (
                <button
                  onClick={squashSide.cta.onClick}
                  className="group px-8 py-4 bg-primary text-black font-black text-lg uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black"
                  aria-label={squashSide.cta.text}
                >
                  {squashSide.cta.text}
                  <ArrowRight 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Centered at Bottom (hidden on mobile) */}
      <div className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div 
          className="w-6 h-10 border-2 border-gym-yellow rounded-full flex justify-center p-2"
          role="presentation"
          aria-hidden="true"
        >
          <div className="w-1 h-3 bg-gym-yellow rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
