import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 dark:opacity-20" aria-hidden>
        <Image
          src="/hero/home-hero.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
          quality={75}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
            LOS ESTATE
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg text-muted leading-relaxed">{t("subtitle")}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button href="/listings" size="lg">
              {t("ctaBrowse")}
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              {t("ctaContact")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
