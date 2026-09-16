import { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import { AboutOverlay } from '@/components/sections/about-overlay';
import HomePage from '../page';

export const metadata: Metadata = constructMetadata({
  title: 'About Our Studio',
  description:
    'Learn about Webloop Studio, our values, our engineering philosophy, and the elite team building high-performance digital products.',
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
