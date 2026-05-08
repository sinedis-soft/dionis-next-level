// lib/osago-rf-order.ts
import { buildMailer, getMailerDefaults } from "@/lib/mailer";
import {
  filesToBitrixFileField,
  getBitrixClient,
  normalizeBitrixId,
} from "@/lib/bitrix";

export type DriverInput = {
  fullName?: string;
  experienceYears?: string;
  licenseFiles: File[];
};

export type VehicleInput = {
  plate?: string;
  type?: string;
  country?: string;
  startDate?: string | null; // DD.MM.YYYY для сделки
  period?: string;
  techPassportFiles: File[];
  driversLimited?: boolean;
  driverLicenseFiles: File[]; // legacy fallback
  drivers: DriverInput[];
};

export type ParsedOsagoRfOrder = {
  requestId: string;

  contact: {
    email: string;
    firstNameLat: string;
    lastNameLat: string;
    phone: string;
  };

  orderIsCompany: boolean;

  company: {
    inn: string;
    email: string;
  };

  person: {
    middleName: string;
    gender: string;
    birthDate: string | null;
    country: string;
    address: string;
    passportNumber: string;
    passportIssuer: string;
    passportIssuedAt: string | null;
    passportFiles: File[];
  };

  meta: {
    pageUrl?: string;
    utm?: unknown;
    ip: string;
    userAgent: string;
  };

  vehicles: VehicleInput[];
};

export type OsagoRfOrderResult = {
  requestId: string;
  contactId: number;
  companyId: number;
  dealIds: number[];
};

export const UF = {
  CONTACT_GENDER: "UF_CRM_1686138296718",
  CONTACT_COUNTRY: "UF_CRM_1686138527330",
  CONTACT_PASSPORT_NUMBER: "UF_CRM_CONTACT_1686145698592",
  CONTACT_PASSPORT_ISSUER: "UF_CRM_1694347754648",
  CONTACT_PASSPORT_ISSUED_AT: "UF_CRM_1694347737519",
  CONTACT_PASSPORT_FILES: "UF_CRM_1694347572671",

  COMPANY_INN_FIELD: "UF_CRM_COMPANY_1692911328252",

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
  DEAL_DRIVER_LICENSE_FILES: "UF_CRM_1770367692339",
} as const;

