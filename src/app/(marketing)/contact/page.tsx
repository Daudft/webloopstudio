import { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import { ContactForm } from '@/components/sections/contact-form';
import { siteConfig } from '@/config/site';
import { FadeIn } from '@/components/animations/fade-in';

export const metadata: Metadata = constructMetadata({
  title: 'Contact',
  description:
    'Tell Webloop Studio about your business and what you want to build. We read every message and reply personally.',
});

export default function ContactPage() {
  const socials = [
    { title: 'LinkedIn', href: siteConfig.links.linkedin },
    { title: 'Instagram', href: siteConfig.links.instagram },
  ].filter((social) => Boolean(social.href));

  return (
    <div className="bg-ice pb-24 pt-[140px] text-navy sm:pb-32 sm:pt-[170px]">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24">
          <div>
            <FadeIn>
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-navy/60">
                Contact
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mt-5 max-w-[560px] font-display text-[clamp(2.4rem,5.5vw,4.6rem)] font-bold leading-[0.96] tracking-[-0.06em]">
                Tell us where your business is headed.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-[440px] font-sans text-[15px] font-medium leading-[1.55] text-steel">
                Share a little about what you&apos;re building and what&apos;s getting in the way. No pitch decks required.
                We read every message and reply personally.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <dl className="mt-14 grid gap-8 border-t border-navy/20 pt-8 font-sans sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-navy/60">Email</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-[15px] font-semibold underline decoration-navy/30 underline-offset-4 transition-colors hover:decoration-navy"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </dd>
                </div>
                {socials.length > 0 && (
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-navy/60">Elsewhere</dt>
                    <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                      {socials.map((social) => (
                        <a
                          key={social.title}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[15px] font-semibold transition-opacity hover:opacity-60"
                        >
                          {social.title} <span aria-hidden="true">↗</span>
                        </a>
                      ))}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-navy/60">Based</dt>
                  <dd className="mt-2 text-[15px] font-medium text-steel">Working worldwide, remote-first.</dd>
                </div>
              </dl>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="relative">
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
