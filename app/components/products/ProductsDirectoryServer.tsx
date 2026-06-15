// app/components/products/ProductsDirectoryServer.tsx
import Image from "next/image";
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
    <section
      id="products-directory"
      className="pr-directory"
      aria-labelledby="products-directory-heading"
    >
      <div className="gc-container">
        <div className="pr-directory__head">
          <div>
            <p className="pr-directory__eyebrow">{ui.quick}</p>
            <h2 id="products-directory-heading" className="pr-directory__title">
              {ui.guideTitle}
            </h2>
          </div>

          <div className="pr-directory__guide" aria-label={ui.guideTitle}>
            {ui.guideItems.map((item, index) => (
              <p key={item} className="pr-directory__guideItem">
                <span aria-hidden="true">{index + 1}</span>
                {item}
              </p>
            ))}
          </div>
        </div>

        <nav aria-label={ui.quick}>
          <div className="pr-directory__grid">
            {categories.map((category) => {
              const isActive = category.sectionKey === active;

              return (
                <Link
                  key={category.key}
                  href={buildProductsUrl(base, category.sectionKey)}
                  scroll={false}
                  aria-current={isActive ? "page" : undefined}
                  className={cx("pr-product-card", isActive && "is-active")}
                >
                  <span className="pr-product-card__media" aria-hidden="true">
                    <Image
                      src={category.image}
                      alt=""
                      width={360}
                      height={220}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="pr-product-card__img"
                    />
                  </span>

                  <span className="pr-product-card__body">
                    <span className="pr-product-card__title">{category.title[lang]}</span>
                    <span className="pr-product-card__lead">{category.lead[lang]}</span>
                    <span className="pr-product-card__bullets">
                      {category.bullets[lang].map((bullet) => (
                        <span key={bullet} className="pr-product-card__bullet">
                          {bullet}
                        </span>
                      ))}
                    </span>
                    <span className="pr-product-card__cta">{ui.btnToSection}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </section>
  );
}
