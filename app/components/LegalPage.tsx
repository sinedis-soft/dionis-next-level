// components/LegalPage.tsx
import Link from "next/link";

import type { Lang } from "@/dictionaries/header";
import type {
  LegalCard,
  LegalDictionary,
} from "@/dictionaries/legal";

type Props = {
  lang: Lang;
  dictionary: LegalDictionary;
  quoteHref: string;
};

function Bullets({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function ContentCard({
  card,
  noteAsParagraph = false,
}: {
  card: LegalCard;
  noteAsParagraph?: boolean;
}) {
  return (
    <article className="card card--pad">
      <div className="stack gap-10">
        <h3 className="card-title">{card.title}</h3>

        {card.text && (
          <p className="card-text">{card.text}</p>
        )}

        {card.paragraphs?.map((paragraph) => (
          <p className="card-text" key={paragraph}>
            {paragraph}
          </p>
        ))}

        {card.items && (
          <Bullets
            items={card.items}
            className="legal-list"
          />
        )}

        {card.note &&
          (noteAsParagraph ? (
            <p className="card-text">{card.note}</p>
          ) : (
            <div className="panel-muted">
              {card.note}
            </div>
          ))}
      </div>
    </article>
  );
}

export default function LegalPage({
  dictionary,
  quoteHref,
}: Props) {
  return (
    <div className="gc-page">
      <section className="gc-hero">
        <div className="gc-hero__bg" />

        <div className="gc-container">
          <div className="gc-hero__grid">
            <div className="stack">
              <p className="legal-eyebrow">
                {dictionary.hero.eyebrow}
              </p>

              <h1 className="gc-hero__title">
                {dictionary.hero.title}
              </h1>

              <p className="gc-hero__subtitle">
                {dictionary.hero.lead}
              </p>

              <div className="legal-promise">
                <strong>
                  {dictionary.hero.promise}
                </strong>
              </div>

              <div className="gc-hero__cta">
                <Link
                  className="btn btn-primary"
                  href={quoteHref}
                >
                  {dictionary.hero.primaryCta}
                </Link>

                <a
                  className="btn btn-secondary"
                  href="tel:+77273573030"
                >
                  {dictionary.hero.secondaryCta}
                </a>
              </div>
            </div>

            <aside
              className="card card--pad legal-hero-card"
              aria-label={
                dictionary.hero.benefitsAriaLabel
              }
            >
              <div className="stack gap-14">
                <h2 className="card-title">
                  {dictionary.hero.benefitsTitle}
                </h2>

                <Bullets
                  items={dictionary.hero.benefits}
                  className="legal-check-list"
                />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="gc-section" id="osago">
        <div className="gc-container">
          <header className="legal-section-header">
            <p className="legal-eyebrow">
              {dictionary.osago.eyebrow}
            </p>

            <h2 className="gc-section-title legal-section-title-left">
              {dictionary.osago.title}
            </h2>

            <p className="gc-section-intro legal-section-intro-left">
              {dictionary.osago.intro}
            </p>
          </header>

          <div className="grid grid-2 legal-grid">
            <ContentCard
              card={dictionary.osago.cards.vehicles}
            />
            <ContentCard
              card={dictionary.osago.cards.payment}
            />
            <ContentCard
              card={dictionary.osago.cards.accounting}
            />
            <ContentCard
              card={dictionary.osago.cards.calculation}
            />
          </div>

          <div className="panel-muted legal-section-note">
            {dictionary.osago.note}
          </div>

          <div className="legal-steps-block">
            <h3 className="h2">
              {dictionary.osago.stepsTitle}
            </h3>

            <ol className="legal-steps">
              {dictionary.osago.steps.map(
                (step, index) => (
                  <li
                    className="card card--pad"
                    key={step}
                  >
                    <span className="legal-step-number">
                      {index + 1}
                    </span>

                    <span>{step}</span>
                  </li>
                )
              )}
            </ol>
          </div>

          <Link
            className="btn btn-primary legal-section-cta"
            href={quoteHref}
          >
            {dictionary.osago.cta}
          </Link>
        </div>
      </section>

      <section className="gc-section gc-section--muted">
        <div className="gc-container">
          <header className="legal-section-header">
            <h2 className="gc-section-title legal-section-title-left">
              {dictionary.additional.title}
            </h2>

            <p className="gc-section-intro legal-section-intro-left">
              {dictionary.additional.intro}
            </p>
          </header>

          <div className="grid grid-2 legal-grid">
            <ContentCard
              card={dictionary.additional.greenCard}
            />

            <ContentCard
              card={dictionary.additional.cargo}
              noteAsParagraph
            />

            <ContentCard
              card={dictionary.additional.cmr}
            />

            <ContentCard
              card={dictionary.additional.forwarder}
              noteAsParagraph
            />
          </div>
        </div>
      </section>

      <section className="gc-section">
        <div className="gc-container">
          <header className="legal-section-header">
            <h2 className="gc-section-title legal-section-title-left">
              {dictionary.benefits.title}
            </h2>
          </header>

          <div className="grid grid-3 legal-benefits-grid">
            {dictionary.benefits.items.map(
              ({ title, text }) => (
                <article
                  className="card card--pad"
                  key={title}
                >
                  <div className="stack gap-10">
                    <h3 className="card-title">
                      {title}
                    </h3>

                    <p className="card-text">
                      {text}
                    </p>
                  </div>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      <section
        className="gc-section gc-section--muted"
        id="quote"
      >
        <div className="gc-container">
          <div className="card card--pad legal-quote-card">
            <div className="stack gap-14">
              <h2 className="gc-h2">
                {dictionary.quote.title}
              </h2>

              <p className="gc-text-muted">
                {dictionary.quote.text}
              </p>

              <div>
                <Link
                  className="btn btn-primary"
                  href={quoteHref}
                >
                  {dictionary.quote.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="gc-section">
        <div className="gc-container">
          <header className="legal-section-header">
            <h2 className="gc-section-title legal-section-title-left">
              {dictionary.faq.title}
            </h2>
          </header>

          <div className="faq-acc legal-faq">
            {dictionary.faq.items.map(
              ({ question, answer }) => (
                <details
                  className="faq-acc__item"
                  key={question}
                >
                  <summary className="faq-acc__btn">
                    <span className="faq-acc__q">
                      {question}
                    </span>

                    <span
                      className="faq-acc__sign"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>

                  <div className="faq-acc__a">
                    {answer}
                  </div>
                </details>
              )
            )}
          </div>
        </div>
      </section>

      <section className="legal-disclaimer">
        <div className="gc-container">
          <div className="stack gap-14">
            <h2 className="legal-disclaimer__title">
              {dictionary.disclaimer.title}
            </h2>

            {dictionary.disclaimer.paragraphs.map(
              (paragraph) => (
                <p
                  className="legal-disclaimer__text"
                  key={paragraph}
                >
                  {paragraph}
                </p>
              )
            )}

            <p className="legal-disclaimer__text">
              <strong>
                {dictionary.disclaimer.companyName}
              </strong>
              <br />
              {
                dictionary.disclaimer
                  .companyDescription
              }
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
