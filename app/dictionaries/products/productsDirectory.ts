// app/dictionaries/products/productsDirectory.ts
import type { Lang } from "@/dictionaries/header";

export type ProductsDirectoryDictionary = {
  mobileLabel: string;
  open: string;
  hide: string;

  inProgressTitle: string;
  inProgressText: string;
};

const ru: ProductsDirectoryDictionary = {
  mobileLabel: "Выберите раздел",
  open: "Открыть",
  hide: "Скрыть",
  inProgressTitle: "Раздел в разработке",
  inProgressText:
    "Можем подобрать условия под вашу задачу: напишите нам — сверим риски, исключения и предложим варианты.",
};

const kz: ProductsDirectoryDictionary = {
  mobileLabel: "Бөлімді таңдаңыз",
  open: "Ашу",
  hide: "Жасыру",
  inProgressTitle: "Бөлім дайындалуда",
  inProgressText:
    "Талаптарыңызға сай шарттарды ұсынамыз: жазыңыз — тәуекелдер мен ерекшеліктерді тексеріп, нұсқалар береміз.",
};

const en: ProductsDirectoryDictionary = {
  mobileLabel: "Choose a section",
  open: "Open",
  hide: "Hide",
  inProgressTitle: "Section in progress",
  inProgressText:
    "We can tailor terms for your case: message us — we’ll review risks/exclusions and propose options.",
};

export function getProductsDirectoryDictionary(lang: Lang): ProductsDirectoryDictionary {
  if (lang === "kz") return kz;
  if (lang === "en") return en;
  return ru;
}
