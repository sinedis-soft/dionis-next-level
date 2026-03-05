// app/api/green-card-order/route.ts
import { Buffer } from "buffer";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const BITRIX_BASE = process.env.BITRIX_WEBHOOK_URL;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type BitrixPayload = Record<string, unknown>;

type BitrixRawResponse<T> = {
  result?: T;
  error?: string;
  error_description?: string;
};

function getErrorMessage(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

async function bitrix<T = unknown>(
  method: string,
  payload: BitrixPayload,
  attempt = 1
): Promise<T> {
  if (!BITRIX_BASE) throw new Error("BITRIX_WEBHOOK_URL is not set");

  const MAX_ATTEMPTS = 3;

  // обязательная пауза (Bitrix иначе режет соединение)
  await sleep(1500);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const url = `${BITRIX_BASE}/${method}.json`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    let data: BitrixRawResponse<T>;
    try {
      data = (await res.json()) as BitrixRawResponse<T>;
    } catch {
      throw new Error(`Bitrix: invalid JSON, HTTP ${res.status}`);
    }

    if (!res.ok || data.error) {
      throw new Error(
        `Bitrix error: ${
          data.error_description || data.error || `HTTP ${res.status}`
        }`
      );
    }

    return data.result as T;
  } catch (err) {
    clearTimeout(timeoutId);

    if (attempt < MAX_ATTEMPTS) {
      console.warn(
        `Bitrix ${method} failed on attempt ${attempt}, retrying...`,
        getErrorMessage(err)
      );
      await sleep(1500 * attempt);
      return bitrix<T>(method, payload, attempt + 1);
    }

    console.error(`Bitrix ${method} failed after ${attempt} attempts`, err);
    throw err;
  }
}

function parseDateToDDMMYYYY(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split("-");
  if (!y || !m || !d) return null;
  return `${d}.${m}.${y}`;
}

function parseDateISO(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const s = String(dateStr).trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  return s;
}

async function fileToBitrixFileData(file: File): Promise<[string, string]> {
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  return [file.name, base64];
}

type VehicleInput = {
  plate?: string;
  type?: string;
  startDate?: string | null;
  period?: string;
  techPassportFiles: File[];
};

function safeJsonStringify(v: unknown): string {
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

type Mailer = {
  send: (args: {
    to: string;
    from: string;
    subject: string;
    text: string;
    html: string;
  }) => Promise<void>;
};

function buildMailer(): Mailer | null {
  const host = process.env.MAIL_HOST;
  const port = Number(process.env.MAIL_PORT || "587");
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;
  const from = process.env.MAIL_FROM || user;

  if (!host || !user || !pass || !from) return null;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return {
    async send({ to, from, subject, text, html }) {
      await transporter.sendMail({ from, to, subject, text, html });
    },
  };
}

/**
 * reCAPTCHA: в PROD при наличии RECAPTCHA_SECRET_KEY:
 * - token обязателен
 * - ошибки verify считаем FAIL (а не ok:true)
 * - score порог по умолчанию 0.5
 * - (опционально) hostname check
 */
async function verifyRecaptchaIfNeeded(opts: {
  isProd: boolean;
  token: string | null;
  minScore?: number;
  expectedHostnames?: string[]; // напр. ["dionis-insurance.kz", "www.dionis-insurance.kz"]
}): Promise<{ ok: boolean; reason?: string }> {
  const { isProd, token, minScore = 0.5, expectedHostnames } = opts;
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!isProd) return { ok: true };

  // В проде это должна быть ошибка конфигурации (иначе защиты нет)
  if (!secret) {
    console.error("reCAPTCHA: RECAPTCHA_SECRET_KEY is not set in production");
    return { ok: false, reason: "secret_missing" };
  }

  if (!token) return { ok: false, reason: "token_missing" };

  try {
    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body:
          `secret=${encodeURIComponent(secret)}` +
          `&response=${encodeURIComponent(token)}`,
      }
    );

    if (!verifyRes.ok) {
      console.error("reCAPTCHA: verify http error", verifyRes.status);
      return { ok: false, reason: "verify_http_error" };
    }

    const verifyData = (await verifyRes.json()) as {
      success?: boolean;
      score?: number;
      hostname?: string;
      action?: string;
      "error-codes"?: string[];
    };

    if (!verifyData.success) {
      console.error("reCAPTCHA: not success", verifyData["error-codes"]);
      return { ok: false, reason: "not_success" };
    }

    if (expectedHostnames?.length) {
      const host = String(verifyData.hostname || "").toLowerCase();
      const okHost = expectedHostnames.some((h) => host === h.toLowerCase());
      if (!okHost) return { ok: false, reason: `bad_hostname_${host || "empty"}` };
    }

    // v3: score может быть undefined (если не v3) — тогда не режем
    if (typeof verifyData.score === "number" && verifyData.score < minScore) {
      return { ok: false, reason: `low_score_${verifyData.score}` };
    }

    return { ok: true };
  } catch (e) {
    console.error("reCAPTCHA verification error:", e);
    return { ok: false, reason: "verify_exception" };
  }
}

