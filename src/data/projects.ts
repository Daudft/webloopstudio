import { Project } from '@/types/project';

export const projectsData: Project[] = [
  {
    id: 'nexus-ai-platform',
    slug: 'nexus-ai-platform',
    title: 'Nexus AI — Enterprise Workflow Intelligence',
    client: 'Nexus Global Inc.',
    category: 'AI & Automation',
    tagline: 'Autonomous enterprise knowledge hub powering 50,000+ daily employee inquiries.',
    summary:
      'We designed and developed an AI-driven knowledge retrieval and automation dashboard that cut support resolution time by 74%.',
    thumbnail: '/ist.jpg',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    ],
    year: '2025',
    liveUrl: 'https://nexus-demo.webloopstudio.com',
    featured: true,
    metrics: [
      { label: 'Latency Reduction', value: '74%' },
      { label: 'Active Daily Users', value: '50K+' },
      { label: 'Lighthouse Score', value: '99/100' },
    ],
    challenge:
      'Nexus needed a hyper-secure enterprise AI portal that could ingest millions of multi-format documents and provide sub-second contextual answers without data leaks.',
    solution:
      'We engineered a Next.js App Router frontend with real-time streaming LLM responses, powered by a hybrid vector-search backend with strict role-based access control.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'LangChain', 'Pinecone', 'PostgreSQL'],
    testimonial: {
      quote:
        'Webloop Studio exceeded every benchmark we set. The interface is stunning, and the performance under heavy enterprise load has been flawless.',
      author: 'Marcus Vance',
      role: 'CTO, Nexus Global',
    },
  },
  {
    id: 'strata-fintech-app',
    slug: 'strata-fintech-app',
    title: 'Strata — Next-Gen Wealth & Asset Management',
    client: 'Strata Capital',
    category: 'Web Development',
    tagline: 'High-frequency portfolio analytics platform managing $400M+ in assets.',
    summary:
      'Built a reactive, real-time financial tracking portal with interactive data visualizers and automated yield rebalancing.',
    thumbnail: '/second.jpg',
    heroImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    ],
    year: '2025',
    liveUrl: 'https://strata-demo.webloopstudio.com',
    featured: true,
    metrics: [
      { label: 'AUM Managed', value: '$400M+' },
      { label: 'Data Refresh Latency', value: '< 50ms' },
      { label: 'User Growth (QoQ)', value: '+310%' },
    ],
    challenge:
      'Rendering complex mathematical financial charts with live WebSocket tickers without causing browser thread freezes or rendering delays.',
    solution:
      'Implemented WebGL-accelerated canvas renderers and optimized server-side data compression pipelines within Next.js.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'Chart.js', 'Redis'],
    testimonial: {
      quote:
        'The speed and polish Webloop Studio delivered transformed our customer acquisition funnel entirely. Best engineering partner we have ever hired.',
      author: 'Elena Rostova',
      role: 'Head of Product, Strata',
    },
  },
  {
    id: 'lumina-design-system',
    slug: 'lumina-design-system',
    title: 'Lumina — Multi-Brand Design System & Portal',
    client: 'Lumina Creative Group',
    category: 'UI/UX Design',
    tagline: 'Unifying 6 digital subsidiaries under one cohesive, accessible design language.',
    summary:
      'Engineered an extensible Figma design system and paired React component library adopting WCAG AAA accessibility standards.',
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    ],
    year: '2024',
    liveUrl: 'https://lumina-demo.webloopstudio.com',
    featured: true,
    metrics: [
      { label: 'Design Velocity', value: '3.5x' },
      { label: 'Components Built', value: '140+' },
      { label: 'WCAG Rating', value: 'AAA' },
    ],
    challenge:
      'Inconsistent brand presentation and slow feature velocity caused by fragmented UI components across multiple developer teams.',
    solution:
      'Delivered a unified design token architecture with automated Storybook testing and NPM token distributions.',
    technologies: ['Figma', 'React', 'Storybook', 'Tailwind CSS', 'TypeScript'],
    testimonial: {
      quote:
        'Webloop Studio brought clarity and sheer artistic brilliance to our ecosystem. Our team now ships features three times faster.',
      author: 'Sarah Jenkins',
      role: 'VP of Design, Lumina',
    },
  },
  {
    id: 'pulse-health-tracker',
    slug: 'pulse-health-tracker',
    title: 'Pulse — Biometric Health & Longevity App',
    client: 'Pulse BioTech',
    category: 'Mobile Apps',
    tagline: 'Real-time biometric telemetric monitoring connecting patients with top cardiologists.',
    summary:
      'Engineered an offline-first iOS and Android app syncing continuous bluetooth heart telemetry to doctor dashboards.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=80',
    galleryImages: [],
    year: '2024',
    liveUrl: 'https://pulse-demo.webloopstudio.com',
    featured: false,
    metrics: [
      { label: 'App Store Rating', value: '4.9 ★' },
      { label: 'Telemetric Sync', value: '99.98%' },
    ],
    challenge:
      'Continuous background BLE sync without draining device battery while ensuring HIPAA compliance.',
    solution:
      'Custom native bridges with localized SQLite buffers that batch sync securely upon connection.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Node.js', 'HIPAA AWS'],
    testimonial: {
      quote: 'Flawless execution on both design and native bluetooth mechanics.',
      author: 'Dr. David Chen',
      role: 'Founder, Pulse BioTech',
    },
  },
];
