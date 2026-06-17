"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

const LANGUAGE_COOKIE = "dionis_language";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function setLanguageCookie(lang: string) {
  const descriptor = Object.getOwnPropertyDescriptor(Document.prototype, "cookie");
  descriptor?.set?.call(document, `${LANGUAGE_COOKIE}=${lang}; Max-Age=${ONE_YEAR_SECONDS}; Path=/; SameSite=Lax`);
}
const SUPPORTED_LANGS = ["ru", "kz", "en"] as const;

type Lang = (typeof SUPPORTED_LANGS)[number];

const OPTIONS: Array<{
  lang: Lang;
  label: string;
  nativeName: string;
  description: string;
}> = [
  {
    lang: "ru",
    label: "Русский",
    nativeName: "RU",
    description: "Продолжить на русском языке",
  },
  {
    lang: "kz",
    label: "Қазақша",
    nativeName: "KZ",
    description: "Сайтты қазақ тілінде ашу",
  },
  {
    lang: "en",
    label: "English",
    nativeName: "EN",
    description: "Continue in English",
  },
];

function isSupportedLang(value: string | undefined): value is Lang {
  return SUPPORTED_LANGS.some((lang) => lang === value);
}

function buildLocalizedPath(returnTo: string, lang: Lang) {
  const safeReturnTo = returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/";
  const [rawPathname, rawQuery = ""] = safeReturnTo.split("?");
  const parts = rawPathname.split("/");

  if (isSupportedLang(parts[1])) {
    parts[1] = lang;
  } else if (rawPathname === "/") {
    parts[1] = lang;
  } else {
    parts.splice(1, 0, lang);
  }

  const pathname = parts.join("/").replace(/\/+/g, "/").replace(/\/$/, "") || `/${lang}`;
  return rawQuery ? `${pathname}?${rawQuery}` : pathname;
}

export default function LanguageSelector() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/";

  const previewPath = useMemo(() => buildLocalizedPath(returnTo, "ru"), [returnTo]);

  function chooseLanguage(lang: Lang) {
    const destination = buildLocalizedPath(returnTo, lang);

    setLanguageCookie(lang);
    window.localStorage.setItem(LANGUAGE_COOKIE, lang);
    window.location.assign(destination);
  }

  return (
    <main className="lang-select" aria-labelledby="language-title">
      <section className="lang-select__card">
        <div className="lang-select__eyebrow">Dionis Insurance Broker</div>
        <h1 id="language-title" className="lang-select__title">
          Выберите язык сайта
        </h1>
        <p className="lang-select__lead">
          Мы запомним выбор в браузере и откроем нужную страницу на выбранном языке.
        </p>

        <div className="lang-select__options" role="list" aria-label="Доступные языки">
          {OPTIONS.map((option) => (
            <button
              key={option.lang}
              type="button"
              className="lang-select__option"
              onClick={() => chooseLanguage(option.lang)}
            >
              <span className="lang-select__code" aria-hidden="true">{option.nativeName}</span>
              <span>
                <span className="lang-select__name">{option.label}</span>
                <span className="lang-select__description">{option.description}</span>
              </span>
            </button>
          ))}
        </div>

        <p className="lang-select__note">
          Например, текущий адрес будет открыт как <strong>{previewPath}</strong> при выборе русского языка.
        </p>
      </section>
    </main>
  );
}
