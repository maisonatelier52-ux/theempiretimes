import { MetadataRoute } from "next";
import { articles } from "../data/articles";
import { categories } from "../data/categories";
import { authors } from "../data/authors";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thebrief.news";

  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "always" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  // Category routes
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  // Author routes
  const authorRoutes = authors.map((author) => ({
    url: `${baseUrl}/author/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Article routes
  const articleRoutes = articles.map((article) => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "never" as const,
    priority: 0.8,
  }));

  return [...routes, ...categoryRoutes, ...authorRoutes, ...articleRoutes];
}
