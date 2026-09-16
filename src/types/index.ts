export interface NavItem {
  title: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  founder: string;
  links: {
    linkedin?: string;
    instagram?: string;
    /** Call-booking page (e.g. Calendly). When unset, "Book a call" scrolls to the contact form. */
    booking?: string;
  };
  contact: {
    email: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}
