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

  const active: ProductsSectionKey = isSection(sp.section) ? sp.section : "auto";

  return (
    <main className="pr-page">
      {/* HERO */}
      <section className="u-pr-hero">
        <div className="u-pr-hero__bg" aria-hidden="true" />
        <div className="gc-container">
          <div className="u-pr-hero__inner">
            <div className="u-pr-hero__copy">
              <h1 className="pr-hero__title">{ui.h1}</h1>
              <p className="pr-hero__sub">{ui.sub}</p>
            </div>
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
      {active === "auto" ? (
        <AutoProductsSection lang={lang} base={base} ui={ui} />
      ) : null}
      {active === "property" ? (
        <PropertyProductsSection lang={lang} base={base} ui={ui} />
      ) : null}
      {active === "cargo" ? (
        <CargoProductsSection lang={lang} base={base} ui={ui} />
      ) : null}
      {active === "liability" ? (
        <LiabilityProductsSection lang={lang} base={base} ui={ui} />
      ) : null}
      {active === "life" ? (
        <LifeProductsSection lang={lang} base={base} ui={ui} />
      ) : null}
      {active === "vhi" ? (
        <MedicalProductsSection lang={lang} base={base} ui={ui} />
      ) : null}

      {/* REQUEST BOX */}
      <section className="u-pr-request">
        <div className="gc-container">
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