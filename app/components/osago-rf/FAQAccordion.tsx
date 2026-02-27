// components/osago-rf/FAQAccordion.tsx
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
    <div className="faq-acc" role="region" aria-label="FAQ">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `faq-${item.id}`;
        const btnId = `faq-btn-${item.id}`;

        return (
          <div className="faq-acc__item" key={item.id}>
            <button
              id={btnId}
              type="button"
              className="faq-acc__btn"
              onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span className="faq-acc__q">{item.question}</span>
              <span className="faq-acc__sign" aria-hidden="true">
                {isOpen ? "−" : "+"}
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="faq-acc__a"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}