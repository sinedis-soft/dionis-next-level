// app/api/osago-rf-order/route.ts
import {
  getErrorMessage,
  parseOsagoRfOrder,
  processOsagoRfOrder,
} from "@/lib/osago-rf-order";
import { verifyRecaptchaIfNeeded } from "@/lib/recaptcha";

export const runtime = "nodejs";

export async function POST(req: Request): Promise<Response> {
  try {
    const formData = await req.formData();

    const website = String(formData.get("website") || "").trim();
    if (website) {
      return Response.json({ ok: true }, { status: 200 });
    }

    const isProd = process.env.NODE_ENV === "production";
    const recaptchaToken =
      String(formData.get("recaptchaToken") || "").trim() || null;

    const recaptcha = await verifyRecaptchaIfNeeded({
      isProd,
      token: recaptchaToken,
      minScore: 0.3,
      expectedHostnames: ["dionis-insurance.kz", "www.dionis-insurance.kz"],
      expectedAction: "osago_rf_order",
    });

    /* if (!recaptcha.ok) {
      return Response.json(
        {
          ok: false,
          message: "Подтвердите, что вы не робот.",
          reason: recaptcha.reason,
        },
        { status: 400 }
      );
    }*/

    let order;
    try {
      order = parseOsagoRfOrder(formData, req);
    } catch (error) {
      return Response.json(
        {
          ok: false,
          message: getErrorMessage(error),
        },
        { status: 400 }
      );
    }

    const result = await processOsagoRfOrder(order);

    return Response.json(
      {
        ok: true,
        requestId: result.requestId,
        deals: result.dealIds,
        contactId: result.contactId,
        companyId: result.companyId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("OSAGO RF ORDER API ERROR:", error);

    return Response.json(
      {
        ok: false,
        message: "Ошибка при обработке заявки ОСАГО РФ",
        error: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}