import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

interface ConstructMetadataProps {
  title?: string;
  description?: string;
  noIndex?: boolean;
  canonical?: string;
}

export function constructMetadata({
  title,
  description = siteConfig.description,
  noIndex = false,
  canonical,
}: ConstructMetadataProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} — ${siteConfig.tagline}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: canonical || siteConfig.url,
      siteName: siteConfig.name,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    ...(canonical && {
      alternates: {
        canonical,
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
