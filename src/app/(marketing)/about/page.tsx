import { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import { AboutOverlay } from '@/components/sections/about-overlay';
import HomePage from '../page';

export const metadata: Metadata = constructMetadata({
  title: 'About',
  description:
    'Webloop Studio is a founder-led digital studio run by Daud Afzal. Read why we started, how we work, and the principles behind every website, app and product we build.',
  path: '/about',
});

/**
 * Direct visit to /about (refresh or shared link). The homepage renders
 * underneath so the blurred backdrop is never an empty screen. Clicking an
 * About link instead opens app/@modal/(.)about over the current page.
 */
export default function AboutPage() {
  return (
    <>
      <HomePage />
      <AboutOverlay mode="page" />
    </>
  );
}
