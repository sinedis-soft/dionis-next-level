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
      <div className="u-flex u-items-center u-justify-between u-mb-4">
        <h3 className="u-text-lg u-sm-text-xl u-font-semibold u-text--1a3a5f">
          {heading}
        </h3>

        <div className="u-hidden u-lg-flex u-gap-2">
          <button
            type="button"
            className="u-w-8 u-h-8 u-rounded-full u-border u-border-gray-300 u-flex u-items-center u-justify-center u-text--1a3a5f u-hover-bg-gray-100 u-transition"
            onClick={() => scrollServices("left")}
            aria-label="Прокрутить услуги влево"
          >
            ‹
          </button>
          <button
            type="button"
            className="u-w-8 u-h-8 u-rounded-full u-border u-border-gray-300 u-flex u-items-center u-justify-center u-text--1a3a5f u-hover-bg-gray-100 u-transition"
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
        className="u-hidden u-lg-flex u-gap-6 u-overflow-x-auto u-scrollbar-hide u-pb-2"
      >
        {items.map((service) => (
          <article
            key={service.key}
            data-service-card
            className="card u-min-w--260px u-max-w--260px u-flex-shrink-0 u-flex u-flex-col"
          >
            <div className="u-aspect-square u-w-full u-overflow-hidden u-rounded-lg">
              <Image
                src={service.image}
                alt={service.title}
                width={400}
                height={400}
                className="u-h-full u-w-full u-object-cover"
              />
            </div>

            <div className="u-px-5 u-py-4 u-flex u-flex-col u-flex-1">
              <h4 className="u-text-sm u-font-semibold u-text--1a3a5f u-mb-2">
                {service.title}
              </h4>

              <ul className="u-text-sm u-text-gray-700 u-mb-4 u-list-disc u-pl-4 u-space-y-1">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="u-mt-auto">
                <a href={service.link} className="btn u-w-full u-text-center">
                  {moreBtnText}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Mobile list */}
      <div className="u-grid u-gap-6 u-mt-4 u-lg-hidden">
        {items.map((service) => (
          <article key={service.key} className="card u-flex u-flex-col u-overflow-hidden">
            <div className="u-aspect-square u-w-full u-overflow-hidden u-rounded-lg">
              <Image
                src={service.image}
                alt={service.title}
                width={400}
                height={400}
                className="u-h-full u-w-full u-object-cover"
              />
            </div>

            <div className="u-px-5 u-py-4 u-flex u-flex-col">
              <h4 className="u-text-sm u-font-semibold u-text--1a3a5f u-mb-2">
                {service.title}
              </h4>

              <ul className="u-text-sm u-text-gray-700 u-mb-4 u-list-disc u-pl-4 u-space-y-1">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <a href={service.link} className="btn u-w-full u-text-center">
                {moreBtnText}
              </a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
