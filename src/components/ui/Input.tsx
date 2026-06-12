import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, icon, iconPosition = 'left', className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-body-sm font-medium text-ink"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-tertiary pointer-events-none" aria-hidden="true">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              'w-full bg-white border border-surface-border rounded-xl text-body text-ink placeholder-ink-tertiary',
              'px-3.5 py-2.5 transition-all duration-150',
              'hover:border-ink-disabled',
              'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10',
              icon && iconPosition === 'left' && 'pl-10',
              icon && iconPosition === 'right' && 'pr-10',
              error && 'border-error focus:border-error focus:ring-error/10',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-tertiary pointer-events-none" aria-hidden="true">
              {icon}
            </span>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-caption text-error" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-caption text-ink-tertiary">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// ─── Textarea ─────────────────────────────────────────────
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-body-sm font-medium text-ink">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full bg-white border border-surface-border rounded-xl text-body text-ink placeholder-ink-tertiary',
            'px-3.5 py-2.5 resize-none transition-all duration-150',
            'hover:border-ink-disabled',
            'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10',
            error && 'border-error focus:border-error focus:ring-error/10',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-caption text-error" role="alert">{error}</p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-caption text-ink-tertiary">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
