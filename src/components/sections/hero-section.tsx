'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Globe } from 'lucide-react';

export function HeroSection() {
  const [wordmarkOffset, setWordmarkOffset] = useState({ x: 0, y: 0 });

  const handleWordmarkMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;

    setWordmarkOffset({
      x: normalizedX * 18,
      y: normalizedY * 10,
    });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-ice text-navy">
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center px-5 pt-[163px] text-center sm:px-8">
        <Globe strokeWidth={2.75} className="mb-3 h-11 w-11" aria-hidden="true" />
        <h1 className="max-w-[390px] font-display text-[36px] font-bold leading-[1.08] tracking-[-0.04em] sm:text-[38px]">
          Products that sell
          <br />
          themselves
        </h1>
        <p className="mt-5 max-w-[300px] font-sans text-[15px] font-semibold leading-[1.55] tracking-[0.01em]">
          Websites, apps, and custom software for businesses whose growth has outpaced their digital presence
        </p>
        <div
          onPointerMove={handleWordmarkMove}
          onPointerLeave={() => setWordmarkOffset({ x: 0, y: 0 })}
          style={{
            transform: `translate3d(${wordmarkOffset.x}px, ${wordmarkOffset.y}px, 0)`,
            transition: 'transform 280ms ease-out',
          }}
          className="mb-8 mt-auto w-[calc(100vw-48px)] max-w-none"
        >
          <Image
            src="/WEBLOOP.png"
            alt="WEBLOOP"
            width={3731}
            height={623}
            sizes="100vw"
            priority
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
