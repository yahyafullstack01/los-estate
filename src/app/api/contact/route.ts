import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "losestate2025@gmail.com";
const GMAIL_USER = process.env.GMAIL_USER || "losestate2025@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

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
        `<tr>
          <td style="padding:8px 12px;border:1px solid #ddd;font-weight:600;vertical-align:top;">${escapeHtml(key)}</td>
          <td style="padding:8px 12px;border:1px solid #ddd;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#111;line-height:1.5;">
      <p><strong>New inquiry from the LOS ESTATE website</strong></p>
      <table style="border-collapse:collapse;width:100%;max-width:640px;">${rows}</table>
    </div>
  `;
}

function buildEmailText(fields: Record<string, string>) {
  return [
    "New inquiry from the LOS ESTATE website",
    "",
    ...Object.entries(fields).map(([key, value]) => `${key}: ${value}`),
  ].join("\n");
}

export async function POST(request: Request) {
  try {
    if (!GMAIL_APP_PASSWORD) {
      console.error("Missing GMAIL_APP_PASSWORD env var");
      return NextResponse.json(
        { ok: false, error: "email_not_configured" },
        { status: 500 }
      );
    }

    const body = (await request.json()) as ContactBody;

    // Honeypot
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

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"LOS ESTATE" <${GMAIL_USER}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      text: buildEmailText(fields),
      html: buildEmailHtml(fields),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form email error:", error);
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 500 }
    );
  }
}
