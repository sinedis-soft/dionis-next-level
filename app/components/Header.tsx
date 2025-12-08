// app/components/Header.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type { Lang } from "@/dictionaries/header";
import { HEADER_DICTIONARY } from "@/dictionaries/header";

interface HeaderProps {
  lang: Lang;
}

export default function Header({ lang }: HeaderProps) {
  const t = HEADER_DICTIONARY[lang];
  const base = `/${lang}`;

  const [menuOpen, setMenuOpen] = useState(false);
  const [insuranceDesktopOpen, setInsuranceDesktopOpen] = useState(false);
  const [insuranceMobileOpen, setInsuranceMobileOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      const next = !prev;
      if (!next) setInsuranceMobileOpen(false);
      return next;
    });
  };

  return (
    <header className="w-full text-white bg-[#1A3A5F] shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href={base} className="flex items-center gap-2">
          <Image
            src="/logo.webp"
            alt="Dionis Insurance"
            width={70}
            height={70}
            priority
          />
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex items-center justify-between gap-8 flex-1 text-sm font-medium ml-6">
          <div className="flex items-center gap-6">
            <Link href={base} className="hover:text-[#C89F4A]">
              {t.home}
            </Link>

            <Link href={`${base}/about`} className="hover:text-[#C89F4A]">
              {t.about}
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => setInsuranceDesktopOpen((prev) => !prev)}
                className="hover:text-[#C89F4A]"
              >
                {t.insurances} ▾
              </button>

              {insuranceDesktopOpen && (
                <div className="absolute left-0 mt-2 bg-white text-[#1A3A5F] shadow-lg rounded-md overflow-hidden min-w-[220px] z-50">
                  <Link
                    href={`${base}/green-card`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {t.greenCard}
                  </Link>
                  <Link
                    href={`${base}/osago-rf`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {t.osagoRu}
                  </Link>
                  <Link
                    href={`${base}/products`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {t.allProducts}
                  </Link>
                </div>
              )}
            </div>

            <Link href={`${base}/blog`} className="hover:text-[#C89F4A]">
              {t.blog}
            </Link>
            <Link href={`${base}/contacts`} className="hover:text-[#C89F4A]">
              {t.contacts}
            </Link>
          </div>

          <div className="flex flex-col items-end text-xs leading-snug">
            <div className="text-right">{t.addressLine}</div>

            <a
              href="tel:+77273573030"
              className="mt-1 font-bold text-base leading-tight text-right hover:text-[#C89F4A]"
            >
              +7 (727) 357-30-30
            </a>

            <div className="mt-2 flex items-center gap-3">
              <a
                href="https://wa.me/77273573030"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/wa.webp" alt="WhatsApp" width={27} height={27} />
              </a>
              <a
                href="https://t.me/Dionis_insurance_broker_bot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/tg.webp" alt="Telegram" width={22} height={22} />
              </a>
            </div>

            <div className="mt-2 flex gap-2 uppercase tracking-wide text-[11px]">
              <Link
                href="/ru"
                className={lang === "ru" ? "font-bold" : "opacity-70"}
              >
                RU
              </Link>
              <Link
                href="/kz"
                className={lang === "kz" ? "font-bold" : "opacity-70"}
              >
                KZ
              </Link>
              <Link
                href="/en"
                className={lang === "en" ? "font-bold" : "opacity-70"}
              >
                EN
              </Link>
            </div>
          </div>
        </nav>

        {/* MOBILE BURGER */}
        <button
          className="lg:hidden flex flex-col gap-1"
          onClick={toggleMenu}
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
        <div className="lg:hidden bg-[#163455] text-white px-4 py-4 space-y-3 text-sm">
          <Link href={base} className="block">
            {t.home}
          </Link>
          <Link href={`${base}/about`} className="block">
            {t.about}
          </Link>

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
                <Link href={`${base}/green-card`} className="block">
                  {t.greenCard}
                </Link>
                <Link href={`${base}/osago-rf`} className="block">
                  {t.osagoRu}
                </Link>
                <Link href={`${base}/products`} className="block">
                  {t.allProducts}
                </Link>
              </div>
            )}
          </div>

          <Link href={`${base}/blog`} className="block">
            {t.blog}
          </Link>
          <Link href={`${base}/contacts`} className="block">
            {t.contacts}
          </Link>

          <div className="pt-3 border-t border-white/20 text-xs leading-snug">
            <div className="text-[#C89F4A]">{t.workTime}</div>
            <div>{t.addressLine}</div>

            <a href="tel:+77273573030" className="block font-bold mt-1 text-base">
              +7 (727) 357-30-30
            </a>

            <div className="flex gap-3 mt-3">
              <a
                href="https://wa.me/77273573030"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/wa.webp" width={26} height={26} alt="WhatsApp" />
              </a>
              <a
                href="https://t.me/Dionis_insurance_broker_bot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/tg.webp" width={26} height={26} alt="Telegram" />
              </a>
            </div>

            <div className="mt-3 flex gap-2 uppercase tracking-wide text-[11px]">
              <Link
                href="/ru"
                className={lang === "ru" ? "font-bold" : "opacity-70"}
              >
                RU
              </Link>
              <Link
                href="/kz"
                className={lang === "kz" ? "font-bold" : "opacity-70"}
              >
                KZ
              </Link>
              <Link
                href="/en"
                className={lang === "en" ? "font-bold" : "opacity-70"}
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
