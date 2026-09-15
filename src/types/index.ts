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
  };
  contact: {
    email: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}
