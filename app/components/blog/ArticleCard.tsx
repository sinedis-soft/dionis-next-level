import type { BlogArticleCard } from "@/lib/blog";

type Props = {
  article: BlogArticleCard;
};

export default function ArticleCard({ article }: Props) {
  return (
    <a
      href={`/${article.lang}/blog/${article.slug}`}
      className="u-group u-rounded-lg u-border u-p-4 u-hover-border-slate-400 u-transition"
    >
      <h4 className="u-font-medium u-group-hover-underline">{article.title}</h4>

      <p className="u-mt-1 u-text-sm u-text-gray-600">{article.excerpt}</p>

      <div className="u-mt-3 u-text-xs u-text-gray-500 u-flex u-gap-2">
        <span>{article.publishedAt}</span>
        <span>•</span>
        <span>{article.readingTime}</span>
      </div>
    </a>
  );
}
