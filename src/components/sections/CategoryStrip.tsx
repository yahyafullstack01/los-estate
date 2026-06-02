import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Building2, Home, Hotel } from "lucide-react";
import { Card } from "@/components/ui/Card";

const categories = [
  { type: "apartment", icon: Building2, key: "apartments" as const },
  { type: "hotel", icon: Hotel, key: "hotels" as const },
  { type: "house", icon: Home, key: "houses" as const },
];

export async function CategoryStrip() {
  const t = await getTranslations("categories");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="font-serif text-3xl text-center sm:text-start">{t("title")}</h2>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {categories.map(({ type, icon: Icon, key }) => (
          <Link key={type} href={`/listings?type=${type}`}>
            <Card className="group p-6 text-center sm:text-start h-full hover:border-brand-gold/50 transition-colors">
              <Icon className="mx-auto sm:mx-0 h-8 w-8 text-brand-gold group-hover:scale-110 transition-transform" />
              <h3 className="mt-4 font-serif text-xl">{t(key)}</h3>
              <p className="mt-2 text-sm text-muted">{t(`${key}Desc`)}</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
