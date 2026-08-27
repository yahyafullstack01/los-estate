import { getTranslations } from "next-intl/server";
import {
  Building2,
  Handshake,
  HardHat,
  Home,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

const partnerTracks = [
  {
    key: "agency" as const,
    interest: "agency",
    icon: Handshake,
  },
  {
    key: "landlord" as const,
    interest: "landlord",
    icon: Home,
  },
  {
    key: "developer" as const,
    interest: "developer",
    icon: HardHat,
  },
] as const;

const steps = ["step1", "step2", "step3", "step4"] as const;

export async function PartnersContent() {
  const t = await getTranslations("partners");

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,_rgba(197,160,89,0.18),_transparent_65%)]"
      />

      {/* Hero — one composition */}
      <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
          LOS ESTATE
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {t("subtitle")}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/contact?interest=agency" size="lg">
            {t("ctaPrimary")}
          </Button>
          <Button href="/listings" variant="secondary" size="lg">
            {t("ctaSecondary")}
          </Button>
        </div>
      </section>

      {/* Who we partner with */}
      <section className="border-y border-border bg-surface-muted/40 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl">{t("tracksTitle")}</h2>
          <p className="mt-3 max-w-2xl text-muted">{t("tracksSubtitle")}</p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {partnerTracks.map(({ key, interest, icon: Icon }) => (
              <article
                key={key}
                className="flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-brand-gold/40 sm:p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold/15">
                  <Icon className="h-6 w-6 text-brand-gold" />
                </div>
                <h3 className="mt-5 font-serif text-2xl">{t(`tracks.${key}.title`)}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {t(`tracks.${key}.text`)}
                </p>
                <ul className="mt-5 space-y-2">
                  {(
                    t.raw(`tracks.${key}.points`) as string[]
                  ).map((point) => (
                    <li
                      key={point}
                      className="flex gap-2 text-sm text-foreground before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-brand-gold before:content-['']"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button href={`/contact?interest=${interest}`} className="w-full sm:w-auto">
                    {t(`tracks.${key}.cta`)}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
                {t("processEyebrow")}
              </p>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                {t("processTitle")}
              </h2>
              <p className="mt-4 text-muted">{t("processSubtitle")}</p>
              <div className="mt-8 flex flex-wrap gap-4 text-sm text-muted">
                <span className="inline-flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-brand-gold" />
                  {t("markets")}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4 text-brand-gold" />
                  {t("audience")}
                </span>
              </div>
            </div>

            <ol className="space-y-6">
              {steps.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-4 rounded-xl border border-border bg-surface p-5 sm:gap-5 sm:p-6"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 font-serif text-lg text-brand-gold">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {t(`process.${step}.title`)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {t(`process.${step}.text`)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="rounded-2xl border border-brand-gold/30 bg-surface px-6 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="font-serif text-3xl sm:text-4xl">{t("closingTitle")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{t("closingSubtitle")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact?interest=agency" size="lg">
              {t("closingCta")}
            </Button>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base text-brand-gold transition-colors hover:bg-brand-gold/10"
            >
              {t("closingContact")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
