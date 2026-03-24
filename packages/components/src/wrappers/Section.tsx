import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

const sectionVariants = cva(
  '',
  {
    variants: {
      spacing: {
        none: '',
        sm: 'py-8 md:py-12',
        md: 'py-12 md:py-20',
        lg: 'py-20 md:py-32',
        xl: 'py-32 md:py-40',
      },
      background: {
        default: 'bg-background',
        muted: 'bg-muted',
        accent: 'bg-accent text-accent-foreground',
      },
    },
    defaultVariants: {
      spacing: 'md',
      background: 'default',
    },
  },
)

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: 'section' | 'div' | 'article'
  colorScheme?: 'light' | 'dark'
}

export const Section: React.FC<SectionProps> = ({
  children,
  as: Tag = 'section',
  spacing,
  background,
  colorScheme,
  className,
  ...props
}) => {
  return (
    <Tag
      data-color-scheme={colorScheme ?? undefined}
      className={cn(sectionVariants({ spacing, background }), className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
