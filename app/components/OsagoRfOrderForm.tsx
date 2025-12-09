// app/components/OsagoOrderForm.tsx
"use client";

import React, { useState, FormEvent } from "react";
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
  dict: OsagoRfFormDictionary;
};

export function OsagoOrderForm({ dict }: Props) {
  const [isCompany, setIsCompany] = useState(false);
  const [vehicleBlocks, setVehicleBlocks] = useState<number[]>([0]);

  const [contactFirstNameLat, setContactFirstNameLat] = useState("");
  const [contactLastNameLat, setContactLastNameLat] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [personIdNumber, setPersonIdNumber] = useState("");
  const [passportNumber, setPassportNumber] = useState("");

  function handleOrderSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log("OSAGO RF ORDER FORM DATA:", Object.fromEntries(formData));
    alert(dict.successMessage);
    e.currentTarget.reset();

    setContactFirstNameLat("");
    setContactLastNameLat("");
    setContactPhone("");
    setContactEmail("");
    setPersonIdNumber("");
    setPassportNumber("");
    setVehicleBlocks([0]);
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
    <section id="osago-rf-order" className="py-12 sm:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1A3A5F] text-center">
          {dict.title}
        </h2>
        <p className="mt-3 text-center text-gray-600 max-w-3xl mx-auto">
          {dict.intro}
        </p>

        <form className="mt-8 space-y-8" onSubmit={handleOrderSubmit}>
          {/* Контактные данные */}
          <fieldset className="card px-5 py-5 sm:px-6 sm:py-6">
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
              <label
                htmlFor="order-isCompany"
                className="text-sm text-gray-700"
              >
                {dict.contact.isCompanyLabel}
              </label>
            </div>
          </fieldset>

          {/* Данные компании — только если юрлицо */}
          {isCompany && (
            <fieldset className="card px-5 py-5 sm:px-6 sm:py-6">
              <legend className="text-lg sm:text-xl font-bold text-[#C89F4A] px-1">
                {dict.company.legend}
              </legend>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dict.company.bin} {/* ← здесь теперь “ИНН” */}
                  </label>
                  <input
                    type="text"
                    name="company_inn"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
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
                  />
                </div>
              </div>
            </fieldset>
          )}

          {/* Личные данные страхователя / водителя — только если НЕ юрлицо */}
          {!isCompany && (
            <fieldset className="card px-5 py-5 sm:px-6 sm:py-6">
              <legend className="text-lg sm:text-xl font-bold text-[#C89F4A] px-1">
                {dict.person.legend}
              </legend>
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
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
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
                  />
                </div>

                <CountrySelect
                  name="person_country"
                  label={dict.person.countryLabel}
                  required={false}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dict.person.address}
                  </label>
                  <input
                    type="text"
                    name="person_address"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
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
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dict.person.passportIssuedAt}
                  </label>
                  <input
                    type="date"
                    name="person_passportIssuedAt"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dict.person.passportValidTo}
                  </label>
                  <input
                    type="date"
                    name="person_passportValidTo"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
                  />
                </div>
              </div>
            </fieldset>
          )}

          {/* ВАЖНО: блока insurance (территория действия) НЕТ */}

          {/* Данные по транспорту */}
          <fieldset className="card px-5 py-5 sm:px-6 sm:py-6">
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
                        <option value="217">
                          {dict.vehicles.vehicleTypeMotorcycle}
                        </option>
                        <option value="457">
                          {dict.vehicles.vehicleTypeSpecial}
                        </option>
                        <option value="249">
                          {dict.vehicles.vehicleTypeTruckTractor}
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
                        defaultValue="385"
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
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A]"
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

          <div className="flex justify-end pt-2">
            <button type="submit" className="btn w-full sm:w-auto">
              {dict.submit}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
