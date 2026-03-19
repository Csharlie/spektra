import React from 'react'
import { cn } from '../utils/cn'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'article'
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  background?: 'white' | 'gray' | 'primary' | 'dark'
}

const spacingStyles = {
  none: '',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-20',
  lg: 'py-20 md:py-32',
  xl: 'py-32 md:py-40',
}

const backgroundStyles = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  primary: 'bg-primary-600 text-white',
  dark: 'bg-gray-900 text-white',
}

export const Section: React.FC<SectionProps> = ({
  children,
  as: Tag = 'section',
  spacing = 'md',
  background = 'white',
  className,
  ...props
}) => {
  return (
    <Tag
      className={cn(spacingStyles[spacing], backgroundStyles[background], className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
