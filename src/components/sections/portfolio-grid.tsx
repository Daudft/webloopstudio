'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projectsData } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, FadeInStagger } from '@/components/animations/fade-in';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const categories = ['All', 'Web Development', 'AI & Automation', 'UI/UX Design', 'Mobile Apps'] as const;

export function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProjects =
    activeCategory === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section className="py-24 bg-secondary/20 relative" id="work">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <FadeIn>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
                Featured Work
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Crafted for impact & measurable results.
              </h2>
            </FadeIn>
          </div>

          {/* Category Filter Tabs */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap gap-2 p-1.5 glass-panel rounded-full border border-white/10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25'
                      : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Project Cards Grid */}
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/work#${project.slug}`}
              className="group block rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-purple-500/40 transition-all duration-300"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                <div className="absolute top-4 left-4">
                  <Badge variant="glow">{project.category}</Badge>
                </div>

                <div className="absolute top-4 right-4 h-10 w-10 rounded-full glass-panel flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                    {project.client}
                  </span>
                  <span className="text-xs text-muted-foreground">{project.year}</span>
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.summary}
                </p>

                {/* Key Metrics */}
                <div className="pt-4 border-t border-white/5 grid grid-cols-3 gap-4">
                  {project.metrics.map((m, idx) => (
                    <div key={idx}>
                      <div className="text-base font-bold text-white">{m.value}</div>
                      <div className="text-[11px] text-muted-foreground">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </FadeInStagger>

        {/* View All CTA */}
        <div className="mt-16 text-center">
          <Link href="/work">
            <Button variant="outline" size="lg" className="rounded-full">
              View All Case Studies & Results
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
