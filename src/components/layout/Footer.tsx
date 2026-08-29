import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Mail, MapPin, Phone } from "lucide-react";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-serif text-2xl text-brand-gold">LOS ESTATE</p>
            <p className="mt-1 text-sm text-muted">{t("tagline")}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
              {t("quickLinks")}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted hover:text-foreground">
                  {nav("home")}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-sm text-muted hover:text-foreground">
                  {nav("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/listings"
                  className="text-sm text-muted hover:text-foreground"
                >
                  {nav("listings")}
                </Link>
              </li>
              <li>
                <Link
                  href="/for-owners"
                  className="text-sm text-muted hover:text-foreground"
                >
                  {nav("forOwners")}
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="text-sm text-muted hover:text-foreground"
                >
                  {nav("partners")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted hover:text-foreground"
                >
                  {nav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
              {t("contactInfo")}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                Warsaw, Poland
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-brand-gold" />
                <a href="tel:+48575656702" className="hover:text-foreground">
                  +48 575 656 702
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-brand-gold" />
                <a
                  href="mailto:losestate2025@gmail.com"
                  className="hover:text-foreground"
                >
                  losestate2025@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} LOS ESTATE. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
