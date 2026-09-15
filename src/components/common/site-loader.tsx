'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * Full-screen intro that plays on every full page load (first visit and every
 * reload). It lives in the root layout, outside the loading.tsx Suspense
 * boundary, so it is part of the very first HTML chunk and paints before
 * anything else. Client-side navigation does not replay it because the layout
 * persists.
 *
 * The animation is pure CSS (see `.loader-*` in globals.css) and starts at
 * first paint, before React hydrates. React only removes the node once the
 * final `loader-rise` animation has finished, so there is no timer to keep in
 * sync with the CSS.
 */
export function SiteLoader() {
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rise = el
      .getAnimations()
      .find((animation) => (animation as CSSAnimation).animationName === 'loader-rise');

    // Reduced motion hides the loader in CSS, and slow hydration can mean the
    // animation already ended before this effect ran. Either way, remove now.
    if (reducedMotion || !rise || rise.playState === 'finished') {
      setDone(true);
      return;
    }

    let cancelled = false;
    rise.finished
      .then(() => {
        if (!cancelled) setDone(true);
      })
      .catch(() => {
        // Animation was cancelled (node removed). Nothing to do.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (done) {
    return null;
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      // The navbar samples the surface under it to pick light or dark text; skip this overlay.
      data-nav-ignore=""
      className="loader-screen fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-hidden bg-navy text-white"
    >
      <div className="w-[min(420px,calc(100vw-48px))]">
        <div className="loader-reveal overflow-hidden">
          {/*
            unoptimized: a static 8 KB PNG loads faster than a first-hit image-optimizer request.
            loading="eager" rather than priority: priority adds a <link rel=preload> that the
            navbar's CSS mask of the same file cannot reuse, causing a double fetch and a warning.
          */}
          <Image
            src="/Logo.png"
            alt=""
            width={304}
            height={51}
            loading="eager"
            unoptimized
            className="mx-auto block h-auto w-[min(260px,80vw)]"
          />
        </div>
        <span className="loader-label mt-3 block text-center font-display text-[9px] font-light uppercase tracking-[0.42em] text-white/75">
          STUDIO
        </span>
      </div>
    </div>
  );
}