export function getErrorMessage(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
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

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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

function parseVehicles(formData: FormData): VehicleInput[] {
  const vehiclesMap = new Map<number, VehicleInput>();

  function ensureVehicle(index: number): VehicleInput {
    if (!vehiclesMap.has(index)) {
      vehiclesMap.set(index, {
        techPassportFiles: [],
        driverLicenseFiles: [],
        drivers: [],
      });
    }
    return vehiclesMap.get(index)!;
  }

  function ensureDriver(v: VehicleInput, driverIndex: number): DriverInput {
    while (v.drivers.length <= driverIndex) {
      v.drivers.push({ licenseFiles: [] });
    }
    return v.drivers[driverIndex];
  }

  for (const [key, value] of formData.entries()) {
    const md = key.match(/^vehicles\[(\d+)\]\[drivers\]\[(\d+)\]\[(\w+)\]$/);
    if (md) {
      const vIndex = Number(md[1]);
      const dIndex = Number(md[2]);
      const field = md[3] as "fullName" | "experienceYears" | "licenseFiles";

      const vehicle = ensureVehicle(vIndex);
      const driver = ensureDriver(vehicle, dIndex);

      if (field === "licenseFiles") {
        if (value instanceof File && value.size > 0) {
          driver.licenseFiles.push(value);
        }
      } else {
        (driver as Record<string, unknown>)[field] = String(value).trim();
      }
      continue;
    }

    const mv = key.match(/^vehicles\[(\d+)\]\[(\w+)\]$/);
    if (!mv) continue;

    const index = Number(mv[1]);
    const field = mv[2] as keyof VehicleInput;
    const vehicle = ensureVehicle(index);

    if (field === "techPassportFiles") {
      if (value instanceof File && value.size > 0) {
        vehicle.techPassportFiles.push(value);
      }
    } else if (field === "driverLicenseFiles") {
      if (value instanceof File && value.size > 0) {
        vehicle.driverLicenseFiles.push(value);
      }
    } else if (field === "driversLimited") {
      vehicle.driversLimited = String(value) === "on";
    } else if (field === "startDate") {
      vehicle.startDate = parseDateToDDMMYYYY(String(value));
    } else {
      (vehicle as Record<string, unknown>)[field] = String(value).trim();
    }
  }

  return Array.from(vehiclesMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([, vehicle]) => vehicle);
}

function validateVehicles(vehicles: VehicleInput[]): void {
  if (!vehicles.length) {
    throw new Error("Не указано ни одного транспортного средства");
  }

  for (let i = 0; i < vehicles.length; i++) {
    const v = vehicles[i];

    if (!v.plate || !v.type || !v.startDate || !v.period) {
      throw new Error(
        `Авто #${i + 1}: заполните номер, тип, дату начала и период страхования.`
      );
    }

    if (!v.techPassportFiles.length) {
      throw new Error(`Авто #${i + 1}: прикрепите фото техпаспорта.`);
    }

    if (!v.driversLimited) continue;

    const drivers = (v.drivers || []).filter(
      (d) => String(d.fullName || "").trim() !== ""
    );

    if (drivers.length === 0) {
      throw new Error(
        `Авто #${i + 1}: при ограничении списка водителей добавьте минимум одного водителя.`
      );
    }

    for (let j = 0; j < drivers.length; j++) {
      const d = drivers[j];
      const fio = String(d.fullName || "").trim();
      const expRaw = String(d.experienceYears ?? "").trim();
      const exp = Number(expRaw);

      if (!fio) {
        throw new Error(`Авто #${i + 1}: заполните ФИО водителя #${j + 1}.`);
      }

      if (!Number.isFinite(exp) || exp < 0 || !Number.isInteger(exp)) {
        throw new Error(
          `Авто #${i + 1}: укажите корректный стаж (полных лет) для водителя #${j + 1}.`
        );
      }

      if (!d.licenseFiles || d.licenseFiles.length === 0) {
        throw new Error(`Авто #${i + 1}: загрузите фото ВУ водителя #${j + 1}.`);
      }
    }
  }
}

export function parseOsagoRfOrder(
  formData: FormData,
  req: Request
): ParsedOsagoRfOrder {
  const contactEmail = String(formData.get("contact_email") || "").trim();
  const contactFirstNameLat = String(
    formData.get("contact_firstNameLat") || ""
  ).trim();
  const contactLastNameLat = String(
    formData.get("contact_lastNameLat") || ""
  ).trim();
  const contactPhone = String(formData.get("contact_phone") || "").trim();

  if (
    !contactEmail ||
    !contactFirstNameLat ||
    !contactLastNameLat ||
    !contactPhone
  ) {
    throw new Error("Не заполнены обязательные контактные данные");
  }

  const orderIsCompany = getCheckedFlag(
    formData,
    "order-isCompany",
    "order_isCompany"
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
  if (typeof utmRaw === "string" && utmRaw) {
    try {
      utm = JSON.parse(utmRaw) as unknown;
    } catch {
      utm = undefined;
    }
  }

  const vehicles = parseVehicles(formData);
  validateVehicles(vehicles);

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
      inn: String(formData.get("company_inn") || "").trim(),
      email: String(formData.get("company_email") || "").trim(),
    },

    person: {
      middleName: String(formData.get("person_middleName") || "").trim(),
      gender: personGender,
      birthDate: parseDateISO(
        String(formData.get("person_birthDate") || "") || null
      ),
      country: String(formData.get("person_country") || "").trim(),
      address: String(formData.get("person_address") || "").trim(),
      passportNumber: String(formData.get("person_passportNumber") || "").trim(),
      passportIssuer: String(formData.get("person_passportIssuer") || "").trim(),
      passportIssuedAt: parseDateISO(
        String(formData.get("person_passportIssuedAt") || "") || null
      ),
      passportFiles: getFilesByKey(formData, "person_passportFiles"),
    },

    meta: {
      pageUrl: pageUrlRaw || undefined,
      utm,
      ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown",
      userAgent: req.headers.get("user-agent") || "unknown",
    },

    vehicles,
  };
}

