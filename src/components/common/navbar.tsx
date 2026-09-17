'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { mainNavItems } from '@/config/navigation';
import { buttonClasses } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { markPageVisit } from '@/lib/in-app-navigation';

/** The colour of whatever is painted directly beneath the bar. */
type Surface = 'dark' | 'light';

const desktopItems = mainNavItems.filter((item) => item.href !== '/contact');

/** Routes that render a PageCloseButton where the navbar CTA normally sits (/work and every /work/<project>). */
const showsCloseButton = (pathname: string) => pathname === '/contact' || pathname === '/work' || pathname.startsWith('/work/');

/**
 * The logo PNG is used as a mask over `currentColor`, so it always matches the
 * nav text colour and cross-fades with it when the surface changes.
 */
const LOGO_MASK = "url('/Logo.png')";
const logoMaskStyle: React.CSSProperties = {
  maskImage: LOGO_MASK,
  WebkitMaskImage: LOGO_MASK,
  maskSize: 'contain',
  WebkitMaskSize: 'contain',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskPosition: 'left center',
  WebkitMaskPosition: 'left center',
};

function parseRgba(value: string): [number, number, number, number] | null {
  const match = value.match(/rgba?\(([^)]+)\)/);
  if (!match) return null;
  const [r, g, b, a = 1] = match[1].split(/[\s,/]+/).filter(Boolean).map(Number);
  return [r, g, b, a];
}

function relativeLuminance(r: number, g: number, b: number): number {
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/**
 * Looks at the stack of elements under the middle of the bar and returns the
 * first solid background's lightness. A section can force the answer with
 * `data-nav-surface="light" | "dark"`, and overlays can opt out with
 * `data-nav-ignore`.
 */
function detectSurface(header: HTMLElement): Surface {
  const rect = header.getBoundingClientRect();
  const x = window.innerWidth / 2;
  const y = rect.top + 32;

  for (const element of document.elementsFromPoint(x, y)) {
    if (header.contains(element) || element.closest('[data-nav-ignore]')) continue;

    const forced = element.closest('[data-nav-surface]')?.getAttribute('data-nav-surface');
    if (forced === 'light' || forced === 'dark') return forced;

    const background = parseRgba(getComputedStyle(element).backgroundColor);
    if (background && background[3] >= 0.5) {
      return relativeLuminance(background[0], background[1], background[2]) > 0.4 ? 'light' : 'dark';
    }
  }
  return 'dark';
}

export function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [surface, setSurface] = useState<Surface>('dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const measure = useCallback(() => {
    const header = headerRef.current;
    if (!header) return;
    setSurface(detectSurface(header));
  }, []);

  // Re-read the surface on scroll, resize and route change (throttled to one per frame).
  useEffect(() => {
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    schedule();
    // Streamed route content can land a moment after navigation.
    const settle = window.setTimeout(schedule, 400);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [pathname, measure]);

  // Close the mobile menu on route change and on Escape. Also count the page
  // visit, so Close buttons know whether there is a page to go back to.
  useEffect(() => {
    setIsMobileMenuOpen(false);
    markPageVisit(pathname);
  }, [pathname]);

  // While the mobile menu is open: Escape or a tap outside the header closes it,
  // and the page behind can't scroll.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    document.body.classList.add('mobile-menu-open');
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen]);

  const onLight = surface === 'light';
  // No background while scrolling; only behind the open mobile menu.
  const hasBackdrop = isMobileMenuOpen;

  return (
    <header
      ref={headerRef}
      style={{ top: 2 }}
      className={cn(
        'fixed inset-x-0 z-[70] font-sans transition-[background-color,color] duration-300',
        onLight ? 'text-black' : 'text-ice',
        hasBackdrop && (onLight ? 'bg-ice/70 backdrop-blur-md' : 'bg-ink/50 backdrop-blur-md')
      )}
    >
      {/*
        Side padding lines up with the hero WEBLOOP wordmark, which is
        calc(100vw - 48px) wide and centred (its PNG has no transparent edge).
        100vw includes a classic scrollbar, so the (100% - 100vw) / 2 term
        cancels it and the edges match with or without one.
      */}
      <div
        className="relative mx-auto flex h-16 items-center justify-between"
        style={{ paddingInline: 'calc((100% - 100vw) / 2 + 24px)' }}
      >
        <div className="flex items-center">
          <Link
            href="/"
            aria-label="Webloop Studio home"
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
          >
            <span aria-hidden="true" className="block h-[17px] w-[101px] bg-current" style={logoMaskStyle} />
          </Link>

          {/* Sits left of true centre, nudged toward the logo; never closer than 170px so it clears the logo at 768–900px. */}
          <nav
            aria-label="Primary"
            className="absolute top-1/2 hidden -translate-y-1/2 items-center gap-4 md:flex"
            style={{ left: 'max(20%, 170px)' }}
          >
            {desktopItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  // About opens as an overlay over this page, so keep the scroll position.
                  scroll={item.href === '/about' ? false : undefined}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'rounded-sm text-[16px] font-semibold tracking-[-0.02em] transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current',
                    isActive && 'underline underline-offset-[6px]'
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Pages with their own Close button show it in this spot instead of the CTA. The menu toggle always stays. */}
          {!showsCloseButton(pathname) && (
          <Link
            href="/contact"
            className={cn(
              'hidden h-8 items-center gap-2.5 rounded-[3px] pl-3 pr-[5px] text-[14px] font-semibold tracking-[-0.01em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 sm:inline-flex',
              onLight ? 'bg-black text-white hover:bg-black/85' : 'bg-ice text-black hover:bg-ice/85'
            )}
          >
            Start a project
            <span
              className={cn(
                'flex h-[22px] w-[22px] items-center justify-center rounded-[2px] transition-colors duration-300',
                onLight ? 'bg-white text-black' : 'bg-black text-white'
              )}
            >
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </Link>
          )}

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="-mr-2 rounded-sm p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current md:hidden"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        // Scrolls on its own when taller than the screen (landscape phones).
        <div
          id="mobile-nav"
          className="mx-4 mb-4 flex max-h-[calc(100svh-80px)] flex-col gap-4 overflow-y-auto overscroll-contain rounded-[4px] bg-ink p-5 text-ice shadow-2xl shadow-black/40 md:hidden [@media(max-height:500px)]:gap-3 [@media(max-height:500px)]:p-4"
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                // About opens as an overlay over this page, so keep the scroll position.
                scroll={item.href === '/about' ? false : undefined}
                aria-current={pathname === item.href ? 'page' : undefined}
                className={cn(
                  'border-b border-white/10 py-3 font-display text-[22px] font-bold tracking-[-0.04em] transition-colors last:border-b-0 hover:text-sky [@media(max-height:500px)]:py-2 [@media(max-height:500px)]:text-[18px]',
                  pathname === item.href && 'text-sky'
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className={buttonClasses({ variant: 'ice', className: 'w-full bg-ice text-black hover:bg-ice/85' })}>
            Start a project
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      )}
    </header>
  );
}
