// lib/green-card-order.ts
import { buildMailer, getMailerDefaults } from "@/lib/mailer";
import {
  filesToBitrixFileField,
  getBitrixClient,
  normalizeBitrixId,
} from "@/lib/bitrix";

export type VehicleInput = {
  plate: string;
  type: string;
  startDate: string;
  period: string;
  techPassportFiles: File[];
};

export type ParsedGreenCardOrder = {
  requestId: string;

  contact: {
    email: string;
    firstNameLat: string;
    lastNameLat: string;
    phone: string;
  };

  orderIsCompany: boolean;

  company: {
    bin: string;
    email: string;
  };

  person: {
    middleName: string;
    gender: string;
    birthDate: string | null;
    idNumber: string;
    country: string;
    address: string;
    passportNumber: string;
    passportIssuer: string;
    passportIssuedAt: string | null;
    passportValidTo: string | null;
    passportFiles: File[];
  };

  insurance: {
    territory: string;
  };

  meta: {
    pageUrl?: string;
    utm?: unknown;
    ip: string;
    userAgent: string;
  };

  vehicles: VehicleInput[];
};

export type GreenCardOrderResult = {
  requestId: string;
  contactId: number;
  companyId: number;
  dealIds: number[];
};

export const UF = {
  CONTACT_ID_NUMBER: "UF_CRM_1694347707628",
  CONTACT_GENDER: "UF_CRM_1686138296718",
  CONTACT_COUNTRY: "UF_CRM_1686138527330",
  CONTACT_PASSPORT_NUMBER: "UF_CRM_CONTACT_1686145698592",
  CONTACT_PASSPORT_ISSUER: "UF_CRM_1694347754648",
  CONTACT_PASSPORT_ISSUED_AT: "UF_CRM_1694347737519",
  CONTACT_PASSPORT_VALID_TO: "UF_CRM_1696422396430",
  CONTACT_PASSPORT_FILES: "UF_CRM_1694347572671",

  COMPANY_BIN_FIELD: "UF_CRM_COMPANY_1692911328252",

  DEAL_VEHICLE_PLATE: "UF_CRM_1686152485641",
  DEAL_VEHICLE_TYPE: "UF_CRM_1686152567597",
  DEAL_PERIOD: "UF_CRM_1686152209741",
  DEAL_START_DATE: "UF_CRM_1686152149204",
  DEAL_INSURANCE_TYPE: "UF_CRM_1690539097",
  DEAL_VEHICLE_COUNTRY: "UF_CRM_1686152306664",
  DEAL_TERRITORY: "UF_CRM_1700656576088",
  DEAL_AGRIGATION: "UF_CRM_1693578066803",
  DEAL_AGENT: "UF_CRM_1686682902533",
  DEAL_FILES: "UF_CRM_1686154280439",
} as const;

