import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { getListingSlugs } from "@/data/listings";
import { getGuideSlugs } from "@/data/guides";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const staticPaths = [
    "",
    "/listings",
    "/guides",
    "/for-owners",
    "/partners",
    "/contact",
  ];
  const slugs = getListingSlugs();
  const guideSlugs = getGuideSlugs();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      const isHome = path === "";
      const isGuideIndex = path === "/guides";
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: isHome || isGuideIndex ? "weekly" : "monthly",
        priority: isHome ? 1 : isGuideIndex ? 0.9 : 0.8,
      });
    }

    for (const slug of slugs) {
      entries.push({
        url: `${base}/${locale}/listings/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }

    for (const slug of guideSlugs) {
      // Prioritize EN + RU in crawl budget hints
      const priority = locale === "en" || locale === "ru" ? 0.85 : 0.55;
      entries.push({
        url: `${base}/${locale}/guides/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority,
      });
    }
  }

  return entries;
}
