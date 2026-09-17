'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { analyticsId, CONSENT_EVENT, readConsent, writeConsent } from '@/lib/consent';

/**
 * GDPR-friendly cookie banner for Google Analytics.
 *
 * - Only rendered when a GA4 ID is configured (no analytics, no banner).
 * - Analytics stays off until the visitor presses Accept; Reject is as easy as Accept.
 * - The choice can be changed at any time from "Cookie settings" in the footer.
 */
export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!analyticsId) return;
    const sync = () => setOpen(readConsent() === null);
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  // Lets the mobile sticky CTA step aside while the banner is showing.
  useEffect(() => {
    document.body.classList.toggle('cookie-banner-open', open);
    return () => document.body.classList.remove('cookie-banner-open');
  }, [open]);

  if (!analyticsId || !open) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      data-nav-ignore=""
      className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[65] mx-auto max-w-[440px] rounded-[6px] bg-ink p-5 text-white shadow-2xl shadow-black/40 ring-1 ring-white/10 sm:left-auto sm:right-6 sm:mx-0"
    >
      <p className="font-sora text-[16px] font-semibold tracking-[-0.03em]">Cookies</p>
      <p className="mt-2 font-montserrat text-[13px] font-medium leading-[1.5] text-white/70">
        We&apos;d like to use Google Analytics cookies to understand how visitors use the site. They&apos;re only set if you
        accept.{' '}
        <Link href="/privacy" className="text-white underline decoration-white/35 underline-offset-4 hover:decoration-white">
          Privacy policy
        </Link>
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => writeConsent('granted')}
          className="inline-flex h-9 flex-1 items-center justify-center rounded-[3px] bg-ice px-4 font-sans text-[14px] font-semibold text-black transition-colors hover:bg-ice/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => writeConsent('denied')}
          className="inline-flex h-9 flex-1 items-center justify-center rounded-[3px] px-4 font-sans text-[14px] font-semibold text-white ring-1 ring-white/30 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
