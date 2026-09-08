import { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import { PortfolioGrid } from '@/components/sections/portfolio-grid';
import { TestimonialsSection } from '@/components/sections/testimonials-slider';
import { CTASection } from '@/components/sections/cta-section';
import { FadeIn } from '@/components/animations/fade-in';

export const metadata: Metadata = constructMetadata({
  title: 'Our Work & Case Studies',
  description:
    'Explore production web applications, AI tools, and digital design systems engineered by Webloop Studio.',
});

export default function WorkPage() {
  return (
    <div className="pt-32 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
              Proven Track Record
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              Selected client case studies & digital creations.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Real metrics, scalable architectures, and award-winning designs that powered millions in client revenue.
            </p>
          </FadeIn>
        </div>
      </div>

      <PortfolioGrid />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
