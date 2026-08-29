import { getTranslations } from "next-intl/server";
import { CheckCircle2, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { PropertyManagementOptions } from "@/components/sections/PropertyManagementOptions";

const whyIcons = [Shield, TrendingUp, CheckCircle2];
const steps = ["step1", "step2", "step3", "step4"] as const;
const faqKeys = ["q1", "q2", "q3"] as const;

export async function ForOwnersContent() {
  const t = await getTranslations("propertyManagement");

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,_rgba(197,160,89,0.18),_transparent_65%)]"
      />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
          LOS ESTATE
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
          {t("pageTitle")}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {t("pageSubtitle")}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/contact?interest=turnkey#inquiry" size="lg">
            {t("options.turnkey.cta")}
          </Button>
          <Button href="/contact?interest=guaranteed#inquiry" variant="secondary" size="lg">
            {t("options.guaranteed.cta")}
          </Button>
        </div>
      </section>

      {/* Two options */}
      <section className="border-y border-border bg-surface-muted/40 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-serif text-3xl sm:text-4xl">
            {t("optionsTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
            {t("intro")}
          </p>
          <div className="mt-12">
            <PropertyManagementOptions />
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl">{t("whyTitle")}</h2>
          <p className="mt-3 max-w-2xl text-muted">{t("whySubtitle")}</p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(t.raw("whyItems") as { title: string; text: string }[]).map(
              (item, index) => {
                const Icon = whyIcons[index] ?? Shield;
                return (
                  <li
                    key={item.title}
                    className="rounded-2xl border border-border bg-surface p-6"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gold/15">
                      <Icon className="h-5 w-5 text-brand-gold" />
                    </div>
                    <p className="mt-5 font-medium text-foreground">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.text}
                    </p>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-border bg-surface-muted/40 py-16 sm:py-20 lg:py-24">
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

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-serif text-3xl sm:text-4xl">
            {t("faqTitle")}
          </h2>
          <dl className="mt-10 space-y-6">
            {faqKeys.map((key) => (
              <div
                key={key}
                className="rounded-xl border border-border bg-surface p-5 sm:p-6"
              >
                <dt className="font-medium text-foreground">{t(`faq.${key}.q`)}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">
                  {t(`faq.${key}.a`)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="rounded-2xl border border-brand-gold/30 bg-surface px-6 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="font-serif text-3xl sm:text-4xl">{t("closingTitle")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{t("closingSubtitle")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact?interest=turnkey#inquiry" size="lg">
              {t("options.turnkey.cta")}
            </Button>
            <Link
              href="/contact?interest=guaranteed#inquiry"
              className="inline-flex items-center justify-center rounded-lg border border-brand-gold px-8 py-3 text-base text-brand-gold transition-colors hover:bg-brand-gold/10"
            >
              {t("options.guaranteed.cta")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
