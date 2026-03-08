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

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="u-rounded-2xl u-bg-white u-border u-border-gray-100 u-shadow-sm u-p-6">
      <h3 className="u-text-sm u-sm-text-base u-font-extrabold u-tracking-wide u-text-gray-900">
        {title}
      </h3>
      <p className="u-mt-3 u-text-sm u-sm-text-base u-leading-relaxed u-text-gray-600">
        {text}
      </p>
    </div>
  );
}

function LegalBody({ lines }: { lines: string[] }) {
  // группируем подряд идущие "• " в один список
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
    <div className="u-text-sm u-sm-text-base u-text-gray-700 u-leading-relaxed">
      {blocks.map((b) => {
        if (b.type === "spacer") return <div key={b.key} className="u-h-3" />;

        if (b.type === "ul") {
          return (
            <ul key={b.key} className="u-list-disc u-pl-5 u-text-gray-700 u-my-2">
              {b.items.map((it, idx) => (
                <li key={`${b.key}-${idx}`} className="u-text-left">
                  {it}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p
            key={b.key}
            className="u-my-2 u-text-justify u-hyphens-auto"
            style={{ textAlign: "justify", textJustify: "inter-word" }}
          >
            {b.text}
          </p>
        );
      })}
    </div>
  );
}

export default function AboutPage({ t, lang, contact, agreement }: Props) {
  return (
    <>
      <section className="u-py-10 u-sm-py-14 u-bg-gray-50">
        <div className="u-max-w-6xl u-mx-auto u-px-4">
          <h1 className="u-text-3xl u-sm-text-4xl u-font-bold u-text--1a3a5f">
            {t.pageTitle}
          </h1>

          <div className="u-mt-10 u-sm-mt-12">
            <div className="u-grid u-grid-cols-1 u-lg-grid-cols-12 u-gap-6 u-lg-gap-10 u-items-start">
              <div className="u-lg-col-span-3">
                <h2 className="u-text-2xl u-sm-text-3xl u-font-extrabold u-text-gray-900">
                  {t.about.leadTitle}
                </h2>

                <div className="u-mt-6 u-flex u-justify-center u-lg-justify-start u-lg-mt-12">
                  <Image
                    src="/dionis-crkl_2_960x960.webp"
                    alt="Dionis Insurance emblem"
                    width={280}
                    height={280}
                    quality={70}
                    loading="lazy"
                    sizes="(max-width: 1024px) 160px, 220px"
                    className="u-opacity-90"
                  />
                </div>
              </div>

              <div className="u-lg-col-span-9">
                <div className="u-grid u-grid-cols-1 u-md-grid-cols-2 u-gap-6">
                  {t.about.features.map((f, idx) => (
                    <FeatureCard
                      key={`${f.title}-${idx}`}
                      title={f.title}
                      text={f.text}
                    />
                  ))}
                </div>

                <div className="u-mt-8">
                  <p className="u-text-base u-sm-text-lg u-font-semibold u-text-gray-900">
                    {t.about.cta}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="u-mt-12 u-sm-mt-16">
            <div className="u-rounded-2xl u-bg-white u-border u-border-gray-100 u-shadow-sm u-p-6 u-sm-p-8">
              <h2 className="u-text-xl u-sm-text-2xl u-font-extrabold u-text-gray-900">
                {t.legal.orgTitle}
              </h2>

              <div className="u-mt-5 u-text-sm u-sm-text-base u-text-gray-700 u-leading-relaxed">
                {t.legal.headerLines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              <hr className="u-my-6 u-border-gray-200" />

              <LegalBody lines={t.legal.body} />
            </div>
          </div>
        </div>
      </section>

      <ContactSection
        contact={contact}
        agreement={agreement}
        imageSrc="/laiter(1).png"
        context={`about-${lang}`}
      />
    </>
  );
}