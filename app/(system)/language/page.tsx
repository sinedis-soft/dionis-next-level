import type { Metadata } from "next";
import { Suspense } from "react";

import LanguageSelector from "./LanguageSelector";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://dionis-insurance.kz"
).replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Выбор языка",
  description:
    "Выберите язык сайта Dionis Insurance Broker: русский, қазақша немесе English.",
  alternates: {
    canonical: `${SITE_URL}/ru`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LanguagePage() {
  return (
    <div className="lang-select-font">
      <Suspense fallback={null}>
        <LanguageSelector />
      </Suspense>
    </div>
  );
}
