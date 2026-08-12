import Script from "next/script";

const BITRIX_WIDGET_LOADER =
  "https://cdn.bitrix24.pl/b25731489/crm/site_button/loader_7_aoms19.js";

export default function BitrixOpenLineWidget() {
  return (
    <Script id="bitrix-open-line-widget" strategy="lazyOnload">
      {`
        (function(w,d,u){
          var s=d.createElement('script');
          s.async=true;
          s.src=u+'?'+(Date.now()/60000|0);
          var h=d.getElementsByTagName('script')[0];
          h.parentNode.insertBefore(s,h);
        })(window,document,'${BITRIX_WIDGET_LOADER}');
      `}
    </Script>
  );
}
