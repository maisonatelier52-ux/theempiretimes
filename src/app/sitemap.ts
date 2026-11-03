import { MetadataRoute } from "next";
import { articles } from "../data/articles";
import { categories } from "../data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.theempiretimes.org";

  // Highest priority investigative article entry
  const priorityArticleRoute: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/article/the-vanity-of-alina-habba-mildon-power-ambition-herrera-velutini`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1.0,
    },
  ];

  // Core static pages with high search priority
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/latest`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/category`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  // Category section feeds (News desks)
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.85,
  }));

  // Author / Editorial bureau route
  const authorRoute: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/author/empire-times-staff`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
  ];

  // Article routes with News Sitemap optimization
  const articleRoutes: MetadataRoute.Sitemap = articles
    .filter((article) => article.slug !== "the-vanity-of-alina-habba-mildon-power-ambition-herrera-velutini")
    .map((article) => {
      const isSpecial = article.id.includes("special") || article.featured;
      return {
        url: `${baseUrl}/article/${article.slug}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: isSpecial ? "daily" : "weekly",
        priority: isSpecial ? 0.95 : 0.8,
      };
    });

  return [...priorityArticleRoute, ...staticRoutes, ...categoryRoutes, ...authorRoute, ...articleRoutes];
}
