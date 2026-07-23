"use client";

import React, { useId, useMemo, useState } from "react";
import { RecaptchaLazy } from "@/components/RecaptchaLazy";
import { getRecaptchaSiteKey, getRecaptchaToken } from "@/lib/recaptcha";

type Variant = "conditions" | "compare" | "question";

type Props = {
  // контекст для аналитики/CRM (можно не передавать)
  articleSlug?: string;
  blockId?: string; // например "franshiza" или "isklyucheniya"

  variant?: Variant;

  // тексты (если не передашь — будут дефолты по variant)
  title?: string;
  text?: string;
  button?: string;

  // режим: просто ссылка или встроенная форма
  mode?: "reveal-form" | "link";
  href?: string; // для mode="link"

  className?: string;
};

const DEFAULTS: Record<Variant, { title: string; text: string; button: string }> =
  {
    conditions: {
      title: "Проверим условия для вашей ситуации",
      text: "Коротко посмотрим риски, исключения и франшизу — без навязывания.",
      button: "Проверить условия",
    },
    compare: {
      title: "Сравним 2–3 предложения",
      text: "Сравнение на одинаковых условиях, чтобы не было «сюрпризов».",
      button: "Сравнить предложения",
    },
    question: {
      title: "Есть вопрос по этому месту?",
      text: "Опишите ситуацию — ответим по делу, без звонков и скриптов.",
      button: "Задать вопрос",
    },
  };

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export default function InlineCta({
  articleSlug,
  blockId,
  variant = "conditions",
  title,
  text,
  button,
  mode = "reveal-form",
  href,
  className,
}: Props) {
  const uid = useId();
  const copy = DEFAULTS[variant];

  const uiTitle = title ?? copy.title;
  const uiText = text ?? copy.text;
  const uiButton = button ?? copy.button;

  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const recaptchaSiteKey = getRecaptchaSiteKey();
  const recaptchaEnabled = Boolean(recaptchaSiteKey);

  const payloadMeta = useMemo(
    () => ({
      articleSlug: articleSlug ?? "",
      blockId: blockId ?? "",
      variant,
      source: "inline-cta",
    }),
    [articleSlug, blockId, variant]
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);

    try {
      const recaptchaToken = recaptchaEnabled
        ? await getRecaptchaToken(recaptchaSiteKey, "lead_inline_cta")
        : undefined;

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          contact: contact.trim(),
          meta: payloadMeta,
          recaptchaToken,
        }),
      });

      if (!res.ok) throw new Error("Lead API error");

      setSent(true);
      setMessage("");
      setContact("");
    } catch {
      // ❗Если API ещё не сделал — временно не ломаем UX
      alert("Не удалось отправить. Попробуйте позже или напишите через контакты.");
    } finally {
      setSending(false);
    }
  }

  // mode="link" — без формы, просто ведём на страницу/якорь
  const isLink = mode === "link" && typeof href === "string" && href.length > 0;

  return (
    <section
      className={cx(
        "u-my-6 u-rounded-2xl u-border u-border-slate-200 u-bg-slate-50 u-p-4 u-shadow-sm",
        // Hover/Focus state: очень мягкий
        "transition-colors u-hover-bg-slate-100 u-focus-within-bg-slate-100",
        className
      )}
      data-article-slug={articleSlug}
      data-block-id={blockId}
      data-variant={variant}
    >
      <div className="u-flex u-items-start u-gap-3">
        <div
          aria-hidden="true"
          className="u-mt-0-5 u-grid u-h-9 u-w-9 u-place-items-center u-rounded-xl u-border u-border-slate-200 u-bg-white"
        >
          {/* спокойная иконка */}
          <span className="u-text-base">💬</span>
        </div>

        <div className="u-min-w-0 u-flex-1">
          <h3 className="u-text-base u-font-semibold u-text-slate-900">{uiTitle}</h3>
          <p className="u-mt-1 u-text-sm u-leading-6 u-text-slate-700">{uiText}</p>

          {/* Actions */}
          <div className="u-mt-3 u-flex u-flex-wrap u-items-center u-gap-2">
            {isLink ? (
              <a
                href={href}
                className={cx(
                  "u-inline-flex u-items-center u-justify-center u-rounded-xl u-px-3 u-py-2 u-text-sm u-font-medium",
                  "u-border u-border-slate-300 u-bg-white u-text-slate-900",
                  "u-hover-border-slate-400 u-hover-bg-slate-50",
                  "u-focus-outline-none u-focus-ring-2 u-focus-ring-slate-300"
                )}
              >
                {uiButton}
              </a>
            ) : (
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={cx(
                  "u-inline-flex u-items-center u-justify-center u-rounded-xl u-px-3 u-py-2 u-text-sm u-font-medium",
                  "u-border u-border-slate-300 u-bg-white u-text-slate-900",
                  "u-hover-border-slate-400 u-hover-bg-slate-50",
                  "u-focus-outline-none u-focus-ring-2 u-focus-ring-slate-300"
                )}
                aria-expanded={open}
                aria-controls={`inline-cta-form-${uid}`}
              >
                {sent ? "Готово" : open ? "Свернуть" : uiButton}
              </button>
            )}

            {/* micro-trust line */}
            <span className="u-text-xs u-text-slate-500">
              Без звонков и навязывания
            </span>
          </div>

          {/* Reveal form */}
          {!isLink && open && (
            <div
              id={`inline-cta-form-${uid}`}
              className="u-mt-4 u-rounded-2xl u-border u-border-slate-200 u-bg-white u-p-4"
            >
              {sent ? (
                <div className="u-space-y-1">
                  <p className="u-text-sm u-font-medium u-text-slate-900">
                    Спасибо. Мы посмотрим ситуацию и вернёмся с комментарием.
                  </p>
                  <p className="u-text-xs u-text-slate-600">
                    Обычно отвечаем в течение рабочего дня.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="u-space-y-3">
                  <RecaptchaLazy
                    siteKey={recaptchaSiteKey}
                    enabled={recaptchaEnabled}
                    onReady={() => setRecaptchaReady(true)}
                  />
                  <div>
                    <label
                      htmlFor={`msg-${uid}`}
                      className="u-block u-text-xs u-font-medium u-text-slate-700"
                    >
                      Опишите вопрос или ситуацию <span className="u-text-slate-400">(обязательно)</span>
                    </label>
                    <textarea
                      id={`msg-${uid}`}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className={cx(
                        "u-mt-1 u-w-full u-rounded-xl u-border u-border-slate-200 u-bg-white u-px-3 u-py-2 u-text-sm",
                        "u-focus-outline-none u-focus-ring-2 u-focus-ring-slate-300"
                      )}
                      placeholder="Например: авто 2021 года, кредит, интересует дилерский ремонт и франшиза…"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`contact-${uid}`}
                      className="u-block u-text-xs u-font-medium u-text-slate-700"
                    >
                      Контакт (email или WhatsApp) <span className="u-text-slate-400">(необязательно)</span>
                    </label>
                    <input
                      id={`contact-${uid}`}
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className={cx(
                        "u-mt-1 u-w-full u-rounded-xl u-border u-border-slate-200 u-bg-white u-px-3 u-py-2 u-text-sm",
                        "u-focus-outline-none u-focus-ring-2 u-focus-ring-slate-300"
                      )}
                      placeholder="name@email.com или +48..."
                      inputMode="text"
                    />
                  </div>

                  <div className="u-flex u-flex-wrap u-items-center u-gap-2">
                    <button
                      type="submit"
                      disabled={sending || !message.trim()}
                      className={cx(
                        "u-inline-flex u-items-center u-justify-center u-rounded-xl u-px-3 u-py-2 u-text-sm u-font-medium",
                        "u-bg-slate-900 u-text-white",
                        "u-hover-bg-slate-800",
                        "u-disabled-cursor-not-allowed u-disabled-opacity-60"
                      )}
                    >
                      {sending ? "Отправляем…" : "Отправить"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className={cx(
                        "u-inline-flex u-items-center u-justify-center u-rounded-xl u-px-3 u-py-2 u-text-sm u-font-medium",
                        "u-border u-border-slate-300 u-bg-white u-text-slate-900",
                        "u-hover-border-slate-400 u-hover-bg-slate-50"
                      )}
                    >
                      Отмена
                    </button>

                    <p className="u-text-xs u-text-slate-500">
                      Нажимая «Отправить», вы соглашаетесь на обработку данных для ответа.
                      {recaptchaEnabled
                        ? ` Форма защищена reCAPTCHA${recaptchaReady ? "" : " (загружается)"}.`
                        : ""}
                    </p>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
