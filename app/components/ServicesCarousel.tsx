// app/components/ServicesCarousel.tsx
"use client";

import Image from "next/image";
import { useRef } from "react";
import type { ServiceConfig } from "@/dictionaries/home";

export default function ServicesCarousel({
  heading,
  items,
  moreBtnText,
}: {
  heading: string;
  items: Array<ServiceConfig & { link: string }>;
  moreBtnText: string;
}) {
  const servicesScrollRef = useRef<HTMLDivElement | null>(null);

  function scrollServices(direction: "left" | "right") {
    const el = servicesScrollRef.current;
    if (!el) return;

    const firstCard = el.querySelector<HTMLDivElement>("[data-service-card]");
    const cardWidth = firstCard?.clientWidth ?? 320;

    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-[#1A3A5F]">
          {heading}
        </h3>

        <div className="hidden lg:flex gap-2">
          <button
            type="button"
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-[#1A3A5F] hover:bg-gray-100 transition"
            onClick={() => scrollServices("left")}
            aria-label="Прокрутить услуги влево"
          >
            ‹
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-[#1A3A5F] hover:bg-gray-100 transition"
            onClick={() => scrollServices("right")}
            aria-label="Прокрутить услуги вправо"
          >
            ›
          </button>
        </div>
      </div>

      {/* Desktop carousel */}
      <div
        ref={servicesScrollRef}
        className="hidden lg:flex gap-6 overflow-x-auto scrollbar-hide pb-2"
      >
        {items.map((service) => (
          <article
            key={service.key}
            data-service-card
            className="card min-w-[260px] max-w-[260px] flex-shrink-0 flex flex-col"
          >
            <div className="aspect-square w-full overflow-hidden rounded-lg">
              <Image
                src={service.image}
                alt={service.title}
                width={400}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="px-5 py-4 flex flex-col flex-1">
              <h4 className="text-sm font-semibold text-[#1A3A5F] mb-2">
                {service.title}
              </h4>

              <ul className="text-sm text-gray-700 mb-4 list-disc pl-4 space-y-1">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="mt-auto">
                <a href={service.link} className="btn w-full text-center">
                  {moreBtnText}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Mobile list */}
      <div className="grid gap-6 mt-4 lg:hidden">
        {items.map((service) => (
          <article key={service.key} className="card flex flex-col overflow-hidden">
            <div className="aspect-square w-full overflow-hidden rounded-lg">
              <Image
                src={service.image}
                alt={service.title}
                width={400}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="px-5 py-4 flex flex-col">
              <h4 className="text-sm font-semibold text-[#1A3A5F] mb-2">
                {service.title}
              </h4>

              <ul className="text-sm text-gray-700 mb-4 list-disc pl-4 space-y-1">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <a href={service.link} className="btn w-full text-center">
                {moreBtnText}
              </a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
