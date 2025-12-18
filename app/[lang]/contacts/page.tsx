import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";

type Props = {
  params: { lang: Lang };
};

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

export function generateMetadata({ params }: Props): Metadata {
  const lang = params.lang;

  return {
    title: titles[lang],
    description: descriptions[lang],
  };
}

export default function ContactsPage({ params }: Props) {
  const lang = params.lang;

  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1A3A5F]">
          {titles[lang]}
        </h1>

        <div className="mt-6 space-y-3 text-gray-700">
          <p>
            {lang === "ru" && "Свяжитесь с нами удобным для вас способом."}
            {lang === "kz" && "Бізбен өзіңізге ыңғайлы тәсілмен байланысыңыз."}
            {lang === "en" && "Contact us in any convenient way."}
          </p>

          <ul className="mt-4 space-y-2 text-sm sm:text-base">
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto: info@dionis-insurance.kz"
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
              <strong>Telegram:</strong>{" "}
              <span>@Dionis_insurance_broker_bot</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
