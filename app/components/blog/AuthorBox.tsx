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
        "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm",
        className ?? "",
      ].join(" ")}
      aria-label="Об авторе"
    >
      <div className="flex items-start gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
          <Image
            src={photoSrc}
            alt={author.name}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <div className="font-semibold text-slate-900">{author.name}</div>
            {author.title ? (
              <div className="text-sm text-slate-600">{author.title}</div>
            ) : null}
          </div>

          {text ? (
            <p
              className={[
                "mt-1 text-sm text-slate-700",
                variant === "article" ? "line-clamp-2" : "leading-relaxed",
              ].join(" ")}
            >
              {text}
            </p>
          ) : null}

          {/* ✅ ссылка включается/выключается явно */}
          {shouldShowLink ? (
            <div className="mt-2">
              <Link
                href={authorHref}
                className="text-sm font-medium text-slate-900 underline underline-offset-4 hover:opacity-80"
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
