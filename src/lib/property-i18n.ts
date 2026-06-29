import type { Listing } from "@/data/listings";
import { getTranslations } from "next-intl/server";

export async function getPropertyTranslations(slug: string) {
  const pt = await getTranslations(`properties.${slug}`);
  return {
    title: pt("title"),
    description: pt.has("description") ? pt("description") : "",
    location: pt.has("location") ? pt("location") : null,
    features: pt.has("features")
      ? (pt.raw("features") as string[])
      : pt.has("socialAmenities")
        ? (pt.raw("socialAmenities") as string[])
        : null,
    roomSpecs: pt.has("roomSpecs") ? (pt.raw("roomSpecs") as string[]) : [],
    roomSpecsTitle: pt.has("roomSpecsTitle") ? pt("roomSpecsTitle") : null,
    socialAmenities: pt.has("socialAmenities")
      ? (pt.raw("socialAmenities") as string[])
      : [],
    socialAmenitiesTitle: pt.has("socialAmenitiesTitle")
      ? pt("socialAmenitiesTitle")
      : null,
    note: pt.has("note") ? pt("note") : null,
  };
}

export async function getListingLocation(
  slug: string,
  listing: Listing
): Promise<string> {
  const { location } = await getPropertyTranslations(slug);
  return location ?? listing.location;
}

export async function getListingFeatures(
  slug: string,
  listing: Listing
): Promise<string[]> {
  const { features, socialAmenities } = await getPropertyTranslations(slug);
  return socialAmenities.length > 0
    ? socialAmenities
    : features ?? listing.features;
}

export interface ListingInquiryContext {
  slug: string;
  title: string;
  type: Listing["type"];
  typeLabel: string;
  transaction: Listing["transaction"];
  transactionLabel: string;
}

export async function getListingInquiryContext(
  slug: string,
  listing: Listing
): Promise<ListingInquiryContext> {
  const property = await getPropertyTranslations(slug);
  const tTypes = await getTranslations("types");
  const tTx = await getTranslations("transactions");

  return {
    slug,
    title: property.title,
    type: listing.type,
    typeLabel: tTypes(listing.type),
    transaction: listing.transaction,
    transactionLabel: tTx(listing.transaction),
  };
}
