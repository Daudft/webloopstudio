'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { RollText } from '@/components/ui/roll-text';
import { RollArrow } from '@/components/ui/roll-arrow';

/** Pages where a "Start a project" bar would be redundant. */
const HIDDEN_ROUTES = ['/contact', '/thank-you'];

/** Body classes set while something else occupies the screen (see navbar, About overlay, cookie banner). */
const BLOCKING_CLASSES = ['mobile-menu-open', 'about-overlay-open', 'cookie-banner-open'];

/**
 * Phones only: a "Start a project" button pinned to the bottom of the screen.
 *
 * It slides in once the visitor has scrolled past most of the first screen (the hero has its
 * own CTA), and steps aside while the mobile menu, About overlay or cookie banner is open.
 */
export function MobileStickyCta() {
  const pathname = usePathname();
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolledPastHero(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    const body = document.body;
    const sync = () => setBlocked(BLOCKING_CLASSES.some((name) => body.classList.contains(name)));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  if (HIDDEN_ROUTES.includes(pathname)) return null;

  const visible = scrolledPastHero && !blocked;

  return (
    <div
      aria-hidden={!visible}
      className="pointer-events-none fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[60] md:hidden"
    >
      <Link
        href="/contact"
        tabIndex={visible ? undefined : -1}
        className={cn(
          'flex h-12 w-full items-center justify-between rounded-[4px] bg-black pl-4 pr-1.5 font-sans text-[15px] font-semibold tracking-[-0.01em] text-white shadow-2xl shadow-black/40 ring-1 ring-white/15 transition-[transform,opacity] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice',
          visible ? 'pointer-events-auto translate-y-0 opacity-100' : 'translate-y-[calc(100%+1.5rem)] opacity-0'
        )}
        style={{ transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)' }}
      >
        <RollText>Start a project</RollText>
        <span className="flex h-9 w-9 items-center justify-center rounded-[3px] bg-ice text-black">
          <RollArrow className="h-4 w-4" />
        </span>
      </Link>
    </div>
  );
}
