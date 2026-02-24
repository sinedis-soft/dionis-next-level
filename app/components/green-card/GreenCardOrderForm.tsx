// app/components/green-card/GreenCardOrderForm.tsx
"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { GreenCardFormDictionary } from "@/dictionaries/greenCardForm";
import FilePicker from "@/components/FilePicker";

// Маска: только латиница, пробел, дефис, апостроф
function formatLatinName(raw: string): string {
  return raw.replace(/[^A-Za-z\s'-]/g, "");
}

// Маска телефона: только цифры, с плюсом в начале
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return "+" + digits;
}

// Маска e-mail:
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

// Маска для "Индивидуальный номер (ИИН и т.п.)"
function formatIdNumber(raw: string): string {
  return raw.replace(/\s/g, "").replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 20);
}

function formatLatinAlnum(raw: string, maxLength = 20): string {
  return raw.replace(/\s/g, "").replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, maxLength);
}

type Props = {
  dict: GreenCardFormDictionary;
};

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

export function GreenCardOrderForm({ dict }: Props) {
  const [step, setStep] = useState<Step>(1);

  const [isCompany, setIsCompany] = useState(false);
  // ✅ по умолчанию: НЕ ручной ввод → просим фото паспорта
  const [manualEntry, setManualEntry] = useState(false);

  const [vehicleBlocks, setVehicleBlocks] = useState<number[]>([0]);

  const [contactFirstNameLat, setContactFirstNameLat] = useState("");
  const [contactLastNameLat, setContactLastNameLat] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const [personIdNumber, setPersonIdNumber] = useState("");
  const [passportNumber, setPassportNumber] = useState("");

  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formMessage, setFormMessage] = useState<string>("");

  // ✅ ошибки по шагам (списком)
  const [step1Errors, setStep1Errors] = useState<string[]>([]);
  const [step2Errors, setStep2Errors] = useState<string[]>([]);

  const formRef = useRef<HTMLFormElement | null>(null);
  const step1Ref = useRef<HTMLDivElement | null>(null);
  const step2Ref = useRef<HTMLDivElement | null>(null);

  const today = useMemo(() => new Date(), []);
  const minAgeDate = useMemo(() => new Date(today.getTime() - 6570 * 24 * 60 * 60 * 1000), [today]);
  const maxBirthDate = useMemo(() => minAgeDate.toISOString().split("T")[0], [minAgeDate]);
  const maxIssuedDate = useMemo(() => today.toISOString().split("T")[0], [today]);
  const minStartDate = useMemo(() => today.toISOString().split("T")[0], [today]);

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

  const fieldClass = useMemo(
    () =>
      "w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white " +
      "focus:outline-none focus:ring-2 focus:ring-[#C89F4A] focus:border-[#C89F4A]",
    []
  );

  const validateFiles = useCallback(
    (files: FileList): boolean => {
      let ok = true;

      Array.from(files).forEach((file) => {
        const forbidden = forbiddenTypes.some((t) => (t.endsWith("/") ? file.type.startsWith(t) : file.type === t));
        if (forbidden) {
          ok = false;
          alert(`${file.name}: ${dict.fileForbidden}`);
        }
      });

      return ok;
    },
    [dict.fileForbidden, forbiddenTypes]
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

    // fallback: name (но в норме не понадобится, т.к. всем полям даём id+htmlFor)
    const name = (el as HTMLInputElement).getAttribute?.("name")?.trim();
    if (name) return name;

    return "Field";
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
        return true;
      });

      for (const el of fields) {
        if (!el.checkValidity()) {
          const label = getLabelForElement(root, el);
          errors.push(tpl(dict.errors.requiredField, { field: label }));
        }
      }

      // Паспортные файлы на шаге 1, если не company и не manualEntry
      if (s === 1 && !isCompany && !manualEntry) {
        const formEl = formRef.current;
        if (formEl) {
          const fd = new FormData(formEl);
          const vals = fd.getAll("person_passportFiles");
          const hasFiles = vals.some((v) => v instanceof File && (v as File).size > 0);
          if (!hasFiles) {
            errors.push(tpl(dict.errors.requiredFiles, { field: dict.passportFilesLabel }));
          }
        }
      }

      // Техпаспорта на шаге 2 по каждому ТС
      if (s === 2) {
        const formEl = formRef.current;
        if (formEl) {
          const fd = new FormData(formEl);
          vehicleBlocks.forEach((_, idx) => {
            const key = `vehicles[${idx}][techPassportFiles]`;
            const vals = fd.getAll(key);
            const hasFiles = vals.some((v) => v instanceof File && (v as File).size > 0);
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
    [dict, getLabelForElement, isCompany, manualEntry, vehicleBlocks]
  );

  const refreshStep1Errors = useCallback(() => {
    const errs = collectStepErrors(1);
    setStep1Errors(errs);
  }, [collectStepErrors]);

  const refreshStep2Errors = useCallback(() => {
    const errs = collectStepErrors(2);
    setStep2Errors(errs);
  }, [collectStepErrors]);

  const handleAddVehicle = useCallback(() => {
    setVehicleBlocks((prev) => {
      const lastId = prev.length ? prev[prev.length - 1] : 0;
      return [...prev, lastId + 1];
    });

    // если мы уже на шаге 2 — пересчитать ошибки после добавления блока
    if (step === 2) {
      setTimeout(() => refreshStep2Errors(), 0);
    }
  }, [refreshStep2Errors, step]);

  const handleRemoveVehicle = useCallback(
    (id: number) => {
      setVehicleBlocks((prev) => {
        if (prev.length === 1) return prev;
        return prev.filter((vId) => vId !== id);
      });

      if (step === 2) {
        setTimeout(() => refreshStep2Errors(), 0);
      }
    },
    [refreshStep2Errors, step]
  );

  const goStep1 = useCallback(() => {
    if (formStatus === "loading") return;
    setStep(1);
    setStep2Errors([]);
    setTimeout(() => step1Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }, [formStatus]);

  const goStep2 = useCallback(() => {
    if (formStatus === "loading") return;

    const errs = collectStepErrors(1);
    if (errs.length) {
      setStep1Errors(errs);
      setStep(1);
      setTimeout(() => step1Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      return;
    }

    setStep1Errors([]);
    setStep(2);
    // на входе шага 2 сразу показываем его ошибки (чтобы "как на шаге 1")
    setTimeout(() => {
      step2Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      refreshStep2Errors();
    }, 50);
  }, [collectStepErrors, formStatus, refreshStep2Errors]);

  const handleNext = useCallback(() => {
    goStep2();
  }, [goStep2]);

  const handlePrev = useCallback(() => {
    goStep1();
  }, [goStep1]);

  const handleOrderSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (formStatus === "loading") return;

      // если вдруг submit на шаге 1 — пробуем перейти на шаг 2
      if (step !== 2) {
        goStep2();
        return;
      }

      // финальная проверка шага 2
      const errs2 = collectStepErrors(2);
      if (errs2.length) {
        setStep2Errors(errs2);
        setTimeout(() => step2Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
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

        if (typeof window !== "undefined") {
          try {
            fd.append("pageUrl", window.location.href);
            const utm = localStorage.getItem("utm_data");
            if (utm) fd.append("utm", utm);
          } catch {
            // ignore
          }
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

        // reset
        formEl.reset();
        setContactFirstNameLat("");
        setContactLastNameLat("");
        setContactPhone("");
        setContactEmail("");
        setPersonIdNumber("");
        setPassportNumber("");
        setVehicleBlocks([0]);
        setIsCompany(false);
        setManualEntry(false);
        setStep1Errors([]);
        setStep2Errors([]);
        setStep(1);
      } catch (err) {
        console.error("GREEN CARD ORDER ERROR:", err);
        setFormStatus("error");
        setFormMessage("Ошибка на сервере при отправке заявки на Зеленую карту");
      }
    },
    [collectStepErrors, dict.successMessage, formStatus, goStep2, step]
  );

  const statusId = "green-card-order-status";
  const hasError = formStatus === "error";
  const hasSuccess = formStatus === "success";
  const isBusy = formStatus === "loading";

  const canAttemptStep2 = useMemo(() => {
    if (!contactFirstNameLat.trim()) return false;
    if (!contactLastNameLat.trim()) return false;
    if (!contactPhone.trim()) return false;
    if (!contactEmail.trim()) return false;
    return true;
  }, [contactFirstNameLat, contactLastNameLat, contactPhone, contactEmail]);

  return (
    <section id="green-card-order" className="py-12 sm:py-16 bg-white">
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

              {/* ========== CONTACT ========== */}
              <div className="mb-6 mt-4">
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
                        setContactFirstNameLat(formatLatinName(e.target.value));
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
                        setContactLastNameLat(formatLatinName(e.target.value));
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
                      if (checked) setManualEntry(false);
                      setStep1Errors([]);
                      // сразу обновим ошибки, если пользователь кликает туда-сюда
                      setTimeout(() => refreshStep1Errors(), 0);
                    }}
                  />
                  <label htmlFor="order-isCompany" className="font-bold">
                    {dict.contact.isCompanyLabel}
                  </label>
                </div>
              </div>

              {/* ========== PERSON / COMPANY ========== */}
              <div>
                <div className="mb-3">
                  <h3 className="text-base sm:text-lg font-bold text-[#C89F4A]">
                    {isCompany ? dict.company.legend : dict.person.legend}
                  </h3>
                </div>

                {isCompany ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company_bin" className="block text-sm font-medium text-gray-700 mb-1">
                        {dict.company.bin}
                        <RequiredMark />
                      </label>
                      <input
                        id="company_bin"
                        type="text"
                        name="company_bin"
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
                    <div className="mb-3 flex items-start gap-2 text-xs text-gray-600">
                      <input
                        id="person-manualEntry"
                        name="person_manualEntry"
                        type="checkbox"
                        className="mt-0.5"
                        checked={manualEntry}
                        disabled={isBusy}
                        onChange={(e) => {
                          setManualEntry(e.target.checked);
                          setStep1Errors([]);
                          setTimeout(() => refreshStep1Errors(), 0);
                        }}
                      />
                      <label htmlFor="person-manualEntry" className="font-bold">
                        {dict.manualEntryLabel}
                      </label>
                    </div>

                    {!manualEntry ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="person_gender_auto" className="block text-sm font-medium text-gray-700 mb-1">
                            {dict.person.gender}
                            <RequiredMark />
                          </label>
                          <select
                            id="person_gender_auto"
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
                          <label htmlFor="person_address_auto" className="block text-sm font-medium text-gray-700 mb-1">
                            {dict.person.address}
                            <RequiredMark />
                          </label>
                          <input
                            id="person_address_auto"
                            type="text"
                            name="person_address"
                            className={fieldClass}
                            required
                            disabled={isBusy}
                            onChange={() => step1Errors.length && setStep1Errors([])}
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <FilePicker
                            id="person_passportFiles"
                            name="person_passportFiles"
                            label={dict.passportFilesLabel}
                            required
                            multiple
                            disabled={isBusy}
                            accept="image/*,application/pdf"
                            onValidate={(files) => {
                              const ok = validateFiles(files);
                              // если ок — обновим ошибки шага 1, чтобы убрать "Не загружено"
                              setTimeout(() => refreshStep1Errors(), 0);
                              return ok;
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="person_middleName" className="block text-sm font-medium text-gray-700 mb-1">
                              {dict.person.middleName}
                            </label>
                            <input
                              id="person_middleName"
                              type="text"
                              name="person_middleName"
                              className={fieldClass}
                              disabled={isBusy}
                            />
                          </div>

                          <div>
                            <label htmlFor="person_gender_manual" className="block text-sm font-medium text-gray-700 mb-1">
                              {dict.person.gender}
                              <RequiredMark />
                            </label>
                            <select
                              id="person_gender_manual"
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
                            <label htmlFor="person_idNumber" className="block text-sm font-medium text-gray-700 mb-1">
                              {dict.person.idNumber}
                              <RequiredMark />
                            </label>
                            <input
                              id="person_idNumber"
                              type="text"
                              name="person_idNumber"
                              value={personIdNumber}
                              onChange={(e) => {
                                setPersonIdNumber(formatIdNumber(e.target.value));
                                if (step1Errors.length) setStep1Errors([]);
                              }}
                              className={fieldClass}
                              required
                              disabled={isBusy}
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label htmlFor="person_address_manual" className="block text-sm font-medium text-gray-700 mb-1">
                              {dict.person.address}
                              <RequiredMark />
                            </label>
                            <input
                              id="person_address_manual"
                              type="text"
                              name="person_address"
                              className={fieldClass}
                              required
                              disabled={isBusy}
                              onChange={() => step1Errors.length && setStep1Errors([])}
                            />
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            <label htmlFor="person_passportIssuedAt" className="block text-sm font-medium text-gray-700 mb-1">
                              {dict.person.passportIssuedAt}
                              <RequiredMark />
                            </label>
                            <input
                              id="person_passportIssuedAt"
                              type="date"
                              name="person_passportIssuedAt"
                              max={maxIssuedDate}
                              className={fieldClass}
                              required
                              disabled={isBusy}
                              onChange={() => step1Errors.length && setStep1Errors([])}
                            />
                          </div>

                          <div>
                            <label htmlFor="person_passportValidTo" className="block text-sm font-medium text-gray-700 mb-1">
                              {dict.person.passportValidTo}
                              <RequiredMark />
                            </label>
                            <input
                              id="person_passportValidTo"
                              type="date"
                              name="person_passportValidTo"
                              min={minStartDate}
                              className={fieldClass}
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

              <div className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
                <button
                  type="button"
                  className="btn w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={() => {
                    // при клике "Далее" сразу показываем все ошибки шага 1
                    const errs = collectStepErrors(1);
                    if (errs.length) {
                      setStep1Errors(errs);
                      setTimeout(() => step1Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
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
                  {vehicleBlocks.map((id, idx) => (
                    <div key={id} className="rounded-xl border border-gray-200 bg-white p-4">
                      <div className="flex justify-between items-center mb-3">
                        <p className="text-xs font-semibold text-gray-500">
                          {dict.vehicles.blockTitle} #{idx + 1}
                        </p>

                        {vehicleBlocks.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveVehicle(id)}
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
                            <option value="251">{dict.vehicles.vehicleTypeTrailer}</option>
                            <option value="217">{dict.vehicles.vehicleTypeMotorcycle}</option>
                            <option value="457">{dict.vehicles.vehicleTypeSpecial}</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor={`insurance_territory_${idx}`} className="block text-sm font-medium text-gray-700 mb-1">
                            {dict.insurance.territoryLabel}
                            <RequiredMark />
                          </label>
                          {/* оставляем name один (как у тебя), но id делаем уникальным на блок */}
                          <select
                            id={`insurance_territory_${idx}`}
                            name="insurance_territory"
                            className={fieldClass}
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
                            <option value="115">{dict.vehicles.period1m}</option>
                            <option value="117">{dict.vehicles.period3m}</option>
                            <option value="119">{dict.vehicles.period6m}</option>
                            <option value="121">{dict.vehicles.period12m}</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-4">
                        <FilePicker
                          id={`vehicles_${idx}_techPassportFiles`}
                          name={`vehicles[${idx}][techPassportFiles]`}
                          label={dict.vehicles.techPassportFilesLabel}
                          required
                          multiple
                          disabled={isBusy}
                          accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          onValidate={(files) => {
                            const ok = validateFiles(files);
                            // пересчитать ошибки шага 2, чтобы убрать "Не загружено"
                            setTimeout(() => refreshStep2Errors(), 0);
                            return ok;
                          }}
                        />
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
                        ? "text-sm text-green-700"
                        : hasError
                        ? "text-sm text-red-600"
                        : "text-sm text-gray-600"
                    }
                  >
                    {formStatus === "loading" ? "Отправка..." : formMessage}
                  </div>
                )}

                <div className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <button
                    type="button"
                    className="btn btn-secondary w-full sm:w-auto"
                    onClick={handlePrev}
                    disabled={isBusy}
                  >
                    ← {dict.prevStep}
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
                        // при клике "Отправить" — сразу покажем весь список ошибок шага 2
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
      </div>
    </section>
  );
}