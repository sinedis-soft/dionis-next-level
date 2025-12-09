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
          context?: string;
          utm?: Record<string, string>;
          pageUrl?: string;
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
        const { context, pageUrl, utm } = body;

        const metaInfo =
          `\n\n---\nИсточник: Форма обратной связи DIONIS\n` +
          `Страница: ${pageUrl || "unknown"}\n` +
          `Контекст: ${context || "n/a"}\n` +
          `UTM: ${utm ? JSON.stringify(utm) : "none"}\n` +
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
        <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <img width="60" src="https://cdn.bitrix24.pl/b25731489/landing/2f7/2f7cc21689b3f2b0ca28a528026e2f87/dionis_logo_16_02_2023_1x.png" alt="ДИОНИС" style="display: block; margin-bottom: 20px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 18px; color: #C19A6B; margin: 0 0 20px;">Новое сообщение с сайта DIONIS Insurance</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #707070; margin: 0 0 20px;">
            <strong>Имя:</strong> ${firstName}<br>
            <strong>Фамилия:</strong> ${lastName}<br>
                <strong>E-mail:</strong> ${email}<br>
                <strong>Телефон:</strong> ${phone}<br>
                <strong>Комментарий:</strong><br>${comment.replace(/\n/g, "<br>")}<br>
                ${pageUrl || "unknown"}<br>





          </p>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 18px; color: #C19A6B; margin: 0 0 20px;">С уважением, Денис БОРОВОЙ</h2>
        <span style="color: #707070;">директор<br>
        <a href="http://dionis-insurance.kz" target="_blank" style="color: #C19A6B; text-decoration: none;">ТОО страховой брокер ДИОНИС</a> </span>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tbody>
          <tr>
            <td style="padding: 10px; text-align: left; border-bottom: 1px solid #F2F2F2;">
        <img width="200" src="https://cdn.bitrix24.pl/b25731489/landing/2f7/2f7cc21689b3f2b0ca28a528026e2f87/dionis_logo_16_02_2023_1x.png" alt="ДИОНИС" style="display: block;">
            </td>
            <td style="padding: 10px; text-align: left; border-bottom: 1px solid #F2F2F2;">
        <a href="tel:+375447030303" style="color: #C19A6B; text-decoration: none;">+375 44 703 0303</a><br>
        <a href="mailto:info@dionis-insurance.kz" style="color: #C19A6B; text-decoration: none;">info@dionis-insurance.kz</a><br>
        <a href="https://api.whatsapp.com/send/?phone=%2B375447030303" target="_blank" style="color: #C19A6B; text-decoration: none;">WhatsApp</a><br>
        <a href="https://t.me/Denisins" target="_blank" style="color: #C19A6B; text-decoration: none;">Telegram</a><br>
        <a href="http://viber://chat?number=%2B375447030303" target="_blank" style="color: #C19A6B; text-decoration: none;">Viber</a>
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