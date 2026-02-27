// components/green-card/GreenCardInfoBlocks.tsx
import Image from "next/image";
import type { GreenCardPageDictionary } from "@/dictionaries/greenCardPage";
import DeferredHydration from "@/components/DeferredHydration";

export default function GreenCardInfoBlocks({
  dict,
}: {
  dict: Pick<GreenCardPageDictionary, "howItWorks" | "coverage">;
}) {
  return (
    <>
      {/* HOW IT WORKS */}
      <DeferredHydration rootMargin="800px" minDelayMs={150}>
        <section
          className="gc-hiw gc-no-anchor"
          aria-labelledby="how-it-works-heading"
        >
          <div className="gc-container">
            <h2 id="how-it-works-heading" className="gc-section-title">
              {dict.howItWorks.title}
            </h2>

            <p className="gc-section-intro">{dict.howItWorks.subtitle}</p>

            <div className="gc-hiw__content">
              {/* desktop view */}
              <div className="gc-hiw__desktop">
                <div className="gc-hiw__line" aria-hidden="true" />
                <div className="gc-hiw__grid">
                  {dict.howItWorks.steps.map((s, idx) => (
                    <div key={idx} className="gc-hiw__step">
                      <div className="gc-hiw__num">{idx + 1}</div>
                      <div className="gc-hiw__stepTitle">{s.title}</div>
                      <p className="gc-hiw__stepText">{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* mobile view */}
              <div className="gc-hiw__mobile">
                {dict.howItWorks.steps.map((s, idx) => (
                  <article key={idx} className="gc-hiw-card">
                    <div className="gc-hiw-card__row">
                      <div className="gc-hiw__num gc-hiw__num--mobile">
                        {idx + 1}
                      </div>
                      <div className="gc-hiw-card__body">
                        <div className="gc-hiw__stepTitle">{s.title}</div>
                        <p className="gc-hiw__stepText gc-hiw__stepText--mobile">
                          {s.text}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </DeferredHydration>

      {/* COVERAGE */}
      <DeferredHydration rootMargin="800px" minDelayMs={150}>
        <section
          className="gc-coverage gc-no-anchor"
          aria-labelledby="coverage-heading"
        >
          <div className="gc-container">
            <article className="gc-coverage__card">
              <div className="gc-coverage__grid">
                {/* left */}
                <div className="gc-coverage__left">
                  <h2 id="coverage-heading" className="gc-coverage__title">
                    {dict.coverage.title}
                  </h2>

                  <div className="gc-coverage__items">
                    {dict.coverage.items.map((it, idx) => (
                      <div key={idx} className="gc-coverage__item">
                        <div className="gc-coverage__icon" aria-hidden="true">
                          <span className="gc-coverage__dot" />
                        </div>

                        <div>
                          <div className="gc-coverage__itemTitle">{it.title}</div>
                          <p className="gc-coverage__itemText">{it.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* right */}
                <div className="gc-coverage__right">
                  <div className="gc-coverage__imgWrap">
                    <Image
                      src="/green-card/map2.png"
                      alt={dict.coverage.imageAlt}
                      fill
                      className="gc-coverage__img"
                      sizes="(min-width: 1024px) 520px, 90vw"
                      priority={false}
                    />
                    <div className="gc-coverage__imgOverlay" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </DeferredHydration>
    </>
  );
}