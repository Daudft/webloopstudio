'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { X } from 'lucide-react';

const principles = [
  ['Outcomes first, taste second', 'Every creative decision we make is interrogated against one question: does this actually serve your growth?'],
  ['All in or nothing', "We take on fewer projects so we can give each one everything. When we commit to your brand, we're fully present, fully invested, fully responsible for the result."],
  ['Human-first, always', 'Behind every brand is a person with a real story and real stakes. We never lose sight of that. The most powerful digital experiences are the ones that feel unmistakably human.'],
  ['Intention over speed', 'Rushed work compounds into regret. We move at the pace the work demands. Every layer earns its place before we move to the next.'],
] as const;

export function AboutOverlay() {
  const router = useRouter();
  const close = useCallback(() => router.push('/'), [router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    document.body.classList.add('about-overlay-open');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('about-overlay-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [close]);

  return (
    <div className="fixed inset-0 z-[60] flex bg-[#090b0d]/90 backdrop-blur-[7px]" role="dialog" aria-modal="true" aria-labelledby="about-heading">
      <div className="relative hidden flex-1 overflow-hidden lg:block" aria-hidden="true">
        <Image src="/IMG_20230423_200749.jpg.jpeg" alt="" fill sizes="45vw" className="object-cover opacity-20 grayscale blur-[5px]" />
        <div className="absolute inset-0 bg-[#080b0d]/75" />
        <p className="absolute bottom-10 left-10 max-w-sm font-display text-5xl font-bold uppercase leading-[0.9] tracking-[-0.07em] text-white/20 xl:text-7xl">
          Make the invisible impossible to ignore.
        </p>
      </div>

      <section className="relative h-full w-full overflow-y-auto bg-[#f0f0ec] text-[#111315] shadow-[-18px_0_60px_rgba(0,0,0,0.3)] lg:w-[min(57vw,920px)] lg:min-w-[620px]">
        <button
          type="button"
          onClick={close}
          aria-label="Close about page"
          className="absolute right-5 top-5 z-10 inline-flex h-8 items-center gap-2 bg-[#101214] px-3 font-mono text-[11px] font-bold uppercase text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111315] focus-visible:ring-offset-2"
        >
          Close <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>

        <div className="px-7 pb-16 pt-8 sm:px-12 sm:pt-9 lg:px-14">
          <div className="mb-14 flex items-center gap-3 pr-24">
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
            <Image src="/IMG_20230423_200749.jpg.jpeg" alt="Daud Afzal, founder of Webloop Studio" fill sizes="(min-width: 1024px) 920px, 100vw" className="object-cover" priority />
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
        </div>
      </section>
    </div>
  );
}