async function findOrCreateContact(order: ParsedOsagoRfOrder): Promise<number> {
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
  order: ParsedOsagoRfOrder
): Promise<void> {
  if (order.orderIsCompany) return;

  const bitrix = getBitrixClient();
  const fields: Record<string, unknown> = {};

  if (order.person.middleName) fields.SECOND_NAME = order.person.middleName;
  if (order.person.birthDate) fields.BIRTHDATE = order.person.birthDate;
  if (order.person.address) fields.ADDRESS = order.person.address;

  setIfValue(fields, UF.CONTACT_GENDER, order.person.gender);
  setIfValue(fields, UF.CONTACT_COUNTRY, order.person.country);
  setIfValue(fields, UF.CONTACT_PASSPORT_NUMBER, order.person.passportNumber);
  setIfValue(fields, UF.CONTACT_PASSPORT_ISSUER, order.person.passportIssuer);
  setIfValue(fields, UF.CONTACT_PASSPORT_ISSUED_AT, order.person.passportIssuedAt);

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
  order: ParsedOsagoRfOrder
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

  if (!order.company.inn) {
    throw new Error("Отмечено 'договор на юрлицо', но не указан ИНН компании.");
  }

  const filter: Record<string, unknown> = {};
  filter[UF.COMPANY_INN_FIELD] = order.company.inn;

  const foundCompanies = await bitrix.call<Array<{ ID: string }>>(
    "crm.company.list",
    {
      filter,
      select: ["ID"],
      start: 0,
    }
  );

  const existingId = normalizeBitrixId(foundCompanies?.[0]?.ID);
  if (existingId) {
    return existingId;
  }

  const fields: Record<string, unknown> = {
    TITLE: order.company.inn,
    EMAIL: order.company.email
      ? [{ VALUE: order.company.email, VALUE_TYPE: "WORK" }]
      : [],
  };

  setIfValue(fields, UF.COMPANY_INN_FIELD, order.company.inn);

  const newCompanyId = await bitrix.call<string>("crm.company.add", { fields });
  const companyId = normalizeBitrixId(newCompanyId);

  if (!companyId) {
    throw new Error("Не удалось создать компанию в Bitrix");
  }

  return companyId;
}

function buildCommonComment(order: ParsedOsagoRfOrder): string {
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
  parts.push(`Телефон: ${order.contact.phone}`);
  parts.push(
    order.orderIsCompany
      ? `Договор на юрлицо, ИНН: ${order.company.inn}`
      : `Договор на физлицо (компания ID=1817)`
  );

  if (!order.orderIsCompany) {
    parts.push(
      [
        "Паспорт (данные):",
        `- Номер: ${order.person.passportNumber || "-"}`,
        `- Кем выдан: ${order.person.passportIssuer || "-"}`,
        `- Дата выдачи: ${order.person.passportIssuedAt || "-"}`,
        `- Файлов паспорта: ${order.person.passportFiles.length}`,
      ].join("\n")
    );
  }

  return parts.join("\n");
}

function buildDriversComment(vehicle: VehicleInput): string {
  if (!vehicle.driversLimited) return "";

  const drivers = (vehicle.drivers || []).filter(
    (d) => String(d.fullName || "").trim() !== ""
  );

  const lines: string[] = [];
  lines.push("Водители (ограниченный список):");

  for (let i = 0; i < drivers.length; i++) {
    const d = drivers[i];
    lines.push(
      `${i + 1}) ${String(d.fullName || "").trim()} — стаж ${String(
        d.experienceYears || ""
      ).trim()} полных лет`
    );
  }

  return lines.join("\n") + "\n\n";
}

