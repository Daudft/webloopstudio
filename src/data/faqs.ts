import { FAQItem } from '@/types';

export const faqsData: FAQItem[] = [
  {
    question: 'How fast can Webloop Studio start and deliver our project?',
    answer:
      'We typically kick off within 3–5 business days after scope finalization. Standard web applications and branding projects take 2–4 weeks, while complex enterprise platforms and AI workflows span 4–8 weeks with weekly milestone deliverables.',
    category: 'Process',
  },
  {
    question: 'What technologies do you specialize in?',
    answer:
      'Our primary stack is Next.js (App Router), React, TypeScript, Tailwind CSS, Node.js/Python backends, PostgreSQL, Prisma, Redis, and modern AI pipelines (LangChain, OpenAI, Pinecone). We deploy on Vercel, AWS, and GCP with automated CI/CD.',
    category: 'Tech Stack',
  },
  {
    question: 'How do you guarantee site speed and high-traffic reliability?',
    answer:
      'We engineer for high traffic from day one: Edge caching, static prerendering (SSG/ISR), image optimization, zero-dependency lightweight bundles, database query indexing, and serverless auto-scaling. Every build is validated to achieve 95+ Google Lighthouse scores.',
    category: 'Performance',
  },
  {
    question: 'Do you offer ongoing maintenance, scaling, and support after launch?',
    answer:
      'Yes! We provide dedicated monthly maintenance, continuous feature development, security patches, uptime monitoring, and infrastructure management retainers tailored to your growth needs.',
    category: 'Support',
  },
  {
    question: 'How do we communicate and track progress during development?',
    answer:
      'You get direct access to our core engineers and designers via a dedicated Slack/Discord channel, weekly video demos, interactive staging preview links on every commit, and a live Linear/Notion dashboard.',
    category: 'Communication',
  },
];
