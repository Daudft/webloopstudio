import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Webloop Studio',
  tagline: 'Websites, apps and custom software for growing businesses',
  description:
    'Webloop Studio designs and builds websites, apps and custom software for businesses whose growth has outpaced their digital presence.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://webloopstudio.com',
  founder: 'Daud Afzal',
  links: {
    // TODO(content): set real profile URLs, or leave undefined to hide the link.
    linkedin: 'https://linkedin.com/company/webloopstudio',
    instagram: 'https://instagram.com/webloopstudio',
    // TODO(content): add your call-booking link (e.g. Calendly); until then "Book a call" scrolls to the form.
    booking: undefined,
  },
  contact: {
    // TODO(content): confirm this inbox exists and is monitored.
    email: 'hello@webloopstudio.com',
  },
};
