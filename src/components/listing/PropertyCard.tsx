import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { type Listing } from "@/data/listings";
import { formatPrice, splitListingTitle } from "@/lib/utils";
import { getListingLocation, getPropertyTranslations } from "@/lib/property-i18n";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { WhatsAppLink } from "@/components/contact/WhatsAppLink";
import { PropertyCardMedia } from "@/components/listing/PropertyCardMedia";
import { absoluteUrl } from "@/lib/seo";
import { Bed, Bath, MapPin, Maximize } from "lucide-react";

interface PropertyCardProps {
  listing: Listing;
}

export async function PropertyCard({ listing }: PropertyCardProps) {
  const t = await getTranslations();
  const locale = await getLocale();
  const property = await getPropertyTranslations(listing.slug);
  const title = property.title;
  const { name, layout } = splitListingTitle(title);
  const location = await getListingLocation(listing.slug, listing);
  const price = formatPrice(listing, locale);
  const priceLabel =
    property.priceLabel ??
    (listing.transaction === "rent"
      ? `${price}${t("listings.perMonth")}`
      : price);
  const listingUrl = absoluteUrl(`/${locale}/listings/${listing.slug}`);
  const whatsappPrefill = t("listings.whatsappPrefill", {
    title,
    url: listingUrl,
  });
  const displayTitle = layout ? `${name} (${layout})` : name;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-sm transition-shadow hover:shadow-md">
      <PropertyCardMedia
        slug={listing.slug}
        title={title}
        images={listing.images}
        badges={
          <>
            <Badge variant={listing.transaction}>
              {t(`transactions.${listing.transaction}`)}
            </Badge>
            <Badge variant={listing.type}>{t(`types.${listing.type}`)}</Badge>
          </>
        }
      />

      <div className="flex flex-1 flex-col px-4 pb-2 pt-4 sm:px-5 sm:pt-5">
        <Link href={`/listings/${listing.slug}`} className="block">
          <h3 className="font-serif text-xl leading-snug text-foreground transition-colors group-hover:text-brand-gold sm:text-2xl">
            {displayTitle}
          </h3>
          <p className="mt-2 flex items-start gap-1.5 text-sm text-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden />
            <span className="line-clamp-2">{location}</span>
          </p>
          <p className="mt-3 text-lg font-semibold text-brand-gold">{priceLabel}</p>
        </Link>

        <ul className="mt-4 flex flex-wrap items-center gap-x-0 gap-y-2 text-sm text-foreground/80">
          <li className="flex items-center gap-1.5 pe-3">
            <Maximize className="h-4 w-4 text-brand-gold" aria-hidden />
            {t("listings.area", { sqm: listing.areaSqm })}
          </li>
          <li
            className="hidden h-4 w-px bg-brand-gold/40 sm:block"
            aria-hidden
          />
          <li className="flex items-center gap-1.5 px-3">
            <Bed className="h-4 w-4 text-brand-gold" aria-hidden />
            {t("listings.beds", { count: listing.beds })}
          </li>
          <li
            className="hidden h-4 w-px bg-brand-gold/40 sm:block"
            aria-hidden
          />
          <li className="flex items-center gap-1.5 ps-3">
            <Bath className="h-4 w-4 text-brand-gold" aria-hidden />
            {t("listings.baths", { count: listing.baths })}
          </li>
        </ul>
      </div>

      <div className="mt-auto flex gap-2 border-t border-border/70 px-4 py-3.5 sm:px-5 sm:py-4">
        <WhatsAppLink
          label={t("listings.whatsapp")}
          prefill={whatsappPrefill}
          size="sm"
          className="min-w-0 flex-1 rounded-xl"
        />
        <Button
          href={`/listings/${listing.slug}#inquire`}
          variant="primary"
          size="sm"
          className="min-w-0 flex-1 rounded-xl"
        >
          {t("listings.contactUs")}
        </Button>
      </div>
    </article>
  );
}
