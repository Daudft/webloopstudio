import { HeroSection } from '@/components/sections/hero-section';
import { IntroSection } from '@/components/sections/intro-section';
import { PortfolioGrid } from '@/components/sections/portfolio-grid';
import { ServicesGrid } from '@/components/sections/services-grid';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <PortfolioGrid />
      <ServicesGrid />
    </>
  );
}
