export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: 'Web Development' | 'Mobile Apps' | 'UI/UX Design' | 'AI & Automation' | 'Branding';
  tagline: string;
  summary: string;
  thumbnail: string;
  heroImage: string;
  galleryImages: string[];
  year: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  metrics: ProjectMetric[];
  challenge: string;
  solution: string;
  technologies: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    avatar?: string;
  };
}
