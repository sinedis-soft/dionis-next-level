import Link from "next/link";
import Script from "next/script";
import type { Lang } from "@/dictionaries/header";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://dionis-insurance.kz").replace(/\/$/, "");

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({ lang, items }: { lang: Lang; items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <Script id={`ld-breadcrumbs-${lang}-${items.map((i) => i.label).join("-")}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="ap-bc">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <span key={`${item.label}-${idx}`}>
              {item.href && !isLast ? (
                <Link className="ap-bc__link" href={item.href}>{item.label}</Link>
              ) : (
                <span className={isLast ? "ap-bc__current" : "ap-bc__link"}>{item.label}</span>
              )}
              {!isLast ? <span className="ap-bc__sep" aria-hidden="true">→</span> : null}
            </span>
          );
        })}
      </nav>
    </>
  );
}
