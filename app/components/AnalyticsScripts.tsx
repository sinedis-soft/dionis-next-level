// components/AnalyticsScripts.tsx
"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type ConsentState = {
  necessary: boolean;
  functional: boolean;
  marketing: boolean;
};

const COOKIE_NAME = "dionis_cookie_consent_v2";

function readCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? m[1] : null;
}

function safeParseConsent(raw: string | null): ConsentState | null {
  if (!raw) return null;
  try {
    const decoded = decodeURIComponent(raw);
    const obj = JSON.parse(decoded) as Partial<ConsentState>;
    return {
      necessary: true,
      functional: Boolean(obj.functional),
      marketing: Boolean(obj.marketing),
    };
  } catch {
    return null;
  }
}

// Чтобы TS не ругался на ym/dataLayer
declare global {
  interface Window {
    ym?: (...args: any[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export default function AnalyticsScripts() {
  const ymIdRaw = (process.env.NEXT_PUBLIC_YM_ID || "").trim();
  const ymId = Number(ymIdRaw);

  const gtmId = (process.env.NEXT_PUBLIC_GTM_ID || "").trim();

  // marketing=true => разрешено включать полную аналитику/маркетинг
  const [marketingAllowed, setMarketingAllowed] = useState(false);

  // чтобы не апгрейдить метрику по 10 раз
  const ymUpgradedRef = useRef(false);

  useEffect(() => {
    const sync = () => {
      const stored = safeParseConsent(readCookieValue(COOKIE_NAME));
      setMarketingAllowed(Boolean(stored?.marketing));
    };

    sync();

    const handler = () => sync();
    window.addEventListener("cookie-consent-changed", handler);

    const t = window.setInterval(sync, 1200);

    return () => {
      window.removeEventListener("cookie-consent-changed", handler);
      window.clearInterval(t);
    };
  }, []);

  // Апгрейд Метрики после согласия: включаем cookies/карты/вебвизор
  useEffect(() => {
    if (!Number.isFinite(ymId) || ymId <= 0) return;
    if (!marketingAllowed) return;

    // ym ещё может не успеть подгрузиться
    if (typeof window.ym !== "function") return;

    if (ymUpgradedRef.current) return;
    ymUpgradedRef.current = true;

    // Переинициализация с полными опциями (после consent)
    window.ym(ymId, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      // cookies по умолчанию true — оставляем
      defer: true,
    });
  }, [marketingAllowed, ymId]);

  return (
    <>
      {/* 1) Яндекс.Метрика — ВСЕГДА, но в анонимном режиме до согласия */}
      {Number.isFinite(ymId) && ymId > 0 ? (
        <Script id="yandex-metrika-base" strategy="afterInteractive">{`
          (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          // БАЗОВЫЙ режим: без cookies и без поведенческих функций (до consent)
          ym(${ymId}, "init", {
            defer: true,
            cookies: false,
            webvisor: false,
            clickmap: false,
            trackLinks: false,
            accurateTrackBounce: false
          });
        `}</Script>
      ) : null}

      {/* 2) Noscript пиксель — НЕ ставим без consent (это трекинг) */}
      {/* Если очень нужно — выводи его только после marketingAllowed */}

      {/* 3) Google Tag Manager — только после согласия */}
      {marketingAllowed && gtmId ? (
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `}</Script>
      ) : null}
    </>
  );
}
