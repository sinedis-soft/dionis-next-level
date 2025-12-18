"use client";

import { useState } from "react";
import Script from "next/script";
import type { GreenCardPageDictionary } from "@/dictionaries/greenCardPage";

type Props = { dict: GreenCardPageDictionary["faq"] };

export default function FAQSection({ dict }: Props) {
  const [openId, setOpenId] = useState<string | null>(dict.items[0]?.id ?? null);

  return (
    <section className="py-12 sm:py-16 bg-white">
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
        }}
      />

      <div className="max-w-4xl mx-auto px-4">
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
                  onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
                >
                  <span className="font-semibold text-sm sm:text-base text-[#1A3A5F]">
                    {item.question}
                  </span>
                  <span className="ml-4 text-xl text-gray-400">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 text-sm sm:text-base text-gray-700">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
