import Image from 'next/image';
import { ScrollRevealText } from '@/components/animations/scroll-reveal-text';
import { GapReveal } from '@/components/sections/gap-reveal';
import { StickyUntilEnd } from '@/components/animations/sticky-until-end';

export function IntroSection() {
  return (
    <section className="intro-section bg-ink bg-grain text-white" style={{ overflowX: 'clip' }}>
      {/* overflow-x: clip (not hidden) so the sticky blocks inside keep working. */}
      {/*
        One column on phones; a narrow label column from md so the statement keeps a readable
        width on tablets and small laptops; the original 500px label column from xl. On very wide
        screens the two columns are centred instead of leaving a large gap on the right.
      */}
      <StickyUntilEnd className="mx-auto grid min-h-svh w-full grid-cols-1 gap-8 border-b border-white/15 px-5 pb-40 pt-28 sm:px-12 sm:pb-48 sm:pt-32 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[500px_minmax(0,760px)] 2xl:justify-center [@media(max-height:500px)]:pb-24 [@media(max-height:500px)]:pt-20">
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
                className: 'text-pretty text-[clamp(28px,4.2vw,52px)] font-bold leading-[1.08] tracking-[-0.035em]',
                text: "Your business has outgrown the website you built it on. Whether you're a small business finally ready to look the part, or a startup that's already proven the product the website is usually the last thing to catch up.",
              },
              {
                className: 'text-pretty mt-5 text-[clamp(28px,4.2vw,52px)] font-bold leading-[1.08] tracking-[-0.035em]',
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