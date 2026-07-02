import { type Listing } from "@/data/listings";

export function formatPrice(listing: Listing, locale: string): string {
  const formatAmount = (amount: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: listing.currency,
      maximumFractionDigits: 0,
    }).format(amount);

  if (listing.priceMax != null && listing.priceMax > listing.price) {
    return `${formatAmount(listing.price)} – ${formatAmount(listing.priceMax)}`;
  }

  return formatAmount(listing.price);
}

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
