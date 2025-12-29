// app/api/osago-rf-order/route.ts
import { Buffer } from "buffer";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // важно: нужен node, не edge

const BITRIX_BASE = process.env.BITRIX_WEBHOOK_URL;

// задержка
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

// универсальный вызов Bitrix с retry + timeout + mandatory delay
async function bitrix<T = unknown>(
  method: string,
  payload: BitrixPayload,
  attempt = 1
): Promise<T> {
  if (!BITRIX_BASE) {
    throw new Error("BITRIX_WEBHOOK_URL is not set");
  }

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

// Bitrix для дат контакта обычно принимает YYYY-MM-DD.
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
  type?: string; // select value
  country?: string; // select value
  startDate?: string | null; // DD.MM.YYYY (для сделки)
  period?: string; // select value
  techPassportFiles: File[];
};

/**
 * ✅ Настрой здесь UF-поля для ОСАГО РФ.
 * Если какие-то поля не нужны — оставь undefined и они не будут отправляться.
 */
const UF = {
  // CONTACT
  CONTACT_ID_NUMBER: "UF_CRM_1694347707628",
  CONTACT_GENDER: "UF_CRM_1686138296718",
  CONTACT_COUNTRY: "UF_CRM_1686138527330",
  CONTACT_PASSPORT_NUMBER: "UF_CRM_CONTACT_1686145698592",
  CONTACT_PASSPORT_ISSUER: "UF_CRM_1694347754648",
  CONTACT_PASSPORT_ISSUED_AT: "UF_CRM_1694347737519",
  CONTACT_PASSPORT_VALID_TO: "UF_CRM_1696422396430",

  // COMPANY
  COMPANY_INN_FIELD: "UF_CRM_COMPANY_1692911328252",

  // DEAL (ОСАГО РФ)
  DEAL_TYP_INSURANCE: "UF_CRM_1690539097",
  DEAL_INSURANCE_TERRITORY: "UF_CRM_1700656576088",
  DEAL_AGRIGATION: "UF_CRM_1693578066803",
  DEAL_AGENT: "UF_CRM_1686682902533",
  DEAL_VEHICLE_COUNTRY: "UF_CRM_1686152306664",
  DEAL_VEHICLE_PLATE: "UF_CRM_1686152485641",
  DEAL_VEHICLE_TYPE: "UF_CRM_1686152567597",
  DEAL_START_DATE: "UF_CRM_1686152149204",
  DEAL_PERIOD: "UF_CRM_1686152209741",
  DEAL_FILES: "UF_CRM_1686154280439",
} as const;

function setIfValue(
  obj: Record<string, unknown>,
  key: string | undefined,
  value: unknown
) {
  if (!key) return;
  if (value === undefined || value === null || value === "") return;
  obj[key] = value;
}

function safeJsonStringify(v: unknown): string {
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

function nl2br(s: string): string {
  return s.replace(/\n/g, "<br>");
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
  sendVehicleMail: (args: {
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
    async sendVehicleMail({ to, from, subject, text, html }) {
      await transporter.sendMail({ from, to, subject, text, html });
    },
  };
}

async function verifyRecaptchaIfNeeded(opts: {
  isProd: boolean;
  token: string | null;
}): Promise<{ ok: boolean; reason?: string }> {
  const { isProd, token } = opts;
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!isProd) return { ok: true };
  if (!secret) return { ok: true }; // если секрет не задан — не блокируем
  if (!token) return { ok: true }; // токена нет — тоже не блокируем (как в твоём примере)

  try {
    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        `secret=${encodeURIComponent(secret)}` +
        `&response=${encodeURIComponent(token)}`,
    });

    const verifyData = (await verifyRes.json()) as {
      success?: boolean;
      score?: number;
    };

    if (!verifyData.success) return { ok: false, reason: "recaptcha_not_success" };
    if (typeof verifyData.score === "number" && verifyData.score < 0.3) {
      return { ok: false, reason: `low_score_${verifyData.score}` };
    }

    return { ok: true };
  } catch (e) {
    console.error("reCAPTCHA verification error:", e);
    return { ok: true }; // при ошибке — пропускаем
  }
}

