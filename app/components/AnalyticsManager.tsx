"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

type ConsentValue = "accepted" | "rejected" | null;
const COOKIE_NAME = "dionis_cookie_consent_v1";

function readConsent(): ConsentValue {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`${COOKIE_NAME}=(accepted|rejected)`)
  );
  return match ? (match[1] as ConsentValue) : null;
}

export default function AnalyticsManager() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    if (stored === "accepted") setEnabled(true);

    const handler = () => {
      const current = readConsent();
      setEnabled(current === "accepted");
    };

    window.addEventListener("cookie-consent-changed", handler);
    return () => window.removeEventListener("cookie-consent-changed", handler);
  }, []);

  if (!enabled) return null;

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const ymId = process.env.NEXT_PUBLIC_YM_ID;

  return (
    <>
      {/* Google Analytics 4 */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {/* Yandex Metrica */}
      {ymId && (
        <Script id="ym-init" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
              }
              k=e.createElement(t),
              a=e.getElementsByTagName(t)[0],
              k.async=1,
              k.src=r,
              a.parentNode.insertBefore(k,a)
            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${ymId}, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `}
        </Script>
      )}

      {/* Яндекс Реклама / контекст */}
      <Script id="ya-ads-init" strategy="afterInteractive">
        {`
          (function(w,d,s,src){
            w.yaContextCb = w.yaContextCb || [];
            if (d.getElementById('ya-context-js')) return;
            var s1 = d.createElement(s);
            s1.async = true;
            s1.id = 'ya-context-js';
            s1.src = 'https://yandex.ru/ads/system/context.js';
            var s0 = d.getElementsByTagName(s)[0];
            s0.parentNode.insertBefore(s1,s0);
          })(window, document, 'script');
        `}
      </Script>
    </>
  );
}
