// components/blog/ArticleMeta.tsx
import { formatDateISO } from "@/lib/formatDate";

type Props = {
  locale: string; // например "ru-RU"
  publishedAt: string;
  updatedAt?: string;
  // "Актуально на ..." — как правило это updatedAt, но даем переопределение
  актуальноНа?: string;
};

export default function ArticleMeta({
  locale,
  publishedAt,
  updatedAt,
  актуальноНа,
}: Props) {
  const published = formatDateISO(publishedAt, locale);

  const updated =
    updatedAt && updatedAt.trim().length > 0
      ? formatDateISO(updatedAt, locale)
      : null;

  const actualISO = (актуальноНа ?? updatedAt)?.trim();
  const actual =
    actualISO && actualISO.length > 0 ? formatDateISO(actualISO, locale) : null;

  return (
    <div className="u-flex u-flex-wrap u-items-center u-gap-x-4 u-gap-y-1 u-text-sm u-text-slate-600">
      <span>
        Опубликовано: <span className="u-text-slate-800">{published}</span>
      </span>

      {updated && (
        <span>
          Обновлено: <span className="u-text-slate-800">{updated}</span>
        </span>
      )}

      {actual && (
        <span className="u-rounded-full u-border u-border-slate-200 u-bg-slate-50 u-px-3 u-py-1 u-text-slate-700">
          Актуально на <span className="u-text-slate-900">{actual}</span>
        </span>
      )}
    </div>
  );
}
