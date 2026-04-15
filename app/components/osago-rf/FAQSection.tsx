// components/osago-rf/FAQSection.tsx
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
    <section className="gc-faq" aria-labelledby="faq-heading">
      <script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="gc-container">
        <h2 id="faq-heading" className="gc-faq__title">
          {dict.title}
        </h2>

        <p className="gc-faq__intro">{dict.intro}</p>

        <div className="gc-faq__body">
          <FAQAccordion items={dict.items} />
        </div>
      </div>
    </section>
  );
}