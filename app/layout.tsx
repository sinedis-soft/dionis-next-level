import type { Metadata } from "next";

const SITE_URL = "https://dionis-insurance.com";

export function generateMetadata({
  params,
}: {
  params: { lang: "ru" | "en" | "kz" };
}): Metadata {
  const { lang } = params;

  return {
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: {
        ru: `${SITE_URL}/ru`,
        en: `${SITE_URL}/en`,
        kk: `${SITE_URL}/kz`,
        "x-default": `${SITE_URL}/ru`,
      },
    },
  };
}
