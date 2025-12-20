// app/components/ServicesGrid.tsx
"use client";

import Image from "next/image";
import type { ServiceConfig } from "@/dictionaries/home";

export default function ServicesGrid({
  heading,
  items,
  moreBtnText,
}: {
  heading: string;
  items: Array<ServiceConfig & { link: string }>;
  moreBtnText: string;
}) {
  return (
    <section aria-label={heading} className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-[#1A3A5F]">
          {heading}
        </h3>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((service) => (
          <article
            key={service.key}
            className="card card-static overflow-hidden flex flex-col"
          >
            <div className="aspect-[16/10] w-full overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                width={800}
                height={500}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="px-5 py-4 flex flex-col flex-1">
              <h4 className="text-sm sm:text-base font-semibold text-[#1A3A5F] mb-2">
                {service.title}
              </h4>

              <ul className="text-sm text-gray-700 mb-4 list-disc pl-4 space-y-1">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="mt-auto">
                <a
                  href={service.link}
                  className="btn btn-secondary w-full text-center"
                  role="button"
                >
                  {moreBtnText}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
