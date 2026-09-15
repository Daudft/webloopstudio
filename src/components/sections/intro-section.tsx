import Image from 'next/image';

export function IntroSection() {
  return (
    <section className="intro-section overflow-hidden bg-ink bg-grain text-white">
      <div className="mx-auto grid min-h-screen w-full grid-cols-1 gap-8 border-b border-white/15 px-5 pb-12 pt-28 sm:grid-cols-[340px_minmax(0,1fr)] sm:gap-10 sm:px-12 sm:pt-32 lg:grid-cols-[500px_minmax(0,760px)]">
        <div className="self-start">
          <p className="font-sora text-[14px] font-medium uppercase leading-[1.35] tracking-[0.28em] text-white/90">
            Who we work with
          </p>
          <p className="mt-2 max-w-[180px] font-montserrat text-[12px] leading-[1.35] tracking-[0.03em] text-white/70">
            Small businesses, startups, and growing teams
          </p>
        </div>
        <div className="self-start min-w-0 max-w-[900px] text-left font-commissioner">
          <p className="text-pretty text-[32px] font-bold leading-[1.08] tracking-[-0.035em] sm:text-[44px] lg:text-[52px]">
            Your business has outgrown the website you built it on. Whether you&apos;re a small business finally ready to look the part, or a startup that&apos;s already proven the product the website is usually the last thing to catch up.
          </p>
          <p className="text-pretty mt-5 text-[32px] font-bold leading-[1.08] tracking-[-0.035em] sm:text-[44px] lg:text-[52px]">
            That gap costs more than looks. It costs the confidence customers need before they trust you with their money.
          </p>
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
      </div>

      <div className="mx-auto flex min-h-screen w-full flex-col items-center px-5 pb-20 pt-[120px] text-center sm:px-8 sm:pt-32">
        <div className="relative flex w-full flex-1 items-center justify-center">
          <h2 className="relative z-10 flex flex-row items-center gap-3 whitespace-nowrap font-sora text-[42px] font-extrabold leading-none tracking-[-0.06em] sm:gap-6 sm:text-[80px] lg:text-[112px]">
            <span>WE CLOSE</span>
            <span>THAT GAP</span>
          </h2>
          <div className="absolute left-1/2 top-1/2 z-0 h-[112px] w-[82px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl opacity-85 shadow-xl ring-1 ring-white/20 sm:h-[170px] sm:w-[124px] lg:h-[220px] lg:w-[160px]" aria-hidden="true">
            <Image
              src="/images/founder.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 160px, (min-width: 640px) 124px, 82px"
              className="object-cover object-[center_28%]"
            />
          </div>
        </div>
        <p className="mx-auto mt-auto mb-10 max-w-[250px] text-center font-montserrat text-[11px] font-medium leading-[1.45] tracking-[0.02em] text-white/85 sm:mb-14 sm:max-w-[340px] sm:text-[13px]">
          A Website Is Often The First Real Impression Of Your Business. We Take What Makes You Worth Choosing And Build An Experience That Shows It. Before Anyone Reads A Single Word.
        </p>
      </div>
    </section>
  );
}