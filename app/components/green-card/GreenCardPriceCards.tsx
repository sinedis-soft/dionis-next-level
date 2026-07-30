"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import type { Lang } from "@/dictionaries/header";
import type { GreenCardPageDictionary } from "@/dictionaries/greenCardPage";

import {
  calculateGreenCardPrice,
  formatGreenCardKzt,
  type GreenCardRegionKey,
  type GreenCardVehicleKey,
} from "@/lib/green-card/calculateGreenCardPrice";

type NbkRateResponse = {
  ok: boolean;
  rate?: number | string;
  message?: string;
};

type PriceCard = {
  id: string;
  vehicle: string;
  territory: string;
  region: GreenCardRegionKey;
  vehicleType: GreenCardVehicleKey;
  icon: string;
};

type Props = {
  dict: GreenCardPageDictionary["priceCards"];
  lang: Lang;
};

function getLocale(lang: Lang): string {
  if (lang === "kz") return "kk-KZ";
  if (lang === "en") return "en-US";

  return "ru-RU";
}

export default function GreenCardPriceCards({
  dict,
  lang,
}: Props) {
  const [kztRate, setKztRate] = useState<number | null>(null);
  const [rateError, setRateError] = useState(false);

  const cards = useMemo<PriceCard[]>(
    () => [
        {
        id: "passenger-europe",
        vehicle: dict.cards.passengerEurope.vehicle,
        territory: dict.cards.passengerEurope.territory,
        region: "group2",
        vehicleType: "passenger",
        icon: "/green-card/passenger.png",
        },
        {
        id: "passenger-regional",
        vehicle: dict.cards.passengerRegional.vehicle,
        territory: dict.cards.passengerRegional.territory,
        region: "group1",
        vehicleType: "passenger",
        icon: "/green-card/passenger.png",
        },
        {
        id: "truck-europe",
        vehicle: dict.cards.truckEurope.vehicle,
        territory: dict.cards.truckEurope.territory,
        region: "group2",
        vehicleType: "truck",
        icon: "/green-card/truck.png",
        },
        {
        id: "truck-regional",
        vehicle: dict.cards.truckRegional.vehicle,
        territory: dict.cards.truckRegional.territory,
        region: "group1",
        vehicleType: "truck",
        icon: "/green-card/truck.png",
        },
    ],
    [dict.cards],
    );

  useEffect(() => {
    let active = true;

    async function loadRate() {
      try {
        const response = await fetch("/api/nbk-rate", {
          cache: "no-store",
        });

        const data =
          (await response.json()) as NbkRateResponse;

        if (
          !response.ok ||
          !data.ok ||
          data.rate == null
        ) {
          throw new Error(
            data.message || "NBK API returned an error",
          );
        }

        const parsedRate = Number(data.rate);

        if (
          !Number.isFinite(parsedRate) ||
          parsedRate <= 0
        ) {
          throw new Error(
            `Invalid NBK rate: ${String(data.rate)}`,
          );
        }

        if (active) {
          setKztRate(parsedRate);
          setRateError(false);
        }
      } catch (error) {
        console.warn(
          "Green Card price cards: NBK rate loading failed",
          error,
        );

        if (active) {
          setRateError(true);
        }
      }
    }

    loadRate();

    return () => {
      active = false;
    };
  }, []);

  const prices = useMemo(() => {
    if (kztRate == null) {
      return new Map<string, string>();
    }

    const locale = getLocale(lang);

    return new Map(
      cards.map((card) => {
        const price = calculateGreenCardPrice({
          region: card.region,
          vehicle: card.vehicleType,
          period: "1",
          kztRate,
          markupMode: "weekday",
        });

        return [
          card.id,
          `${formatGreenCardKzt(
            price.kzt,
            locale,
          )}\u00A0₸`,
        ];
      }),
    );
  }, [cards, kztRate, lang]);

  return (
    <section
      className="gc-section gc-price-cards"
      aria-labelledby="green-card-price-title"
    >
      <div className="gc-container">
        <div className="gc-price-cards__header">
          <h2
            id="green-card-price-title"
            className="gc-h2"
          >
            {dict.title}
          </h2>

          <p className="gc-text-muted">
            {dict.subtitle}
          </p>
        </div>

        <div className="gc-price-cards__grid">
          {cards.map((card) => (
            <article
              key={card.id}
              className="card gc-price-card"
            >
              <div className="gc-price-card__head">
                <Image
                  src={card.icon}
                  alt=""
                  width={64}
                  height={64}
                  className="gc-price-card__icon"
                />

                <div>
                  <h3 className="gc-price-card__title">
                    {card.vehicle}
                  </h3>

                  <p className="gc-price-card__territory">
                    {card.territory}
                  </p>
                </div>
              </div>

              <div className="gc-price-card__row">
                <span>{dict.periodLabel}</span>
                <strong>{dict.periodValue}</strong>
              </div>

              <div className="gc-price-card__price-block">
                <span className="gc-price-card__price-label">
                  {dict.priceLabel}
                </span>

                <div
                  className="gc-price-card__price"
                  aria-live="polite"
                >
                  {rateError ? (
                    <span className="gc-price-card__error">
                      {dict.rateError}
                    </span>
                  ) : prices.has(card.id) ? (
                    <>
                      <span className="gc-price-card__approx">
                        {dict.approximate}
                      </span>

                      {prices.get(card.id)}
                    </>
                  ) : (
                    <span className="gc-price-card__loading">
                      {dict.loading}
                    </span>
                  )}
                </div>
              </div>

              <a
                href="#green-card-order"
                className="btn btn-primary gc-price-card__button"
              >
                {dict.button}
              </a>
            </article>
          ))}
        </div>

        <p className="gc-price-cards__note">
          {dict.note}
        </p>
      </div>
    </section>
  );
}
