import { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import { ProcessTimeline } from '@/components/sections/process-timeline';
import { CTASection } from '@/components/sections/cta-section';
import { FadeIn, FadeInStagger } from '@/components/animations/fade-in';
import { ArrowDownRight, Check } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Our Process',
  description:
    'A clear, collaborative process for turning ambitious ideas into high-performance digital products.',
});

const workingPrinciples = [
  'Senior people stay close to the work from kickoff to launch.',
  'Every milestone ends with something tangible to review.',
  'Design decisions stay connected to business outcomes.',
  'The system is built to evolve after the first release.',
];

export default function ProcessPage() {
  return (
    <div className="overflow-hidden pt-32">
      <section className="relative pb-24 sm:pb-32">
        <div className="pointer-events-none absolute -right-40 top-[-8rem] h-[520px] w-[520px] rounded-full bg-purple-600/10 blur-3xl" />
        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-24">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-purple-400">
                How we make it real
              </p>
              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
                A better process makes better products.
              </h1>
            </FadeIn>

            <FadeIn delay={0.15} className="max-w-md lg:pb-2">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Clear thinking, visible progress, and the right level of momentum. We make complex digital work feel focused from the first conversation.
              </p>
              <a
                href="#process"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-purple-300"
              >
                See the four stages
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-1 group-hover:translate-x-1" />
              </a>
            </FadeIn>
          </div>

          <div className="mt-20 grid border-y border-white/10 py-5 sm:grid-cols-3 sm:py-7">
            <div className="border-white/10 pb-5 sm:border-r sm:pb-0 sm:pr-8">
              <p className="text-3xl font-black tracking-tight text-white">01</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Shared direction</p>
            </div>
            <div className="border-white/10 py-5 sm:border-r sm:px-8 sm:py-0">
              <p className="text-3xl font-black tracking-tight text-white">04</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Focused stages</p>
            </div>
            <div className="pt-5 sm:pl-8 sm:pt-0">
              <p className="text-3xl font-black tracking-tight text-white">∞</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Room to grow</p>
            </div>
          </div>
        </div>
      </section>

      <ProcessTimeline />

      <section className="relative border-y border-white/5 bg-secondary/20 py-24 sm:py-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-purple-400">
                The working agreement
              </p>
              <h2 className="mt-5 max-w-sm text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                No black boxes. No mystery handoffs.
              </h2>
            </FadeIn>

            <FadeInStagger className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {workingPrinciples.map((principle, index) => (
                <div key={principle} className="border-t border-white/15 pt-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-purple-400/40 text-purple-300">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/40">0{index + 1}</p>
                      <p className="text-base leading-relaxed text-zinc-200">{principle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </FadeInStagger>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
