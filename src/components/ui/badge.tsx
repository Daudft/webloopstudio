import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'glow' | 'accent';
}

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  const variants = {
    default:
      'border-transparent bg-primary/20 text-purple-300 border border-purple-500/30',
    secondary:
      'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border-border text-foreground',
    glow:
      'bg-purple-950/60 border border-purple-500/40 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.25)]',
    accent: 'bg-cyan-950/60 border border-cyan-500/40 text-cyan-200',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
