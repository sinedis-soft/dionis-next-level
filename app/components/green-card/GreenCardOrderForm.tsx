// app/components/green-card/GreenCardOrderForm.tsx
"use client";

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useId,
  type FormEvent,
} from "react";
import type { GreenCardFormDictionary } from "@/dictionaries/greenCardForm";
import FilePicker from "@/components/FilePicker";

import { RecaptchaLazy } from "@/components/RecaptchaLazy";
import { getRecaptchaToken } from "@/lib/recaptcha";

type Props = { dict: GreenCardFormDictionary };

type FormStatus = "idle" | "loading" | "success" | "error";
type Step = 1 | 2;

type VehicleBlock = { id: number };

function formatLatinName(raw: string): string {
  return raw.replace(/[^A-Za-z\s'-]/g, "");
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits ? "+" + digits : "";
}

function formatEmail(raw: string): string {
  let value = raw.replace(/\s/g, "");
  value = value.replace(/[^A-Za-z0-9.@_-]/g, "");
  const at = value.indexOf("@");
  if (at !== -1) {
    const before = value.slice(0, at + 1);
    const after = value.slice(at + 1).replace(/@/g, "");
    value = before + after;
  }
  if (value.length > 50) value = value.slice(0, 50);
  return value.toLowerCase();
}

function formatIdNumber(raw: string): string {
  return raw
    .replace(/\s/g, "")
    .replace(/[^A-Za-z0-9]/g, "")
    .toUpperCase()
    .slice(0, 20);
}

function formatLatinAlnum(raw: string, maxLength = 20): string {
  return raw
    .replace(/\s/g, "")
    .replace(/[^A-Za-z0-9]/g, "")
    .toUpperCase()
    .slice(0, maxLength);
}

function tpl(s: string, params: Record<string, string>) {
  return s.replace(/\{(\w+)\}/g, (_, k) => params[k] ?? "");
}

function safeCssEscape(value: string): string {
  const esc = (globalThis as any)?.CSS?.escape;
  if (typeof esc === "function") return esc(value);
  return value.replace(/["\\]/g, "\\$&");
}

function RequiredMark() {
  return (
    <span className="req" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

function ErrorSummary({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="err-box" role="alert" aria-live="polite">
      <p className="err-box__title">{title}</p>
      <ul className="err-box__list">
        {items.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
}

function StepCrumbs({
  step,
  onGoStep1,
  onGoStep2,
  canAttemptStep2,
  isBusy,
  labels,
}: {
  step: Step;
  onGoStep1: () => void;
  onGoStep2: () => void;
  canAttemptStep2: boolean;
  isBusy: boolean;
  labels: { step1: string; step2: string };
}) {
  return (
    <nav aria-label="Form steps" className="steps">
      <ol className="steps__row">
        <li>
          <button
            type="button"
            className={[
              "steps__btn",
              step === 1 ? "steps__btn--active" : "steps__btn--idle",
              isBusy ? "is-disabled" : "",
            ].join(" ")}
            onClick={onGoStep1}
            disabled={isBusy}
          >
            <span className="steps__num" aria-hidden="true">
              1
            </span>
            <span className="steps__label">{labels.step1}</span>
          </button>
        </li>

        <li className="steps__sep" aria-hidden="true">
          →
        </li>

        <li>
          <button
            type="button"
            className={[
              "steps__btn",
              step === 2
                ? "steps__btn--active"
                : canAttemptStep2
                ? "steps__btn--idle"
                : "steps__btn--disabled",
              isBusy ? "is-disabled" : "",
            ].join(" ")}
            onClick={() => {
              if (!canAttemptStep2) return;
              onGoStep2();
            }}
            disabled={isBusy || !canAttemptStep2}
            aria-disabled={isBusy || !canAttemptStep2}
          >
            <span className="steps__num" aria-hidden="true">
              2
            </span>
            <span className="steps__label">{labels.step2}</span>
          </button>
        </li>
      </ol>
    </nav>
  );
}

export function GreenCardOrderForm({ dict }: Props) {
  const uid = useId();

  const [step, setStep] = useState<Step>(1);
  const [isCompany, setIsCompany] = useState(false);
  const [manualEntry, setManualEntry] = useState(false);

  const [vehicles, setVehicles] = useState<VehicleBlock[]>([{ id: 0 }]);

  const [contactFirstNameLat, setContactFirstNameLat] = useState("");
  const [contactLastNameLat, setContactLastNameLat] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const [personIdNumber, setPersonIdNumber] = useState("");
  const [passportNumber, setPassportNumber] = useState("");

  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formMessage, setFormMessage] = useState("");

  const [step1Errors, setStep1Errors] = useState<string[]>([]);
  const [step2Errors, setStep2Errors] = useState<string[]>([]);

  const formRef = useRef<HTMLFormElement | null>(null);
  const step1Ref = useRef<HTMLDivElement | null>(null);
  const step2Ref = useRef<HTMLDivElement | null>(null);

  const today = useMemo(() => new Date(), []);
  const minAgeDate = useMemo(
    () => new Date(today.getTime() - 6570 * 24 * 60 * 60 * 1000),
    [today]
  );
  const maxBirthDate = useMemo(
    () => minAgeDate.toISOString().split("T")[0],
    [minAgeDate]
  );
  const maxIssuedDate = useMemo(
    () => today.toISOString().split("T")[0],
    [today]
  );
  const minStartDate = useMemo(
    () => today.toISOString().split("T")[0],
    [today]
  );

  const forbiddenTypes = useMemo(
    () => [
      "application/zip",
      "application/x-rar-compressed",
      "application/x-7z-compressed",
      "application/x-tar",
      "audio/",
      "video/",
    ],
    []
  );

  const isBusy = formStatus === "loading";
  const hasError = formStatus === "error";
  const hasSuccess = formStatus === "success";
  const statusId = `${uid}-green-card-order-status`;

  // ===== reCAPTCHA config =====
  const isProd =
    typeof window === "undefined"
      ? process.env.NODE_ENV === "production"
      : process.env.NODE_ENV === "production";

  const recaptchaSiteKey =
    (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "").trim();

  // включаем только если ключ задан
  const recaptchaEnabled = Boolean(recaptchaSiteKey);
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  const validateFiles = useCallback(
    (files: FileList): boolean => {
      let ok = true;
      Array.from(files || []).forEach((file) => {
        const type = (file?.type || "").toLowerCase();
        const forbidden = forbiddenTypes.some((t) =>
          t.endsWith("/") ? type.startsWith(t) : type === t
        );
        if (forbidden) {
          ok = false;
          alert(`${file.name}: ${dict.fileForbidden}`);
        }
      });
      return ok;
    },
    [dict.fileForbidden, forbiddenTypes]
  );

  const getLabelForElement = useCallback(
    (root: HTMLElement, el: Element): string => {
      const aria = (el as HTMLElement).getAttribute?.("aria-label")?.trim();
      if (aria) return aria;

      const id = (el as HTMLInputElement).id;
      if (id) {
        const lab = root.querySelector(
          `label[for="${safeCssEscape(id)}"]`
        ) as HTMLLabelElement | null;
        const t = (lab?.textContent || "").replace(/\*/g, "").trim();
        if (t) return t;
      }

      const name = (el as HTMLInputElement).getAttribute?.("name")?.trim();
      if (name) return name;

      return "Field";
    },
    []
  );

  const collectStepErrors = useCallback(
    (s: Step): string[] => {
      const root = s === 1 ? step1Ref.current : step2Ref.current;
      if (!root) return [];

      const errors: string[] = [];

      const fields = Array.from(
        root.querySelectorAll<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >("input, select, textarea")
      ).filter((el) => {
        if (el.disabled) return false;
        if (el instanceof HTMLInputElement && el.type === "hidden") return false;

        const style = window.getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden") return false;

        return true;
      });

      for (const el of fields) {
        if (!el.checkValidity()) {
          const label = getLabelForElement(root, el);
          errors.push(tpl(dict.errors.requiredField, { field: label }));
        }
      }

      // Step 1: passport files required when person + auto mode
      if (s === 1 && !isCompany && !manualEntry) {
        const formEl = formRef.current;
        if (formEl) {
          const fd = new FormData(formEl);
          const vals = fd.getAll("person_passportFiles");
          const hasFiles = vals.some(
            (v) => v instanceof File && (v as File).size > 0
          );
          if (!hasFiles) {
            errors.push(
              tpl(dict.errors.requiredFiles, { field: dict.passportFilesLabel })
            );
          }
        }
      }

      // Step 2: tech passport files for each vehicle
      if (s === 2) {
        const formEl = formRef.current;
        if (formEl) {
          const fd = new FormData(formEl);
          vehicles.forEach((_, idx) => {
            const key = `vehicles[${idx}][techPassportFiles]`;
            const vals = fd.getAll(key);
            const hasFiles = vals.some(
              (v) => v instanceof File && (v as File).size > 0
            );
            if (!hasFiles) {
              errors.push(
                tpl(dict.errors.requiredFiles, {
                  field: `${dict.vehicles.techPassportFilesLabel} (${dict.vehicles.blockTitle} #${idx + 1})`,
                })
              );
            }
          });
        }
      }

      return Array.from(new Set(errors));
    },
    [dict, getLabelForElement, isCompany, manualEntry, vehicles]
  );

  const refreshStep1Errors = useCallback(
    () => setStep1Errors(collectStepErrors(1)),
    [collectStepErrors]
  );
  const refreshStep2Errors = useCallback(
    () => setStep2Errors(collectStepErrors(2)),
    [collectStepErrors]
  );

  const goStep1 = useCallback(() => {
    if (isBusy) return;
    setStep(1);
    setStep2Errors([]);
    setTimeout(
      () =>
        step1Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      50
    );
  }, [isBusy]);

  const goStep2 = useCallback(() => {
    if (isBusy) return;

    const errs = collectStepErrors(1);
    if (errs.length) {
      setStep1Errors(errs);
      setStep(1);
      setTimeout(
        () =>
          step1Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        50
      );
      return;
    }

    setStep1Errors([]);
    setStep(2);
    setTimeout(() => {
      step2Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      refreshStep2Errors();
    }, 50);
  }, [collectStepErrors, isBusy, refreshStep2Errors]);

  const handleAddVehicle = useCallback(() => {
    setVehicles((prev) => {
      const lastId = prev.length ? prev[prev.length - 1].id : 0;
      return [...prev, { id: lastId + 1 }];
    });
    if (step === 2) setTimeout(() => refreshStep2Errors(), 0);
  }, [refreshStep2Errors, step]);

  const handleRemoveVehicle = useCallback(
    (id: number) => {
      setVehicles((prev) => {
        if (prev.length === 1) return prev;
        return prev.filter((v) => v.id !== id);
      });
      if (step === 2) setTimeout(() => refreshStep2Errors(), 0);
    },
    [refreshStep2Errors, step]
  );

  const canAttemptStep2 = useMemo(() => {
    if (!contactFirstNameLat.trim()) return false;
    if (!contactLastNameLat.trim()) return false;
    if (!contactPhone.trim()) return false;
    if (!contactEmail.trim()) return false;
    return true;
  }, [contactFirstNameLat, contactLastNameLat, contactPhone, contactEmail]);

  const resetAll = useCallback((formEl: HTMLFormElement) => {
    formEl.reset();

    setContactFirstNameLat("");
    setContactLastNameLat("");
    setContactPhone("");
    setContactEmail("");

    setPersonIdNumber("");
    setPassportNumber("");

    setVehicles([{ id: 0 }]);
    setIsCompany(false);
    setManualEntry(false);

    setStep1Errors([]);
    setStep2Errors([]);
    setStep(1);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isBusy) return;

      if (step !== 2) {
        goStep2();
        return;
      }

      const errs2 = collectStepErrors(2);
      if (errs2.length) {
        setStep2Errors(errs2);
        setTimeout(
          () =>
            step2Ref.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            }),
          50
        );
        return;
      }
      setStep2Errors([]);

      setFormStatus("idle");
      setFormMessage("");

      const formEl = e.currentTarget;

      if (!formEl.checkValidity()) {
        formEl.reportValidity();
        return;
      }

      setFormStatus("loading");

      try {
        const fd = new FormData(formEl);

        // meta
        try {
          fd.append("pageUrl", window.location.href);
          const utm = localStorage.getItem("utm_data");
          if (utm) fd.append("utm", utm);
        } catch {
          // ignore
        }

        // reCAPTCHA v3 token (в PROD — обязателен, если включено)
        if (recaptchaEnabled) {
          // небольшая защита от "кнопка нажата до загрузки API"
          const token = await getRecaptchaToken(recaptchaSiteKey, "green_card_order");

          if (isProd && !token) {
            setFormStatus("error");
            setFormMessage("Не удалось подтвердить, что вы не робот. Обновите страницу и попробуйте ещё раз.");
            return;
          }

          if (token) fd.set("recaptchaToken", token);
        }

        const res = await fetch("/api/green-card-order", {
          method: "POST",
          body: fd,
        });

        const data: unknown = await res.json().catch(() => null);
        const ok = Boolean((data as { ok?: boolean } | null)?.ok);
        const message = (data as { message?: string } | null)?.message;

        if (!res.ok || !ok) {
          setFormStatus("error");
          setFormMessage(message || "Ошибка при отправке заявки на Зеленую карту");
          return;
        }

        setFormStatus("success");
        setFormMessage(dict.successMessage);
        resetAll(formEl);
      } catch (err) {
        console.error("GREEN CARD ORDER ERROR:", err);
        setFormStatus("error");
        setFormMessage("Ошибка на сервере при отправке заявки на Зеленую карту");
      }
    },
    [
      collectStepErrors,
      dict.successMessage,
      goStep2,
      isBusy,
      resetAll,
      step,
      recaptchaEnabled,
      recaptchaSiteKey,
      isProd,
    ]
  );

  return (
    <section className="gc-form">
      <div className="card card--pad">
        <div className="gc-form__head">
          <h2 className="gc-form__title">{dict.title}</h2>
          <p className="gc-form__intro">{dict.intro}</p>
        </div>

        <StepCrumbs
          step={step}
          onGoStep1={goStep1}
          onGoStep2={goStep2}
          canAttemptStep2={canAttemptStep2}
          isBusy={isBusy}
          labels={dict.stepLabels}
        />

        {/* reCAPTCHA v3 loader (не требует действий пользователя) */}
        <RecaptchaLazy
          siteKey={recaptchaSiteKey}
          enabled={recaptchaEnabled}
          onReady={() => setRecaptchaReady(true)}
        />

        <form
          ref={formRef}
          className="gc-form__inner"
          onSubmit={handleSubmit}
          aria-describedby={formStatus !== "idle" ? statusId : undefined}
        >
          {/* ===================== STEP 1 ===================== */}
          <div ref={step1Ref} hidden={step !== 1}>
            <ErrorSummary title={dict.errors.title} items={step1Errors} />

            <div className="gc-block">
              <div className="gc-block__hd">
                <h3 className="gc-block__title">{dict.contact.legend}</h3>
              </div>

              <div className="grid grid-2">
                <div className="field">
                  <label htmlFor={`${uid}-contact_firstNameLat`} className="lbl">
                    {dict.contact.firstName}
                    <RequiredMark />
                  </label>
                  <input
                    id={`${uid}-contact_firstNameLat`}
                    type="text"
                    name="contact_firstNameLat"
                    className="control"
                    value={contactFirstNameLat}
                    onChange={(e) => {
                      setContactFirstNameLat(formatLatinName(e.target.value));
                      if (step1Errors.length) setStep1Errors([]);
                    }}
                    required
                    disabled={isBusy}
                    autoComplete="given-name"
                  />
                </div>

                <div className="field">
                  <label htmlFor={`${uid}-contact_lastNameLat`} className="lbl">
                    {dict.contact.lastName}
                    <RequiredMark />
                  </label>
                  <input
                    id={`${uid}-contact_lastNameLat`}
                    type="text"
                    name="contact_lastNameLat"
                    className="control"
                    value={contactLastNameLat}
                    onChange={(e) => {
                      setContactLastNameLat(formatLatinName(e.target.value));
                      if (step1Errors.length) setStep1Errors([]);
                    }}
                    required
                    disabled={isBusy}
                    autoComplete="family-name"
                  />
                </div>

                <div className="field">
                  <label htmlFor={`${uid}-contact_phone`} className="lbl">
                    {dict.contact.phone}
                    <RequiredMark />
                  </label>
                  <input
                    id={`${uid}-contact_phone`}
                    type="tel"
                    name="contact_phone"
                    className="control"
                    value={contactPhone}
                    onChange={(e) => {
                      setContactPhone(formatPhone(e.target.value));
                      if (step1Errors.length) setStep1Errors([]);
                    }}
                    required
                    disabled={isBusy}
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+7 777 1234567"
                  />
                </div>

                <div className="field">
                  <label htmlFor={`${uid}-contact_email`} className="lbl">
                    {dict.contact.email}
                    <RequiredMark />
                  </label>
                  <input
                    id={`${uid}-contact_email`}
                    type="email"
                    name="contact_email"
                    className="control"
                    value={contactEmail}
                    onChange={(e) => {
                      setContactEmail(formatEmail(e.target.value));
                      if (step1Errors.length) setStep1Errors([]);
                    }}
                    required
                    disabled={isBusy}
                    autoComplete="email"
                    inputMode="email"
                  />
                </div>
              </div>

              <div className="gc-checkrow">
                <input
                  id={`${uid}-order-isCompany`}
                  name="order_isCompany"
                  type="checkbox"
                  checked={isCompany}
                  disabled={isBusy}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setIsCompany(checked);
                    if (checked) setManualEntry(false);
                    setStep1Errors([]);
                    setTimeout(() => refreshStep1Errors(), 0);
                  }}
                />
                <label
                  htmlFor={`${uid}-order-isCompany`}
                  className="gc-checkrow__label"
                >
                  {dict.contact.isCompanyLabel}
                </label>
              </div>
            </div>

            <div className="gc-block">
              <div className="gc-block__hd">
                <h3 className="gc-block__title">
                  {isCompany ? dict.company.legend : dict.person.legend}
                </h3>
              </div>

              {isCompany ? (
                <div className="grid grid-2">
                  <div className="field">
                    <label htmlFor={`${uid}-company_bin`} className="lbl">
                      {dict.company.bin}
                      <RequiredMark />
                    </label>
                    <input
                      id={`${uid}-company_bin`}
                      type="text"
                      name="company_bin"
                      className="control"
                      required
                      disabled={isBusy}
                      onChange={() => step1Errors.length && setStep1Errors([])}
                    />
                  </div>

                  <div className="field">
                    <label htmlFor={`${uid}-company_email`} className="lbl">
                      {dict.company.email}
                      <RequiredMark />
                    </label>
                    <input
                      id={`${uid}-company_email`}
                      type="email"
                      name="company_email"
                      className="control"
                      required
                      disabled={isBusy}
                      onChange={() => step1Errors.length && setStep1Errors([])}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="gc-checkrow gc-checkrow--hint">
                    <input
                      id={`${uid}-person-manualEntry`}
                      name="person_manualEntry"
                      type="checkbox"
                      checked={manualEntry}
                      disabled={isBusy}
                      onChange={(e) => {
                        setManualEntry(e.target.checked);
                        setStep1Errors([]);
                        setTimeout(() => refreshStep1Errors(), 0);
                      }}
                    />
                    <label
                      htmlFor={`${uid}-person-manualEntry`}
                      className="gc-checkrow__label"
                    >
                      {dict.manualEntryLabel}
                    </label>
                  </div>

                  {!manualEntry ? (
                    <div className="grid grid-2">
                      <div className="field">
                        <label htmlFor={`${uid}-person_gender_auto`} className="lbl">
                          {dict.person.gender}
                          <RequiredMark />
                        </label>
                        <select
                          id={`${uid}-person_gender_auto`}
                          name="person_gender"
                          className="control"
                          defaultValue=""
                          required
                          disabled={isBusy}
                          onChange={() => step1Errors.length && setStep1Errors([])}
                        >
                          <option value="">{dict.notSelected}</option>
                          <option value="male">{dict.person.genderMale}</option>
                          <option value="female">{dict.person.genderFemale}</option>
                        </select>
                      </div>

                      <div className="field">
                        <label htmlFor={`${uid}-person_address_auto`} className="lbl">
                          {dict.person.address}
                          <RequiredMark />
                        </label>
                        <input
                          id={`${uid}-person_address_auto`}
                          type="text"
                          name="person_address"
                          className="control"
                          required
                          disabled={isBusy}
                          onChange={() => step1Errors.length && setStep1Errors([])}
                        />
                      </div>

                      <div className="field field--full">
                        <FilePicker
                          id={`${uid}-person_passportFiles`}
                          name="person_passportFiles"
                          label={dict.passportFilesLabel}
                          required
                          multiple
                          disabled={isBusy}
                          accept="image/*,application/pdf"
                          onValidate={(files) => {
                            const ok = validateFiles(files);
                            setTimeout(() => refreshStep1Errors(), 0);
                            return ok;
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-2">
                        <div className="field">
                          <label htmlFor={`${uid}-person_middleName`} className="lbl">
                            {dict.person.middleName}
                          </label>
                          <input
                            id={`${uid}-person_middleName`}
                            type="text"
                            name="person_middleName"
                            className="control"
                            disabled={isBusy}
                          />
                        </div>

                        <div className="field">
                          <label htmlFor={`${uid}-person_gender_manual`} className="lbl">
                            {dict.person.gender}
                            <RequiredMark />
                          </label>
                          <select
                            id={`${uid}-person_gender_manual`}
                            name="person_gender"
                            className="control"
                            defaultValue=""
                            required
                            disabled={isBusy}
                            onChange={() => step1Errors.length && setStep1Errors([])}
                          >
                            <option value="">{dict.notSelected}</option>
                            <option value="male">{dict.person.genderMale}</option>
                            <option value="female">{dict.person.genderFemale}</option>
                          </select>
                        </div>

                        <div className="field">
                          <label htmlFor={`${uid}-person_birthDate`} className="lbl">
                            {dict.person.birthDate}
                            <RequiredMark />
                          </label>
                          <input
                            id={`${uid}-person_birthDate`}
                            type="date"
                            name="person_birthDate"
                            max={maxBirthDate}
                            className="control"
                            required
                            disabled={isBusy}
                            onChange={() => step1Errors.length && setStep1Errors([])}
                          />
                        </div>

                        <div className="field">
                          <label htmlFor={`${uid}-person_idNumber`} className="lbl">
                            {dict.person.idNumber}
                            <RequiredMark />
                          </label>
                          <input
                            id={`${uid}-person_idNumber`}
                            type="text"
                            name="person_idNumber"
                            className="control"
                            value={personIdNumber}
                            onChange={(e) => {
                              setPersonIdNumber(formatIdNumber(e.target.value));
                              if (step1Errors.length) setStep1Errors([]);
                            }}
                            required
                            disabled={isBusy}
                          />
                        </div>

                        <div className="field field--full">
                          <label htmlFor={`${uid}-person_address_manual`} className="lbl">
                            {dict.person.address}
                            <RequiredMark />
                          </label>
                          <input
                            id={`${uid}-person_address_manual`}
                            type="text"
                            name="person_address"
                            className="control"
                            required
                            disabled={isBusy}
                            onChange={() => step1Errors.length && setStep1Errors([])}
                          />
                        </div>
                      </div>

                      <div className="grid grid-2 u-mt-4">
                        <div className="field">
                          <label htmlFor={`${uid}-person_passportNumber`} className="lbl">
                            {dict.person.passportNumber}
                            <RequiredMark />
                          </label>
                          <input
                            id={`${uid}-person_passportNumber`}
                            type="text"
                            name="person_passportNumber"
                            className="control"
                            value={passportNumber}
                            onChange={(e) => {
                              setPassportNumber(formatLatinAlnum(e.target.value, 20));
                              if (step1Errors.length) setStep1Errors([]);
                            }}
                            required
                            disabled={isBusy}
                          />
                        </div>

                        <div className="field">
                          <label htmlFor={`${uid}-person_passportIssuer`} className="lbl">
                            {dict.person.passportIssuer}
                            <RequiredMark />
                          </label>
                          <input
                            id={`${uid}-person_passportIssuer`}
                            type="text"
                            name="person_passportIssuer"
                            className="control"
                            required
                            disabled={isBusy}
                            onChange={() => step1Errors.length && setStep1Errors([])}
                          />
                        </div>

                        <div className="field">
                          <label htmlFor={`${uid}-person_passportIssuedAt`} className="lbl">
                            {dict.person.passportIssuedAt}
                            <RequiredMark />
                          </label>
                          <input
                            id={`${uid}-person_passportIssuedAt`}
                            type="date"
                            name="person_passportIssuedAt"
                            max={maxIssuedDate}
                            className="control"
                            required
                            disabled={isBusy}
                            onChange={() => step1Errors.length && setStep1Errors([])}
                          />
                        </div>

                        <div className="field">
                          <label htmlFor={`${uid}-person_passportValidTo`} className="lbl">
                            {dict.person.passportValidTo}
                            <RequiredMark />
                          </label>
                          <input
                            id={`${uid}-person_passportValidTo`}
                            type="date"
                            name="person_passportValidTo"
                            min={minStartDate}
                            className="control"
                            required
                            disabled={isBusy}
                            onChange={() => step1Errors.length && setStep1Errors([])}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            <div className="row-between u-mt-4">
              <span />
              <button
                type="button"
                className={["btn btn-primary", isBusy ? "is-disabled" : ""].join(" ")}
                onClick={() => {
                  const errs = collectStepErrors(1);
                  if (errs.length) {
                    setStep1Errors(errs);
                    setTimeout(
                      () =>
                        step1Ref.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        }),
                      50
                    );
                    return;
                  }
                  goStep2();
                }}
                disabled={isBusy}
              >
                {dict.nextStep} →
              </button>
            </div>
          </div>

          {/* ===================== STEP 2 ===================== */}
          <div ref={step2Ref} hidden={step !== 2}>
            <ErrorSummary title={dict.errors.title} items={step2Errors} />

            <div className="gc-block">
              <div className="gc-block__hd">
                <h3 className="gc-block__title">{dict.vehicles.legend}</h3>
              </div>

              <div className="row-between">
                <p className="hint">{dict.vehicles.description}</p>

                <button
                  type="button"
                  className={["link", isBusy ? "is-disabled" : ""].join(" ")}
                  onClick={handleAddVehicle}
                  disabled={isBusy}
                >
                  {dict.vehicles.addButton}
                </button>
              </div>

              <div className="stack u-gap-14 u-mt-4">
                {vehicles.map((v, idx) => (
                  <div key={v.id} className="card card--pad gc-vehicle">
                    <div className="row-between">
                      <p className="card-title" style={{ margin: 0 }}>
                        {dict.vehicles.blockTitle} #{idx + 1}
                      </p>

                      {vehicles.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveVehicle(v.id)}
                          className={[
                            "link link--danger",
                            isBusy ? "is-disabled" : "",
                          ].join(" ")}
                          disabled={isBusy}
                        >
                          {dict.vehicles.removeButton}
                        </button>
                      )}
                    </div>

                    <div className="grid grid-2 u-mt-4">
                      <div className="field">
                        <label htmlFor={`${uid}-vehicles_${idx}_plate`} className="lbl">
                          {dict.vehicles.plate}
                          <RequiredMark />
                        </label>
                        <input
                          id={`${uid}-vehicles_${idx}_plate`}
                          type="text"
                          name={`vehicles[${idx}][plate]`}
                          className="control"
                          required
                          disabled={isBusy}
                          onChange={(e) => {
                            e.currentTarget.value = formatLatinAlnum(
                              e.currentTarget.value,
                              12
                            );
                            if (step2Errors.length) setStep2Errors([]);
                          }}
                        />
                      </div>

                      <div className="field">
                        <label htmlFor={`${uid}-vehicles_${idx}_type`} className="lbl">
                          {dict.vehicles.vehicleTypeLabel}
                          <RequiredMark />
                        </label>
                        <select
                          id={`${uid}-vehicles_${idx}_type`}
                          name={`vehicles[${idx}][type]`}
                          className="control"
                          defaultValue=""
                          required
                          disabled={isBusy}
                          onChange={() => step2Errors.length && setStep2Errors([])}
                        >
                          <option value="">{dict.notSelected}</option>
                          <option value="127">{dict.vehicles.vehicleTypePassenger}</option>
                          <option value="131">{dict.vehicles.vehicleTypeBus}</option>
                          <option value="453">{dict.vehicles.vehicleTypeTruck}</option>
                          <option value="251">{dict.vehicles.vehicleTypeTrailer}</option>
                          <option value="217">{dict.vehicles.vehicleTypeMotorcycle}</option>
                          <option value="457">{dict.vehicles.vehicleTypeSpecial}</option>
                        </select>
                      </div>

                      <div className="field">
                        <label htmlFor={`${uid}-insurance_territory_${idx}`} className="lbl">
                          {dict.insurance.territoryLabel}
                          <RequiredMark />
                        </label>
                        <select
                          id={`${uid}-insurance_territory_${idx}`}
                          name="insurance_territory"
                          className="control"
                          defaultValue=""
                          required
                          disabled={isBusy}
                          onChange={() => step2Errors.length && setStep2Errors([])}
                        >
                          <option value="">{dict.notSelected}</option>
                          <option value="1155">{dict.insurance.territoryAll}</option>
                          <option value="1267">{dict.insurance.territoryTMU}</option>
                        </select>
                      </div>

                      <div className="field">
                        <label htmlFor={`${uid}-vehicles_${idx}_startDate`} className="lbl">
                          {dict.vehicles.startDate}
                          <RequiredMark />
                        </label>
                        <input
                          id={`${uid}-vehicles_${idx}_startDate`}
                          type="date"
                          name={`vehicles[${idx}][startDate]`}
                          min={minStartDate}
                          className="control"
                          required
                          disabled={isBusy}
                          onChange={() => step2Errors.length && setStep2Errors([])}
                        />
                      </div>

                      <div className="field">
                        <label htmlFor={`${uid}-vehicles_${idx}_period`} className="lbl">
                          {dict.vehicles.periodLabel}
                          <RequiredMark />
                        </label>
                        <select
                          id={`${uid}-vehicles_${idx}_period`}
                          name={`vehicles[${idx}][period]`}
                          className="control"
                          defaultValue=""
                          required
                          disabled={isBusy}
                          onChange={() => step2Errors.length && setStep2Errors([])}
                        >
                          <option value="">{dict.notSelected}</option>
                          <option value="115">{dict.vehicles.period1m}</option>
                          <option value="117">{dict.vehicles.period3m}</option>
                          <option value="119">{dict.vehicles.period6m}</option>
                          <option value="121">{dict.vehicles.period12m}</option>
                        </select>
                      </div>

                      <div className="field field--full">
                        <FilePicker
                          id={`${uid}-vehicles_${idx}_techPassportFiles`}
                          name={`vehicles[${idx}][techPassportFiles]`}
                          label={dict.vehicles.techPassportFilesLabel}
                          required
                          multiple
                          disabled={isBusy}
                          accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          onValidate={(files) => {
                            const ok = validateFiles(files);
                            setTimeout(() => refreshStep2Errors(), 0);
                            return ok;
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {formStatus !== "idle" && (
                <div
                  id={statusId}
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
                  {formStatus === "loading"
                    ? "Отправка..."
                    : formMessage || dict.successMessage}
                </div>
              )}

              {/* Короткий техтекст, чтобы “как подтвердить” было понятно */}
              {recaptchaEnabled && (
                <p className="hint" style={{ marginTop: 12 }}>
                  Защита от ботов включена{recaptchaReady ? "" : " (загружается)"}.
                  Подтверждать ничего не нужно.
                </p>
              )}

              <div className="row-between u-mt-4 gc-actions">
                <button
                  type="button"
                  className={["btn btn-secondary", isBusy ? "is-disabled" : ""].join(" ")}
                  onClick={goStep1}
                  disabled={isBusy}
                >
                  ← {dict.prevStep}
                </button>

                <div className="row-center gc-actions__right">
                  <button
                    type="button"
                    className={["btn btn-secondary", isBusy ? "is-disabled" : ""].join(" ")}
                    onClick={handleAddVehicle}
                    disabled={isBusy}
                  >
                    {dict.vehicles.addButton}
                  </button>

                  <button
                    type="submit"
                    className={["btn btn-primary", isBusy ? "is-disabled" : ""].join(" ")}
                    disabled={isBusy}
                    onClick={() => {
                      const errs = collectStepErrors(2);
                      if (errs.length) setStep2Errors(errs);
                    }}
                  >
                    {isBusy ? "Отправка..." : dict.submit}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}