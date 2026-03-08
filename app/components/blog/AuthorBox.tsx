// components/blog/AuthorBox.tsx
import Image from "next/image";
import Link from "next/link";
import type { ArticleAuthor } from "@/lib/blog";

type Props = {
  author: ArticleAuthor;
  lang?: string;
  className?: string;

  // ✅ режим использования (влияет на длину текста)
  variant?: "article" | "profile";

  // ✅ управление ссылкой явно (без догадок)
  showProfileLink?: boolean;
};

const DEFAULT_AUTHOR_PHOTO = "/authors/default.webp";

export default function AuthorBox({
  author,
  lang,
  className,
  variant = "article",
  showProfileLink, // если не задан — определим по variant
}: Props) {
  const authorHref =
    typeof lang === "string" && lang.length > 0
      ? `/${lang}/authors/${author.slug}`
      : `/authors/${author.slug}`;

  const photoSrc = author.photo ?? DEFAULT_AUTHOR_PHOTO;

  const text =
    variant === "article"
      ? author.shortBio ?? author.bio
      : author.bio ?? author.shortBio;

  // ✅ по умолчанию:
  // - в статье ссылка нужна
  // - в профиле автора — НЕ нужна
  const shouldShowLink =
    typeof showProfileLink === "boolean"
      ? showProfileLink
      : variant === "article";

  return (
    <section
      className={[
        "u-rounded-2xl u-border u-border-slate-200 u-bg-white u-p-4 shadow-sm",
        className ?? "",
      ].join(" ")}
      aria-label="Об авторе"
    >
      <div className="u-flex u-items-start u-gap-4">
        <div className="u-relative u-h-14 u-w-14 shrink-0 u-overflow-hidden u-rounded-full u-border u-border-slate-200 u-bg-slate-100">
          <Image
            src={photoSrc}
            alt={author.name}
            fill
            sizes="56px"
            className="u-object-cover"
          />
        </div>

        <div className="u-min-w-0 u-flex-1">
          <div className="u-flex u-flex-wrap u-items-center u-gap-x-3 u-gap-y-1">
            <div className="u-font-semibold u-text-slate-900">{author.name}</div>
            {author.title ? (
              <div className="u-text-sm u-text-slate-600">{author.title}</div>
            ) : null}
          </div>

          {text ? (
            <p
              className={[
                "u-mt-1 u-text-sm u-text-slate-700",
                variant === "article" ? "line-clamp-2" : "u-leading-relaxed",
              ].join(" ")}
            >
              {text}
            </p>
          ) : null}

          {/* ✅ ссылка включается/выключается явно */}
          {shouldShowLink ? (
            <div className="u-mt-2">
              <Link
                href={authorHref}
                className="u-text-sm u-font-medium u-text-slate-900 u-underline u-underline-offset-4 u-hover-opacity-80"
              >
                Профиль автора
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
