'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { projectsData } from '@/data/projects';
import { FadeIn } from '@/components/animations/fade-in';
import type { Project } from '@/types/project';

const pad = (value: number) => String(value).padStart(2, '0');

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Success stories.
 *
 * Editorial three-column layout on a warm paper background: a sticky label on
 * the left, a large project image in the middle and a narrow text column on
 * the right with the index, title, summary and a highlighted fact. Stacks to
 * one column below lg.
 */
export function PortfolioGrid() {
  const projects = projectsData;

  return (
    <section className="bg-grain py-24 text-black sm:py-32" style={{ backgroundColor: '#e6e5e0' }} id="work">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-0">
        {/* Label */}
        <div>
          <FadeIn>
            <p className="flex items-center gap-3 font-montserrat text-[15px] font-semibold tracking-[-0.02em] text-black">
              <span className="h-2.5 w-2.5 rounded-full bg-black/45" aria-hidden="true" />
              Success Stories
            </p>
          </FadeIn>
        </div>

        {/* Projects */}
        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
          {projects.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} total={projects.length} />
          ))}

          {/* TODO: point this at the projects page once it exists. */}
          {/* Width matches a project row (740px image + 16px gap + 360px text), so the button ends at the text column's right edge. */}
          <FadeIn className="flex justify-end" style={{ maxWidth: 1116 }}>
            <Link
              href="#work"
              className="group/all inline-flex h-11 items-center gap-3 rounded-[3px] bg-black pl-2 pr-1.5 font-montserrat text-[14px] font-semibold tracking-[-0.01em] text-white transition-colors duration-300 hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-white/15 transition-transform duration-500 group-hover/all:rotate-90">
                <Plus className="h-4 w-4" aria-hidden="true" />
              </span>
              View All
              <span className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-white text-black">
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover/all:-translate-y-0.5 group-hover/all:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

interface ProjectRowProps {
  project: Project;
  index: number;
  total: number;
}

function ProjectRow({ project, index, total }: ProjectRowProps) {
  const reduceMotion = useReducedMotion();

  return (
    <article id={project.slug}>
      {/* The whole row (image and text) is one link. TODO: build the project detail page at this URL. */}
      <Link
        href={`/work/${project.slug}`}
        className="group grid gap-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 lg:grid-cols-[minmax(0,740px)_minmax(260px,360px)] lg:gap-4"
      >
        {/* Image */}
        <motion.div
          className="relative overflow-hidden bg-black/10"
          style={{ aspectRatio: '3 / 2' }}
          initial={reduceMotion ? false : { clipPath: 'inset(0% 0% 100% 0%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <motion.div
            className="absolute inset-0"
            initial={reduceMotion ? false : { scale: 1.2 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.5, ease: EASE }}
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 740px, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </motion.div>
        </motion.div>

      {/* Text */}
      <FadeIn delay={0.15} className="flex flex-col text-black">
        <div className="flex items-center gap-1.5 font-montserrat text-[9px] font-semibold uppercase leading-none tracking-[0.02em]">
          <span>SS</span>
          <span className="flex items-center" aria-hidden="true">
            <span className="text-[9px] leading-none">←</span>
            <span className="-ml-px h-px w-3 bg-black" />
          </span>
          <span className="border border-black px-[3px] py-[2px]">
            {pad(index + 1)}/{pad(total)}
          </span>
        </div>

        <h3
          className="mt-4 font-sora text-[19px] font-semibold leading-[1.15] text-black underline decoration-transparent decoration-1 underline-offset-4 transition-colors duration-300 group-hover:decoration-black"
          style={{ letterSpacing: '-0.04em' }}
        >
          {project.title}
        </h3>
        <p className="mt-3 max-w-[340px] font-montserrat text-[14px] font-medium leading-[1.35] tracking-[-0.01em] text-black/70">
          {project.summary}
        </p>

        {/* TODO(content): add a real, verifiable `outcome` to the project to replace the category/year fact. */}
        <div className="mt-10 sm:mt-14">
          <p
            className="inline-block px-1.5 py-1 font-sora text-[18px] font-semibold leading-none text-black"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.08)', letterSpacing: '-0.04em' }}
          >
            {project.outcome ? project.outcome.value : project.year}
          </p>
          <p
            className="mt-2 max-w-[260px] font-sora text-[18px] font-medium leading-[1.3] text-black"
            style={{ letterSpacing: '-0.04em' }}
          >
            {project.outcome ? project.outcome.label : project.category}
          </p>
        </div>
      </FadeIn>
      </Link>
    </article>
  );
}
