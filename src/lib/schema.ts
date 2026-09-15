import { siteConfig } from '@/config/site';

export function getOrganizationSchema() {
  const sameAs = [siteConfig.links.linkedin, siteConfig.links.instagram].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icons/icon-512.png`,
    description: siteConfig.description,
    founder: {
      '@type': 'Person',
      name: siteConfig.founder,
    },
    ...(sameAs.length > 0 && { sameAs }),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: siteConfig.contact.email,
      areaServed: 'Worldwide',
      availableLanguage: ['English'],
    },
  };
}
