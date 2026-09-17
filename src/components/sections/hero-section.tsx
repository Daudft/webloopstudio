'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Globe } from 'lucide-react';
import { HeroBackground, type HeroTone } from '@/components/sections/hero-background';
import { cn } from '@/lib/utils';

/**
 * 'light' keeps the brand ice hero with navy type.
 * 'dark' gives a moodier navy hero with ice type, closer to a cinematic look.
 */
const HERO_TONE: HeroTone = 'dark';

const toneStyles: Record<HeroTone, { section: string; wordmark: string; fade: string }> = {
  light: {
    section: 'bg-ice text-navy',
    wordmark: '',
    fade: '',
  },
  dark: {
    section: 'bg-ink text-white',
    // The wordmark PNG is navy; render it near-white on the dark background.
    wordmark: 'brightness-0 invert opacity-90',
    // Melt the bottom edge into the near-black intro section below.
    fade: 'bg-gradient-to-b from-transparent to-ink',
  },
};

export function HeroSection() {
  const [wordmarkOffset, setWordmarkOffset] = useState({ x: 0, y: 0 });
  const styles = toneStyles[HERO_TONE];

  const handleWordmarkMove = (event: React.PointerEvent<HTMLDivElement>) => {
    // Mouse only: on touch the drift made the wordmark twitch while scrolling.
    if (event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;

    setWordmarkOffset({
      x: normalizedX * 18,
      y: normalizedY * 10,
    });
  };

  return (
    <section className={cn('relative min-h-svh overflow-hidden', styles.section)}>
      <HeroBackground tone={HERO_TONE} />
      <div aria-hidden="true" className={cn('pointer-events-none absolute inset-x-0 bottom-0 h-32', styles.fade)} />

      {/* Top padding shrinks with viewport height so short landscape screens aren't mostly empty. */}
      <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col items-center px-5 pt-[clamp(88px,22svh,163px)] text-center sm:px-8">
        <Globe strokeWidth={2.75} className="mb-3 h-11 w-11 [@media(max-height:500px)]:h-8 [@media(max-height:500px)]:w-8" aria-hidden="true" />
        <h1 className="max-w-[390px] font-display text-[clamp(30px,10.5vw,36px)] font-bold leading-[1.08] tracking-[-0.04em] sm:text-[38px] 2xl:max-w-[480px] 2xl:text-[48px]">
          Products that sell
          <br />
          themselves
        </h1>
        <p className="mt-5 max-w-[300px] font-sans text-[15px] font-semibold leading-[1.55] tracking-[0.01em] 2xl:max-w-[380px] 2xl:text-[17px]">
          Websites, apps, and custom software for businesses whose growth has outpaced their digital presence
        </p>
        <div
          onPointerMove={handleWordmarkMove}
          onPointerLeave={() => setWordmarkOffset({ x: 0, y: 0 })}
          style={{
            transform: `translate3d(${wordmarkOffset.x}px, ${wordmarkOffset.y}px, 0)`,
            transition: 'transform 280ms ease-out',
          }}
          // On short landscape screens the wordmark is capped so it stays near the first screen.
          className="mb-8 mt-auto w-[calc(100vw-48px)] max-w-none [@media(max-height:500px)]:mb-4 [@media(max-height:500px)]:mt-8 [@media(max-height:500px)]:w-[min(calc(100vw-48px),62svh*6)]"
        >
          <Image
            src="/WEBLOOP.png"
            alt="WEBLOOP"
            width={3731}
            height={623}
            sizes="100vw"
            priority
            className={cn('h-auto w-full', styles.wordmark)}
          />
        </div>
      </div>
    </section>
  );
}
