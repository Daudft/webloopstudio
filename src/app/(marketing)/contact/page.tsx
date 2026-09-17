import { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { constructMetadata } from '@/lib/metadata';
import { ContactForm } from '@/components/sections/contact-form';
import { FadeIn } from '@/components/animations/fade-in';
import { PageCloseButton } from '@/components/common/page-close-button';

export const metadata: Metadata = constructMetadata({
  title: 'Contact',
  description:
    'Start a project with Webloop Studio. Tell us about your business, budget and goals, or book a free 30-minute intro call. We read every message and reply personally.',
  path: '/contact',
});

/**
 * Contact page on the same paper surface as the homepage work section:
 * heading, intro and founder with a Book a call button on the left, form on the right. No footer, and a Close button
 * replaces the navbar CTA (both hidden for this route in their components).
 */
export default function ContactPage() {
  const bookingHref = siteConfig.links.booking ?? '#contact-form';
  const bookingIsExternal = Boolean(siteConfig.links.booking);

  return (
    <div
      className="min-h-svh bg-grain pb-24 pt-[120px] text-black sm:pb-32 sm:pt-[170px] [@media(max-height:500px)]:pb-16 [@media(max-height:500px)]:pt-24"
      style={{ backgroundColor: '#e6e5e0' }}
    >
      <PageCloseButton />
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24" style={{ maxWidth: 1240 }}>
          {/* Heading, intro and founder */}
          <div>
            <FadeIn delay={0.05}>
              <h1
                className="max-w-[620px] font-sora font-semibold text-black"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.95, letterSpacing: '-0.06em' }}
              >
                Tell us where your business is headed.
              </h1>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="mt-6 max-w-[400px] font-montserrat text-[15px] font-medium leading-[1.5] tracking-[-0.01em] text-black/70">
                Share a little about what you&apos;re building and what&apos;s getting in the way. No pitch decks required.
                We read every message and reply personally.
              </p>
            </FadeIn>

            {/* Founder card, same layout as the homepage FAQ card, smaller photo. */}
            <FadeIn delay={0.18} className="mt-12">
              <div className="relative overflow-hidden bg-black/10" style={{ width: 120, aspectRatio: '0.82' }}>
                <Image
                  src="/images/founder.jpg"
                  alt={`${siteConfig.founder}, founder of ${siteConfig.name}`}
                  fill
                  sizes="120px"
                  className="object-cover object-[center_28%]"
                />
              </div>
              <h2
                className="mt-5 font-sora text-[23px] font-bold leading-[0.98] text-black"
                style={{ letterSpacing: '-0.055em' }}
              >
                Got more questions?
                <br />
                Talk with Daud.
              </h2>
              <a
                href={bookingHref}
                {...(bookingIsExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="group mt-6 inline-flex h-8 items-center gap-2.5 rounded-[3px] bg-black pl-3 pr-[5px] font-sans text-[14px] font-semibold tracking-[-0.01em] text-white transition-colors duration-300 hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                Book a call
                <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[2px] bg-white text-black">
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </FadeIn>
          </div>

          {/* Form */}
          <FadeIn id="contact-form" delay={0.2} className="relative scroll-mt-28 lg:pt-2">
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
