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
    <div className="mt-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg sm:text-xl font-semibold text-[#1A3A5F]">
          {d.heading}
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {d.items.map((p) => {
          const href = `${base}${p.hrefSuffix}`;
          return (
            <article
              key={href}
              className="rounded-3xl border border-black/10 bg-white shadow-sm p-6"
            >
              <h3 className="text-base sm:text-lg font-semibold text-[#1A3A5F]">
                {p.title}
              </h3>

              <p className="mt-2 text-sm text-gray-700">{p.desc}</p>

              <div className="mt-4 flex gap-3 flex-wrap">
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

              <p className="mt-4 text-xs text-gray-600">{d.onlineNote}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
