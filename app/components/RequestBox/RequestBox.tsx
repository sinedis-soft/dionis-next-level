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
        "u-rounded-3xl u-border u-border-black-10 u-bg--f4f6fa u-p-6 u-sm-p-8",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <h3 className="u-text-lg u-sm-text-xl u-font-semibold u-text--1a3a5f">
        {title}
      </h3>

      <p className="u-mt-2 u-text-sm u-sm-text-base u-text-gray-700 u-max-w-3xl">
        {text}
      </p>

      <div className="u-mt-5 u-flex u-flex-wrap u-gap-3">
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
        <p className="u-mt-3 u-text-xs u-text-gray-600">{footnote}</p>
      ) : null}
    </div>
  );
}
