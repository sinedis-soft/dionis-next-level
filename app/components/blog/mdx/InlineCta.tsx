"use client";

import React, { useId, useMemo, useState } from "react";

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
      // ✅ Вариант 1 (рекомендуется): отправка на API-роут (см. ниже)
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          contact: contact.trim(),
          meta: payloadMeta,
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
        "my-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm",
        // Hover/Focus state: очень мягкий
        "transition-colors hover:bg-slate-100 focus-within:bg-slate-100",
        className
      )}
      data-article-slug={articleSlug}
      data-block-id={blockId}
      data-variant={variant}
    >
      <div className="flex items-start gap-3">
        <div
          aria-hidden="true"
          className="mt-0.5 grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white"
        >
          {/* спокойная иконка */}
          <span className="text-base">💬</span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-slate-900">{uiTitle}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-700">{uiText}</p>

          {/* Actions */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {isLink ? (
              <a
                href={href}
                className={cx(
                  "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium",
                  "border border-slate-300 bg-white text-slate-900",
                  "hover:border-slate-400 hover:bg-slate-50",
                  "focus:outline-none focus:ring-2 focus:ring-slate-300"
                )}
              >
                {uiButton}
              </a>
            ) : (
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={cx(
                  "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium",
                  "border border-slate-300 bg-white text-slate-900",
                  "hover:border-slate-400 hover:bg-slate-50",
                  "focus:outline-none focus:ring-2 focus:ring-slate-300"
                )}
                aria-expanded={open}
                aria-controls={`inline-cta-form-${uid}`}
              >
                {sent ? "Готово" : open ? "Свернуть" : uiButton}
              </button>
            )}

            {/* micro-trust line */}
            <span className="text-xs text-slate-500">
              Без звонков и навязывания
            </span>
          </div>

          {/* Reveal form */}
          {!isLink && open && (
            <div
              id={`inline-cta-form-${uid}`}
              className="mt-4 rounded-2xl border border-slate-200 bg-white p-4"
            >
              {sent ? (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-900">
                    Спасибо. Мы посмотрим ситуацию и вернёмся с комментарием.
                  </p>
                  <p className="text-xs text-slate-600">
                    Обычно отвечаем в течение рабочего дня.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-3">
                  <div>
                    <label
                      htmlFor={`msg-${uid}`}
                      className="block text-xs font-medium text-slate-700"
                    >
                      Опишите вопрос или ситуацию <span className="text-slate-400">(обязательно)</span>
                    </label>
                    <textarea
                      id={`msg-${uid}`}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className={cx(
                        "mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm",
                        "focus:outline-none focus:ring-2 focus:ring-slate-300"
                      )}
                      placeholder="Например: авто 2021 года, кредит, интересует дилерский ремонт и франшиза…"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`contact-${uid}`}
                      className="block text-xs font-medium text-slate-700"
                    >
                      Контакт (email или WhatsApp) <span className="text-slate-400">(необязательно)</span>
                    </label>
                    <input
                      id={`contact-${uid}`}
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className={cx(
                        "mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm",
                        "focus:outline-none focus:ring-2 focus:ring-slate-300"
                      )}
                      placeholder="name@email.com или +48..."
                      inputMode="text"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="submit"
                      disabled={sending || !message.trim()}
                      className={cx(
                        "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium",
                        "bg-slate-900 text-white",
                        "hover:bg-slate-800",
                        "disabled:cursor-not-allowed disabled:opacity-60"
                      )}
                    >
                      {sending ? "Отправляем…" : "Отправить"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className={cx(
                        "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium",
                        "border border-slate-300 bg-white text-slate-900",
                        "hover:border-slate-400 hover:bg-slate-50"
                      )}
                    >
                      Отмена
                    </button>

                    <p className="text-xs text-slate-500">
                      Нажимая «Отправить», вы соглашаетесь на обработку данных для ответа.
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
