import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Arrow that pairs with RollText: on hover of the enclosing link or button it
 * flies out in its own direction while a copy comes in from the opposite side
 * (top right for the default arrow, left for `direction="left"`).
 * Styles live in globals.css (`.roll-arrow`). `className` sizes the icon.
 */
export function RollArrow({ className, direction = 'up-right' }: { className?: string; direction?: 'up-right' | 'left' }) {
  const Icon = direction === 'left' ? ArrowLeft : ArrowUpRight;
  return (
    <span className={cn('roll-arrow', direction === 'left' && 'roll-arrow--left')} aria-hidden="true">
      <Icon className={cn('roll-arrow__icon', className)} />
      <Icon className={cn('roll-arrow__icon roll-arrow__clone', className)} />
    </span>
  );
}
