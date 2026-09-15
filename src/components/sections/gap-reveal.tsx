'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

/** Total scroll length of the pinned panel. The extra beyond 100vh is the animation. */
const PIN_HEIGHT = '250vh';

/**
 * "WE CLOSE THAT GAP" panel.
 *
 * 1. It slides up over the (now sticky) paragraph block above it as an empty
 *    dark panel, until it covers the screen.
 * 2. It then pins for the remaining scroll length while the heading halves
 *    slide in from the sides, the photo card grows in behind them, and the
 *    caption rises in last. The final state holds briefly before the page moves on.
 *
 * Everything is tied to scroll position, so it reverses when scrolling up.
 * Reduced-motion users see the final state.
 */
export function GapReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // 0 when the panel has fully covered the screen, 1 at the end of the pin.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.6, restDelta: 0.0005 });
  const finished = useMotionValue(1);
  const progress = reduceMotion ? finished : smooth;

  const leftX = useTransform(progress, [0, 0.5], ['-45vw', '0vw']);
  const rightX = useTransform(progress, [0, 0.5], ['45vw', '0vw']);
  const headingOpacity = useTransform(progress, [0, 0.35], [0, 1]);

  const cardScale = useTransform(progress, [0.15, 0.6], [0.4, 1]);
  const cardOpacity = useTransform(progress, [0.15, 0.5], [0, 0.85]);

  const captionOpacity = useTransform(progress, [0.5, 0.75], [0, 1]);
  const captionY = useTransform(progress, [0.5, 0.75], [24, 0]);

  return (
    <div
      ref={ref}
      className="relative z-10 bg-ink bg-grain"
      style={{ height: PIN_HEIGHT, boxShadow: '0 -30px 60px rgba(0, 0, 0, 0.45)' }}
    >
      <div
        className="flex w-full flex-col items-center overflow-hidden px-5 pb-20 pt-[120px] text-center sm:px-8 sm:pt-32"
        style={{ position: 'sticky', top: 0, height: '100vh' }}
      >
        <div className="relative flex w-full flex-1 items-center justify-center">
          <h2 className="relative z-10 flex flex-row items-center gap-3 whitespace-nowrap font-sora text-[42px] font-extrabold leading-none tracking-[-0.06em] sm:gap-6 sm:text-[80px] lg:text-[112px]">
            <motion.span style={{ x: leftX, opacity: headingOpacity }}>WE CLOSE</motion.span>
            <motion.span style={{ x: rightX, opacity: headingOpacity }}>THAT GAP</motion.span>
          </h2>
          <motion.div
            aria-hidden="true"
            style={{ x: '-50%', y: '-50%', scale: cardScale, opacity: cardOpacity }}
            className="absolute left-1/2 top-1/2 z-0 h-[112px] w-[82px] overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/20 sm:h-[170px] sm:w-[124px] lg:h-[220px] lg:w-[160px]"
          >
            <Image
              src="/images/founder.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 160px, (min-width: 640px) 124px, 82px"
              className="object-cover object-[center_28%]"
            />
          </motion.div>
        </div>
        <motion.p
          style={{ opacity: captionOpacity, y: captionY }}
          className="mx-auto mb-10 mt-auto max-w-[250px] text-center font-montserrat text-[11px] font-medium leading-[1.45] tracking-[0.02em] text-white/85 sm:mb-14 sm:max-w-[340px] sm:text-[13px]"
        >
          A Website Is Often The First Real Impression Of Your Business. We Take What Makes You Worth Choosing And Build An Experience That Shows It. Before Anyone Reads A Single Word.
        </motion.p>
      </div>
    </div>
  );
}
