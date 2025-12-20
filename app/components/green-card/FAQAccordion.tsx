"use client";

import { useState } from "react";

type Item = {
  id: string;
  question: string;
  answer: string;
};

export default function FAQAccordion({ items }: { items: Item[] }) {
  const firstId = items[0]?.id ?? null;
  const [openId, setOpenId] = useState<string | null>(firstId);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 divide-y divide-gray-200">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div key={item.id}>
            <button
              type="button"
              className="w-full flex items-center justify-between px-5 py-4 text-left"
              onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
              aria-expanded={isOpen}
              aria-controls={`faq-${item.id}`}
            >
              <span className="font-semibold text-sm sm:text-base text-[#1A3A5F]">
                {item.question}
              </span>
              <span className="ml-4 text-xl text-gray-400">{isOpen ? "−" : "+"}</span>
            </button>

            {/* ✅ Текст всегда в DOM, просто скрыт атрибутом */}
            <div
              id={`faq-${item.id}`}
              hidden={!isOpen}
              className="px-5 pb-4 text-sm sm:text-base text-gray-700"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
