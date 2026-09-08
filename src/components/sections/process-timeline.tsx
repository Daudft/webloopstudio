'use client';

import React from 'react';
import { FadeIn, FadeInStagger } from '@/components/animations/fade-in';
import { Compass, PenTool, Terminal, Rocket } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: <Compass className="h-6 w-6 text-purple-400" />,
    title: 'Discovery & Architecture',
    description:
      'We deconstruct your requirements, map user flows, design database models, and specify the optimal tech stack for global scalability.',
  },
  {
    step: '02',
    icon: <PenTool className="h-6 w-6 text-cyan-400" />,
    title: 'High-Fidelity Design Systems',
    description:
      'We prototype pixel-perfect, responsive UI and design tokens in Figma, validating every micro-interaction and accessibility standard.',
  },
  {
    step: '03',
    icon: <Terminal className="h-6 w-6 text-indigo-400" />,
    title: 'Agile Full-Stack Engineering',
    description:
      'We code with Next.js, strict TypeScript, and edge APIs. You get continuous staging preview links and automated end-to-end testing.',
  },
  {
    step: '04',
    icon: <Rocket className="h-6 w-6 text-pink-400" />,
    title: 'Launch & Autonomous Scale',
    description:
      'Zero-downtime deployment, CDN edge caching, 24/7 telemetry monitoring, and ongoing optimization to ensure peak conversion.',
  },
];

export function ProcessTimeline() {
  return (
    <section className="py-24 relative" id="process">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
              Our Methodology
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              A transparent, battle-tested execution process.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base sm:text-lg text-muted-foreground">
              From whiteboard to production deployment, we eliminate friction and keep you in the loop every step of the journey.
            </p>
          </FadeIn>
        </div>

        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item) => (
            <div
              key={item.step}
              className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-3xl font-black text-white/20 group-hover:text-purple-400/40 transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
