'use client';

import React from 'react';
import Image from 'next/image';
import { FadeIn, FadeInStagger } from '@/components/animations/fade-in';

const steps = [
  {
    step: '01',
    title: 'We uncover your story',
    description:
      'We dig deep into your business, surface what makes you irreplaceable, and shape it into a clear digital direction that connects in seconds.',
    image: '/services/ui-ux-design.jpg',
  },
  {
    step: '02',
    title: 'We shape your digital presence',
    description:
      'With the story locked, we design an experience that feels premium, signals credibility, and gives your audience one clear reason to lean in.',
    image: '/services/branding-identity.jpg',
  },
  {
    step: '03',
    title: 'We bring it into the world',
    description:
      'We build, test, and launch a fast, flexible product that earns attention, creates opportunity, and grows with the business behind it.',
    image: '/services/web-development.jpg',
  },
  {
    step: '04',
    title: 'We stay in your corner',
    description:
      'After launch, we keep improving the system with you, turning real feedback into the next round of meaningful momentum.',
    image: '/services/cloud-devops.jpg',
  },
];

export function ProcessTimeline() {
  return (
    <section className="bg-ink bg-grain py-16 text-ice sm:py-24 lg:py-36" id="process">
      {/* Same container and side padding as the other sections, so left edges line up. */}
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6">
        <div className="mb-12 sm:mb-20 lg:mb-28">
          <FadeIn>
            <h2 className="whitespace-nowrap font-sora text-[clamp(4rem,15vw,12rem)] font-extrabold leading-[0.8] tracking-[-0.09em] text-ice">
              Process
            </h2>
          </FadeIn>
        </div>

        <FadeInStagger className="space-y-0">
          {steps.map((item) => (
            // Phones: label, text and image stacked. Tablets: label on its own row, then text beside
            // the image. Desktop: the original three columns. No fixed minimum widths, so rows never
            // grow wider than the screen.
            <div
              key={item.step}
              className="grid gap-0 rounded-[3px] px-3 pb-10 sm:px-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-x-10 lg:grid-cols-[120px_minmax(0,0.9fr)_minmax(0,1.25fr)] lg:gap-x-16 lg:pb-0"
            >
              <div className="pb-4 pt-6 md:col-span-2 md:pt-10 lg:col-span-1 lg:py-12">
                <span className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65">
                  Step / {item.step}
                </span>
              </div>
              <div className="max-w-[390px] self-start pb-6 md:pb-0 lg:py-12">
                <h3 className="font-sora text-[27px] font-bold leading-[0.98] tracking-[-0.055em] text-white sm:text-[36px]">
                  {item.title}
                </h3>
                <p className="mt-5 font-montserrat text-[13px] font-medium leading-[1.55] text-white/55">
                  {item.description}
                </p>
              </div>
              <div className="relative min-h-[220px] overflow-hidden bg-[#151515] sm:min-h-[280px]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover opacity-75 grayscale"
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
