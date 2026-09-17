/**
 * Analytics cookie consent, shared by the cookie banner, the GA4 loader and the
 * footer's "Cookie settings" link.
 *
 * The choice is kept in localStorage (not a cookie), so nothing is stored in a
 * cookie until the visitor accepts analytics. Changes are broadcast with a
 * window event so every part of the page updates without a reload.
 */

export type ConsentChoice = 'granted' | 'denied';

const STORAGE_KEY = 'webloop-consent';
export const CONSENT_EVENT = 'webloop:consent-change';

/** GA4 measurement ID (G-XXXXXXXXXX). Analytics and the cookie banner stay off until it is set. */
const rawId = process.env.NEXT_PUBLIC_GA_ID?.trim();
// Only accept a well-formed ID, since it is written into an inline script.
export const analyticsId = rawId && /^G-[A-Z0-9]+$/.test(rawId) ? rawId : undefined;

export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    // Storage blocked (private mode, strict settings): treat as no choice yet.
    return null;
  }
}

export function writeConsent(choice: ConsentChoice): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Ignore: the choice still applies for this page view via the event below.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
}

/** Forget the choice so the banner shows again ("Cookie settings"). */
export function resetConsent(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
}
