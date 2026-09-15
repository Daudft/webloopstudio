import { SiteLoader } from '@/components/common/site-loader';
import { HeroSection } from '@/components/sections/hero-section';
import { IntroSection } from '@/components/sections/intro-section';
import { PortfolioGrid } from '@/components/sections/portfolio-grid';
import { ServicesGrid } from '@/components/sections/services-grid';
import { ProcessTimeline } from '@/components/sections/process-timeline';
import { LandingFAQSection } from '@/components/sections/landing-faq-section';
import { ImageCTASection } from '@/components/sections/image-cta-section';

export default function HomePage() {
  return (
    <>
      <SiteLoader />
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
