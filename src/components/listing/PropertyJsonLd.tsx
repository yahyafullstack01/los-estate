import { getLocale, getTranslations } from "next-intl/server";
import { type Listing } from "@/data/listings";
import { getSiteUrl, getLocalizedPath } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function PropertyJsonLd({ listing }: { listing: Listing }) {
  const t = await getTranslations(`properties.${listing.slug}`);
  const locale = (await getLocale()) as Locale;
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${getLocalizedPath(locale, `/listings/${listing.slug}`)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: t("title"),
    description: t("description"),
    url,
    image: listing.images,
    address: {
      "@type": "PostalAddress",
      addressLocality: listing.location,
    },
    numberOfRooms: listing.beds,
    floorSize: {
      "@type": "QuantitativeValue",
      value: listing.areaSqm,
      unitCode: "MTK",
    },
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: listing.currency,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
