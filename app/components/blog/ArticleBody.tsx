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

export default function ArticleBody({ children, className="", lang }: Props) {
  const patched = injectLang(children, lang);

  return (
    <div className={`u-mx-auto u-w-full u-max-w-3xl ${className}`}>
      <article
        className="ab-prose"
      >
        {patched}
      </article>
    </div>
  );
}
