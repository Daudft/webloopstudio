import { FadeIn } from '@/components/animations/fade-in';

interface LegalPageProps {
  label: string;
  title: string;
  updated: string;
  intro: React.ReactNode;
  sections: { heading: string; body: React.ReactNode }[];
}

/**
 * Shared layout for the Privacy Policy and Terms pages: the site's paper surface and label column,
 * with a readable single text column (about 70 characters per line).
 */
export function LegalPage({ label, title, updated, intro, sections }: LegalPageProps) {
  return (
    <div
      className="bg-grain pb-24 pt-[120px] text-black sm:pb-32 sm:pt-[170px] [@media(max-height:500px)]:pt-24"
      style={{ backgroundColor: '#e6e5e0' }}
    >
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-0">
        <div>
          <FadeIn>
            <p className="flex items-center gap-3 font-montserrat text-[15px] font-semibold tracking-[-0.02em] text-black">
              <span className="h-2.5 w-2.5 rounded-full bg-black/45" aria-hidden="true" />
              {label}
            </p>
          </FadeIn>
        </div>

        <article className="max-w-[720px]">
          <FadeIn delay={0.05}>
            <h1
              className="font-sora font-semibold text-black"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', lineHeight: 0.95, letterSpacing: '-0.06em' }}
            >
              {title}
            </h1>
            <p className="mt-5 font-montserrat text-[13px] font-semibold uppercase tracking-[0.12em] text-black/50">
              Last updated: {updated}
            </p>
            <div className="mt-8 font-montserrat text-[16px] font-medium leading-[1.65] text-black/75">{intro}</div>
          </FadeIn>

          <div className="mt-14 space-y-12">
            {sections.map((section, index) => (
              <section key={section.heading} aria-labelledby={`legal-section-${index}`}>
                <h2
                  id={`legal-section-${index}`}
                  className="font-sora text-[22px] font-semibold leading-[1.15] text-black sm:text-[24px]"
                  style={{ letterSpacing: '-0.04em' }}
                >
                  {index + 1}. {section.heading}
                </h2>
                <div className="mt-4 space-y-4 font-montserrat text-[15px] font-medium leading-[1.7] text-black/75 [&_a]:text-black [&_a]:underline [&_a]:decoration-black/30 [&_a]:underline-offset-4 [&_a:hover]:decoration-black [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
