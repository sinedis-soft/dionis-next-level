import type { Metadata } from "next";
import { Suspense } from "react";

import LanguageSelector from "./LanguageSelector";

export const metadata: Metadata = {
  title: "Выбор языка",
  robots: {
    index: false,
    follow: false,
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
