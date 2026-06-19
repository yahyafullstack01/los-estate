"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { ListingInquiryContext } from "@/lib/property-i18n";

interface ContactFormProps {
  listing?: ListingInquiryContext;
}

export function ContactForm({ listing }: ContactFormProps) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const messageDefault = listing
    ? `${t("messagePrefill", {
        title: listing.title,
        type: listing.typeLabel,
        transaction: listing.transactionLabel,
      })}\n\n`
    : undefined;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name")?.toString().trim();
    const email = data.get("email")?.toString().trim();
    const message = data.get("message")?.toString().trim();

    if (!name || !email || !message) {
      setStatus("error");
      return;
    }

    setStatus("success");
    form.reset();
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

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          {t("name")} *
        </label>
        <input id="name" name="name" type="text" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          {t("email")} *
        </label>
        <input id="email" name="email" type="email" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
          {t("phone")}
        </label>
        <input id="phone" name="phone" type="tel" className={inputClass} />
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
          key={listing?.slug ?? "general"}
          className={inputClass}
        />
      </div>
      {status === "success" && (
        <p className="text-sm text-green-600 dark:text-green-400">{t("success")}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">{t("error")}</p>
      )}
      <Button type="submit" size="lg">
        {t("submit")}
      </Button>
    </form>
  );
}
