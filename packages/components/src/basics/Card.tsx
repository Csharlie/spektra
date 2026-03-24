import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

const cardVariants = cva(
  'bg-surface rounded-xl border border-border',
  {
    variants: {
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      shadow: {
        true: 'shadow-lg',
      },
      hover: {
        true: 'transition-transform hover:scale-105',
      },
    },
    defaultVariants: {
      padding: 'md',
      shadow: true,
    },
  },
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card: React.FC<CardProps> = ({
  children,
  padding,
  shadow,
  hover,
  className,
  ...props
}) => {
  return (
    <div
      data-ui-component="card"
      className={cn(cardVariants({ padding, shadow, hover }), className)}
      {...props}
    >
      {children}
    </div>
  )
}