export async function POST(req: Request): Promise<Response> {
  try {
    const formData = await req.formData();

    // --- anti-bot honeypot ---
    const website = String(formData.get("website") || "").trim();
    if (website) return Response.json({ ok: true }, { status: 200 });

    // --- reCAPTCHA ---
    const isProd = process.env.NODE_ENV === "production";
    const recaptchaToken =
      String(formData.get("recaptchaToken") || "").trim() || null;

    const recaptcha = await verifyRecaptchaIfNeeded({
      isProd,
      token: recaptchaToken,
      minScore: 0.5,
      expectedHostnames: ["dionis-insurance.kz", "www.dionis-insurance.kz"],
    });

    if (!recaptcha.ok) {
      return Response.json(
        { ok: false, message: "Подтвердите, что вы не робот.", reason: recaptcha.reason },
        { status: 400 }
      );
    }

    // --- 1. Контакты ---
    const contact_email = String(formData.get("contact_email") || "").trim();
    const contact_firstNameLat = String(
      formData.get("contact_firstNameLat") || ""
    ).trim();
    const contact_lastNameLat = String(
      formData.get("contact_lastNameLat") || ""
    ).trim();
    const contact_phone = String(formData.get("contact_phone") || "").trim();

    if (!contact_email || !contact_firstNameLat || !contact_lastNameLat) {
      return Response.json(
        { ok: false, message: "Не заполнены обязательные контактные данные" },
        { status: 400 }
      );
    }

    // ✅ FIX: поддержка обоих имён чекбокса
    const order_isCompany =
      String(
        formData.get("order_isCompany") ??
          formData.get("order-isCompany") ??
          ""
      ) === "on";

    const company_bin = String(formData.get("company_bin") || "").trim();
    const company_email = String(formData.get("company_email") || "").trim();

    const insurance_territory = String(
      formData.get("insurance_territory") || ""
    ).trim();

    // --- 1b. Данные физлица ---
    const person_middleName = String(
      formData.get("person_middleName") || ""
    ).trim();

    const person_gender_raw = String(formData.get("person_gender") || "").trim();
    const person_gender =
      person_gender_raw === "male"
        ? "45"
        : person_gender_raw === "female"
        ? "47"
        : person_gender_raw;

    const person_birthDate = parseDateISO(
      String(formData.get("person_birthDate") || "") || null
    );

    const person_idNumber = String(formData.get("person_idNumber") || "").trim();
    const person_country = String(formData.get("person_country") || "").trim();
    const person_address = String(formData.get("person_address") || "").trim();

    const person_passportNumber = String(
      formData.get("person_passportNumber") || ""
    ).trim();
    const person_passportIssuer = String(
      formData.get("person_passportIssuer") || ""
    ).trim();
    const person_passportIssuedAt = parseDateISO(
      String(formData.get("person_passportIssuedAt") || "") || null
    );
    const person_passportValidTo = parseDateISO(
      String(formData.get("person_passportValidTo") || "") || null
    );

    // ✅ файлы паспорта (если форма присылает person_passportFiles)
    const person_passportFiles: File[] = [];
    for (const [k, v] of formData.entries()) {
      if (k === "person_passportFiles" && v instanceof File && v.size > 0) {
        person_passportFiles.push(v);
      }
    }

    const pageUrlRaw = String(formData.get("pageUrl") || "").trim();
    const pageUrl = pageUrlRaw || undefined;

    let utm: unknown = undefined;
    const utmRaw = formData.get("utm");
    if (typeof utmRaw === "string" && utmRaw) {
      try {
        utm = JSON.parse(utmRaw) as unknown;
      } catch {
        utm = undefined;
      }
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // --- 2. ТС ---
    const vehiclesMap = new Map<number, VehicleInput>();

    for (const [key, value] of formData.entries()) {
      const m = key.match(/^vehicles\[(\d+)\]\[(\w+)\]$/);
      if (!m) continue;

      const index = Number(m[1]);
      const field = m[2] as keyof VehicleInput;

      if (!vehiclesMap.has(index)) {
        vehiclesMap.set(index, { techPassportFiles: [] });
      }

      const v = vehiclesMap.get(index)!;

      if (field === "techPassportFiles") {
        if (value instanceof File && value.size > 0) v.techPassportFiles.push(value);
      } else if (field === "startDate") {
        v.startDate = parseDateToDDMMYYYY(String(value));
      } else {
        (v as Record<string, unknown>)[field] = String(value);
      }
    }

    const vehicles = Array.from(vehiclesMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([, v]) => v);

    if (!vehicles.length) {
      return Response.json(
        { ok: false, message: "Не указано ни одного транспортного средства" },
        { status: 400 }
      );
    }

    for (const [idx, v] of vehicles.entries()) {
      const missing =
        !v.plate ||
        !v.type ||
        !v.startDate ||
        !v.period ||
        !v.techPassportFiles ||
        v.techPassportFiles.length === 0;

      if (missing) {
        return Response.json(
          {
            ok: false,
            message: `ТС #${idx + 1}: заполните Госномер, Тип, Дату начала, Срок и прикрепите фото техпаспорта.`,
          },
          { status: 400 }
        );
      }
    }

    // --- 3. Контакт ---
    let contactId: number | null = null;

    const foundContacts = await bitrix<Array<{ ID: string }>>(
      "crm.contact.list",
      { filter: { EMAIL: contact_email }, select: ["ID"], start: 0 }
    );

    if (Array.isArray(foundContacts) && foundContacts.length > 0) {
      contactId = Number(foundContacts[0].ID);
    } else {
      const newContactId = await bitrix<string>("crm.contact.add", {
        fields: {
          NAME: contact_firstNameLat,
          LAST_NAME: contact_lastNameLat,
          PHONE: contact_phone ? [{ VALUE: contact_phone, VALUE_TYPE: "WORK" }] : [],
          EMAIL: [{ VALUE: contact_email, VALUE_TYPE: "WORK" }],
        },
      });
      contactId = Number(newContactId);
    }

    if (!contactId || Number.isNaN(contactId)) {
      throw new Error("Не удалось определить ID контакта (search/add)");
    }

    // --- 3b. Контакт update (физлицо) ---
    if (!order_isCompany) {
      const contactUpdateFields: Record<string, unknown> = {};

      if (person_middleName) contactUpdateFields.SECOND_NAME = person_middleName;
      if (person_birthDate) contactUpdateFields.BIRTHDATE = person_birthDate;

      if (person_idNumber) contactUpdateFields.UF_CRM_1694347707628 = person_idNumber;
      if (person_gender) contactUpdateFields.UF_CRM_1686138296718 = person_gender;
      if (person_country) contactUpdateFields.UF_CRM_1686138527330 = person_country;
      if (person_address) contactUpdateFields.ADDRESS = person_address;

      if (person_passportNumber)
        contactUpdateFields.UF_CRM_CONTACT_1686145698592 = person_passportNumber;
      if (person_passportIssuer)
        contactUpdateFields.UF_CRM_1694347754648 = person_passportIssuer;
      if (person_passportIssuedAt)
        contactUpdateFields.UF_CRM_1694347737519 = person_passportIssuedAt;
      if (person_passportValidTo)
        contactUpdateFields.UF_CRM_1696422396430 = person_passportValidTo;

      if (Object.keys(contactUpdateFields).length > 0) {
        await bitrix<boolean>("crm.contact.update", {
          id: contactId,
          fields: contactUpdateFields,
        });
      }
    }

    // --- 4. Компания ---
    let companyId: number;

    if (order_isCompany) {
      if (!company_bin) {
        return Response.json(
          { ok: false, message: "Отмечено 'договор на юрлицо', но не указан БИН компании." },
          { status: 400 }
        );
      }

      const foundCompanies = await bitrix<Array<{ ID: string }>>(
        "crm.company.list",
        { filter: { UF_CRM_COMPANY_1692911328252: company_bin }, select: ["ID"], start: 0 }
      );

      if (Array.isArray(foundCompanies) && foundCompanies.length > 0) {
        companyId = Number(foundCompanies[0].ID);
      } else {
        const newCompanyId = await bitrix<string>("crm.company.add", {
          fields: {
            TITLE: company_bin,
            UF_CRM_COMPANY_1692911328252: company_bin,
            EMAIL: company_email ? [{ VALUE: company_email, VALUE_TYPE: "WORK" }] : [],
          },
        });
        companyId = Number(newCompanyId);
      }
    } else {
      companyId = 1817;
      await bitrix<boolean>("crm.contact.update", {
        id: contactId,
        fields: { COMPANY_ID: companyId },
      });
    }

    // --- 5. Почта (НЕ ждём отправку) ---
    const mailer = buildMailer();
    const mailTo = process.env.MAIL_TO || "info@ibb.expert";
    const mailFrom =
      process.env.MAIL_FROM || process.env.MAIL_USER || "no-reply@localhost";

    // если env не настроены — один лог на запрос, а не на каждый авто
    if (!mailer) {
      console.error(
        "Mail env vars are not fully set (MAIL_HOST/MAIL_USER/MAIL_PASS/MAIL_FROM)"
      );
    }

    // --- 6. Сделки ---
    const createdDeals: number[] = [];

    const commonCommentParts: string[] = [];
    if (pageUrl) commonCommentParts.push(`Страница: ${pageUrl}`);
    if (utm !== undefined) commonCommentParts.push(`UTM: ${safeJsonStringify(utm)}`);
    commonCommentParts.push(
      `Контакт: ${contact_firstNameLat} ${contact_lastNameLat} <${contact_email}>`
    );
    if (contact_phone) commonCommentParts.push(`Телефон: ${contact_phone}`);
    commonCommentParts.push(
      order_isCompany
        ? `Договор на юрлицо, БИН: ${company_bin}`
        : `Договор на физлицо (компания ID=1817)`
    );

    // паспортные метаданные
    if (!order_isCompany) {
      commonCommentParts.push(
        [
          "Паспорт (данные):",
          `- Номер: ${person_passportNumber || "-"}`,
          `- Кем выдан: ${person_passportIssuer || "-"}`,
          `- Дата выдачи: ${person_passportIssuedAt || "-"}`,
          `- Действителен до: ${person_passportValidTo || "-"}`,
          `- Файлов паспорта: ${person_passportFiles.length}`,
        ].join("\n")
      );
    }

    const commonComment = commonCommentParts.join("\n");

    for (let i = 0; i < vehicles.length; i++) {
      const vehicle = vehicles[i];

      const dealFields: Record<string, unknown> = {
        TITLE: `Заявка Green Card: ${vehicle.plate || "ТС"}`,
        CONTACT_ID: contactId,
        COMPANY_ID: companyId,

        UF_CRM_1686152485641: vehicle.plate || null,
        UF_CRM_1686152567597: vehicle.type || null,
        UF_CRM_1686152209741: vehicle.period || null,
        UF_CRM_1686152149204: vehicle.startDate || null,

        UF_CRM_1690539097: 429,
        UF_CRM_1686152306664: 385,
        UF_CRM_1700656576088: insurance_territory || null,
        UF_CRM_1693578066803: 1169,
        UF_CRM_1686682902533: 3907,

        COMMENTS: commonComment,
      };

      // техпаспорт авто
      const techFilesData = await Promise.all(
        vehicle.techPassportFiles.map((f) => fileToBitrixFileData(f))
      );

      const allFiles: Array<{ fileData: [string, string] }> = techFilesData.map((fd) => ({
        fileData: fd,
      }));

      // паспорт физлица — в то же файловое поле сделки
      if (!order_isCompany && person_passportFiles.length > 0) {
        const passFilesData = await Promise.all(
          person_passportFiles.map((f) => fileToBitrixFileData(f))
        );
        allFiles.push(...passFilesData.map((fd) => ({ fileData: fd })));
      }

      dealFields.UF_CRM_1686154280439 = allFiles;

      const dealIdStr = await bitrix<string>("crm.deal.add", { fields: dealFields });
      const dealId = Number(dealIdStr);
      createdDeals.push(dealId);

      // --- email: запускаем и НЕ ждём ---
      if (mailer) {
        const subject = `Зеленая карта - ДИОНИС - новая заявка (сделка #${dealId}) - ${
          vehicle.plate || "ТС"
        }`;

        const text = [
          `Сделка: #${dealId}`,
          `Авто #${i + 1} из ${vehicles.length}`,
          "",
          `Контакт: ${contact_firstNameLat} ${contact_lastNameLat}`,
          `Email: ${contact_email}`,
          contact_phone ? `Телефон: ${contact_phone}` : `Телефон: -`,
          order_isCompany ? `Юрлицо (БИН): ${company_bin}` : `Физлицо (компания ID=1817)`,
          "",
          !order_isCompany
            ? [
                "Паспорт (данные):",
                `- Номер: ${person_passportNumber || "-"}`,
                `- Кем выдан: ${person_passportIssuer || "-"}`,
                `- Дата выдачи: ${person_passportIssuedAt || "-"}`,
                `- Действителен до: ${person_passportValidTo || "-"}`,
                `- Файлов паспорта: ${person_passportFiles.length}`,
                "",
              ].join("\n")
            : "",
          "Параметры страхования:",
          `- Территория: ${insurance_territory || "-"}`,
          "",
          "Данные авто:",
          `- Номер: ${vehicle.plate || "-"}`,
          `- Тип: ${vehicle.type || "-"}`,
          `- Дата начала: ${vehicle.startDate || "-"}`,
          `- Период: ${vehicle.period || "-"}`,
          `- Файлов техпаспорта: ${vehicle.techPassportFiles.length}`,
          "",
          "---",
          `Страница: ${pageUrl || "unknown"}`,
          `UTM: ${utm ? safeJsonStringify(utm) : "none"}`,
          `IP: ${ip}`,
          `User-Agent: ${userAgent}`,
        ]
          .filter(Boolean)
          .join("\n");

        const html = `
          <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <img src="https://dionis-insurance.com/logo_1.webp" width="56" height="56" alt="Dionis Insurance"
              style="display:block; border:0; outline:none; text-decoration:none;">
            <h2 style="font-family: 'Playfair Display', serif; font-size: 18px; color: #C19A6B; margin: 0 0 20px;">
              Новая заявка на ЗЕЛЕНУЮ КАРТУ с сайта DIONIS Insurance
            </h2>

            <p style="font-size: 14px; line-height: 1.6; color: #707070; margin: 0 0 20px;">
              <strong>Сделка:</strong> #${escapeHtml(String(dealId))}<br>
              <strong>Авто:</strong> ${escapeHtml(String(i + 1))} из ${escapeHtml(String(vehicles.length))}
            </p>

            <div style="margin-top: 12px; padding: 12px; border: 1px solid #eee; border-radius: 8px;">
              <h3 style="margin: 0 0 8px; font-size: 14px;">Контакт</h3>
              <div style="font-size: 13px; color: #333;">
                <strong>${escapeHtml(contact_firstNameLat)} ${escapeHtml(contact_lastNameLat)}</strong><br>
                Email: ${escapeHtml(contact_email)}<br>
                Телефон: ${escapeHtml(contact_phone || "-")}<br>
                ${
                  order_isCompany
                    ? `БИН: <strong>${escapeHtml(company_bin)}</strong><br>`
                    : `Договор на физлицо (компания ID=1817)<br>`
                }
                Contact ID: ${escapeHtml(String(contactId))}<br>
                Company ID: ${escapeHtml(String(companyId))}
              </div>
            </div>

            ${
              !order_isCompany
                ? `
              <div style="margin-top: 12px; padding: 12px; border: 1px solid #eee; border-radius: 8px;">
                <h3 style="margin: 0 0 8px; font-size: 14px;">Паспорт (данные)</h3>
                <div style="font-size: 13px; color: #333;">
                  Номер: <strong>${escapeHtml(person_passportNumber || "-")}</strong><br>
                  Кем выдан: ${escapeHtml(person_passportIssuer || "-")}<br>
                  Дата выдачи: ${escapeHtml(person_passportIssuedAt || "-")}<br>
                  Действителен до: ${escapeHtml(person_passportValidTo || "-")}<br>
                  Файлов паспорта: ${escapeHtml(String(person_passportFiles.length))}
                </div>
              </div>
            `
                : ""
            }

            <div style="margin-top: 12px; padding: 12px; border: 1px solid #eee; border-radius: 8px;">
              <h3 style="margin: 0 0 8px; font-size: 14px;">Параметры страхования</h3>
              <div style="font-size: 13px; color: #333;">
                Территория: <strong>${escapeHtml(insurance_territory || "-")}</strong>
              </div>
            </div>

            <div style="margin-top: 12px; padding: 12px; border: 1px solid #eee; border-radius: 8px;">
              <h3 style="margin: 0 0 8px; font-size: 14px;">Данные авто</h3>
              <div style="font-size: 13px; color: #333;">
                Номер: <strong>${escapeHtml(vehicle.plate || "-")}</strong><br>
                Тип: ${escapeHtml(vehicle.type || "-")}<br>
                Дата начала: ${escapeHtml(vehicle.startDate || "-")}<br>
                Период: ${escapeHtml(vehicle.period || "-")}<br>
                Файлов техпаспорта: ${escapeHtml(String(vehicle.techPassportFiles.length))}
              </div>
            </div>

            <div style="font-size: 14px; line-height: 1.6; color: #707070; margin: 12px 0 0;">
              <h3 style="margin: 0 0 8px; font-size: 14px; color: #111;">Мета</h3>
              Страница: ${escapeHtml(pageUrl || "unknown")}<br>
              UTM: ${escapeHtml(utm ? safeJsonStringify(utm) : "none")}<br>
              IP: ${escapeHtml(ip)}<br>
              User-Agent: ${escapeHtml(userAgent)}
            </div>
          </div>
        `;

        void mailer
          .send({ from: mailFrom, to: mailTo, subject, text, html })
          .catch((e) => console.error("Mail send error:", e));
      }
    }

    return Response.json(
      { ok: true, deals: createdDeals, contactId, companyId },
      { status: 200 }
    );
  } catch (e) {
    console.error("GREEN CARD ORDER API ERROR:", e);
    return Response.json(
      {
        ok: false,
        message: "Ошибка при обработке заявки Green Card",
        error: getErrorMessage(e),
      },
      { status: 500 }
    );
  }
}