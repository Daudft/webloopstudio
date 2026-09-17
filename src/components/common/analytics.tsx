'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { analyticsId, CONSENT_EVENT, readConsent, type ConsentChoice } from '@/lib/consent';

/** Remove GA's first-party cookies (_ga, _ga_XXXX) after consent is withdrawn. */
function clearAnalyticsCookies() {
  const domains = [window.location.hostname, `.${window.location.hostname.replace(/^www\./, '')}`];
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    if (!name.startsWith('_ga')) return;
    domains.forEach((domain) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
    });
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });
}

/**
 * Google Analytics 4, loaded only after the visitor accepts cookies.
 *
 * Client-side page changes are tracked by GA4's enhanced measurement ("page changes based on
 * browser history events", on by default), so no manual page_view calls are needed.
 */
export function Analytics() {
  const [consent, setConsent] = useState<ConsentChoice | null>(null);

  useEffect(() => {
    if (!analyticsId) return;
    const sync = () => setConsent(readConsent());
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  // GA's official opt-out switch: if consent is withdrawn after the script loaded, stop sending data.
  useEffect(() => {
    if (!analyticsId) return;
    const disabled = consent !== 'granted';
    (window as unknown as Record<string, boolean>)[`ga-disable-${analyticsId}`] = disabled;
    if (consent === 'denied') clearAnalyticsCookies();
  }, [consent]);

  if (!analyticsId || consent !== 'granted') return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${analyticsId}');`}
      </Script>
    </>
  );
}
