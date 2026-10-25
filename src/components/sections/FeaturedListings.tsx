import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { listings } from "@/data/listings";
import { PropertyGrid } from "@/components/listing/PropertyGrid";
import { Button } from "@/components/ui/Button";

const HOME_FEATURED_LIMIT = 3;

export async function FeaturedListings() {
  const t = await getTranslations("featured");
  const saleListings = listings
    .filter((l) => l.featured && l.transaction === "sale")
    .slice(0, HOME_FEATURED_LIMIT);
  const rentListings = listings
    .filter((l) => l.featured && l.transaction === "rent")
    .slice(0, HOME_FEATURED_LIMIT);

  return (
    <section className="bg-surface-muted/50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h2 className="font-serif text-3xl">{t("title")}</h2>
          <Link
            href="/listings"
            className="text-sm font-medium text-brand-gold hover:underline"
          >
            {t("viewAll")} →
          </Link>
        </div>

        <div className="mt-12">
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-brand-gold">
            {t("sale")}
          </h3>
          <PropertyGrid listings={saleListings} />
          <div className="mt-8 flex justify-center">
            <Button href="/listings?transaction=sale" variant="secondary">
              {t("viewAllSale")}
            </Button>
          </div>
        </div>

        <div className="mt-14">
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-brand-gold">
            {t("rent")}
          </h3>
          <PropertyGrid listings={rentListings} />
          <div className="mt-8 flex justify-center">
            <Button href="/listings?transaction=rent" variant="secondary">
              {t("viewAllRent")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
