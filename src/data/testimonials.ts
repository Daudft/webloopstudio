import { Testimonial } from '@/types/testimonial';

export const testimonialsData: Testimonial[] = [
  {
    id: '1',
    name: 'Marcus Vance',
    role: 'Chief Technology Officer',
    company: 'Nexus Global Inc.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    content:
      'Webloop Studio is in a league of their own. They didn’t just code our product—they elevated our entire vision. Our enterprise AI platform handles 50,000+ daily requests seamlessly with sub-second latency.',
    rating: 5,
    highlight: 'Latency reduced by 74%',
    projectSlug: 'nexus-ai-platform',
  },
  {
    id: '2',
    name: 'Elena Rostova',
    role: 'Head of Product',
    company: 'Strata Capital',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    content:
      'The speed, visual polish, and architectural rigor Webloop Studio brought to our fintech app transformed our conversion rates. They are our go-to engineering powerhouse.',
    rating: 5,
    highlight: '+310% user growth',
    projectSlug: 'strata-fintech-app',
  },
  {
    id: '3',
    name: 'Sarah Jenkins',
    role: 'VP of Design & Marketing',
    company: 'Lumina Creative',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    content:
      'Working with Webloop Studio feels like having an elite Silicon Valley engineering squad inside your company. Their attention to design details, animations, and WCAG accessibility is unmatched.',
    rating: 5,
    highlight: '3.5x design velocity',
    projectSlug: 'lumina-design-system',
  },
  {
    id: '4',
    name: 'Alex Thorne',
    role: 'Founder & CEO',
    company: 'Veloce Dynamics',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    content:
      'Webloop Studio helped us launch our SaaS MVP in just 4 weeks. We secured our Series A seed funding 2 months later, with investors consistently praising the product polish.',
    rating: 5,
    highlight: '4-week launch to Seed Round',
  },
];
