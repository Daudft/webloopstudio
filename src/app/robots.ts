import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /thank-you is only reached after sending the contact form; keep it out of search results.
      disallow: ['/api/', '/thank-you'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
