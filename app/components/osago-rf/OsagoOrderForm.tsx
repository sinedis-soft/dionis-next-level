// components/osago-rf/OsagoOrderForm.tsx
"use client";

import React, { useMemo, useRef, useState } from "react";
import { CountrySelect } from "@/data/CountrySelect";
import type { OsagoRfFormDictionary } from "@/dictionaries/osagoRfForm";

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

// Маска для "Индивидуальный номер (ИИН и т.п.)"
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

type Props = { dict: OsagoRfFormDictionary };

type FormStatus = "idle" | "loading" | "success" | "error";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function RequiredMark() {
  return (
    <span className="text-red-500" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

export function OsagoOrderForm({ dict }: Props) {
  const [isCompany, setIsCompany] = useState(false);
  const [vehicleBlocks, setVehicleBlocks] = useState<number[]>([0]);

  const [contactFirstNameLat, setContactFirstNameLat] = useState("");
  const [contactLastNameLat, setContactLastNameLat] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [personIdNumber, setPersonIdNumber] = useState("");
  const [passportNumber, setPassportNumber] = useState("");

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formMessage, setFormMessage] = useState<string>("");

  const formRef = useRef<HTMLFormElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);

  const HEADER_OFFSET = 88;

  function scrollToTopAnchor() {
    const el = topRef.current;
    if (!el) return;

    const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const top = el.getBoundingClientRect().top + window.scrollY;
        const y = Math.max(0, top - HEADER_OFFSET);
        window.scrollTo({ top: y, behavior });
      });
    });
  }

  function goToStep(next: 1 | 2 | 3) {
    setStep(next);
    scrollToTopAnchor();
  }

  const today = new Date();
  const minStartDate = today.toISOString().split("T")[0];

  const forbiddenTypes = [
    "application/zip",
    "application/x-rar-compressed",
    "application/x-7z-compressed",
    "application/x-tar",
    "audio/",
    "video/",
  ];

  const fieldClass = useMemo(
    () =>
      "w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white " +
      "focus:outline-none focus:ring-2 focus:ring-[#C89F4A] focus:border-[#C89F4A]",
    []
  );

  function validateStep(stepToValidate: 1 | 2 | 3): boolean {
    if (!formRef.current) return true;

    const root = formRef.current.querySelector(
      `[data-step="${stepToValidate}"]`
    ) as HTMLElement | null;

    if (!root) return true;

    const elements = root.querySelectorAll<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >("input, select, textarea");

    for (const el of Array.from(elements)) {
      if (el.offsetParent === null) continue;

      if (!el.checkValidity()) {
        el.reportValidity();
        el.focus();
        return false;
      }
    }
    return true;
  }

  function validateFiles(files: FileList): File[] {
    const accepted: File[] = [];

    Array.from(files).forEach((file) => {
      if (
        forbiddenTypes.some((t) =>
          t.endsWith("/") ? file.type.startsWith(t) : file.type === t
        )
      ) {
        alert(`${file.name}: ${dict.fileForbidden}`);
        return;
      }
      accepted.push(file);
    });

    return accepted;
  }

  function handleAddVehicle() {
    setVehicleBlocks((prev) => {
      const lastId = prev.length ? prev[prev.length - 1] : 0;
      return [...prev, lastId + 1];
    });
  }

  function handleRemoveVehicle(id: number) {
    setVehicleBlocks((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((vId) => vId !== id);
    });
  }

  async function handleOrderSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formStatus === "loading") return;

    setFormStatus("idle");
    setFormMessage("");

    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) return;

    setFormStatus("loading");

    try {
      const formEl = e.currentTarget;
      const formData = new FormData(formEl);

      // URL + UTM
      if (typeof window !== "undefined") {
        try {
          formData.append("pageUrl", window.location.href);
          const utm = localStorage.getItem("utm_data");
          if (utm) formData.append("utm", utm);
        } catch {
          // ignore
        }
      }

      const res = await fetch("/api/osago-rf-order", {
        method: "POST",
        body: formData,
      });

      const data: unknown = await res.json().catch(() => null);
      const ok = Boolean((data as { ok?: boolean } | null)?.ok);
      const message = (data as { message?: string } | null)?.message;

      if (!res.ok || !ok) {
        setFormStatus("error");
        setFormMessage(message || "Ошибка при отправке заявки на ОСАГО РФ");
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
      setStep(1);
    } catch (err) {
      console.error("OSAGO RF ORDER ERROR:", err);
      setFormStatus("error");
      setFormMessage("Ошибка на сервере при отправке заявки на ОСАГО РФ");
    }
  }

  const statusId = "osago-rf-order-status";
  const hasError = formStatus === "error";
  const hasSuccess = formStatus === "success";

  return (
    <section id="osago-rf-order" className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div ref={topRef} />

        <div className="card w-full bg-white px-6 sm:px-8 py-6 sm:py-8">
          <div className="mb-6 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A3A5F]">
              {dict.title}
            </h2>
            <p className="mt-1 text-sm text-gray-600">{dict.intro}</p>
          </div>

          <form
            ref={formRef}
            className="space-y-4"
            onSubmit={handleOrderSubmit}
            aria-describedby={formStatus !== "idle" ? statusId : undefined}
          >
            {/* STEP 1: CONTACT */}
            <div data-step="1" className={step !== 1 ? "hidden" : ""}>
              <div className="mb-3">
                <h3 className="text-base sm:text-lg font-bold text-[#C89F4A]">
                  {dict.contact.legend}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dict.contact.firstName}
                    <RequiredMark />
                  </label>
                  <input
                    type="text"
                    name="contact_firstNameLat"
                    value={contactFirstNameLat}
                    onChange={(e) =>
                      setContactFirstNameLat(formatLatinName(e.target.value))
                    }
                    className={fieldClass}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dict.contact.lastName}
                    <RequiredMark />
                  </label>
                  <input
                    type="text"
                    name="contact_lastNameLat"
                    value={contactLastNameLat}
                    onChange={(e) =>
                      setContactLastNameLat(formatLatinName(e.target.value))
                    }
                    className={fieldClass}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dict.contact.phone}
                    <RequiredMark />
                  </label>
                  <input
                    type="tel"
                    name="contact_phone"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(formatPhone(e.target.value))}
                    className={fieldClass}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dict.contact.email}
                    <RequiredMark />
                  </label>
                  <input
                    type="email"
                    name="contact_email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(formatEmail(e.target.value))}
                    className={fieldClass}
                    required
                  />
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2 text-xs text-gray-600">
                <input
                  id="order-isCompany"
                  name="order-isCompany"
                  type="checkbox"
                  className="mt-0.5"
                  checked={isCompany}
                  onChange={(e) => setIsCompany(e.target.checked)}
                />
                <label htmlFor="order-isCompany">{dict.contact.isCompanyLabel}</label>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  className="btn btn-secondary w-full sm:w-auto"
                  onClick={() => {
                    if (!validateStep(1)) return;
                    goToStep(2);
                  }}
                  disabled={formStatus === "loading"}
                >
                  {"Далее"}
                </button>
              </div>
            </div>

            {/* STEP 2: COMPANY or PERSON */}
            <div data-step="2" className={step !== 2 ? "hidden" : ""}>
              <div className="mb-3">
                <h3 className="text-base sm:text-lg font-bold text-[#C89F4A]">
                  {isCompany ? dict.company.legend : dict.person.legend}
                </h3>
              </div>

              {isCompany ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {dict.company.bin}
                      <RequiredMark />
                    </label>
                    <input type="text" name="company_inn" className={fieldClass} required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {dict.company.email}
                      <RequiredMark />
                    </label>
                    <input type="email" name="company_email" className={fieldClass} required />
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {dict.person.middleName}
                      </label>
                      <input type="text" name="person_middleName" className={fieldClass} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {dict.person.gender}
                        <RequiredMark />
                      </label>
                      <select
                        name="person_gender"
                        className={fieldClass}
                        defaultValue=""
                        required
                      >
                        <option value="">{dict.notSelected}</option>
                        <option value="male">{dict.person.genderMale}</option>
                        <option value="female">{dict.person.genderFemale}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {dict.person.birthDate}
                        <RequiredMark />
                      </label>
                      <input type="date" name="person_birthDate" className={fieldClass} required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {dict.person.idNumber}
                        <RequiredMark />
                      </label>
                      <input
                        type="text"
                        name="person_idNumber"
                        value={personIdNumber}
                        onChange={(e) => setPersonIdNumber(formatIdNumber(e.target.value))}
                        className={fieldClass}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {dict.person.countryLabel}
                        <RequiredMark />
                      </label>

                      <select
                        name="person_country"
                        className={fieldClass}
                        defaultValue=""
                        required
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {dict.person.address}
                        <RequiredMark />
                      </label>
                      <input type="text" name="person_address" className={fieldClass} required />
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {dict.person.passportNumber}
                        <RequiredMark />
                      </label>
                      <input
                        type="text"
                        name="person_passportNumber"
                        value={passportNumber}
                        onChange={(e) =>
                          setPassportNumber(formatLatinAlnum(e.target.value, 20))
                        }
                        className={fieldClass}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {dict.person.passportIssuer}
                        <RequiredMark />
                      </label>
                      <input type="text" name="person_passportIssuer" className={fieldClass} required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {dict.person.passportIssuedAt}
                        <RequiredMark />
                      </label>
                      <input type="date" name="person_passportIssuedAt" className={fieldClass} required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {dict.person.passportValidTo}
                        <RequiredMark />
                      </label>
                      <input type="date" name="person_passportValidTo" className={fieldClass} required />
                    </div>
                  </div>
                </>
              )}

              <div className="pt-2 flex justify-between gap-3">
                <button
                  type="button"
                  className="btn btn-secondary w-full sm:w-auto"
                  onClick={() => goToStep(1)}
                  disabled={formStatus === "loading"}
                >
                  {"Назад"}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary w-full sm:w-auto"
                  onClick={() => {
                    if (!validateStep(2)) return;
                    goToStep(3);
                  }}
                  disabled={formStatus === "loading"}
                >
                  {"Далее"}
                </button>
              </div>
            </div>

            {/* STEP 3: VEHICLES */}
            <div data-step="3" className={step !== 3 ? "hidden" : ""}>
              <div className="mb-3">
                <h3 className="text-base sm:text-lg font-bold text-[#C89F4A]">
                  {dict.vehicles.legend}
                </h3>
              </div>

              <div className="flex justify-between items-center gap-4">
                <p className="text-xs text-gray-600">{dict.vehicles.description}</p>

                <button
                  type="button"
                  className="text-xs sm:text-sm text-[#23376c] underline underline-offset-2 hover:opacity-80"
                  onClick={handleAddVehicle}
                  disabled={formStatus === "loading"}
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
                          disabled={formStatus === "loading"}
                        >
                          {dict.vehicles.removeButton}
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {dict.vehicles.plate}
                          <RequiredMark />
                        </label>
                        <input
                          type="text"
                          name={`vehicles[${idx}][plate]`}
                          onChange={(e) => {
                            e.target.value = formatLatinAlnum(e.target.value, 12);
                          }}
                          className={fieldClass}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {dict.vehicles.vehicleTypeLabel}
                          <RequiredMark />
                        </label>
                        <select
                          name={`vehicles[${idx}][type]`}
                          className={fieldClass}
                          defaultValue=""
                          required
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {dict.vehicles.countryLabel}
                          <RequiredMark />
                        </label>
                        <select
                          name={`vehicles[${idx}][country]`}
                          className={fieldClass}
                          defaultValue="385"
                          required
                        >
                          <option value="">{dict.notSelected}</option>
                          <option value="385">{dict.vehicles.countryKZ}</option>

                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {dict.vehicles.startDate}
                          <RequiredMark />
                        </label>
                        <input
                          type="date"
                          name={`vehicles[${idx}][startDate]`}
                          min={minStartDate}
                          className={fieldClass}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {dict.vehicles.periodLabel}
                          <RequiredMark />
                        </label>
                        <select
                          name={`vehicles[${idx}][period]`}
                          className={fieldClass}
                          defaultValue=""
                          required
                        >
                          <option value="">{dict.notSelected}</option>
                          <option value="115">{dict.vehicles.period15d}</option>
                          <option value="115">{dict.vehicles.period1m}</option>
                          <option value="117">{dict.vehicles.period3m}</option>
                          <option value="119">{dict.vehicles.period6m}</option>
                          <option value="121">{dict.vehicles.period12m}</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {dict.vehicles.techPassportFilesLabel}
                        <RequiredMark />
                      </label>

                      <input
                        type="file"
                        name={`vehicles[${idx}][techPassportFiles]`}
                        multiple
                        onChange={(e) => {
                          if (!e.target.files) return;
                          const validFiles = validateFiles(e.target.files);
                          if (validFiles.length !== e.target.files.length) e.target.value = "";
                        }}
                        accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        className="block w-full text-sm text-gray-700 file:mr-3 file:rounded-md file:border file:border-gray-300 file:bg-white file:px-3 file:py-2 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-50"
                        required
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

              <div className="pt-2 flex justify-between gap-3">
                <button
                  type="button"
                  className="btn btn-secondary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={() => goToStep(2)}
                  disabled={formStatus === "loading"}
                >
                  {"Назад"}
                </button>

                <button
                  type="submit"
                  className="btn w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={formStatus === "loading"}
                >
                  {formStatus === "loading" ? "Отправка..." : dict.submit}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
