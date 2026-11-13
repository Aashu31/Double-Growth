import type { MetadataRoute } from "next";
import { projects } from "@/content/portfolio";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/pricing", priority: 0.9 },
    { path: "/how-it-works", priority: 0.8 },
    { path: "/portfolio", priority: 0.7 },
    ...projects.map((project) => ({
      path: `/portfolio/${project.slug}`,
      priority: 0.5,
    })),
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/faq", priority: 0.6 },
    { path: "/maintenance", priority: 0.6 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
    { path: "/refund-policy", priority: 0.3 },
    { path: "/ownership", priority: 0.3 },
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: route.priority >= 0.8 ? "monthly" : "yearly",
    priority: route.priority,
  }));
}
