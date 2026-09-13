'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNavItems } from '@/config/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowRight, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navOrder = ['About', 'Work', 'Services', 'Process'];

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleSectionNavigation = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('/#')) return;

    event.preventDefault();
    const sectionId = href.slice(2);

    if (pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href);
      return;
    }

    window.location.href = href;
  };

  return (
    <header className="fixed left-0 right-0 top-[18px] z-[70]">
      <div className="mx-auto max-w-[600px] px-4 sm:px-0">
        <div style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600 }} className="font-montserrat flex h-[42px] items-center justify-between rounded-[5px] bg-[#0b234e] px-[17px] text-[#eaf2ff]">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center focus:outline-none"
          >
            <img src="/Logo.png" alt="WEBLOOP" className="h-auto w-[72px]" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="font-montserrat hidden items-center gap-[22px] md:flex">
            {navOrder.map((title) => {
              const item = mainNavItems.find((navItem) => navItem.title === title) ?? {
                title,
                href: '#process',
              };
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleSectionNavigation(event, item.href)}
                  className={cn(
                    'text-[10px] font-semibold',
                    isActive
                      ? 'text-white bg-white/10 font-semibold'
                      : 'text-[#eaf2ff]'
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden sm:inline-flex">
              <span className="font-montserrat inline-flex h-[27px] items-center gap-2 rounded-[3px] bg-[#eaf2ff] px-[7px] pl-[11px] text-[10px] font-semibold text-[#0b234e]">
                Start A Project
                <span className="font-montserrat flex h-[19px] w-[19px] items-center justify-center rounded-[2px] bg-[#0b234e] text-[#eaf2ff]">
                  <ChevronRight className="h-3 w-3" />
                </span>
              </span>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl glass-panel text-muted-foreground hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 rounded-2xl glass-panel border border-white/10 p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col gap-2">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleSectionNavigation(event, item.href)}
                  className={cn(
                    'px-4 py-3 rounded-xl text-base font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-purple-600/20 text-purple-300 font-semibold'
                      : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
            <div className="pt-2 border-t border-white/10">
              <Link href="/contact" className="w-full">
                <Button variant="glow" className="w-full justify-center">
                  Start a Project
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
