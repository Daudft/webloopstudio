'use client';

import React from 'react';
import Link from 'next/link';
import { servicesData } from '@/data/services';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FadeIn, FadeInStagger } from '@/components/animations/fade-in';
import { Code2, Layout, Sparkles, Smartphone, Cloud, Palette, ArrowRight, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="h-6 w-6 text-purple-400" />,
  Layout: <Layout className="h-6 w-6 text-cyan-400" />,
  Sparkles: <Sparkles className="h-6 w-6 text-indigo-400" />,
  Smartphone: <Smartphone className="h-6 w-6 text-pink-400" />,
  Cloud: <Cloud className="h-6 w-6 text-emerald-400" />,
  Palette: <Palette className="h-6 w-6 text-amber-400" />,
};

export function ServicesGrid() {
  return (
    <section className="py-24 relative" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-4">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
              Core Capabilities
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Engineered for speed, built for conversion.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base sm:text-lg text-muted-foreground">
              We offer full-cycle engineering and product design capabilities to help you scale fast without technical debt.
            </p>
          </FadeIn>
        </div>

        {/* Services Cards */}
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service) => (
            <Card
              key={service.id}
              glass
              className="glass-panel-hover group flex flex-col justify-between p-2 rounded-2xl relative overflow-hidden"
            >
              <div>
                <CardHeader className="space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-purple-500/50 transition-all">
                    {iconMap[service.iconName] || <Code2 className="h-6 w-6 text-purple-400" />}
                  </div>
                  <div>
                    <CardTitle className="text-xl group-hover:text-purple-300 transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-sm">
                      {service.shortDescription}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {service.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[11px] font-medium bg-white/5 text-zinc-400 rounded-md border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </div>

              <div className="p-6 pt-0 mt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-zinc-500 font-semibold block">Starts at</span>
                  <span className="text-sm font-bold text-white">{service.pricingStartingAt}</span>
                </div>
                <Link
                  href={`/services#${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 group-hover:text-purple-300 transition-colors"
                >
                  Learn More
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Card>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
