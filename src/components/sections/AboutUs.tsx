import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Globe, Shield, Workflow } from "lucide-react";
import { aboutImages } from "@/data/about-images";

export async function AboutIntro() {
  const t = await getTranslations("about");

  return (
    <section id="about" className="scroll-mt-20 bg-surface-muted/40 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="order-2 lg:order-1">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
            LosEstate
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 text-lg font-medium leading-relaxed text-foreground">
            {t("lead")}
          </p>
          <p className="mt-5 text-muted leading-relaxed">{t("body")}</p>
        </div>

        <div className="order-1 grid grid-cols-12 gap-3 sm:gap-4 lg:order-2">
          <div className="relative col-span-7 row-span-2 aspect-[3/4] overflow-hidden rounded-2xl border border-border shadow-lg">
            <Image
              src={aboutImages.hero.src}
              alt={t("images.hero")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 58vw, 28vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-teal/60 via-transparent to-transparent" />
          </div>
          <div className="relative col-span-5 aspect-square overflow-hidden rounded-2xl border border-border shadow-md">
            <Image
              src={aboutImages.team.src}
              alt={t("images.team")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 42vw, 18vw"
            />
          </div>
          <div className="relative col-span-5 aspect-square overflow-hidden rounded-2xl border border-border shadow-md">
            <Image
              src={aboutImages.international.src}
              alt={t("images.international")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 42vw, 18vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export async function AboutSpecialization() {
  const t = await getTranslations("about");
  const specializations = t.raw("specializations") as {
    title: string;
    text: string;
  }[];

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border">
              <Image
                src={aboutImages.renovation.src}
                alt={t("images.renovation")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-brand-teal/20 mix-blend-multiply" />
            </div>
            <div className="absolute -bottom-4 -end-4 hidden rounded-xl border border-brand-gold/40 bg-surface px-5 py-4 shadow-lg sm:block">
              <p className="font-serif text-3xl text-brand-gold">15+</p>
              <p className="text-xs uppercase tracking-wider text-muted">
                {t("yearsLabel")}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h3 className="font-serif text-2xl text-brand-gold sm:text-3xl">
              {t("specializationTitle")}
            </h3>
            <ul className="mt-8 space-y-6">
              {specializations.map((item) => (
                <li
                  key={item.title}
                  className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-brand-gold/40"
                >
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function AboutWhyChoose() {
  const t = await getTranslations("about");
  const whyItems = t.raw("whyItems") as { title: string; text: string }[];
  const whyIcons = [Globe, Workflow, Shield];

  return (
    <section className="bg-surface-muted/40 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="text-center font-serif text-2xl text-brand-gold sm:text-3xl">
          {t("whyTitle")}
        </h3>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyItems.map((item, index) => {
            const Icon = whyIcons[index] ?? Globe;
            return (
              <li
                key={item.title}
                className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gold/15">
                  <Icon className="h-5 w-5 text-brand-gold" />
                </div>
                <p className="mt-5 font-medium text-foreground">{item.title}</p>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {item.text}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export async function AboutClosing() {
  const t = await getTranslations("about");

  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
      <div className="relative min-h-[280px] overflow-hidden rounded-2xl sm:min-h-[320px]">
        <Image
          src={aboutImages.closing.src}
          alt={t("images.closing")}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-teal/95 via-brand-teal/80 to-brand-teal/50" />
        <blockquote className="relative flex h-full min-h-[280px] flex-col justify-center px-6 py-10 sm:min-h-[320px] sm:px-12 lg:px-16">
          <p className="max-w-2xl font-serif text-xl italic leading-relaxed text-white sm:text-2xl lg:text-3xl">
            {t("closing")}
          </p>
          <div className="mt-6 h-1 w-16 bg-brand-gold" aria-hidden />
        </blockquote>
      </div>
    </section>
  );
}
