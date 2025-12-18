// app/[lang]/about/page.tsx
import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";

export const dynamic = "force-static";

type Props = {
  params: { lang: Lang };
};

const titles: Record<Lang, string> = {
  ru: "О компании",
  kz: "Компания туралы",
  en: "About",
};

const descriptions: Record<Lang, string> = {
  ru: "Информация о компании Dionis Insurance.",
  kz: "Dionis Insurance компаниясы туралы ақпарат.",
  en: "About Dionis Insurance.",
};

export function generateMetadata({ params }: Props): Metadata {
  const lang = params.lang;
  return {
    title: titles[lang],
    description: descriptions[lang],
  };
}

export default function AboutPage({ params }: Props) {
  const lang = params.lang;

  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1A3A5F]">
          {titles[lang]}
        </h1>

        <p className="mt-4 text-gray-700">
          {lang === "ru" && "Страница в разработке. Скоро добавим подробности."}
          {lang === "kz" && "Бет әзірленуде. Жақында толықтырамыз."}
          {lang === "en" && "Page is under construction. We’ll add details soon."}
        </p>
      </div>
    </section>
  );
}
