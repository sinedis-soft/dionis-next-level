// app/layout.tsx
import type { ReactNode } from "react";
import "./globals.css";
import { Montserrat } from "next/font/google";
import UtmCollector from "@/components/UtmCollector";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className={`${montserrat.className} bg-[#F7F7F7] text-[#616161] m-0`}>
        <UtmCollector />
        {children}
      </body>
    </html>
  );
}
