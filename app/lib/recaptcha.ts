// lib/recaptcha.ts

/* ------------------------------------------------ */
/* CLIENT: получение токена reCAPTCHA               */
/* ------------------------------------------------ */

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

export async function getRecaptchaToken(
  siteKey: string,
  action: string
): Promise<string> {
  if (typeof window === "undefined") {
    throw new Error("getRecaptchaToken must be called in browser");
  }

  if (!siteKey.trim()) {
    throw new Error("reCAPTCHA site key missing");
  }

  if (!action.trim()) {
    throw new Error("reCAPTCHA action missing");
  }

  const api = window.grecaptcha;

  if (!api) {
    throw new Error("reCAPTCHA script not loaded");
  }

  return new Promise<string>((resolve, reject) => {
    api.ready(() => {
      api.execute(siteKey, { action }).then(resolve).catch(reject);
    });
  });
}

/* ------------------------------------------------ */
/* SERVER: проверка токена                          */
/* ------------------------------------------------ */

export type RecaptchaVerifyOptions = {
  isProd: boolean;
  token: string | null;
  minScore?: number;
  expectedHostnames?: string[];
  expectedAction?: string;
};

export type RecaptchaVerifyResult = {
  ok: boolean;
  reason?: string;
};

export async function verifyRecaptchaIfNeeded(
  options: RecaptchaVerifyOptions
): Promise<RecaptchaVerifyResult> {
  const {
    isProd,
    token,
    minScore = 0.5,
    expectedHostnames,
    expectedAction,
  } = options;

  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!isProd) {
    return { ok: true };
  }

  if (!secret) {
    console.error("reCAPTCHA: secret key not set");
    return { ok: false, reason: "secret_missing" };
  }

  if (!token) {
    return { ok: false, reason: "token_missing" };
  }

  try {
    const res = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
          `secret=${encodeURIComponent(secret)}` +
          `&response=${encodeURIComponent(token)}`,
      }
    );

    if (!res.ok) {
      console.error("reCAPTCHA http error", res.status);
      return { ok: false, reason: "verify_http_error" };
    }

    const data = (await res.json()) as {
      success?: boolean;
      score?: number;
      hostname?: string;
      action?: string;
      "error-codes"?: string[];
    };

    if (!data.success) {
      console.error("reCAPTCHA verify failed", data["error-codes"]);
      return { ok: false, reason: "not_success" };
    }

    if (expectedHostnames?.length) {
      const host = String(data.hostname || "").toLowerCase();

      const ok = expectedHostnames.some(
        (h) => h.toLowerCase() === host
      );

      if (!ok) {
        return { ok: false, reason: `bad_hostname_${host}` };
      }
    }

    if (expectedAction) {
      const action = String(data.action || "");
      if (action !== expectedAction) {
        return { ok: false, reason: `bad_action_${action}` };
      }
    }

    if (typeof data.score === "number" && data.score < minScore) {
      return { ok: false, reason: `low_score_${data.score}` };
    }

    return { ok: true };
  } catch (error) {
    console.error("reCAPTCHA verify exception", error);
    return { ok: false, reason: "verify_exception" };
  }
}