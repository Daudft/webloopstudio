'use client';

import { useEffect, useState } from 'react';

export function SiteLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const finish = window.setTimeout(() => setIsVisible(false), 5350);

    return () => window.clearTimeout(finish);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="loader-screen fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-hidden bg-navy text-white">
      <div className="loader-content w-[min(420px,calc(100vw-48px))]">
        <div className="loader-reveal overflow-hidden">
          <img src="/Logo.png" alt="WEBLOOP" className="mx-auto block h-auto w-[min(260px,80vw)]" />
        </div>
        <span
          style={{ fontFamily: 'var(--font-sora)', fontWeight: 300 }}
          className="loader-label mt-3 block text-center text-[9px] font-light uppercase tracking-[0.42em] text-white/75"
        >
          STUDIO
        </span>
      </div>
    </div>
  );
}