import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Bed, Bath, MapPin, Maximize } from "lucide-react";
import {
  getListingBySlug,
  getListingSlugs,
} from "@/data/listings";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/sections/ContactForm";
import { PropertyGallery } from "@/components/listing/PropertyGallery";
import { PropertyJsonLd } from "@/components/listing/PropertyJsonLd";
import { formatPrice } from "@/lib/utils";
import { getListingLocation, getPropertyTranslations, getListingInquiryContext } from "@/lib/property-i18n";
import { getAlternateLanguages } from "@/lib/seo";
import { locales, type Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const slugs = getListingSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) return {};

  const t = await getTranslations({
    locale,
    namespace: `properties.${slug}`,
  });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      images: listing.images[0] ? [listing.images[0]] : ["/og-default.png"],
    },
    alternates: {
      languages: getAlternateLanguages(`/listings/${slug}`),
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const listing = getListingBySlug(slug);
  if (!listing) notFound();

  const t = await getTranslations();
  const property = await getPropertyTranslations(slug);
  const title = property.title;
  const description = property.description;
  const location = await getListingLocation(slug, listing);
  const price = formatPrice(listing, locale);
  const priceLabel =
    property.priceLabel ??
    (listing.transaction === "rent"
      ? `${price}${t("listings.perMonth")}`
      : price);

  const roomSpecs = property.roomSpecs;
  const roomSpecsTitle =
    property.roomSpecsTitle ?? t("listings.roomSpecs");
  const socialAmenities =
    property.socialAmenities.length > 0
      ? property.socialAmenities
      : property.features ?? listing.features;
  const socialAmenitiesTitle =
    property.socialAmenitiesTitle ??
    (roomSpecs.length > 0
      ? t("listings.socialAmenities")
      : t("listings.features"));
  const propertyNote = property.note;
  const listingInquiry = await getListingInquiryContext(slug, listing);

  return (
    <>
      <PropertyJsonLd listing={listing} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/listings"
          className="text-sm text-brand-gold hover:underline"
        >
          ← {t("listings.backToListings")}
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <PropertyGallery
            listing={listing}
            title={title}
            placeholder={t("listings.photosPlaceholder")}
          />

          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant={listing.transaction}>
                {t(`transactions.${listing.transaction}`)}
              </Badge>
              <Badge variant={listing.type}>{t(`types.${listing.type}`)}</Badge>
            </div>
            <h1 className="mt-4 font-serif text-3xl sm:text-4xl">{title}</h1>
            <p className="mt-2 flex items-center gap-1.5 text-muted">
              <MapPin className="h-4 w-4 text-brand-gold" />
              {location}
            </p>
            <p className="mt-6 text-3xl font-semibold text-brand-gold">
              {priceLabel}
            </p>

            <ul className="mt-6 flex flex-wrap gap-6 border-y border-border py-6 text-sm">
              {listing.units != null && (
                <li className="flex items-center gap-2 font-medium text-brand-gold">
                  {t("listings.units", { count: listing.units })}
                </li>
              )}
              <li className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-brand-gold" />
                {t("listings.beds", { count: listing.beds })}
              </li>
              <li className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-brand-gold" />
                {t("listings.baths", { count: listing.baths })}
              </li>
              <li className="flex items-center gap-2">
                <Maximize className="h-5 w-5 text-brand-gold" />
                {t("listings.area", { sqm: listing.areaSqm })}
              </li>
            </ul>

            <section className="mt-8">
              <h2 className="text-lg font-semibold">{t("listings.description")}</h2>
              <p className="mt-3 text-muted leading-relaxed whitespace-pre-line">
                {description}
              </p>
              {propertyNote && (
                <p className="mt-4 rounded-lg border border-brand-gold/30 bg-brand-gold/5 px-4 py-3 text-sm">
                  <span className="font-semibold text-brand-gold">
                    {t("listings.propertyNote")}:{" "}
                  </span>
                  {propertyNote}
                </p>
              )}
            </section>

            {roomSpecs.length > 0 && (
              <section className="mt-8">
                <h2 className="text-lg font-semibold">{roomSpecsTitle}</h2>
                <ul className="mt-3 space-y-2">
                  {roomSpecs.map((spec) => (
                    <li
                      key={spec}
                      className="flex gap-2 text-sm text-muted before:content-['•'] before:text-brand-gold"
                    >
                      {spec}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mt-8">
              <h2 className="text-lg font-semibold">{socialAmenitiesTitle}</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {socialAmenities.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-full bg-surface-muted px-3 py-1 text-sm"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-8 hidden lg:block">
              <Button href="#inquire" size="lg">
                {t("listings.inquire")}
              </Button>
            </div>
          </div>
        </div>

        <section
          id="inquire"
          className="mt-16 scroll-mt-24 border-t border-border pt-12 sm:pt-16"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-2xl sm:text-3xl">
              {t("listings.inquire")}
            </h2>
            <p className="mt-3 text-muted">{t("contact.subtitle")}</p>
          </div>
          <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-border bg-surface p-6 sm:p-8">
            <ContactForm listing={listingInquiry} />
          </div>
        </section>
      </div>
    </>
  );
}
