// components/SiteFooter.tsx
import Link from "next/link";

import type { Lang } from "@/dictionaries/header";
import { getFooterDictionary } from "@/dictionaries/footer";

type SiteFooterProps = {
  lang: Lang;
};

export default function SiteFooter({ lang }: SiteFooterProps) {
  const t = getFooterDictionary(lang);
  const base = `/${lang}`;

  return (
    <footer className="ftr" aria-label="Site footer">
      <div className="ftr__container">
        <div className="ftr__grid">
          {/* ===== Column 1 — contacts ===== */}
          <div className="ftr__col">
            <h3 className="ftr__title">{t.contactsTitle}</h3>

            <ul className="ftr__list">
              <li className="ftr__item">{t.addressLine1}</li>
              <li className="ftr__item">{t.addressLine2}</li>

              <li className="ftr__item">
                <a className="ftr__link" href="mailto:info@dionis-insurance.kz">
                  {t.emailLabel}
                </a>
              </li>

              <li className="ftr__item">
                <a className="ftr__link ftr__nowrap" href="tel:+77273573030">
                  {t.phoneLabel}
                </a>
              </li>
            </ul>
          </div>

          {/* ===== Column 2 — categories ===== */}
          <div className="ftr__col">
            <h3 className="ftr__title">{t.categoriesTitle}</h3>

            <ul className="ftr__list">
              <li className="ftr__item">
                <Link className="ftr__link" href={base}>
                  {t.homeLabel}
                </Link>
              </li>

              <li className="ftr__item">
                <Link className="ftr__link" href={`${base}/about`}>
                  {t.aboutLabel}
                </Link>
              </li>

              <li className="ftr__item">
                <Link className="ftr__link" href={`${base}/green-card`}>
                  {t.greenCardLabel}
                </Link>
              </li>

              <li className="ftr__item">
                <Link className="ftr__link" href={`${base}/osago-rf`}>
                  {t.osagoLabel}
                </Link>
              </li>

              <li className="ftr__item">
                <Link className="ftr__link" href={`${base}/blog`}>
                  {t.blogLabel}
                </Link>
              </li>
            </ul>
          </div>

          {/* ===== Column 3 — support ===== */}
          <div className="ftr__col">
            <h3 className="ftr__title">{t.supportTitle}</h3>

            <ul className="ftr__list">
              <li className="ftr__item">
                <a
                  className="ftr__link"
                  href="https://t.me/Dionis_insurance_broker_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.telegramLabel}
                </a>
              </li>
            </ul>
          </div>

          {/* ===== Column 4 — law ===== */}
          <div className="ftr__col">
            <h3 className="ftr__title">{t.lawTitle}</h3>

            <ul className="ftr__list">
              <li className="ftr__item">
                <Link className="ftr__link" href={`${base}/privacy/cookies`}>
                  {t.cookiePolicy}
                </Link>
              </li>

              <li className="ftr__item">
                <Link className="ftr__link" href={`${base}/privacy/regulation`}>
                  {t.servicesRegulations}
                </Link>
              </li>

              <li className="ftr__item">
                <a
                  className="ftr__link"
                  href="https://law.gov.kz/client/#!/doc/7832/rus"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.lawInsurance}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== Bottom bar ===== */}
      <div className="ftr__bottom">
        <div className="ftr__container">
          <div className="ftr__copy">{t.copyright}</div>
        </div>
      </div>
    </footer>
  );
}