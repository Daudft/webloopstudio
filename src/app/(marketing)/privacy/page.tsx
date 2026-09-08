import { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy',
  description: `Privacy policy and data protection practices for ${siteConfig.name}.`,
});

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-12">Last Updated: January 1, 2026</p>

        <div className="space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Overview</h2>
            <p>
              At {siteConfig.name}, we are committed to safeguarding the privacy and security of our clients and site visitors. This Privacy Policy details how we collect, handle, and protect your information when interacting with our website and digital services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Information We Collect</h2>
            <p>
              We collect information that you directly provide when submitting inquiry forms, such as your full name, email address, company name, and project scope details. We also collect anonymized telemetry data (browser type, device type, load speeds) to optimize site performance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. How We Use Information</h2>
            <p>
              Your data is solely used to evaluate project requests, communicate proposals, provide technical consulting, and maintain client accounts. We never sell, lease, or monetize your contact or project data with third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. Contact Us</h2>
            <p>
              For inquiries concerning your data rights or this policy, please reach out to us at{' '}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-purple-400 underline">
                {siteConfig.contact.email}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
