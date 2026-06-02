import { getTranslations } from "next-intl/server";

const stats = [
  { value: "120+", key: "properties" as const },
  { value: "2,400+", key: "clients" as const },
  { value: "18", key: "cities" as const },
  { value: "15+", key: "years" as const },
];

export async function Stats() {
  const t = await getTranslations("stats");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.key} className="text-center">
            <p className="font-serif text-4xl text-brand-gold sm:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-muted">{t(stat.key)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
