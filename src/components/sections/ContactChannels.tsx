import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  Building2,
  Clock3,
  HandCoins,
  Home,
  KeyRound,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

const PHONE_DISPLAY = "+48 575 656 702";
const PHONE_TEL = "+48575656702";
const EMAIL = "losestate2025@gmail.com";
const WHATSAPP_NUMBER = "48575656702";

const services = [
  { key: "buy" as const, interest: "buy", icon: Home },
  { key: "rent" as const, interest: "rent", icon: KeyRound },
  { key: "sell" as const, interest: "sell", icon: HandCoins },
  { key: "viewing" as const, interest: "viewing", icon: Building2 },
];

export async function ContactChannels() {
  const t = await getTranslations("contact");
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t("whatsappPrefill")
  )}`;

  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
          LOS ESTATE
        </p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">{t("title")}</h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
          {t("subtitle")}
        </p>
        <p className="mt-3 flex items-center gap-2 text-sm text-muted">
          <Clock3 className="h-4 w-4 shrink-0 text-brand-gold" />
          {t("responseTime")}
        </p>
      </div>

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
          {t("channelsTitle")}
        </h2>
        <ul className="mt-4 space-y-0 divide-y divide-border border-y border-border">
          <li>
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-start gap-3 py-4 transition-colors hover:text-brand-gold"
            >
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
              <span>
                <span className="block text-sm font-medium text-foreground">
                  {t("callUs")}
                </span>
                <span className="text-sm text-muted">{PHONE_DISPLAY}</span>
              </span>
            </a>
          </li>
          <li>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 py-4 transition-colors hover:text-brand-gold"
            >
              <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
              <span>
                <span className="block text-sm font-medium text-foreground">
                  {t("whatsapp")}
                </span>
                <span className="block text-sm text-muted">{PHONE_DISPLAY}</span>
                <span className="mt-0.5 block text-sm text-muted">
                  {t("whatsappHint")}
                </span>
              </span>
            </a>
          </li>
          <li>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-start gap-3 py-4 transition-colors hover:text-brand-gold"
            >
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
              <span>
                <span className="block text-sm font-medium text-foreground">
                  {t("emailUs")}
                </span>
                <span className="text-sm text-muted">{EMAIL}</span>
              </span>
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
          {t("servicesTitle")}
        </h2>
        <p className="mt-2 text-sm text-muted">{t("servicesSubtitle")}</p>
        <ul className="mt-5 space-y-4">
          {services.map(({ key, interest, icon: Icon }) => (
            <li key={key}>
              <Link
                href={`/contact?interest=${interest}`}
                className="group flex gap-3 transition-colors"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
                <span>
                  <span className="block text-sm font-medium text-foreground group-hover:text-brand-gold">
                    {t(`services.${key}.title`)}
                  </span>
                  <span className="text-sm text-muted">
                    {t(`services.${key}.text`)}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-border pt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
          {t("marketsTitle")}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{t("marketsText")}</p>
      </div>
    </div>
  );
}
