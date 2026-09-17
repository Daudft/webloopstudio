import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// 16px on touch devices: iOS Safari zooms the page in when a field under 16px is focused.
// Mouse devices keep the original 14px.
const control =
  'w-full rounded-[3px] border border-black/15 bg-white/60 font-sans text-[16px] text-black [@media(hover:hover)_and_(pointer:fine)]:text-[14px] transition-colors placeholder:text-black/35 hover:border-black/35 focus:border-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/10 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-red-600 aria-[invalid=true]:focus:ring-red-600/15';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = 'text', ...props }, ref) => (
  <input ref={ref} type={type} className={cn(control, 'h-12 px-4', className)} {...props} />
));
Input.displayName = 'Input';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(control, 'min-h-[140px] resize-y px-4 py-3', className)} {...props} />
));
Textarea.displayName = 'Textarea';

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, children, ...props }, ref) => (
  <div className="relative">
    <select ref={ref} className={cn(control, 'h-12 appearance-none truncate pl-4 pr-10', className)} {...props}>
      {children}
    </select>
    <ChevronDown
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/60"
      aria-hidden="true"
    />
  </div>
));
Select.displayName = 'Select';

export function fieldErrorId(id: string): string {
  return `${id}-error`;
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Label + control + error message. Pass `id`, `aria-invalid` and
 * `aria-describedby={error ? fieldErrorId(id) : undefined}` on the control.
 */
export function Field({ id, label, error, required, className, children }: FieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={id} className="block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-black/60">
        {label}
        {required && (
          <span className="text-black/40" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={fieldErrorId(id)} role="alert" className="font-sans text-[12px] text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
