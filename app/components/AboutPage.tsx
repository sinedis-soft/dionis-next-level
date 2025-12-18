// components/AboutPage.tsx
import Image from "next/image";
import type { AboutDictionary } from "@/dictionaries/about";
import type { HomeDictionary, ServiceConfig } from "@/dictionaries/home";
import type { Lang } from "@/dictionaries/header";

import ServicesCarousel from "@/components/ServicesCarousel"; // проверь путь/экспорт

type Props = {
  lang: Lang;
  t: AboutDictionary;
  services: HomeDictionary["services"];
};

type CarouselItem = ServiceConfig & { link: string };

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
      <h3 className="text-sm sm:text-base font-extrabold tracking-wide text-gray-900">
        {title}
      </h3>
      <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-600">
        {text}
      </p>
    </div>
  );
}

export default function AboutPage({ t, lang, services }: Props) {
  const greenCardLink = `/${lang}/green-card`;
  const osagoLink = `/${lang}/osago-rf`;

  // Приводим ServiceConfig[] к формату, который требует ServicesCarousel: { ...item, link }
  const otherServices: CarouselItem[] = services.otherServices.map((s) => ({
    ...s,
    link: `/${lang}${s.linkSuffix}`,
  }));

  return (
    <>
      <section className="py-10 sm:py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          {/* H1 */}
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1A3A5F]">
            {t.pageTitle}
          </h1>

          {/* About grid */}
          <div className="mt-10 sm:mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
              <div className="lg:col-span-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {t.about.leadTitle}
                </h2>

                {/* Logo */}
                <div className="mt-6 flex justify-center lg:justify-start lg:mt-30">
                  <Image
                    src="/dionis-crkl_2_960x960.webp"
                    alt="Dionis Insurance emblem"
                    width={280}
                    height={280}
                    quality={70}
                    loading="lazy"
                    sizes="(max-width: 1024px) 160px, 180px"
                    className="opacity-90"
                  />
                </div>
              </div>

              <div className="lg:col-span-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {t.about.features.map((f, idx) => (
                    <FeatureCard key={idx} title={f.title} text={f.text} />
                  ))}
                </div>

                <div className="mt-8">
                  <p className="text-base sm:text-lg font-semibold text-gray-900">
                    {t.about.cta}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal */}
                <div className="mt-12 sm:mt-16">
                <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                    {t.legal.orgTitle}
                    </h2>

                    {/* контакты/шапка — НЕ justify */}
                    <div className="mt-5 text-sm sm:text-base text-gray-700 leading-relaxed">
                    {t.legal.headerLines.map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                    </div>

                    <hr className="my-6 border-gray-200" />

                    {/* основной текст — justify */}
                    <div className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {t.legal.body.map((line, i) => {
                        if (!line.trim()) return <div key={i} className="h-3" />;

                        const isBullet = line.trim().startsWith("• ");
                        if (isBullet) {
                        return (
                            <ul key={i} className="list-disc pl-5 text-gray-700 my-2">
                            <li className="text-left">
                                {line.replace(/^•\s*/, "")}
                            </li>
                            </ul>
                        );
                        }

                        return (
                            <p
                                key={i}
                                className="my-2 text-justify [hyphens:auto]"
                                style={{ textAlign: "justify", textJustify: "inter-word" }}
                            >
                                {line}
                            </p>
                            );
                    })}
                    </div>
                </div>
            </div>

        </div>
      </section>

      {/* SERVICES */}
      <section
        className="py-12 sm:py-16 bg-white"
        aria-labelledby="services-heading"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2
              id="services-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight"
            >
              <span className="text-[#1A3A5F]">{services.titlePart1}</span>
              <span className="text-[#C89F4A]">{services.titlePart2}</span>
            </h2>
            <div className="mt-2 h-1 w-16 bg-[#C89F4A]" />
          </div>

          <div className="grid gap-6 lg:grid-cols-2 mb-10">
            {/* Green Card */}
            <article className="card overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <Image
                  src="/services/zk_photo.webp"
                  alt={services.greenCardCard.imageAlt}
                  width={600}
                  height={400}
                  quality={60}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                  className="h-56 md:h-full w-full object-cover"
                />
              </div>
              <div className="md:w-1/2 bg-[#052521] text-white px-6 py-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">
                    {services.greenCardCard.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-100 mb-3">
                    {services.greenCardCard.text1}
                  </p>
                  <p className="text-sm sm:text-base text-gray-300">
                    {services.greenCardCard.text2}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-[#FCD671]">
                    {services.greenCardCard.price}
                  </span>
                  <span className="text-gray-300">
                    {services.greenCardCard.term}
                  </span>
                </div>

                <div className="mt-5">
                  <a href={greenCardLink} className="btn w-full" role="button">
                    {services.greenCardCard.cta}
                  </a>
                </div>
              </div>
            </article>

            {/* OSAGO RF */}
            <article className="card overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <Image
                  src="/services/osago_rf_photo.webp"
                  alt={services.osagoCard.imageAlt}
                  width={600}
                  height={400}
                  quality={60}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                  className="h-56 md:h-full w-full object-cover"
                />
              </div>
              <div className="md:w-1/2 bg-[#3A120A] text-white px-6 py-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">
                    {services.osagoCard.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-100 mb-3">
                    {services.osagoCard.text1}
                  </p>
                  <p className="text-sm sm:text-base text-gray-300">
                    {services.osagoCard.text2}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-[#FCD671]">
                    {services.osagoCard.price}
                  </span>
                  <span className="text-gray-300">{services.osagoCard.term}</span>
                </div>

                <div className="mt-5">
                  <a href={osagoLink} className="btn w-full" role="button">
                    {services.osagoCard.cta}
                  </a>
                </div>
              </div>
            </article>
          </div>

          <ServicesCarousel
            heading={services.otherHeading}
            moreBtnText={services.moreBtn}
            items={otherServices}
          />
        </div>
      </section>
    </>
  );
}
