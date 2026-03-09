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
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
      <span>
        Опубликовано: <span className="text-slate-800">{published}</span>
      </span>

      {updated && (
        <span>
          Обновлено: <span className="text-slate-800">{updated}</span>
        </span>
      )}

      {actual && (
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700">
          Актуально на <span className="text-slate-900">{actual}</span>
        </span>
      )}
    </div>
  );
}
