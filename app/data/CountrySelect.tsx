"use client";

import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { UN_COUNTRIES, type CountryLocale } from "./unCountries";

interface Props {
  name: string;
  label: string;          // уже локализованный заголовок
  required?: boolean;
  locale?: CountryLocale; // "ru" | "en" | "kz"
}

// UI-тексты в зависимости от языка
const UI_TEXTS: Record<
  CountryLocale,
  {
    placeholder: string;
    noResults: string;
  }
> = {
  ru: {
    placeholder: "Начните вводить название страны",
    noResults: "Ничего не найдено",
  },
  en: {
    placeholder: "Start typing country name",
    noResults: "No results",
  },
  kz: {
    placeholder: "Ел атауын жаза бастаңыз",
    noResults: "Ештеңе табылмады",
  },
};

export function CountrySelect({
  name,
  label,
  required = false,
  locale = "ru",
}: Props) {
  const [query, setQuery] = useState("");
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const ui = UI_TEXTS[locale] ?? UI_TEXTS.ru;

  const filtered =
    query === ""
      ? UN_COUNTRIES
      : UN_COUNTRIES.filter((c) =>
          c.names[locale].toLowerCase().includes(query.toLowerCase())
        );

  const selectedName =
    selectedCode != null
      ? UN_COUNTRIES.find((c) => c.code === selectedCode)?.names[locale] ?? ""
      : "";

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      {/* значение для формы — ISO-код страны */}
      <input
        type="hidden"
        name={name}
        value={selectedCode ?? ""}
        required={required}
      />

      <Combobox<string | null>
        value={selectedCode}
        onChange={(value) => setSelectedCode(value)}
      >
        <div className="relative">
          <Combobox.Input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#C89F4A] focus:outline-none"
            placeholder={ui.placeholder}
            onChange={(e) => setQuery(e.target.value)}
            displayValue={() => selectedName}
          />

          {filtered.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white border border-gray-200 shadow-lg">
              {filtered.map((c) => (
                <Combobox.Option
                  key={c.code}
                  value={c.code}
                  className={({ active }) =>
                    `cursor-pointer px-3 py-2 text-sm ${
                      active ? "bg-[#C89F4A]/20" : ""
                    }`
                  }
                >
                  {c.names[locale]}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}

          {filtered.length === 0 && query !== "" && (
            <div className="absolute z-10 mt-1 w-full rounded-md bg-white border border-gray-200 shadow-lg px-3 py-2 text-gray-500 text-sm">
              {ui.noResults}
            </div>
          )}
        </div>
      </Combobox>
    </div>
  );
}
