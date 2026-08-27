import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PartnersContent } from "@/components/sections/PartnersContent";
import { getAlternateLanguages } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("partnersTitle"),
    description: t("partnersDescription"),
    alternates: {
      languages: getAlternateLanguages("/partners"),
    },
  };
}

export default async function PartnersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return <PartnersContent />;
}
