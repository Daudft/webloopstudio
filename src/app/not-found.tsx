import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

/** 404, in the same paper-and-black look as the contact and work pages. */
export default function NotFound() {
  return (
    <div className="flex min-h-svh items-center bg-grain pb-24 pt-[120px] text-black sm:pt-[140px]" style={{ backgroundColor: '#e6e5e0' }}>
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-6">
        <p className="flex items-center gap-3 font-montserrat text-[15px] font-semibold tracking-[-0.02em] text-black">
          <span className="h-2.5 w-2.5 rounded-full bg-black/45" aria-hidden="true" />
          404
        </p>
        <h1
          className="mt-6 font-sora font-semibold text-black"
          style={{ fontSize: 'clamp(3rem, 11vw, 9.5rem)', lineHeight: 0.9, letterSpacing: '-0.07em' }}
        >
          Nothing here.
        </h1>
        <p className="mt-8 max-w-[440px] font-montserrat text-[15px] font-medium leading-[1.55] tracking-[-0.01em] text-black/70">
          The page you&apos;re looking for has moved or never existed. Head back to the studio, or see what we&apos;ve built.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link
            href="/"
            className="group inline-flex h-11 items-center gap-3 rounded-[3px] bg-black pl-1.5 pr-4 font-montserrat text-[15px] font-semibold tracking-[-0.01em] text-white transition-colors duration-300 hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-white text-black">
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
            </span>
            Back to home
          </Link>
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 font-montserrat text-[14px] font-semibold text-black underline decoration-black/30 underline-offset-4 transition-colors hover:decoration-black"
          >
            See our work
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 font-montserrat text-[14px] font-semibold text-black underline decoration-black/30 underline-offset-4 transition-colors hover:decoration-black"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
