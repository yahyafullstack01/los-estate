"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { ListingInquiryContext } from "@/lib/property-i18n";

interface ContactFormProps {
  listing?: ListingInquiryContext;
  defaultInterest?: string;
}

const INTEREST_VALUES = [
  "buy",
  "rent",
  "sell",
  "viewing",
  "investment",
  "other",
] as const;

const MARKET_VALUES = ["turkey", "poland", "spain", "other"] as const;
const PROPERTY_VALUES = ["apartment", "house", "hotel", "any"] as const;
const BUDGET_VALUES = [
  "under100k",
  "100to250k",
  "250to500k",
  "500kPlus",
  "rentBudget",
  "flexible",
] as const;

export function ContactForm({ listing, defaultInterest }: ContactFormProps) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error" | "not_configured"
  >("idle");

  const initialInterest =
    defaultInterest &&
    INTEREST_VALUES.includes(defaultInterest as (typeof INTEREST_VALUES)[number])
      ? defaultInterest
      : listing
        ? listing.transaction === "rent"
          ? "rent"
          : "buy"
        : "buy";

  const messageDefault = listing
    ? `${t("messagePrefill", {
        title: listing.title,
        type: listing.typeLabel,
        transaction: listing.transactionLabel,
      })}\n\n`
    : undefined;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name")?.toString().trim();
    const email = data.get("email")?.toString().trim();
    const phone = data.get("phone")?.toString().trim() ?? "";
    const message = data.get("message")?.toString().trim();
    const website = data.get("website")?.toString() ?? "";
    const interest = data.get("interest")?.toString() ?? "";
    const market = data.get("market")?.toString() ?? "";
    const propertyPreference = data.get("propertyPreference")?.toString() ?? "";
    const budget = data.get("budget")?.toString() ?? "";

    if (!name || !email || !phone || !message || !interest) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          website,
          interest,
          market,
          propertyPreference,
          budget,
          propertyTitle: listing?.title,
          propertyType: listing?.typeLabel,
          propertyTransaction: listing?.transactionLabel,
          propertySlug: listing?.slug,
        }),
      });

      const payload = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!res.ok || !payload?.ok) {
        if (payload?.error === "email_not_configured") {
          setStatus("not_configured");
        } else {
          setStatus("error");
        }
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass = cn(
    "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm",
    "focus:outline-none focus:ring-2 focus:ring-brand-gold"
  );

  const readOnlyClass = cn(
    inputClass,
    "cursor-default bg-surface-muted text-foreground"
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl">{t("formTitle")}</h2>
        <p className="mt-2 text-sm text-muted">{t("formSubtitle")}</p>
      </div>

      {listing && (
        <>
          <input type="hidden" name="propertySlug" value={listing.slug} />
          <input type="hidden" name="propertyType" value={listing.type} />
          <input
            type="hidden"
            name="propertyTransaction"
            value={listing.transaction}
          />

          <div className="rounded-lg border border-brand-gold/30 bg-brand-gold/5 p-4 sm:p-5">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
              {t("inquiryFor")}
            </p>
            <div className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="propertyTitle"
                  className="mb-1.5 block text-sm font-medium"
                >
                  {t("propertyName")}
                </label>
                <input
                  id="propertyTitle"
                  name="propertyTitle"
                  type="text"
                  readOnly
                  value={listing.title}
                  className={readOnlyClass}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="propertyTypeDisplay"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    {t("propertyType")}
                  </label>
                  <input
                    id="propertyTypeDisplay"
                    name="propertyTypeDisplay"
                    type="text"
                    readOnly
                    value={listing.typeLabel}
                    className={readOnlyClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="propertyTransactionDisplay"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    {t("transactionType")}
                  </label>
                  <input
                    id="propertyTransactionDisplay"
                    name="propertyTransactionDisplay"
                    type="text"
                    readOnly
                    value={listing.transactionLabel}
                    className={readOnlyClass}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="interest" className="mb-1.5 block text-sm font-medium">
          {t("interest")} *
        </label>
        <select
          id="interest"
          name="interest"
          required
          defaultValue={initialInterest}
          className={inputClass}
        >
          {INTEREST_VALUES.map((value) => (
            <option key={value} value={value}>
              {t(`interests.${value}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            {t("name")} *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
            {t("phone")} *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          {t("email")} *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="market" className="mb-1.5 block text-sm font-medium">
            {t("market")}
          </label>
          <select id="market" name="market" defaultValue="turkey" className={inputClass}>
            {MARKET_VALUES.map((value) => (
              <option key={value} value={value}>
                {t(`markets.${value}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="propertyPreference"
            className="mb-1.5 block text-sm font-medium"
          >
            {t("propertyPreference")}
          </label>
          <select
            id="propertyPreference"
            name="propertyPreference"
            defaultValue="apartment"
            className={inputClass}
          >
            {PROPERTY_VALUES.map((value) => (
              <option key={value} value={value}>
                {t(`propertyPreferences.${value}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="budget" className="mb-1.5 block text-sm font-medium">
          {t("budget")}
        </label>
        <select id="budget" name="budget" defaultValue="flexible" className={inputClass}>
          {BUDGET_VALUES.map((value) => (
            <option key={value} value={value}>
              {t(`budgets.${value}`)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          {t("message")} *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={messageDefault}
          key={listing?.slug ?? defaultInterest ?? "general"}
          placeholder={t("messagePlaceholder")}
          className={inputClass}
        />
      </div>

      <p className="text-xs text-muted">{t("privacyNote")}</p>

      {status === "success" && (
        <p className="text-sm text-green-600 dark:text-green-400">{t("success")}</p>
      )}
      {status === "not_configured" && (
        <p className="text-sm text-amber-700 dark:text-amber-400">
          {t("notConfigured")}
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">{t("error")}</p>
      )}
      <Button type="submit" size="lg" disabled={status === "sending"}>
        {status === "sending" ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}
