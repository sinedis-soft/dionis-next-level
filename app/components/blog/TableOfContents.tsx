import type { TocItem } from "@/lib/blog";

export default function TableOfContents({
  toc,
  title = "Содержание",
  className = "",
}: {
  toc: TocItem[];
  title?: string;
  className?: string;
}) {
  if (!toc.length) return null;

  return (
    <aside className={className}>
      <div className="rounded-2xl border bg-[#F9FAFB] p-5">
        <div className="text-sm font-semibold text-[#1A3A5F] mb-3">
          {title}
        </div>

        <nav aria-label="Table of contents" className="max-h-[70vh] overflow-auto pr-2">
          <ul className="space-y-2 text-sm">
            {toc.map((item) => (
              <li 
                key={item.id} 
                className={item.level === 3 ? "ml-4" : ""}
              >
                <a
                  href={`#${item.id}`}
                  className="text-gray-700 hover:text-[#1A3A5F] hover:underline"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
