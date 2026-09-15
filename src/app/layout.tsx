import type { Metadata, Viewport } from 'next';
import { Commissioner, Montserrat, Sora } from 'next/font/google';
import '@/styles/globals.css';
import { siteConfig } from '@/config/site';
import { Navbar } from '@/components/common/navbar';
import { Footer } from '@/components/common/footer';
import { getOrganizationSchema } from '@/lib/schema';

const montserrat = Montserrat({
  subsets: ['latin'],
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
    default: `${siteConfig.name} — Modern Digital Agency & Software Studio`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Web Development Agency',
    'Next.js Agency',
    'AI Systems',
    'UI/UX Design Studio',
    'Custom Software Development',
    'React Agency',
    'Digital Product Studio',
  ],
  authors: [{ name: 'Webloop Studio' }],
  creator: 'Webloop Studio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: '@webloopstudio',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0F19',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
      <body className="flex min-h-screen flex-col font-sans">
        <Navbar />
        <main id="top" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
