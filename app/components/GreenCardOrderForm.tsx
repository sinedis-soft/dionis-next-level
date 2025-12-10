// components/GreenCardOrderForm.tsx
"use client";

import React, { useState, FormEvent, useRef } from "react";
import { CountrySelect } from "@/data/CountrySelect";
import type { GreenCardFormDictionary } from "@/dictionaries/greenCardForm";

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

type Props = {
  dict: GreenCardFormDictionary;
};

export function GreenCardOrderForm({ dict }: Props) {
  const [isCompany, setIsCompany] = useState(false);
  const [vehicleBlocks, setVehicleBlocks] = useState<number[]>([0]);

  const [contactFirstNameLat, setContactFirstNameLat] = useState("");
  const [contactLastNameLat, setContactLastNameLat] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [personIdNumber, setPersonIdNumber] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const formRef = useRef<HTMLFormElement | null>(null);

  const today = new Date();
  const minAgeDate = new Date(today.getTime() - 6570 * 24 * 60 * 60 * 1000);
  const maxBirthDate = minAgeDate.toISOString().split("T")[0];
  const maxIssuedDate = today.toISOString().split("T")[0];
  const minStartDate = today.toISOString().split("T")[0];

  function validateStep(stepToValidate: 1 | 2 | 3 | 4): boolean {
    if (!formRef.current) return true;

    const fieldset = formRef.current.querySelector(
      `fieldset[data-step="${stepToValidate}"]`
    ) as HTMLFieldSetElement | null;

    if (!fieldset) return true;

    const elements = fieldset.querySelectorAll<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >("input, select, textarea");

    for (const el of Array.from(elements)) {
      // пропускаем невидимые (например, другая ветка if / hidden)
      if ((el as any).offsetParent === null) continue;

      if (!el.checkValidity()) {
        el.reportValidity();
        el.focus();
        return false;
      }
    }

    return true;
  }

  function handleOrderSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmitting) return;

    // финальная валидация всех шагов перед отправкой
    if (!validateStep(1) || !validateStep(2) || !validateStep(3) || !validateStep(4)) {
      return;
    }

    setIsSubmitting(true);

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    // Добавим URL и UTM (если они есть в localStorage)
    if (typeof window !== "undefined") {
      try {
        formData.append("pageUrl", window.location.href);
        const utm = localStorage.getItem("utm_data");
        if (utm) {
          formData.append("utm", utm);
        }
      } catch {
        // ничего страшного
      }
    }

    fetch("/api/green-card-order", {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        const data = await res.json().catch(() => null);
        console.log("GREEN CARD ORDER RESPONSE:", res.status, data);

        if (!res.ok || !data?.ok) {
          alert(data?.message || "Ошибка при отправке заявки на Зеленую карту");
          return;
        }

        alert(dict.successMessage);

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
      })
      .catch((err) => {
        console.error("GREEN CARD ORDER ERROR:", err);
        alert("Ошибка на сервере при отправке заявки на Зеленую карту");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  const forbiddenTypes = [
    "application/zip",
    "application/x-rar-compressed",
    "application/x-7z-compressed",
    "application/x-tar",
    "audio/",
    "video/",
  ];

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

  return (
    <section id="green-card-order" className="py-12 sm:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1A3A5F] text-center">
          {dict.title}
        </h2>
        <p className="mt-3 text-center text-gray-600 max-w-3xl mx-auto">
          {dict.intro}
        </p>

        <form
          ref={formRef}
          className="mt-8 space-y-8"
          onSubmit={handleOrderSubmit}
        >
          {/* ШАГ 1: Контактные данные + чекбокс юрлица */}
          <fieldset
            data-step="1"
            className={
              "card px-5 py-5 sm:px-6 sm:py-6" + (step !== 1 ? " hidden" : "")
            }
          >
            <legend className="text-lg sm:text-xl font-bold text-[#C89F4A] px-1">
              {dict.contact.legend}
            </legend>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dict.contact.firstName}
                </label>
                <input
                  type="text"
                  name="contact_firstNameLat"
                  value={contactFirstNameLat}
                  onChange={(e) =>
                    setContactFirstNameLat(formatLatinName(e.target.value))
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dict.contact.lastName}
                </label>
                <input
                  type="text"
                  name="contact_lastNameLat"
                  value={contactLastNameLat}
                  onChange={(e) =>
                    setContactLastNameLat(formatLatinName(e.target.value))
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dict.contact.phone}
                </label>
                <input
                  type="tel"
                  name="contact_phone"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(formatPhone(e.target.value))}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dict.contact.email}
                </label>
                <input
                  type="email"
                  name="contact_email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(formatEmail(e.target.value))}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                  required
                />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <input
                id="order-isCompany"
                name="order-isCompany"
                type="checkbox"
                className="rounded border-gray-300"
                checked={isCompany}
                onChange={(e) => setIsCompany(e.target.checked)}
              />
              <label htmlFor="order-isCompany" className="text-sm text-gray-700">
                {dict.contact.isCompanyLabel}
              </label>
            </div>
          </fieldset>

          {step === 1 && (
            <div className="flex justify-end pt-2">
              <button
                type="button"
                className="btn w-full sm:w-auto"
                onClick={() => {
                  if (validateStep(1)) setStep(2);
                }}
              >
                {dict.nextStep ?? "Далее"}
              </button>
            </div>
          )}

          {/* ШАГ 2: Личные данные / Юрлицо */}
          <fieldset
            data-step="2"
            className={
              "card px-5 py-5 sm:px-6 sm:py-6" + (step !== 2 ? " hidden" : "")
            }
          >
            <legend className="text-lg sm:text-xl font-bold text-[#C89F4A] px-1">
              {isCompany ? dict.company.legend : dict.person.legend}
            </legend>

            {isCompany ? (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dict.company.bin}
                  </label>
                  <input
                    type="text"
                    name="company_bin"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dict.company.email}
                  </label>
                  <input
                    type="email"
                    name="company_email"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                    required
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {dict.person.middleName}
                    </label>
                    <input
                      type="text"
                      name="person_middleName"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {dict.person.gender}
                    </label>
                    <select
                      name="person_gender"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
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
                    </label>
                    <input
                      type="date"
                      name="person_birthDate"
                      max={maxBirthDate}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {dict.person.idNumber}
                    </label>
                    <input
                      type="text"
                      name="person_idNumber"
                      value={personIdNumber}
                      onChange={(e) =>
                        setPersonIdNumber(formatIdNumber(e.target.value))
                      }
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                      required
                    />
                  </div>

                  <CountrySelect
                    name="person_country"
                    label={dict.person.countryLabel}
                    required={true}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {dict.person.address}
                    </label>
                    <input
                      type="text"
                      name="person_address"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {dict.person.passportNumber}
                    </label>
                    <input
                      type="text"
                      name="person_passportNumber"
                      value={passportNumber}
                      onChange={(e) =>
                        setPassportNumber(formatLatinAlnum(e.target.value, 20))
                      }
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {dict.person.passportIssuer}
                    </label>
                    <input
                      type="text"
                      name="person_passportIssuer"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {dict.person.passportIssuedAt}
                    </label>
                    <input
                      type="date"
                      name="person_passportIssuedAt"
                      max={maxIssuedDate}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {dict.person.passportValidTo}
                    </label>
                    <input
                      type="date"
                      name="person_passportValidTo"
                      min={minStartDate}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                      required
                    />
                  </div>
                </div>
              </>
            )}
          </fieldset>

          {step === 2 && (
            <div className="flex justify-between pt-2 gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-md border text-sm"
                onClick={() => setStep(1)}
              >
                {dict.prevStep ?? "Назад"}
              </button>
              <button
                type="button"
                className="btn w-full sm:w-auto"
                onClick={() => {
                  if (validateStep(2)) setStep(3);
                }}
              >
                {dict.nextStep ?? "Далее"}
              </button>
            </div>
          )}

          {/* ШАГ 3: Параметры страховки */}
          <fieldset
            data-step="3"
            className={
              "card px-5 py-5 sm:px-6 sm:py-6" + (step !== 3 ? " hidden" : "")
            }
          >
            <legend className="text-lg sm:text-xl font-bold text-[#C89F4A] px-1">
              {dict.insurance.legend}
            </legend>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dict.insurance.territoryLabel}
                </label>
                <select
                  name="insurance_territory"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                  defaultValue=""
                  required
                >
                  <option value="">{dict.notSelected}</option>
                  <option value="1155">{dict.insurance.territoryAll}</option>
                  <option value="1267">{dict.insurance.territoryTMU}</option>
                </select>
              </div>
            </div>
          </fieldset>

          {step === 3 && (
            <div className="flex justify-between pt-2 gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-md border text-sm"
                onClick={() => setStep(2)}
              >
                {dict.prevStep ?? "Назад"}
              </button>
              <button
                type="button"
                className="btn w-full sm:w-auto"
                onClick={() => {
                  if (validateStep(3)) setStep(4);
                }}
              >
                {dict.nextStep ?? "Далее"}
              </button>
            </div>
          )}

          {/* ШАГ 4: Транспортные средства + отправка */}
          <fieldset
            data-step="4"
            className={
              "card px-5 py-5 sm:px-6 sm:py-6" + (step !== 4 ? " hidden" : "")
            }
          >
            <legend className="text-lg sm:text-xl font-bold text-[#C89F4A] px-1">
              {dict.vehicles.legend}
            </legend>

            <div className="mt-2 flex justify-between items-center">
              <p className="text-xs text-gray-600">
                {dict.vehicles.description}
              </p>
              <button
                type="button"
                className="text-xs sm:text-sm text-[#1A3A5F] underline underline-offset-2"
                onClick={handleAddVehicle}
              >
                {dict.vehicles.addButton}
              </button>
            </div>

            <div className="mt-4 space-y-6">
              {vehicleBlocks.map((id, idx) => (
                <div
                  key={id}
                  className="border border-dashed border-gray-300 rounded-xl p-4"
                >
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-xs font-semibold text-gray-500">
                      {dict.vehicles.blockTitle} #{idx + 1}
                    </p>
                    {vehicleBlocks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveVehicle(id)}
                        className="text-xs text-red-500 underline underline-offset-2"
                      >
                        {dict.vehicles.removeButton}
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Госномер */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {dict.vehicles.plate}
                      </label>
                      <input
                        type="text"
                        name={`vehicles[${idx}][plate]`}
                        onChange={(e) =>
                          (e.target.value = formatLatinAlnum(
                            e.target.value,
                            12
                          ))
                        }
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                        required
                      />
                    </div>

                    {/* Серия и номер техпаспорта */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {dict.vehicles.techPassportNumber}
                      </label>
                      <input
                        type="text"
                        name={`vehicles[${idx}][techPassportNumber]`}
                        onChange={(e) =>
                          (e.target.value = formatLatinAlnum(
                            e.target.value,
                            20
                          ))
                        }
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                        required
                      />
                    </div>

                    {/* Тип ТС */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {dict.vehicles.vehicleTypeLabel}
                      </label>
                      <select
                        name={`vehicles[${idx}][type]`}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                        defaultValue=""
                        required
                      >
                        <option value="">{dict.notSelected}</option>
                        <option value="127">
                          {dict.vehicles.vehicleTypePassenger}
                        </option>
                        <option value="131">
                          {dict.vehicles.vehicleTypeBus}
                        </option>
                        <option value="453">
                          {dict.vehicles.vehicleTypeTruck}
                        </option>
                        <option value="251">
                          {dict.vehicles.vehicleTypeTrailer}
                        </option>
                        <option value="217">
                          {dict.vehicles.vehicleTypeMotorcycle}
                        </option>
                        <option value="457">
                          {dict.vehicles.vehicleTypeSpecial}
                        </option>
                      </select>
                    </div>

                    {/* Страна регистрации ТС */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {dict.vehicles.countryLabel}
                      </label>
                      <select
                        name={`vehicles[${idx}][country]`}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                        defaultValue=""
                        required
                      >
                        <option value="">{dict.notSelected}</option>
                        <option value="385">{dict.vehicles.countryKZ}</option>
                        <option value="523">{dict.vehicles.countryGE}</option>
                      </select>
                    </div>

                    {/* Начало действия страховки */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {dict.vehicles.startDate}
                      </label>
                      <input
                        type="date"
                        name={`vehicles[${idx}][startDate]`}
                        min={minStartDate}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                        required
                      />
                    </div>

                    {/* Срок страхования */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {dict.vehicles.periodLabel}
                      </label>
                      <select
                        name={`vehicles[${idx}][period]`}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                        defaultValue=""
                        required
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {dict.vehicles.techPassportFilesLabel}
                    </label>
                    <input
                      type="file"
                      name={`vehicles[${idx}][techPassportFiles]`}
                      multiple
                      onChange={(e) => {
                        if (!e.target.files) return;
                        const validFiles = validateFiles(e.target.files);
                        if (validFiles.length !== e.target.files.length) {
                          e.target.value = "";
                        }
                      }}
                      accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      className="block w-full text-sm text-gray-700 file:mr-3 file:px-3 file:py-2 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#C89F4A] file:text-[#1A3A5F] hover:file:bg-[#d5a85a]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </fieldset>

          {step === 4 && (
            <div className="flex justify-between pt-2 gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-md border text-sm"
                onClick={() => setStep(3)}
                disabled={isSubmitting}
              >
                {dict.prevStep ?? "Назад"}
              </button>
              <button
                type="submit"
                className="btn w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправка..." : dict.submit}
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