function getErrorMessage(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

function safeJsonStringify(value: unknown): string {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
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

function getCheckedFlag(formData: FormData, ...keys: string[]): boolean {
  return keys.some((key) => String(formData.get(key) || "") === "on");
}

function getFilesByKey(formData: FormData, key: string): File[] {
  const files: File[] = [];

  for (const [entryKey, value] of formData.entries()) {
    if (entryKey === key && value instanceof File && value.size > 0) {
      files.push(value);
    }
  }

  return files;
}

function setIfValue(
  obj: Record<string, unknown>,
  key: string | undefined,
  value: unknown
) {
  if (!key) return;
  if (value === undefined || value === null || value === "") return;
  obj[key] = value;
}

function parseVehicles(formData: FormData): VehicleInput[] {
  const vehiclesMap = new Map<
    number,
    Partial<VehicleInput> & { techPassportFiles: File[] }
  >();

  for (const [key, value] of formData.entries()) {
    const match = key.match(/^vehicles\[(\d+)\]\[(\w+)\]$/);
    if (!match) continue;

    const index = Number(match[1]);
    const field = match[2];

    if (!vehiclesMap.has(index)) {
      vehiclesMap.set(index, { techPassportFiles: [] });
    }

    const vehicle = vehiclesMap.get(index)!;

    if (field === "techPassportFiles") {
      if (value instanceof File && value.size > 0) {
        vehicle.techPassportFiles.push(value);
      }
      continue;
    }

    if (field === "startDate") {
      const parsed = parseDateToDDMMYYYY(String(value));
      if (parsed) {
        vehicle.startDate = parsed;
      }
      continue;
    }

    if (field === "plate") {
      vehicle.plate = String(value).trim();
      continue;
    }

    if (field === "type") {
      vehicle.type = String(value).trim();
      continue;
    }

    if (field === "period") {
      vehicle.period = String(value).trim();
      continue;
    }
  }

  return Array.from(vehiclesMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([, vehicle], index) => {
      if (
        !vehicle.plate ||
        !vehicle.type ||
        !vehicle.startDate ||
        !vehicle.period ||
        !vehicle.techPassportFiles.length
      ) {
        throw new Error(
          `ТС #${index + 1}: заполните Госномер, Тип, Дату начала, Срок и прикрепите фото техпаспорта.`
        );
      }

      return {
        plate: vehicle.plate,
        type: vehicle.type,
        startDate: vehicle.startDate,
        period: vehicle.period,
        techPassportFiles: vehicle.techPassportFiles,
      };
    });
}

export function parseGreenCardOrder(
  formData: FormData,
  req: Request
): ParsedGreenCardOrder {
  const contactEmail = String(formData.get("contact_email") || "").trim();
  const contactFirstNameLat = String(
    formData.get("contact_firstNameLat") || ""
  ).trim();
  const contactLastNameLat = String(
    formData.get("contact_lastNameLat") || ""
  ).trim();
  const contactPhone = String(formData.get("contact_phone") || "").trim();

  if (!contactEmail || !contactFirstNameLat || !contactLastNameLat) {
    throw new Error("Не заполнены обязательные контактные данные");
  }

  const orderIsCompany = getCheckedFlag(
    formData,
    "order_isCompany",
    "order-isCompany"
  );

  const personGenderRaw = String(formData.get("person_gender") || "").trim();
  const personGender =
    personGenderRaw === "male"
      ? "45"
      : personGenderRaw === "female"
      ? "47"
      : personGenderRaw;

  const pageUrlRaw = String(formData.get("pageUrl") || "").trim();

  let utm: unknown = undefined;
  const utmRaw = formData.get("utm");
  if (typeof utmRaw === "string" && utmRaw.trim()) {
    try {
      utm = JSON.parse(utmRaw);
    } catch {
      utm = undefined;
    }
  }

  const vehicles = parseVehicles(formData);
  if (!vehicles.length) {
    throw new Error("Не указано ни одного транспортного средства");
  }

  return {
    requestId: crypto.randomUUID(),

    contact: {
      email: contactEmail,
      firstNameLat: contactFirstNameLat,
      lastNameLat: contactLastNameLat,
      phone: contactPhone,
    },

    orderIsCompany,

    company: {
      bin: String(formData.get("company_bin") || "").trim(),
      email: String(formData.get("company_email") || "").trim(),
    },

    person: {
      middleName: String(formData.get("person_middleName") || "").trim(),
      gender: personGender,
      birthDate: parseDateISO(
        String(formData.get("person_birthDate") || "") || null
      ),
      idNumber: String(formData.get("person_idNumber") || "").trim(),
      country: String(formData.get("person_country") || "").trim(),
      address: String(formData.get("person_address") || "").trim(),
      passportNumber: String(formData.get("person_passportNumber") || "").trim(),
      passportIssuer: String(formData.get("person_passportIssuer") || "").trim(),
      passportIssuedAt: parseDateISO(
        String(formData.get("person_passportIssuedAt") || "") || null
      ),
      passportValidTo: parseDateISO(
        String(formData.get("person_passportValidTo") || "") || null
      ),
      passportFiles: getFilesByKey(formData, "person_passportFiles"),
    },

    insurance: {
      territory: String(formData.get("insurance_territory") || "").trim(),
    },

    meta: {
      pageUrl: pageUrlRaw || undefined,
      utm,
      ip:
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown",
      userAgent: req.headers.get("user-agent") || "unknown",
    },

    vehicles,
  };
}

async function findOrCreateContact(
  order: ParsedGreenCardOrder
): Promise<number> {
  const bitrix = getBitrixClient();

  const foundContacts = await bitrix.call<Array<{ ID: string }>>(
    "crm.contact.list",
    {
      filter: { EMAIL: order.contact.email },
      select: ["ID"],
      start: 0,
    }
  );

  const existingId = normalizeBitrixId(foundContacts?.[0]?.ID);
  if (existingId) {
    return existingId;
  }

  const newContactId = await bitrix.call<string>("crm.contact.add", {
    fields: {
      NAME: order.contact.firstNameLat,
      LAST_NAME: order.contact.lastNameLat,
      PHONE: order.contact.phone
        ? [{ VALUE: order.contact.phone, VALUE_TYPE: "WORK" }]
        : [],
      EMAIL: [{ VALUE: order.contact.email, VALUE_TYPE: "WORK" }],
    },
  });

  const contactId = normalizeBitrixId(newContactId);
  if (!contactId) {
    throw new Error("Не удалось создать контакт в Bitrix");
  }

  return contactId;
}

async function updateContactIfNeeded(
  contactId: number,
  order: ParsedGreenCardOrder
): Promise<void> {
  if (order.orderIsCompany) return;

  const bitrix = getBitrixClient();
  const fields: Record<string, unknown> = {};

  if (order.person.middleName) {
    fields.SECOND_NAME = order.person.middleName;
  }
  if (order.person.birthDate) {
    fields.BIRTHDATE = order.person.birthDate;
  }
  if (order.person.address) {
    fields.ADDRESS = order.person.address;
  }

  setIfValue(fields, UF.CONTACT_ID_NUMBER, order.person.idNumber);
  setIfValue(fields, UF.CONTACT_GENDER, order.person.gender);
  setIfValue(fields, UF.CONTACT_COUNTRY, order.person.country);
  setIfValue(fields, UF.CONTACT_PASSPORT_NUMBER, order.person.passportNumber);
  setIfValue(fields, UF.CONTACT_PASSPORT_ISSUER, order.person.passportIssuer);
  setIfValue(fields, UF.CONTACT_PASSPORT_ISSUED_AT, order.person.passportIssuedAt);
  setIfValue(fields, UF.CONTACT_PASSPORT_VALID_TO, order.person.passportValidTo);

  if (order.person.passportFiles.length > 0) {
    fields[UF.CONTACT_PASSPORT_FILES] = await filesToBitrixFileField(
      order.person.passportFiles
    );
  }

  if (!Object.keys(fields).length) return;

  await bitrix.call<boolean>("crm.contact.update", {
    id: contactId,
    fields,
  });
}

async function resolveCompanyId(
  contactId: number,
  order: ParsedGreenCardOrder
): Promise<number> {
  const bitrix = getBitrixClient();

  if (!order.orderIsCompany) {
    const companyId = 1817;

    await bitrix.call<boolean>("crm.contact.update", {
      id: contactId,
      fields: { COMPANY_ID: companyId },
    });

    return companyId;
  }

  if (!order.company.bin) {
    throw new Error("Отмечено 'договор на юрлицо', но не указан БИН компании.");
  }

  const foundCompanies = await bitrix.call<Array<{ ID: string }>>(
    "crm.company.list",
    {
      filter: { [UF.COMPANY_BIN_FIELD]: order.company.bin },
      select: ["ID"],
      start: 0,
    }
  );

  const existingId = normalizeBitrixId(foundCompanies?.[0]?.ID);
  if (existingId) {
    return existingId;
  }

  const fields: Record<string, unknown> = {
    TITLE: order.company.bin,
    EMAIL: order.company.email
      ? [{ VALUE: order.company.email, VALUE_TYPE: "WORK" }]
      : [],
  };

  setIfValue(fields, UF.COMPANY_BIN_FIELD, order.company.bin);

  const newCompanyId = await bitrix.call<string>("crm.company.add", { fields });
  const companyId = normalizeBitrixId(newCompanyId);

  if (!companyId) {
    throw new Error("Не удалось создать компанию в Bitrix");
  }

  return companyId;
}

function buildCommonComment(order: ParsedGreenCardOrder): string {
  const parts: string[] = [];

  parts.push(`Request ID: ${order.requestId}`);

  if (order.meta.pageUrl) {
    parts.push(`Страница: ${order.meta.pageUrl}`);
  }

  if (order.meta.utm !== undefined) {
    parts.push(`UTM: ${safeJsonStringify(order.meta.utm)}`);
  }

  parts.push(
    `Контакт: ${order.contact.firstNameLat} ${order.contact.lastNameLat} <${order.contact.email}>`
  );

  if (order.contact.phone) {
    parts.push(`Телефон: ${order.contact.phone}`);
  }

  parts.push(
    order.orderIsCompany
      ? `Договор на юрлицо, БИН: ${order.company.bin}`
      : `Договор на физлицо (компания ID=1817)`
  );

  if (!order.orderIsCompany) {
    parts.push(
      [
        "Паспорт (данные):",
        `- Номер: ${order.person.passportNumber || "-"}`,
        `- Кем выдан: ${order.person.passportIssuer || "-"}`,
        `- Дата выдачи: ${order.person.passportIssuedAt || "-"}`,
        `- Действителен до: ${order.person.passportValidTo || "-"}`,
        `- Файлов паспорта: ${order.person.passportFiles.length}`,
      ].join("\n")
    );
  }

  return parts.join("\n");
}

async function createDeals(args: {
  order: ParsedGreenCardOrder;
  contactId: number;
  companyId: number;
}): Promise<number[]> {
  const { order, contactId, companyId } = args;
  const bitrix = getBitrixClient();
  const commonComment = buildCommonComment(order);
  const createdDeals: number[] = [];

  for (const vehicle of order.vehicles) {
    const techPassportFiles = await filesToBitrixFileField(
      vehicle.techPassportFiles
    );

    const fields: Record<string, unknown> = {
      TITLE: `Заявка Green Card: ${vehicle.plate || "ТС"}`,
      CONTACT_ID: contactId,
      COMPANY_ID: companyId,
      COMMENTS: commonComment,
    };

    setIfValue(fields, UF.DEAL_VEHICLE_PLATE, vehicle.plate || null);
    setIfValue(fields, UF.DEAL_VEHICLE_TYPE, vehicle.type || null);
    setIfValue(fields, UF.DEAL_PERIOD, vehicle.period || null);
    setIfValue(fields, UF.DEAL_START_DATE, vehicle.startDate || null);
    setIfValue(fields, UF.DEAL_INSURANCE_TYPE, 429);
    setIfValue(fields, UF.DEAL_VEHICLE_COUNTRY, 385);
    setIfValue(fields, UF.DEAL_TERRITORY, order.insurance.territory || null);
    setIfValue(fields, UF.DEAL_AGRIGATION, 1169);
    setIfValue(fields, UF.DEAL_AGENT, 3907);

    if (techPassportFiles.length > 0) {
      fields[UF.DEAL_FILES] = techPassportFiles;
    }

    const dealIdRaw = await bitrix.call<string>("crm.deal.add", { fields });
    const dealId = normalizeBitrixId(dealIdRaw);

    if (!dealId) {
      throw new Error(`Не удалось создать сделку для авто ${vehicle.plate}`);
    }

    createdDeals.push(dealId);
  }

  return createdDeals;
}

function buildEmailPayload(args: {
  dealId: number;
  index: number;
  total: number;
  contactId: number;
  companyId: number;
  order: ParsedGreenCardOrder;
  vehicle: VehicleInput;
}) {
  const { dealId, index, total, contactId, companyId, order, vehicle } = args;

  const subject = `Зеленая карта - ДИОНИС - новая заявка (сделка #${dealId}) - ${
    vehicle.plate || "ТС"
  }`;

  const text = [
    `Request ID: ${order.requestId}`,
    `Сделка: #${dealId}`,
    `Авто #${index + 1} из ${total}`,
    "",
    `Контакт: ${order.contact.firstNameLat} ${order.contact.lastNameLat}`,
    `Email: ${order.contact.email}`,
    order.contact.phone ? `Телефон: ${order.contact.phone}` : `Телефон: -`,
    order.orderIsCompany
      ? `Юрлицо (БИН): ${order.company.bin}`
      : `Физлицо (компания ID=1817)`,
    "",
    !order.orderIsCompany
      ? [
          "Паспорт (данные):",
          `- Номер: ${order.person.passportNumber || "-"}`,
          `- Кем выдан: ${order.person.passportIssuer || "-"}`,
          `- Дата выдачи: ${order.person.passportIssuedAt || "-"}`,
          `- Действителен до: ${order.person.passportValidTo || "-"}`,
          `- Файлов паспорта: ${order.person.passportFiles.length}`,
          "",
        ].join("\n")
      : "",
    "Параметры страхования:",
    `- Территория: ${order.insurance.territory || "-"}`,
    "",
    "Данные авто:",
    `- Номер: ${vehicle.plate || "-"}`,
    `- Тип: ${vehicle.type || "-"}`,
    `- Дата начала: ${vehicle.startDate || "-"}`,
    `- Период: ${vehicle.period || "-"}`,
    `- Файлов техпаспорта: ${vehicle.techPassportFiles.length}`,
    "",
    "---",
    `Страница: ${order.meta.pageUrl || "unknown"}`,
    `UTM: ${order.meta.utm ? safeJsonStringify(order.meta.utm) : "none"}`,
    `IP: ${order.meta.ip}`,
    `User-Agent: ${order.meta.userAgent}`,
    `Contact ID: ${contactId}`,
    `Company ID: ${companyId}`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="max-width:600px;margin:0 auto;background-color:#FFFFFF;padding:20px;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,.1);">
      <img src="https://dionis-insurance.com/logo_1.webp" width="56" height="56" alt="Dionis Insurance" style="display:block;border:0;outline:none;text-decoration:none;">
      <h2 style="font-size:18px;color:#C19A6B;margin:0 0 20px;">
        Новая заявка на ЗЕЛЕНУЮ КАРТУ с сайта DIONIS Insurance
      </h2>

      <p style="font-size:14px;line-height:1.6;color:#707070;margin:0 0 20px;">
        <strong>Request ID:</strong> ${escapeHtml(order.requestId)}<br>
        <strong>Сделка:</strong> #${escapeHtml(String(dealId))}<br>
        <strong>Авто:</strong> ${escapeHtml(String(index + 1))} из ${escapeHtml(String(total))}
      </p>

      <div style="margin-top:12px;padding:12px;border:1px solid #eee;border-radius:8px;">
        <h3 style="margin:0 0 8px;font-size:14px;">Контакт</h3>
        <div style="font-size:13px;color:#333;">
          <strong>${escapeHtml(order.contact.firstNameLat)} ${escapeHtml(order.contact.lastNameLat)}</strong><br>
          Email: ${escapeHtml(order.contact.email)}<br>
          Телефон: ${escapeHtml(order.contact.phone || "-")}<br>
          ${
            order.orderIsCompany
              ? `БИН: <strong>${escapeHtml(order.company.bin)}</strong><br>`
              : `Договор на физлицо (компания ID=1817)<br>`
          }
          Contact ID: ${escapeHtml(String(contactId))}<br>
          Company ID: ${escapeHtml(String(companyId))}
        </div>
      </div>

      ${
        !order.orderIsCompany
          ? `
        <div style="margin-top:12px;padding:12px;border:1px solid #eee;border-radius:8px;">
          <h3 style="margin:0 0 8px;font-size:14px;">Паспорт (данные)</h3>
          <div style="font-size:13px;color:#333;">
            Номер: <strong>${escapeHtml(order.person.passportNumber || "-")}</strong><br>
            Кем выдан: ${escapeHtml(order.person.passportIssuer || "-")}<br>
            Дата выдачи: ${escapeHtml(order.person.passportIssuedAt || "-")}<br>
            Действителен до: ${escapeHtml(order.person.passportValidTo || "-")}<br>
            Файлов паспорта: ${escapeHtml(String(order.person.passportFiles.length))}
          </div>
        </div>
      `
          : ""
      }

      <div style="margin-top:12px;padding:12px;border:1px solid #eee;border-radius:8px;">
        <h3 style="margin:0 0 8px;font-size:14px;">Параметры страхования</h3>
        <div style="font-size:13px;color:#333;">
          Территория: <strong>${escapeHtml(order.insurance.territory || "-")}</strong>
        </div>
      </div>

      <div style="margin-top:12px;padding:12px;border:1px solid #eee;border-radius:8px;">
        <h3 style="margin:0 0 8px;font-size:14px;">Данные авто</h3>
        <div style="font-size:13px;color:#333;">
          Номер: <strong>${escapeHtml(vehicle.plate || "-")}</strong><br>
          Тип: ${escapeHtml(vehicle.type || "-")}<br>
          Дата начала: ${escapeHtml(vehicle.startDate || "-")}<br>
          Период: ${escapeHtml(vehicle.period || "-")}<br>
          Файлов техпаспорта: ${escapeHtml(String(vehicle.techPassportFiles.length))}
        </div>
      </div>

      <div style="font-size:14px;line-height:1.6;color:#707070;margin:12px 0 0;">
        <h3 style="margin:0 0 8px;font-size:14px;color:#111;">Мета</h3>
        Страница: ${escapeHtml(order.meta.pageUrl || "unknown")}<br>
        UTM: ${escapeHtml(order.meta.utm ? safeJsonStringify(order.meta.utm) : "none")}<br>
        IP: ${escapeHtml(order.meta.ip)}<br>
        User-Agent: ${escapeHtml(order.meta.userAgent)}
      </div>
    </div>
  `;

  return { subject, text, html };
}

function sendDealEmails(args: {
  order: ParsedGreenCardOrder;
  dealIds: number[];
  contactId: number;
  companyId: number;
}): void {
  const { order, dealIds, contactId, companyId } = args;

  const mailer = buildMailer();
  if (!mailer) {
    console.error(
      "Mail env vars are not fully set (MAIL_HOST/MAIL_USER/MAIL_PASS/MAIL_FROM)"
    );
    return;
  }

  const defaults = getMailerDefaults();

  for (let i = 0; i < dealIds.length; i++) {
    const dealId = dealIds[i];
    const vehicle = order.vehicles[i];

    const { subject, text, html } = buildEmailPayload({
      dealId,
      index: i,
      total: order.vehicles.length,
      contactId,
      companyId,
      order,
      vehicle,
    });

    void mailer
      .send({
        from: defaults.from,
        to: defaults.to,
        subject,
        text,
        html,
      })
      .catch((error) => {
        console.error("Mail send error:", error);
      });
  }
}

export async function processGreenCardOrder(
  order: ParsedGreenCardOrder
): Promise<GreenCardOrderResult> {
  const contactId = await findOrCreateContact(order);
  await updateContactIfNeeded(contactId, order);
  const companyId = await resolveCompanyId(contactId, order);
  const dealIds = await createDeals({ order, contactId, companyId });

  sendDealEmails({
    order,
    dealIds,
    contactId,
    companyId,
  });

  return {
    requestId: order.requestId,
    contactId,
    companyId,
    dealIds,
  };
}

export { getErrorMessage };