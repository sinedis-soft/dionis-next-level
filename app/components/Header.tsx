"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Lang } from "@/dictionaries/header";
import { HEADER_DICTIONARY } from "@/dictionaries/header";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

const INK = "text-[#0f2238]";
const INK_HOVER = "hover:text-[#23376C]";
const PANEL = "bg-white/30 backdrop-blur-md border border-black/10";

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
    cx(
      "transition-colors font-extrabold whitespace-nowrap",
      "px-3 py-2 rounded-xl",
      INK,
      INK_HOVER,
      isActive(href) && "bg-white/40"
    );

  const langLinkClass = (code: Lang) =>
    cx(
      "transition-colors uppercase tracking-wide text-[11px] font-extrabold",
      INK,
      INK_HOVER,
      lang === code ? "text-[#B58A2C]" : "opacity-80 hover:opacity-100"
    );

  useEffect(() => {
    setInsuranceDesktopOpen(false);
    setInsuranceMobileOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <header className={cx("sticky top-0 z-50", PANEL)}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 xl:px-8">
        <div className="h-16 xl:h-20 grid grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* LOGO */}
          <Link href={base} className="flex items-center gap-2">
            <Image src="/logo_1.webp" alt="Dionis Insurance" width={56} height={56} priority />
          </Link>

          {/* DESKTOP NAV (только xl) */}
          <nav className="hidden xl:flex justify-center">
            <div className="flex items-center gap-2 text-sm">
              <Link href={base} className={cx(navLinkClass(base), "min-w-[92px] text-center")}>
                {t.home}
              </Link>

              <Link href={`${base}/about`} className={cx(navLinkClass(`${base}/about`), "min-w-[92px] text-center")}>
                {t.about}
              </Link>

              {/* INSURANCE DROPDOWN */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setInsuranceDesktopOpen((p) => !p)}
                  className={cx(
                    "min-w-[120px] text-center",
                    "px-3 py-2 rounded-xl",
                    "transition-colors font-extrabold whitespace-nowrap",
                    INK,
                    INK_HOVER,
                    (isActive(`${base}/green-card`) ||
                      isActive(`${base}/osago-rf`) ||
                      isActive(`${base}/products`)) &&
                      "bg-white/40"
                  )}
                >
                  {t.insurances} ▾
                </button>

                {insuranceDesktopOpen && (
                  <div className={cx("absolute left-0 mt-3 rounded-2xl overflow-hidden min-w-[260px] z-50", PANEL, "shadow-2xl")}>
                    <Link
                      href={`${base}/green-card`}
                      className={cx("block px-4 py-3", INK, "hover:bg-white/40", isActive(`${base}/green-card`) && "font-extrabold bg-white/40")}
                      onClick={() => setInsuranceDesktopOpen(false)}
                    >
                      {t.greenCard}
                    </Link>

                    <Link
                      href={`${base}/osago-rf`}
                      className={cx("block px-4 py-3", INK, "hover:bg-white/40", isActive(`${base}/osago-rf`) && "font-extrabold bg-white/40")}
                      onClick={() => setInsuranceDesktopOpen(false)}
                    >
                      {t.osagoRu}
                    </Link>

                    <Link
                      href={`${base}/products`}
                      className={cx("block px-4 py-3", INK, "hover:bg-white/40", isActive(`${base}/products`) && "font-extrabold bg-white/40")}
                      onClick={() => setInsuranceDesktopOpen(false)}
                    >
                      {t.allProducts}
                    </Link>
                  </div>
                )}
              </div>

              <Link href={`${base}/blog`} className={cx(navLinkClass(`${base}/blog`), "min-w-[92px] text-center")}>
                {t.blog}
              </Link>

              <Link href={`${base}/contacts`} className={cx(navLinkClass(`${base}/contacts`), "min-w-[92px] text-center")}>
                {t.contacts}
              </Link>
            </div>
          </nav>

          {/* RIGHT (desktop) — xl */}
          <div className="hidden xl:flex flex-col items-end gap-2">
            <a href="tel:+77273573030" className={cx("font-extrabold text-base leading-tight", INK, INK_HOVER)}>
              +7 (727) 357-30-30
            </a>

            <div className="flex items-center gap-3">
              <a href="https://wa.me/77273573030" target="_blank" rel="noopener noreferrer" className="inline-flex">
                <Image src="/wa.webp" alt="WhatsApp" width={26} height={26} />
              </a>
              <a href="https://t.me/Dionis_insurance_broker_bot" target="_blank" rel="noopener noreferrer" className="inline-flex">
                <Image src="/tg.webp" alt="Telegram" width={22} height={22} />
              </a>

              <div className={cx("ml-2 rounded-full px-2 py-1 flex gap-2", "bg-white/35 border border-black/10")}>
                <Link href={buildLangUrl("ru")} className={langLinkClass("ru")}>RU</Link>
                <Link href={buildLangUrl("kz")} className={langLinkClass("kz")}>KZ</Link>
                <Link href={buildLangUrl("en")} className={langLinkClass("en")}>EN</Link>
              </div>
            </div>
          </div>

          {/* MOBILE BURGER (до xl) */}
          <button
            className={cx(
              "xl:hidden justify-self-end inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white/50 hover:bg-white/70 backdrop-blur",
              menuOpen && "hidden"
            )}
            onClick={() => setMenuOpen(true)}
            aria-label="Menu"
            type="button"
          >
            <div className="flex flex-col gap-1.5">
              <span className="w-5 h-0.5 bg-[#0f2238]" />
              <span className="w-5 h-0.5 bg-[#0f2238]" />
              <span className="w-5 h-0.5 bg-[#0f2238]" />
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div className="xl:hidden fixed inset-0 z-[999]">
          {/* ✅ backdrop: закрытие по клику снаружи */}
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-black/20"
            onClick={() => setMenuOpen(false)}
          />

          {/* ✅ панель: НЕ закрываем по клику на контейнер */}
          <div
            className={cx(
              "absolute right-0 top-0 w-[86%] max-w-sm shadow-2xl",
              "h-[100dvh] overflow-y-auto overscroll-contain",
              "bg-white/30 backdrop-blur-md border-l border-black/10"
            )}
          >
            {/* шапка панели */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b border-black/10 bg-white/40 backdrop-blur-md">
              <span className={cx("font-extrabold", INK)}>Dionis Insurance</span>

              <button
                className="h-10 w-10 rounded-xl border border-black/10 hover:bg-white/40"
                onClick={() => setMenuOpen(false)}
                aria-label="Close"
                type="button"
              >
                ✕
              </button>
            </div>

            <div className="p-4 pb-16">
              <div className="rounded-2xl bg-white/85 border border-black/10 shadow-sm p-3">
                <nav className="flex flex-col gap-2 text-base">
                  <Link
                    href={base}
                    className={cx("block w-full rounded-xl px-4 py-3", INK, "hover:bg-white/40", isActive(base) && "bg-white/40 font-extrabold")}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t.home}
                  </Link>

                  <Link
                    href={`${base}/about`}
                    className={cx("block w-full rounded-xl px-4 py-3", INK, "hover:bg-white/40", isActive(`${base}/about`) && "bg-white/40 font-extrabold")}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t.about}
                  </Link>

                  <div className="rounded-xl border border-black/10 overflow-hidden bg-white/40">
                    <button
                      type="button"
                      onClick={() => setInsuranceMobileOpen((p) => !p)}
                      className={cx("w-full px-4 py-3 flex items-center justify-between", INK, "hover:bg-white/40")}
                    >
                      <span className="font-extrabold">{t.insurances}</span>
                      <span className={cx("transition-transform", insuranceMobileOpen && "rotate-180")}>▾</span>
                    </button>

                    {insuranceMobileOpen && (
                      <div className="px-2 pb-2 pt-1 bg-white/30">
                        <Link
                          href={`${base}/green-card`}
                          className={cx("block w-full rounded-lg px-3 py-2", INK, "hover:bg-white/40")}
                          onClick={() => setMenuOpen(false)}
                        >
                          {t.greenCard}
                        </Link>

                        <Link
                          href={`${base}/osago-rf`}
                          className={cx("block w-full rounded-lg px-3 py-2", INK, "hover:bg-white/40")}
                          onClick={() => setMenuOpen(false)}
                        >
                          {t.osagoRu}
                        </Link>

                        <Link
                          href={`${base}/products`}
                          className={cx("block w-full rounded-lg px-3 py-2", INK, "hover:bg-white/40")}
                          onClick={() => setMenuOpen(false)}
                        >
                          {t.allProducts}
                        </Link>
                      </div>
                    )}
                  </div>

                  <Link
                    href={`${base}/blog`}
                    className={cx("block w-full rounded-xl px-4 py-3", INK, "hover:bg-white/40")}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t.blog}
                  </Link>

                  <Link
                    href={`${base}/contacts`}
                    className={cx("block w-full rounded-xl px-4 py-3", INK, "hover:bg-white/40")}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t.contacts}
                  </Link>
                </nav>

                {/* контакты + языки */}
                <div className="mt-5 rounded-2xl bg-white/25 border border-black/10 p-4 text-sm">
                  <a href="tel:+77273573030" className={cx("block font-extrabold text-lg", INK)}>
                    +7 (727) 357-30-30
                  </a>

                  <div className="mt-3 flex gap-3 items-center">
                    <a href="https://wa.me/77273573030" target="_blank" rel="noopener noreferrer">
                      <Image src="/wa.webp" width={28} height={28} alt="WhatsApp" />
                    </a>
                    <a href="https://t.me/Dionis_insurance_broker_bot" target="_blank" rel="noopener noreferrer">
                      <Image src="/tg.webp" width={28} height={28} alt="Telegram" />
                    </a>

                    <div className="ml-auto inline-flex items-center gap-2 rounded-full bg-white/35 border border-black/10 px-3 py-1">
                      <Link href={buildLangUrl("ru")} className={cx("text-xs font-extrabold", lang === "ru" ? "text-[#B58A2C]" : INK)} onClick={() => setMenuOpen(false)}>RU</Link>
                      <Link href={buildLangUrl("kz")} className={cx("text-xs font-extrabold", lang === "kz" ? "text-[#B58A2C]" : INK)} onClick={() => setMenuOpen(false)}>KZ</Link>
                      <Link href={buildLangUrl("en")} className={cx("text-xs font-extrabold", lang === "en" ? "text-[#B58A2C]" : INK)} onClick={() => setMenuOpen(false)}>EN</Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
