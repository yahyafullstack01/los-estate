import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Bed, Bath, MapPin, Maximize } from "lucide-react";
import {
  getListingBySlug,
  getListingSlugs,
  type Listing,
} from "@/data/listings";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/sections/ContactForm";
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
    listing.transaction === "rent"
      ? `${price}${t("listings.perMonth")}`
      : price;

  const roomSpecs = property.roomSpecs;
  const socialAmenities =
    property.socialAmenities.length > 0
      ? property.socialAmenities
      : property.features ?? listing.features;
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
              <Badge>{t(`transactions.${listing.transaction}`)}</Badge>
              <Badge variant="muted">{t(`types.${listing.type}`)}</Badge>
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
                <h2 className="text-lg font-semibold">{t("listings.roomSpecs")}</h2>
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
              <h2 className="text-lg font-semibold">
                {roomSpecs.length > 0
                  ? t("listings.socialAmenities")
                  : t("listings.features")}
              </h2>
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
              <Button href={`/contact?property=${slug}`} size="lg">
                {t("listings.inquire")}
              </Button>
            </div>
          </div>
        </div>

        <section className="mt-16 lg:hidden">
          <h2 className="font-serif text-2xl">{t("listings.inquire")}</h2>
          <div className="mt-6 rounded-xl border border-border bg-surface p-6">
            <ContactForm listing={listingInquiry} />
          </div>
        </section>

        <section className="mt-16 hidden lg:block">
          <h2 className="font-serif text-2xl">{t("listings.inquire")}</h2>
          <div className="mt-6 max-w-xl rounded-xl border border-border bg-surface p-6">
            <ContactForm listing={listingInquiry} />
          </div>
        </section>
      </div>
    </>
  );
}

function PropertyGallery({
  listing,
  title,
  placeholder,
}: {
  listing: Listing;
  title: string;
  placeholder: string;
}) {
  if (listing.images.length === 0) {
    return (
      <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-surface-muted px-6 text-center">
        <p className="text-sm text-muted">{placeholder}</p>
        {listing.imageDir && (
          <p className="font-mono text-xs text-brand-gold">{listing.imageDir}/</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <Image
          src={listing.images[0]}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      {listing.images.length > 1 && (
        <div className="grid grid-cols-2 gap-3">
          {listing.images.slice(1).map((src, i) => (
            <div
              key={src}
              className="relative aspect-video overflow-hidden rounded-lg"
            >
              <Image
                src={src}
                alt={`${title} ${i + 2}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
