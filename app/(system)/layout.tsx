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
        {children}
      </body>
    </html>
  );
}
