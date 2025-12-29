// app/dictionaries/products/featuredProducts.ts
import type { Lang } from "@/dictionaries/header";

export type FeaturedProductItem = {
  title: string;
  desc: string;
  hrefSuffix: string; // will be prefixed with `base` in the component
  btn: string;
};

export type FeaturedProductsDict = {
  heading: string;
  items: FeaturedProductItem[];
  requestBtn: string;
  onlineNote: string;
};

const ru: FeaturedProductsDict = {
  heading: "Популярные продукты",
  items: [
    {
      title: "Зелёная карта",
      desc: "Международная ответственность (аналог ОСАГО) для поездок за границу. Оформление дистанционно.",
      hrefSuffix: "/green-card",
      btn: "Зелёная карта",
    },
    {
      title: "ОСАГО РФ",
      desc: "Обязательная ответственность для въезда в РФ на авто с иностранными номерами. Электронный полис.",
      hrefSuffix: "/osago-rf",
      btn: "ОСАГО РФ",
    },
  ],
  requestBtn: "Запросить предложение",
  onlineNote: "Оформление онлайн: быстро, без визита в офис.",
};

const kz: FeaturedProductsDict = {
  heading: "Танымал өнімдер",
  items: [
    {
      title: "Green Card (Жасыл карта)",
      desc: "Шетелге шығуға арналған азаматтық жауапкершілікті сақтандыру (ОСАГО аналогы). Қашықтан рәсімдеу.",
      hrefSuffix: "/green-card",
      btn: "Green Card",
    },
    {
      title: "РФ ОСАГО",
      desc: "Шетелдік нөмірмен Ресейге кіруге арналған міндетті жауапкершілік сақтандыруы. Электронды полис.",
      hrefSuffix: "/osago-rf",
      btn: "РФ ОСАГО",
    },
  ],
  requestBtn: "Ұсыныс сұрау",
  onlineNote: "Онлайн рәсімдеу: тез, офиске бармай-ақ.",
};

const en: FeaturedProductsDict = {
  heading: "Featured products",
  items: [
    {
      title: "Green Card",
      desc: "International third-party liability cover for traveling abroad (MTPL equivalent). Issued remotely.",
      hrefSuffix: "/green-card",
      btn: "Green Card",
    },
    {
      title: "OSAGO Russia",
      desc: "Mandatory third-party liability insurance for driving in Russia with foreign plates. E-policy.",
      hrefSuffix: "/osago-rf",
      btn: "OSAGO Russia",
    },
  ],
  requestBtn: "Request a quote",
  onlineNote: "Online issuance: fast, no office visit.",
};

export const FEATURED_PRODUCTS_DICTIONARY: Record<Lang, FeaturedProductsDict> = {
  ru,
  kz,
  en,
};

export function getFeaturedProductsDictionary(lang: Lang): FeaturedProductsDict {
  return FEATURED_PRODUCTS_DICTIONARY[lang] ?? ru;
}
