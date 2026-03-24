import React from 'react'
import type { CallToAction, Media } from '@spektra/types'
import { cn } from '../utils/cn'
import { ArrowRight } from 'lucide-react'

export interface HeroBlockProps {
  title: string
  subtitle?: string
  description: string
  primaryCTA?: CallToAction
  secondaryCTA?: CallToAction
  backgroundImage?: Media
  colorScheme?: 'light' | 'dark'
  className?: string
}

export const HeroBlock: React.FC<HeroBlockProps> = ({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  colorScheme,
  className,
}) => {
  return (
    <section
      data-ui-component="hero-block"
      data-ui-role="hero"
      data-color-scheme={colorScheme ?? undefined}
      className={cn(
        'relative min-h-[600px] flex items-center justify-center',
        'bg-background text-foreground',
        className,
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      <div className="container mx-auto px-4 py-20 text-center">
        {subtitle && (
          <p className="text-muted-foreground font-semibold text-lg mb-4 animate-fade-in">
            {subtitle}
          </p>
        )}

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
          {title}
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in-up animation-delay-200">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
          {primaryCTA && (
            <a
              href={primaryCTA.href}
              data-ui-type="link"
              data-ui-id="hero-primary-cta"
              data-ui-action="navigate"
              data-ui-trigger="click"
              className={cn(
                'inline-flex items-center justify-center font-medium transition-all',
                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                'px-8 py-4 text-xl rounded-xl',
                'bg-accent text-accent-foreground hover:bg-accent/90',
              )}
            >
              {primaryCTA.text}
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          )}

          {secondaryCTA && (
            <a
              href={secondaryCTA.href}
              data-ui-type="link"
              data-ui-id="hero-secondary-cta"
              data-ui-action="navigate"
              data-ui-trigger="click"
              className={cn(
                'inline-flex items-center justify-center font-medium transition-all',
                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                'px-8 py-4 text-xl rounded-xl',
                'border-2 border-border hover:bg-muted/50',
              )}
            >
              {secondaryCTA.text}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
