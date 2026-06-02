import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";

export async function CTA() {
  const t = await getTranslations("cta");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-brand-gold/30 bg-surface px-6 py-12 text-center sm:px-12 sm:py-16">
        <h2 className="font-serif text-3xl sm:text-4xl">{t("title")}</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">{t("subtitle")}</p>
        <div className="mt-8">
          <Button href="/contact" size="lg">
            {t("button")}
          </Button>
        </div>
      </div>
    </section>
  );
}
