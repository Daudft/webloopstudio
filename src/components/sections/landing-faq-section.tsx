'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { faqsData } from '@/data/faqs';
import { siteConfig } from '@/config/site';
import { FadeIn } from '@/components/animations/fade-in';
import { RollText } from '@/components/ui/roll-text';
import { RollArrow } from '@/components/ui/roll-arrow';
import { cn } from '@/lib/utils';

const EASE = [0.65, 0, 0.35, 1] as const;

export function LandingFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-ink bg-grain py-16 text-ice sm:py-24 lg:py-36" id="faqs">
      {/* Same container and side padding as the work and services sections, so the left edges line up. */}
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 sm:px-6 lg:grid-cols-[minmax(220px,0.75fr)_minmax(0,1.75fr)] lg:gap-24">
        {/* Founder card: after the questions on phones and tablets, in the left column on desktop. */}
        <div className="order-last flex flex-col justify-end gap-12 lg:order-none lg:min-h-[660px]">
          <FadeIn delay={0.1} className="max-w-[210px]">
            <div className="relative aspect-[0.82] w-full overflow-hidden bg-[#16345f]" style={{ maxWidth: 160 }}>
              <Image
                src="/images/founder.jpg"
                alt="Daud Afzal, founder of Webloop Studio"
                fill
                sizes="160px"
                className="object-cover object-[center_28%]"
              />
            </div>
            <h3 className="mt-5 font-sora text-[23px] font-bold leading-[0.98] tracking-[-0.055em] text-white">
              Got more questions?
              <br />
              Talk with Daud.
            </h3>
            {/* Same style as the navbar's "Start a project" button. Opens the Calendly booking page when set. */}
            <Link
              href={siteConfig.links.booking ?? '/contact'}
              {...(siteConfig.links.booking ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="mt-6 inline-flex h-8 items-center gap-2.5 rounded-[3px] bg-ice pl-3 pr-[5px] font-sans text-[14px] font-semibold tracking-[-0.01em] text-navy transition-colors duration-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <RollText>Book a call</RollText>
              <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[2px] bg-navy text-ice">
                <RollArrow className="h-3.5 w-3.5" />
              </span>
            </Link>
          </FadeIn>
        </div>

        <div>
          <FadeIn>
            <h2 className="max-w-[850px] font-sora text-[clamp(2.8rem,6vw,5.8rem)] font-bold leading-[0.94] tracking-[-0.075em] text-ice">
              Here&apos;s what you need to consider before partnering with us.
            </h2>
          </FadeIn>

          <div className="mt-16 border-t border-white/10">
            {faqsData.map((faq, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;

              return (
                <div key={faq.question} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="group relative -mb-px flex w-full items-center justify-between gap-6 px-2 py-6 text-left font-montserrat text-[14px] font-semibold text-white focus-visible:outline-none sm:py-7 sm:text-[16px]"
                  >
                    {/* Light panel that grows from the bottom edge on hover. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 group-hover:scale-y-100 group-focus-visible:scale-y-100"
                      style={{ backgroundColor: '#e6e5e0', transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)' }}
                    />
                    <span
                      className={cn(
                        'relative transition-[color,transform] duration-500 group-hover:translate-x-2 group-hover:text-[#131315] group-focus-visible:translate-x-2 group-focus-visible:text-[#131315]',
                        isOpen && 'translate-x-2'
                      )}
                      style={{ transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)' }}
                    >
                      {faq.question}
                    </span>
                    {/* Small dot: a hollow ring that fills on hover and when open. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'relative mr-2 h-[6px] w-[6px] shrink-0 rounded-full border transition-[background-color,border-color,transform] duration-500 group-hover:scale-110 group-hover:border-[#131315] group-hover:bg-[#131315] group-focus-visible:border-[#131315] group-focus-visible:bg-[#131315]',
                        isOpen ? 'border-white bg-white' : 'border-white/50 bg-transparent'
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: 'auto',
                          opacity: 1,
                          transition: { height: { duration: 0.5, ease: EASE }, opacity: { duration: 0.35, delay: 0.1 } },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: { height: { duration: 0.45, ease: EASE }, opacity: { duration: 0.2 } },
                        }}
                        className="overflow-hidden"
                      >
                        <motion.p
                          initial={{ y: -8 }}
                          animate={{ y: 0 }}
                          exit={{ y: -8 }}
                          transition={{ duration: 0.5, ease: EASE }}
                          className="max-w-2xl pb-6 pl-4 pr-10 font-montserrat text-[13px] leading-[1.6] text-white/60 sm:pb-7"
                        >
                          {faq.answer}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
