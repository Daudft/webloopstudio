'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { servicesData } from '@/data/services';
import { FadeIn, FadeInStagger } from '@/components/animations/fade-in';
import { ArrowUpRight } from 'lucide-react';

const serviceImages = [
  '/services/web-development.jpg',
  '/services/ui-ux-design.jpg',
  '/services/ai-automation.jpg',
  '/services/mobile-apps.jpg',
  '/services/cloud-devops.jpg',
  '/services/branding-identity.jpg',
];

export function ServicesGrid() {
  return (
    <section className="bg-navy py-28 text-white sm:py-36" id="services">
      <div className="mx-auto max-w-[1500px] px-7 sm:px-12 lg:px-16">
        <div className="mb-14 flex flex-col justify-between gap-6 pb-2 sm:mb-20 sm:flex-row sm:items-end">
          <FadeIn>
            <p className="font-montserrat text-[10px] font-semibold uppercase leading-[1.35] tracking-[0.24em] text-sky">
              01 — 06 / Capabilities
            </p>
            <p className="mt-3 font-sora text-[13px] font-medium uppercase leading-[1.35] tracking-[0.28em] text-white/90">
              What we can help with
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="max-w-[270px] sm:pb-0.5">
            <p className="font-montserrat text-[11px] font-medium leading-[1.55] text-white/50">
              Focused teams for ambitious digital products, from first idea to lasting advantage.
            </p>
          </FadeIn>
        </div>

        <FadeInStagger className="space-y-1">
          {servicesData.map((service, index) => (
            <Link
              key={service.id}
              href={`/contact?service=${service.slug}`}
              className="group relative z-0 flex items-center justify-between gap-6 rounded-[3px] px-3 py-7 transition-colors duration-300 hover:z-20 hover:bg-white/[0.05] sm:px-5 sm:py-8"
            >
              <Image
                src={serviceImages[servicesData.indexOf(service)]}
                alt=""
                width={360}
                height={240}
                className="pointer-events-none absolute right-16 top-1/2 z-20 h-44 w-64 -translate-y-1/2 scale-[0.98] rounded-[4px] object-cover opacity-0 shadow-2xl shadow-black/30 ring-1 ring-white/25 transition-[opacity,transform] duration-500 group-hover:scale-100 group-hover:opacity-100 sm:right-28 sm:h-56 sm:w-[336px]"
                aria-hidden="true"
              />
              <span className="relative z-30 flex min-w-0 items-baseline gap-4 sm:gap-7">
                <span className="font-montserrat text-[10px] font-semibold text-sky/60 transition-colors duration-300 group-hover:text-[#c8e0f8]">{String(index + 1).padStart(2, '0')}</span>
                <span className="font-sora text-[30px] font-bold leading-[1.05] tracking-[-0.06em] text-white/50 transition-colors duration-300 group-hover:text-[#eaf3fc] sm:text-[48px] lg:text-[68px]">
                  {service.title}
                </span>
              </span>
              <ArrowUpRight className="relative z-30 h-7 w-7 shrink-0 stroke-[1.25] text-white/40 transition-[color,transform] duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#c8e0f8] sm:h-10 sm:w-10" />
            </Link>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
