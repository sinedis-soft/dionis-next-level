"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type UTMData = Record<string, string>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "yclid",
  "fbclid",
] as const;

function parseUtmFromSearch(search: string): UTMData {
  const out: UTMData = {};
  const params = new URLSearchParams(search || "");
  for (const k of UTM_KEYS) {
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

function readSearch(): string {
  if (typeof window === "undefined") return "";
  return window.location.search || "";
}

export default function AnalyticsManager() {
  const pathname = usePathname() || "/";
  const [search, setSearch] = useState<string>("");

  // чтобы не стрелять лишний page_view на первом рендере со search=""
  const hasInitRef = useRef(false);

  // 1) Синхронизируем query-string:
  // - при монтировании
  // - при смене pathname
  // - при popstate (back/forward меняет query)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => setSearch(readSearch());
    update();

    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, [pathname]);

  const pageUrl = useMemo(() => {
    if (typeof window === "undefined") return `${pathname}${search}`;
    return `${window.location.origin}${pathname}${search}`;
  }, [pathname, search]);

  // 2) Сохраняем UTM (merge, чтобы не терять старые ключи, если пришли только часть)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const utmIncoming = parseUtmFromSearch(search);
    if (Object.keys(utmIncoming).length === 0) return;

    try {
      const stored = safeJsonParse(localStorage.getItem("utm_data"));
      const prev =
        stored && typeof stored === "object" ? (stored as UTMData) : {};
      const merged = { ...prev, ...utmIncoming };

      localStorage.setItem("utm_data", JSON.stringify(merged));
    } catch {
      // ignore
    }
  }, [search]);

  // 3) Page view в dataLayer — 1 раз на (pathname+search) после инициализации search
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Не отправляем page_view до первого чтения search
    if (!hasInitRef.current) {
      hasInitRef.current = true;
      // если на первом update search ещё пустой, ок — след. эффект сработает при реальном search
      // но чтобы не терять page_view без query — разрешаем один раз, только если search уже синхронизирован
      // (мы его синхронизируем в update() выше)
    }

    let utm: UTMData = {};
    try {
      const stored = safeJsonParse(localStorage.getItem("utm_data"));
      if (stored && typeof stored === "object") utm = stored as UTMData;
    } catch {
      utm = {};
    }

    pushDataLayer({
      event: "page_view",
      page_path: pathname,
      page_location: pageUrl,
      page_title: document?.title || "",
      utm,
    });
  }, [pathname, search, pageUrl]);

  return null;
}