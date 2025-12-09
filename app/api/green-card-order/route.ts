// app/api/green-card-order/route.ts
import { Buffer } from "buffer";

export const runtime = "nodejs"; // важно: нужен node, не edge

const BITRIX_BASE = process.env.BITRIX_WEBHOOK_URL;

// задержка
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// универсальный вызов Bitrix с retry + timeout + mandatory delay
async function bitrix(method: string, payload: any, attempt = 1): Promise<any> {
  if (!BITRIX_BASE) {
    throw new Error("BITRIX_WEBHOOK_URL is not set");
  }

  const MAX_ATTEMPTS = 3;

  // обязательная пауза (Bitrix иначе режет соединение)
  await sleep(1500);

  // тайм-аут на сам запрос (иногда Bitrix молчит 20+ секунд)
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

    let data: any;

    try {
      data = await res.json();
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

    return data.result;
  } catch (err: any) {
    clearTimeout(timeoutId);

    // === RETRY BLOCK ===
    if (attempt < MAX_ATTEMPTS) {
      console.warn(
        `Bitrix ${method} failed on attempt ${attempt}, retrying...`,
        err?.message || err
      );

      // дополнительная задержка перед новой попыткой
      await sleep(1500 * attempt);

      return bitrix(method, payload, attempt + 1);
    }

    // после 3 попыток — окончательная ошибка
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

// конвертация File → [filename, base64] для fileData
async function fileToBitrixFileData(file: File): Promise<[string, string]> {
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  return [file.name, base64];
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // --- 1. Контакты и базовые данные ---
    const contact_email = String(formData.get("contact_email") || "").trim();
    const contact_firstNameLat = String(
      formData.get("contact_firstNameLat") || ""
    ).trim();
    const contact_lastNameLat = String(
      formData.get("contact_lastNameLat") || ""
    ).trim();
    const contact_phone = String(formData.get("contact_phone") || "").trim();

    if (!contact_email || !contact_firstNameLat || !contact_lastNameLat) {
      return new Response(
        JSON.stringify({
          ok: false,
          message: "Не заполнены обязательные контактные данные",
        }),
        { status: 400 }
      );
    }

    const order_isCompany =
      String(formData.get("order-isCompany") || "") === "on";

    const company_bin = String(formData.get("company_bin") || "").trim();
    const company_email = String(formData.get("company_email") || "").trim();

    const insurance_territory = String(
      formData.get("insurance_territory") || ""
    ).trim();

    // UTM и URL страницы (если переданы)
    const pageUrlRaw = String(formData.get("pageUrl") || "").trim();
    const pageUrl = pageUrlRaw || undefined;

    let utm: any = undefined;
    const utmRaw = formData.get("utm");
    if (typeof utmRaw === "string" && utmRaw) {
      try {
        utm = JSON.parse(utmRaw);
      } catch {
        utm = undefined;
      }
    }

    // --- 2. Парсим транспортные средства ---
    type VehicleInput = {
      plate?: string;
      techPassportNumber?: string;
      type?: string;
      country?: string;
      startDate?: string | null;
      period?: string;
      files: File[];
      techPassportFiles?: File[];
    };

    const vehiclesMap = new Map<number, VehicleInput>();

    for (const [key, value] of formData.entries()) {
      const m = key.match(/^vehicles\[(\d+)\]\[(\w+)\]$/);
      if (!m) continue;

      const index = Number(m[1]);
      const field = m[2] as keyof VehicleInput;

      if (!vehiclesMap.has(index)) {
        vehiclesMap.set(index, { files: [] });
      }

      const v = vehiclesMap.get(index)!;

      if (field === "techPassportFiles") {
        if (value instanceof File && value.size > 0) {
          v.files.push(value);
        }
      } else if (field === "startDate") {
        v.startDate = parseDateToDDMMYYYY(String(value));
      } else {
        (v as any)[field] = String(value);
      }
    }

    const vehicles = Array.from(vehiclesMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([, v]) => v);

    if (!vehicles.length) {
      return new Response(
        JSON.stringify({
          ok: false,
          message: "Не указано ни одного транспортного средства",
        }),
        { status: 400 }
      );
    }

    // --- 3. Контакт: поиск по EMAIL, либо создание ---
    let contactId: number | null = null;

    const foundContacts = await bitrix("crm.contact.list", {
      filter: { "EMAIL": contact_email },
      select: ["ID"],
      start: 0,
    });

    if (Array.isArray(foundContacts) && foundContacts.length > 0) {
      contactId = Number(foundContacts[0].ID);
    } else {
      const newContactId = await bitrix("crm.contact.add", {
        fields: {
          NAME: contact_firstNameLat,
          LAST_NAME: contact_lastNameLat,
          PHONE: contact_phone
            ? [{ VALUE: contact_phone, VALUE_TYPE: "WORK" }]
            : [],
          EMAIL: [{ VALUE: contact_email, VALUE_TYPE: "WORK" }],
        },
      });
      contactId = Number(newContactId);
    }

    if (!contactId || Number.isNaN(contactId)) {
        throw new Error("Не удалось определить ID контакта (search/add)");
    }

    // --- 4. Компания: либо по UF_CRM_COMPANY_1692911328252, либо фикс ID=1817 ---
    let companyId: number;

    if (order_isCompany) {
      if (!company_bin) {
        return new Response(
          JSON.stringify({
            ok: false,
            message:
              "Отмечено 'договор на юрлицо', но не указан БИН компании.",
          }),
          { status: 400 }
        );
      }

      const foundCompanies = await bitrix("crm.company.list", {
        filter: { "UF_CRM_COMPANY_1692911328252": company_bin },
        select: ["ID"],
        start: 0,
      });

      if (Array.isArray(foundCompanies) && foundCompanies.length > 0) {
        companyId = Number(foundCompanies[0].ID);
      } else {
        const newCompanyId = await bitrix("crm.company.add", {
          fields: {
            TITLE: company_bin,
            UF_CRM_COMPANY_1692911328252: company_bin,
            EMAIL: company_email
              ? [{ VALUE: company_email, VALUE_TYPE: "WORK" }]
              : [],
          },
        });
        companyId = Number(newCompanyId);
      }
    } else {
      companyId = 1817;

      // обновляем контакт, чтобы подвязать к фиксированной компании
      await bitrix("crm.contact.update", {
        id: contactId,
        fields: {
          COMPANY_ID: companyId,
        },
      });
    }

    // --- 5. Сделки по каждому авто ---
    const createdDeals: number[] = [];

    // для COMMENTS можно собрать общую информацию (utm, url, базовые данные)
    const commonCommentParts: string[] = [];

    if (pageUrl) {
      commonCommentParts.push(`Страница: ${pageUrl}`);
    }
    if (utm) {
      commonCommentParts.push(`UTM: ${JSON.stringify(utm)}`);
    }
    commonCommentParts.push(
      `Контакт: ${contact_firstNameLat} ${contact_lastNameLat} <${contact_email}>`
    );
    if (contact_phone) {
      commonCommentParts.push(`Телефон: ${contact_phone}`);
    }
    if (order_isCompany) {
      commonCommentParts.push(`Договор на юрлицо, БИН: ${company_bin}`);
    } else {
      commonCommentParts.push(`Договор на физлицо (компания ID=1817)`);
    }

    const commonComment = commonCommentParts.join("\n");

    for (const vehicle of vehicles) {
      const dealFields: any = {
        TITLE: `Заявка Green Card: ${vehicle.plate || "ТС"}`,
        CONTACT_ID: contactId,
        COMPANY_ID: companyId,

        // страна регистрации ТС
        UF_CRM_1686152306664: vehicle.country || null,

        // госномер
        UF_CRM_1686152485641: vehicle.plate || null,

        // серия и номер техпаспорта
        UF_CRM_1686152429219: vehicle.techPassportNumber || null,

        // тип ТС
        UF_CRM_1686152567597: vehicle.type || null,

        // срок страхования
        UF_CRM_1686152209741: vehicle.period || null,

        // начало действия (DD.MM.YYYY)
        UF_CRM_1686152149204: vehicle.startDate || null,

        // фиксированные значения
        UF_CRM_1690539097: 429,
        UF_CRM_1700656576088: insurance_territory || null,
        UF_CRM_1693578066803: 1169,
        UF_CRM_1686682902533: 3907,

        COMMENTS: commonComment,
      };

      // файлы техпаспорта → UF_CRM_1686154280439 как массив fileData
      if (vehicle.files && vehicle.files.length > 0) {
        const filesData = await Promise.all(
          vehicle.files.map((f) => fileToBitrixFileData(f))
        );

        dealFields.UF_CRM_1686154280439 = filesData.map((fd) => ({
          fileData: fd,
        }));
      }

      const dealId = await bitrix("crm.deal.add", { fields: dealFields });
      createdDeals.push(Number(dealId));
    }

    return new Response(
      JSON.stringify({
        ok: true,
        deals: createdDeals,
        contactId,
        companyId,
      }),
      { status: 200 }
    );
  } catch (e: any) {
    console.error("GREEN CARD ORDER API ERROR:", e);
    return new Response(
      JSON.stringify({
        ok: false,
        message: "Ошибка при обработке заявки Green Card",
        error: e?.message,
      }),
      { status: 500 }
    );
  }
}
