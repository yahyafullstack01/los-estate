import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  sortListingsNewestFirst,
  getListingCountryCityParams,
  getListingsByCountryCity,
  type CitySlug,
} from "@/data/listings";
import { PropertyGrid } from "@/components/listing/PropertyGrid";
import { getPageAlternates } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string; country: string; city: string }>;
};

const CITY_DISPLAY_NAMES: Record<CitySlug, string> = {
  alanya: "Alanya",
  gazipasa: "Gazipaşa",
};

const COUNTRY_DISPLAY_NAMES: Record<string, string> = {
  turkey: "Turkey",
};

export function generateStaticParams() {
  const combos = getListingCountryCityParams();
  return routing.locales.flatMap((locale) =>
    combos.map(({ country, city }) => ({ locale, country, city }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, country, city } = await params;
  const cityName = CITY_DISPLAY_NAMES[city as CitySlug];
  const countryName = COUNTRY_DISPLAY_NAMES[country];
  if (!cityName || !countryName) return {};

  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("cityListingsTitle", { city: cityName, country: countryName }),
    description: t("cityListingsDescription", {
      city: cityName,
      country: countryName,
    }),
    alternates: getPageAlternates(
      locale as Locale,
      `/locations/${country}/${city}`
    ),
  };
}

export default async function CityListingsPage({ params }: Props) {
  const { locale, country, city } = await params;
  setRequestLocale(locale as Locale);

  const cityName = CITY_DISPLAY_NAMES[city as CitySlug];
  const countryName = COUNTRY_DISPLAY_NAMES[country];
  if (!cityName || !countryName) notFound();

  const listings = sortListingsNewestFirst(
    getListingsByCountryCity(country, city as CitySlug)
  );
  if (listings.length === 0) notFound();

  const t = await getTranslations("listings");
  const tIntro = await getTranslations("locationIntros");
  const paragraphs = tIntro.raw(`${city}.paragraphs`) as string[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="font-serif text-4xl">
          {t("cityTitle", { city: cityName })}
        </h1>
        <p className="mt-3 text-muted">
          {t("citySubtitle", { city: cityName, country: countryName })}
        </p>
      </div>

      <div className="mt-6 max-w-2xl space-y-4 text-muted leading-relaxed">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-10">
        <PropertyGrid listings={listings} />
      </div>
    </div>
  );
}
