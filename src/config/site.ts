import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Webloop Studio',
  tagline: 'Websites, apps and custom software for growing businesses',
  description:
    'Webloop Studio designs and builds websites, apps and custom software for businesses whose growth has outpaced their digital presence.',
  // Set NEXT_PUBLIC_SITE_URL on the host; this fallback is the production domain.
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://webloop.studio',
  founder: 'Daud Afzal',
  links: {
    // TODO(content): set real profile URLs, or leave undefined to hide the link.
    linkedin: 'https://linkedin.com/company/webloopstudio',
    instagram: 'https://instagram.com/webloopstudio',
    // Calendly "Intro call with Daud" (30 min, Zoom). Used by every "Book a call" button.
    booking: 'https://calendly.com/daudafzal654/30min',
  },
  contact: {
    // Not shown on the public site (contact goes through the form and Book a call).
    // Used only as the contact address on the Privacy Policy and Terms pages.
    email: 'daudafzal654@gmail.com',
  },
};
