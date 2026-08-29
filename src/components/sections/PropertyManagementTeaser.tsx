import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { PropertyManagementOptions } from "@/components/sections/PropertyManagementOptions";

export async function PropertyManagementTeaser() {
  const t = await getTranslations("propertyManagement");

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface-muted/40 py-16 sm:py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{t("intro")}</p>
        </div>

        <div className="mt-12">
          <PropertyManagementOptions />
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <Button href="/for-owners" size="lg">
            {t("learnMore")}
          </Button>
          <p className="max-w-md text-sm text-muted">{t("ctaNote")}</p>
        </div>
      </div>
    </section>
  );
}
