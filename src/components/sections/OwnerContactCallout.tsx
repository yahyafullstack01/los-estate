import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

interface OwnerContactCalloutProps {
  interest?: string;
}

export async function OwnerContactCallout({ interest }: OwnerContactCalloutProps) {
  const t = await getTranslations("propertyManagement");

  const isOwnerInterest =
    interest === "turnkey" || interest === "guaranteed" || interest === "landlord";

  return (
    <div
      className={`mb-6 rounded-xl border p-5 sm:p-6 ${
        isOwnerInterest
          ? "border-brand-gold/40 bg-brand-gold/10"
          : "border-border bg-surface-muted/50"
      }`}
    >
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
        {t("contactCalloutEyebrow")}
      </p>
      <p className="mt-2 font-medium text-foreground">{t("contactCalloutTitle")}</p>
      <p className="mt-1.5 text-sm text-muted">{t("contactCalloutText")}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button href="/contact?interest=turnkey#inquiry" size="sm">
          {t("options.turnkey.cta")}
        </Button>
        <Link
          href="/contact?interest=guaranteed#inquiry"
          className="inline-flex items-center justify-center rounded-lg border border-brand-gold px-4 py-2 text-sm text-brand-gold transition-colors hover:bg-brand-gold/10"
        >
          {t("options.guaranteed.cta")}
        </Link>
        <Link
          href="/for-owners"
          className="inline-flex items-center justify-center px-4 py-2 text-sm text-muted transition-colors hover:text-brand-gold"
        >
          {t("learnMore")} →
        </Link>
      </div>
    </div>
  );
}
