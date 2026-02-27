// components/osago-rf/OsagoOrderForm.tsx
"use client";

import React, { useCallback, useMemo, useRef, useState, useId } from "react";
import type { OsagoRfFormDictionary } from "@/dictionaries/osagoRfForm";

// Имя/фамилия/отчество: кириллица + латиница, пробел, дефис, апостроф
function formatPersonName(raw: string): string {
  return raw.replace(/[^A-Za-z\u0400-\u04FF\s'-]/g, "");
}

// Телефон: только цифры, с плюсом в начале
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits ? "+" + digits : "";
}

// E-mail
function formatEmail(raw: string): string {
  let value = raw.replace(/\s/g, "");
  value = value.replace(/[^A-Za-z0-9.@_-]/g, "");
  const firstAtIndex = value.indexOf("@");
  if (firstAtIndex !== -1) {
    const beforeAt = value.slice(0, firstAtIndex + 1);
    const afterAt = value.slice(firstAtIndex + 1).replace(/@/g, "");
    value = beforeAt + afterAt;
  }
  if (value.length > 50) value = value.slice(0, 50);
  return value.toLowerCase();
}

function formatLatinAlnum(raw: string, maxLength = 20): string {
  return raw
    .replace(/\s/g, "")
    .replace(/[^A-Za-z0-9]/g, "")
    .toUpperCase()
    .slice(0, maxLength);
}

type Props = { dict: OsagoRfFormDictionary };
type FormStatus = "idle" | "loading" | "success" | "error";
type Step = 1 | 2;

function RequiredMark() {
  return (
    <span className="req" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

function tpl(s: string, params: Record<string, string>) {
  return s.replace(/\{(\w+)\}/g, (_, k) => params[k] ?? "");
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

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

type Driver = { id: number };

function toLocalDateString(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function cssEscapeFallback(value: string): string {
  const css = (globalThis as any).CSS;
  if (css && typeof css.escape === "function") return css.escape(value);
  return value.replace(/["\\]/g, "\\$&");
}

/** FilePickerPro: НЕ участвует в native validation, ошибки контролируем сами */
function FilePickerPro({
  dict,
  id,
  name,
  label,
  hint,
  required,
  multiple,
  accept,
  disabled,
  forbiddenTypes,
  valueFiles,
  onChangeFiles,
}: {
  dict: OsagoRfFormDictionary;
  id: string;
  name: string;
  label: string;
  hint?: string;
  required?: boolean;
  multiple?: boolean;
  accept?: string;
  disabled?: boolean;
  forbiddenTypes: string[];
  valueFiles: File[];
  onChangeFiles: (files: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const validateAndNormalize = useCallback(
    (files: FileList | null): File[] => {
      if (!files) return [];
      const accepted: File[] = [];
      Array.from(files).forEach((file) => {
        const type = (file?.type || "").toLowerCase();
        const forbidden = forbiddenTypes.some((t) => (t.endsWith("/") ? type.startsWith(t) : type === t));
        if (forbidden) {
          alert(`${file.name}: ${dict.fileForbidden}`);
          return;
        }
        accepted.push(file);
      });
      return accepted;
    },
    [dict.fileForbidden, forbiddenTypes]
  );

  const openDialog = useCallback(() => {
    if (disabled) return;
    inputRef.current?.click();
  }, [disabled]);

  const clear = useCallback(() => {
    if (disabled) return;
    if (inputRef.current) inputRef.current.value = "";
    onChangeFiles([]);
  }, [disabled, onChangeFiles]);

  return (
    <div className="fp">
      <label htmlFor={id} className="lbl">
        {label}
        {required ? <RequiredMark /> : null}
      </label>

      <input
        ref={inputRef}
        id={id}
        name={name}
        type="file"
        multiple={multiple}
        accept={accept}
        disabled={disabled}
        className="sr-only"
        onChange={(e) => onChangeFiles(validateAndNormalize(e.currentTarget.files))}
      />

      <div className="fp__row">
        <button type="button" className="btn btn-secondary" onClick={openDialog} disabled={disabled}>
          {dict.filePicker.choose}
        </button>

        <div className="fp__meta hint">
          {valueFiles.length > 0
            ? tpl(dict.filePicker.selectedCount, { count: String(valueFiles.length) })
            : dict.filePicker.noFiles}
        </div>

        {valueFiles.length > 0 && (
          <button type="button" className="link link--danger" onClick={clear} disabled={disabled}>
            {dict.filePicker.clear}
          </button>
        )}
      </div>

      {valueFiles.length > 0 && (
        <ul className="fp__list">
          {valueFiles.map((f, i) => (
            <li key={`${f.name}-${f.size}-${i}`}>{f.name}</li>
          ))}
        </ul>
      )}

      {hint ? <p className="hint fp__hint">{hint}</p> : null}
    </div>
  );
}

export function OsagoOrderForm({ dict }: Props) {
  const uid = useId();

  const [step, setStep] = useState<Step>(1);

  const [isCompany, setIsCompany] = useState(false);
  const [manualPassportEntry, setManualPassportEntry] = useState(false);

  const [vehicleBlocks, setVehicleBlocks] = useState<number[]>([0]);

  // контакт
  const [contactFirstNameLat, setContactFirstNameLat] = useState("");
  const [contactLastNameLat, setContactLastNameLat] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  // физлицо (ручной ввод)
  const [personMiddleName, setPersonMiddleName] = useState("");
  const [passportNumber, setPassportNumber] = useState("");

  // водители
  const [driversLimitedByVehicleId, setDriversLimitedByVehicleId] = useState<Record<number, boolean>>({});
  const [driversByVehicleId, setDriversByVehicleId] = useState<Record<number, Driver[]>>({});
  const driverIdSeqRef = useRef(0);

  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formMessage, setFormMessage] = useState<string>("");

  // ошибки по шагам
  const [step1Errors, setStep1Errors] = useState<string[]>([]);
  const [step2Errors, setStep2Errors] = useState<string[]>([]);

  const formRef = useRef<HTMLFormElement | null>(null);
  const step1Ref = useRef<HTMLDivElement | null>(null);
  const step2Ref = useRef<HTMLDivElement | null>(null);

  // файлы
  const [passportFiles, setPassportFiles] = useState<File[]>([]);
  const [techPassportFilesByIdx, setTechPassportFilesByIdx] = useState<Record<number, File[]>>({});
  const [licenseFilesByKey, setLicenseFilesByKey] = useState<Record<string, File[]>>({});

  const isBusy = formStatus === "loading";

  const todayLocal = useMemo(() => new Date(), []);
  const maxBirthDate = useMemo(
    () => toLocalDateString(new Date(todayLocal.getFullYear() - 18, todayLocal.getMonth(), todayLocal.getDate())),
    [todayLocal]
  );
  const maxPassDate = useMemo(() => toLocalDateString(todayLocal), [todayLocal]);
  const minStartDate = useMemo(() => toLocalDateString(todayLocal), [todayLocal]);

  const forbiddenTypes = useMemo(
    () => ["application/zip", "application/x-rar-compressed", "application/x-7z-compressed", "application/x-tar", "audio/", "video/"],
    []
  );

  const acceptDocs = useMemo(
    () =>
      "image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    []
  );

  const getLabelForElement = useCallback((root: HTMLElement, el: Element): string => {
    const aria = (el as HTMLElement).getAttribute?.("aria-label")?.trim();
    if (aria) return aria;

    const id = (el as HTMLInputElement).id;
    if (id) {
      const lab = root.querySelector(`label[for="${cssEscapeFallback(id)}"]`);
      const t = (lab?.textContent || "").replace(/\*/g, "").trim();
      if (t) return t;
    }

    const name = (el as HTMLInputElement).getAttribute?.("name")?.trim();
    return name || "Field";
  }, []);

  const collectStepErrors = useCallback(
    (s: Step): string[] => {
      const root = s === 1 ? step1Ref.current : step2Ref.current;
      if (!root) return [];

      const errors: string[] = [];

      const fields = Array.from(
        root.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea")
      ).filter((el) => {
        if (el.disabled) return false;

        const style = window.getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden") return false;

        if (el instanceof HTMLInputElement && el.type === "hidden") return false;
        if (el instanceof HTMLInputElement && el.type === "file") return false; // файлы валидируем отдельно
        return true;
      });

      for (const el of fields) {
        if (!el.checkValidity()) {
          const label = getLabelForElement(root, el);
          errors.push(tpl(dict.errors.requiredField, { field: label }));
        }
      }

      // Step 1: паспорт файлами, если физлицо и не ручной ввод
      if (s === 1 && !isCompany && !manualPassportEntry) {
        if (passportFiles.length === 0) {
          errors.push(tpl(dict.errors.requiredFiles, { field: dict.person.passportFilesLabel }));
        }
      }

      // Step 2: техпаспорт по каждому ТС
      if (s === 2) {
        vehicleBlocks.forEach((_, idx) => {
          const files = techPassportFilesByIdx[idx] ?? [];
          if (files.length === 0) {
            errors.push(
              tpl(dict.errors.requiredFiles, {
                field: `${dict.vehicles.techPassportFilesLabel} (${dict.vehicles.blockTitle} #${idx + 1})`,
              })
            );
          }
        });

        // если ограниченный список водителей — у каждого должны быть права файлами
        vehicleBlocks.forEach((vehicleId, idx) => {
          const limited = Boolean(driversLimitedByVehicleId[vehicleId]);
          if (!limited) return;

          const drivers = driversByVehicleId[vehicleId] ?? [];
          if (drivers.length === 0) {
            errors.push(
              tpl(dict.errors.requiredField, {
                field: `${dict.vehicles.driversTitle} (${dict.vehicles.blockTitle} #${idx + 1})`,
              })
            );
            return;
          }

          drivers.forEach((d, j) => {
            const key = `${vehicleId}:${d.id}`;
            const files = licenseFilesByKey[key] ?? [];
            if (files.length === 0) {
              errors.push(
                tpl(dict.errors.requiredFiles, {
                  field: `${dict.vehicles.driverLicenseFilesLabel} (${dict.vehicles.driverBlockTitle} #${j + 1}, ${dict.vehicles.blockTitle} #${idx + 1})`,
                })
              );
            }
          });
        });
      }

      return Array.from(new Set(errors));
    },
    [
      dict,
      driversByVehicleId,
      driversLimitedByVehicleId,
      getLabelForElement,
      isCompany,
      manualPassportEntry,
      passportFiles.length,
      techPassportFilesByIdx,
      vehicleBlocks,
      licenseFilesByKey,
    ]
  );

  const refreshStep1Errors = useCallback(() => setStep1Errors(collectStepErrors(1)), [collectStepErrors]);
  const refreshStep2Errors = useCallback(() => setStep2Errors(collectStepErrors(2)), [collectStepErrors]);

  const goStep1 = useCallback(() => {
    if (isBusy) return;
    setStep(1);
    setStep2Errors([]);
    const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
    setTimeout(() => step1Ref.current?.scrollIntoView({ behavior, block: "start" }), 50);
  }, [isBusy]);

  const goStep2 = useCallback(() => {
    if (isBusy) return;

    const errs = collectStepErrors(1);
    if (errs.length) {
      setStep1Errors(errs);
      setStep(1);
      const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
      setTimeout(() => step1Ref.current?.scrollIntoView({ behavior, block: "start" }), 50);
      return;
    }

    setStep1Errors([]);
    setStep(2);
    const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
    setTimeout(() => {
      step2Ref.current?.scrollIntoView({ behavior, block: "start" });
      refreshStep2Errors();
    }, 50);
  }, [collectStepErrors, isBusy, refreshStep2Errors]);

  const handleAddVehicle = useCallback(() => {
    setVehicleBlocks((prev) => {
      const lastId = prev.length ? prev[prev.length - 1] : 0;
      return [...prev, lastId + 1];
    });
    if (step === 2) setTimeout(() => refreshStep2Errors(), 0);
  }, [refreshStep2Errors, step]);

  const handleRemoveVehicle = useCallback(
    (id: number) => {
      setVehicleBlocks((prev) => {
        if (prev.length === 1) return prev;
        return prev.filter((vId) => vId !== id);
      });

      setDriversLimitedByVehicleId((prev) => {
        if (!(id in prev)) return prev;
        const next = { ...prev };
        delete next[id];
        return next;
      });

      setDriversByVehicleId((prev) => {
        if (!(id in prev)) return prev;
        const next = { ...prev };
        delete next[id];
        return next;
      });

      setLicenseFilesByKey((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((k) => {
          if (k.startsWith(`${id}:`)) delete next[k];
        });
        return next;
      });

      if (step === 2) setTimeout(() => refreshStep2Errors(), 0);
    },
    [refreshStep2Errors, step]
  );

  const addDriver = useCallback(
    (vehicleId: number) => {
      const newId = ++driverIdSeqRef.current;
      setDriversByVehicleId((prev) => {
        const list = prev[vehicleId] ?? [];
        return { ...prev, [vehicleId]: [...list, { id: newId }] };
      });
      if (step === 2) setTimeout(() => refreshStep2Errors(), 0);
    },
    [refreshStep2Errors, step]
  );

  const removeDriver = useCallback(
    (vehicleId: number, driverId: number) => {
      setDriversByVehicleId((prev) => {
        const list = prev[vehicleId] ?? [];
        return { ...prev, [vehicleId]: list.filter((d) => d.id !== driverId) };
      });
      setLicenseFilesByKey((prev) => {
        const next = { ...prev };
        delete next[`${vehicleId}:${driverId}`];
        return next;
      });
      if (step === 2) setTimeout(() => refreshStep2Errors(), 0);
    },
    [refreshStep2Errors, step]
  );

  const statusId = `${uid}-osago-rf-order-status`;
  const hasError = formStatus === "error";
  const hasSuccess = formStatus === "success";

  const canAttemptStep2 = useMemo(() => {
    if (!contactFirstNameLat.trim()) return false;
    if (!contactLastNameLat.trim()) return false;
    if (!contactPhone.trim()) return false;
    if (!contactEmail.trim()) return false;
    return true;
  }, [contactFirstNameLat, contactLastNameLat, contactPhone, contactEmail]);

  async function handleOrderSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isBusy) return;

    if (step !== 2) {
      goStep2();
      return;
    }

    const errs2 = collectStepErrors(2);
    if (errs2.length) {
      setStep2Errors(errs2);
      const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
      setTimeout(() => step2Ref.current?.scrollIntoView({ behavior, block: "start" }), 50);
      return;
    }
    setStep2Errors([]);

    setFormStatus("loading");
    setFormMessage("");

    try {
      const formEl = e.currentTarget;
      const fd = new FormData(formEl);

      passportFiles.forEach((f) => fd.append("person_passportFiles", f));

      vehicleBlocks.forEach((_, idx) => {
        const key = `vehicles[${idx}][techPassportFiles]`;
        (techPassportFilesByIdx[idx] ?? []).forEach((f) => fd.append(key, f));
      });

      vehicleBlocks.forEach((vehicleId, idx) => {
        if (!Boolean(driversLimitedByVehicleId[vehicleId])) return;

        const drivers = driversByVehicleId[vehicleId] ?? [];
        drivers.forEach((d, j) => {
          const files = licenseFilesByKey[`${vehicleId}:${d.id}`] ?? [];
          const fdKey = `vehicles[${idx}][drivers][${j}][licenseFiles]`;
          files.forEach((f) => fd.append(fdKey, f));
        });
      });

      if (typeof window !== "undefined") {
        try {
          fd.append("pageUrl", window.location.href);
          const utm = localStorage.getItem("utm_data");
          if (utm) fd.append("utm", utm);
        } catch {
          // ignore
        }
      }

      const res = await fetch("/api/osago-rf-order", { method: "POST", body: fd });

      const data: unknown = await res.json().catch(() => null);
      const ok = Boolean((data as { ok?: boolean } | null)?.ok);
      const message = (data as { message?: string } | null)?.message;

      if (!res.ok || !ok) {
        setFormStatus("error");
        setFormMessage(message || dict.messages.submitError);
        return;
      }

      setFormStatus("success");
      setFormMessage(dict.successMessage);

      // reset
      formEl.reset();
      setContactFirstNameLat("");
      setContactLastNameLat("");
      setContactPhone("");
      setContactEmail("");
      setPersonMiddleName("");
      setPassportNumber("");
      setManualPassportEntry(false);
      setDriversLimitedByVehicleId({});
      setDriversByVehicleId({});
      setVehicleBlocks([0]);
      setIsCompany(false);

      setPassportFiles([]);
      setTechPassportFilesByIdx({});
      setLicenseFilesByKey({});

      setStep1Errors([]);
      setStep2Errors([]);
      setStep(1);
    } catch (err) {
      console.error("OSAGO RF ORDER ERROR:", err);
      setFormStatus("error");
      setFormMessage(dict.messages.serverError);
    }
  }

  return (
    <section id="osago-rf-order" className="gc-form">
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

        <form
          ref={formRef}
          className="gc-form__inner"
          onSubmit={handleOrderSubmit}
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
                    value={contactFirstNameLat}
                    onChange={(e) => {
                      setContactFirstNameLat(formatPersonName(e.target.value));
                      if (step1Errors.length) setStep1Errors([]);
                    }}
                    className="control"
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
                    value={contactLastNameLat}
                    onChange={(e) => {
                      setContactLastNameLat(formatPersonName(e.target.value));
                      if (step1Errors.length) setStep1Errors([]);
                    }}
                    className="control"
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
                    value={contactPhone}
                    onChange={(e) => {
                      setContactPhone(formatPhone(e.target.value));
                      if (step1Errors.length) setStep1Errors([]);
                    }}
                    className="control"
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
                    value={contactEmail}
                    onChange={(e) => {
                      setContactEmail(formatEmail(e.target.value));
                      if (step1Errors.length) setStep1Errors([]);
                    }}
                    className="control"
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
                    if (checked) setManualPassportEntry(false);
                    setStep1Errors([]);
                    setTimeout(() => refreshStep1Errors(), 0);
                  }}
                />
                <label htmlFor={`${uid}-order-isCompany`} className="gc-checkrow__label">
                  {dict.contact.isCompanyLabel}
                </label>
              </div>
            </div>

            <div className="gc-block">
              <div className="gc-block__hd">
                <h3 className="gc-block__title">{isCompany ? dict.company.legend : dict.person.legend}</h3>
              </div>

              {isCompany ? (
                <div className="grid grid-2">
                  <div className="field">
                    <label htmlFor={`${uid}-company_inn`} className="lbl">
                      {dict.company.bin}
                      <RequiredMark />
                    </label>
                    <input
                      id={`${uid}-company_inn`}
                      type="text"
                      name="company_inn"
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
                      id={`${uid}-manual-passport-entry`}
                      name="manualPassportEntry"
                      type="checkbox"
                      checked={manualPassportEntry}
                      disabled={isBusy}
                      onChange={(e) => {
                        setManualPassportEntry(e.target.checked);
                        setStep1Errors([]);
                        setTimeout(() => refreshStep1Errors(), 0);
                      }}
                    />
                    <label htmlFor={`${uid}-manual-passport-entry`} className="gc-checkrow__label">
                      {dict.person.manualPassportEntryLabel}
                    </label>
                  </div>

                  <div className="grid grid-2">
                    <div className="field">
                      <label htmlFor={`${uid}-person_country`} className="lbl">
                        {dict.person.countryLabel}
                        <RequiredMark />
                      </label>
                      <select
                        id={`${uid}-person_country`}
                        name="person_country"
                        className="control"
                        defaultValue=""
                        required
                        disabled={isBusy}
                        onChange={() => step1Errors.length && setStep1Errors([])}
                      >
                        <option value="">{dict.notSelected}</option>
                        {Object.entries(dict.person.countries).map(([id, label]) => (
                          <option key={id} value={id}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="field">
                      <label htmlFor={`${uid}-person_address`} className="lbl">
                        {dict.person.address}
                        <RequiredMark />
                      </label>
                      <input
                        id={`${uid}-person_address`}
                        type="text"
                        name="person_address"
                        className="control"
                        required
                        disabled={isBusy}
                        onChange={() => step1Errors.length && setStep1Errors([])}
                      />
                    </div>
                  </div>

                  {!manualPassportEntry ? (
                    <div className="field field--full mt-4">
                      <FilePickerPro
                        dict={dict}
                        id={`${uid}-person_passportFiles`}
                        name="person_passportFiles"
                        label={dict.person.passportFilesLabel}
                        hint={dict.person.passportFilesHint}
                        required
                        multiple
                        accept={acceptDocs}
                        disabled={isBusy}
                        forbiddenTypes={forbiddenTypes}
                        valueFiles={passportFiles}
                        onChangeFiles={(files) => {
                          setPassportFiles(files);
                          setTimeout(() => refreshStep1Errors(), 0);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="grid grid-2 mt-4">
                      <div className="field">
                        <label htmlFor={`${uid}-person_gender`} className="lbl">
                          {dict.person.gender}
                          <RequiredMark />
                        </label>
                        <select
                          id={`${uid}-person_gender`}
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
                        <label htmlFor={`${uid}-person_middleName`} className="lbl">
                          {dict.person.middleName}
                        </label>
                        <input
                          id={`${uid}-person_middleName`}
                          type="text"
                          name="person_middleName"
                          value={personMiddleName}
                          onChange={(e) => {
                            setPersonMiddleName(formatPersonName(e.target.value));
                            if (step1Errors.length) setStep1Errors([]);
                          }}
                          className="control"
                          disabled={isBusy}
                        />
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
                        <label htmlFor={`${uid}-person_passportNumber`} className="lbl">
                          {dict.person.passportNumber}
                          <RequiredMark />
                        </label>
                        <input
                          id={`${uid}-person_passportNumber`}
                          type="text"
                          name="person_passportNumber"
                          value={passportNumber}
                          onChange={(e) => {
                            setPassportNumber(formatLatinAlnum(e.target.value, 20));
                            if (step1Errors.length) setStep1Errors([]);
                          }}
                          className="control"
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
                          max={maxPassDate}
                          className="control"
                          required
                          disabled={isBusy}
                          onChange={() => step1Errors.length && setStep1Errors([])}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="row-between mt-4">
              <span />
              <button
                type="button"
                className={["btn btn-primary", isBusy ? "is-disabled" : ""].join(" ")}
                onClick={() => {
                  const errs = collectStepErrors(1);
                  if (errs.length) {
                    setStep1Errors(errs);
                    const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
                    setTimeout(() => step1Ref.current?.scrollIntoView({ behavior, block: "start" }), 50);
                    return;
                  }
                  goStep2();
                }}
                disabled={isBusy}
              >
                {dict.buttons.next} →
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
                <p className="hint" style={{ margin: 0 }}>
                  {dict.vehicles.description}
                </p>

                <button type="button" className={["link", isBusy ? "is-disabled" : ""].join(" ")} onClick={handleAddVehicle} disabled={isBusy}>
                  {dict.vehicles.addButton}
                </button>
              </div>

              <div className="stack gap-14 mt-4">
                {vehicleBlocks.map((vehicleId, idx) => {
                  const driversLimited = Boolean(driversLimitedByVehicleId[vehicleId]);
                  const drivers = driversByVehicleId[vehicleId] ?? [];

                  return (
                    <div key={vehicleId} className="card card--pad gc-vehicle">
                      <div className="row-between">
                        <p className="card-title" style={{ margin: 0 }}>
                          {dict.vehicles.blockTitle} #{idx + 1}
                        </p>

                        {vehicleBlocks.length > 1 && (
                          <button type="button" onClick={() => handleRemoveVehicle(vehicleId)} className={["link link--danger", isBusy ? "is-disabled" : ""].join(" ")} disabled={isBusy}>
                            {dict.vehicles.removeButton}
                          </button>
                        )}
                      </div>

                      <div className="grid grid-2 mt-4">
                        <div className="field">
                          <label htmlFor={`${uid}-vehicles_${idx}_plate`} className="lbl">
                            {dict.vehicles.plate}
                            <RequiredMark />
                          </label>
                          <input
                            id={`${uid}-vehicles_${idx}_plate`}
                            type="text"
                            name={`vehicles[${idx}][plate]`}
                            onChange={(e) => {
                              e.currentTarget.value = formatLatinAlnum(e.currentTarget.value, 12);
                              if (step2Errors.length) setStep2Errors([]);
                            }}
                            className="control"
                            required
                            disabled={isBusy}
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
                            <option value="217">{dict.vehicles.vehicleTypeMotorcycle}</option>
                            <option value="457">{dict.vehicles.vehicleTypeSpecial}</option>
                            <option value="249">{dict.vehicles.vehicleTypeTruckTractor}</option>
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
                            <option value="585">{dict.vehicles.period15d}</option>
                            <option value="115">{dict.vehicles.period1m}</option>
                            <option value="287">{dict.vehicles.period2m}</option>
                            <option value="117">{dict.vehicles.period3m}</option>
                            <option value="119">{dict.vehicles.period6m}</option>
                            <option value="121">{dict.vehicles.period12m}</option>
                          </select>
                        </div>

                        <div className="field field--full mt-4">
                          <FilePickerPro
                            dict={dict}
                            id={`${uid}-vehicles_${idx}_techPassportFiles`}
                            name={`vehicles[${idx}][techPassportFiles]`}
                            label={dict.vehicles.techPassportFilesLabel}
                            required
                            multiple
                            accept={acceptDocs}
                            disabled={isBusy}
                            forbiddenTypes={forbiddenTypes}
                            valueFiles={techPassportFilesByIdx[idx] ?? []}
                            onChangeFiles={(files) => {
                              setTechPassportFilesByIdx((prev) => ({ ...prev, [idx]: files }));
                              setTimeout(() => refreshStep2Errors(), 0);
                            }}
                          />
                        </div>
                      </div>

                      <div className="gc-checkrow mt-4">
                        <input
                          id={`${uid}-driversLimited-${vehicleId}`}
                          type="checkbox"
                          name={`vehicles[${idx}][driversLimited]`}
                          checked={driversLimited}
                          disabled={isBusy}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setDriversLimitedByVehicleId((prev) => ({ ...prev, [vehicleId]: checked }));

                            if (!checked) {
                              setDriversByVehicleId((prev) => ({ ...prev, [vehicleId]: [] }));
                              setLicenseFilesByKey((prev) => {
                                const next = { ...prev };
                                Object.keys(next).forEach((k) => {
                                  if (k.startsWith(`${vehicleId}:`)) delete next[k];
                                });
                                return next;
                              });
                            }

                            setTimeout(() => refreshStep2Errors(), 0);
                          }}
                        />
                        <label htmlFor={`${uid}-driversLimited-${vehicleId}`} className="gc-checkrow__label">
                          {dict.vehicles.driversLimitedLabel}
                        </label>
                      </div>

                      {driversLimited && (
                        <div className="panel-muted mt-4">
                          <div className="row-between">
                            <p className="panel-muted__title">{dict.vehicles.driversTitle}</p>

                            <button type="button" className="btn btn-secondary" onClick={() => addDriver(vehicleId)} disabled={isBusy}>
                              {dict.vehicles.addDriverButton}
                            </button>
                          </div>

                          {drivers.length === 0 ? (
                            <p className="hint mt-4">{dict.vehicles.driversEmptyHint}</p>
                          ) : (
                            <div className="stack gap-14 mt-4">
                              {drivers.map((d, j) => {
                                const licenseKey = `${vehicleId}:${d.id}`;
                                return (
                                  <div key={d.id} className="card card--pad">
                                    <div className="row-between">
                                      <p className="card-title" style={{ margin: 0 }}>
                                        {dict.vehicles.driverBlockTitle} #{j + 1}
                                      </p>

                                      <button
                                        type="button"
                                        className={["link link--danger", isBusy ? "is-disabled" : ""].join(" ")}
                                        onClick={() => removeDriver(vehicleId, d.id)}
                                        disabled={isBusy}
                                      >
                                        {dict.vehicles.removeDriverButton} #{j + 1}
                                      </button>
                                    </div>

                                    <div className="grid grid-2 mt-4">
                                      <div className="field">
                                        <label htmlFor={`${uid}-vehicles_${idx}_drivers_${j}_fullName`} className="lbl">
                                          {dict.vehicles.driverFullName} #{j + 1}
                                          <RequiredMark />
                                        </label>
                                        <input
                                          id={`${uid}-vehicles_${idx}_drivers_${j}_fullName`}
                                          type="text"
                                          name={`vehicles[${idx}][drivers][${j}][fullName]`}
                                          className="control"
                                          disabled={isBusy}
                                          onChange={(e) => {
                                            e.currentTarget.value = formatPersonName(e.currentTarget.value);
                                            if (step2Errors.length) setStep2Errors([]);
                                          }}
                                          required
                                        />
                                      </div>

                                      <div className="field">
                                        <label htmlFor={`${uid}-vehicles_${idx}_drivers_${j}_experienceYears`} className="lbl">
                                          {dict.vehicles.driverExperienceYears}
                                          <RequiredMark />
                                        </label>
                                        <input
                                          id={`${uid}-vehicles_${idx}_drivers_${j}_experienceYears`}
                                          type="number"
                                          inputMode="numeric"
                                          min={0}
                                          step={1}
                                          name={`vehicles[${idx}][drivers][${j}][experienceYears]`}
                                          className="control"
                                          required
                                          disabled={isBusy}
                                          onChange={() => step2Errors.length && setStep2Errors([])}
                                        />
                                      </div>

                                      <div className="field field--full mt-4">
                                        <FilePickerPro
                                          dict={dict}
                                          id={`${uid}-vehicles_${idx}_drivers_${j}_licenseFiles`}
                                          name={`vehicles[${idx}][drivers][${j}][licenseFiles]`}
                                          label={`${dict.vehicles.driverLicenseFilesLabel} (#${j + 1})`}
                                          hint={dict.vehicles.driverLicenseHint}
                                          required
                                          multiple
                                          accept={acceptDocs}
                                          disabled={isBusy}
                                          forbiddenTypes={forbiddenTypes}
                                          valueFiles={licenseFilesByKey[licenseKey] ?? []}
                                          onChangeFiles={(files) => {
                                            setLicenseFilesByKey((prev) => ({ ...prev, [licenseKey]: files }));
                                            setTimeout(() => refreshStep2Errors(), 0);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {formStatus !== "idle" && (
                <div id={statusId} role="status" aria-live="polite" className={hasSuccess ? "status status--ok" : hasError ? "status status--err" : "status"}>
                  {formStatus === "loading" ? dict.loading : formMessage || dict.submit}
                </div>
              )}

              <div className="row-between mt-4 gc-actions">
                <button type="button" className={["btn btn-secondary", isBusy ? "is-disabled" : ""].join(" ")} onClick={goStep1} disabled={isBusy}>
                  ← {dict.buttons.back}
                </button>

                <div className="row-center gc-actions__right">
                  <button type="button" className={["btn btn-secondary", isBusy ? "is-disabled" : ""].join(" ")} onClick={handleAddVehicle} disabled={isBusy}>
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
                    {isBusy ? dict.loading : dict.submit}
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