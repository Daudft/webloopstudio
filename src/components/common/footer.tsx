import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { mainNavItems } from '@/config/navigation';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  const socials = [
    { title: 'LinkedIn', href: siteConfig.links.linkedin },
    { title: 'Instagram', href: siteConfig.links.instagram },
  ].filter((social) => Boolean(social.href));

  return (
    <footer className="bg-ink text-ice">
      <div className="mx-auto max-w-[1500px] px-5 pb-10 pt-24 sm:px-10 sm:pt-32 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-24">
          <div>
            <p className="mb-8 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-sky">
              Navigation
            </p>
            <nav className="max-w-[710px]" aria-label="Footer">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between border-b border-white/15 py-3 font-display text-[39px] font-bold leading-none tracking-[-0.065em] text-white transition-colors hover:text-sky sm:text-[62px]"
                >
                  {item.title}
                  <ArrowUpRight className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100 sm:h-10 sm:w-10" aria-hidden="true" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="grid content-start gap-14 sm:grid-cols-2 lg:pt-1">
            <div>
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                Studio details
              </p>
              <div className="mt-8 space-y-6 font-sans text-sm leading-relaxed text-white/65">
                <a href={`mailto:${siteConfig.contact.email}`} className="block text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-sky">
                  {siteConfig.contact.email}
                </a>
                <p>Working worldwide.</p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-white transition-colors hover:text-sky">
                  Start a project
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {socials.length > 0 && (
              <div>
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  Socials
                </p>
                <div className="mt-8 flex flex-col items-start gap-3">
                  {socials.map((social) => (
                    <a key={social.title} href={social.href} target="_blank" rel="noreferrer" className="font-display text-xl font-semibold tracking-[-0.04em] text-white transition-colors hover:text-sky">
                      {social.title} <span className="text-sm" aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-28 flex flex-col gap-6 border-t border-white/15 pt-6 font-sans text-[11px] font-medium text-white/65 sm:flex-row sm:items-end sm:justify-between">
          <p>{siteConfig.name}<br />Digital products, built to matter.</p>
          <div className="sm:text-center">
            <Link href="/#top" className="text-white hover:text-sky">Back to top ↑</Link>
            <p className="mt-1">Taking on selected projects.</p>
          </div>
          <p className="sm:text-right">© {new Date().getFullYear()} {siteConfig.name}<br />All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
