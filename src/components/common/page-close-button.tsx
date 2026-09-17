'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { hasInAppHistory } from '@/lib/in-app-navigation';

interface PageCloseButtonProps {
  /** Where closing goes. Defaults to the homepage. */
  href?: string;
  /**
   * Go back to the previous page on this site when there is one (e.g. a project
   * opened from the homepage or from /work), falling back to `href` otherwise.
   */
  preferBack?: boolean;
  className?: string;
}

/**
 * "Close [ESC]" button, same look as the About overlay's. Clicking it or
 * pressing Escape navigates to `href`. Fixed top-right, where the navbar's
 * CTA would normally sit (the navbar hides its CTA on pages that use this).
 */
export function PageCloseButton({ href = '/', preferBack = false, className }: PageCloseButtonProps) {
  const router = useRouter();
  const close = useCallback(() => {
    if (preferBack && hasInAppHistory()) router.back();
    else router.push(href);
  }, [router, href, preferBack]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      // Esc belongs to whatever is open on top: the About overlay or the mobile menu close
      // themselves. Without this check one key press also navigated this page away.
      const { classList } = document.body;
      if (classList.contains('about-overlay-open') || classList.contains('mobile-menu-open')) return;
      close();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [close]);

  return (
    <button
      type="button"
      onClick={close}
      aria-label="Close this page"
      aria-keyshortcuts="Escape"
      className={cn(
        // Below md the navbar's menu toggle sits at the far right, so Close moves left of it.
        'fixed right-16 top-[16px] z-[80] inline-flex h-9 items-center gap-3 rounded-[4px] bg-[#101214] pl-3 pr-3 font-sans text-[15px] font-semibold tracking-[-0.02em] text-white shadow-lg shadow-black/20 transition-colors duration-300 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111315] focus-visible:ring-offset-2 md:right-6 [@media(hover:hover)_and_(pointer:fine)]:pr-1.5',
        className
      )}
    >
      Close
      {/* Keyboard hint only on devices with a mouse (and so, usually, a keyboard). */}
      <kbd className="hidden h-6 items-center rounded-[3px] border border-white/15 bg-white/15 px-1.5 font-sans text-[8px] font-semibold uppercase tracking-[0.04em] text-white/70 [@media(hover:hover)_and_(pointer:fine)]:flex">
        Esc
      </kbd>
    </button>
  );
}
