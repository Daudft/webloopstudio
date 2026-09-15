import { Service } from '@/types/service';

// TODO(content): confirm this is the set of services you actually want to sell,
// and tune the one-line descriptions to your own voice.
export const servicesData: Service[] = [
  {
    id: 'web-development',
    slug: 'web-development',
    title: 'Full-Stack Web Development',
    shortDescription:
      'Marketing sites, web apps and portals built on Next.js and TypeScript, designed to load fast and grow with you.',
  },
  {
    id: 'ui-ux-design',
    slug: 'ui-ux-design',
    title: 'UI/UX & Product Design',
    shortDescription:
      'Interfaces people understand at a glance, from first wireframe to a design system your team can keep building on.',
  },
  {
    id: 'ai-integration',
    slug: 'ai-integration',
    title: 'AI & Automation Systems',
    shortDescription:
      'Practical AI features and automated workflows that remove repetitive work and keep your data under your control.',
  },
  {
    id: 'mobile-apps',
    slug: 'mobile-apps',
    title: 'Cross-Platform Mobile Apps',
    shortDescription:
      'iOS and Android apps from a single React Native codebase, with offline support and store submission handled.',
  },
  {
    id: 'cloud-devops',
    slug: 'cloud-devops',
    title: 'Cloud Infrastructure & DevOps',
    shortDescription:
      'Hosting, deployment pipelines and monitoring set up so releases are boring and outages are rare.',
  },
  {
    id: 'branding-identity',
    slug: 'branding-identity',
    title: 'Digital Branding & Identity',
    shortDescription:
      'Logo, type, colour and a simple brand guide so everything you publish looks like it came from the same place.',
  },
];
