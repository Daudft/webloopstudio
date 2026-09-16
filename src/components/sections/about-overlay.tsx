'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const principles = [
  ['Outcomes first, taste second', 'Every creative decision we make is interrogated against one question: does this actually serve your growth?'],
  ['All in or nothing', "We take on fewer projects so we can give each one everything. When we commit to your brand, we're fully present, fully invested, fully responsible for the result."],
  ['Human-first, always', 'Behind every brand is a person with a real story and real stakes. We never lose sight of that. The most powerful digital experiences are the ones that feel unmistakably human.'],
  ['Intention over speed', 'Rushed work compounds into regret. We move at the pace the work demands. Every layer earns its place before we move to the next.'],
] as const;

function blurActiveElement() {
  if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
}

interface AboutOverlayProps {
  /**
   * 'modal': opened by clicking an About link. The page you came from stays mounted
   * underneath (see app/@modal/(.)about), so closing goes back to it at the same scroll position.
   * 'page': /about loaded directly. The homepage is rendered underneath, and closing goes to '/'.
   */
  mode?: 'modal' | 'page';
}

export function AboutOverlay({ mode = 'page' }: AboutOverlayProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  // Closing plays the slide-out first; navigation happens when it finishes.
  const [closing, setClosing] = useState(false);
  const close = useCallback(() => setClosing(true), []);
  const duration = reduceMotion ? 0 : 0.8;

  const finishClose = useCallback(() => {
    blurActiveElement();
    if (mode === 'modal') router.back();
    else router.push('/', { scroll: false });
  }, [mode, router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    // The About link that opened this keeps focus underneath; pressing Esc would then
    // draw its keyboard focus outline after closing. Drop that focus up front.
    blurActiveElement();
    if (mode === 'page') router.prefetch('/');
    document.body.classList.add('about-overlay-open');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('about-overlay-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [close, mode, router]);

  return (
    <div
      className="fixed inset-0 z-[90] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-heading"
      data-nav-ignore=""
    >
      {/* The page underneath blurs and dims while the card comes in, and clears as it leaves. Clicking it does nothing: only Close or Esc close the overlay. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        initial={{ backgroundColor: 'rgba(9, 11, 13, 0)', backdropFilter: 'blur(0px)' }}
        animate={
          closing
            ? { backgroundColor: 'rgba(9, 11, 13, 0)', backdropFilter: 'blur(0px)' }
            : { backgroundColor: 'rgba(9, 11, 13, 0.45)', backdropFilter: 'blur(10px)' }
        }
        transition={{ duration, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Card slides in from the right edge, and back out before navigating home. */}
      <motion.section
        className="relative h-full w-full overflow-y-auto bg-[#f0f0ec] text-[#111315] shadow-[-18px_0_60px_rgba(0,0,0,0.3)] lg:w-[min(57vw,920px)] lg:min-w-[620px]"
        initial={{ x: '100%' }}
        animate={{ x: closing ? '100%' : '0%' }}
        transition={{ duration, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => {
          if (closing) finishClose();
        }}
      >
        {/* One button: click it, or press Esc (handled by the keydown listener above). */}
        <button
          type="button"
          onClick={close}
          aria-label="Close about page"
          aria-keyshortcuts="Escape"
          className="absolute right-5 top-5 z-10 inline-flex h-9 items-center gap-3 rounded-[4px] bg-[#101214] pl-3 pr-1.5 font-sans text-[15px] font-semibold tracking-[-0.02em] text-white transition-colors duration-300 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111315] focus-visible:ring-offset-2"
        >
          Close
          <kbd className="flex h-6 items-center rounded-[3px] border border-white/15 bg-white/15 px-1.5 font-sans text-[8px] font-semibold uppercase tracking-[0.04em] text-white/70">
            Esc
          </kbd>
        </button>

        <motion.div
          className="px-7 pb-16 pt-8 sm:px-12 sm:pt-9 lg:px-14"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: duration * 0.9, ease: [0.22, 1, 0.36, 1], delay: duration * 0.35 }}
        >
          <div className="mb-14 flex items-center gap-3 pr-32">
            <span className="h-3 w-3 rounded-full bg-[#999b95]" aria-hidden="true" />
            <h1 id="about-heading" className="font-sans text-sm font-bold text-[#111315]">About the studio</h1>
          </div>

          <div className="max-w-[620px] space-y-7 font-sans text-[18px] font-semibold leading-[1.08] tracking-[-0.045em] sm:text-[21px]">
            <p>Hey, we&apos;re Webloop. We started this studio because we watched exceptional founders stay invisible because their presence never caught up to who they&apos;d become despite the scale of their ambition.</p>
            {/* TODO(content): replace the placeholder reach figure below with a real one, or drop the clause. */}
            <p>That gap became an obsession. We&apos;ve spent years breaking down what separates forgettable digital presence from work that actually moves people, thinking that&apos;s reached over 60,000 creatives and shapes every project we take on.</p>
            <p>When we work with founders, we are immersed in your story, ruthless about what moves people, and built to close the gap between who you are and how the world sees you.</p>
          </div>

          <div className="mt-28 grid grid-cols-2 border-t border-[#bfc0bb] pt-3 font-mono text-[9px] uppercase text-[#686964]">
            {/* TODO(content): confirm founding year. */}
            <span>Est 2025</span>
            <span className="text-right">Based worldwide</span>
          </div>

          <div className="relative mt-5 aspect-[0.82] overflow-hidden bg-[#b9b0a3] sm:aspect-[1.05]">
            <Image src="/images/founder.jpg" alt="Daud Afzal, founder of Webloop Studio" fill sizes="(min-width: 1024px) 920px, 100vw" className="object-cover" priority />
            <span className="absolute left-7 top-7 font-display text-5xl font-semibold tracking-[-0.08em] text-white sm:text-7xl" aria-hidden="true">listen</span>
            <span className="absolute right-7 top-[38%] font-display text-5xl font-semibold tracking-[-0.08em] text-white sm:text-7xl" aria-hidden="true">create</span>
            <span className="absolute bottom-[24%] left-7 font-display text-5xl font-semibold tracking-[-0.08em] text-white sm:text-7xl" aria-hidden="true">obsess</span>
          </div>

          <div className="mt-16 grid gap-8 border-t border-[#bfc0bb] pt-4 sm:grid-cols-[minmax(140px,0.7fr)_1.3fr]">
            <h2 className="font-sans text-lg font-bold">Our principles</h2>
            <div>
              {principles.map(([title, description]) => (
                <article key={title} className="border-b border-[#c7c8c2] py-1 pb-7 pt-0 [&+article]:pt-7">
                  <h3 className="font-sans text-[15px] font-bold">{title}</h3>
                  <p className="mt-3 font-sans text-[15px] leading-[1.18] text-[#5f615e]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
