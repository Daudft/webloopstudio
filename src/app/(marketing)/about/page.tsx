import { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import { AboutOverlay } from '@/components/sections/about-overlay';

export const metadata: Metadata = constructMetadata({
  title: 'About Our Studio',
  description:
    'Learn about Webloop Studio, our values, our engineering philosophy, and the elite team building high-performance digital products.',
});

export default function AboutPage() {
  return <AboutOverlay />;
}
