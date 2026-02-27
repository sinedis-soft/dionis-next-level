// app/components/green-card/FAQSection.tsx
import Script from "next/script";
import type { GreenCardPageDictionary } from "@/dictionaries/greenCardPage";
import FAQAccordion from "./FAQAccordion";

type Props = { dict: GreenCardPageDictionary["faq"] };

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
    <section className="gc-section" aria-labelledby="faq-heading">
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="gc-container">
        <h2 id="faq-heading" className="gc-h2">
          {dict.title}
        </h2>

        <p className="gc-text-muted gc-mt-12">{dict.intro}</p>

        <div className="gc-mt-12">
          <FAQAccordion items={dict.items} />
        </div>
      </div>
    </section>
  );
}