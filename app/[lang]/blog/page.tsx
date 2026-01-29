import type { Lang } from "@/dictionaries/header";
import { getAllArticles } from "@/lib/blog";
import BlogGrid from "@/components/blog/BlogGrid";
import { getBlogDictionary } from "@/dictionaries/blog";

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;

  const articles = await getAllArticles(lang);
  const dict = getBlogDictionary(lang);

  return (
    <main className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#1A3A5F]">{dict.title}</h1>
        <p className="mt-2 text-gray-600">{dict.description}</p>

        <BlogGrid
          lang={lang}
          articles={articles}
          ui={{
            searchPlaceholder: dict.searchPlaceholder,
            allTag: dict.allTag,
          }}
        />
      </div>
    </main>
  );
}
