// app/[lang]/home/HomeClient.tsx (или где у тебя лежит этот компонент)
"use client";

import Image from "next/image";
import { keepShortWords } from "@/lib/keepShortWords";
import { useMemo } from "react";

import type { Lang } from "@/dictionaries/header";
import type { HomeDictionary } from "@/dictionaries/home";
import type { AgreementDictionary } from "@/dictionaries/agreement";

import ServicesGrid from "@/components/ServicesGrid";
import ContactForm from "@/components/ContactForm";
import { BrokerSection } from "@/components/BrokerSection";
import DeferredHydration from "@/components/DeferredHydration";

type Props = {
  lang: Lang;
  t: HomeDictionary;
  agreement: AgreementDictionary;
};

/* локальный helper */
function BenefitIcon({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <svg viewBox="0 0 24 24" className="hp-benefitIcon" fill="none" aria-hidden="true">
          <path
            d="M12 8v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 24 24" className="hp-benefitIcon" fill="none" aria-hidden="true">
          <path
            d="M4 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 13h8M8 17h6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 24 24" className="hp-benefitIcon" fill="none" aria-hidden="true">
          <path
            d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="hp-benefitIcon" fill="none" aria-hidden="true">
          <path
            d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export default function HomeClient({ lang, t, agreement }: Props) {
  const greenCardLink = `/${lang}/green-card`;
  const osagoLink = `/${lang}/osago-rf`;
  const productsLink = `/${lang}/products`;

  const otherServices = useMemo(
    () =>
      t.services.otherServices.map((service) => ({
        ...service,
        link: `/${lang}${service.linkSuffix}`,
      })),
    [t.services.otherServices, lang]
  );

  return (
    <main className="hp-page">
      {/* HERO */}
      <section className="hp-hero">
        <div className="hp-hero__bg" aria-hidden="true" />
        <div className="container">
          <div className="hp-hero__grid">
            <div className="hp-hero__left">
              <h1 className="hp-hero__title" style={{ whiteSpace: "pre-line" }}>
                {keepShortWords(t.hero.title)}
              </h1>

              <p className="hp-hero__subtitle">{t.hero.subtitle}</p>

              <div className="hp-hero__cta">
                <a href={greenCardLink} role="button" className="btn btn-primary btn-wide">
                  {t.hero.greenCardBtn}
                </a>
                <a href={osagoLink} role="button" className="btn btn-secondary btn-wide">
                  {t.hero.osagoBtn}
                </a>
                <a href={productsLink} role="button" className="btn btn-secondary btn-wide">
                  {t.hero.otherBtn}
                </a>
              </div>
            </div>

            <div className="hp-hero__right">
              <Image
                src="/hero.png"
                alt={t.hero.heroAlt}
                width={510}
                height={510}
                priority
                fetchPriority="high"
                sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, (max-width: 1280px) 420px, 480px"
                className="hp-hero__logo"
              />
            </div>
          </div>
        </div>
      </section>

      <DeferredHydration rootMargin="800px" minDelayMs={150}>
        {/* BENEFITS */}
        <section className="hp-benefits" aria-labelledby="benefits-heading">
          <div className="container">
            <h2 id="benefits-heading" className="hp-sectionTitle">
              {keepShortWords(t.benefits.title)}
            </h2>
            <p className="hp-sectionIntro">{t.benefits.subtitle}</p>

            <div className="hp-benefits__grid">
              {t.benefits.cards.map((card, idx) => (
                <article key={idx} className="card hp-benefitCard">
                  <div className="hp-benefitCard__iconWrap" aria-hidden="true">
                    <BenefitIcon index={idx} />
                  </div>

                  <div className="hp-benefitCard__value">{card.value}</div>
                  <div className="hp-benefitCard__label">{card.label}</div>
                  <p className="hp-benefitCard__text">{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* DIRECTOR */}
        <section className="hp-director" aria-labelledby="director-message-heading">
          <div className="container">
            <h2 id="director-message-heading" className="hp-director__title">
              {keepShortWords(t.director.heading)}
            </h2>

            <div className="card hp-director__card">
              <div className="hp-director__grid">
                <article className="hp-director__text">
                  <div className="hp-director__paragraphs">
                    {t.director.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  <div className="hp-director__sign">
                    {t.director.signLines.map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                  </div>

                  <div className="hp-director__signature">
                    <Image
                      src="/director-signature.webp"
                      alt={t.director.signatureAlt}
                      width={180}
                      height={110}
                      quality={60}
                      loading="lazy"
                      sizes="(max-width: 640px) 150px, 180px"
                      className="hp-director__signatureImg"
                    />
                  </div>
                </article>

                <aside className="hp-director__photoWrap">
                  <div className="hp-director__photo">
                    <Image
                      src="/Фон.png"
                      alt={t.director.logoAlt}
                      width={340}
                      height={340}
                      quality={80}
                      sizes="(max-width: 1024px) 170px, 170px"
                      className="hp-director__photoImg"
                    />
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="hp-services" aria-labelledby="services-heading">
          <div className="container">
            <div className="hp-services__head">
              <h2 id="services-heading" className="hp-services__title">
                <span className="hp-services__titleBlue">{t.services.titlePart1}</span>
                <span className="hp-services__titleGold">{t.services.titlePart2}</span>
              </h2>
              <div className="hp-services__bar" aria-hidden="true" />
            </div>

            <div className="hp-services__topGrid">
              <article className="card hp-serviceCard">
                <div className="hp-serviceCard__media">
                  <Image
                    src="/services/zk_photo.webp"
                    alt={t.services.greenCardCard.imageAlt}
                    width={600}
                    height={400}
                    quality={60}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                    className="hp-serviceCard__img"
                  />
                </div>

                <div className="hp-serviceCard__body hp-serviceCard__body--green">
                  <div>
                    <h3 className="hp-serviceCard__title">{t.services.greenCardCard.title}</h3>
                    <p className="hp-serviceCard__p hp-serviceCard__pLight">{t.services.greenCardCard.text1}</p>
                    <p className="hp-serviceCard__p hp-serviceCard__pDim">{t.services.greenCardCard.text2}</p>
                  </div>

                  <div className="hp-serviceCard__meta">
                    <span className="hp-serviceCard__price">{t.services.greenCardCard.price}</span>
                    <span className="hp-serviceCard__term">{t.services.greenCardCard.term}</span>
                  </div>

                  <div className="hp-serviceCard__cta">
                    <a href={greenCardLink} className="btn btn-primary" role="button" style={{ width: "100%" }}>
                      {t.services.greenCardCard.cta}
                    </a>
                  </div>
                </div>
              </article>

              <article className="card hp-serviceCard">
                <div className="hp-serviceCard__media">
                  <Image
                    src="/services/osago_rf_photo.webp"
                    alt={t.services.osagoCard.imageAlt}
                    width={600}
                    height={400}
                    quality={60}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                    className="hp-serviceCard__img"
                  />
                </div>

                <div className="hp-serviceCard__body hp-serviceCard__body--brown">
                  <div>
                    <h3 className="hp-serviceCard__title">{t.services.osagoCard.title}</h3>
                    <p className="hp-serviceCard__p hp-serviceCard__pLight">{t.services.osagoCard.text1}</p>
                    <p className="hp-serviceCard__p hp-serviceCard__pDim">{t.services.osagoCard.text2}</p>
                  </div>

                  <div className="hp-serviceCard__meta">
                    <span className="hp-serviceCard__price">{t.services.osagoCard.price}</span>
                    <span className="hp-serviceCard__term">{t.services.osagoCard.term}</span>
                  </div>

                  <div className="hp-serviceCard__cta">
                    <a href={osagoLink} className="btn btn-primary" role="button" style={{ width: "100%" }}>
                      {t.services.osagoCard.cta}
                    </a>
                  </div>
                </div>
              </article>
            </div>

            <ServicesGrid
              heading={t.services.otherHeading}
              moreBtnText={t.services.moreBtn}
              items={otherServices}
            />
          </div>
        </section>

        {/* BROKER */}
        <section className="hp-broker" aria-labelledby="about-broker-heading">
          <div className="container">
            <BrokerSection broker={t.broker} />
          </div>
        </section>

        {/* CONTACT */}
        <section className="hp-contact">
          <div className="container">
            <div className="hp-contact__grid">
              <div className="hp-contact__media">
                <Image
                  src="/laiter(1).png"
                  alt={t.contact.photoAlt}
                  width={500}
                  height={900}
                  quality={60}
                  loading="lazy"
                  sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
                  className="hp-contact__img"
                />
              </div>

              <ContactForm
                t={t.contact}
                agreement={agreement}
                context={`home:${lang}`}
                submitUrl="/api/contact"
                recaptchaAction="contact"
              />
            </div>
          </div>
        </section>
      </DeferredHydration>
    </main>
  );
}
