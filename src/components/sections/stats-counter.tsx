'use client';

import React from 'react';
import { FadeIn } from '@/components/animations/fade-in';

const stats = [
  { value: '$400M+', label: 'Client Asset Value Managed', description: 'Across production applications' },
  { value: '99.99%', label: 'Uptime Reliability Guarantee', description: 'Enterprise cloud infrastructure' },
  { value: '50K+', label: 'Daily Active End Users', description: 'Scaling without latency' },
  { value: '98%', label: 'Client Retention & Satisfaction', description: 'Long-term product partners' },
];

export function StatsSection() {
  return (
    <section className="py-12 border-y border-white/5 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.1} className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-2">
                <span className="text-gradient">{stat.value}</span>
              </div>
              <div className="text-sm font-semibold text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
