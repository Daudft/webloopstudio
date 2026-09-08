import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/metadata';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FAQSection } from '@/components/sections/faq-accordion';
import { CTASection } from '@/components/sections/cta-section';
import { FadeIn, FadeInStagger } from '@/components/animations/fade-in';
import { Check, Sparkles } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Pricing & Engagement Models',
  description:
    'Transparent, high-value pricing tiers for web application development, MVP sprints, and dedicated studio retainers.',
});

const tiers = [
  {
    name: 'Sprint MVP',
    badge: 'Fast-Track Launch',
    price: '$4,900',
    description: 'Perfect for startups and founders needing a high-speed, production-ready MVP to validate their market.',
    timeline: '2–3 weeks delivery',
    deliverables: [
      'Next.js 14/15 Responsive Web Application',
      'Modern Tailwind CSS UI & Dark Theme',
      'Authentication & Database Setup (Supabase / Postgres)',
      'Stripe / LemonSqueezy Checkout Integration',
      'SEO & Google Analytics Setup',
      '14 Days Post-Launch Bug Warranty',
    ],
    cta: 'Start MVP Sprint',
    popular: false,
  },
  {
    name: 'Full Product Build',
    badge: 'Most Popular',
    price: '$12,500',
    description: 'Comprehensive design and end-to-end engineering for scaling businesses ready to dominate their category.',
    timeline: '4–6 weeks delivery',
    deliverables: [
      'Everything in Sprint MVP, plus:',
      'Custom Figma Design System & Brand Guidelines',
      'Complex Dynamic State & API Integrations',
      'Custom AI Workflows or Vector Search Integration',
      'Automated CI/CD Deployment Pipeline',
      'WCAG AA Accessibility & Performance 95+ Audit',
      '30 Days Dedicated Support & Maintenance',
    ],
    cta: 'Build Full Product',
    popular: true,
  },
  {
    name: 'Studio Retainer',
    badge: 'Enterprise & Scale',
    price: '$6,500',
    frequency: '/month',
    description: 'A dedicated team of senior designers and full-stack engineers embedded directly into your product cycle.',
    timeline: 'Continuous delivery',
    deliverables: [
      'Dedicated Senior Full-Stack Engineer + UI/UX Designer',
      'Unlimited Feature Requests & Fast Turnaround',
      'Weekly Strategy & Sprint Planning Calls',
      'Direct Private Slack / Discord Channel Access',
      'Infrastructure Scaling & 24/7 Uptime Monitoring',
      'Pause or Cancel Anytime',
    ],
    cta: 'Subscribe to Retainer',
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="pt-32 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-20">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
              Clear & Transparent Investment
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              Predictable pricing. Exceptional ROI.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              No hidden fees, no junior developer handoffs. Choose a model that fits your growth timeline.
            </p>
          </FadeIn>
        </div>

        {/* Pricing Tiers Grid */}
        <FadeInStagger className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all ${
                tier.popular
                  ? 'glass-panel border-2 border-purple-500 shadow-2xl shadow-purple-500/20 scale-[1.02]'
                  : 'glass-panel border border-white/10'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="h-3.5 w-3.5" />
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                  <Badge variant={tier.popular ? 'glow' : 'outline'}>{tier.badge}</Badge>
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl sm:text-5xl font-black text-white">{tier.price}</span>
                  {tier.frequency && (
                    <span className="text-muted-foreground text-sm font-semibold">{tier.frequency}</span>
                  )}
                </div>
                <div className="text-xs text-purple-400 font-semibold mb-6">{tier.timeline}</div>

                <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                  {tier.description}
                </p>

                <div className="space-y-3 pt-6 border-t border-white/5 mb-8">
                  <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                    Included Deliverables:
                  </div>
                  {tier.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <Check className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/contact" className="w-full">
                <Button
                  variant={tier.popular ? 'glow' : 'outline'}
                  size="lg"
                  className="w-full rounded-xl"
                >
                  {tier.cta}
                </Button>
              </Link>
            </div>
          ))}
        </FadeInStagger>
      </div>

      <FAQSection />
      <CTASection />
    </div>
  );
}
