import { AboutOverlay } from '@/components/sections/about-overlay';

/**
 * Clicking an About link lands here instead of the full /about page: the page
 * you were on stays mounted underneath, blurred, and closing returns to it at
 * the same scroll position. Loading /about directly still uses (marketing)/about.
 */
export default function AboutModal() {
  return <AboutOverlay mode="modal" />;
}
