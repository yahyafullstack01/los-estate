import { getTranslations } from "next-intl/server";
import { CalendarCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

const options = [
  { key: "turnkey" as const, icon: Sparkles, number: "01" },
  { key: "guaranteed" as const, icon: CalendarCheck, number: "02" },
] as const;

interface PropertyManagementOptionsProps {
  showCardCtas?: boolean;
}

export async function PropertyManagementOptions({
  showCardCtas = true,
}: PropertyManagementOptionsProps) {
  const t = await getTranslations("propertyManagement");

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      {options.map(({ key, icon: Icon, number }) => (
        <article
          key={key}
          className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-sm transition-colors hover:border-brand-gold/40 sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold/15 transition-colors group-hover:bg-brand-gold/20">
              <Icon className="h-6 w-6 text-brand-gold" />
            </div>
            <span className="font-serif text-4xl leading-none text-brand-gold/25 transition-colors group-hover:text-brand-gold/40">
              {number}
            </span>
          </div>

          <h3 className="mt-6 font-serif text-2xl sm:text-3xl">
            {t(`options.${key}.title`)}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            {t(`options.${key}.text`)}
          </p>

          <ul className="mt-6 flex-1 space-y-3">
            {(t.raw(`options.${key}.points`) as string[]).map((point) => (
              <li
                key={point}
                className="flex gap-3 text-sm leading-relaxed text-foreground before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-brand-gold before:content-['']"
              >
                {point}
              </li>
            ))}
          </ul>

          <p className="mt-6 rounded-lg border border-brand-gold/20 bg-brand-gold/5 px-4 py-3 text-sm font-medium text-foreground">
            {t(`options.${key}.highlight`)}
          </p>

          {showCardCtas && (
            <div className="mt-6">
              <Button href={`/contact?interest=${key}#inquiry`} className="w-full sm:w-auto">
                {t(`options.${key}.cta`)}
              </Button>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
