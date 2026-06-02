import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { getListingSlugs } from "@/data/listings";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const staticPaths = ["", "/listings", "/contact"];
  const slugs = getListingSlugs();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
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
  }

  return entries;
}
