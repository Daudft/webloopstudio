import { Project } from '@/types/project';

// TODO(content): every project below is a placeholder. Replace with real client
// work (title, summary, thumbnail, year and, if you have one, a verifiable
// outcome) before launch, or remove entries you cannot back up.
export const projectsData: Project[] = [
  {
    id: 'placeholder-workflow-platform',
    slug: 'workflow-platform',
    title: 'Workflow platform for a logistics team',
    category: 'AI & Automation',
    summary:
      'An internal tool that gives a distributed operations team one place to find answers, track jobs and hand work between shifts.',
    thumbnail: '/images/work-01.jpg',
    year: '2025',
  },
  {
    id: 'placeholder-fintech-dashboard',
    slug: 'fintech-dashboard',
    title: 'Client dashboard for a fintech startup',
    category: 'Web Development',
    summary:
      'A fast, accessible portfolio view with live data, built so the product team could ship new features without a redesign.',
    thumbnail: '/images/work-02.jpg',
    year: '2025',
  },
  {
    id: 'placeholder-design-system',
    slug: 'design-system',
    title: 'Design system for a media group',
    category: 'UI/UX Design',
    summary:
      'A shared component library and brand guidelines that let several small teams ship consistent interfaces quickly.',
    thumbnail: '/services/ui-ux-design.jpg',
    year: '2024',
  },
  {
    id: 'placeholder-health-app',
    slug: 'health-app',
    title: 'Companion app for a clinic network',
    category: 'Mobile Apps',
    summary:
      'An offline-first mobile app that keeps patients and clinicians in sync between appointments.',
    thumbnail: '/services/mobile-apps.jpg',
    year: '2024',
  },
];
