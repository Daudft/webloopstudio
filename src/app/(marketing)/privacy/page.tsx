import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { constructMetadata } from '@/lib/metadata';
import { LegalPage } from '@/components/common/legal-page';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy',
  description:
    'How Webloop Studio collects, uses and protects personal data from our website, contact form, call bookings and analytics, and how to exercise your privacy rights.',
  path: '/privacy',
});

const UPDATED = '17 September 2026';

// TODO(content): this is a template, not legal advice. Have it reviewed, and update it whenever
// the tools you use change (hosting, email, analytics, booking).
export default function PrivacyPage() {
  const email = siteConfig.contact.email;
  const mailto = <a href={`mailto:${email}`}>{email}</a>;

  return (
    <LegalPage
      label="Privacy"
      title="Privacy Policy"
      updated={UPDATED}
      intro={
        <p>
          This policy explains what personal data {siteConfig.name} (&quot;we&quot;, &quot;us&quot;) collects when you visit{' '}
          {siteConfig.url.replace(/^https?:\/\//, '')}, contact us or book a call, why we collect it, and the choices you
          have. We keep it short and collect as little as we can.
        </p>
      }
      sections={[
        {
          heading: 'Who we are',
          body: (
            <p>
              {siteConfig.name} is a digital studio run by {siteConfig.founder}, based in Pakistan and working with clients
              worldwide. We are the controller of the personal data described here. For any privacy question or request,
              email {mailto}.
            </p>
          ),
        },
        {
          heading: 'What we collect',
          body: (
            <>
              <p>
                <strong>When you send the contact form:</strong> your name, email address, company (optional), the service
                you&apos;re interested in, your budget range and your message. With each message we also record the date
                and time, your IP address and your browser&apos;s user agent, to help prevent spam and abuse.
              </p>
              <p>
                <strong>When you book a call:</strong> bookings are handled by Calendly on their site. Calendly collects the
                details you enter there (such as your name, email and chosen time) and shares them with us so we can hold
                the call, which takes place on Zoom.
              </p>
              <p>
                <strong>Analytics (only if you accept cookies):</strong> pages visited, time on the site, approximate
                location (country or city), device and browser type, and how you arrived at the site. This is collected by
                Google Analytics and does not tell us who you are.
              </p>
              <p>
                <strong>Technical logs:</strong> our hosting provider automatically processes basic request data, such as IP
                address and browser type, to deliver and secure the website.
              </p>
            </>
          ),
        },
        {
          heading: 'Why we use it',
          body: (
            <ul>
              <li>To reply to your inquiry, prepare a proposal and, if we work together, deliver the project.</li>
              <li>To schedule and hold calls you book.</li>
              <li>To understand how the website is used so we can improve it (only with your consent).</li>
              <li>To keep the website and contact form secure and free of spam.</li>
            </ul>
          ),
        },
        {
          heading: 'Legal basis (for visitors in the EU and UK)',
          body: (
            <ul>
              <li>
                <strong>Consent</strong> for analytics cookies. You can withdraw it at any time with &quot;Cookie
                settings&quot; in the footer.
              </li>
              <li>
                <strong>Steps before a contract</strong> when you ask us about a project or book a call.
              </li>
              <li>
                <strong>Legitimate interests</strong> for security, spam prevention and keeping basic business records.
              </li>
            </ul>
          ),
        },
        {
          heading: 'Cookies',
          body: (
            <p>
              The website works without cookies. We only use Google Analytics cookies (named <code>_ga</code> and{' '}
              <code>_ga_*</code>) if you press &quot;Accept&quot; in the cookie banner. If you press &quot;Reject&quot;,
              Google Analytics is not loaded. Your choice itself is saved in your browser&apos;s local storage so we
              don&apos;t ask again, and you can change it at any time from &quot;Cookie settings&quot; in the footer.
            </p>
          ),
        },
        {
          heading: 'Who we share it with',
          body: (
            <>
              <p>We never sell your data. We only share it with services that help us run the studio:</p>
              <ul>
                <li>
                  <strong>Google (Gmail)</strong>: contact form messages are delivered to our inbox by email.
                </li>
                <li>
                  <strong>Google Analytics</strong>: website usage statistics, only with your consent.
                </li>
                <li>
                  <strong>Calendly and Zoom</strong>: call booking and video calls.
                </li>
                <li>
                  <strong>Our hosting provider</strong>: to serve the website.
                </li>
              </ul>
              <p>
                Some of these providers are based outside your country, including in the United States. Where required,
                they protect transfers with safeguards such as standard contractual clauses. We may also disclose data if
                the law requires it.
              </p>
            </>
          ),
        },
        {
          heading: 'How long we keep it',
          body: (
            <ul>
              <li>Inquiries that don&apos;t lead to a project: up to 24 months, then deleted.</li>
              <li>Client correspondence and project records: as long as needed for the project and legal or tax duties.</li>
              <li>Analytics data: kept by Google Analytics for up to 14 months.</li>
            </ul>
          ),
        },
        {
          heading: 'Your rights',
          body: (
            <>
              <p>
                Depending on where you live (for example under the GDPR in the EU and UK, or the CCPA in California), you
                can ask us to:
              </p>
              <ul>
                <li>tell you what data we hold about you and give you a copy;</li>
                <li>correct it or delete it;</li>
                <li>restrict or object to how we use it;</li>
                <li>withdraw your consent to analytics at any time.</li>
              </ul>
              <p>
                Email {mailto} and we&apos;ll respond within 30 days. You also have the right to complain to your local data
                protection authority.
              </p>
            </>
          ),
        },
        {
          heading: 'Security',
          body: (
            <p>
              The website is served over HTTPS, the contact form has spam and rate-limit protection, and access to messages
              is limited to us. No method of transmission or storage is completely secure, but we take reasonable steps to
              protect your data.
            </p>
          ),
        },
        {
          heading: 'Changes to this policy',
          body: (
            <p>
              We may update this policy when our services or the tools we use change. The date at the top shows the latest
              version. See also our <Link href="/terms">Terms &amp; Conditions</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
