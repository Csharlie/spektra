import React from 'react'
import { cn } from '../utils/cn'
import type { LucideIcon } from 'lucide-react'

export interface FeatureCardProps {
  icon?: LucideIcon
  title: string
  description: string
  className?: string
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  className,
}) => {
  return (
    <div
      className={cn(
        'group p-6 bg-surface rounded-xl border border-border shadow-sm',
        'hover:shadow-lg hover:border-accent/30 transition-all duration-300',
        className,
      )}
      data-ui-component="feature-card"
    >
      {Icon && (
        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
          <Icon className="w-6 h-6 text-accent" />
        </div>
      )}
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
