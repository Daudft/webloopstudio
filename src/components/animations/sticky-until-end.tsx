'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface StickyUntilEndProps {
  children: React.ReactNode;
  className?: string;
}

/** How far the block shrinks and darkens once the next block fully covers it. */
const COVERED_SCALE = 0.94;
const COVERED_DIM = 0.55;

/**
 * Scrolls normally until its bottom edge reaches the bottom of the viewport,
 * then stays put so the next block can slide up and cover it. While it is
 * being covered it shrinks slightly and darkens, so the covering block reads
 * clearly as a new layer coming up over it.
 *
 * Works for content taller than the screen: the sticky `top` is
 * `viewport height - element height` (never above 0), so it pins by its bottom.
 * Assumes it is the first child of its parent and that the covering block
 * follows it directly. Requires no ancestor with overflow hidden/auto/scroll
 * (use overflow: clip).
 */
export function StickyUntilEnd({ children, className }: StickyUntilEndProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);
  const reduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  // Scroll position at which the block pins, and one viewport of cover distance.
  const pinAt = useMotionValue(Number.POSITIVE_INFINITY);
  const viewportHeight = useMotionValue(1);

  const covered = useTransform(() => {
    const amount = (scrollY.get() - pinAt.get()) / viewportHeight.get();
    return Math.min(1, Math.max(0, amount));
  });
  const scale = useTransform(covered, [0, 1], [1, COVERED_SCALE]);
  const dim = useTransform(covered, [0, 1], [0, COVERED_DIM]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => {
      const height = element.offsetHeight;
      const viewport = window.innerHeight;
      setTop(Math.min(0, viewport - height));

      const parent = element.parentElement;
      const parentTop = parent ? parent.getBoundingClientRect().top + window.scrollY : 0;
      pinAt.set(parentTop + Math.max(0, height - viewport));
      viewportHeight.set(viewport);
    };
    update();

    // Mobile browsers fire resize when the address bar collapses or expands while
    // scrolling. Re-measuring then made the pinned block jump, so ignore resizes
    // where only the height changed by a toolbar's worth.
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;
    const onWindowResize = () => {
      const widthChanged = window.innerWidth !== lastWidth;
      const heightJump = Math.abs(window.innerHeight - lastHeight) >= 120;
      if (!widthChanged && !heightJump) return;
      lastWidth = window.innerWidth;
      lastHeight = window.innerHeight;
      update();
    };

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(element);
    window.addEventListener('resize', onWindowResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', onWindowResize);
    };
  }, [pinAt, viewportHeight]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        position: 'sticky',
        top,
        scale: reduceMotion ? 1 : scale,
        transformOrigin: '50% 100%',
      }}
    >
      {children}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: '#000', opacity: dim }}
        />
      )}
    </motion.div>
  );
}
