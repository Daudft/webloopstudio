import { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import { HeroSection } from '@/components/sections/hero-section';
import { IntroSection } from '@/components/sections/intro-section';
import { PortfolioGrid } from '@/components/sections/portfolio-grid';
import { ServicesGrid } from '@/components/sections/services-grid';
import { ProcessTimeline } from '@/components/sections/process-timeline';
import { LandingFAQSection } from '@/components/sections/landing-faq-section';
import { ImageCTASection } from '@/components/sections/image-cta-section';

// No title: the root layout's default "Webloop Studio — <tagline>" is the homepage title.
export const metadata: Metadata = constructMetadata({
  description:
    'Webloop Studio designs and builds websites, web apps, mobile apps and custom software for small businesses and startups whose growth has outpaced their digital presence.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <PortfolioGrid />
      <ServicesGrid />
      <ProcessTimeline />
      <LandingFAQSection />
      <ImageCTASection />
    </>
  );
}
