import type { MetadataRoute } from "next";
import { cities } from "@/lib/cities";
import { audioTiers } from "@/lib/packages";

// Build-time stable lastModified. Google ignores noisy lastmods that change
// every request. We tie this to the deployed commit (or fall back to build
// epoch on local dev).
const BUILD_LAST_MODIFIED = (() => {
  const d = process.env.VERCEL_GIT_COMMIT_DATE;
  if (d) {
    const parsed = new Date(d);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return new Date();
})();

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://afterduskevents.com";
  const lastModified = BUILD_LAST_MODIFIED;

  return [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/packages`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...audioTiers.map((t) => ({
      url: `${base}/packages/${t.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}/add-ons`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/faq`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified, changeFrequency: "yearly", priority: 0.9 },
    // Service-area landing pages
    { url: `${base}/serving`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    ...cities.map((c) => ({
      url: `${base}/serving/${c.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: c.slug === "canton" ? 0.85 : 0.75,
    })),
    // Guides
    { url: `${base}/guides`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    {
      url: `${base}/guides/outdoor-movie-rental-cost-michigan`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/guides/screen-size-for-guest-count`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Legal
    { url: `${base}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
