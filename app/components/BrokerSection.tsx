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
    <section
      className="py-12 sm:py-16 bg-[#F4F6FA]"
      aria-labelledby="about-broker-heading"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-10 items-center">
          <div>
            <h2
              id="about-broker-heading"
              className="text-2xl sm:text-3xl font-bold leading-snug text-[#1A3A5F]"
            >
              {broker.titlePrefix}
              <span className="text-[#C89F4A]">
                {broker.titleHighlight}
              </span>
              <br />
              {broker.titleSuffix}
            </h2>

            <p className="mt-4 text-base sm:text-lg font-semibold text-[#1A3A5F]">
              {broker.lead}
            </p>

            <p className="mt-4 text-sm sm:text-base text-gray-700">
              {broker.paragraph1}
            </p>

            <ul className="mt-4 space-y-2 text-sm sm:text-base text-gray-700 list-disc pl-5">
              {broker.bulletPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="mt-4 text-sm sm:text-base text-gray-700">
              {broker.paragraph2}
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Image
              src="/dionis-crkl.webp"
              alt={broker.logoAlt}
              width={340}
              height={340}
              className="w-48 sm:w-64 lg:w-[340px] h-auto drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
