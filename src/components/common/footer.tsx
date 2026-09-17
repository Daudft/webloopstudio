'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { mainNavItems } from '@/config/navigation';
import { FadeIn } from '@/components/animations/fade-in';

const pad = (value: number) => String(value).padStart(2, '0');

/** Routes that render without the footer (the contact page is a focused, form-only page). */
const HIDDEN_ON = ['/contact'];

/**
 * Site footer, in the same editorial grid as the homepage sections (dot label
 * column + content), ending with the WEBLOOP wordmark at the same width as the
 * hero's so the page opens and closes on it.
 */
export function Footer() {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;

  const socials = [
    { title: 'LinkedIn', href: siteConfig.links.linkedin },
    { title: 'Instagram', href: siteConfig.links.instagram },
  ].filter((social) => Boolean(social.href));

  return (
    <footer className="overflow-hidden bg-ink bg-grain text-white">
      <div className="mx-auto max-w-[1600px] px-5 pt-16 sm:px-6 sm:pt-24 lg:pt-32">
        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-0">
          {/* Label */}
          <FadeIn>
            <p className="flex items-center gap-3 font-montserrat text-[15px] font-semibold tracking-[-0.02em] text-white">
              <span className="h-2.5 w-2.5 rounded-full bg-white/45" aria-hidden="true" />
              Navigation
            </p>
          </FadeIn>

          <div className="grid gap-16 md:grid-cols-[minmax(0,1fr)_minmax(240px,360px)] md:gap-10">
            {/* Links */}
            <nav aria-label="Footer">
              {mainNavItems.map((item, index) => (
                <FadeIn key={item.href} delay={index * 0.05}>
                  <Link
                    href={item.href}
                    // About opens as an overlay over this page, so keep the scroll position.
                    scroll={item.href === '/about' ? false : undefined}
                    className="group flex items-start gap-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-4 focus-visible:ring-offset-ink sm:gap-6"
                  >
                    <span className="mt-2 border border-white/50 px-[3px] py-[2px] font-montserrat text-[10px] font-semibold leading-none text-white/70 sm:mt-3 sm:text-[9px]">
                      {pad(index + 1)}/{pad(mainNavItems.length)}
                    </span>
                    <span
                      className="flex items-center gap-3 font-sora font-semibold text-white/90 transition-[color,transform] duration-500 group-hover:translate-x-2 group-hover:text-white"
                      style={{
                        // 4.6vw keeps the hover arrow clear of the Studio column at 1024px.
                        fontSize: 'clamp(2.5rem, 4.6vw, 4.75rem)',
                        lineHeight: 1,
                        letterSpacing: '-0.06em',
                        transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
                      }}
                    >
                      {item.title}
                      <ArrowUpRight
                        className="h-7 w-7 -translate-x-2 opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-x-0 group-hover:opacity-100 sm:h-10 sm:w-10"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </FadeIn>
              ))}
            </nav>

            {/* Studio and socials */}
            <FadeIn delay={0.15} className="flex flex-col gap-12 md:pt-3">
              <div>
                <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">Studio</p>
                <p className="mt-4 max-w-[280px] font-montserrat text-[14px] font-medium leading-[1.5] text-white/70">
                  Websites, apps and custom software for growing businesses. Working worldwide, taking on selected projects.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex h-8 items-center gap-2.5 rounded-[3px] bg-ice pl-3 pr-[5px] font-sans text-[14px] font-semibold tracking-[-0.01em] text-black transition-colors duration-300 hover:bg-ice/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  Start a project
                  <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[2px] bg-black text-white">
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </Link>
              </div>

              {socials.length > 0 && (
                <div>
                  <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">Socials</p>
                  <ul className="mt-4 flex flex-col gap-2">
                    {socials.map((social) => (
                      <li key={social.title}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-1.5 font-sora text-[18px] font-semibold tracking-[-0.04em] text-white/90 transition-colors hover:text-white"
                        >
                          <span className="underline decoration-transparent underline-offset-4 transition-colors duration-300 group-hover:decoration-white">
                            {social.title}
                          </span>
                          <ArrowUpRight
                            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </FadeIn>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-3 font-montserrat text-[11px] font-medium text-white/55 sm:mt-24 sm:flex-row sm:items-center sm:justify-between lg:mt-32">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <Link href="/#top" className="w-fit text-white/80 transition-colors hover:text-white">
            Back to top ↑
          </Link>
        </div>
      </div>

      {/* Wordmark, same width as the hero's so both line up with the navbar edges. */}
      <FadeIn className="mx-auto mb-6 mt-6 w-[calc(100vw-48px)] max-w-none" direction="up">
        <Image
          src="/WEBLOOP.png"
          alt=""
          aria-hidden="true"
          width={3731}
          height={623}
          sizes="100vw"
          className="h-auto w-full opacity-90 brightness-0 invert"
        />
      </FadeIn>
    </footer>
  );
}
