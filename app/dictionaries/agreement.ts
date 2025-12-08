import type { Lang } from "@/dictionaries/header";

export type AgreementDictionary = {
  title: string;
  intro1: string;
  personalDataDefinition: string;
  dataList: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    comment: string;
  };
  processingIntro: string;
  purposesIntro: string;
  purposesList: string[];
  consentText: string;
  contactsTitle: string;
  contactsList: string[];
  closeBtn: string;
  acceptBtn: string;
};

export const AGREEMENT_DICTIONARY: Record<Lang, AgreementDictionary> = {
  ru: {
    title: "Согласие на обработку персональных данных",

    intro1:
      "Настоящим в соответствии с Законом Республики Казахстан от 21 мая 2013 года № 94-V «О персональных данных и их защите» свободно, своей волей и в своем интересе выражаю свое безусловное согласие на обработку моих персональных данных Оператором — ТОО «Страховой брокер Дионис», зарегистрированным по адресу: Республика Казахстан, г. Алматы, ул. Ауэзова, д. 14А.",

    personalDataDefinition:
      "Персональные данные — любая информация, относящаяся к определенному или определяемому на основании такой информации физическому лицу. Настоящее Согласие выдано мною на обработку следующих персональных данных:",

    dataList: {
      firstName: "Имя",
      lastName: "Фамилия",
      email: "E-mail",
      phone: "Телефон",
      comment: "Комментарий",
    },

    processingIntro:
      "Согласие дано Оператору для совершения следующих действий с моими персональными данными с использованием средств автоматизации и/или без использования таких средств: сбор, систематизация, накопление, хранение, уточнение (обновление, изменение), использование, обезличивание, передача третьим лицам, а также любые иные действия, предусмотренные Законом Республики Казахстан № 94-V.",

    purposesIntro: "Данное согласие дается Оператору и третьим лицам — страховым организациям Республики Беларусь для обработки моих персональных данных в целях:",

    purposesList: [
      "предоставление услуг и работ;",
      "направление уведомлений, связанных с услугами;",
      "подготовка и направление ответов на мои запросы;",
      "информирование о мероприятиях, товарах и услугах Оператора.",
    ],

    consentText:
      "Согласие действует до момента его отзыва путем направления уведомления на email: info@dionis-insurance.kz. В случае отзыва оператор вправе продолжить обработку без моего согласия, если это разрешено ст. 9 Закона № 94-V.",

    contactsTitle: "Наши контакты",
    contactsList: [
      "Адрес: Республика Казахстан, г. Алматы, ул. Ауэзова, д. 14А.",
      "Рабочее время: ПН–ПТ 11:00 – 19:30.",
      "Телефон: +7 727 357-30-30",
      "Email: info@dionis-insurance.kz",
    ],

    closeBtn: "Закрыть",
    acceptBtn: "Принимаю",
  },

  kz: {
  title: "Жеке деректерді өңдеуге келісім",

  intro1:
    "Осы арқылы мен Қазақстан Республикасының 2013 жылғы 21 мамырдағы № 94-V «Жеке деректер және оларды қорғау туралы» Заңына сәйкес өз еркіммен, өз мүддемде «Дионис сақтандыру брокері» ЖШС-іне менің жеке деректерімді өңдеуге сөзсіз келісімімді беремін. Оператордың мекенжайы: Қазақстан Республикасы, Алматы қ., Әуезов к-сі, 14А үй.",

  personalDataDefinition:
    "Жеке деректер — белгілі бір немесе сол деректер бойынша айқындалатын жеке тұлғаға қатысты кез келген ақпарат. Осы келісім менің төмендегі жеке деректерімді өңдеу үшін беріледі:",

  dataList: {
    firstName: "Аты",
    lastName: "Тегі",
    email: "E-mail",
    phone: "Телефон",
    comment: "Пікір",
  },

  processingIntro:
    "Келісім Операторға менің жеке деректеріммен келесі әрекеттерді автоматтандырылған құралдарды қолдана отырып және/немесе қолданбай орындауға беріледі: жинау, жүйелеу, жинақтау, сақтау, нақтылау (жаңарту, өзгерту), пайдалану, иесіздендіру, үшінші тұлғаларға беру, сондай-ақ Қазақстан Республикасының № 94-V Заңында көзделген өзге де әрекеттер.",

  purposesIntro:
    "Бұл келісім Операторға және үшінші тұлғаларға — Беларусь Республикасының сақтандыру ұйымдарына — менің жеке деректерімді келесі мақсаттарда өңдеу үшін беріледі:",

  purposesList: [
    "қызметтер мен жұмыстарды көрсету;",
    "көрсетілетін қызметтерге байланысты хабарламаларды жіберу;",
    "менің сұрауларыма жауаптарды дайындау және жолдау;",
    "Оператордың іс-шаралары, тауарлары мен қызметтері туралы ақпарат (соның ішінде жарнамалық ақпарат) жіберу.",
  ],

  consentText:
    "Келісім оны қайтарып алу туралы хабарламаны email: info@dionis-insurance.kz мекенжайына жіберген сәтке дейін жарамды. Келісім қайтарылған жағдайда, Оператор № 94-V Заңның 9-бабында рұқсат етілген болса, менің келісімімсіз деректерді өңдеуді жалғастыруға құқылы.",

  contactsTitle: "Біздің байланыстар",
  contactsList: [
    "Мекенжайы: Қазақстан Республикасы, Алматы қ., Әуезов к-сі, 14А үй.",
    "Жұмыс уақыты: ДС–ЖМ 11:00 – 19:30.",
    "Телефон: +7 727 357-30-30",
    "Email: info@dionis-insurance.kz",
  ],

  closeBtn: "Жабу",
  acceptBtn: "Қабылдаймын",
},

  en: {
  title: "Consent to the Processing of Personal Data",

  intro1:
    "Hereby, in accordance with the Law of the Republic of Kazakhstan dated 21 May 2013 No. 94-V “On Personal Data and Their Protection”, I freely, by my own will and in my own interest, express my unconditional consent to the processing of my personal data by the Operator — Dionis Insurance Broker LLP, registered at: Republic of Kazakhstan, Almaty, Auezov Street, Building 14A.",

  personalDataDefinition:
    "Personal data means any information relating to an identified or identifiable individual. This Consent is granted for the processing of the following personal data:",

  dataList: {
    firstName: "First name",
    lastName: "Last name",
    email: "E-mail",
    phone: "Phone",
    comment: "Comment",
  },

  processingIntro:
    "This consent is given to the Operator to perform the following actions with my personal data, with or without the use of automated tools: collection, systematization, accumulation, storage, clarification (updating, modification), use, depersonalization, transfer to third parties, as well as any other actions provided for by the Law of the Republic of Kazakhstan No. 94-V.",

  purposesIntro:
    "This consent is provided to the Operator and third parties — insurance organizations of the Republic of Belarus — for the processing of my personal data for the following purposes:",

  purposesList: [
    "provision of services and works;",
    "sending notifications related to the provided services;",
    "preparation and sending of responses to my requests;",
    "sending information (including advertising materials) about the Operator’s events, products and services.",
  ],

  consentText:
    "This consent remains valid until it is revoked by sending a notification to the email: info@dionis-insurance.kz. In case of revocation, the Operator is entitled to continue processing my data without my consent if permitted by Article 9 of Law No. 94-V.",

  contactsTitle: "Our contacts",
  contactsList: [
    "Address: Republic of Kazakhstan, Almaty, Auezov Street, Building 14A.",
    "Working hours: Mon–Fri 11:00 – 19:30.",
    "Phone: +7 727 357-30-30",
    "Email: info@dionis-insurance.kz",
  ],

  closeBtn: "Close",
  acceptBtn: "Accept",
},
};

export function getAgreementDictionary(lang: Lang): AgreementDictionary {
  return AGREEMENT_DICTIONARY[lang] ?? AGREEMENT_DICTIONARY.ru;
}
