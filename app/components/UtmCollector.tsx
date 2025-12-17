// components/UtmCollector.tsx  (или app/components/UtmCollector.tsx)
"use client";

import { useEffect } from "react";

function collectUTM() {
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

  for (const key of keys) {
    const v = params.get(key);
    if (v) utm[key] = v;
  }

  return utm;
}

export default function UtmCollector() {
  useEffect(() => {
    try {
      const utm = collectUTM();
      if (Object.keys(utm).length > 0) {
        localStorage.setItem("utm_data", JSON.stringify(utm));
      }
    } catch {
      // молча игнорируем — UTM не критично
    }
  }, []);

  return null;
}
