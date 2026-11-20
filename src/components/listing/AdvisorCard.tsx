import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";

const stats = [
  { value: "15+", key: "years" as const },
  { value: "120+", key: "properties" as const },
  { value: "2,400+", key: "clients" as const },
];

export async function AdvisorCard() {
  const t = await getTranslations("listings");
  const tStats = await getTranslations("stats");

  return (
    <div className="mt-8 rounded-xl border border-border bg-surface p-4 sm:p-5">
      <div className="flex items-center gap-4">
        <Image
          src="/logo-light.png"
          alt="LOS ESTATE"
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-foreground">{t("advisorName")}</p>
          <p className="text-sm text-muted">{t("advisorReplyTime")}</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted">{t("advisorBlurb")}</p>

      <div className="mt-4 grid grid-cols-3 gap-2 border-y border-border py-4">
        {stats.map((stat) => (
          <div key={stat.key} className="text-center">
            <p className="font-serif text-xl text-brand-gold sm:text-2xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-muted">{tStats(stat.key)}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href="tel:+48575656702"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-brand-gold hover:text-brand-gold"
        >
          <Phone className="h-4 w-4" />
          {t("advisorCall")}
        </a>
        <a
          href="mailto:losestate2025@gmail.com"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-brand-gold hover:text-brand-gold"
        >
          <Mail className="h-4 w-4" />
          {t("advisorEmail")}
        </a>
      </div>
    </div>
  );
}
