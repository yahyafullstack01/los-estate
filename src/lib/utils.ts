import { type Listing } from "@/data/listings";

export function formatPrice(listing: Listing, locale: string): string {
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: listing.currency,
    maximumFractionDigits: 0,
  }).format(listing.price);

  return formatted;
}

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
