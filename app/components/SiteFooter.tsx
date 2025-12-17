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
    <footer className="w-full bg-[#0f2238] text-gray-100 text-sm mt-8">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-4">
        {/* ===== Колонка 1 — контакты ===== */}
        <div>
          <h3 className="text-xs font-bold tracking-[0.12em] uppercase mb-4">
            {t.contactsTitle}
          </h3>

          <ul className="space-y-2">
            <li>{t.addressLine1}</li>
            <li>{t.addressLine2}</li>

            <li>
              <a
                href="mailto:info@dionis-insurance.kz"
                className="hover:text-[#FCD671]"
              >
                {t.emailLabel}
              </a>
            </li>

            <li>
              <a
                href="tel:+77273573030"
                className="whitespace-nowrap hover:text-[#FCD671]"
              >
                {t.phoneLabel}
              </a>
            </li>
          </ul>
        </div>

        {/* ===== Колонка 2 — категории ===== */}
        <div>
          <h3 className="text-xs font-bold tracking-[0.12em] uppercase mb-4">
            {t.categoriesTitle}
          </h3>

          <ul className="space-y-2">
            <li>
              <Link href={base} className="hover:text-[#FCD671]">
                {t.homeLabel}
              </Link>
            </li>

            <li>
              <Link href={`${base}/about`} className="hover:text-[#FCD671]">
                {t.aboutLabel}
              </Link>
            </li>

            <li>
              <Link
                href={`${base}/green-card`}
                className="hover:text-[#FCD671]"
              >
                {t.greenCardLabel}
              </Link>
            </li>

            <li>
              <Link
                href={`${base}/osago-rf`}
                className="hover:text-[#FCD671]"
              >
                {t.osagoLabel}
              </Link>
            </li>

            <li>
              <Link href={`${base}/blog`} className="hover:text-[#FCD671]">
                {t.blogLabel}
              </Link>
            </li>
          </ul>
        </div>

        {/* ===== Колонка 3 — поддержка клиентов ===== */}
        <div>
          <h3 className="text-xs font-bold tracking-[0.12em] uppercase mb-4">
            {t.supportTitle}
          </h3>

          <ul className="space-y-2">
            <li>
              <a
                href="https://t.me/Dionis_insurance_broker_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FCD671]"
              >
                {t.telegramLabel}
              </a>
            </li>
          </ul>
        </div>

        {/* ===== Колонка 4 — законодательство ===== */}
        <div>
          <h3 className="text-xs font-bold tracking-[0.12em] uppercase mb-4">
            {t.lawTitle}
          </h3>

          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-[#FCD671]">
                {t.lawInsurance}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ===== Нижняя полоса ===== */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 text-xs text-gray-300">
          {t.copyright}
        </div>
      </div>
    </footer>
  );
}
