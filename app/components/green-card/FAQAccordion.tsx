"use client";

import { useEffect, useMemo, useState } from "react";

type Item = {
  id: string;
  question: string;
  answer: string;
};

export default function FAQAccordion({ items }: { items: Item[] }) {
  const firstId = useMemo(() => (items.length > 0 ? items[0].id : null), [items]);
  const [openId, setOpenId] = useState<string | null>(firstId);

  // Если items обновились и текущий openId больше не существует — открываем firstId (или null)
  useEffect(() => {
    if (!items.length) {
      setOpenId(null);
      return;
    }
    if (openId == null) return;

    const exists = items.some((x) => x.id === openId);
    if (!exists) setOpenId(items[0].id);
  }, [items, openId]);

  if (!items.length) return null;

  return (
    <div className="faq-acc">
      {items.map((item) => {
        const isOpen = openId === item.id;

        const btnId = `faq-btn-${item.id}`;
        const panelId = `faq-${item.id}`;

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
              className="faq-acc__a"
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}