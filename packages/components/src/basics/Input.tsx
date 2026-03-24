import React, { useId } from 'react'
import { cn } from '../utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, required, ...props }, ref) => {
    const inputId = useId()
    const errorId = useId()
    const helperId = useId()
    const describedBy = [
      error ? errorId : undefined,
      helperText && !error ? helperId : undefined,
    ].filter(Boolean).join(' ') || undefined

    return (
      <div className="w-full" data-ui-component="input">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-foreground mb-1">{label}</label>
        )}
        <input
          ref={ref}
          id={inputId}
          data-ui-type="input"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          aria-required={required}
          className={cn(
            'w-full px-4 py-2 border rounded-lg transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
            error ? 'border-destructive' : 'border-border',
            'disabled:bg-muted disabled:cursor-not-allowed',
            className,
          )}
          required={required}
          {...props}
        />
        {error && <p id={errorId} role="alert" className="mt-1 text-sm text-destructive">{error}</p>}
        {helperText && !error && <p id={helperId} className="mt-1 text-sm text-muted-foreground">{helperText}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'
