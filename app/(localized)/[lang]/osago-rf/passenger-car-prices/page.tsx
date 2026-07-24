import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import DeferredHydration from "@/components/DeferredHydration";
import OsagoPassengerPriceCards from "@/components/osago-rf/OsagoPassengerPriceCards";
import OsagoRfCalculator from "@/components/osago-rf/OsagoRfCalculator";
import { OsagoOrderForm } from "@/components/osago-rf/OsagoOrderForm";
import type { Lang } from "@/dictionaries/header";
import { getOsagoRfCalculatorDictionary } from "@/dictionaries/osagoRfCalculator";
import { getOsagoRfFormDictionary } from "@/dictionaries/osagoRfForm";
import { getOsagoRfPassengerPricesDictionary } from "@/dictionaries/osagoRfPassengerPrices";
import { keepShortWords } from "@/lib/keepShortWords";
import { buildAlternates } from "@/lib/seoAlternates";

export const dynamicParams = false;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://dionis-insurance.kz";
const PATH = "/osago-rf/passenger-car-prices";

export function generateStaticParams(): Array<{ lang: Lang }> { return [{ lang: "ru" }, { lang: "kz" }, { lang: "en" }]; }
function normalizeLang(value: unknown): Lang { return value === "ru" || value === "kz" || value === "en" ? value : "ru"; }
function langToOgLocale(lang: Lang): string { return lang === "ru" ? "ru_RU" : lang === "kz" ? "kk_KZ" : "en_US"; }

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);
  const dict = getOsagoRfPassengerPricesDictionary(lang);
  const url = `${SITE_URL}/${lang}${PATH}`;
  return { title: dict.seo.title, description: dict.seo.description, alternates: buildAlternates(lang, PATH), openGraph: { type: "website", url, title: dict.seo.title, description: dict.seo.description, locale: langToOgLocale(lang), siteName: "DIONIS" }, robots: { index: true, follow: true } };
}

export default async function OsagoRfPassengerPricesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);
  const dict = getOsagoRfPassengerPricesDictionary(lang);
  const calcDict = getOsagoRfCalculatorDictionary(lang);
  const formDict = getOsagoRfFormDictionary(lang);
  const pageUrl = `${SITE_URL}/${lang}${PATH}`;
  const jsonLd = { "@context": "https://schema.org", "@graph": [{ "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: dict.seo.breadcrumbs.home, item: `${SITE_URL}/${lang}` }, { "@type": "ListItem", position: 2, name: dict.seo.breadcrumbs.osago, item: `${SITE_URL}/${lang}/osago-rf` }, { "@type": "ListItem", position: 3, name: dict.seo.breadcrumbs.current, item: pageUrl }] }, { "@type": "WebPage", "@id": `${pageUrl}#webpage`, url: pageUrl, name: dict.seo.title, description: dict.seo.description, isPartOf: { "@id": `${SITE_URL}/#website` } }] };

  return (
    <main className="gc-page">
      <script id="osago-rf-passenger-prices-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="gc-breadcrumbs" aria-label={dict.seo.breadcrumbs.current}>
        <div className="gc-container"><div className="row gap-8 wrap gc-text-muted"><Link href={`/${lang}`}>{dict.seo.breadcrumbs.home}</Link><span aria-hidden="true">/</span><Link href={`/${lang}/osago-rf`}>{dict.seo.breadcrumbs.osago}</Link><span aria-hidden="true">/</span><span aria-current="page">{dict.seo.breadcrumbs.current}</span></div></div>
      </nav>

      <section className="gc-hero">
        <div className="gc-hero__bg" aria-hidden="true" />
        <div className="gc-container gc-hero__grid">
          <div className="gc-hero__left"><h1 className="gc-hero__title">{keepShortWords(dict.hero.title)}</h1><p className="gc-hero__subtitle">{keepShortWords(dict.hero.subtitle)}</p><div className="gc-hero__facts" aria-label={dict.hero.title}>{dict.hero.facts.map((fact) => <span key={fact}>{fact}</span>)}</div><div className="gc-hero__cta"><a href="#osago-rf-order" role="button" className="btn btn-wide">{dict.hero.cta}</a></div></div>
          <div className="gc-hero__right"><div className="gc-hero__visualWrap"><div className="gc-hero-visual gc-hero-visual--single"><Image src="/osago-rf/HiroOsagoRf.webp" alt={dict.hero.alt} width={1672} height={941} sizes="(min-width: 1280px) 560px, (min-width: 1024px) 46vw, 0px" className="gc-hero__image" style={{ height: "auto" }} priority /></div></div></div>
        </div>
      </section>

      <section className="gc-section gc-info-strip" aria-labelledby="osago-passenger-price-terms"><div className="gc-container"><article className="gc-info-strip__card"><div className="gc-info-strip__header"><h2 id="osago-passenger-price-terms" className="gc-info-strip__title">{dict.intro.title}</h2></div><div className="gc-info-strip__body">{dict.intro.paragraphs.map((p) => <p key={p}>{p}</p>)}<p><strong>{dict.intro.note}</strong></p></div></article></div></section>

      <OsagoPassengerPriceCards lang={lang} dict={dict} />

      <section className="gc-section" aria-labelledby="osago-rf-exact-calculator"><div className="gc-container"><div className="gc-section-head"><h2 id="osago-rf-exact-calculator" className="gc-h2">{dict.calculator.title}</h2><p className="gc-text-muted">{dict.calculator.subtitle}</p></div><div className="legacy-form-scope legacy-form-card"><DeferredHydration rootMargin="800px" minDelayMs={150}><OsagoRfCalculator dict={calcDict} /></DeferredHydration></div></div></section>

      <section id="osago-rf-order" className="gc-section gc-order-section"><div className="gc-container gc-order-layout"><aside className="gc-order-prep"><h2 className="gc-order-prep__title">{dict.form.title}</h2><p className="gc-order-prep__text">{dict.form.subtitle}</p></aside><div className="legacy-form-scope legacy-form-card gc-order-form-card"><OsagoOrderForm dict={formDict} /></div></div></section>

      <OsagoPassengerPriceCards lang={lang} dict={dict} variant="table" />
    </main>
  );
}
