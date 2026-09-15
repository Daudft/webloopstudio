import { FAQItem } from '@/types';

// TODO(content): these answers are reasonable defaults. Adjust timelines,
// stack and working style to match how you actually run projects.
export const faqsData: FAQItem[] = [
  {
    question: 'How quickly can we start, and how long does a project take?',
    answer:
      'We usually kick off within a week of agreeing the scope. Most websites and brand projects take two to four weeks. Larger products and AI workflows run four to eight weeks, with something to review every week.',
  },
  {
    question: 'What do you build with?',
    answer:
      'Next.js, React and TypeScript on the front end, Node.js or Python on the back end, PostgreSQL for data, and React Native for mobile. We deploy to Vercel or AWS and set up automated deployments from day one.',
  },
  {
    question: 'How do you keep sites fast and reliable?',
    answer:
      'We render as much as possible ahead of time, optimise every image, keep JavaScript bundles small and cache at the edge. Before launch we check Core Web Vitals and fix anything that slows the page down.',
  },
  {
    question: 'Do you support the site after launch?',
    answer:
      'Yes. You can keep us on a monthly retainer for improvements, updates and monitoring, or bring us back when you need something new. Either way, you own the code and the accounts.',
  },
  {
    question: 'How do we communicate during the project?',
    answer:
      'You work directly with Daud. You get a private channel for questions, a staging link you can open at any time, and a short written update every week.',
  },
];
