import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { HeroMedia } from "@/components/sections/HeroMedia";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden">
      <HeroMedia />

      <div
        className="absolute inset-0 bg-gradient-to-r from-brand-teal/88 via-brand-teal/55 to-brand-teal/20"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-brand-teal/35"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:justify-center lg:px-8 lg:pb-28 lg:pt-24">
        <div className="max-w-2xl">
          <p className="hero-reveal hero-reveal-1 text-base font-semibold uppercase tracking-[0.28em] text-brand-gold sm:text-lg">
            LOS ESTATE
          </p>
          <h1 className="hero-reveal hero-reveal-2 mt-5 font-serif text-5xl leading-[1.05] tracking-tight text-[#f5f0e6] sm:text-6xl lg:text-7xl">
            {t("title")}
          </h1>
          <p className="hero-reveal hero-reveal-3 mt-6 max-w-xl text-lg leading-relaxed text-[#f5f0e6]/80 sm:text-xl">
            {t("subtitle")}
          </p>
          <div className="hero-reveal hero-reveal-4 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              href="/listings"
              size="lg"
              className="rounded-full px-9 shadow-[0_12px_40px_-12px_rgba(197,160,89,0.55)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {t("ctaBrowse")}
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              className="rounded-full border-[#f5f0e6]/40 bg-white/10 px-9 text-[#f5f0e6] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 hover:border-brand-gold hover:bg-white/15 hover:text-brand-gold"
            >
              {t("ctaContact")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
