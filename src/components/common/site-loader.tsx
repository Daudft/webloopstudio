'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'wl-loader';
/** Must match the total of the loader-* animation timings in globals.css. */
const DURATION_MS = 2500;

/**
 * Runs before hydration so a returning visitor (same browser session) or a
 * reduced-motion user never sees the intro. Hiding via `style` rather than
 * removing the node keeps the DOM shape identical for hydration.
 */
const skipScript = `try{if(sessionStorage.getItem('${STORAGE_KEY}')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches){document.getElementById('site-loader').style.display='none'}}catch(e){}`;

function hasSeenLoader(): boolean {
  try {
    return (
      sessionStorage.getItem(STORAGE_KEY) === '1' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  } catch {
    return false;
  }
}

export function SiteLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const seen = hasSeenLoader();
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Storage unavailable (private mode, blocked). Play once and move on.
    }

    if (seen) {
      setVisible(false);
      return;
    }

    const finish = window.setTimeout(() => setVisible(false), DURATION_MS);
    return () => window.clearTimeout(finish);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <>
      <div
        id="site-loader"
        suppressHydrationWarning
        aria-hidden="true"
        className="loader-screen fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-hidden bg-navy text-white"
      >
        <div className="w-[min(420px,calc(100vw-48px))]">
          <div className="loader-reveal overflow-hidden">
            <Image
              src="/Logo.png"
              alt=""
              width={304}
              height={51}
              sizes="260px"
              priority
              className="mx-auto block h-auto w-[min(260px,80vw)]"
            />
          </div>
          <span className="loader-label mt-3 block text-center font-display text-[9px] font-light uppercase tracking-[0.42em] text-white/75">
            STUDIO
          </span>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: skipScript }} />
    </>
  );
}
