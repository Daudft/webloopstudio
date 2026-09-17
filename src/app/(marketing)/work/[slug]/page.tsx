import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { constructMetadata } from '@/lib/metadata';
import { projectsData } from '@/data/projects';
import { FadeIn } from '@/components/animations/fade-in';
import { PageCloseButton } from '@/components/common/page-close-button';

const pad = (value: number) => String(value).padStart(2, '0');

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((item) => item.slug === slug);
  if (!project) return constructMetadata({ title: 'Project not found', noIndex: true });
  return constructMetadata({ title: project.title, description: project.summary });
}

/**
 * Project preview, opened from the homepage work rows or the /work grid.
 * Only shows what the project data contains: the case-study sections
 * (challenge, solution, gallery, live link) appear once they are filled in
 * `src/data/projects.ts`; until then a "full case study coming soon" note shows.
 */
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const index = projectsData.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();

  const project = projectsData[index];
  const next = projectsData[(index + 1) % projectsData.length];
  const hasCaseStudy = Boolean(project.challenge || project.solution || project.gallery?.length);

  const facts = [
    { label: 'Category', value: project.category },
    { label: 'Year', value: project.year },
    ...(project.outcome ? [{ label: project.outcome.label, value: project.outcome.value }] : []),
  ];

  return (
    <div
      className="bg-grain pb-24 pt-[120px] text-black sm:pb-32 sm:pt-[170px] [@media(max-height:500px)]:pb-16 [@media(max-height:500px)]:pt-24"
      style={{ backgroundColor: '#e6e5e0' }}
    >
      {/* Close (or Esc) goes back to wherever the project was opened from; direct visits go to /work. */}
      <PageCloseButton href="/work" preferBack />

      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-0">
        {/* Label */}
        <div>
          <FadeIn>
            <p className="flex items-center gap-3 font-montserrat text-[15px] font-semibold tracking-[-0.02em] text-black">
              <span className="h-2.5 w-2.5 rounded-full bg-black/45" aria-hidden="true" />
              Project
            </p>
          </FadeIn>
        </div>

        <div style={{ maxWidth: 1116 }}>
          {/* Heading */}
          <FadeIn delay={0.05}>
            <div className="flex items-center gap-1.5 font-montserrat text-[9px] font-semibold uppercase leading-none tracking-[0.02em]">
              <span>SS</span>
              <span className="flex items-center" aria-hidden="true">
                <span className="text-[9px] leading-none">←</span>
                <span className="-ml-px h-px w-3 bg-black" />
              </span>
              <span className="border border-black px-[3px] py-[2px]">
                {pad(index + 1)}/{pad(projectsData.length)}
              </span>
            </div>
            <h1
              className="mt-5 max-w-[900px] font-sora font-semibold text-black"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', lineHeight: 0.95, letterSpacing: '-0.06em' }}
            >
              {project.title}
            </h1>
          </FadeIn>

          {/* Side column is 280px on small laptops and 360px from xl, so the summary keeps a readable width. */}
          <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-16">
            <FadeIn delay={0.12}>
              <p className="max-w-[560px] font-montserrat text-[17px] font-medium leading-[1.5] tracking-[-0.01em] text-black/75">
                {project.summary}
              </p>
            </FadeIn>

            <FadeIn delay={0.18}>
              <dl className="grid grid-cols-2 gap-6">
                {facts.map((fact) => (
                  <div key={fact.label} className="min-w-0 break-words">
                    <dt className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">
                      {fact.label}
                    </dt>
                    <dd
                      className="mt-2 font-sora text-[18px] font-semibold leading-[1.2] text-black"
                      style={{ letterSpacing: '-0.04em' }}
                    >
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-8 inline-flex items-center gap-1.5 font-montserrat text-[14px] font-semibold text-black underline decoration-black/30 underline-offset-4 transition-colors hover:decoration-black"
                >
                  Visit live project
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              )}
            </FadeIn>
          </div>

          {/* Main image */}
          <FadeIn delay={0.2} className="mt-14 sm:mt-20">
            <div className="relative overflow-hidden bg-black/10" style={{ aspectRatio: '16 / 9' }}>
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                priority
                sizes="(min-width: 1024px) 1116px, 100vw"
                className="object-cover"
              />
            </div>
          </FadeIn>

          {/* Case study, only when filled in */}
          {hasCaseStudy ? (
            <div className="mt-20 space-y-16 sm:mt-28">
              {[
                { heading: 'The challenge', body: project.challenge },
                { heading: 'What we built', body: project.solution },
              ]
                .filter((section) => section.body)
                .map((section) => (
                  <FadeIn key={section.heading} className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
                    <h2
                      className="font-sora text-[24px] font-semibold leading-[1.1] text-black"
                      style={{ letterSpacing: '-0.05em' }}
                    >
                      {section.heading}
                    </h2>
                    <p className="max-w-[620px] font-montserrat text-[16px] font-medium leading-[1.6] text-black/75">
                      {section.body}
                    </p>
                  </FadeIn>
                ))}

              {project.gallery && project.gallery.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.gallery.map((src, galleryIndex) => (
                    <FadeIn key={src} delay={(galleryIndex % 2) * 0.08}>
                      <div className="relative overflow-hidden bg-black/10" style={{ aspectRatio: '4 / 3' }}>
                        <Image
                          src={src}
                          alt={`${project.title}, image ${galleryIndex + 1}`}
                          fill
                          sizes="(min-width: 640px) 550px, 100vw"
                          className="object-cover"
                        />
                      </div>
                    </FadeIn>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <FadeIn className="mt-16 flex items-center gap-3 font-montserrat text-[14px] font-medium text-black/60 sm:mt-20">
              <span className="h-2 w-2 rounded-full bg-black/30" aria-hidden="true" />
              Full case study coming soon.
            </FadeIn>
          )}

          {/* Next project + CTA */}
          <div className="mt-24 grid gap-12 sm:mt-32 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-16">
            {next.slug !== project.slug && (
              <FadeIn>
                <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">Next project</p>
                <Link
                  href={`/work/${next.slug}`}
                  className="group mt-4 grid grid-cols-[100px_minmax(0,1fr)] items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-5"
                >
                  <div className="relative overflow-hidden bg-black/10" style={{ aspectRatio: '4 / 3' }}>
                    <Image
                      src={next.thumbnail}
                      alt={next.title}
                      fill
                      sizes="160px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  <div>
                    <p
                      className="font-sora text-[22px] font-semibold leading-[1.1] text-black underline decoration-transparent decoration-1 underline-offset-4 transition-colors duration-300 group-hover:decoration-black"
                      style={{ letterSpacing: '-0.05em' }}
                    >
                      {next.title}
                    </p>
                    <p className="mt-1.5 font-montserrat text-[13px] font-medium text-black/60">
                      {next.category} · {next.year}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            )}

            <FadeIn delay={0.1} className="flex flex-col items-start lg:items-end lg:justify-end">
              <p
                className="font-sora text-[26px] font-semibold leading-[1] text-black lg:text-right"
                style={{ letterSpacing: '-0.05em' }}
              >
                Want something similar?
              </p>
              <Link
                href="/contact"
                className="group mt-5 inline-flex h-11 items-center gap-3 rounded-[3px] bg-black pl-4 pr-1.5 font-montserrat text-[15px] font-semibold tracking-[-0.01em] text-white transition-colors duration-300 hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                Start a similar project
                <span className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-white text-black">
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
