import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { constructMetadata } from '@/lib/metadata';
import { LegalPage } from '@/components/common/legal-page';

export const metadata: Metadata = constructMetadata({
  title: 'Terms & Conditions',
  description:
    'The terms for using the Webloop Studio website, including intellectual property, project inquiries, portfolio content, liability and governing law.',
  path: '/terms',
});

const UPDATED = '17 September 2026';

// TODO(content): this is a template, not legal advice. Have it reviewed. Project work itself should
// always be covered by a separate written proposal or contract.
export default function TermsPage() {
  const email = siteConfig.contact.email;
  const site = siteConfig.url.replace(/^https?:\/\//, '');

  return (
    <LegalPage
      label="Terms"
      title="Terms & Conditions"
      updated={UPDATED}
      intro={
        <p>
          These terms apply to your use of {site} (the &quot;website&quot;), operated by {siteConfig.name}, run by{' '}
          {siteConfig.founder}. By using the website you agree to them. If you don&apos;t agree, please don&apos;t use the
          website.
        </p>
      }
      sections={[
        {
          heading: 'Using the website',
          body: (
            <>
              <p>You may browse the website and contact us for lawful purposes. You agree not to:</p>
              <ul>
                <li>send spam, false information or harmful code through the contact form;</li>
                <li>try to disrupt, overload or gain unauthorised access to the website;</li>
                <li>copy or scrape the website&apos;s content for commercial use without permission.</li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Project inquiries and quotes',
          body: (
            <p>
              Sending the contact form or booking a call does not create a contract. Any project is agreed separately in a
              written proposal or contract that sets out the scope, price, timeline, payment and ownership terms. Budget
              ranges and prices mentioned on the website are general guidance, not a binding quote.
            </p>
          ),
        },
        {
          heading: 'Intellectual property',
          body: (
            <>
              <p>
                The website&apos;s design, text, graphics, logo and code belong to {siteConfig.name} or are used with
                permission. You may not reuse them without our written consent.
              </p>
              <p>
                Work we create for clients, and the rights to it, are governed by the contract for that project. Client
                names, logos and screenshots shown in our portfolio remain the property of their owners.
              </p>
            </>
          ),
        },
        {
          heading: 'Portfolio and content accuracy',
          body: (
            <p>
              We aim to keep the website accurate and up to date, but it is provided for general information. Portfolio
              pieces and descriptions illustrate the kind of work we do and may be simplified. We may change or remove
              content at any time.
            </p>
          ),
        },
        {
          heading: 'Third-party services and links',
          body: (
            <p>
              The website links to services run by others, such as Calendly for booking calls, Zoom for video calls and our
              social profiles. Those services have their own terms and privacy policies, and we are not responsible for
              their content or availability.
            </p>
          ),
        },
        {
          heading: 'Limitation of liability',
          body: (
            <p>
              The website is provided &quot;as is&quot;. To the extent the law allows, {siteConfig.name} is not liable for
              any indirect or consequential loss arising from your use of the website, or for interruptions, errors or
              viruses. Nothing in these terms limits liability that cannot be limited by law.
            </p>
          ),
        },
        {
          heading: 'Privacy',
          body: (
            <p>
              How we handle personal data is explained in our <Link href="/privacy">Privacy Policy</Link>.
            </p>
          ),
        },
        {
          heading: 'Changes to these terms',
          body: (
            <p>
              We may update these terms from time to time. The date at the top shows the latest version, and continued use
              of the website means you accept the updated terms.
            </p>
          ),
        },
        {
          heading: 'Governing law',
          body: (
            <p>
              These terms are governed by the laws of Pakistan, and any disputes are subject to the jurisdiction of the
              courts of Pakistan. If you are a consumer, you keep any mandatory protections given to you by the law of the
              country where you live.
            </p>
          ),
        },
        {
          heading: 'Contact',
          body: (
            <p>
              Questions about these terms? Email <a href={`mailto:${email}`}>{email}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
