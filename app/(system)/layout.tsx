import "../globals.css";
import "../../public/legacy.css";
import type { Metadata, Viewport } from "next";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://dionis-insurance.kz"
).replace(/\/$/, "");

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 2,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dionis Insurance Broker",
    template: "%s — Dionis Insurance Broker",
  },
};

function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

const globalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "InsuranceAgency",
      "@id": `${SITE_URL}/#insurance-broker`,
      name: "Dionis Insurance Broker",
      alternateName: "DIONIS",
      url: SITE_URL,
      telephone: "+7 727 357 30 30",
      availableLanguage: ["ru", "kk", "en"],
      areaServed: {
        "@type": "Country",
        name: "Kazakhstan",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Dionis Insurance Broker",
      publisher: {
        "@id": `${SITE_URL}/#insurance-broker`,
      },
      inLanguage: ["ru", "kk", "en"],
    },
  ],
};

export default function SystemRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className="u-min-h-screen u-flex u-flex-col"
        suppressHydrationWarning
      >
        <script
          id="global-organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(globalJsonLd),
          }}
        />

        {children}
      </body>
    </html>
  );
}