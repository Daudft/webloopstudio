import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { projectsData } from '@/data/projects';
import { servicesData } from '@/data/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/services', '/work', '/pricing', '/contact', '/privacy', '/terms'].map(
    (route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })
  );

  const serviceRoutes = servicesData.map((service) => ({
    url: `${siteConfig.url}/services#${service.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const projectRoutes = projectsData.map((project) => ({
    url: `${siteConfig.url}/work#${project.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...serviceRoutes, ...projectRoutes];
}
