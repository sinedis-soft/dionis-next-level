import type { TocItem } from "@/lib/blog";

export default function TableOfContents({
  toc,
  title,
  navLabel,
  className = "",
}: {
  toc: TocItem[];
  title: string;
  navLabel: string;
  className?: string;
}) {
  if (!toc.length) return null;

  return (
    <aside className={className}>
      <div className="u-rounded-2xl u-border u-bg--f9fafb u-p-5">
        <div className="u-text-sm u-font-semibold u-text--1a3a5f u-mb-3">
          {title}
        </div>

        <nav aria-label={navLabel} className="u-max-h--70vh u-overflow-auto u-pr-2">
          <ul className="u-space-y-2 u-text-sm">
            {toc.map((item) => (
              <li key={item.id} className={item.level === 3 ? "u-ml-4" : ""}>
                <a
                  href={`#${item.id}`}
                  className="u-text-gray-700 u-hover-text--1a3a5f u-hover-underline"
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
