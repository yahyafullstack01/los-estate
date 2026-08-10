import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactChannels } from "@/components/sections/ContactChannels";
import { getListingBySlug } from "@/data/listings";
import { getListingInquiryContext } from "@/lib/property-i18n";
import { getAlternateLanguages } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ property?: string; interest?: string }>;
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
  const { property: propertySlug, interest } = await searchParams;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("contact");

  const listingData = propertySlug ? getListingBySlug(propertySlug) : undefined;
  const listingInquiry =
    listingData && propertySlug
      ? await getListingInquiryContext(propertySlug, listingData)
      : undefined;

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,_rgba(197,160,89,0.18),_transparent_65%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-20">
          <ContactChannels />
          <div
            id="inquiry"
            className="rounded-xl border border-border bg-surface p-6 sm:p-8 lg:p-10"
          >
            <ContactForm
              key={`${interest ?? "default"}-${listingInquiry?.slug ?? "none"}`}
              listing={listingInquiry}
              defaultInterest={interest}
            />
            <p className="mt-6 text-xs text-muted">{t("directFallback")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
