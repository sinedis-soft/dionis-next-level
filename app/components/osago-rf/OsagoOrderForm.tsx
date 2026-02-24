// components/osago-rf/OsagoOrderForm.tsx
"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import type { OsagoRfFormDictionary } from "@/dictionaries/osagoRfForm";

// Имя/фамилия/отчество: кириллица + латиница, пробел, дефис, апостроф
function formatPersonName(raw: string): string {
  return raw.replace(/[^A-Za-z\u0400-\u04FF\s'-]/g, "");
}

// Маска телефона: только цифры, с плюсом в начале
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return "+" + digits;
}

// Маска e-mail
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
  return raw.replace(/\s/g, "").replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, maxLength);
}

type Props = { dict: OsagoRfFormDictionary };
type FormStatus = "idle" | "loading" | "success" | "error";
type Step = 1 | 2;

function RequiredMark() {
  return (
    <span className="text-red-500" aria-hidden="true">
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
    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
      <p className="text-sm font-semibold text-red-700">{title}</p>
      <ul className="mt-2 list-disc pl-5 text-sm text-red-700 space-y-1">
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
  const itemBase = "flex items-center gap-2 rounded-full px-3 py-1 text-xs sm:text-sm border transition";
  const active = "bg-[#1A3A5F] text-white border-[#1A3A5F]";
  const idle = "bg-white text-gray-700 border-gray-200 hover:border-gray-300";
  const disabled = "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed";

  return (
    <nav aria-label="Form steps" className="mb-5">
      <ol className="flex flex-wrap items-center justify-center gap-2">
        <li>
          <button
            type="button"
            className={[itemBase, step === 1 ? active : idle].join(" ")}
            onClick={onGoStep1}
            disabled={isBusy}
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[11px]">
              1
            </span>
            <span className="font-semibold">{labels.step1}</span>
          </button>
        </li>

        <li className="text-gray-300">→</li>

        <li>
          <button
            type="button"
            className={[itemBase, step === 2 ? active : canAttemptStep2 ? idle : disabled].join(" ")}
            onClick={() => {
              if (!canAttemptStep2) return;
              onGoStep2();
            }}
            disabled={isBusy || !canAttemptStep2}
            aria-disabled={isBusy || !canAttemptStep2}
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[11px]">
              2
            </span>
            <span className="font-semibold">{labels.step2}</span>
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

// водитель внутри ТС
type Driver = { id: number };

// Более выразительный файловый пикер: кнопка + список + очистка
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
        const forbidden = forbiddenTypes.some((t) => (t.endsWith("/") ? file.type.startsWith(t) : file.type === t));
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
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
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
        onChange={(e) => {
          const accepted = validateAndNormalize(e.currentTarget.files);
          // если часть файлов запрещена — accepted будет меньше, но мы всё равно сохраняем принятые
          onChangeFiles(accepted);
        }}
      />

      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <button
          type="button"
          className="btn btn-secondary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={openDialog}
          disabled={disabled}
        >
          {dict.filePicker.choose}
        </button>

        <div className="text-xs text-gray-600">
          {valueFiles.length > 0 ? (
            <span>
              {tpl(dict.filePicker.selectedCount, { count: String(valueFiles.length) })}
            </span>
          ) : (
            <span>{dict.filePicker.noFiles}</span>
          )}
        </div>

        {valueFiles.length > 0 && (
          <button
            type="button"
            className="text-xs text-red-600 underline underline-offset-2 w-full sm:w-auto text-left sm:text-center disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={clear}
            disabled={disabled}
          >
            {dict.filePicker.clear}
          </button>
        )}
      </div>

      {valueFiles.length > 0 && (
        <ul className="mt-2 rounded-lg border border-gray-200 bg-white p-3 text-xs text-gray-700 space-y-1">
          {valueFiles.map((f, i) => (
            <li key={`${f.name}-${f.size}-${i}`} className="break-words">
              {f.name}
            </li>
          ))}
        </ul>
      )}

      {hint ? <p className="mt-2 text-xs text-gray-500">{hint}</p> : null}
    </div>
  );
}

function toLocalDateString(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function OsagoOrderForm({ dict }: Props) {
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

  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formMessage, setFormMessage] = useState<string>("");

  // ошибки по шагам
  const [step1Errors, setStep1Errors] = useState<string[]>([]);
  const [step2Errors, setStep2Errors] = useState<string[]>([]);

  const formRef = useRef<HTMLFormElement | null>(null);
  const step1Ref = useRef<HTMLDivElement | null>(null);
  const step2Ref = useRef<HTMLDivElement | null>(null);

  // глобальный счётчик ID водителей (не state)
  const driverIdSeqRef = useRef(0);

  // файлы: храним отдельно (и синхронизируем с input через FileList нельзя — потому держим для UI и валидатора)
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

  const acceptDocs = useMemo(
    () =>
      "image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    []
  );

  const fieldClass = useMemo(
    () =>
      "w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white " +
      "focus:outline-none focus:ring-2 focus:ring-[#C89F4A] focus:border-[#C89F4A]",
    []
  );

  const getLabelForElement = useCallback((root: HTMLElement, el: Element): string => {
    const aria = (el as HTMLElement).getAttribute?.("aria-label")?.trim();
    if (aria) return aria;

    const id = (el as HTMLInputElement).id;
    if (id) {
      const lab = root.querySelector(`label[for="${CSS.escape(id)}"]`);
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
        // скрытые input[type=file] (у нас sr-only) валидировать нативно не надо — валидируем сами
        if (el instanceof HTMLInputElement && el.type === "file") return false;
        return true;
      });

      for (const el of fields) {
        if (!el.checkValidity()) {
          const label = getLabelForElement(root, el);
          errors.push(tpl(dict.errors.requiredField, { field: label }));
        }
      }

      // custom: паспорт (если физлицо и НЕ ручной ввод)
      if (s === 1 && !isCompany && !manualPassportEntry) {
        if (passportFiles.length === 0) {
          errors.push(tpl(dict.errors.requiredFiles, { field: dict.person.passportFilesLabel }));
        }
      }

      // custom: шаг 2 — техпаспорт на каждое ТС
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

        // custom: водительские права — если ограничение включено
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

  // add/remove vehicle
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

      // подчистим licenseFilesByKey
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

  // drivers
  const addDriver = useCallback((vehicleId: number) => {
    const newId = ++driverIdSeqRef.current;
    setDriversByVehicleId((prev) => {
      const list = prev[vehicleId] ?? [];
      return { ...prev, [vehicleId]: [...list, { id: newId }] };
    });
    if (step === 2) setTimeout(() => refreshStep2Errors(), 0);
  }, [refreshStep2Errors, step]);

  const removeDriver = useCallback((vehicleId: number, driverId: number) => {
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
  }, [refreshStep2Errors, step]);

  const statusId = "osago-rf-order-status";
  const hasError = formStatus === "error";
  const hasSuccess = formStatus === "success";

  // “мягкий” критерий для видимости шага 2 (но переход всё равно через collectStepErrors)
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

    // submit только на шаге 2
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

    setFormStatus("idle");
    setFormMessage("");
    setFormStatus("loading");

    try {
      const formEl = e.currentTarget;
      const fd = new FormData(formEl);

      // вручную добавляем выбранные файлы (т.к. у нас hidden file inputs и мы держим state)
      // паспорт
      passportFiles.forEach((f) => fd.append("person_passportFiles", f));

      // техпаспорта
      vehicleBlocks.forEach((_, idx) => {
        const key = `vehicles[${idx}][techPassportFiles]`;
        const files = techPassportFilesByIdx[idx] ?? [];
        files.forEach((f) => fd.append(key, f));
      });

      // водительские права
      vehicleBlocks.forEach((vehicleId, idx) => {
        const limited = Boolean(driversLimitedByVehicleId[vehicleId]);
        if (!limited) return;
        const drivers = driversByVehicleId[vehicleId] ?? [];
        drivers.forEach((d, j) => {
          const filesKey = `${vehicleId}:${d.id}`;
          const files = licenseFilesByKey[filesKey] ?? [];
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
    <section id="osago-rf-order" className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="card w-full bg-white px-6 sm:px-8 py-6 sm:py-8">
          <div className="mb-4 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A3A5F]">{dict.title}</h2>
            <p className="mt-1 text-sm text-gray-600">{dict.intro}</p>
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
            className="space-y-8"
            onSubmit={handleOrderSubmit}
            aria-describedby={formStatus !== "idle" ? statusId : undefined}
          >
            {/* ===================== STEP 1 ===================== */}
            <div ref={step1Ref} data-step="1" className={step === 1 ? "block" : "hidden"}>
              <ErrorSummary title={dict.errors.title} items={step1Errors} />

              {/* CONTACT + PERSON/COMPANY (объединено в один шаг) */}
              <div className="mt-4">
                <div className="mb-3">
                  <h3 className="text-base sm:text-lg font-bold text-[#C89F4A]">{dict.contact.legend}</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact_firstNameLat" className="block text-sm font-medium text-gray-700 mb-1">
                      {dict.contact.firstName}
                      <RequiredMark />
                    </label>
                    <input
                      id="contact_firstNameLat"
                      type="text"
                      name="contact_firstNameLat"
                      value={contactFirstNameLat}
                      onChange={(e) => {
                        setContactFirstNameLat(formatPersonName(e.target.value));
                        if (step1Errors.length) setStep1Errors([]);
                      }}
                      className={fieldClass}
                      required
                      disabled={isBusy}
                      autoComplete="given-name"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact_lastNameLat" className="block text-sm font-medium text-gray-700 mb-1">
                      {dict.contact.lastName}
                      <RequiredMark />
                    </label>
                    <input
                      id="contact_lastNameLat"
                      type="text"
                      name="contact_lastNameLat"
                      value={contactLastNameLat}
                      onChange={(e) => {
                        setContactLastNameLat(formatPersonName(e.target.value));
                        if (step1Errors.length) setStep1Errors([]);
                      }}
                      className={fieldClass}
                      required
                      disabled={isBusy}
                      autoComplete="family-name"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700 mb-1">
                      {dict.contact.phone}
                      <RequiredMark />
                    </label>
                    <input
                      id="contact_phone"
                      type="tel"
                      name="contact_phone"
                      value={contactPhone}
                      onChange={(e) => {
                        setContactPhone(formatPhone(e.target.value));
                        if (step1Errors.length) setStep1Errors([]);
                      }}
                      className={fieldClass}
                      required
                      disabled={isBusy}
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="+7 777 1234567"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-1">
                      {dict.contact.email}
                      <RequiredMark />
                    </label>
                    <input
                      id="contact_email"
                      type="email"
                      name="contact_email"
                      value={contactEmail}
                      onChange={(e) => {
                        setContactEmail(formatEmail(e.target.value));
                        if (step1Errors.length) setStep1Errors([]);
                      }}
                      className={fieldClass}
                      required
                      disabled={isBusy}
                      autoComplete="email"
                      inputMode="email"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2 text-xs text-gray-700">
                  <input
                    id="order-isCompany"
                    name="order_isCompany"
                    type="checkbox"
                    className="mt-0.5"
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
                  <label htmlFor="order-isCompany" className="font-bold">
                    {dict.contact.isCompanyLabel}
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-3">
                  <h3 className="text-base sm:text-lg font-bold text-[#C89F4A]">
                    {isCompany ? dict.company.legend : dict.person.legend}
                  </h3>
                </div>

                {isCompany ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company_inn" className="block text-sm font-medium text-gray-700 mb-1">
                        {dict.company.bin}
                        <RequiredMark />
                      </label>
                      <input
                        id="company_inn"
                        type="text"
                        name="company_inn"
                        className={fieldClass}
                        required
                        disabled={isBusy}
                        onChange={() => step1Errors.length && setStep1Errors([])}
                      />
                    </div>

                    <div>
                      <label htmlFor="company_email" className="block text-sm font-medium text-gray-700 mb-1">
                        {dict.company.email}
                        <RequiredMark />
                      </label>
                      <input
                        id="company_email"
                        type="email"
                        name="company_email"
                        className={fieldClass}
                        required
                        disabled={isBusy}
                        onChange={() => step1Errors.length && setStep1Errors([])}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-3 flex items-start gap-2 text-xs text-gray-700">
                      <input
                        id="manual-passport-entry"
                        name="manualPassportEntry"
                        type="checkbox"
                        className="mt-0.5"
                        checked={manualPassportEntry}
                        disabled={isBusy}
                        onChange={(e) => {
                          setManualPassportEntry(e.target.checked);
                          setStep1Errors([]);
                          setTimeout(() => refreshStep1Errors(), 0);
                        }}
                      />
                      <label htmlFor="manual-passport-entry" className="font-semibold">
                        {dict.person.manualPassportEntryLabel}
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="person_country" className="block text-sm font-medium text-gray-700 mb-1">
                          {dict.person.countryLabel}
                          <RequiredMark />
                        </label>
                        <select
                          id="person_country"
                          name="person_country"
                          className={fieldClass}
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

                      <div>
                        <label htmlFor="person_address" className="block text-sm font-medium text-gray-700 mb-1">
                          {dict.person.address}
                          <RequiredMark />
                        </label>
                        <input
                          id="person_address"
                          type="text"
                          name="person_address"
                          className={fieldClass}
                          required
                          disabled={isBusy}
                          onChange={() => step1Errors.length && setStep1Errors([])}
                        />
                      </div>
                    </div>

                    {!manualPassportEntry ? (
                      <div className="mt-4">
                        <FilePickerPro
                          dict={dict}
                          id="person_passportFiles"
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
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="person_gender" className="block text-sm font-medium text-gray-700 mb-1">
                            {dict.person.gender}
                            <RequiredMark />
                          </label>
                          <select
                            id="person_gender"
                            name="person_gender"
                            className={fieldClass}
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

                        <div>
                          <label htmlFor="person_middleName" className="block text-sm font-medium text-gray-700 mb-1">
                            {dict.person.middleName}
                          </label>
                          <input
                            id="person_middleName"
                            type="text"
                            name="person_middleName"
                            value={personMiddleName}
                            onChange={(e) => {
                              setPersonMiddleName(formatPersonName(e.target.value));
                              if (step1Errors.length) setStep1Errors([]);
                            }}
                            className={fieldClass}
                            disabled={isBusy}
                          />
                        </div>

                        <div>
                          <label htmlFor="person_birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                            {dict.person.birthDate}
                            <RequiredMark />
                          </label>
                          <input
                            id="person_birthDate"
                            type="date"
                            name="person_birthDate"
                            max={maxBirthDate}
                            className={fieldClass}
                            required
                            disabled={isBusy}
                            onChange={() => step1Errors.length && setStep1Errors([])}
                          />
                        </div>

                        <div>
                          <label htmlFor="person_passportNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            {dict.person.passportNumber}
                            <RequiredMark />
                          </label>
                          <input
                            id="person_passportNumber"
                            type="text"
                            name="person_passportNumber"
                            value={passportNumber}
                            onChange={(e) => {
                              setPassportNumber(formatLatinAlnum(e.target.value, 20));
                              if (step1Errors.length) setStep1Errors([]);
                            }}
                            className={fieldClass}
                            required
                            disabled={isBusy}
                          />
                        </div>

                        <div>
                          <label htmlFor="person_passportIssuer" className="block text-sm font-medium text-gray-700 mb-1">
                            {dict.person.passportIssuer}
                            <RequiredMark />
                          </label>
                          <input
                            id="person_passportIssuer"
                            type="text"
                            name="person_passportIssuer"
                            className={fieldClass}
                            required
                            disabled={isBusy}
                            onChange={() => step1Errors.length && setStep1Errors([])}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="person_passportIssuedAt"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            {dict.person.passportIssuedAt}
                            <RequiredMark />
                          </label>
                          <input
                            id="person_passportIssuedAt"
                            type="date"
                            name="person_passportIssuedAt"
                            max={maxPassDate}
                            className={fieldClass}
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

              {/* Навигация шага 1 */}
              <div className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
                <button
                  type="button"
                  className="btn w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
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
            <div ref={step2Ref} data-step="2" className={step === 2 ? "block" : "hidden"}>
              <ErrorSummary title={dict.errors.title} items={step2Errors} />

              <div className="mt-4">
                <div className="mb-3">
                  <h3 className="text-base sm:text-lg font-bold text-[#C89F4A]">{dict.vehicles.legend}</h3>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <p className="text-xs text-gray-600">{dict.vehicles.description}</p>

                  <button
                    type="button"
                    className="text-xs sm:text-sm text-[#23376c] underline underline-offset-2 hover:opacity-80"
                    onClick={handleAddVehicle}
                    disabled={isBusy}
                  >
                    {dict.vehicles.addButton}
                  </button>
                </div>

                <div className="mt-4 space-y-6">
                  {vehicleBlocks.map((vehicleId, idx) => {
                    const driversLimited = Boolean(driversLimitedByVehicleId[vehicleId]);
                    const drivers = driversByVehicleId[vehicleId] ?? [];

                    return (
                      <div key={vehicleId} className="rounded-xl border border-gray-200 bg-white p-4">
                        <div className="flex justify-between items-center mb-3">
                          <p className="text-xs font-semibold text-gray-500">
                            {dict.vehicles.blockTitle} #{idx + 1}
                          </p>

                          {vehicleBlocks.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveVehicle(vehicleId)}
                              className="text-xs text-red-500 underline underline-offset-2"
                              disabled={isBusy}
                            >
                              {dict.vehicles.removeButton}
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor={`vehicles_${idx}_plate`} className="block text-sm font-medium text-gray-700 mb-1">
                              {dict.vehicles.plate}
                              <RequiredMark />
                            </label>
                            <input
                              id={`vehicles_${idx}_plate`}
                              type="text"
                              name={`vehicles[${idx}][plate]`}
                              onChange={(e) => {
                                e.currentTarget.value = formatLatinAlnum(e.currentTarget.value, 12);
                                if (step2Errors.length) setStep2Errors([]);
                              }}
                              className={fieldClass}
                              required
                              disabled={isBusy}
                            />
                          </div>

                          <div>
                            <label htmlFor={`vehicles_${idx}_type`} className="block text-sm font-medium text-gray-700 mb-1">
                              {dict.vehicles.vehicleTypeLabel}
                              <RequiredMark />
                            </label>
                            <select
                              id={`vehicles_${idx}_type`}
                              name={`vehicles[${idx}][type]`}
                              className={fieldClass}
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

                          <div>
                            <label htmlFor={`vehicles_${idx}_startDate`} className="block text-sm font-medium text-gray-700 mb-1">
                              {dict.vehicles.startDate}
                              <RequiredMark />
                            </label>
                            <input
                              id={`vehicles_${idx}_startDate`}
                              type="date"
                              name={`vehicles[${idx}][startDate]`}
                              min={minStartDate}
                              className={fieldClass}
                              required
                              disabled={isBusy}
                              onChange={() => step2Errors.length && setStep2Errors([])}
                            />
                          </div>

                          <div>
                            <label htmlFor={`vehicles_${idx}_period`} className="block text-sm font-medium text-gray-700 mb-1">
                              {dict.vehicles.periodLabel}
                              <RequiredMark />
                            </label>
                            <select
                              id={`vehicles_${idx}_period`}
                              name={`vehicles[${idx}][period]`}
                              className={fieldClass}
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
                        </div>

                        <div className="mt-4">
                          <FilePickerPro
                            dict={dict}
                            id={`vehicles_${idx}_techPassportFiles`}
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

                        <div className="mt-4 flex items-start gap-2 text-xs text-gray-700">
                          <input
                            id={`driversLimited-${vehicleId}`}
                            type="checkbox"
                            name={`vehicles[${idx}][driversLimited]`}
                            className="mt-0.5"
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
                          <label htmlFor={`driversLimited-${vehicleId}`}>{dict.vehicles.driversLimitedLabel}</label>
                        </div>

                        {driversLimited && (
                          <div className="mt-6 rounded-lg border border-gray-100 bg-gray-50 p-4">
                            <div className="flex items-center justify-between gap-3">
                              <p className="text-sm font-semibold text-gray-800">{dict.vehicles.driversTitle}</p>

                              <button
                                type="button"
                                className="btn btn-secondary w-full sm:w-auto"
                                onClick={() => addDriver(vehicleId)}
                                disabled={isBusy}
                              >
                                {dict.vehicles.addDriverButton}
                              </button>
                            </div>

                            {drivers.length === 0 ? (
                              <p className="mt-3 text-xs text-gray-600">{dict.vehicles.driversEmptyHint}</p>
                            ) : (
                              <div className="mt-4 space-y-4">
                                {drivers.map((d, j) => {
                                  const licenseKey = `${vehicleId}:${d.id}`;
                                  return (
                                    <div key={d.id} className="rounded-lg bg-white border border-gray-200 p-4">
                                      <div className="flex items-center justify-between">
                                        <p className="text-sm font-semibold text-gray-700">
                                          {dict.vehicles.driverBlockTitle} #{j + 1}
                                        </p>

                                        <button
                                          type="button"
                                          className="text-xs text-red-600 underline underline-offset-2"
                                          onClick={() => removeDriver(vehicleId, d.id)}
                                          disabled={isBusy}
                                        >
                                          {dict.vehicles.removeDriverButton} #{j + 1}
                                        </button>
                                      </div>

                                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                          <label
                                            htmlFor={`vehicles_${idx}_drivers_${j}_fullName`}
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                          >
                                            {dict.vehicles.driverFullName} #{j + 1}
                                            <RequiredMark />
                                          </label>
                                          <input
                                            id={`vehicles_${idx}_drivers_${j}_fullName`}
                                            type="text"
                                            name={`vehicles[${idx}][drivers][${j}][fullName]`}
                                            className={fieldClass}
                                            disabled={isBusy}
                                            onChange={(e) => {
                                              e.currentTarget.value = formatPersonName(e.currentTarget.value);
                                              if (step2Errors.length) setStep2Errors([]);
                                            }}
                                            required
                                          />
                                        </div>

                                        <div>
                                          <label
                                            htmlFor={`vehicles_${idx}_drivers_${j}_experienceYears`}
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                          >
                                            {dict.vehicles.driverExperienceYears}
                                            <RequiredMark />
                                          </label>
                                          <input
                                            id={`vehicles_${idx}_drivers_${j}_experienceYears`}
                                            type="number"
                                            inputMode="numeric"
                                            min={0}
                                            step={1}
                                            name={`vehicles[${idx}][drivers][${j}][experienceYears]`}
                                            className={fieldClass}
                                            required
                                            disabled={isBusy}
                                            onChange={() => step2Errors.length && setStep2Errors([])}
                                          />
                                        </div>

                                        <div className="sm:col-span-2">
                                          <FilePickerPro
                                            dict={dict}
                                            id={`vehicles_${idx}_drivers_${j}_licenseFiles`}
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
                  <div
                    id={statusId}
                    role="status"
                    aria-live="polite"
                    className={
                      hasSuccess
                        ? "text-sm text-green-700"
                        : hasError
                        ? "text-sm text-red-600"
                        : "text-sm text-gray-600"
                    }
                  >
                    {formStatus === "loading" ? dict.loading : formMessage || dict.submit}
                  </div>
                )}

                <div className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <button
                    type="button"
                    className="btn btn-secondary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={goStep1}
                    disabled={isBusy}
                  >
                    ← {dict.buttons.back}
                  </button>

                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      className="btn btn-secondary w-full sm:w-auto"
                      onClick={handleAddVehicle}
                      disabled={isBusy}
                    >
                      {dict.vehicles.addButton}
                    </button>

                    <button
                      type="submit"
                      className="btn w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
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
      </div>
    </section>
  );
}