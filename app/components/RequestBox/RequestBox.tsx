// components/RequestBox/RequestBox.tsx
import Link from "next/link";

export type RequestBoxAction =
  | {
      kind: "link";
      href: string;
      label: string;
      variant?: "primary" | "secondary";
    }
  | {
      kind: "tel";
      tel: string; // raw digits or with +
      label: string; // what to show to user
      variant?: "primary" | "secondary";
    };

export default function RequestBox({
  title,
  text,
  actions,
  footnote,
  className,
}: {
  title: string;
  text: string;
  actions: RequestBoxAction[];
  footnote?: string;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-3xl border border-black/10 bg-[#F4F6FA] p-6 sm:p-8",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <h3 className="text-lg sm:text-xl font-semibold text-[#1A3A5F]">
        {title}
      </h3>

      <p className="mt-2 text-sm sm:text-base text-gray-700 max-w-3xl">
        {text}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        {actions.map((a, idx) => {
          const variant = a.variant ?? "primary";
          const btnClass = variant === "primary" ? "btn btn-primary" : "btn btn-secondary";

          if (a.kind === "link") {
            // internal or external ok
            const isInternal = a.href.startsWith("/");
            return isInternal ? (
              <Link key={idx} href={a.href} className={btnClass} role="button">
                {a.label}
              </Link>
            ) : (
              <a
                key={idx}
                href={a.href}
                className={btnClass}
                role="button"
                target="_blank"
                rel="noreferrer"
              >
                {a.label}
              </a>
            );
          }

          // tel
          const telHref = `tel:${a.tel.replace(/\s/g, "")}`;
          return (
            <a key={idx} href={telHref} className={btnClass} role="button">
              {a.label}
            </a>
          );
        })}
      </div>

      {footnote ? (
        <p className="mt-3 text-xs text-gray-600">{footnote}</p>
      ) : null}
    </div>
  );
}
