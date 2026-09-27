import type { Locale } from "@/i18n/routing";

export type GuideSection = {
  heading: string;
  paragraphs: string[];
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type GuideContent = {
  title: string;
  description: string;
  excerpt: string;
  sections: GuideSection[];
  faq: GuideFaq[];
  ctaHeading: string;
  ctaBody: string;
};

export type GuideLocalizedContent = Record<Locale, GuideContent>;

export type Guide = {
  slug: string;
  publishedAt: string;
  relatedListingSlugs: string[];
  content: GuideLocalizedContent;
};
