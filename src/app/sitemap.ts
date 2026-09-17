import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { projectsData } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString();

  const routes = ['', '/work', '/about', '/contact', ...projectsData.map((project) => `/work/${project.slug}`)];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}
