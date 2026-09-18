import { cn } from '@/lib/utils';

/**
 * Hover label roll: on hover (or keyboard focus) of the enclosing link or
 * button, the text slides up and out while a copy slides in from below.
 * Styles live in globals.css (`.roll-text`). Pass plain text as children.
 */
export function RollText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('roll-text', className)}>
      <span className="roll-text__track">
        <span className="roll-text__line">{children}</span>
        <span className="roll-text__line roll-text__clone" aria-hidden="true">
          {children}
        </span>
      </span>
    </span>
  );
}
