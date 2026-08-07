"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { PropertyType, TransactionType } from "@/data/listings";

export function ListingFilters() {
  const t = useTranslations("listings");
  const tTypes = useTranslations("types");
  const tTx = useTranslations("transactions");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const transaction = searchParams.get("transaction") ?? "";
  const type = searchParams.get("type") ?? "";

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  const transactions: { value: TransactionType | ""; label: string }[] = [
    { value: "", label: t("allTransactions") },
    { value: "sale", label: tTx("sale") },
    { value: "rent", label: tTx("rent") },
  ];

  const types: { value: PropertyType | ""; label: string }[] = [
    { value: "", label: t("allTypes") },
    { value: "apartment", label: tTypes("apartment") },
    { value: "hotel", label: tTypes("hotel") },
    { value: "house", label: tTypes("house") },
  ];

  return (
    <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-gold">
        {t("filters")}
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
        <div>
          <p className="mb-2 text-xs text-muted">{t("filterTransaction")}</p>
          <div className="flex flex-wrap gap-2">
            {transactions.map((item) => (
              <FilterChip
                key={item.value || "all-tx"}
                active={transaction === item.value}
                onClick={() => update("transaction", item.value)}
                label={item.label}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs text-muted">{t("filterType")}</p>
          <div className="flex flex-wrap gap-2">
            {types.map((item) => (
              <FilterChip
                key={item.value || "all-type"}
                active={type === item.value}
                onClick={() => update("type", item.value)}
                label={item.label}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1.5 text-sm transition-colors",
        active
          ? "bg-brand-gold text-brand-teal font-medium"
          : "bg-surface-muted text-muted hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}
