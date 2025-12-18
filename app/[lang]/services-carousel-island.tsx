"use client";

import { useMemo } from "react";
import type { Lang } from "@/dictionaries/header";
import type { HomeDictionary } from "@/dictionaries/home";

import ServicesCarousel from "@/components/ServicesCarousel";
import DeferredHydration from "@/components/DeferredHydration";

export default function ServicesCarouselIsland({
  lang,
  t,
}: {
  lang: Lang;
  t: HomeDictionary;
}) {
  const otherServices = useMemo(
    () =>
      t.services.otherServices.map((service) => ({
        ...service,
        link: `/${lang}${service.linkSuffix}`,
      })),
    [t.services.otherServices, lang]
  );

  return (
    <DeferredHydration rootMargin="800px" minDelayMs={150}>
      <ServicesCarousel
        heading={t.services.otherHeading}
        moreBtnText={t.services.moreBtn}
        items={otherServices}
      />
    </DeferredHydration>
  );
}
