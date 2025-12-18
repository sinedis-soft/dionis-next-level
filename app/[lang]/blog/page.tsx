// app/[lang]/blog/page.tsx
import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";

export const dynamic = "force-static";

type Props = {
  params: { lang: Lang };
};

const titles: Record<Lang, string> = {
  ru: "Блог",
  kz: "Блог",
  en: "Blog",
};

const descriptions: Record<Lang, string> = {
  ru: "Новости и статьи Dionis Insurance.",
  kz: "Dionis Insurance жаңалықтары мен мақалалары.",
  en: "News and articles from Dionis Insurance.",
};

export function generateMetadata({ params }: Props): Metadata {
  const lang = params.lang;
  return {
    title: titles[lang],
    description: descriptions[lang],
  };
}

export default function BlogPage({ params }: Props) {
  const lang = params.lang;

  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1A3A5F]">
          {titles[lang]}
        </h1>

        <p className="mt-4 text-gray-700">
          {lang === "ru" && "Публикации скоро появятся."}
          {lang === "kz" && "Жарияланымдар жақында шығады."}
          {lang === "en" && "Posts are coming soon."}
        </p>
      </div>
    </section>
  );
}
