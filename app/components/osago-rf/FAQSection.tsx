// components/osago-rf/FAQSection.tsx
import Script from "next/script";
import type { OsagoRfPageDictionary } from "@/dictionaries/osagoRfPage";
import FAQAccordion from "./FAQAccordion";

type Props = { dict: OsagoRfPageDictionary["faq"] };

export default function FAQSection({ dict }: Props) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="py-12 sm:py-16 bg-white" aria-labelledby="faq-heading">
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4">
        <h2
          id="faq-heading"
          className="text-2xl sm:text-3xl font-semibold text-[#1A3A5F] text-center"
        >
          {dict.title}
        </h2>
        <p className="mt-3 text-center text-gray-600">{dict.intro}</p>

        <div className="mt-8">
          <FAQAccordion items={dict.items} />
        </div>
      </div>
    </section>
  );
}
