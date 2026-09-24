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

/** Extract apartment layout (1+1, Duplex 2+1, …) from a listing title for card display. */
export function splitListingTitle(title: string): {
  name: string;
  layout: string | null;
} {
  const match = title.match(
    /((?:Duplex|Дуплекс|Dubleks|Dúplex)\s+)?\d\+\d/i
  );
  if (!match || match.index == null) {
    return { name: title, layout: null };
  }

  const layout = match[0].replace(/\s+/g, " ").trim();
  const name = `${title.slice(0, match.index)}${title.slice(match.index + match[0].length)}`
    .replace(
      /\s*[—–-]?\s*(Rent|Аренда|Оренда|Kiralık|Miete|Location|Alquiler|Wynajem|للإيجار)\s*$/iu,
      ""
    )
    .replace(/\s*[—–-]\s*/g, " — ")
    .replace(/\s{2,}/g, " ")
    .replace(/\s*—\s*$/u, "")
    .replace(/^\s*—\s*/u, "")
    .replace(/\s*—\s*—\s*/g, " — ")
    .trim();

  return { name: name || title, layout };
}
