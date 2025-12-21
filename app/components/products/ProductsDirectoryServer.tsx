// app/components/products/ProductsDirectoryServer.tsx
import Link from "next/link";
import type { Lang } from "@/dictionaries/header";
import type {
  Category,
  ProductsPageUI,
  ProductsSectionKey,
} from "@/dictionaries/products";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function buildProductsUrl(base: string, section: ProductsSectionKey) {
  return `${base}/products?section=${section}`;
}

export default function ProductsDirectoryServer({
  categories,
  lang,
  base,
  ui,
  active,
}: {
  categories: Category[];
  lang: Lang;
  base: string;
  ui: ProductsPageUI;
  active: ProductsSectionKey;
}) {
  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-lg sm:text-xl font-semibold text-[#1A3A5F] mb-4">
          {ui.quick}
        </h2>

        {/* GRID: 2 rows × 3 columns */}
        <nav aria-label={ui.quick}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => {
              const isActive = c.sectionKey === active;

              return (
                <Link
                  key={c.key}
                  href={buildProductsUrl(base, c.sectionKey)}
                  scroll={false}
                  aria-current={isActive ? "page" : undefined}
                  className={cx(
                    "btn btn-wide justify-center text-center",
                    isActive
                      ? "btn-primary pointer-events-none"
                      : "btn-secondary"
                  )}
                >
                  {c.title[lang]}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </section>
  );
}
