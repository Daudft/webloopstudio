'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw } from 'lucide-react';
import { Button, buttonClasses } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[app error]', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center bg-ice px-5 pb-24 pt-[140px] text-navy sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-[1500px]">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-navy/60">Something broke</p>
        <h1 className="mt-5 max-w-[900px] font-display text-[clamp(2.4rem,7vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.07em]">
          This page hit an error.
        </h1>
        <p className="mt-8 max-w-[440px] font-sans text-[15px] font-medium leading-[1.55] text-steel">
          Try again, or head back to the homepage. If it keeps happening, email us and mention what you were doing.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button size="lg" onClick={() => reset()}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Try again
          </Button>
          <Link href="/" className={buttonClasses({ variant: 'ghost', size: 'lg', className: 'px-0' })}>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
