import Link from 'next/link';
import { CtaArtBackground } from '@/components/sections/cta-art-background';

export function ImageCTASection() {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-ink text-ice sm:min-h-[820px]" aria-labelledby="image-cta-heading">
      <CtaArtBackground />
      {/* Soft dark centre and edges keep the heading readable over the brightest ridges. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 45%, rgba(19, 19, 21, 0.55), rgba(19, 19, 21, 0) 70%), linear-gradient(to bottom, rgba(19, 19, 21, 0.6), rgba(19, 19, 21, 0) 25%, rgba(19, 19, 21, 0) 80%, rgba(19, 19, 21, 0.7))',
        }}
      />

      <div className="relative z-10 flex min-h-[720px] flex-col items-center justify-center px-5 py-24 text-center sm:min-h-[820px] sm:px-8">
        <h2
          id="image-cta-heading"
          className="max-w-[1100px] font-sora text-[clamp(3.1rem,8.8vw,8.6rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.09em] text-[#f3f2ed]"
        >
          Let&apos;s build
          <br />
          an experience
          <br />
          that moves people
        </h2>

        <Link
          href="/contact"
          className="group mt-16 inline-flex items-center gap-4 bg-ice px-4 py-3 font-sora text-[20px] font-bold leading-none tracking-[-0.045em] text-navy transition-colors hover:bg-white sm:mt-20 sm:px-5 sm:py-4 sm:text-[27px]"
        >
          Tell us your story
          <span className="flex h-8 w-8 items-center justify-center bg-navy text-[22px] leading-none text-ice transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-10 sm:w-10 sm:text-[28px]">
            ↗
          </span>
        </Link>
      </div>
    </section>
  );
}
