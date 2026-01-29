// components/AnalyticsScripts.tsx
"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

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

export default function AnalyticsScripts() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => {
      const stored = safeParseConsent(readCookieValue(COOKIE_NAME));
      // Включаем аналитику только если пользователь разрешил marketing
      setEnabled(Boolean(stored?.marketing));
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

  if (!enabled) return null;

  const gtmId = (process.env.NEXT_PUBLIC_GTM_ID || "").trim(); // GTM-XXXX
  const ymIdRaw = (process.env.NEXT_PUBLIC_YM_ID || "102201440").trim();
  const ymId = Number(ymIdRaw);

  return (
    <>
      {/* Google Tag Manager */}
      {gtmId ? (
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `}</Script>
      ) : null}

      {/* Yandex.Metrika */}
      {Number.isFinite(ymId) && ymId > 0 ? (
        <Script id="yandex-metrika" strategy="afterInteractive">{`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${ymId}, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
          });
        `}</Script>
      ) : null}
    </>
  );
}
