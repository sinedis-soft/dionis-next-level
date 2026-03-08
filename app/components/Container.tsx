import type { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return <div className="u-mx-auto u-w-full u-max-w-6xl u-px-4 u-sm-px-6 u-lg-px-8">{children}</div>;
}
