import type { ReactNode } from "react";
import Container from "./Container";

export default function Section({
  title,
  subtitle,
  children,
  className="",
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <Container>
        {title ? (
          <div className="u-mb-6 u-sm-mb-8">
            <h2 className="u-text-2xl u-sm-text-3xl u-font-extrabold u-tracking-tight u-text-gray-900">
              {title}
            </h2>
            {subtitle ? (
              <p className="u-mt-2 u-text-sm u-sm-text-base u-text-gray-600 u-leading-relaxed">
                {subtitle}
              </p>
            ) : null}
          </div>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
