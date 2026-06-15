// components/AboutPage.tsx
import Image from "next/image";
import type { AboutDictionary } from "@/dictionaries/about";
import type { AgreementDictionary } from "@/dictionaries/agreement";
import type { HomeDictionary } from "@/dictionaries/home";
import type { Lang } from "@/dictionaries/header";

import ContactSection from "@/components/ContactSection";

type Props = {
  lang: Lang;
  t: AboutDictionary;
  contact: HomeDictionary["contact"];
  agreement: AgreementDictionary;
};

function FeatureCard({ title, text, index }: { title: string; text: string; index: number }) {
  return (
    <article className="about-featureCard">
      <div className="about-featureCard__index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>
      <h3 className="about-featureCard__title">{title}</h3>
      <p className="about-featureCard__text">{text}</p>
    </article>
  );
}

function LegalBody({ lines }: { lines: string[] }) {
  const blocks: Array<
    | { type: "spacer"; key: string }
    | { type: "p"; key: string; text: string }
    | { type: "ul"; key: string; items: string[] }
  > = [];

  let buf: string[] = [];

  const flushBuf = (keyBase: string) => {
    if (buf.length) {
      blocks.push({ type: "ul", key: `ul-${keyBase}-${blocks.length}`, items: buf });
      buf = [];
    }
  };

  lines.forEach((raw, i) => {
    const line = raw ?? "";
    const trimmed = line.trim();

    if (!trimmed) {
      flushBuf(String(i));
      blocks.push({ type: "spacer", key: `sp-${i}` });
      return;
    }

    const isBullet = trimmed.startsWith("• ");
    if (isBullet) {
      buf.push(trimmed.replace(/^•\s*/, ""));
      return;
    }

    flushBuf(String(i));
    blocks.push({ type: "p", key: `p-${i}`, text: line });
  });

  flushBuf("end");

  return (
    <div className="about-legalBody">
      {blocks.map((b) => {
        if (b.type === "spacer") return <div key={b.key} className="about-legalBody__spacer" />;

        if (b.type === "ul") {
          return (
            <ul key={b.key} className="about-legalBody__list">
              {b.items.map((it, idx) => (
                <li key={`${b.key}-${idx}`}>{it}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={b.key} className="about-legalBody__paragraph">
            {b.text}
          </p>
        );
      })}
    </div>
  );
}

export default function AboutPage({ t, lang, contact, agreement }: Props) {
  const primaryFeature = t.about.features[0];
  const secondaryFeature = t.about.features[1];
  const legalHighlights = t.legal.headerLines.slice(0, 5);
  const trustItems = [primaryFeature?.title, secondaryFeature?.title, t.legal.orgTitle].filter(
    (item): item is string => Boolean(item)
  );

  return (
    <>
      <section className="about-page" aria-labelledby="about-page-title">
        <div className="gc-container">
          <div className="about-hero">
            <div className="about-hero__content">
              <p className="about-hero__eyebrow">{t.about.leadTitle}</p>
              <h1 id="about-page-title" className="about-hero__title">
                {t.pageTitle}
              </h1>
              <p className="about-hero__lead">{t.about.cta}</p>

              <div className="about-hero__actions" aria-label={t.about.leadTitle}>
                <a href="#about-contact" className="btn btn-primary about-hero__button" role="button">
                  {contact.sectionTitle}
                </a>
                <a href="#about-legal" className="btn btn-ghost about-hero__button" role="button">
                  {primaryFeature?.title ?? t.legal.orgTitle}
                </a>
              </div>
            </div>

            <aside className="about-hero__proof" aria-label={t.legal.orgTitle}>
              <div className="about-hero__logoWrap">
                <Image
                  src="/dionis-crkl_2_960x960.webp"
                  alt="Dionis Insurance emblem"
                  width={220}
                  height={220}
                  quality={70}
                  loading="lazy"
                  sizes="(max-width: 640px) 112px, 160px"
                  className="about-hero__logo"
                />
              </div>
              <div className="about-hero__proofText">
                <strong>{t.legal.orgTitle}</strong>
                <ul>
                  {legalHighlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          <div className="about-featureGrid" aria-label={t.about.leadTitle}>
            {t.about.features.map((f, idx) => (
              <FeatureCard key={`${f.title}-${idx}`} title={f.title} text={f.text} index={idx} />
            ))}
          </div>

          <div className="about-trustStrip" aria-label={t.about.leadTitle}>
            {trustItems.map((item) => (
              <div key={item} className="about-trustStrip__item">
                {item}
              </div>
            ))}
          </div>

          <section id="about-legal" className="about-legal" aria-labelledby="about-legal-title">
            <div className="about-legal__head">
              <div>
                <p className="about-legal__eyebrow">{t.pageTitle}</p>
                <h2 id="about-legal-title" className="about-legal__title">
                  {t.legal.orgTitle}
                </h2>
              </div>

              <div className="about-legal__summary">
                {t.legal.headerLines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            <LegalBody lines={t.legal.body} />
          </section>
        </div>
      </section>

      <div id="about-contact">
        <ContactSection
          contact={contact}
          agreement={agreement}
          imageSrc="/laiter(1).png"
          context={`about-${lang}`}
        />
      </div>
    </>
  );
}
