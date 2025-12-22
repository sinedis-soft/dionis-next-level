// app/[lang]/contacts/page.tsx
import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";

export const dynamicParams = false;

type Params = { lang: string };

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://dionis-insurance.kz";

function isLang(x: unknown): x is Lang {
  return x === "ru" || x === "kz" || x === "en";
}

function getLangSafe(x: unknown): Lang {
  return isLang(x) ? x : "ru";
}

const titles: Record<Lang, string> = {
  ru: "Контакты",
  kz: "Байланыс",
  en: "Contacts",
};

const descriptions: Record<Lang, string> = {
  ru: "Контактная информация страхового брокера Dionis Insurance.",
  kz: "Dionis Insurance сақтандыру брокерінің байланыс деректері.",
  en: "Contact information of Dionis Insurance broker.",
};

const introText: Record<Lang, string> = {
  ru: "Свяжитесь с нами удобным для вас способом.",
  kz: "Бізбен өзіңізге ыңғайлы тәсілмен байланысыңыз.",
  en: "Contact us in any convenient way.",
};

export function generateStaticParams(): Array<{ lang: Lang }> {
  return [{ lang: "ru" }, { lang: "kz" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const p = await params;
  const lang = getLangSafe(p?.lang);

  const baseUrl = new URL(SITE_URL);

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: { canonical: `/${lang}/contacts` },
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      url: new URL(`/${lang}/contacts`, baseUrl).toString(),
      siteName: "Dionis Insurance Broker",
      type: "website",
    },
  };
}

export default async function ContactsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const p = await params;
  const lang = getLangSafe(p?.lang);

  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1A3A5F]">
          {titles[lang]}
        </h1>

        <div className="mt-6 space-y-3 text-gray-700">
          <p>{introText[lang]}</p>

          <ul className="mt-4 space-y-2 text-sm sm:text-base">
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info@dionis-insurance.kz"
                className="text-[#C89F4A] hover:underline"
              >
                info@dionis-insurance.kz
              </a>
            </li>

            <li>
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+77273573030"
                className="text-[#C89F4A] hover:underline"
              >
                +7 (727) 357-30-30
              </a>
            </li>

            <li>
              <strong>Telegram:</strong> <span>@Dionis_insurance_broker_bot</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
