import * as React from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'navy' | 'ice' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex select-none items-center justify-center gap-2 font-sans font-semibold leading-none transition-[background-color,color,opacity,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]';

const variants: Record<ButtonVariant, string> = {
  navy: 'bg-navy text-ice hover:bg-navy/90 focus-visible:ring-navy focus-visible:ring-offset-ice',
  ice: 'bg-ice text-navy hover:bg-white focus-visible:ring-ice focus-visible:ring-offset-navy',
  ghost:
    'bg-transparent underline decoration-current/40 underline-offset-4 hover:decoration-current focus-visible:ring-current',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 rounded-[3px] px-3 text-[11px]',
  md: 'h-11 rounded-[3px] px-5 text-[13px]',
  lg: 'h-14 rounded-[3px] px-7 text-[15px]',
};

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/** Class string for button-styled elements. Use on `<Link>` / `<a>` so we never nest a button inside an anchor. */
export function buttonClasses({ variant = 'navy', size = 'md', className }: ButtonStyleOptions = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonStyleOptions {
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, children, disabled, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={buttonClasses({ variant, size, className })}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  )
);

Button.displayName = 'Button';
