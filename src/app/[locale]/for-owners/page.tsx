import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ForOwnersContent } from "@/components/sections/ForOwnersContent";
import { getAlternateLanguages } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("forOwnersTitle"),
    description: t("forOwnersDescription"),
    alternates: {
      languages: getAlternateLanguages("/for-owners"),
    },
  };
}

export default async function ForOwnersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return <ForOwnersContent />;
}
