import { Metadata } from 'next';
import Image from 'next/image';
import { constructMetadata } from '@/lib/metadata';
import { teamData } from '@/data/faqs';
import { CTASection } from '@/components/sections/cta-section';
import { FadeIn, FadeInStagger } from '@/components/animations/fade-in';
import { Sparkles, Target, Zap, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'About Our Studio',
  description:
    'Learn about Webloop Studio, our values, our engineering philosophy, and the elite team building high-performance digital products.',
});

const values = [
  {
    icon: <Zap className="h-6 w-6 text-purple-400" />,
    title: 'Speed as a Feature',
    description: 'We treat millisecond latency, render performance, and development velocity as primary deliverables.',
  },
  {
    icon: <Target className="h-6 w-6 text-cyan-400" />,
    title: 'Conversion-Driven Engineering',
    description: 'Beautiful aesthetics mean nothing without ROI. Every system we ship is tuned for business impact.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
    title: 'Zero Technical Debt',
    description: 'We write strict, self-documenting TypeScript with automated tests and battle-tested cloud patterns.',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-20">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
              Our Story & Philosophy
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              We engineer digital excellence for high-growth companies.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded on the belief that modern software should be blazing fast, visually unforgettable, and architected to scale effortlessly.
            </p>
          </FadeIn>
        </div>

        {/* Values Grid */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Core Principles</h2>
          </div>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="glass-panel p-8 rounded-3xl border border-white/5 space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            ))}
          </FadeInStagger>
        </div>

        {/* Team Section */}
        <div className="mb-24">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">The Leadership Team</h2>
            <p className="text-muted-foreground text-sm">Passionate technologists obsessed with craft.</p>
          </div>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamData.map((member) => (
              <div key={member.id} className="glass-panel p-6 rounded-3xl border border-white/10 text-center space-y-4">
                <div className="relative h-28 w-28 rounded-full overflow-hidden mx-auto border-2 border-purple-500/30">
                  <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-xs font-semibold text-purple-400">{member.role}</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </div>

      <CTASection />
    </div>
  );
}
