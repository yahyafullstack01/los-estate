import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { CategoryStrip } from "@/components/sections/CategoryStrip";
import {
  AboutIntro,
  AboutSpecialization,
  AboutWhyChoose,
  AboutClosing,
} from "@/components/sections/AboutUs";
import { FeaturedListings } from "@/components/sections/FeaturedListings";
import { Stats } from "@/components/sections/Stats";
import { CTA } from "@/components/sections/CTA";
import { getAlternateLanguages } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: {
      languages: getAlternateLanguages("/"),
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <Hero />
      <CategoryStrip />
      <AboutIntro />
      <FeaturedListings />
      <AboutSpecialization />
      <AboutWhyChoose />
      <AboutClosing />
      <Stats />
      <CTA />
    </>
  );
}
