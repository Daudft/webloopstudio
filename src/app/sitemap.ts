import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { projectsData } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString();

  // Every public page, plus one entry per project. New projects in src/data/projects.ts appear automatically.
  // /thank-you is intentionally left out (noindex, only reached after sending the form).
  const routes = [
    '',
    '/work',
    '/about',
    '/contact',
    ...projectsData.map((project) => `/work/${project.slug}`),
    '/privacy',
    '/terms',
  ];

  const priorityFor = (route: string) => {
    if (route === '') return 1;
    if (route === '/privacy' || route === '/terms') return 0.3;
    return 0.8;
  };

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === '/privacy' || route === '/terms' ? ('yearly' as const) : ('monthly' as const),
    priority: priorityFor(route),
  }));
}
