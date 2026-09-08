import { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import { ServicesGrid } from '@/components/sections/services-grid';
import { ProcessTimeline } from '@/components/sections/process-timeline';
import { FAQSection } from '@/components/sections/faq-accordion';
import { CTASection } from '@/components/sections/cta-section';
import { FadeIn } from '@/components/animations/fade-in';

export const metadata: Metadata = constructMetadata({
  title: 'Services & Capabilities',
  description:
    'Full-stack Next.js web development, AI workflow automation, UI/UX design systems, and cloud infrastructure engineered for massive traffic.',
});

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
              Tailored Engineering & Design
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              Transforming ambitious ideas into market leaders.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore our full suite of technical capabilities, tailored for early-stage disruptors and scaling enterprises.
            </p>
          </FadeIn>
        </div>
      </div>

      <ServicesGrid />
      <ProcessTimeline />
      <FAQSection />
      <CTASection />
    </div>
  );
}
