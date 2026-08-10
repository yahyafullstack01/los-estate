import { NextResponse } from "next/server";

const TO_EMAIL = "losestate2025@gmail.com";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
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

    const payload: Record<string, string> = {
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
      payload.property = propertyTitle;
      payload.propertyType = body.propertyType?.trim() || "—";
      payload.propertyTransaction = body.propertyTransaction?.trim() || "—";
      payload.propertySlug = body.propertySlug?.trim() || "—";
    }

    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(TO_EMAIL)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Contact form email failed:", response.status, text);
      return NextResponse.json(
        { ok: false, error: "send_failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 500 }
    );
  }
}
