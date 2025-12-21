import type { Lang } from "@/dictionaries/header";
import { getAllArticles } from "@/lib/blog";
import BlogGrid from "@/components/blog/BlogGrid";

export default async function BlogIndexPage(
  props: { params: Promise<{ lang: Lang }> }
) {
  const { lang } = await props.params;
  const articles = await getAllArticles(lang);

  return (
    <main className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#1A3A5F]">Блог</h1>
        <p className="mt-2 text-gray-600">
          Разбор страховых ситуаций, лайфхаки, изменения правил и практические кейсы.
        </p>

        <BlogGrid lang={lang} articles={articles} />
      </div>
    </main>
  );
}
