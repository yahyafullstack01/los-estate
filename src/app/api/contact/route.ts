import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER || "losestate2025@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

/** Prefer CONTACT_TO_EMAIL; never send plain self→self (Gmail hides those in Sent). */
function resolveToAddress() {
  const configured = (process.env.CONTACT_TO_EMAIL || "").trim();
  const user = GMAIL_USER.trim().toLowerCase();

  if (configured) {
    const configuredLower = configured.toLowerCase();
    // Same mailbox without +tag → force +inquiries so it lands in Inbox
    if (configuredLower === user) {
      const [local, domain] = configured.split("@");
      return `${local}+inquiries@${domain}`;
    }
    return configured;
  }

  const [local, domain] = GMAIL_USER.split("@");
  return `${local}+inquiries@${domain}`;
}

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

    const toAddress = resolveToAddress();
    const propertyTitle = body.propertyTitle?.trim() ?? "";
    const subject = propertyTitle
      ? `[LOS ESTATE] Inquiry: ${propertyTitle}`
      : `[LOS ESTATE] ${interest} — ${name}`;

    const fields: Record<string, string> = {
      Name: name,
      Email: email,
      Phone: phone,
      Interest: interest,
      Market: body.market?.trim() || "—",
      "Property preference": body.propertyPreference?.trim() || "—",
      Budget: body.budget?.trim() || "—",
      Message: message,
      "Submitted at": new Date().toISOString(),
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

    const info = await transporter.sendMail({
      from: `"LOS ESTATE Website" <${GMAIL_USER}>`,
      to: toAddress,
      replyTo: `"${name}" <${email}>`,
      subject,
      text: buildEmailText(fields),
      html: buildEmailHtml(fields),
      headers: {
        "X-LOS-Estate-Form": "contact",
        "X-Entity-Ref-ID": `${Date.now()}`,
      },
    });

    console.log("Contact email accepted by Gmail:", {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected,
      to: toAddress,
    });

    return NextResponse.json({
      ok: true,
      id: info.messageId,
      accepted: info.accepted,
    });
  } catch (error) {
    console.error("Contact form email error:", error);
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 500 }
    );
  }
}
