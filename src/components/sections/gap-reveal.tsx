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
 * Total scroll length of the pinned panel. The extra beyond one screen is the animation.
 * svh (small viewport height) so mobile address bars don't hide the bottom of the panel.
 */
const PIN_HEIGHT = '280svh';

/*
 * Height-aware sizing (classes below). Three tiers with mutually exclusive media queries, so they
 * never fight each other. Class names are written out in full because Tailwind only generates
 * classes it can find literally in the source.
 * - max-height 560: phone landscape. Heading in one row, small photo, tight padding.
 * - 561-700 tall and below 1024 wide: small portrait phones. Smaller photo and padding so the caption fits.
 * - 1024+ wide and 561-760 tall: short laptops like 1280x720. Slightly smaller photo and top padding.
 */

/**
 * "WE CLOSE THAT GAP" panel.
 *
 * 1. It slides up over the (now sticky) paragraph block above it as an empty
 *    dark panel, until it covers the screen.
 * 2. It then pins for the remaining scroll length while the photo grows in at
 *    the centre, the heading halves slide in from the sides to sit either side
 *    of it, and the caption rises in last. The final state holds briefly
 *    before the page moves on.
 *
 * Layout: WE CLOSE · photo · THAT GAP in one row from lg up (and on short
 * landscape phones), stacked on other smaller screens. Everything is tied to scroll position, so it reverses when scrolling
 * up. Reduced-motion users see the final state.
 */
export function GapReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // 0 as soon as the panel starts covering the screen (15%), 1 at the end of the pin.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.6, restDelta: 0.0005 });
  const finished = useMotionValue(1);
  const progress = reduceMotion ? finished : smooth;

  const leftX = useTransform(progress, [0, 0.5], ['-45vw', '0vw']);
  const rightX = useTransform(progress, [0, 0.5], ['45vw', '0vw']);
  const headingOpacity = useTransform(progress, [0, 0.35], [0, 1]);

  const cardScale = useTransform(progress, [0, 0.45], [0.4, 1]);
  const cardOpacity = useTransform(progress, [0, 0.35], [0, 1]);

  const captionOpacity = useTransform(progress, [0.5, 0.75], [0, 1]);
  const captionY = useTransform(progress, [0.5, 0.75], [24, 0]);

  return (
    <div
      ref={ref}
      className="relative z-10 bg-ink bg-grain"
      style={{
        height: PIN_HEIGHT,
        // Straight leading edge with a fine highlight line, so the panel reads as a new layer.
        borderTop: '1px solid rgba(255, 255, 255, 0.14)',
        boxShadow: '0 -40px 90px rgba(0, 0, 0, 0.65)',
      }}
    >
      <div
        className="flex w-full flex-col items-center overflow-hidden px-5 pb-20 pt-[120px] text-center sm:px-8 sm:pt-32 [@media(max-height:560px)]:pb-4 [@media(max-height:560px)]:pt-16 [@media(min-height:561px)_and_(max-height:700px)_and_(max-width:1023px)]:pb-10 [@media(min-height:561px)_and_(max-height:700px)_and_(max-width:1023px)]:pt-24 [@media(min-width:1024px)_and_(min-height:561px)_and_(max-height:760px)]:pt-24"
        style={{ position: 'sticky', top: 0, height: '100svh' }}
      >
        <div className="flex w-full flex-1 items-center justify-center">
          {/* Font size follows the smaller of width and height, so short screens get a smaller heading too. */}
          <h2 className="flex flex-col items-center gap-5 whitespace-nowrap font-sora text-[clamp(2.4rem,min(7.2vw,11svh),7rem)] font-extrabold leading-none tracking-[-0.06em] lg:flex-row lg:gap-8 [@media(max-height:560px)]:flex-row [@media(max-height:560px)]:gap-5">
            <motion.span style={{ x: leftX, opacity: headingOpacity }}>WE CLOSE</motion.span>
            <motion.span
              aria-hidden="true"
              style={{ scale: cardScale, opacity: cardOpacity }}
              className="relative block h-[150px] w-[110px] shrink-0 overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/20 sm:h-[205px] sm:w-[150px] lg:h-[260px] lg:w-[190px] [@media(max-height:560px)]:h-[110px] [@media(max-height:560px)]:w-[80px] [@media(min-height:561px)_and_(max-height:700px)_and_(max-width:1023px)]:h-[120px] [@media(min-height:561px)_and_(max-height:700px)_and_(max-width:1023px)]:w-[88px] [@media(min-width:1024px)_and_(min-height:561px)_and_(max-height:760px)]:h-[200px] [@media(min-width:1024px)_and_(min-height:561px)_and_(max-height:760px)]:w-[146px]"
            >
              <Image
                src="/images/founder.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 190px, (min-width: 640px) 150px, 110px"
                className="object-cover object-[center_28%]"
              />
            </motion.span>
            <motion.span style={{ x: rightX, opacity: headingOpacity }}>THAT GAP</motion.span>
          </h2>
        </div>
        <motion.p
          style={{ opacity: captionOpacity, y: captionY }}
          className="mx-auto mb-10 mt-auto max-w-[250px] text-center font-montserrat text-[11px] font-medium leading-[1.45] tracking-[0.02em] text-white/85 sm:mb-14 sm:max-w-[340px] sm:text-[13px] 2xl:max-w-[420px] 2xl:text-[15px] [@media(max-height:560px)]:mb-2 [@media(max-height:560px)]:max-w-[520px] [@media(max-height:560px)]:text-[11px] [@media(min-height:561px)_and_(max-height:700px)_and_(max-width:1023px)]:mb-4 [@media(min-width:1024px)_and_(min-height:561px)_and_(max-height:760px)]:mb-8"
        >
          A Website Is Often The First Real Impression Of Your Business. We Take What Makes You Worth Choosing And Build An Experience That Shows It. Before Anyone Reads A Single Word.
        </motion.p>
      </div>
    </div>
  );
}
