'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { servicesData } from '@/data/services';
import { FadeIn } from '@/components/animations/fade-in';
import { cn } from '@/lib/utils';

const pad = (value: number) => String(value).padStart(2, '0');

const serviceImages: Record<string, string> = {
  'web-development': '/services/web-development.jpg',
  'ui-ux-design': '/services/ui-ux-design.jpg',
  'ai-integration': '/services/ai-automation.jpg',
  'mobile-apps': '/services/mobile-apps.jpg',
  'cloud-devops': '/services/cloud-devops.jpg',
  'branding-identity': '/services/branding-identity.jpg',
};

const PREVIEW_WIDTH = 190;
const PREVIEW_HEIGHT = PREVIEW_WIDTH * 1.25;
/** Space between the end of the hovered title and the preview (px). */
const PREVIEW_GAP = 32;

// useLayoutEffect warns during server rendering; fall back to useEffect there.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * What we can help with.
 *
 * Same editorial grid as the work section above (label column, 740px column,
 * narrow text column), on the dark ink surface. Hovering a service brings its
 * title forward, dims the others, and the small preview image on the right
 * glides to sit beside that service and swaps to its picture.
 * Rows are not links. Below lg it is a plain list without the preview.
 */
export function ServicesGrid() {
  const services = servicesData;
  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState({ x: 0, y: 0 });
  const columnRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Place the preview just after the end of the active title, centred on its row.
  // Everything is measured relative to the services column, the preview's positioning context.
  const measure = useCallback(() => {
    const column = columnRef.current;
    const row = rowRefs.current[active];
    const title = titleRefs.current[active];
    if (!column || !row || !title) return;

    const columnRect = column.getBoundingClientRect();
    const titleRect = title.getBoundingClientRect();
    setPreview({
      x: titleRect.right - columnRect.left + PREVIEW_GAP,
      y: row.offsetTop + row.offsetHeight / 2 - PREVIEW_HEIGHT / 2,
    });
  }, [active]);

  useIsomorphicLayoutEffect(() => {
    measure();
  }, [measure]);

  // Re-measure when the window or any row changes size, and once web fonts have loaded
  // (a font swap can move a title's right edge without changing the row's size).
  useEffect(() => {
    let cancelled = false;
    const observer = new ResizeObserver(measure);
    rowRefs.current.forEach((row) => row && observer.observe(row));
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(() => {
      if (!cancelled) measure();
    });
    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  return (
    <section className="bg-ink bg-grain py-16 text-white sm:py-24 lg:py-32" id="services">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-0">
        {/* Label */}
        <div>
          <FadeIn>
            <p className="flex items-center gap-3 font-montserrat text-[15px] font-semibold tracking-[-0.02em] text-white">
              <span className="h-2.5 w-2.5 rounded-full bg-white/45" aria-hidden="true" />
              What we can help with
            </p>
          </FadeIn>
        </div>

        {/* Services. This column is the positioning context for the rows and the preview. */}
        <div ref={columnRef} className="relative">
          {/*
            Preview, placed just right of the active title. Rows keep pr-72 (288px) free so gap + width always fits.
            Only on large screens that can hover: touch tablets have no hover to move it, so they get a plain list.
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 hidden overflow-hidden bg-white/5 transition-transform duration-700 lg:[@media(hover:hover)]:block"
            style={{
              width: PREVIEW_WIDTH,
              height: PREVIEW_HEIGHT,
              transform: `translate3d(${preview.x}px, ${preview.y}px, 0)`,
              transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
            }}
          >
            {services.map((service, index) => (
              <Image
                key={service.id}
                src={serviceImages[service.slug] ?? '/services/web-development.jpg'}
                alt=""
                fill
                sizes={`${PREVIEW_WIDTH}px`}
                className={cn(
                  'object-cover grayscale transition-[opacity,transform] duration-700 ease-out',
                  index === active ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                )}
              />
            ))}
          </div>

          {services.map((service, index) => {
            const isActive = index === active;

            return (
              <FadeIn key={service.id} delay={index * 0.05}>
                <div
                  ref={(element) => {
                    rowRefs.current[index] = element;
                  }}
                  onPointerEnter={() => setActive(index)}
                  className="py-6 sm:py-8 lg:[@media(hover:hover)]:pr-72"
                >
                  <div className="max-w-[740px]">
                    <div className="flex items-center gap-1.5 font-montserrat text-[10px] font-semibold uppercase leading-none tracking-[0.02em] text-white/70 sm:text-[9px]">
                      <span className="border border-white/60 px-[3px] py-[2px]">
                        {pad(index + 1)}/{pad(services.length)}
                      </span>
                    </div>
                    <h3
                      className={cn(
                        'mt-4 font-sora font-semibold text-white transition-colors duration-500',
                        // Dimming follows the hovered row, so it only applies on devices that can hover.
                        !isActive && 'lg:[@media(hover:hover)]:text-white/30'
                      )}
                      style={{ fontSize: 'clamp(1.9rem, 3.4vw, 3.25rem)', lineHeight: 1, letterSpacing: '-0.05em' }}
                    >
                      <span
                        ref={(element) => {
                          titleRefs.current[index] = element;
                        }}
                      >
                        {service.title}
                      </span>
                    </h3>
                    <p
                      className={cn(
                        'mt-4 max-w-[460px] font-montserrat text-[14px] font-medium leading-[1.45] tracking-[-0.01em] text-white/65 transition-opacity duration-500',
                        !isActive && 'lg:[@media(hover:hover)]:opacity-40'
                      )}
                    >
                      {service.shortDescription}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
