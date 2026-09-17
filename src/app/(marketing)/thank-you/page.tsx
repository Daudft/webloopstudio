import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { constructMetadata } from '@/lib/metadata';
import { FadeIn } from '@/components/animations/fade-in';
import { PageCloseButton } from '@/components/common/page-close-button';

export const metadata: Metadata = constructMetadata({
  title: 'Thank you',
  description: 'Your message has been sent to Webloop Studio. We read every message and reply personally by email.',
  path: '/thank-you',
  noIndex: true,
});

/**
 * Shown after the contact form is sent (the form redirects here). Same paper look as /contact.
 * Its own URL lets analytics count completed inquiries: mark the /thank-you page view as a key event in GA4.
 */
export default function ThankYouPage() {
  return (
    <div
      className="flex min-h-svh items-center bg-grain pb-24 pt-[120px] text-black sm:pt-[140px] [@media(max-height:500px)]:pb-16 [@media(max-height:500px)]:pt-24"
      style={{ backgroundColor: '#e6e5e0' }}
    >
      <PageCloseButton />
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-6">
        <FadeIn>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white" aria-hidden="true">
            <Check className="h-6 w-6" strokeWidth={2.5} />
          </span>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h1
            className="mt-8 max-w-[900px] font-sora font-semibold text-black"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', lineHeight: 0.92, letterSpacing: '-0.065em' }}
          >
            Thanks, we got your message.
          </h1>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p className="mt-6 max-w-[460px] font-montserrat text-[16px] font-medium leading-[1.55] tracking-[-0.01em] text-black/70">
            We read every message personally and will reply by email soon, usually within one to two working days. Want to
            talk sooner? Pick a time for a free 30-minute call.
          </p>
        </FadeIn>

        <FadeIn delay={0.18} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          {siteConfig.links.booking && (
            <a
              href={siteConfig.links.booking}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-11 items-center gap-3 rounded-[3px] bg-black pl-4 pr-1.5 font-montserrat text-[15px] font-semibold tracking-[-0.01em] text-white transition-colors duration-300 hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              Book a call
              <span className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-white text-black">
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </a>
          )}
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 font-montserrat text-[14px] font-semibold text-black underline decoration-black/30 underline-offset-4 transition-colors hover:decoration-black"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            Back to home
          </Link>
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 font-montserrat text-[14px] font-semibold text-black underline decoration-black/30 underline-offset-4 transition-colors hover:decoration-black"
          >
            See our work
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </FadeIn>
      </div>
    </div>
  );
}
