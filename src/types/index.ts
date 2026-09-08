export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  badge?: string;
  description?: string;
  children?: NavItem[];
}

export interface SiteConfig {
  name: string;
  legalName: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
    linkedin: string;
    instagram: string;
    dribbble: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  };
}

export interface StatItem {
  value: string;
  label: string;
  description?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    dribbble?: string;
  };
}
