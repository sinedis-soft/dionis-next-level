import type { BlogArticleCard } from "@/lib/blog";

type Props = {
  article: BlogArticleCard;
};

export default function ArticleCard({ article }: Props) {
  return (
    <a
      href={`/${article.lang}/blog/${article.slug}`}
      className="group rounded-lg border p-4 hover:border-slate-400 transition"
    >
      <h4 className="font-medium group-hover:underline">{article.title}</h4>

      <p className="mt-1 text-sm text-gray-600">{article.excerpt}</p>

      <div className="mt-3 text-xs text-gray-500 flex gap-2">
        <span>{article.publishedAt}</span>
        <span>•</span>
        <span>{article.readingTime}</span>
      </div>
    </a>
  );
}
