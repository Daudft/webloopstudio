import Link from 'next/link';
import { HeroBackground } from '@/components/sections/hero-background';
import { RollText } from '@/components/ui/roll-text';
import { RollArrow } from '@/components/ui/roll-arrow';

export function ImageCTASection() {
  return (
    // Height: a full screen, but at least 560px and at most 820px, so landscape phones
    // aren't given 2+ screens of empty space and large monitors keep the original 820px.
    <section className="relative min-h-[min(820px,max(560px,100svh))] overflow-hidden bg-ink text-ice" aria-labelledby="image-cta-heading">
      {/* Same animated background as the hero; it pauses while off-screen. */}
      <HeroBackground tone="dark" />
      {/* Soft dark centre and edges keep the heading readable. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 45%, rgba(19, 19, 21, 0.55), rgba(19, 19, 21, 0) 70%), linear-gradient(to bottom, rgba(19, 19, 21, 0.6), rgba(19, 19, 21, 0) 25%, rgba(19, 19, 21, 0) 80%, rgba(19, 19, 21, 0.7))',
        }}
      />

      <div className="relative z-10 flex min-h-[min(820px,max(560px,100svh))] flex-col items-center justify-center px-5 py-24 text-center sm:px-8 [@media(max-height:500px)]:py-16">
        {/* Scales down to 1.9rem so each line stays whole on 320px phones (three clean lines). */}
        <h2
          id="image-cta-heading"
          className="max-w-[1100px] font-sora text-[clamp(1.9rem,9.2vw,8.6rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.09em] text-[#f3f2ed]"
        >
          Let&apos;s build
          <br />
          an experience
          <br />
          that moves people
        </h2>

        <Link
          href="/contact"
          className="group mt-12 inline-flex items-center gap-4 bg-ice px-4 py-3 font-sora text-[20px] font-bold leading-none tracking-[-0.045em] text-black transition-colors hover:bg-white sm:mt-20 sm:px-5 sm:py-4 sm:text-[27px]"
        >
          <RollText>Tell us your story</RollText>
          <span className="flex h-8 w-8 items-center justify-center bg-black text-white sm:h-10 sm:w-10">
            <RollArrow className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
        </Link>
      </div>
    </section>
  );
}
