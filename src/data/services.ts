import { Service } from '@/types/service';

export const servicesData: Service[] = [
  {
    id: 'web-development',
    slug: 'web-development',
    title: 'Full-Stack Web Development',
    tagline: 'High-speed, production-grade web applications engineered to scale.',
    shortDescription:
      'We architect and build modern Next.js and React applications optimized for sub-second page loads, conversion, and global availability.',
    fullDescription:
      'From custom SaaS platforms to enterprise web portals, we engineer scalable full-stack applications with bulletproof type safety, high-performance edge rendering, and seamless database architectures.',
    iconName: 'Code2',
    featured: true,
    deliverables: [
      'Next.js 14/15 App Router Architecture',
      'TypeScript Strict Core Codebase',
      'High-Performance Edge APIs & Server Actions',
      'Automated CI/CD Pipelines & Testing',
      'Core Web Vitals 95+ Score Optimization',
    ],
    features: [
      {
        title: 'Microsecond Edge Latency',
        description: 'Global content delivery with intelligent edge caching and serverless compute.',
      },
      {
        title: 'Bulletproof Security',
        description: 'OWASP compliant authentication, CSRF/XSS protection, and encrypted data layers.',
      },
      {
        title: 'Conversion-Engineered UX',
        description: 'Optimized layouts engineered to turn visitors into paying clients.',
      },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'Docker'],
    pricingStartingAt: '$4,500',
    timeline: '2-4 weeks',
  },
  {
    id: 'ui-ux-design',
    slug: 'ui-ux-design',
    title: 'UI/UX & Product Design',
    tagline: 'Award-winning user interfaces that inspire confidence and loyalty.',
    shortDescription:
      'We craft intuitive, memorable, and visually arresting user experiences backed by deep user research and conversion psychology.',
    fullDescription:
      'We translate complex business workflows into simple, elegant digital interactions. Every component, transition, and micro-interaction is designed with purpose.',
    iconName: 'Layout',
    featured: true,
    deliverables: [
      'Interactive Figma Prototypes & Wireframes',
      'Design System & Component Token Library',
      'User Journey & Conversion Funnel Maps',
      'Usability Testing & Accessibility (WCAG AA)',
      'Developer-Ready Production Handoff',
    ],
    features: [
      {
        title: 'Design Systems That Scale',
        description: 'Reusable atomic components that keep your brand coherent across platforms.',
      },
      {
        title: 'User-Centric Architecture',
        description: 'Frictionless flows validated with user testing and data-driven insights.',
      },
    ],
    technologies: ['Figma', 'Framer', 'Protopie', 'Storybook'],
    pricingStartingAt: '$3,500',
    timeline: '2-3 weeks',
  },
  {
    id: 'ai-integration',
    slug: 'ai-integration',
    title: 'AI & Automation Systems',
    tagline: 'Supercharge your business with custom LLMs, RAG, and automated workflows.',
    shortDescription:
      'We build intelligent AI agents, embeddings-based search, and autonomous workflow pipelines that multiply business throughput.',
    fullDescription:
      'Harness the frontier of generative AI. We integrate private LLM pipelines, semantic vector search, autonomous agents, and enterprise data connectors.',
    iconName: 'Sparkles',
    featured: true,
    deliverables: [
      'Custom LLM Integration & Prompt Engineering',
      'Vector Search & RAG Knowledge Retrieval',
      'Autonomous Task Agents & Bots',
      'Automated Backend Workflow Triggers',
      'Private & Secure Data Sandboxing',
    ],
    features: [
      {
        title: 'Private & Secure',
        description: 'Zero data leakage architectures ensuring enterprise privacy standards.',
      },
      {
        title: 'Autonomous Agents',
        description: 'Automate repetitive workflows and customer support 24/7.',
      },
    ],
    technologies: ['OpenAI', 'Anthropic Claude', 'LangChain', 'Pinecone', 'Python', 'FastAPI'],
    pricingStartingAt: '$5,000',
    timeline: '3-5 weeks',
  },
  {
    id: 'mobile-apps',
    slug: 'mobile-apps',
    title: 'Cross-Platform Mobile Apps',
    tagline: 'Native performance on iOS and Android from a unified codebase.',
    shortDescription:
      'We develop fluid, responsive mobile applications using React Native and Flutter with seamless offline support.',
    fullDescription:
      'Deliver seamless mobile experiences with native performance, push notification infrastructure, in-app purchases, and offline-first data synchronization.',
    iconName: 'Smartphone',
    featured: false,
    deliverables: [
      'iOS & Android App Store Ready Builds',
      'Native Device API Integrations',
      'Offline-First Data Syncing',
      'Biometric Authentication & Payments',
      'App Store Submission Management',
    ],
    features: [
      {
        title: '60 FPS Native Performance',
        description: 'Smooth hardware-accelerated animations and swift navigation.',
      },
      {
        title: 'Unified Codebase',
        description: 'Ship faster and cut maintenance overhead by 50%.',
      },
    ],
    technologies: ['React Native', 'Expo', 'Flutter', 'Firebase', 'Swift', 'Kotlin'],
    pricingStartingAt: '$6,000',
    timeline: '4-6 weeks',
  },
  {
    id: 'cloud-devops',
    slug: 'cloud-devops',
    title: 'Cloud Infrastructure & DevOps',
    tagline: 'Zero-downtime deployments, auto-scaling, and airtight security.',
    shortDescription:
      'We configure enterprise AWS, GCP, and Vercel cloud infrastructures with automated CI/CD and 99.99% uptime guarantees.',
    fullDescription:
      'Modernize your cloud stack with Terraform, Kubernetes, serverless pipelines, multi-region failovers, and proactive uptime monitoring.',
    iconName: 'Cloud',
    featured: false,
    deliverables: [
      'Terraform Infrastructure as Code',
      'Automated GitHub Actions CI/CD',
      'Distributed Edge CDN & WAF Rules',
      'Containerization & Kubernetes Orchestration',
      '24/7 Monitoring & Alerting Setup',
    ],
    features: [
      {
        title: 'Auto-Scaling Under High Load',
        description: 'Scale from zero to millions of requests without manual intervention.',
      },
      {
        title: 'Zero-Downtime Releases',
        description: 'Blue/Green and canary deployments for risk-free continuous delivery.',
      },
    ],
    technologies: ['AWS', 'GCP', 'Vercel', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
    pricingStartingAt: '$4,000',
    timeline: '2-3 weeks',
  },
  {
    id: 'branding-identity',
    slug: 'branding-identity',
    title: 'Digital Branding & Identity',
    tagline: 'Distinctive brand identities that stand out in crowded tech markets.',
    shortDescription:
      'We forge cohesive brand strategies, distinctive visual identities, typography guidelines, and digital asset systems.',
    fullDescription:
      'Build an unforgettable digital brand. We craft everything from logo systems and color hierarchies to brand books and marketing collateral.',
    iconName: 'Palette',
    featured: false,
    deliverables: [
      'Comprehensive Brand Style Guide',
      'Vector Logo Systems & Variations',
      'Custom Typography & Color Palette',
      'Social Media & Marketing Asset Kit',
      '3D & Motion Brand Assets',
    ],
    features: [
      {
        title: 'Memorable Aesthetic',
        description: 'Distinct visual identity tailored to your demographic and industry niche.',
      },
      {
        title: 'Omnichannel Consistency',
        description: 'Flawless presentation across web, mobile, print, and social media.',
      },
    ],
    technologies: ['Figma', 'Illustrator', 'After Effects', 'Blender'],
    pricingStartingAt: '$3,000',
    timeline: '2 weeks',
  },
];
