import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Webloop Studio',
  legalName: 'Webloop Studio LLC',
  description:
    'Webloop Studio is a premium digital product and engineering agency crafting hyper-scalable web applications, cutting-edge AI systems, and world-class digital brands.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://webloopstudio.com',
  ogImage: 'https://webloopstudio.com/images/og/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/webloopstudio',
    github: 'https://github.com/webloopstudio',
    linkedin: 'https://linkedin.com/company/webloopstudio',
    instagram: 'https://instagram.com/webloopstudio',
    dribbble: 'https://dribbble.com/webloopstudio',
  },
  contact: {
    email: 'hello@webloopstudio.com',
    phone: '+1 (555) 019-2834',
    address: '100 Innovation Boulevard, Suite 400',
    city: 'San Francisco, CA 94107',
    country: 'United States',
  },
};
