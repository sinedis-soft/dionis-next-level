// app/api/lead/route.ts
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type InlineCtaMeta = {
  articleSlug?: string;
  blockId?: string;
  variant?: string;
  source?: string;
};

type InlineCtaBody = {
  message: string;
  contact?: string;
  meta?: InlineCtaMeta;
  website?: string; // honeypot
  recaptchaToken?: string;
  context?: string;
  utm?: Record<string, string>;
  pageUrl?: string;
};

type FullFormBody = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  comment: string;
  agree: boolean;

  website?: string; // honeypot
  recaptchaToken?: string;

  context?: string;
  utm?: Record<string, string>;
  pageUrl?: string;
};

type LeadBody = InlineCtaBody | FullFormBody;

type ContactNormalized = { email?: string; phone?: string; raw?: string };

type RecaptchaVerifyResponse = {
  success?: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function safeString(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function safeBoolean(v: unknown): boolean {
  return typeof v === "boolean" ? v : false;
}

function safeStringRecord(v: unknown): Record<string, string> | undefined {
  if (!isRecord(v)) return undefined;
  const out: Record<string, string> = {};
  for (const [k, val] of Object.entries(v)) {
    if (typeof val === "string") out[k] = val;
  }
  return Object.keys(out).length ? out : undefined;
}

function isInlineCtaPayload(body: unknown): body is InlineCtaBody {
  if (!isRecord(body)) return false;
  return typeof body.message === "string";
}

function isFullFormPayload(body: unknown): body is FullFormBody {
  if (!isRecord(body)) return false;
  return (
    typeof body.firstName === "string" &&
    typeof body.lastName === "string" &&
    typeof body.email === "string" &&
    typeof body.phone === "string" &&
    typeof body.comment === "string" &&
    typeof body.agree === "boolean"
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizeContact(contactRaw: string): ContactNormalized {
  const contact = contactRaw.trim();
  if (!contact) return {};

  // email
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) return { email: contact };

  // phone-ish
  const digits = contact.replace(/[^\d+]/g, "");
  if (digits.length >= 7) return { phone: digits, raw: contact };

  return { raw: contact };
}

function safeMeta(v: unknown): InlineCtaMeta {
  if (!isRecord(v)) return {};
  return {
    articleSlug: safeString(v.articleSlug),
    blockId: safeString(v.blockId),
    variant: safeString(v.variant),
    source: safeString(v.source),
  };
}

async function readJson(req: Request): Promise<unknown> {
  // отдельная функция — чтобы было проще дебажить
  return req.json() as Promise<unknown>;
}

export async function POST(req: Request) {
  try {
    const raw = await readJson(req);

    // -----------------------
    // 0) Honeypot (если есть)
    // -----------------------
    const website =
      isRecord(raw) && "website" in raw ? safeString(raw.website) : "";
    if (website.trim() !== "") {
      // бот — молча "ок"
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // --------------------------------------------
    // 1) Понять формат и нормализовать в единый вид
    // --------------------------------------------
    const isInline = isInlineCtaPayload(raw);
    const isFull = isFullFormPayload(raw);

    if (!isInline && !isFull) {
      return NextResponse.json(
        { ok: false, message: "Некорректный формат данных" },
        { status: 400 }
      );
    }

    // общие поля
    const context =
      isRecord(raw) && "context" in raw ? safeString(raw.context) : "";
    const pageUrl =
      isRecord(raw) && "pageUrl" in raw ? safeString(raw.pageUrl) : "";
    const utm =
      isRecord(raw) && "utm" in raw ? safeStringRecord(raw.utm) : undefined;

    let firstName = "";
    let lastName = "";
    let email = "";
    let phone = "";
    let comment = "";
    let agree = true; // InlineCta: факт отправки = согласие

    let meta: InlineCtaMeta = {};
    if (isInline) {
      comment = safeString(raw.message).trim();

      const contact = safeString(raw.contact);
      const parsed = normalizeContact(contact);

      email = parsed.email ?? "";
      phone = parsed.phone ?? (parsed.raw ?? "");

      firstName = "Blog";
      lastName = "Lead";

      meta = safeMeta(raw.meta);

      if (!pageUrl && meta.articleSlug) {
        // если pageUrl не передали, хоть так
        // (не делаем "идеально", делаем предсказуемо)
        // можно заменить на реальный URL страницы при желании
      }
    } else {
      firstName = safeString(raw.firstName).trim();
      lastName = safeString(raw.lastName).trim();
      email = safeString(raw.email).trim();
      phone = safeString(raw.phone).trim();
      comment = safeString(raw.comment).trim();
      agree = safeBoolean(raw.agree);

      // meta для full формы может быть, но это опционально
      if (isRecord(raw) && "meta" in raw) meta = safeMeta(raw.meta);
    }

    // -----------------------
    // 2) Валидация
    // -----------------------
    if (isInline) {
      if (!comment) {
        return NextResponse.json(
          { ok: false, message: "Опишите вопрос или ситуацию" },
          { status: 400 }
        );
      }
    } else {
      if (!firstName || !lastName || !email || !phone || !comment || !agree) {
        return NextResponse.json(
          { ok: false, message: "Заполните все обязательные поля" },
          { status: 400 }
        );
      }
    }

    // -----------------------
    // 3) reCAPTCHA v3 (prod)
    // -----------------------
    const isProd = process.env.NODE_ENV === "production";
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;

    const recaptchaToken =
      isRecord(raw) && "recaptchaToken" in raw
        ? safeString(raw.recaptchaToken)
        : "";

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

        const verifyUnknown = (await verifyRes.json()) as unknown;
        const verifyData: RecaptchaVerifyResponse = isRecord(verifyUnknown)
          ? (verifyUnknown as RecaptchaVerifyResponse)
          : {};

        if (
          !verifyData.success ||
          (typeof verifyData.score === "number" && verifyData.score < 0.3)
        ) {
          return NextResponse.json(
            { ok: false, message: "Подтвердите, что вы не робот." },
            { status: 400 }
          );
        }
      } catch (e) {
        console.error("reCAPTCHA verification error:", e);
        // не блокируем при сбое проверки
      }
    }

    // -----------------------
    // 4) Meta info (IP/UA/UTM)
    // -----------------------
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const articleSlug = safeString(meta.articleSlug);
    const blockId = safeString(meta.blockId);
    const variant = safeString(meta.variant);
    const source = safeString(meta.source);

    const metaInfo =
      `\n\n---\nИсточник: Lead API (InlineCta / Forms)\n` +
      `Страница: ${pageUrl || "unknown"}\n` +
      `Контекст: ${context || "n/a"}\n` +
      `InlineCta: ${source || "n/a"}; variant=${variant || "n/a"}; blockId=${blockId || "n/a"}; articleSlug=${articleSlug || "n/a"}\n` +
      `UTM: ${utm ? JSON.stringify(utm) : "none"}\n` +
      `IP: ${ip}\n` +
      `User-Agent: ${userAgent}\n`;

    // -----------------------
    // 5) Bitrix24 lead
    // -----------------------
    const bitrixBase = process.env.BITRIX_WEBHOOK_URL;
    if (!bitrixBase) {
      console.error("BITRIX_WEBHOOK_URL is not set");
    } else {
      const bitrixUrl = `${bitrixBase}/crm.lead.add.json`;

      const bitrixPayload = {
        fields: {
          TITLE: `Сообщение с сайта DIONIS: ${firstName} ${lastName}`.trim(),
          NAME: firstName || "—",
          LAST_NAME: lastName || "—",
          PHONE: phone ? [{ VALUE: phone, VALUE_TYPE: "WORK" }] : [],
          EMAIL: email ? [{ VALUE: email, VALUE_TYPE: "WORK" }] : [],
          COMMENTS: `${comment}${metaInfo}`,
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
    // 6) Email via nodemailer
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

      const subject = "Новое сообщение (InlineCta / форма) — DIONIS Insurance";

      const text = [
        `Имя: ${firstName || "-"}`,
        `Фамилия: ${lastName || "-"}`,
        `E-mail: ${email || "-"}`,
        `Телефон/контакт: ${phone || "-"}`,
        "",
        "Комментарий:",
        comment || "-",
        metaInfo,
      ].join("\n");

      const html = `
        <div style="max-width: 640px; margin: 0 auto; background:#fff; padding: 20px; border-radius: 10px; border:1px solid #eee;">
          <h2 style="margin:0 0 12px; font-size:18px; color:#23376C;">Новое сообщение (InlineCta / форма)</h2>

          <p style="margin:0 0 12px; font-size:14px; line-height:1.6; color:#333;">
            <strong>Имя:</strong> ${escapeHtml(firstName || "-")}<br>
            <strong>Фамилия:</strong> ${escapeHtml(lastName || "-")}<br>
            <strong>E-mail:</strong> ${escapeHtml(email || "-")}<br>
            <strong>Телефон/контакт:</strong> ${escapeHtml(phone || "-")}<br>
          </p>

          <div style="margin: 12px 0; padding: 12px; background:#f7f7f7; border-radius: 8px;">
            <div style="font-size:12px; color:#666; margin-bottom:6px;">Комментарий</div>
            <div style="white-space:pre-wrap; font-size:14px; color:#111;">${escapeHtml(comment || "-")}</div>
          </div>

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

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, message: "Ошибка на сервере" },
      { status: 500 }
    );
  }
}
