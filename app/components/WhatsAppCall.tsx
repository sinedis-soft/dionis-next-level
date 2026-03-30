// app/components/WhatsAppCall.tsx
"use client";

import React, { useId, useState, type FormEvent } from "react";
import type { WhatsAppCallDictionary } from "@/dictionaries/whatsappcall";
import { RecaptchaLazy } from "@/components/RecaptchaLazy";
import { getRecaptchaToken } from "@/lib/recaptcha";

type Props = { dict: WhatsAppCallDictionary };

type FormStatus = "idle" | "loading" | "success" | "error";

function formatName(raw: string): string {
  return raw.replace(/[^A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s'-]/g, "");
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits ? "+" + digits : "";
}

export function WhatsAppCall({ dict }: Props) {
  const uid = useId();

  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formMessage, setFormMessage] = useState("");
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  const isBusy = formStatus === "loading";
  const hasError = formStatus === "error";
  const hasSuccess = formStatus === "success";

  const recaptchaSiteKey =
    (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "").trim();
  const recaptchaEnabled = Boolean(recaptchaSiteKey);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isBusy) return;

    const formEl = e.currentTarget;

    setFormStatus("loading");
    setFormMessage("");

    try {
      const fd = new FormData(formEl);

      try {
        fd.set("pageUrl", window.location.href);

        const utm = localStorage.getItem("utm_data");
        if (utm) fd.set("utm", utm);
      } catch {
        // ignore
      }

      if (recaptchaEnabled) {
        const token = await getRecaptchaToken(
          recaptchaSiteKey,
          "whatsapp_call"
        );

        if (!token) {
          setFormStatus("error");
          setFormMessage("Не удалось подтвердить, что вы не робот.");
          return;
        }

        fd.set("recaptchaToken", token);
      }

      const res = await fetch("/api/whatsapp-call", {
        method: "POST",
        body: fd,
      });

      const data: unknown = await res.json().catch(() => null);
      const ok = Boolean((data as { ok?: boolean } | null)?.ok);
      const message = (data as { message?: string } | null)?.message;

      if (!res.ok || !ok) {
        setFormStatus("error");
        setFormMessage(message || dict.errorMessage);
        return;
      }

      setFormStatus("success");
      setFormMessage(message || dict.successMessage);
      setName("");
      setWhatsapp("");
      formEl.reset();
    } catch (error) {
      console.error("WHATSAPP CALL FORM ERROR:", error);
      setFormStatus("error");
      setFormMessage(dict.errorMessage);
    }
  }

  return (
    <div className="gc-form">
      <div className="card card--pad">
        <div className="gc-form__head">
          <h2 className="gc-form__title">{dict.title}</h2>
          <p className="gc-form__intro">{dict.intro}</p>
        </div>

        <RecaptchaLazy
          siteKey={recaptchaSiteKey}
          enabled={recaptchaEnabled}
          onReady={() => setRecaptchaReady(true)}
        />

        <form className="gc-form__inner" onSubmit={handleSubmit}>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            style={{ display: "none" }}
            aria-hidden="true"
          />
          <input
            type="hidden"
            name="context"
            value="WhatsApp consultation request"
          />

          <div className="gc-block">
            <div className="grid grid-2">
              <div className="field">
                <label htmlFor={`${uid}-name`} className="lbl">
                  {dict.contact.name}
                  <span className="req" aria-hidden="true">
                    {" "}
                    *
                  </span>
                </label>
                <input
                  id={`${uid}-name`}
                  type="text"
                  name="name"
                  className="control"
                  value={name}
                  onChange={(e) => setName(formatName(e.target.value))}
                  required
                  disabled={isBusy}
                  autoComplete="name"
                  placeholder={dict.contact.namePlaceholder}
                />
              </div>

              <div className="field">
                <label htmlFor={`${uid}-whatsapp`} className="lbl">
                  {dict.contact.whatsapp}
                  <span className="req" aria-hidden="true">
                    {" "}
                    *
                  </span>
                </label>
                <input
                  id={`${uid}-whatsapp`}
                  type="tel"
                  name="whatsapp"
                  className="control"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(formatPhone(e.target.value))}
                  required
                  disabled={isBusy}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder={dict.contact.whatsappPlaceholder}
                />
              </div>
            </div>

            {formStatus !== "idle" && (
              <div
                role="status"
                aria-live="polite"
                className={
                  hasSuccess
                    ? "status status--ok"
                    : hasError
                      ? "status status--err"
                      : "status"
                }
              >
                {formStatus === "loading" ? dict.loadingMessage : formMessage}
              </div>
            )}

            {recaptchaEnabled && (
              <p className="hint" style={{ marginTop: 12 }}>
                Защита от ботов включена
                {recaptchaReady ? "" : " (загружается)"}.
              </p>
            )}

            <div className="row-between u-mt-4">
              <span />
              <button
                type="submit"
                className={["btn btn-primary", isBusy ? "is-disabled" : ""].join(" ")}
                disabled={isBusy}
              >
                {isBusy ? dict.loadingButton : dict.submit}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}