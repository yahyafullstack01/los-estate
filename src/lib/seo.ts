import { locales, type Locale } from "@/i18n/routing";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://los-estate.com";

export function getSiteUrl(): string {
  return siteUrl.replace(/\/$/, "");
}

export function getLocalizedPath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized === "/" ? "" : normalized}`;
}

export function getAlternateLanguages(
  path: string
): Record<string, string> {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const suffix = normalized === "/" ? "" : normalized;

  const languages = Object.fromEntries(
    locales.map((locale) => [
      locale,
      `${base}/${locale}${suffix}`,
    ])
  );

  return {
    ...languages,
    "x-default": `${base}/en${suffix}`,
  };
}