export async function POST(req: Request): Promise<Response> {
  try {
    const formData = await req.formData();

    // --- антибот (honeypot) ---
    const website = String(formData.get("website") || "").trim();
    if (website) {
      return Response.json({ ok: true }, { status: 200 });
    }

    // --- reCAPTCHA ---
    const isProd = process.env.NODE_ENV === "production";
    const recaptchaToken = String(formData.get("recaptchaToken") || "").trim() || null;
    const recaptcha = await verifyRecaptchaIfNeeded({ isProd, token: recaptchaToken });
    if (!recaptcha.ok) {
      return Response.json(
        { ok: false, message: "Подтвердите, что вы не робот." },
        { status: 400 }
      );
    }

    // --- 1. Контакты и базовые данные ---
    const contact_email = String(formData.get("contact_email") || "").trim();
    const contact_firstNameLat = String(formData.get("contact_firstNameLat") || "").trim();
    const contact_lastNameLat = String(formData.get("contact_lastNameLat") || "").trim();
    const contact_phone = String(formData.get("contact_phone") || "").trim();

    if (!contact_email || !contact_firstNameLat || !contact_lastNameLat || !contact_phone) {
      return Response.json(
        { ok: false, message: "Не заполнены обязательные контактные данные" },
        { status: 400 }
      );
    }

    const order_isCompany = String(formData.get("order-isCompany") || "") === "on";

    // В форме: company_inn, company_email
    const company_inn = String(formData.get("company_inn") || "").trim();
    const company_email = String(formData.get("company_email") || "").trim();

    // --- 1b. Данные физлица ---
    const person_middleName = String(formData.get("person_middleName") || "").trim();

    const person_gender_raw = String(formData.get("person_gender") || "").trim();
    const person_gender =
      person_gender_raw === "male" ? "45" : person_gender_raw === "female" ? "47" : person_gender_raw;

    const person_birthDate = parseDateISO(
      String(formData.get("person_birthDate") || "") || null
    );

    const person_idNumber = String(formData.get("person_idNumber") || "").trim();
    const person_country = String(formData.get("person_country") || "").trim();
    const person_address = String(formData.get("person_address") || "").trim();

    const person_passportNumber = String(formData.get("person_passportNumber") || "").trim();
    const person_passportIssuer = String(formData.get("person_passportIssuer") || "").trim();
    const person_passportIssuedAt = parseDateISO(
      String(formData.get("person_passportIssuedAt") || "") || null
    );
    const person_passportValidTo = parseDateISO(
      String(formData.get("person_passportValidTo") || "") || null
    );

    // UTM и URL страницы
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

    // --- meta (IP / UA) ---
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // --- 2. Парсим транспортные средства ---
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

    // --- 3. Контакт: поиск по EMAIL, либо создание ---
    let contactId: number | null = null;

    const foundContacts = await bitrix<Array<{ ID: string }>>("crm.contact.list", {
      filter: { EMAIL: contact_email },
      select: ["ID"],
      start: 0,
    });

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

    // --- 3b. Обновление контакта (если физлицо) ---
    if (!order_isCompany) {
      const contactUpdateFields: Record<string, unknown> = {};

      if (person_middleName) contactUpdateFields.SECOND_NAME = person_middleName;
      if (person_birthDate) contactUpdateFields.BIRTHDATE = person_birthDate;
      if (person_address) contactUpdateFields.ADDRESS = person_address;

      setIfValue(contactUpdateFields, UF.CONTACT_ID_NUMBER, person_idNumber);
      setIfValue(contactUpdateFields, UF.CONTACT_GENDER, person_gender);
      setIfValue(contactUpdateFields, UF.CONTACT_COUNTRY, person_country);
      setIfValue(contactUpdateFields, UF.CONTACT_PASSPORT_NUMBER, person_passportNumber);
      setIfValue(contactUpdateFields, UF.CONTACT_PASSPORT_ISSUER, person_passportIssuer);
      setIfValue(contactUpdateFields, UF.CONTACT_PASSPORT_ISSUED_AT, person_passportIssuedAt);
      setIfValue(contactUpdateFields, UF.CONTACT_PASSPORT_VALID_TO, person_passportValidTo);

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
      if (!company_inn) {
        return Response.json(
          { ok: false, message: "Отмечено 'договор на юрлицо', но не указан ИНН компании." },
          { status: 400 }
        );
      }

      // поиск
      const filter: Record<string, unknown> = {};
      if (UF.COMPANY_INN_FIELD) filter[UF.COMPANY_INN_FIELD] = company_inn;

      const foundCompanies = await bitrix<Array<{ ID: string }>>("crm.company.list", {
        filter,
        select: ["ID"],
        start: 0,
      });

      if (Array.isArray(foundCompanies) && foundCompanies.length > 0) {
        companyId = Number(foundCompanies[0].ID);
      } else {
        const fields: Record<string, unknown> = {
          TITLE: company_inn,
          EMAIL: company_email ? [{ VALUE: company_email, VALUE_TYPE: "WORK" }] : [],
        };
        setIfValue(fields, UF.COMPANY_INN_FIELD, company_inn);

        const newCompanyId = await bitrix<string>("crm.company.add", { fields });
        companyId = Number(newCompanyId);
      }
    } else {
      // дефолтная компания для физлиц
      companyId = 1817;

      // привязка контакта к компании
      await bitrix<boolean>("crm.contact.update", {
        id: contactId,
        fields: { COMPANY_ID: companyId },
      });
    }

    // --- 5. Подготовка почты (один transporter на весь запрос) ---
    const mailer = buildMailer();
    const mailTo = process.env.MAIL_TO || "info@ibb.expert";
    const mailFrom = process.env.MAIL_FROM || process.env.MAIL_USER || "no-reply@localhost";

    // --- 6. Сделки по каждому авто + письмо по каждому авто ---
    const createdDeals: number[] = [];

    const commonCommentParts: string[] = [];
    if (pageUrl) commonCommentParts.push(`Страница: ${pageUrl}`);
    if (utm !== undefined) commonCommentParts.push(`UTM: ${safeJsonStringify(utm)}`);
    commonCommentParts.push(
      `Контакт: ${contact_firstNameLat} ${contact_lastNameLat} <${contact_email}>`
    );
    commonCommentParts.push(`Телефон: ${contact_phone}`);
    commonCommentParts.push(
      order_isCompany
        ? `Договор на юрлицо, ИНН: ${company_inn}`
        : `Договор на физлицо (компания ID=1817)`
    );

    const commonComment = commonCommentParts.join("\n");

    for (let i = 0; i < vehicles.length; i++) {
      const vehicle = vehicles[i];

      const dealFields: Record<string, unknown> = {
        TITLE: `Заявка ОСАГО РФ: ${vehicle.plate || "ТС"}`,
        CONTACT_ID: contactId,
        COMPANY_ID: companyId,
        COMMENTS: commonComment,
      };

      setIfValue(dealFields, UF.DEAL_TYP_INSURANCE, 425);
      setIfValue(dealFields, UF.DEAL_INSURANCE_TERRITORY, 1097);
      setIfValue(dealFields, UF.DEAL_AGRIGATION, 1169);
      setIfValue(dealFields, UF.DEAL_AGENT, 3907);
      setIfValue(dealFields, UF.DEAL_VEHICLE_COUNTRY, vehicle.country || null);
      setIfValue(dealFields, UF.DEAL_VEHICLE_PLATE, vehicle.plate || null);
      setIfValue(dealFields, UF.DEAL_VEHICLE_TYPE, vehicle.type || null);
      setIfValue(dealFields, UF.DEAL_START_DATE, vehicle.startDate || null);
      setIfValue(dealFields, UF.DEAL_PERIOD, vehicle.period || null);

      if (UF.DEAL_FILES && vehicle.techPassportFiles.length > 0) {
        const filesData = await Promise.all(
          vehicle.techPassportFiles.map((f) => fileToBitrixFileData(f))
        );
        dealFields[UF.DEAL_FILES] = filesData.map((fd) => ({ fileData: fd }));
      }

      const dealIdStr = await bitrix<string>("crm.deal.add", { fields: dealFields });
      const dealId = Number(dealIdStr);
      createdDeals.push(dealId);

      // --- ПИСЬМО: по каждому авто отдельно ---
      if (mailer) {
        const subject = `ОСАГО РФ нерезов - ДИОНИС - новая заявка (сделка #${dealId}) - ${vehicle.plate || "ТС"}`;

        const metaText =
          "\n\n---\n" +
          `Страница: ${pageUrl || "unknown"}\n` +
          `UTM: ${utm ? safeJsonStringify(utm) : "none"}\n` +
          `IP: ${ip}\n` +
          `User-Agent: ${userAgent}\n`;

        const text = [
          `Сделка: #${dealId}`,
          `Авто #${i + 1} из ${vehicles.length}`,
          "",
          `Контакт: ${contact_firstNameLat} ${contact_lastNameLat}`,
          `Email: ${contact_email}`,
          `Телефон: ${contact_phone}`,
          order_isCompany ? `Юрлицо (ИНН): ${company_inn}` : `Физлицо (компания ID=1817)`,
          `Company ID: ${companyId}`,
          `Contact ID: ${contactId}`,
          "",
          "Данные авто:",
          `- Номер: ${vehicle.plate || "-"}`,
          `- Тип: ${vehicle.type || "-"}`,
          `- Страна (значение справочника): ${vehicle.country || "-"}`,
          `- Дата начала: ${vehicle.startDate || "-"}`,
          `- Период: ${vehicle.period || "-"}`,
          `- Файлов техпаспорта: ${vehicle.techPassportFiles.length}`,
          metaText,
        ].join("\n");

        const html = `
          
          <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <Image src="/logo_1.webp" alt="Dionis Insurance" width={56} height={56} priority />
            <h2 style="font-family: 'Playfair Display', serif; font-size: 18px; color: #C19A6B; margin: 0 0 20px;">Новая заявка на ОСАГО РФ нерезов с сайта DIONIS Insurance</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #707070; margin: 0 0 20px;">
          	  <strong>Сделка:</strong> #${escapeHtml(String(dealId))}<br>
              <strong>Авто:</strong> ${escapeHtml(String(i + 1))} из ${escapeHtml(String(vehicles.length))}
            </p>
          
            <div style="margin-top: 12px; padding: 12px; border: 1px solid #eee; border-radius: 8px;">
              <h3 style="margin: 0 0 8px; font-size: 14px;">Контакт</h3>
              <div style="font-size: 13px; color: #333;">
                <strong>${escapeHtml(contact_firstNameLat)} ${escapeHtml(contact_lastNameLat)}</strong><br>
                Email: ${escapeHtml(contact_email)}<br>
                Телефон: ${escapeHtml(contact_phone)}<br>
                ${order_isCompany ? `ИНН: <strong>${escapeHtml(company_inn)}</strong><br>` : `Договор на физлицо (компания ID=1817)<br>`}
                Contact ID: ${escapeHtml(String(contactId))}<br>
                Company ID: ${escapeHtml(String(companyId))}
              </div>
            </div>

            <div style="margin-top: 12px; padding: 12px; border: 1px solid #eee; border-radius: 8px;">
              <h3 style="margin: 0 0 8px; font-size: 14px;">Данные авто</h3>
              <div style="font-size: 13px; color: #333;">
                Номер: <strong>${escapeHtml(vehicle.plate || "-")}</strong><br>
                Тип: ${escapeHtml(vehicle.type || "-")}<br>
                Страна (значение справочника): ${escapeHtml(vehicle.country || "-")}<br>
                Дата начала: ${escapeHtml(vehicle.startDate || "-")}<br>
                Период: ${escapeHtml(vehicle.period || "-")}<br>
                Файлов техпаспорта: ${escapeHtml(String(vehicle.techPassportFiles.length))}
              </div>
            </div>

            <div style="margin-top: 12px; font-size: 12px; color: #666; white-space: normal;">
              <h3 style="margin: 0 0 8px; font-size: 14px; color: #111;">Мета</h3>
              Страница: ${escapeHtml(pageUrl || "unknown")}<br>
              UTM: ${escapeHtml(utm ? safeJsonStringify(utm) : "none")}<br>
              IP: ${escapeHtml(ip)}<br>
              User-Agent: ${escapeHtml(userAgent)}
            </div>
     
			      <p></p>

            <h2 style="font-family: 'Playfair Display', serif; font-size: 18px; color: #C19A6B; margin: 0 0 20px;">С уважением, Денис БОРОВОЙ</h2>
            <span style="color: #707070;">директор<br>
            <a href="http://dionis-insurance.kz" target="_blank" style="color: #C19A6B; text-decoration: none;">ТОО страховой брокер ДИОНИС</a> </span>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tbody>
                <tr>
                  <td style="padding: 10px; text-align: left; border-bottom: 1px solid #F2F2F2;">
                    <Image src="/logo_1.webp" alt="Dionis Insurance" width={56} height={56} priority display: block; />
                  </td>
                  <td style="padding: 10px; text-align: left; border-bottom: 1px solid #F2F2F2;">
                    <a href="mailto:info@dionis-insurance.kz" style="color: #C19A6B; text-decoration: none;">info@dionis-insurance.kz</a><br>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style="max-width: 600px; margin: 20px auto; background-color: #FFFFFF; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); font-size: 12px; color: #707070;">
            <p style="margin: 0;">
              Информация, содержащаяся в данном сообщении, является конфиденциальной и предназначена исключительно для указанных получателей.<br>
              Несанкционированный доступ, распространение, копирование или дистрибуция этого сообщения или любых его вложений строго запрещены и могут быть незаконными.<br>
              Если вы не являетесь предполагаемым получателем, или если вы получили это сообщение по ошибке, пожалуйста, немедленно уведомите отправителя, ответив на это электронное письмо, а затем удалите его из вашей системы.<br>
              Мы ценим ваше сотрудничество.
            </p>
          </div>
        `;

        try {
          await mailer.sendVehicleMail({
            from: mailFrom,
            to: mailTo,
            subject,
            text,
            html,
          });
        } catch (e) {
          // письмо не должно валить заявку
          console.error("Mail send error:", e);
        }
      } else {
        // чтобы было видно в логах, почему не шлём
        console.error("Mail env vars are not fully set (MAIL_HOST/MAIL_USER/MAIL_PASS/MAIL_FROM)");
      }
    }

    return Response.json(
      { ok: true, deals: createdDeals, contactId, companyId },
      { status: 200 }
    );
  } catch (e) {
    console.error("OSAGO RF ORDER API ERROR:", e);
    return Response.json(
      {
        ok: false,
        message: "Ошибка при обработке заявки ОСАГО РФ",
        error: getErrorMessage(e),
      },
      { status: 500 }
    );
  }
}
