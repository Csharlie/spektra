import React from 'react'
import { cn } from '../utils/cn'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full" data-ui-component="textarea">
        {label && (
          <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
        )}
        <textarea
          ref={ref}
          data-ui-type="textarea"
          className={cn(
            'w-full px-4 py-2 border rounded-lg transition-colors resize-none',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
            error ? 'border-destructive' : 'border-border',
            'disabled:bg-muted disabled:cursor-not-allowed',
            className,
          )}
          rows={4}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-muted-foreground">{helperText}</p>}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
