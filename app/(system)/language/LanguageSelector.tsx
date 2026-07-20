"use client";

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
    label: "РУССКИЙ",
    nativeName: "RU",
    description: "Продолжить на русском языке",
  },
  {
    lang: "kz",
    label: "ҚАЗАҚША",
    nativeName: "KZ",
    description: "Сайтты қазақ тілінде ашу",
  },
  {
    lang: "en",
    label: "ENGLISH",
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
          <span>Выберите язык сайта</span>
          <span lang="kk">Сайт тілін таңдаңыз</span>
          <span lang="en">Choose website language</span>
        </h1>

        <ul className="lang-select__options" aria-label="Доступные языки">
          {OPTIONS.map((option) => (
            <li key={option.lang}>
              <button
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
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
