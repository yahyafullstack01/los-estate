import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getGuideBySlug,
  getGuideContent,
  getGuideSlugs,
} from "@/data/guides";
import { getListingBySlug } from "@/data/listings";
import { Link } from "@/i18n/navigation";
import { PropertyCard } from "@/components/listing/PropertyCard";
import { GuideJsonLd } from "@/components/guides/GuideJsonLd";
import { GuideWhatsAppCta } from "@/components/guides/GuideWhatsAppCta";
import { absoluteUrl, getPageAlternates } from "@/lib/seo";
import { locales, type Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const slugs = getGuideSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  const content = getGuideContent(guide, locale);

  return {
    title: content.title,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      type: "article",
      publishedTime: guide.publishedAt,
      images: [absoluteUrl("/og-default.png")],
    },
    alternates: getPageAlternates(locale as Locale, `/guides/${slug}`),
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const t = await getTranslations("guides");
  const content = getGuideContent(guide, locale);
  const related = guide.relatedListingSlugs
    .map((s) => getListingBySlug(s))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  const whatsappPrefill = t("whatsappPrefill", { title: content.title });

  return (
    <>
      <GuideJsonLd guide={guide} content={content} locale={locale} />
      <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/guides"
          className="text-sm font-medium text-muted hover:text-brand-gold"
        >
          ← {t("backToGuides")}
        </Link>

        <header className="mx-auto mt-6 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-wider text-brand-gold">
            {t("published")}: {guide.publishedAt}
          </p>
          <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
            {content.title}
          </h1>
          <p className="mt-5 text-lg text-muted leading-relaxed">
            {content.excerpt}
          </p>
        </header>

        <div className="mx-auto mt-12 max-w-3xl space-y-10">
          {content.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-2xl sm:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-muted leading-relaxed">
                {section.paragraphs.map((p, i) => (
                  <p key={`${section.heading}-${i}`}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          {content.faq.length > 0 && (
            <section>
              <h2 className="font-serif text-2xl sm:text-3xl">{t("faqTitle")}</h2>
              <dl className="mt-6 space-y-6">
                {content.faq.map((item) => (
                  <div key={item.question}>
                    <dt className="font-semibold text-foreground">
                      {item.question}
                    </dt>
                    <dd className="mt-2 text-muted leading-relaxed">
                      {item.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <GuideWhatsAppCta
            heading={content.ctaHeading}
            body={content.ctaBody}
            buttonLabel={t("whatsapp")}
            prefill={whatsappPrefill}
          />
        </div>

        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-12">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-serif text-2xl sm:text-3xl">
                {t("relatedListings")}
              </h2>
              <Link
                href="/listings"
                className="text-sm font-semibold text-brand-gold hover:text-brand-gold-light"
              >
                {t("allListings")} →
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.slice(0, 3).map((listing) => (
                <PropertyCard key={listing.id} listing={listing} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
