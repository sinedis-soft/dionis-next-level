import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
        firstName,
        lastName,
        email,
        phone,
        comment,
        agree,
        website,          // honeypot
        recaptchaToken,   // reCAPTCHA v3
    } = body as {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        comment: string;
        agree: boolean;
        website?: string;
        recaptchaToken?: string;
    };


    if (!firstName || !lastName || !email || !phone || !comment || !agree) {
      return new Response(
        JSON.stringify({ ok: false, message: "Заполните все обязательные поля" }),
        { status: 400 }
      );
    }

    // Если honeypot заполнен — молча считаем, что всё ок (бот)
    if (website && website.trim() !== "") {
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }


    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const isProd = process.env.NODE_ENV === "production";

    if (isProd && recaptchaSecret && recaptchaToken) {
    try {
        const verifyRes = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            },
            body:
            `secret=${encodeURIComponent(recaptchaSecret)}` +
            `&response=${encodeURIComponent(recaptchaToken)}`,
        }
        );

        const verifyData = await verifyRes.json();
        console.log("reCAPTCHA verify:", verifyData); // можно оставить для контроля на проде

        if (
        !verifyData.success ||
        (typeof verifyData.score === "number" && verifyData.score < 0.3)
        ) {
        return new Response(
            JSON.stringify({
            ok: false,
            message: "Подтвердите, что вы не робот.",
            }),
            { status: 400 }
        );
        }
    } catch (e) {
        console.error("reCAPTCHA verification error:", e);
        // при ошибке reCAPTCHA можно либо блокировать, либо пропускать — тут пропускаем
    }
    }


    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

        const userAgent = req.headers.get("user-agent") || "unknown";

        const metaInfo =
        `\n\n---\nИсточник: Форма обратной связи DIONIS /ru\n` +
        `IP: ${ip}\n` +
        `User-Agent: ${userAgent}\n`;




    // ------------ 1) Создание лида в Bitrix24 -----------------
    const bitrixBase = process.env.BITRIX_WEBHOOK_URL;
    if (!bitrixBase) {
      console.error("BITRIX_WEBHOOK_URL is not set");
    } else {
      const bitrixUrl = `${bitrixBase}/crm.lead.add.json`;

      const bitrixPayload = {
        fields: {
            TITLE: `Сообщение с сайта DIONIS: ${firstName} ${lastName}`,
            NAME: firstName,
            LAST_NAME: lastName,
            PHONE: [{ VALUE: phone, VALUE_TYPE: "WORK" }],
            EMAIL: [{ VALUE: email, VALUE_TYPE: "WORK" }],
            COMMENTS: `${comment}${metaInfo}`,   // ← добавили метаинфо
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

    // ------------ 2) Отправка письма на info@ibb.expert --------
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

      const subject = "Новое сообщение с сайта DIONIS Insurance";

      const text = [
        `Имя: ${firstName}`,
        `Фамилия: ${lastName}`,
        `E-mail: ${email}`,
        `Телефон: ${phone}`,
        "",
        "Комментарий:",
        comment,
      ].join("\n");

      const html = `
        <h2>Новое сообщение с сайта DIONIS Insurance</h2>
        <p><strong>Имя:</strong> ${firstName}</p>
        <p><strong>Фамилия:</strong> ${lastName}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Комментарий:</strong><br>${comment.replace(/\n/g, "<br>")}</p>
      `;

      try {
        await transporter.sendMail({
          from,
          to,
          subject,
          text,
          html,
        });
      } catch (e) {
        console.error("Mail send error:", e);
      }
    } else {
      console.error("Mail env vars are not fully set");
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ ok: false, message: "Ошибка на сервере" }),
      { status: 500 }
    );
  }
}