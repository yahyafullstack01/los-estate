import { defineRouting } from "next-intl/routing";

export const locales = ["en", "uk", "ru", "es", "ar", "fr", "pl", "de", "tr"] as const;
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
  de: "Deutsch",
  tr: "Türkçe",
};

export const rtlLocales: Locale[] = ["ar"];
