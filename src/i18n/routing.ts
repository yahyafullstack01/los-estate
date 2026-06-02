import { defineRouting } from "next-intl/routing";

export const locales = ["en", "uk", "ru", "es", "ar", "fr", "pl"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: "en",
  localePrefix: "always",
});

export const localeLabels: Record<Locale, string> = {
  en: "English",
  uk: "Українська",
  ru: "Русский",
  es: "Español",
  ar: "العربية",
  fr: "Français",
  pl: "Polski",
};

export const rtlLocales: Locale[] = ["ar"];
