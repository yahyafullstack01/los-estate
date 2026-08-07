import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { type Listing } from "@/data/listings";
import { formatPrice } from "@/lib/utils";
import { getListingLocation, getPropertyTranslations } from "@/lib/property-i18n";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Bed, Bath, Maximize } from "lucide-react";

interface PropertyCardProps {
  listing: Listing;
}

export async function PropertyCard({ listing }: PropertyCardProps) {
  const t = await getTranslations();
  const locale = await getLocale();
  const property = await getPropertyTranslations(listing.slug);
  const title = property.title;
  const location = await getListingLocation(listing.slug, listing);
  const price = formatPrice(listing, locale);
  const priceLabel =
    property.priceLabel ??
    (listing.transaction === "rent"
      ? `${price}${t("listings.perMonth")}`
      : price);
  const imageSrc = listing.images[0] ?? "/og-default.png";

  return (
    <Card className="group flex flex-col">
      <Link href={`/listings/${listing.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute start-3 top-3 flex gap-2">
            <Badge>{t(`transactions.${listing.transaction}`)}</Badge>
            <Badge variant="muted">{t(`types.${listing.type}`)}</Badge>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <p className="font-serif text-lg leading-tight text-foreground group-hover:text-brand-gold transition-colors">
            {title}
          </p>
          <p className="mt-1 text-sm text-muted">{location}</p>
          <p className="mt-3 text-xl font-semibold text-brand-gold">{priceLabel}</p>
          <ul className="mt-4 flex flex-wrap gap-4 text-xs text-muted">
            <li className="flex items-center gap-1">
              <Bed className="h-3.5 w-3.5" />
              {t("listings.beds", { count: listing.beds })}
            </li>
            <li className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" />
              {t("listings.baths", { count: listing.baths })}
            </li>
            <li className="flex items-center gap-1">
              <Maximize className="h-3.5 w-3.5" />
              {t("listings.area", { sqm: listing.areaSqm })}
            </li>
          </ul>
          <span className="mt-4 text-sm font-medium text-brand-gold">
            {t("listings.viewDetails")} →
          </span>
        </div>
      </Link>
    </Card>
  );
}
