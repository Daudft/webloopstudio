'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { faqsData } from '@/data/faqs';
import { FadeIn } from '@/components/animations/fade-in';

const landingQuestions = faqsData.slice(0, 5);

export function LandingFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-navy py-24 text-ice sm:py-36" id="faqs">
      <div className="mx-auto grid max-w-[1500px] gap-16 px-5 sm:px-10 lg:grid-cols-[minmax(220px,0.75fr)_minmax(0,1.75fr)] lg:gap-24 lg:px-16">
        <div className="flex flex-col justify-between gap-12 lg:min-h-[660px]">
          <FadeIn>
            <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.24em] text-sky">
              FAQs
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="max-w-[210px]">
            <div className="relative aspect-[0.82] w-full overflow-hidden bg-[#16345f]">
              <Image
                src="/images/founder.jpg"
                alt="Daud Afzal, founder of Webloop Studio"
                fill
                sizes="210px"
                className="object-cover object-[center_28%]"
              />
            </div>
            <h3 className="mt-5 font-sora text-[23px] font-bold leading-[0.98] tracking-[-0.055em] text-white">
              Got more questions?
              <br />
              Talk with Daud.
            </h3>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center bg-ice px-3 py-2 font-montserrat text-[11px] font-semibold text-navy transition-opacity hover:opacity-80"
            >
              Book a call
            </Link>
          </FadeIn>
        </div>

        <div>
          <FadeIn>
            <h2 className="max-w-[850px] font-sora text-[clamp(2.8rem,6vw,5.8rem)] font-bold leading-[0.94] tracking-[-0.075em] text-ice">
              Here&apos;s what you need to consider before partnering with us.
            </h2>
          </FadeIn>

          <div className="mt-16 border-t border-white/20">
            {landingQuestions.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={faq.question} className="border-b border-white/20">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-montserrat text-[14px] font-semibold text-white transition-opacity hover:opacity-75 sm:py-7 sm:text-[16px]"
                  >
                    <span>{faq.question}</span>
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/50 text-[12px] font-normal leading-none text-white/70">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="max-w-2xl pb-6 pr-10 font-montserrat text-[13px] leading-[1.6] text-white/60 sm:pb-7">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
