import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { buttonClasses } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center bg-ice px-5 pb-24 pt-[140px] text-navy sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-[1500px]">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-navy/60">Error 404</p>
        <h1 className="mt-5 font-display text-[clamp(3rem,12vw,10rem)] font-extrabold leading-[0.85] tracking-[-0.08em]">
          Nothing here.
        </h1>
        <p className="mt-8 max-w-[440px] font-sans text-[15px] font-medium leading-[1.55] text-steel">
          The page you&apos;re looking for has moved or never existed. Head back to the studio.
        </p>
        <Link href="/" className={buttonClasses({ size: 'lg', className: 'mt-10' })}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
