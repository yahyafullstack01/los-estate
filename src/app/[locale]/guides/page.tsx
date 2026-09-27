import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { guides, getGuideContent } from "@/data/guides";
import { GuideCard } from "@/components/guides/GuideCard";
import { getPageAlternates } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("guidesTitle"),
    description: t("guidesDescription"),
    alternates: getPageAlternates(locale as Locale, "/guides"),
  };
}

export default async function GuidesIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("guides");
  const currentLocale = await getLocale();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">{t("title")}</h1>
        <p className="mt-4 text-lg text-muted leading-relaxed">{t("subtitle")}</p>
      </header>

      <div className="mx-auto mt-14 max-w-3xl space-y-10">
        {guides.map((guide) => (
          <GuideCard
            key={guide.slug}
            slug={guide.slug}
            content={getGuideContent(guide, currentLocale)}
            readMoreLabel={t("readMore")}
            dateLabel={t("published")}
            publishedAt={guide.publishedAt}
          />
        ))}
      </div>
    </div>
  );
}
