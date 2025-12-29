// app/[lang]/products/page.tsx
import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";
import { HEADER_DICTIONARY } from "@/dictionaries/header";

import {
  PRODUCTS_CATEGORIES,
  PRODUCTS_UI,
  type Category,
  type ProductsSectionKey,
} from "@/dictionaries/products";



import ProductsDirectoryServer from "@/components/products/ProductsDirectoryServer";
import AutoProductsSection from "@/components/products/AutoProductsSection";
import PropertyProductsSection from "@/components/products/PropertyProductsSection";
import CargoProductsSection from "@/components/products/CargoProductsSection";
import LiabilityProductsSection from "@/components/products/LiabilityProductsSection";
import LifeProductsSection from "@/components/products/LifeProductsSection";
import MedicalProductsSection from "@/components/products/MedicalProductsSection";







import { RequestBox } from "@/components/RequestBox";

export const dynamicParams = false;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://dionis-insurance.kz";

function isLang(x: unknown): x is Lang {
  return x === "ru" || x === "kz" || x === "en";
}
function getLangSafe(x: unknown): Lang {
  return isLang(x) ? x : "ru";
}

function isSection(x: unknown): x is ProductsSectionKey {
  return (
    x === "auto" ||
    x === "property" ||
    x === "cargo" ||
    x === "liability" ||
    x === "life" ||
    x === "vhi"
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const p = await params;
  const lang = getLangSafe(p?.lang);

  const titleByLang: Record<Lang, string> = {
    ru: "Все страховые продукты",
    kz: "Барлық сақтандыру өнімдері",
    en: "All insurance products",
  };

  const descByLang: Record<Lang, string> = {
    ru: "Каталог страховых продуктов страхового брокера Dionis: авто, грузы, ответственность, имущество, жизнь, медицина.",
    kz: "Dionis insurance broker сақтандыру өнімдерінің каталогы: авто, жүк, жауапкершілік, мүлік, өмір, медицина.",
    en: "Dionis insurance broker product catalog: motor, cargo, liability, property, life, medical.",
  };

  const baseUrl = new URL(SITE_URL);

  return {
    title: titleByLang[lang],
    description: descByLang[lang],
    alternates: { canonical: `/${lang}/products` },
    openGraph: {
      title: titleByLang[lang],
      description: descByLang[lang],
      url: new URL(`/${lang}/products`, baseUrl).toString(),
      siteName: "Dionis Insurance Broker",
      type: "website",
    },
  };
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams?: Promise<{ section?: string }>;
}) {
  const p = await params;
  const lang = getLangSafe(p?.lang);
  const sp = (await searchParams) ?? {};

  const base = `/${lang}`;
  const ui = PRODUCTS_UI[lang];
  const tHeader = HEADER_DICTIONARY[lang];

  const categories: Category[] = PRODUCTS_CATEGORIES;

  const active: ProductsSectionKey = isSection(sp.section)
    ? sp.section
    : "auto";

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#F7F7F7] via-[#ffffff] to-[#e9f0f5]" />

        <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14 lg:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1A3A5F] leading-tight">
              {ui.h1}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-700">
              {ui.sub}
            </p>
          </div>
        </div>
      </section>

      {/* DIRECTORY (server) */}
      <ProductsDirectoryServer
        categories={categories}
        lang={lang}
        base={base}
        ui={ui}
        active={active}
      />

      {/* SECTION CONTENT (server) */}
      {active === "auto" ? <AutoProductsSection lang={lang} base={base} ui={ui} /> : null}
      {active === "property" ? <PropertyProductsSection lang={lang} base={base} ui={ui} /> : null}
      {active === "cargo" ? <CargoProductsSection lang={lang} base={base} ui={ui} /> : null}
      {active === "liability" ? <LiabilityProductsSection lang={lang} base={base} ui={ui} /> : null}
      {active === "life" ? <LifeProductsSection lang={lang} base={base} ui={ui} /> : null}
      {active === "vhi" ? <MedicalProductsSection lang={lang} base={base} ui={ui} /> : null}

      {/* REQUEST BOX */}
      <section className="py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4">
          <RequestBox
            title={ui.requestTitle}
            text={ui.requestText}
            actions={[
              {
                kind: "link",
                href: `${base}/contacts`,
                label: ui.btnRequest,
                variant: "primary",
              },
              {
                kind: "tel",
                tel: "+77273573030",
                label: "+7 (727) 357-30-30",
                variant: "secondary",
              },
            ]}
            footnote={`${tHeader.addressLine} • ${tHeader.workTime}`}
          />
        </div>
      </section>
    </main>
  );
}

// app/dictionaries/products.ts (добавь в конец файла)


