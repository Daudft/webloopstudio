import { NavItem } from '@/types';

export const mainNavItems: NavItem[] = [
  {
    title: 'Services',
    href: '/services',
  },
  {
    title: 'Work',
    href: '/work',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Pricing',
    href: '/pricing',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];

export const footerNavItems = {
  services: [
    { title: 'Full-Stack Web Apps', href: '/services#web-development' },
    { title: 'UI/UX & Product Design', href: '/services#ui-ux-design' },
    { title: 'AI Integration & Agents', href: '/services#ai-integration' },
    { title: 'Mobile Applications', href: '/services#mobile-apps' },
    { title: 'Cloud Infrastructure & DevOps', href: '/services#cloud-devops' },
  ],
  company: [
    { title: 'About Us', href: '/about' },
    { title: 'Case Studies', href: '/work' },
    { title: 'Pricing & Plans', href: '/pricing' },
    { title: 'Contact Studio', href: '/contact' },
  ],
  legal: [
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms of Service', href: '/terms' },
  ],
};
