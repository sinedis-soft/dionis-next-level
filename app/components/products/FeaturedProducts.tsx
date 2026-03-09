// app/components/products/FeaturedProducts.tsx
import Link from "next/link";
import type { Lang } from "@/dictionaries/header";
import type { ProductsPageUI } from "@/dictionaries/products";
import { getFeaturedProductsDictionary } from "@/dictionaries/products/featuredProducts";

type Props = {
  lang: Lang;
  base: string;
  ui: ProductsPageUI; // kept for compatibility, not used anymore
};

export default function FeaturedProducts({ lang, base }: Props) {
  const d = getFeaturedProductsDictionary(lang);

  return (
    <div className="u-mt-8">
      <div className="u-flex u-items-center u-justify-between u-mb-3">
        <h2 className="u-text-lg u-sm-text-xl u-font-semibold u-text--1a3a5f">
          {d.heading}
        </h2>
      </div>

      <div className="u-grid u-gap-6 u-sm-grid-cols-2">
        {d.items.map((p) => {
          const href = `${base}${p.hrefSuffix}`;
          return (
            <article
              key={href}
              className="u-rounded-3xl u-border u-border-black-10 u-bg-white u-shadow-sm u-p-6"
            >
              <h3 className="u-text-base u-sm-text-lg u-font-semibold u-text--1a3a5f">
                {p.title}
              </h3>

              <p className="u-mt-2 u-text-sm u-text-gray-700">{p.desc}</p>

              <div className="u-mt-4 u-flex u-gap-3 u-flex-wrap">
                <Link href={href} className="btn btn-primary" role="button">
                  {p.btn}
                </Link>

                <Link
                  href={`${base}/contacts`}
                  className="btn btn-secondary"
                  role="button"
                >
                  {d.requestBtn}
                </Link>
              </div>

              <p className="u-mt-4 u-text-xs u-text-gray-600">{d.onlineNote}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
