"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Lang } from "@/dictionaries/header";
import { HEADER_DICTIONARY } from "@/dictionaries/header";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function isBlogArticlePath(pathname: string) {
  return /^\/(ru|kz|en)\/blog\/[^\/]+\/?$/.test(pathname);
}

function useClickOutside<T extends HTMLElement>(
  refs: Array<RefObject<T | null>>,
  onOutside: () => void,
  enabled: boolean
) {
  useEffect(() => {
    if (!enabled) return;

    const onDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (!target) return;

      const inside = refs.some((r) => r.current?.contains(target));
      if (!inside) onOutside();
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });

    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [enabled, onOutside, refs]);
}

export default function Header({ lang }: { lang: Lang }) {
  const pathname = usePathname() || "/";
  const t = HEADER_DICTIONARY[lang];
  const base = `/${lang}`;

  const [menuOpen, setMenuOpen] = useState(false);
  const [insuranceDesktopOpen, setInsuranceDesktopOpen] = useState(false);
  const [insuranceMobileOpen, setInsuranceMobileOpen] = useState(false);

  const desktopDdWrapRef = useRef<HTMLDivElement | null>(null);
  const desktopDdBtnRef = useRef<HTMLButtonElement | null>(null);

  const [qs, setQs] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => setQs(window.location.search || "");
    update();

    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, [pathname]);

  const buildLangUrl = useCallback(
    (targetLang: Lang) => {
      if (isBlogArticlePath(pathname)) return `/${targetLang}/blog`;

      const parts = pathname.split("/");
      if (parts.length > 1) parts[1] = targetLang;

      const nextPath = parts.join("/").replace(/\/+$/, "") || "/";
      return `${nextPath}${qs}`;
    },
    [pathname, qs]
  );

  const isActive = useCallback(
    (target: string) => {
      if (target === base) return pathname === base || pathname === `${base}/`;
      return pathname === target || pathname.startsWith(`${target}/`);
    },
    [base, pathname]
  );

  // без useMemo: это решает preserve-manual-memoization и missing deps
  const activeInsurance =
    isActive(`${base}/green-card`) ||
    isActive(`${base}/osago-rf`) ||
    isActive(`${base}/products`);

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

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (insuranceDesktopOpen) setInsuranceDesktopOpen(false);
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [insuranceDesktopOpen, menuOpen]);

  const desktopOutsideRefs = useMemo(
    () => [desktopDdWrapRef, desktopDdBtnRef] as Array<RefObject<HTMLElement | null>>,
    []
  );

  useClickOutside(desktopOutsideRefs, () => setInsuranceDesktopOpen(false), insuranceDesktopOpen);

  const ddMenuId = "hdr-insurance-menu";

  return (
    <header className="hdr">
      <div className="hdr__container">
        <div className="hdr__row">
          <Link href={base} className="hdr__logo" aria-label="Dionis Insurance">
            <Image src="/logo_1.webp" alt="Dionis Insurance" width={56} height={56} priority />
          </Link>

          <nav className="hdr__nav" aria-label="Primary navigation">
            <Link href={base} className={cx("hdr__link", isActive(base) && "is-active")}>
              {t.home}
            </Link>

            <Link href={`${base}/about`} className={cx("hdr__link", isActive(`${base}/about`) && "is-active")}>
              {t.about}
            </Link>

            <div className="hdr__dd" ref={desktopDdWrapRef}>
              <button
                ref={desktopDdBtnRef}
                type="button"
                className={cx("hdr__link", "hdr__ddbtn", activeInsurance && "is-active")}
                onClick={() => setInsuranceDesktopOpen((p) => !p)}
                aria-haspopup="menu"
                aria-expanded={insuranceDesktopOpen}
                aria-controls={ddMenuId}
              >
                {t.insurances}{" "}
                <span className={cx("hdr__caret", insuranceDesktopOpen && "is-open")}>▾</span>
              </button>

              {insuranceDesktopOpen && (
                <div className="hdr__ddpanel" id={ddMenuId} role="menu">
                  <Link
                    href={`${base}/green-card`}
                    className={cx("hdr__dditem", isActive(`${base}/green-card`) && "is-active")}
                    role="menuitem"
                    onClick={() => setInsuranceDesktopOpen(false)}
                  >
                    {t.greenCard}
                  </Link>

                  <Link
                    href={`${base}/osago-rf`}
                    className={cx("hdr__dditem", isActive(`${base}/osago-rf`) && "is-active")}
                    role="menuitem"
                    onClick={() => setInsuranceDesktopOpen(false)}
                  >
                    {t.osagoRu}
                  </Link>

                  <Link
                    href={`${base}/products`}
                    className={cx("hdr__dditem", isActive(`${base}/products`) && "is-active")}
                    role="menuitem"
                    onClick={() => setInsuranceDesktopOpen(false)}
                  >
                    {t.allProducts}
                  </Link>
                </div>
              )}
            </div>

            <Link href={`${base}/blog`} className={cx("hdr__link", isActive(`${base}/blog`) && "is-active")}>
              {t.blog}
            </Link>

            <Link href={`${base}/contacts`} className={cx("hdr__link", isActive(`${base}/contacts`) && "is-active")}>
              {t.contacts}
            </Link>
          </nav>

          <div className="hdr__right">
            <a href="tel:+77273573030" className="hdr__phone">
              +7 (727) 357-30-30
            </a>

            <div className="hdr__rightRow">
              <a href="https://wa.me/77765275553" target="_blank" rel="noopener noreferrer" className="hdr__icon">
                <Image src="/wa.webp" alt="WhatsApp" width={26} height={26} />
              </a>

              <a
                href="https://t.me/Dionis_insurance_broker_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="hdr__icon"
              >
                <Image src="/tg.webp" alt="Telegram" width={22} height={22} />
              </a>

              <div className="hdr__langs" aria-label="Language switcher">
                <Link href={buildLangUrl("ru")} className={cx("hdr__lang", lang === "ru" && "is-active")}>
                  RU
                </Link>
                <Link href={buildLangUrl("kz")} className={cx("hdr__lang", lang === "kz" && "is-active")}>
                  KZ
                </Link>
                <Link href={buildLangUrl("en")} className={cx("hdr__lang", lang === "en" && "is-active")}>
                  EN
                </Link>
              </div>
            </div>
          </div>

          <button
            className="hdr__burger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            type="button"
            disabled={menuOpen}
          >
            <span className="hdr__burgerLines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="mnav" role="dialog" aria-modal="true" aria-label="Mobile menu">
          <button className="mnav__overlay" aria-label="Close menu" onClick={() => setMenuOpen(false)} />

          <div className="mnav__panel">
            <div className="mnav__top">
              <span className="mnav__brand">Dionis Insurance</span>
              <button className="mnav__close" onClick={() => setMenuOpen(false)} aria-label="Close" type="button">
                ✕
              </button>
            </div>

            <div className="mnav__content">
              <nav className="mnav__links" aria-label="Mobile navigation">
                <Link href={base} className={cx("mnav__link", isActive(base) && "is-active")} onClick={() => setMenuOpen(false)}>
                  {t.home}
                </Link>

                <Link href={`${base}/about`} className={cx("mnav__link", isActive(`${base}/about`) && "is-active")} onClick={() => setMenuOpen(false)}>
                  {t.about}
                </Link>

                <div className="mnav__accordion">
                  <button
                    type="button"
                    className="mnav__accBtn"
                    onClick={() => setInsuranceMobileOpen((p) => !p)}
                    aria-expanded={insuranceMobileOpen}
                  >
                    <span className="mnav__accTitle">{t.insurances}</span>
                    <span className={cx("mnav__accCaret", insuranceMobileOpen && "is-open")}>▾</span>
                  </button>

                  {insuranceMobileOpen && (
                    <div className="mnav__accBody">
                      <Link href={`${base}/green-card`} className="mnav__sublink" onClick={() => setMenuOpen(false)}>
                        {t.greenCard}
                      </Link>
                      <Link href={`${base}/osago-rf`} className="mnav__sublink" onClick={() => setMenuOpen(false)}>
                        {t.osagoRu}
                      </Link>
                      <Link href={`${base}/products`} className="mnav__sublink" onClick={() => setMenuOpen(false)}>
                        {t.allProducts}
                      </Link>
                    </div>
                  )}
                </div>

                <Link href={`${base}/blog`} className={cx("mnav__link", isActive(`${base}/blog`) && "is-active")} onClick={() => setMenuOpen(false)}>
                  {t.blog}
                </Link>

                <Link href={`${base}/contacts`} className={cx("mnav__link", isActive(`${base}/contacts`) && "is-active")} onClick={() => setMenuOpen(false)}>
                  {t.contacts}
                </Link>
              </nav>

              <div className="mnav__box">
                <a href="tel:+77273573030" className="mnav__phone">
                  +7 (727) 357-30-30
                </a>

                <div className="mnav__icons">
                  <a href="https://wa.me/77765275553" target="_blank" rel="noopener noreferrer" className="mnav__icon">
                    <Image src="/wa.webp" width={28} height={28} alt="WhatsApp" />
                  </a>
                  <a href="https://t.me/Dionis_insurance_broker_bot" target="_blank" rel="noopener noreferrer" className="mnav__icon">
                    <Image src="/tg.webp" width={28} height={28} alt="Telegram" />
                  </a>

                  <div className="mnav__langs" aria-label="Language switcher">
                    <Link href={buildLangUrl("ru")} className={cx("mnav__lang", lang === "ru" && "is-active")} onClick={() => setMenuOpen(false)}>
                      RU
                    </Link>
                    <Link href={buildLangUrl("kz")} className={cx("mnav__lang", lang === "kz" && "is-active")} onClick={() => setMenuOpen(false)}>
                      KZ
                    </Link>
                    <Link href={buildLangUrl("en")} className={cx("mnav__lang", lang === "en" && "is-active")} onClick={() => setMenuOpen(false)}>
                      EN
                    </Link>
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