import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { constructMetadata } from '@/lib/metadata';
import { projectsData } from '@/data/projects';
import { FadeIn } from '@/components/animations/fade-in';
import { PageCloseButton } from '@/components/common/page-close-button';

export const metadata: Metadata = constructMetadata({
  title: 'Work',
  description:
    'Selected work by Webloop Studio: websites, web apps, mobile apps and custom software for growing businesses, from first conversation to launch.',
  path: '/work',
});

const pad = (value: number) => String(value).padStart(2, '0');

/**
 * All projects, reached from the homepage work section's "View All" button.
 * Same paper surface and label column, with the projects as a compact card
 * grid (1 column on phones, 2 on tablets, 3 on desktop).
 */
export default function WorkPage() {
  const projects = projectsData;

  return (
    <div
      className="bg-grain pb-24 pt-[120px] text-black sm:pb-32 sm:pt-[170px] [@media(max-height:500px)]:pb-16 [@media(max-height:500px)]:pt-24"
      style={{ backgroundColor: '#e6e5e0' }}
    >
      {/* Close (or Esc) returns to the work section on the homepage. */}
      <PageCloseButton href="/#work" />
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-0">
        {/* Label */}
        <div>
          <FadeIn>
            <p className="flex items-center gap-3 font-montserrat text-[15px] font-semibold tracking-[-0.02em] text-black">
              <span className="h-2.5 w-2.5 rounded-full bg-black/45" aria-hidden="true" />
              All Projects
            </p>
          </FadeIn>
        </div>

        <div>
          {/* Heading */}
          {/* Heading and intro sit side by side only from xl; below that the heading needs the full width. */}
          <div className="mb-16 flex flex-col gap-6 sm:mb-24 xl:flex-row xl:items-end xl:justify-between" style={{ maxWidth: 1116 }}>
            <FadeIn delay={0.05}>
              <h1
                className="font-sora font-semibold text-black"
                style={{ fontSize: 'clamp(2.75rem, 6vw, 5.5rem)', lineHeight: 0.92, letterSpacing: '-0.065em' }}
              >
                Selected{' '}
                {/* "work" and the count never split across lines. */}
                <span className="whitespace-nowrap">
                  work
                  <sup
                    className="ml-2 align-top font-montserrat font-semibold text-black/45"
                    style={{ fontSize: '0.22em', letterSpacing: '0', top: '0.4em' }}
                  >
                    ({pad(projects.length)})
                  </sup>
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="max-w-[340px] font-montserrat text-[15px] font-medium leading-[1.5] tracking-[-0.01em] text-black/70 xl:pb-2">
                Websites, apps and custom software we&apos;ve designed and built, from first conversation to launch.
              </p>
            </FadeIn>
          </div>

          {/* Projects */}
          {/* Three columns only from xl: at 1024px they were 234px-wide cards. */}
          <div className="grid gap-x-4 gap-y-12 sm:grid-cols-2 xl:grid-cols-3" style={{ maxWidth: 1116 }}>
            {projects.map((project, index) => (
              <FadeIn key={project.id} delay={(index % 3) * 0.08}>
                <Link
                  href={`/work/${project.slug}`}
                  className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
                >
                  <div className="relative overflow-hidden bg-black/10" style={{ aspectRatio: '4 / 3' }}>
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1280px) 360px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 font-montserrat text-[9px] font-semibold uppercase leading-none tracking-[0.02em] text-black">
                    <span className="border border-black px-[3px] py-[2px]">
                      {pad(index + 1)}/{pad(projects.length)}
                    </span>
                    <span className="text-black/60">{project.year}</span>
                  </div>
                  <h2
                    className="mt-3 font-sora text-[18px] font-semibold leading-[1.15] text-black underline decoration-transparent decoration-1 underline-offset-4 transition-colors duration-300 group-hover:decoration-black"
                    style={{ letterSpacing: '-0.04em' }}
                  >
                    {project.title}
                  </h2>
                  <p className="mt-1.5 font-montserrat text-[13px] font-medium text-black/60">{project.category}</p>
                </Link>
              </FadeIn>
            ))}
          </div>

          {/* Closing */}
          <FadeIn
            className="mt-24 flex flex-col items-start justify-between gap-8 sm:mt-32 sm:flex-row sm:items-end"
            style={{ maxWidth: 1116 }}
          >
            <p
              className="font-sora font-semibold text-black"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 0.95, letterSpacing: '-0.06em' }}
            >
              Have a project
              <br />
              in mind?
            </p>
            <Link
              href="/contact"
              className="group inline-flex h-11 items-center gap-3 rounded-[3px] bg-black pl-4 pr-1.5 font-montserrat text-[15px] font-semibold tracking-[-0.01em] text-white transition-colors duration-300 hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              Start a project
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
  );
}
