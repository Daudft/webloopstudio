import { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = constructMetadata({
  title: 'Terms of Service',
  description: `Terms and conditions for utilizing services from ${siteConfig.name}.`,
});

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-12">Last Updated: January 1, 2026</p>

        <div className="space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing our website or retaining services from {siteConfig.name}, you agree to abide by these Terms of Service and all relevant contractual statements of work.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Intellectual Property & Code Ownership</h2>
            <p>
              Upon complete settlement of agreed project fees, all bespoke code, design assets, and custom architectures created specifically for the client transfer to full client ownership as specified in individual master service agreements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. Limitation of Liability</h2>
            <p>
              While {siteConfig.name} maintains the highest engineering rigor, our digital consultancy shall not be liable for indirect, incidental, or consequential damages resulting from third-party hosting outages or unauthorized external tampering.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
