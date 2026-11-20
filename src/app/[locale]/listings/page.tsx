import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Suspense } from "react";
import {
  listings,
  sortListingsNewestFirst,
  sortListingsOldestFirst,
  sortListingsByPrice,
} from "@/data/listings";
import type { PropertyType, TransactionType } from "@/data/listings";
import { ListingFilters } from "@/components/listing/ListingFilters";
import { PropertyGrid } from "@/components/listing/PropertyGrid";
import { getPageAlternates } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    transaction?: string;
    type?: string;
    sort?: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("listingsTitle"),
    description: t("listingsDescription"),
    alternates: getPageAlternates(locale as Locale, "/listings"),
  };
}

export default async function ListingsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { transaction, type, sort } = await searchParams;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("listings");

  const matched = listings.filter((l) => {
    if (transaction && l.transaction !== (transaction as TransactionType)) {
      return false;
    }
    if (type && l.type !== (type as PropertyType)) {
      return false;
    }
    return true;
  });

  const filtered =
    sort === "price-asc"
      ? sortListingsByPrice(matched, "asc")
      : sort === "price-desc"
        ? sortListingsByPrice(matched, "desc")
        : sort === "oldest"
          ? sortListingsOldestFirst(matched)
          : sortListingsNewestFirst(matched);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="font-serif text-4xl">{t("title")}</h1>
        <p className="mt-3 text-muted">{t("subtitle")}</p>
      </div>

      <div className="mt-10 space-y-8">
        <Suspense fallback={<div className="h-24 animate-pulse rounded-xl bg-surface-muted" />}>
          <ListingFilters />
        </Suspense>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-muted">{t("noResults")}</p>
        ) : (
          <PropertyGrid listings={filtered} />
        )}
      </div>
    </div>
  );
}
