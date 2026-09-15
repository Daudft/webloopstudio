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

/**
 * "WE CLOSE THAT GAP" block. As it scrolls into view the two halves of the
 * heading slide in from the sides, the photo card grows in behind them, and
 * the caption rises in last. Tied to scroll position, so it reverses when
 * scrolling back up. Reduced-motion users see the final state.
 *
 * Progress runs from the block's top entering the bottom of the viewport (0)
 * to the block's centre reaching the viewport centre (1).
 */
export function GapReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.6, restDelta: 0.0005 });
  const finished = useMotionValue(1);
  const progress = reduceMotion ? finished : smooth;

  const leftX = useTransform(progress, [0, 0.7], ['-45vw', '0vw']);
  const rightX = useTransform(progress, [0, 0.7], ['45vw', '0vw']);
  const headingOpacity = useTransform(progress, [0, 0.5], [0, 1]);

  const cardScale = useTransform(progress, [0.25, 0.85], [0.4, 1]);
  const cardOpacity = useTransform(progress, [0.25, 0.7], [0, 0.85]);

  const captionOpacity = useTransform(progress, [0.7, 1], [0, 1]);
  const captionY = useTransform(progress, [0.7, 1], [24, 0]);

  return (
    <div
      ref={ref}
      className="mx-auto flex min-h-screen w-full flex-col items-center px-5 pb-20 pt-[120px] text-center sm:px-8 sm:pt-32"
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
  );
}
