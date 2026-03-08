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
    <div className="u-w-full">
      <label className="u-block u-text-sm u-font-medium u-text-gray-700 u-mb-1">
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
        <div className="u-relative">
          <Combobox.Input
            className="u-w-full u-border u-border-gray-300 u-rounded-md u-px-3 u-py-2 u-text-sm u-focus-ring-2 u-focus-ring--c89f4a u-focus-outline-none"
            placeholder={ui.placeholder}
            onChange={(e) => setQuery(e.target.value)}
            displayValue={() => selectedName}
          />

          {filtered.length > 0 && (
            <Combobox.Options className="u-absolute u-z-10 u-mt-1 u-max-h-60 u-w-full u-overflow-auto u-rounded-md u-bg-white u-border u-border-gray-200 u-shadow-lg">
              {filtered.map((c) => (
                <Combobox.Option
                  key={c.code}
                  value={c.code}
                  className={({ active }) =>
                    `u-cursor-pointer u-px-3 u-py-2 u-text-sm ${ active ? "u-bg--c89f4a-20" : "" }`
                  }
                >
                  {c.names[locale]}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}

          {filtered.length === 0 && query !== "" && (
            <div className="u-absolute u-z-10 u-mt-1 u-w-full u-rounded-md u-bg-white u-border u-border-gray-200 u-shadow-lg u-px-3 u-py-2 u-text-gray-500 u-text-sm">
              {ui.noResults}
            </div>
          )}
        </div>
      </Combobox>
    </div>
  );
}
