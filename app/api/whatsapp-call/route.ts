// app/api/whatsapp-call/route.ts
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type RecaptchaVerifyResponse = {
  success?: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};

function safeString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizePhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");
  return digits.trim();
}

function parseUtm(raw: string): Record<string, string> | undefined {
  if (!raw) return undefined;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return undefined;

    const out: Record<string, string> = {};
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof value === "string") out[key] = value;
    }

    return Object.keys(out).length ? out : undefined;
  } catch {
    return undefined;
  }
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const website = safeString(form.get("website"));
    if (website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const name = safeString(form.get("name"));
    const whatsapp = normalizePhone(safeString(form.get("whatsapp")));
    const pageUrl = safeString(form.get("pageUrl"));
    const context = safeString(form.get("context"));
    const recaptchaToken = safeString(form.get("recaptchaToken"));
    const utmRaw = safeString(form.get("utm"));
    const utm = parseUtm(utmRaw);

    if (!name || !whatsapp) {
      return NextResponse.json(
        { ok: false, message: "Заполните обязательные поля" },
        { status: 400 }
      );
    }

    const isProd = process.env.NODE_ENV === "production";
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;

    if (isProd && recaptchaSecret && recaptchaToken) {
      try {
        const verifyRes = await fetch(
          "https://www.google.com/recaptcha/api/siteverify",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body:
              `secret=${encodeURIComponent(recaptchaSecret)}` +
              `&response=${encodeURIComponent(recaptchaToken)}`,
          }
        );

        const verifyUnknown = (await verifyRes.json()) as RecaptchaVerifyResponse;

        if (
          !verifyUnknown.success ||
          (typeof verifyUnknown.score === "number" && verifyUnknown.score < 0.3)
        ) {
          return NextResponse.json(
            { ok: false, message: "Подтвердите, что вы не робот." },
            { status: 400 }
          );
        }
      } catch (e) {
        console.error("reCAPTCHA verification error:", e);
      }
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const urgencyText = "СРОЧНО СВЯЗАТЬСЯ С КЛИЕНТОМ В WHATSAPP";

    const metaInfo =
      `\n\n---\nИсточник: WhatsApp Call Form\n` +
      `Срочность: ${urgencyText}\n` +
      `Страница: ${pageUrl || "unknown"}\n` +
      `Контекст: ${context || "n/a"}\n` +
      `UTM: ${utm ? JSON.stringify(utm) : "none"}\n` +
      `IP: ${ip}\n` +
      `User-Agent: ${userAgent}\n`;

    const comment =
      `Клиент просит срочно связаться через WhatsApp.\n` +
      `Имя: ${name}\n` +
      `WhatsApp: ${whatsapp}\n` +
      metaInfo;

    // -----------------------
    // 1) Bitrix24 lead
    // -----------------------
    const bitrixBase = process.env.BITRIX_WEBHOOK_URL;
    if (!bitrixBase) {
      console.error("BITRIX_WEBHOOK_URL is not set");
    } else {
      const bitrixUrl = `${bitrixBase}/crm.lead.add.json`;

      const bitrixPayload = {
        fields: {
          TITLE: `СРОЧНО: WhatsApp консультация — ${name}`.trim(),
          NAME: name,
          LAST_NAME: "",
          PHONE: whatsapp ? [{ VALUE: whatsapp, VALUE_TYPE: "WORK" }] : [],
          EMAIL: [],
          COMMENTS: comment,
          SOURCE_ID: "WEB",
        },
        params: { REGISTER_SONET_EVENT: "Y" },
      };

      try {
        const bitrixRes = await fetch(bitrixUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bitrixPayload),
        });

        if (!bitrixRes.ok) {
          const text = await bitrixRes.text();
          console.error("Bitrix24 error:", text);
        }
      } catch (e) {
        console.error("Bitrix24 request failed:", e);
      }
    }

    // -----------------------
    // 2) Email via nodemailer
    // -----------------------
    const host = process.env.MAIL_HOST;
    const port = Number(process.env.MAIL_PORT || "587");
    const user = process.env.MAIL_USER;
    const pass = process.env.MAIL_PASS;
    const from = process.env.MAIL_FROM || user;
    const to = process.env.MAIL_TO || "info@ibb.expert";

    if (host && user && pass && from && to) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      const subject = `СРОЧНО: заявка на консультацию через WhatsApp — ${name}`;

      const text = [
        "Клиент просит срочно связаться через WhatsApp.",
        "",
        `Имя: ${name}`,
        `WhatsApp: ${whatsapp}`,
        metaInfo,
      ].join("\n");

      const html = `
        <div style="max-width: 640px; margin: 0 auto; background:#fff; padding: 20px; border-radius: 10px; border:1px solid #eee;">
          <h2 style="margin:0 0 12px; font-size:18px; color:#b42318;">
            СРОЧНО: заявка на консультацию через WhatsApp
          </h2>

          <p style="margin:0 0 12px; font-size:14px; line-height:1.6; color:#333;">
            Клиент просит <strong>срочно</strong> связаться через WhatsApp.
          </p>

          <p style="margin:0 0 12px; font-size:14px; line-height:1.6; color:#333;">
            <strong>Имя:</strong> ${escapeHtml(name)}<br>
            <strong>WhatsApp:</strong> ${escapeHtml(whatsapp)}<br>
          </p>

          <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid #eee; font-size:12px; color:#666; white-space:pre-wrap;">
            ${escapeHtml(metaInfo)}
          </div>
        </div>
      `;

      try {
        await transporter.sendMail({ from, to, subject, text, html });
      } catch (e) {
        console.error("Mail send error:", e);
      }
    } else {
      console.error("Mail env vars are not fully set");
    }

    return NextResponse.json(
      { ok: true, message: "Заявка успешно отправлена" },
      { status: 200 }
    );
  } catch (error) {
    console.error("WHATSAPP CALL ROUTE ERROR:", error);
    return NextResponse.json(
      { ok: false, message: "Ошибка на сервере" },
      { status: 500 }
    );
  }
}