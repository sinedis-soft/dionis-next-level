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
    <section aria-label={heading} className="svc-section">
      <div className="svc-head">
        <h3 className="svc-title">{heading}</h3>
      </div>

      <div className="svc-grid">
        {items.map((service, index) => (
          <article key={service.key} className="card card-static svc-card">
            <div className="svc-card__media">
              <Image
                src={service.image}
                alt={service.title}
                width={800}
                height={500}
                loading="lazy"
                sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                className="svc-card__img"
              />
            </div>

            <div className="svc-card__body">
              <div className="svc-card__kicker" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h4 className="svc-card__title">{service.title}</h4>

              <ul className="svc-card__list">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="svc-card__cta">
                <a href={service.link} className="btn btn-secondary svc-card__btn" role="button">
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