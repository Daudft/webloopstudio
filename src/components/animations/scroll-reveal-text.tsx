'use client';

import { Fragment, useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';

interface RevealParagraph {
  text: string;
  className?: string;
}

interface ScrollRevealTextProps {
  /** Paragraphs reveal in order on one shared scroll timeline. */
  paragraphs: RevealParagraph[];
  className?: string;
  /** Opacity of words that have not been scrolled to yet. */
  dimOpacity?: number;
}

/**
 * How many words fade at the same time. Larger values blend neighbouring
 * words into a softer, smoother wave.
 */
const OVERLAP_WORDS = 6;

/**
 * Words brighten one after another as the block scrolls up the viewport, and
 * dim again when scrolling back. All paragraphs share one progress value, so
 * the first paragraph fully reveals before the second begins.
 *
 * Starts when the top of the block reaches 85% down the viewport and finishes
 * when its bottom reaches 50%. Scroll progress is spring-smoothed. Reduced-motion
 * users get plain text.
 */
export function ScrollRevealText({ paragraphs, className, dimOpacity = 0.2 }: ScrollRevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // Finishes when the block's bottom reaches the bottom of the viewport, so it is
  // complete before the surrounding block pins (see StickyUntilEnd).
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 1'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.6, restDelta: 0.0005 });

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={paragraph.className}>
            {paragraph.text}
          </p>
        ))}
      </div>
    );
  }

  const split = paragraphs.map((paragraph) => paragraph.text.split(' '));
  const totalWords = split.reduce((sum, words) => sum + words.length, 0);
  const span = totalWords + OVERLAP_WORDS;
  let globalIndex = 0;

  return (
    <div ref={ref} className={className} style={{ position: 'relative' }}>
      {split.map((words, paragraphIndex) => (
        <p key={paragraphIndex} className={paragraphs[paragraphIndex].className}>
          {words.map((word, wordIndex) => {
            const index = globalIndex++;
            return (
              <Fragment key={wordIndex}>
                <Word
                  progress={progress}
                  range={[index / span, (index + OVERLAP_WORDS) / span]}
                  dimOpacity={dimOpacity}
                >
                  {word}
                </Word>{' '}
              </Fragment>
            );
          })}
        </p>
      ))}
    </div>
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
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}
