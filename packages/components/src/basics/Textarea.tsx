import React, { useId } from 'react'
import { cn } from '../utils/cn'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, required, ...props }, ref) => {
    const textareaId = useId()
    const errorId = useId()
    const helperId = useId()
    const describedBy = [
      error ? errorId : undefined,
      helperText && !error ? helperId : undefined,
    ].filter(Boolean).join(' ') || undefined

    return (
      <div className="w-full" data-ui-component="textarea">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-foreground mb-1">{label}</label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          data-ui-type="textarea"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          aria-required={required}
          className={cn(
            'w-full px-4 py-2 border rounded-lg transition-colors resize-none',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
            error ? 'border-destructive' : 'border-border',
            'disabled:bg-muted disabled:cursor-not-allowed',
            className,
          )}
          rows={4}
          required={required}
          {...props}
        />
        {error && <p id={errorId} role="alert" className="mt-1 text-sm text-destructive">{error}</p>}
        {helperText && !error && <p id={helperId} className="mt-1 text-sm text-muted-foreground">{helperText}</p>}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
