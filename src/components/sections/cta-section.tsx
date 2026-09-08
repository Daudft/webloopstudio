'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/fade-in';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="relative rounded-3xl p-10 sm:p-16 md:p-20 overflow-hidden border border-purple-500/30 bg-gradient-to-br from-purple-950/40 via-background to-background text-center">
          {/* Ambient Glows */}
          <div className="glow-ambient w-[500px] h-[500px] bg-purple-600/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="glow-ambient w-72 h-72 bg-cyan-500/15 -bottom-20 -right-20" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Let's Build Something Iconic</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
                Ready to elevate your digital presence?
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-base sm:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Whether you’re launching a venture-backed SaaS or scaling an enterprise platform, we have the engineering firepower to deliver.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link href="/contact">
                  <Button variant="glow" size="lg" className="rounded-full gap-2.5 px-8 text-base font-semibold">
                    Schedule a Discovery Call
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg" className="rounded-full px-8 text-base">
                    View Pricing & Plans
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
