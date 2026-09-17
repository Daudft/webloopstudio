import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

interface ConstructMetadataProps {
  /** Bare page title, e.g. "Contact". The root layout's template adds " | Webloop Studio". */
  title?: string;
  description?: string;
  noIndex?: boolean;
  /** Route path, e.g. "/contact". Sets the canonical URL and og:url for this page. */
  path?: string;
}

export function constructMetadata({
  title,
  description = siteConfig.description,
  noIndex = false,
  path,
}: ConstructMetadataProps = {}): Metadata {
  // Social titles are not run through the layout template, so they get the suffix here.
  const socialTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} — ${siteConfig.tagline}`;
  const url = path ? `${siteConfig.url}${path}` : siteConfig.url;

  return {
    // Bare title: the layout template turns it into "Contact | Webloop Studio" (previously the
    // suffix was added here too, producing "Contact | Webloop Studio | Webloop Studio").
    ...(title && { title }),
    description,
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
    },
    ...(path && {
      alternates: {
        canonical: path,
      },
    }),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
