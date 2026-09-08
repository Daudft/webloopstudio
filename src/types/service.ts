export interface ServiceFeature {
  title: string;
  description: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  featured?: boolean;
  deliverables: string[];
  features: ServiceFeature[];
  technologies: string[];
  pricingStartingAt?: string;
  timeline?: string;
}
