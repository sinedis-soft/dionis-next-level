// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Dionis Insurance",
    template: "%s — Dionis Insurance",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
