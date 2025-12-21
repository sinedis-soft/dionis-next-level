// components/products/FeaturedProducts.tsx
import Link from "next/link";
import type { Lang } from "@/dictionaries/header";
import type { ProductsPageUI } from "@/dictionaries/products";

type FeaturedItem = {
  title: string;
  desc: string;
  href: string;
  btn: string;
};

export default function FeaturedProducts({
  lang,
  base,
  ui,
}: {
  lang: Lang;
  base: string;
  ui: ProductsPageUI;
}) {
  const featured: FeaturedItem[] = [
    {
      title: ui.btnGreenCard,
      desc: ui.featuredGreenCardDesc,
      href: `${base}/green-card`,
      btn: ui.btnGreenCard,
    },
    {
      title: ui.btnOsago,
      desc: ui.featuredOsagoDesc,
      href: `${base}/osago-rf`,
      btn: ui.btnOsago,
    },
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg sm:text-xl font-semibold text-[#1A3A5F]">
          {ui.featured}
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {featured.map((p) => (
          <article
            key={p.href}
            className="rounded-3xl border border-black/10 bg-white shadow-sm p-6"
          >
            <h3 className="text-base sm:text-lg font-semibold text-[#1A3A5F]">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-gray-700">{p.desc}</p>

            <div className="mt-4 flex gap-3 flex-wrap">
              <Link href={p.href} className="btn btn-primary" role="button">
                {p.btn}
              </Link>
              <Link href={`${base}/contacts`} className="btn btn-secondary" role="button">
                {ui.btnRequest}
              </Link>
            </div>

            <p className="mt-4 text-xs text-gray-600">{ui.onlineNote}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