async function createDeals(args: {
  order: ParsedOsagoRfOrder;
  contactId: number;
  companyId: number;
}): Promise<number[]> {
  const { order, contactId, companyId } = args;
  const bitrix = getBitrixClient();
  const commonComment = buildCommonComment(order);
  const createdDeals: number[] = [];

  for (const vehicle of order.vehicles) {
    const drivers = (vehicle.drivers || []).filter(
      (d) => String(d.fullName || "").trim() !== ""
    );

    const dealFields: Record<string, unknown> = {
      TITLE: `Заявка ОСАГО РФ: ${vehicle.plate || "ТС"}`,
      CONTACT_ID: contactId,
      COMPANY_ID: companyId,
      COMMENTS: buildDriversComment(vehicle) + commonComment,
    };

    setIfValue(dealFields, UF.DEAL_TYP_INSURANCE, 425);
    setIfValue(dealFields, UF.DEAL_INSURANCE_TERRITORY, 1097);
    setIfValue(dealFields, UF.DEAL_AGRIGATION, 1169);
    setIfValue(dealFields, UF.DEAL_AGENT, 3907);
    setIfValue(dealFields, UF.DEAL_VEHICLE_COUNTRY, 385);
    setIfValue(dealFields, UF.DEAL_VEHICLE_PLATE, vehicle.plate || null);
    setIfValue(dealFields, UF.DEAL_VEHICLE_TYPE, vehicle.type || null);
    setIfValue(dealFields, UF.DEAL_START_DATE, vehicle.startDate || null);
    setIfValue(dealFields, UF.DEAL_PERIOD, vehicle.period || null);

    if (UF.DEAL_FILES && vehicle.techPassportFiles.length > 0) {
      dealFields[UF.DEAL_FILES] = await filesToBitrixFileField(
        vehicle.techPassportFiles
      );
    }

    if (UF.DEAL_DRIVER_LICENSE_FILES && vehicle.driversLimited) {
      const licenseFiles: File[] = [
        ...(vehicle.driverLicenseFiles ?? []),
        ...drivers.flatMap((d) => d.licenseFiles ?? []),
      ].filter((f) => f instanceof File && f.size > 0);

      if (licenseFiles.length > 0) {
        dealFields[UF.DEAL_DRIVER_LICENSE_FILES] =
          await filesToBitrixFileField(licenseFiles);
      }
    }

    const dealIdRaw = await bitrix.call<string>("crm.deal.add", {
      fields: dealFields,
    });

    const dealId = normalizeBitrixId(dealIdRaw);
    if (!dealId) {
      throw new Error(`Не удалось создать сделку для авто ${vehicle.plate || "-"}`);
    }

    createdDeals.push(dealId);
  }

  return createdDeals;
}

