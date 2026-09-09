'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projectsData } from '@/data/projects';
import { FadeIn, FadeInStagger } from '@/components/animations/fade-in';
import { ArrowUpRight } from 'lucide-react';

export function PortfolioGrid() {
  const filteredProjects = projectsData;

  return (
    <section className="bg-[#eaf2ff] py-32 text-[#0b234e] sm:py-40" id="work">
      <div className="mx-auto max-w-[1500px] px-7 sm:px-12 lg:px-16">
        {/* Header */}
        <div className="mb-16 sm:mb-24">
          <FadeIn>
            <p className="font-sora text-[13px] font-medium uppercase leading-[1.35] tracking-[0.28em] text-[#0b234e]/90">
              Success Stories
            </p>
          </FadeIn>
        </div>

        <FadeInStagger className="flex flex-col border-t border-[#0b234e]/20 pt-8">
          {filteredProjects.map((project, index) => (
            <React.Fragment key={project.id}>
              <Link
                href={`/work#${project.slug}`}
                className="group grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.9fr)] lg:gap-10"
              >
                <div>
                  <div className="relative aspect-[1.4] overflow-hidden bg-[#d5deeb] sm:aspect-[1.55]">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 68vw"
                    />
                  </div>
                </div>
                <div className="flex flex-col pt-0 lg:pt-1">
                  <div className="flex items-center gap-3 font-montserrat text-[11px] font-semibold">
                    <span>SS</span>
                    <span className="border border-[#0b234e] px-1">{String(index + 1).padStart(2, '0')}/{String(filteredProjects.length).padStart(2, '0')}</span>
                  </div>
                  <h2 className="mt-5 max-w-[400px] font-sora text-[28px] font-bold leading-[1.06] tracking-[-0.06em] sm:text-[34px]">
                    {project.title.split(' — ')[0]}
                  </h2>
                  <p className="mt-5 max-w-[440px] font-montserrat text-[15px] font-medium leading-[1.45] text-[#52627a]">
                    {project.summary}
                  </p>
                  <div className="mt-8">
                    <p className="inline-block bg-[#d8d8d3] px-2 py-1 font-sora text-[24px] font-bold leading-none tracking-[-0.06em]">
                      {project.metrics[0]?.value}
                    </p>
                    <p className="mt-2 max-w-[260px] font-montserrat text-[15px] font-semibold leading-[1.35]">
                      {project.metrics[0]?.label}
                    </p>
                  </div>
                </div>
              </Link>
              {index < filteredProjects.length - 1 && (
                <div className="flex justify-center py-4 sm:py-6">
                  <span className="h-px w-full bg-[#0b234e]/20" />
                </div>
              )}
            </React.Fragment>
          ))}
        </FadeInStagger>

        <div className="mt-20 flex justify-end border-t border-[#0b234e]/20 pt-8">
          <Link
            href="/work"
            aria-label="See all projects"
            title="See all projects"
            className="group inline-flex items-center gap-2 font-sora text-2xl font-bold leading-none tracking-[-0.06em] transition-opacity hover:opacity-60 sm:text-3xl lg:text-4xl"
          >
            <span>View all</span>
            <ArrowUpRight className="h-6 w-6 stroke-[1.5] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
          </Link>
        </div>
      </div>
    </section>
  );
}
