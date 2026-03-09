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
    <div className="text-sm sm:text-base text-gray-700 leading-relaxed">
      {blocks.map((b) => {
        if (b.type === "spacer") return <div key={b.key} className="h-3" />;

        if (b.type === "ul") {
          return (
            <ul key={b.key} className="list-disc pl-5 text-gray-700 my-2">
              {b.items.map((it, idx) => (
                <li key={`${b.key}-${idx}`} className="text-left">
                  {it}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p
            key={b.key}
            className="my-2 text-justify [hyphens:auto]"
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
      <section className="py-10 sm:py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1A3A5F]">
            {t.pageTitle}
          </h1>

          <div className="mt-10 sm:mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
              <div className="lg:col-span-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {t.about.leadTitle}
                </h2>

                <div className="mt-6 flex justify-center lg:justify-start lg:mt-12">
                  <Image
                    src="/dionis-crkl_2_960x960.webp"
                    alt="Dionis Insurance emblem"
                    width={280}
                    height={280}
                    quality={70}
                    loading="lazy"
                    sizes="(max-width: 1024px) 160px, 220px"
                    className="opacity-90"
                  />
                </div>
              </div>

              <div className="lg:col-span-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {t.about.features.map((f, idx) => (
                    <FeatureCard
                      key={`${f.title}-${idx}`}
                      title={f.title}
                      text={f.text}
                    />
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

          <div className="mt-12 sm:mt-16">
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                {t.legal.orgTitle}
              </h2>

              <div className="mt-5 text-sm sm:text-base text-gray-700 leading-relaxed">
                {t.legal.headerLines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              <hr className="my-6 border-gray-200" />

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