function buildVehicleMail(args: {
  order: ParsedOsagoRfOrder;
  vehicle: VehicleInput;
  dealId: number;
  index: number;
  total: number;
  contactId: number;
  companyId: number;
}) {
  const { order, vehicle, dealId, index, total, contactId, companyId } = args;

  const drivers = (vehicle.drivers || []).filter(
    (d) => String(d.fullName || "").trim() !== ""
  );

  const subject = `ОСАГО РФ нерезов - ДИОНИС - новая заявка (сделка #${dealId}) - ${
    vehicle.plate || "ТС"
  }`;

  const driverTextLines = vehicle.driversLimited
    ? [
        "",
        "Водители (ограниченный список):",
        ...drivers.map(
          (d, idx) =>
            `${idx + 1}) ${String(d.fullName || "").trim()} — стаж ${String(
              d.experienceYears || ""
            ).trim()} полных лет`
        ),
        `Файлов ВУ (всего): ${drivers.reduce(
          (acc, d) => acc + (d.licenseFiles?.length ?? 0),
          0
        )}`,
      ]
    : [];

  const text = [
    `Request ID: ${order.requestId}`,
    `Сделка: #${dealId}`,
    `Авто #${index + 1} из ${total}`,
    "",
    `Контакт: ${order.contact.firstNameLat} ${order.contact.lastNameLat}`,
    `Email: ${order.contact.email}`,
    `Телефон: ${order.contact.phone}`,
    order.orderIsCompany
      ? `Юрлицо (ИНН): ${order.company.inn}`
      : `Физлицо (компания ID=1817)`,
    `Company ID: ${companyId}`,
    `Contact ID: ${contactId}`,
    !order.orderIsCompany
      ? `Файлов личного паспорта: ${order.person.passportFiles.length}`
      : "",
    "",
    "Данные авто:",
    `- Номер: ${vehicle.plate || "-"}`,
    `- Тип: ${vehicle.type || "-"}`,
    `- Страна (значение справочника): ${vehicle.country || "-"}`,
    `- Дата начала: ${vehicle.startDate || "-"}`,
    `- Период: ${vehicle.period || "-"}`,
    `- Файлов техпаспорта: ${vehicle.techPassportFiles.length}`,
    ...driverTextLines,
    "",
    "---",
    `Страница: ${order.meta.pageUrl || "unknown"}`,
    `UTM: ${order.meta.utm ? safeJsonStringify(order.meta.utm) : "none"}`,
    `IP: ${order.meta.ip}`,
    `User-Agent: ${order.meta.userAgent}`,
  ]
    .filter(Boolean)
    .join("\n");

  const driversHtml = vehicle.driversLimited
    ? `
      <div style="margin-top: 12px; padding: 12px; border: 1px solid #eee; border-radius: 8px;">
        <h3 style="margin: 0 0 8px; font-size: 14px;">Водители (ограниченный список)</h3>
        <div style="font-size: 13px; color: #333;">
          ${
            drivers.length
              ? drivers
                  .map(
                    (d, idx) =>
                      `${idx + 1}) <strong>${escapeHtml(
                        String(d.fullName || "").trim()
                      )}</strong> — стаж ${escapeHtml(
                        String(d.experienceYears || "").trim()
                      )} полных лет`
                  )
                  .join("<br>")
              : "—"
          }
        </div>
      </div>
    `
    : "";

  const personPassportHtml = !order.orderIsCompany
    ? `
      <div style="margin-top: 12px; padding: 12px; border: 1px solid #eee; border-radius: 8px;">
        <h3 style="margin: 0 0 8px; font-size: 14px;">Паспорт страхователя</h3>
        <div style="font-size: 13px; color: #333;">
          Номер: <strong>${escapeHtml(order.person.passportNumber || "-")}</strong><br>
          Кем выдан: ${escapeHtml(order.person.passportIssuer || "-")}<br>
          Дата выдачи: ${escapeHtml(order.person.passportIssuedAt || "-")}<br>
          Файлов паспорта: ${escapeHtml(String(order.person.passportFiles.length))}
        </div>
      </div>
    `
    : "";

  const html = `
    <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <img
        src="https://dionis-insurance.kz/logo_1.webp"
        width="56"
        height="56"
        alt="Dionis Insurance"
        style="display:block; border:0; outline:none; text-decoration:none;"
      >
      <h2 style="font-size: 18px; color: #C19A6B; margin: 0 0 20px;">
        Новая заявка на ОСАГО РФ нерезов с сайта DIONIS Insurance
      </h2>

      <p style="font-size: 14px; line-height: 1.6; color: #707070; margin: 0 0 20px;">
        <strong>Request ID:</strong> ${escapeHtml(order.requestId)}<br>
        <strong>Сделка:</strong> #${escapeHtml(String(dealId))}<br>
        <strong>Авто:</strong> ${escapeHtml(String(index + 1))} из ${escapeHtml(
          String(total)
        )}
      </p>

      <div style="margin-top: 12px; padding: 12px; border: 1px solid #eee; border-radius: 8px;">
        <h3 style="margin: 0 0 8px; font-size: 14px;">Контакт</h3>
        <div style="font-size: 13px; color: #333;">
          <strong>${escapeHtml(order.contact.firstNameLat)} ${escapeHtml(
    order.contact.lastNameLat
  )}</strong><br>
          Email: ${escapeHtml(order.contact.email)}<br>
          Телефон: ${escapeHtml(order.contact.phone)}<br>
          ${
            order.orderIsCompany
              ? `ИНН: <strong>${escapeHtml(order.company.inn)}</strong><br>`
              : `Договор на физлицо (компания ID=1817)<br>`
          }
          Contact ID: ${escapeHtml(String(contactId))}<br>
          Company ID: ${escapeHtml(String(companyId))}
        </div>
      </div>

      ${personPassportHtml}

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

      ${driversHtml}

      <div style="margin-top: 12px; font-size: 12px; color: #666;">
        <h3 style="margin: 0 0 8px; font-size: 14px; color: #111;">Мета</h3>
        Страница: ${escapeHtml(order.meta.pageUrl || "unknown")}<br>
        UTM: ${escapeHtml(order.meta.utm ? safeJsonStringify(order.meta.utm) : "none")}<br>
        IP: ${escapeHtml(order.meta.ip)}<br>
        User-Agent: ${escapeHtml(order.meta.userAgent)}
      </div>
    </div>
  `;

  return { subject, text, html };
}

function sendVehicleEmails(args: {
  order: ParsedOsagoRfOrder;
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

    const { subject, text, html } = buildVehicleMail({
      order,
      vehicle,
      dealId,
      index: i,
      total: order.vehicles.length,
      contactId,
      companyId,
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

export async function processOsagoRfOrder(
  order: ParsedOsagoRfOrder
): Promise<OsagoRfOrderResult> {
  const contactId = await findOrCreateContact(order);
  await updateContactIfNeeded(contactId, order);
  const companyId = await resolveCompanyId(contactId, order);
  const dealIds = await createDeals({ order, contactId, companyId });

  sendVehicleEmails({
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