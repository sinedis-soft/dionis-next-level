// components/BrokerSection.tsx
"use client";

import Image from "next/image";

type BrokerTexts = {
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  lead: string;
  paragraph1: string;
  paragraph2: string;
  bulletPoints: string[];
  logoAlt: string;
};

type BrokerSectionProps = {
  broker: BrokerTexts;
};

export function BrokerSection({ broker }: BrokerSectionProps) {
  return (
    <section className="broker" aria-labelledby="about-broker-heading">
      <div className="broker__container">
        <div className="broker__grid">
          <div className="broker__content">
            <h2 id="about-broker-heading" className="broker__title">
              {broker.titlePrefix}
              <span className="broker__titleHighlight">{broker.titleHighlight}</span>
              <br />
              {broker.titleSuffix}
            </h2>

            <p className="broker__lead">{broker.lead}</p>

            <p className="broker__p">{broker.paragraph1}</p>

            <ul className="broker__list">
              {broker.bulletPoints.map((item, idx) => (
                <li key={`${idx}-${item}`} className="broker__li">
                  {item}
                </li>
              ))}
            </ul>

            <p className="broker__p">{broker.paragraph2}</p>
          </div>

          <div className="broker__media">
            <Image
              src="/dionis-crkl.webp"
              alt={broker.logoAlt}
              width={340}
              height={340}
              sizes="(min-width: 1024px) 340px, (min-width: 640px) 256px, 192px"
              className="broker__logo"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}