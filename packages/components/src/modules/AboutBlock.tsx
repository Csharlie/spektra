import React from 'react'
import type { CallToAction, Media } from '@spektra/types'
import { cn } from '../utils/cn'

export interface AboutBlockProps {
  title: string
  subtitle?: string
  content: string | React.ReactNode
  image?: Media
  imagePosition?: 'left' | 'right'
  cta?: CallToAction
  stats?: Array<{
    value: string
    label: string
  }>
  colorScheme?: 'light' | 'dark'
  className?: string
}

export const AboutBlock: React.FC<AboutBlockProps> = ({
  title,
  subtitle,
  content,
  image,
  imagePosition = 'right',
  cta,
  stats,
  colorScheme,
  className,
}) => {
  return (
    <section
      data-ui-component="about-block"
      data-ui-role="about"
      data-color-scheme={colorScheme ?? undefined}
      className={cn('py-20 bg-background text-foreground', className)}
    >
      <div className="container mx-auto px-4">
        <div
          className={cn(
            'grid md:grid-cols-2 gap-12 items-center',
            imagePosition === 'left' && 'md:grid-flow-dense',
          )}
        >
          <div className={imagePosition === 'left' ? 'md:col-start-2' : ''}>
            {subtitle && (
              <p className="text-accent font-semibold text-lg mb-4">{subtitle}</p>
            )}

            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{title}</h2>

            <div className="text-lg text-muted-foreground leading-relaxed mb-8">
              {typeof content === 'string' ? <p>{content}</p> : content}
            </div>

            {stats && stats.length > 0 && (
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-4xl font-bold text-accent mb-1">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {cta && (
              <a
                href={cta.href}
                className={cn(
                  'inline-flex items-center justify-center font-medium transition-all',
                  'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent',
                  'px-6 py-3 text-lg rounded-lg',
                  'bg-accent text-accent-foreground hover:bg-accent/90',
                )}
              >
                {cta.text}
              </a>
            )}
          </div>

          {image && (
            <div
              className={cn(
                'relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl',
                imagePosition === 'left' && 'md:col-start-1',
              )}
            >
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
