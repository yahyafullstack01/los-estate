import type { Locale } from "@/i18n/routing";
import type { Guide, GuideContent } from "./types";
import rentApartmentAlanya from "./rent-apartment-alanya.json";
import buyApartmentAlanya from "./buy-apartment-alanya.json";
import besthome36Vs37 from "./besthome-36-vs-37.json";
import winterRentAlanya from "./winter-rent-alanya.json";

export type {
  Guide,
  GuideContent,
  GuideFaq,
  GuideSection,
  GuideLocalizedContent,
} from "./types";

function asGuide(data: {
  slug: string;
  publishedAt: string;
  relatedListingSlugs: string[];
  content: Record<string, GuideContent>;
}): Guide {
  return data as Guide;
}

export const guides: Guide[] = [
  asGuide(rentApartmentAlanya),
  asGuide(buyApartmentAlanya),
  asGuide(besthome36Vs37),
  asGuide(winterRentAlanya),
];

export function getGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

/** Resolve localized guide body; fall back to English if a locale is missing. */
export function getGuideContent(guide: Guide, locale: string): GuideContent {
  const key = locale as Locale;
  return guide.content[key] ?? guide.content.en;
}
