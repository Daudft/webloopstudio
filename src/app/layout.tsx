import type { Metadata, Viewport } from 'next';
import { Commissioner, Montserrat, Sora } from 'next/font/google';
import '@/styles/globals.css';
import { siteConfig } from '@/config/site';
import { Navbar } from '@/components/common/navbar';
import { Footer } from '@/components/common/footer';
import { SiteLoader } from '@/components/common/site-loader';
import { MobileStickyCta } from '@/components/common/mobile-sticky-cta';
import { CookieConsent } from '@/components/common/cookie-consent';
import { Analytics } from '@/components/common/analytics';
import { getOrganizationSchema } from '@/lib/schema';

const montserrat = Montserrat({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-montserrat',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

const commissioner = Commissioner({
  subsets: ['latin'],
  variable: '--font-commissioner',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['web design agency', 'web development', 'Next.js', 'mobile apps', 'custom software', 'branding'],
  authors: [{ name: siteConfig.founder }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: '#131315',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  /** Parallel route slot (app/@modal) for overlays such as About, rendered above the current page. */
  modal: React.ReactNode;
}) {
  const orgJsonLd = getOrganizationSchema();

  return (
    <html lang="en" className={`${montserrat.variable} ${sora.variable} ${commissioner.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla) inject attributes on <body> before React hydrates. */}
      <body className="flex min-h-svh flex-col font-sans" suppressHydrationWarning>
        {/* Outside loading.tsx's Suspense boundary, so the intro paints with the first HTML chunk. */}
        <SiteLoader />
        <Navbar />
        <main id="top" className="flex-1">{children}</main>
        <Footer />
        {modal}
        <MobileStickyCta />
        {/* Both render nothing until NEXT_PUBLIC_GA_ID is set; GA loads only after the visitor accepts. */}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
