import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "losestate2025@gmail.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "LOS ESTATE <onboarding@resend.dev>";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  interest?: string;
  market?: string;
  propertyPreference?: string;
  budget?: string;
  propertyTitle?: string;
  propertyType?: string;
  propertyTransaction?: string;
  propertySlug?: string;
  website?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildEmailHtml(fields: Record<string, string>) {
  const rows = Object.entries(fields)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600;">${escapeHtml(key)}</td><td style="padding:8px 12px;border:1px solid #ddd;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#111;">
      <p>New inquiry from the LOS ESTATE website.</p>
      <table style="border-collapse:collapse;width:100%;max-width:640px;">${rows}</table>
    </div>
  `;
}

async function sendWithResend(payload: {
  subject: string;
  replyTo: string;
  fields: Record<string, string>;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    replyTo: payload.replyTo,
    subject: payload.subject,
    html: buildEmailHtml(payload.fields),
  });

  if (error) {
    console.error("Resend error:", error);
    return { ok: false as const, error };
  }

  return { ok: true as const, id: data?.id };
}

async function sendWithFormSubmit(
  payload: Record<string, string>,
  origin: string
) {
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(TO_EMAIL)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        Referer: origin,
      },
      body: JSON.stringify(payload),
    }
  );

  const result = (await response.json().catch(() => null)) as {
    success?: string | boolean;
    message?: string;
  } | null;

  return { response, result };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;

    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const interest = body.interest?.trim() ?? "";

    if (!name || !email || !phone || !message || !interest) {
      return NextResponse.json(
        { ok: false, error: "missing_fields" },
        { status: 400 }
      );
    }

    const propertyTitle = body.propertyTitle?.trim() ?? "";
    const subject = propertyTitle
      ? `LOS ESTATE inquiry: ${propertyTitle}`
      : `LOS ESTATE — ${interest} inquiry from ${name}`;

    const fields: Record<string, string> = {
      Name: name,
      Email: email,
      Phone: phone,
      Interest: interest,
      Market: body.market?.trim() || "—",
      "Property preference": body.propertyPreference?.trim() || "—",
      Budget: body.budget?.trim() || "—",
      Message: message,
    };

    if (propertyTitle) {
      fields.Property = propertyTitle;
      fields["Property type"] = body.propertyType?.trim() || "—";
      fields.Transaction = body.propertyTransaction?.trim() || "—";
      fields.Slug = body.propertySlug?.trim() || "—";
    }

    // Preferred path for Vercel / production
    const resendResult = await sendWithResend({
      subject,
      replyTo: email,
      fields,
    });

    if (resendResult?.ok) {
      return NextResponse.json({ ok: true, provider: "resend" });
    }

    if (resendResult && !resendResult.ok && process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "send_failed" },
        { status: 502 }
      );
    }

    // Fallback: FormSubmit (requires one-time Activate Form email)
    const origin =
      request.headers.get("origin") ||
      request.headers.get("referer") ||
      "https://los-estate.vercel.app";

    const formPayload: Record<string, string> = {
      name,
      email,
      phone,
      interest,
      market: body.market?.trim() || "—",
      propertyPreference: body.propertyPreference?.trim() || "—",
      budget: body.budget?.trim() || "—",
      message,
      _subject: subject,
      _replyto: email,
      _template: "table",
      _captcha: "false",
    };

    if (propertyTitle) {
      formPayload.property = propertyTitle;
      formPayload.propertyType = body.propertyType?.trim() || "—";
      formPayload.propertyTransaction = body.propertyTransaction?.trim() || "—";
      formPayload.propertySlug = body.propertySlug?.trim() || "—";
    }

    const { response, result } = await sendWithFormSubmit(formPayload, origin);

    if (
      result?.message?.toLowerCase().includes("activation") ||
      result?.message?.toLowerCase().includes("activate")
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "needs_activation",
          message: result.message,
        },
        { status: 403 }
      );
    }

    if (
      !response.ok ||
      result?.success === "false" ||
      result?.success === false
    ) {
      console.error("FormSubmit failed:", response.status, result);
      return NextResponse.json(
        { ok: false, error: "send_failed", message: result?.message },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, provider: "formsubmit" });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 500 }
    );
  }
}
