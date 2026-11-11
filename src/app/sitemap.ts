import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { getListingSlugs } from "@/data/listings";
import { guides } from "@/data/guides";
import { getSiteUrl } from "@/lib/seo";

/** Fixed per-build timestamp — avoids reporting every URL as "just modified" on every request. */
const BUILD_DATE = new Date();

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

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      const isHome = path === "";
      const isGuideIndex = path === "/guides";
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: BUILD_DATE,
        changeFrequency: isHome || isGuideIndex ? "weekly" : "monthly",
        priority: isHome ? 1 : isGuideIndex ? 0.9 : 0.8,
      });
    }

    for (const slug of slugs) {
      entries.push({
        url: `${base}/${locale}/listings/${slug}`,
        lastModified: BUILD_DATE,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }

    for (const guide of guides) {
      entries.push({
        url: `${base}/${locale}/guides/${guide.slug}`,
        lastModified: new Date(guide.publishedAt),
        changeFrequency: "monthly",
        priority: 0.85,
      });
    }
  }

  return entries;
}
