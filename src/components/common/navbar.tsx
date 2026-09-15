'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { mainNavItems } from '@/config/navigation';
import { buttonClasses } from '@/components/ui/button';
import { Menu, X, ArrowRight, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const desktopItems = mainNavItems.filter((item) => item.href !== '/contact');

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu on route change and on Escape.
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed left-0 right-0 top-[18px] z-[70] font-sans font-semibold">
      <div className="mx-auto max-w-[600px] px-4 sm:px-0">
        <div className="flex h-[42px] items-center justify-between rounded-[5px] bg-navy px-[17px] text-ice">
          <Link href="/" className="flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice" aria-label="Webloop Studio home">
            <Image src="/Logo.png" alt="WEBLOOP" width={304} height={51} className="h-auto w-[72px]" priority />
          </Link>

          <nav className="hidden items-center gap-[22px] md:flex" aria-label="Primary">
            {desktopItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'rounded-sm text-[10px] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice',
                    isActive ? 'underline underline-offset-4' : ''
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden h-[27px] items-center gap-2 rounded-[3px] bg-ice pl-[11px] pr-[7px] text-[10px] text-navy transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice sm:inline-flex"
            >
              Start A Project
              <span className="flex h-[19px] w-[19px] items-center justify-center rounded-[2px] bg-navy text-ice">
                <ChevronRight className="h-3 w-3" aria-hidden="true" />
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="-mr-2 rounded-sm p-2 text-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice md:hidden"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div id="mobile-nav" className="mt-3 flex flex-col gap-4 rounded-[5px] bg-navy p-5 text-ice shadow-2xl shadow-navy/30 md:hidden">
            <nav className="flex flex-col" aria-label="Mobile">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={cn(
                    'border-b border-white/10 py-3 font-display text-[22px] font-bold tracking-[-0.04em] transition-colors last:border-b-0 hover:text-sky',
                    pathname === item.href && 'text-sky'
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
            <Link href="/contact" className={buttonClasses({ variant: 'ice', className: 'w-full' })}>
              Start a Project
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
