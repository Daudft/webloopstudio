'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface PageCloseButtonProps {
  /** Where closing goes. Defaults to the homepage. */
  href?: string;
  className?: string;
}

/**
 * "Close [ESC]" button, same look as the About overlay's. Clicking it or
 * pressing Escape navigates to `href`. Fixed top-right, where the navbar's
 * CTA would normally sit (the navbar hides its CTA on pages that use this).
 */
export function PageCloseButton({ href = '/', className }: PageCloseButtonProps) {
  const router = useRouter();
  const close = useCallback(() => router.push(href), [router, href]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [close]);

  return (
    <button
      type="button"
      onClick={close}
      aria-label="Close and go back to the homepage"
      aria-keyshortcuts="Escape"
      className={cn(
        'fixed right-6 top-[16px] z-[80] inline-flex h-9 items-center gap-3 rounded-[4px] bg-[#101214] pl-3 pr-1.5 font-sans text-[15px] font-semibold tracking-[-0.02em] text-white transition-colors duration-300 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111315] focus-visible:ring-offset-2',
        className
      )}
    >
      Close
      <kbd className="flex h-6 items-center rounded-[3px] border border-white/15 bg-white/15 px-1.5 font-sans text-[8px] font-semibold uppercase tracking-[0.04em] text-white/70">
        Esc
      </kbd>
    </button>
  );
}
