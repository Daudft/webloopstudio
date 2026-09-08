import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { footerNavItems } from '@/config/navigation';
import { Sparkles, Twitter, Github, Linkedin, Instagram, Dribbble, ArrowUpRight, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background relative overflow-hidden">
      {/* Subtle Glow in Footer */}
      <div className="glow-ambient w-96 h-96 bg-purple-600/10 top-0 right-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 p-0.5 shadow-lg shadow-purple-500/20">
                <div className="h-full w-full bg-background rounded-[10px] flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              We design, build, and scale world-class web applications, AI platforms, and digital brand identities that turn vision into hyper-growth.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg glass-panel flex items-center justify-center text-muted-foreground hover:text-white hover:border-purple-500/40 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg glass-panel flex items-center justify-center text-muted-foreground hover:text-white hover:border-purple-500/40 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg glass-panel flex items-center justify-center text-muted-foreground hover:text-white hover:border-purple-500/40 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg glass-panel flex items-center justify-center text-muted-foreground hover:text-white hover:border-purple-500/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {footerNavItems.services.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-purple-300 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerNavItems.company.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-purple-300 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <span className="block text-xs uppercase text-zinc-500 font-semibold mb-0.5">Email</span>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-white hover:text-purple-300 transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p>
                <span className="block text-xs uppercase text-zinc-500 font-semibold mb-0.5">Location</span>
                <span>{siteConfig.contact.city}</span>
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300"
                >
                  Book Discovery Call
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
