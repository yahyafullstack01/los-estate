import { getLocale } from "next-intl/server";
import { absoluteUrl, getSiteUrl, getLocalizedPath } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function OrganizationJsonLd() {
  const locale = (await getLocale()) as Locale;
  const siteUrl = getSiteUrl();
  const homeUrl = `${siteUrl}${getLocalizedPath(locale, "/")}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "LOS ESTATE",
        url: siteUrl,
        logo: absoluteUrl("/logo-light.png"),
        email: "losestate2025@gmail.com",
        telephone: "+48-575-656-702",
        sameAs: [],
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${siteUrl}/#localbusiness`,
        name: "LOS ESTATE",
        url: homeUrl,
        image: absoluteUrl("/og-default.png"),
        email: "losestate2025@gmail.com",
        telephone: "+48-575-656-702",
        priceRange: "€€€",
        areaServed: [
          { "@type": "City", name: "Alanya" },
          { "@type": "City", name: "Gazipaşa" },
          { "@type": "AdministrativeArea", name: "Antalya" },
          { "@type": "Country", name: "Turkey" },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Alanya",
          addressRegion: "Antalya",
          addressCountry: "TR",
        },
        parentOrganization: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "LOS ESTATE",
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: [
          "en",
          "ru",
          "uk",
          "tr",
          "de",
          "fr",
          "es",
          "pl",
          "ar",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
