import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { guides, getGuideContent } from "@/data/guides";
import { Button } from "@/components/ui/Button";

export async function GuidesTeaser() {
  const t = await getTranslations("guides");
  const locale = await getLocale();
  const preview = guides.slice(0, 3);

  return (
    <section className="border-y border-border bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">{t("teaserTitle")}</h2>
          <p className="mt-4 text-muted leading-relaxed">{t("teaserIntro")}</p>
        </div>

        <ul className="mx-auto mt-12 max-w-3xl space-y-6">
          {preview.map((guide) => {
            const content = getGuideContent(guide, locale);
            return (
              <li key={guide.slug}>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="block transition-colors hover:text-brand-gold"
                >
                  <span className="font-serif text-xl sm:text-2xl">
                    {content.title}
                  </span>
                  <p className="mt-1 text-sm text-muted">{content.excerpt}</p>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex justify-center">
          <Button href="/guides" size="lg">
            {t("viewAll")}
          </Button>
        </div>
      </div>
    </section>
  );
}
