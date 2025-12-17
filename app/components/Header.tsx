"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Lang } from "@/dictionaries/header";
import { HEADER_DICTIONARY } from "@/dictionaries/header";

export default function Header({ lang }: { lang: Lang }) {
  const pathname = usePathname() || "/";
  const t = HEADER_DICTIONARY[lang];
  const base = `/${lang}`;

  const [menuOpen, setMenuOpen] = useState(false);
  const [insuranceDesktopOpen, setInsuranceDesktopOpen] = useState(false);
  const [insuranceMobileOpen, setInsuranceMobileOpen] = useState(false);

  const buildLangUrl = (targetLang: Lang) => {
    const parts = pathname.split("/");
    if (parts.length > 1) parts[1] = targetLang;
    return parts.join("/").replace(/\/+$/, "") || "/";
  };

  const isActive = (target: string) => {
    if (target === base) return pathname === base || pathname === `${base}/`;
    return pathname === target || pathname.startsWith(`${target}/`);
  };

  const navLinkClass = (href: string) =>
    `transition-colors ${
      isActive(href) ? "text-[#EBCA45] font-semibold" : "text-white"
    } hover:text-[#EBCA45]`;

  const langLinkClass = (code: Lang) =>
  `transition-colors ${
    lang === code ? "font-bold text-[#EBCA45]" : "opacity-60 hover:opacity-100"
  }`;

  // закрываем меню при смене маршрута
  useEffect(() => {
    setInsuranceDesktopOpen(false);
    setInsuranceMobileOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  // ---------- render ----------
  return (
    <header className="w-full text-white bg-[#23376C] shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* LOGO */}
        <Link href={base} className="flex items-center gap-2">
          <Image
            src="/logo.webp"
            alt="Dionis Insurance"
            width={70}
            height={70}
            priority
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center justify-between gap-8 flex-1 text-sm ml-6">
          <div className="flex items-center gap-6">
            <Link href={base} className={navLinkClass(base)}>
              {t.home}
            </Link>

            <Link href={`${base}/about`} className={navLinkClass(`${base}/about`)}>
              {t.about}
            </Link>

            {/* INSURANCE DROPDOWN */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setInsuranceDesktopOpen((prev) => !prev)}
                className={`transition-colors ${
                  isActive(`${base}/green-card`) ||
                  isActive(`${base}/osago-rf`) ||
                  isActive(`${base}/products`)
                    ? "text-[#EBCA45] font-semibold"
                    : "text-white hover:text-[#EBCA45]"
                }`}
              >
                {t.insurances} ▾
              </button>

              {insuranceDesktopOpen && (
                <div className="absolute left-0 mt-2 bg-white text-[#23376C] shadow-lg rounded-md overflow-hidden min-w-[220px] z-50">
                  <Link
                    href={`${base}/green-card`}
                    className={`block px-4 py-2 hover:bg-gray-100 ${
                      isActive(`${base}/green-card`)
                        ? "font-semibold text-[#23376C]"
                        : ""
                    }`}
                    onClick={() => setInsuranceDesktopOpen(false)}
                  >
                    {t.greenCard}
                  </Link>

                  <Link
                    href={`${base}/osago-rf`}
                    className={`block px-4 py-2 hover:bg-gray-100 ${
                      isActive(`${base}/osago-rf`)
                        ? "font-semibold text-[#23376C]"
                        : ""
                    }`}
                    onClick={() => setInsuranceDesktopOpen(false)}
                  >
                    {t.osagoRu}
                  </Link>

                  <Link
                    href={`${base}/products`}
                    className={`block px-4 py-2 hover:bg-gray-100 ${
                      isActive(`${base}/products`)
                        ? "font-semibold text-[#23376C]"
                        : ""
                    }`}
                    onClick={() => setInsuranceDesktopOpen(false)}
                  >
                    {t.allProducts}
                  </Link>
                </div>
              )}
            </div>

            <Link href={`${base}/blog`} className={navLinkClass(`${base}/blog`)}>
              {t.blog}
            </Link>
            <Link
              href={`${base}/contacts`}
              className={navLinkClass(`${base}/contacts`)}
            >
              {t.contacts}
            </Link>
          </div>

          {/* RIGHT INFO + LANG */}
          <div className="flex flex-col items-end text-xs leading-snug">
            <div className="text-right">{t.addressLine}</div>

            <a
              href="tel:+77273573030"
              className="mt-1 font-bold text-base leading-tight text-right hover:text-[#EBCA45]"
            >
              +7 (727) 357-30-30
            </a>

            <div className="mt-2 flex items-center gap-3">
              <a href="https://wa.me/77273573030" target="_blank">
                <Image src="/wa.webp" alt="WhatsApp" width={27} height={27} />
              </a>
              <a href="https://t.me/Dionis_insurance_broker_bot" target="_blank">
                <Image src="/tg.webp" alt="Telegram" width={22} height={22} />
              </a>
            </div>

            {/* LANG SWITCH */}
            <div className="mt-2 flex gap-2 uppercase tracking-wide text-[11px]">
              <Link href={buildLangUrl("ru")} className={langLinkClass("ru")}>
                RU
              </Link>
              <Link href={buildLangUrl("kz")} className={langLinkClass("kz")}>
                KZ
              </Link>
              <Link href={buildLangUrl("en")} className={langLinkClass("en")}>
                EN
              </Link>
            </div>
          </div>
        </nav>

        {/* MOBILE BURGER */}
        <button
          className="lg:hidden flex flex-col gap-1"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Menu"
          type="button"
        >
          <span className="w-6 h-0.5 bg-white" />
          <span className="w-6 h-0.5 bg-white" />
          <span className="w-6 h-0.5 bg-white" />
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="lg:hidden bg-[#1A2B55] text-white px-4 py-4 space-y-3 text-sm">
          <Link href={base} className={navLinkClass(base)} onClick={() => setMenuOpen(false)}>
            {t.home}
          </Link>
          <Link
            href={`${base}/about`}
            className={navLinkClass(`${base}/about`)}
            onClick={() => setMenuOpen(false)}
          >
            {t.about}
          </Link>

          {/* Mobile dropdown */}
          <div>
            <button
              type="button"
              onClick={() => setInsuranceMobileOpen((prev) => !prev)}
              className="w-full text-left"
            >
              {t.insurances} ▾
            </button>

            {insuranceMobileOpen && (
              <div className="ml-4 mt-2 space-y-2">
                <Link
                  href={`${base}/green-card`}
                  className={navLinkClass(`${base}/green-card`)}
                  onClick={() => {
                    setInsuranceMobileOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  {t.greenCard}
                </Link>

                <Link
                  href={`${base}/osago-rf`}
                  className={navLinkClass(`${base}/osago-rf`)}
                  onClick={() => {
                    setInsuranceMobileOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  {t.osagoRu}
                </Link>

                <Link
                  href={`${base}/products`}
                  className={navLinkClass(`${base}/products`)}
                  onClick={() => {
                    setInsuranceMobileOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  {t.allProducts}
                </Link>
              </div>
            )}
          </div>

          <Link
            href={`${base}/blog`}
            className={navLinkClass(`${base}/blog`)}
            onClick={() => setMenuOpen(false)}
          >
            {t.blog}
          </Link>
          <Link
            href={`${base}/contacts`}
            className={navLinkClass(`${base}/contacts`)}
            onClick={() => setMenuOpen(false)}
          >
            {t.contacts}
          </Link>

          {/* Info + langs */}
          <div className="pt-3 border-t border-white/20 text-xs leading-snug">
            <div className="text-[#EBCA45]">{t.workTime}</div>
            <div>{t.addressLine}</div>

            <a href="tel:+77273573030" className="block font-bold mt-1 text-base">
              +7 (727) 357-30-30
            </a>

            <div className="flex gap-3 mt-3">
              <a href="https://wa.me/77273573030" target="_blank">
                <Image src="/wa.webp" width={26} height={26} alt="WhatsApp" />
              </a>
              <a href="https://t.me/Dionis_insurance_broker_bot" target="_blank">
                <Image src="/tg.webp" width={26} height={26} alt="Telegram" />
              </a>
            </div>

            {/* LANG SWITCH MOBILE */}
            <div className="mt-3 flex gap-2 uppercase tracking-wide text-[11px]">
              <Link
                href={buildLangUrl("ru")}
                className={langLinkClass("ru")}
                onClick={() => setMenuOpen(false)}
              >
                RU
              </Link>
              <Link
                href={buildLangUrl("kz")}
                className={langLinkClass("kz")}
                onClick={() => setMenuOpen(false)}
              >
                KZ
              </Link>
              <Link
                href={buildLangUrl("en")}
                className={langLinkClass("en")}
                onClick={() => setMenuOpen(false)}
              >
                EN
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
