"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type UTMData = Record<string, string>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function parseUtmFromSearch(search: string): UTMData {
  const out: UTMData = {};
  const params = new URLSearchParams(search);

  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "yclid",
    "fbclid",
  ];

  for (const k of keys) {
    const v = params.get(k);
    if (v) out[k] = v;
  }

  return out;
}

function safeJsonParse(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function pushDataLayer(event: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

export default function AnalyticsManager() {
  const pathname = usePathname() || "/";
  const [search, setSearch] = useState<string>("");

  // ✅ берём query-string ТОЛЬКО на клиенте
  useEffect(() => {
    if (typeof window === "undefined") return;
    setSearch(window.location.search || "");
  }, [pathname]);

  const pageUrl = useMemo(() => {
    if (typeof window === "undefined") return pathname;
    const origin = window.location.origin || "";
    return `${origin}${pathname}${search}`;
  }, [pathname, search]);

  // ✅ сохраняем UTM в localStorage (чтобы потом отправлять с формами/лидами)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const utm = parseUtmFromSearch(search);
    if (Object.keys(utm).length === 0) return;

    try {
      localStorage.setItem("utm_data", JSON.stringify(utm));
    } catch {
      // ignore
    }
  }, [search]);

  // ✅ отправка page_view (если используешь GTM dataLayer)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Если у тебя аналитика включается только после consent — можешь
    // добавить проверку по cookie/событию здесь, но это обычно делает AnalyticsScripts.

    const utmStored = safeJsonParse(
      typeof window !== "undefined" ? localStorage.getItem("utm_data") : null
    );
    const utm =
      utmStored && typeof utmStored === "object" ? (utmStored as UTMData) : {};

    pushDataLayer({
      event: "page_view",
      page_path: pathname,
      page_location: pageUrl,
      page_title: typeof document !== "undefined" ? document.title : "",
      utm,
    });
  }, [pathname, pageUrl]);

  return null;
}
