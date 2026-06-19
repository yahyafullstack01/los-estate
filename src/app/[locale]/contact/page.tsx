import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { getListingBySlug } from "@/data/listings";
import { getListingInquiryContext } from "@/lib/property-i18n";
import { getAlternateLanguages } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ property?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
    alternates: {
      languages: getAlternateLanguages("/contact"),
    },
  };
}

export default async function ContactPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { property: propertySlug } = await searchParams;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("contact");

  const listingData = propertySlug ? getListingBySlug(propertySlug) : undefined;
  const listingInquiry =
    listingData && propertySlug
      ? await getListingInquiryContext(propertySlug, listingData)
      : undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="font-serif text-4xl">{t("title")}</h1>
          <p className="mt-4 text-lg text-muted leading-relaxed">{t("subtitle")}</p>
          <div className="mt-10 space-y-4 text-sm text-muted">
            <p>Kyiv, Ukraine</p>
            <p>+380 44 000 0000</p>
            <p>info@los-estate.com</p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
          <ContactForm listing={listingInquiry} />
        </div>
      </div>
    </div>
  );
}
