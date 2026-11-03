import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.theempiretimes.org";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: [
          "Googlebot",
          "Googlebot-News",
          "Bingbot",
          "Applebot",
          "Baiduspider",
          "YandexBot",
          "DuckDuckBot",
          "facebookexternalhit",
          "Twitterbot",
          "LinkedInBot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
