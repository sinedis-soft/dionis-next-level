"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

// Функция для сбора UTM
function collectUTM() {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
    "yclid",
  ];

  const utm: Record<string, string> = {};

  keys.forEach((key) => {
    const v = params.get(key);
    if (v) utm[key] = v;
  });

  return utm;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  // сохраняем UTM в localStorage один раз
  useEffect(() => {
    const utm = collectUTM();
    if (Object.keys(utm).length > 0) {
      localStorage.setItem("utm_data", JSON.stringify(utm));
    }
  }, []);

  return (
    <html lang="ru">
      <body className={`${montserrat.className} bg-[#F7F7F7] text-[#616161] m-0`}>
        {children}
      </body>
    </html>
  );
}
