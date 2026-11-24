import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { absoluteUrl, getLocalizedPath } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export type BreadcrumbItem = {
  label: string;
  /** Localized path, e.g. "/listings" or "/listings/some-slug". Omit for the current page (last item). */
  href?: string;
};

export async function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const locale = (await getLocale()) as Locale;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href
        ? absoluteUrl(getLocalizedPath(locale, item.href))
        : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && <span aria-hidden="true">/</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-foreground hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-foreground">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
