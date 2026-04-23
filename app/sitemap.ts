import type { MetadataRoute } from "next";
import { cities } from "@/lib/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://afterduskevents.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/packages`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/add-ons`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    // Service-area landing pages
    { url: `${base}/serving`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...cities.map((c) => ({
      url: `${base}/serving/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: c.slug === "canton" ? 0.85 : 0.75,
    })),
    // Guides
    { url: `${base}/guides`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    {
      url: `${base}/guides/outdoor-movie-rental-cost-michigan`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/guides/screen-size-for-guest-count`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Legal
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
