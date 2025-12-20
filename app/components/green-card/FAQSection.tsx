// components/green-card/FAQSection.tsx
"use client";

import { useMemo, useState } from "react";
import type { GreenCardPageDictionary } from "@/dictionaries/greenCardPage";

type Props = { dict: GreenCardPageDictionary["faq"] };

export default function FAQSection({ dict }: Props) {
  const firstId = dict.items[0]?.id ?? null;
  const [openId, setOpenId] = useState<string | null>(firstId);

  const faqJsonLd = useMemo(
    () => ({
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
    }),
    [dict.items]
  );

  return (
    <section className="py-12 sm:py-16 bg-white">
      <script
        type="application/ld+json"
       
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A3A5F] text-center">
          {dict.title}
        </h2>
        <p className="mt-3 text-center text-gray-600">{dict.intro}</p>

        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 divide-y divide-gray-200">
          {dict.items.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div key={item.id}>
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() =>
                    setOpenId((prev) => (prev === item.id ? null : item.id))
                  }
                  aria-expanded={isOpen}
                  aria-controls={`faq-${item.id}`}
                >
                  <span className="font-semibold text-sm sm:text-base text-[#1A3A5F]">
                    {item.question}
                  </span>
                  <span className="ml-4 text-xl text-gray-400">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  id={`faq-${item.id}`}
                  className={`px-5 pb-4 text-sm sm:text-base text-gray-700 ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  {item.answer}
                </div>

                <div className="sr-only">{item.answer}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
