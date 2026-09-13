import { NavItem } from '@/types';

export const mainNavItems: NavItem[] = [
  {
    title: 'Services',
    href: '/#services',
  },
  {
    title: 'Work',
    href: '/#work',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Process',
    href: '/#process',
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
    { title: 'Full-Stack Web Apps', href: '/#services' },
    { title: 'UI/UX & Product Design', href: '/#services' },
    { title: 'AI Integration & Agents', href: '/#services' },
    { title: 'Mobile Applications', href: '/#services' },
    { title: 'Cloud Infrastructure & DevOps', href: '/#services' },
  ],
  company: [
    { title: 'About Us', href: '/about' },
    { title: 'Case Studies', href: '/work' },
    { title: 'Our Process', href: '/#process' },
    { title: 'Pricing & Plans', href: '/pricing' },
    { title: 'Contact Studio', href: '/contact' },
  ],
  legal: [
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms of Service', href: '/terms' },
  ],
};
