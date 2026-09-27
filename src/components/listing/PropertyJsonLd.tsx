import { getLocale, getTranslations } from "next-intl/server";
import { type Listing } from "@/data/listings";
import { absoluteUrl, getSiteUrl, getLocalizedPath } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function PropertyJsonLd({ listing }: { listing: Listing }) {
  const t = await getTranslations(`properties.${listing.slug}`);
  const locale = (await getLocale()) as Locale;
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${getLocalizedPath(locale, `/listings/${listing.slug}`)}`;
  const images = listing.images.map((src) => absoluteUrl(src));

  const offer: Record<string, unknown> = {
    "@type": "Offer",
    priceCurrency: listing.currency,
    availability: "https://schema.org/InStock",
    url,
  };

  // Skip invalid €0 prices (e.g. "price on request")
  if (listing.price > 0) {
    if (listing.priceMax != null && listing.priceMax > listing.price) {
      offer["@type"] = "AggregateOffer";
      offer.lowPrice = listing.price;
      offer.highPrice = listing.priceMax;
    } else {
      offer.price = listing.price;
    }
  } else {
    offer.priceSpecification = {
      "@type": "PriceSpecification",
      priceCurrency: listing.currency,
      description: t.has("priceLabel") ? t("priceLabel") : "Price on request",
    };
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: t("title"),
    description: t("description"),
    url,
    image: images,
    address: {
      "@type": "PostalAddress",
      addressLocality: t.has("location") ? t("location") : listing.location,
      addressCountry: "TR",
    },
    numberOfRooms: listing.beds,
    floorSize: {
      "@type": "QuantitativeValue",
      value: listing.areaSqm,
      unitCode: "MTK",
    },
    offers: offer,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
