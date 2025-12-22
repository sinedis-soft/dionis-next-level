// components/blog/ArticleBody.tsx
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function ArticleBody({ children, className = "" }: Props) {
  return (
    <div className={`mx-auto w-full max-w-3xl ${className}`}>
      <article
        className={[
          // базовая типографика
          "prose prose-slate max-w-none",

          // размеры/ритм
          "prose-p:my-4 prose-li:my-1",
          "prose-h2:mt-10 prose-h2:mb-3",
          "prose-h3:mt-7 prose-h3:mb-2",
          "prose-hr:my-10",

          // ссылки
          "prose-a:text-[#23376C] prose-a:font-medium prose-a:no-underline hover:prose-a:underline",
          "prose-a:underline-offset-4",

          // цитаты
          "prose-blockquote:border-l-[#EBCA45] prose-blockquote:bg-[#F8FAFF] prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-xl",
          "prose-blockquote:not-italic prose-blockquote:text-slate-700",

          // инлайн-код (в тексте)
          "prose-code:rounded-md prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5",
          "prose-code:text-slate-800",

          // pre/code blocks
          "prose-pre:rounded-2xl prose-pre:bg-slate-950 prose-pre:text-slate-100",
          "prose-pre:px-4 prose-pre:py-3 prose-pre:overflow-x-auto",

          // таблицы
          "prose-table:text-sm",
          "prose-th:bg-slate-50 prose-th:text-slate-900",
          "prose-td:align-top",

          // медиа
          "prose-img:rounded-2xl prose-img:shadow-sm",

          // мобильный комфорт
          "prose-p:leading-7",

          // dark mode (если используешь)
          "dark:prose-invert dark:prose-a:text-[#EBCA45]",
          "dark:prose-blockquote:bg-slate-900/40 dark:prose-code:bg-slate-800",
          "dark:prose-pre:bg-black",

        ].join(" ")}
      >
        {children}
      </article>
    </div>
  );
}
