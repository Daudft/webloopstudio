import Image from 'next/image';
import { ScrollRevealText } from '@/components/animations/scroll-reveal-text';
import { GapReveal } from '@/components/sections/gap-reveal';
import { StickyUntilEnd } from '@/components/animations/sticky-until-end';

export function IntroSection() {
  return (
    <section className="intro-section bg-ink bg-grain text-white" style={{ overflowX: 'clip' }}>
      {/* overflow-x: clip (not hidden) so the sticky blocks inside keep working. */}
      <StickyUntilEnd className="mx-auto grid min-h-screen w-full grid-cols-1 gap-8 border-b border-white/15 px-5 pb-40 pt-28 sm:pb-48 sm:grid-cols-[340px_minmax(0,1fr)] sm:gap-10 sm:px-12 sm:pt-32 lg:grid-cols-[500px_minmax(0,760px)]">
        <div className="self-start">
          <p className="font-sora text-[14px] font-medium uppercase leading-[1.35] tracking-[0.28em] text-white/90">
            Who we work with
          </p>
          <p className="mt-2 max-w-[180px] font-montserrat text-[12px] leading-[1.35] tracking-[0.03em] text-white/70">
            Small businesses, startups, and growing teams
          </p>
        </div>
        <div className="self-start min-w-0 max-w-[900px] text-left font-commissioner">
          <ScrollRevealText
            paragraphs={[
              {
                className: 'text-pretty text-[32px] font-bold leading-[1.08] tracking-[-0.035em] sm:text-[44px] lg:text-[52px]',
                text: "Your business has outgrown the website you built it on. Whether you're a small business finally ready to look the part, or a startup that's already proven the product the website is usually the last thing to catch up.",
              },
              {
                className: 'text-pretty mt-5 text-[32px] font-bold leading-[1.08] tracking-[-0.035em] sm:text-[44px] lg:text-[52px]',
                text: 'That gap costs more than looks. It costs the confidence customers need before they trust you with their money.',
              },
            ]}
          />
          <div className="mt-10 flex items-center gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-white/30">
              <Image
                src="/images/founder.jpg"
                alt="Daud Afzal"
                fill
                sizes="56px"
                className="object-cover object-[center_28%]"
              />
            </div>
            <div className="font-montserrat text-[11px] leading-[1.3] text-white/85">
              <p>Daud Afzal</p>
              <p>Founder, WEBLOOP</p>
            </div>
          </div>
        </div>
      </StickyUntilEnd>

      <GapReveal />
    </section>
  );
}