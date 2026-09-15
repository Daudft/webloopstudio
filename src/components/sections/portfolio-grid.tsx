'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { projectsData } from '@/data/projects';
import { FadeIn } from '@/components/animations/fade-in';
import { cn } from '@/lib/utils';

const pad = (value: number) => String(value).padStart(2, '0');

export function PortfolioGrid() {
  const projects = projectsData;

  return (
    <section className="bg-ice py-32 text-navy sm:py-40" id="work">
      <div className="mx-auto max-w-[1500px] px-7 sm:px-12 lg:px-16">
        {/* Header */}
        <div className="mx-auto mb-20 flex w-full max-w-[1200px] flex-col gap-6 sm:mb-28 sm:flex-row sm:items-end sm:justify-between">
          <FadeIn>
            <p className="font-sora text-[13px] font-medium uppercase leading-[1.35] tracking-[0.28em] text-navy/70">
              Success Stories
            </p>
            <h2 className="mt-4 font-sora text-[clamp(2.4rem,5vw,4.25rem)] font-bold leading-[0.95] tracking-[-0.06em]">
              Selected work <span className="align-top text-[0.35em] font-semibold tracking-normal text-navy/50">({pad(projects.length)})</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="max-w-[320px] sm:pb-2">
            <p className="font-montserrat text-[14px] font-medium leading-[1.55] text-steel">
              A few recent projects, from first conversation to launch.
            </p>
          </FadeIn>
        </div>

        {/* Projects */}
        <div className="space-y-24 sm:space-y-32 lg:space-y-40">
          {projects.map((project, index) => {
            const flipped = index % 2 === 1;

            return (
              <FadeIn key={project.id}>
                <article
                  id={project.slug}
                  className={cn(
                    'group mx-auto grid w-full max-w-[1200px] gap-8 lg:items-center lg:gap-16',
                    flipped
                      ? 'lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.1fr)]'
                      : 'lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]'
                  )}
                >
                  <div className={cn('relative aspect-[1.4] overflow-hidden bg-[#d5deeb] sm:aspect-[1.5]', flipped && 'lg:order-2')}>
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                  </div>

                  <div className={cn('flex flex-col', flipped && 'lg:order-1')}>
                    <div className="flex items-center gap-4 font-montserrat text-[11px] font-semibold uppercase tracking-[0.18em] text-navy/60">
                      <span className="text-navy">
                        {pad(index + 1)} / {pad(projects.length)}
                      </span>
                      <span className="h-px w-8 bg-navy/30" aria-hidden="true" />
                      <span>
                        {project.category} · {project.year}
                      </span>
                    </div>

                    <h3 className="mt-6 max-w-[440px] font-sora text-[30px] font-bold leading-[1.02] tracking-[-0.06em] sm:text-[38px]">
                      {project.title}
                    </h3>
                    <p className="mt-5 max-w-[440px] font-montserrat text-[15px] font-medium leading-[1.55] text-steel">
                      {project.summary}
                    </p>

                    {project.outcome && (
                      <div className="mt-8">
                        <p className="inline-block bg-navy px-2 py-1 font-sora text-[24px] font-bold leading-none tracking-[-0.06em] text-ice">
                          {project.outcome.value}
                        </p>
                        <p className="mt-2 max-w-[260px] font-montserrat text-[15px] font-semibold leading-[1.35]">
                          {project.outcome.label}
                        </p>
                      </div>
                    )}

                    <Link
                      href="/contact"
                      className="mt-10 inline-flex w-fit items-center gap-2 font-montserrat text-[14px] font-semibold underline decoration-navy/30 underline-offset-[6px] transition-colors hover:decoration-navy"
                    >
                      Start a similar project
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
