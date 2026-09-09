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
    <section className="bg-[#0A1F44] py-28 text-white sm:py-36" id="services">
      <div className="mx-auto max-w-[1500px] px-7 sm:px-12 lg:px-16">
        <div className="mb-16 sm:mb-24">
          <FadeIn>
            <p className="font-sora text-[13px] font-medium uppercase leading-[1.35] tracking-[0.28em] text-white/90">
              What we can help with
            </p>
          </FadeIn>
        </div>

        <FadeInStagger className="border-t border-white/20">
          {servicesData.map((service) => (
            <Link
              key={service.id}
              href={`/services#${service.slug}`}
              className="group relative z-0 flex items-center justify-between gap-6 border-b border-white/20 py-7 sm:py-9 hover:z-20"
            >
              <Image
                src={serviceImages[servicesData.indexOf(service)]}
                alt=""
                width={360}
                height={240}
                className="pointer-events-none absolute right-16 top-1/2 z-20 h-44 w-64 -translate-y-1/2 rounded-2xl object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:right-28 sm:h-56 sm:w-[336px]"
                aria-hidden="true"
              />
              <span className="relative z-30 flex min-w-0 items-baseline gap-4 sm:gap-7">
                <span className="font-montserrat text-xs font-semibold text-white/40 transition-colors duration-300 group-hover:text-white/80">{String(servicesData.indexOf(service) + 1).padStart(2, '0')}</span>
                <span className="font-sora text-[30px] font-bold leading-[1.05] tracking-[-0.06em] text-white/45 transition-colors duration-300 group-hover:text-white sm:text-[48px] lg:text-[68px]">
                  {service.title}
                </span>
              </span>
              <ArrowUpRight className="relative z-30 h-7 w-7 shrink-0 stroke-[1.5] text-white/45 transition-[color,transform] duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white sm:h-10 sm:w-10" />
            </Link>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
