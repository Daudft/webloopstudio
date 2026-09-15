'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  /** Opacity of words that have not been scrolled to yet. */
  dimOpacity?: number;
}

/**
 * Paragraph whose words brighten one after another as it scrolls up the
 * viewport, and dim again when scrolling back. Progress is tied directly to
 * scroll position, so it works in both directions.
 *
 * Starts when the top of the paragraph reaches 85% down the viewport and
 * finishes when its bottom reaches 45%. Reduced-motion users get plain text.
 */
export function ScrollRevealText({ text, className, dimOpacity = 0.2 }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });

  if (reduceMotion) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  const words = text.split(' ');

  return (
    <p ref={ref} className={cn('relative', className)}>
      {words.map((word, index) => (
        <Word
          key={`${word}-${index}`}
          progress={scrollYProgress}
          range={[index / words.length, (index + 1) / words.length]}
          dimOpacity={dimOpacity}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  dimOpacity: number;
}

function Word({ children, progress, range, dimOpacity }: WordProps) {
  const opacity = useTransform(progress, range, [dimOpacity, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </>
  );
}
