// components/blog/ArticleBody.tsx
import React, { type ReactNode } from "react";
import type { Lang } from "@/dictionaries/header";

// ✅ импортируем те MDX-блоки, которым нужен lang
import ContentStatus from "@/components/blog/mdx/blocks/ContentStatus";
import UpdateNotice from "@/components/blog/mdx/blocks/UpdateNotice";
import ScopeNote from "@/components/blog/mdx/blocks/ScopeNote";

type Props = {
  children: ReactNode;
  className?: string;
  lang: Lang;
};

// ✅ набор типов компонентов (ссылки), а не строковые имена
const LANG_AWARE_TYPES = new Set<any>([
  ContentStatus,
  UpdateNotice,
  ScopeNote,
  // добавляй сюда другие блоки при необходимости
]);

function injectLang(node: ReactNode, lang: Lang): ReactNode {
  if (Array.isArray(node)) return node.map((x) => injectLang(x, lang));
  if (!React.isValidElement(node)) return node;

  const originalChildren = (node.props as any)?.children;
  const nextChildren =
    originalChildren != null ? injectLang(originalChildren, lang) : originalChildren;

  // ✅ если это нужный блок — добавляем lang (если его ещё нет)
  if (LANG_AWARE_TYPES.has(node.type)) {
    const props: any = node.props ?? {};
    if (props.lang == null) {
      return React.cloneElement(node, { ...props, lang }, nextChildren);
    }
  }

  // обновляем детей, если они изменились
  if (nextChildren !== originalChildren) {
    return React.cloneElement(node, node.props as any, nextChildren);
  }

  return node;
}

export default function ArticleBody({ children, className = "", lang }: Props) {
  const patched = injectLang(children, lang);

  return (
    <div className={`mx-auto w-full max-w-3xl ${className}`}>
      <article
        className={[
          "prose prose-slate max-w-none",
          "prose-p:my-4 prose-li:my-1",
          "prose-h2:mt-10 prose-h2:mb-3",
          "prose-h3:mt-7 prose-h3:mb-2",
          "prose-hr:my-10",
          "prose-a:text-[#23376C] prose-a:font-medium prose-a:no-underline hover:prose-a:underline",
          "prose-a:underline-offset-4",
          "prose-blockquote:border-l-[#EBCA45] prose-blockquote:bg-[#F8FAFF] prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-xl",
          "prose-blockquote:not-italic prose-blockquote:text-slate-700",
          "prose-code:rounded-md prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5",
          "prose-code:text-slate-800",
          "prose-pre:rounded-2xl prose-pre:bg-slate-950 prose-pre:text-slate-100",
          "prose-pre:px-4 prose-pre:py-3 prose-pre:overflow-x-auto",
          "prose-table:text-sm",
          "prose-th:bg-slate-50 prose-th:text-slate-900",
          "prose-td:align-top",
          "prose-img:rounded-2xl prose-img:shadow-sm",
          "prose-p:leading-7",
          "dark:prose-invert dark:prose-a:text-[#EBCA45]",
          "dark:prose-blockquote:bg-slate-900/40 dark:prose-code:bg-slate-800",
          "dark:prose-pre:bg-black",
        ].join(" ")}
      >
        {patched}
      </article>
    </div>
  );
}
