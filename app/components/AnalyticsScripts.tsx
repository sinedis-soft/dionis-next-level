// components/AnalyticsScripts.tsx
"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

type ConsentValue = "accepted" | "rejected" | null;
const COOKIE_NAME = "dionis_cookie_consent_v1";

function readConsent(): ConsentValue {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`${COOKIE_NAME}=(accepted|rejected)`));
  return match ? (match[1] as ConsentValue) : null;
}

export default function AnalyticsScripts() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => setEnabled(readConsent() === "accepted");
    sync();

    const handler = () => sync();
    window.addEventListener("cookie-consent-changed", handler);

    // на случай, если cookie меняется без события
    const t = window.setInterval(sync, 1200);

    return () => {
      window.removeEventListener("cookie-consent-changed", handler);
      window.clearInterval(t);
    };
  }, []);

  if (!enabled) return null;

  const gtmId = (process.env.NEXT_PUBLIC_GTM_ID || "").trim(); // GTM-XXXXXXX
  const ymIdRaw = process.env.NEXT_PUBLIC_YM_ID || "102201440";
  const ymId = Number(ymIdRaw);

  return (
    <>
      {/* Google Tag Manager (после consent) */}
      {gtmId ? (
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `}</Script>
      ) : null}

      {/* Yandex.Metrika (после consent) */}
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
