import type { ReactNode } from "react";
import Container from "./Container";

export default function Section({
  title,
  subtitle,
  children,
  className = "",
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
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
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
