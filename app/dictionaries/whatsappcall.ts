// app/dictionaries/whatsappcall.ts
import type { Lang } from "@/dictionaries/header";

export type WhatsAppCallDictionary = {
  title: string;
  intro: string;
  submit: string;
  loadingButton: string;
  loadingMessage: string;
  successMessage: string;
  errorMessage: string;
  contact: {
    name: string;
    namePlaceholder: string;
    whatsapp: string;
    whatsappPlaceholder: string;
  };
};

export const whatsappCallDictRu = {
  title: "Заказать консультацию",
  intro: "Оставьте имя и номер WhatsApp, и мы свяжемся с вами.",
  submit: "Заказать консультацию",
  loadingButton: "Отправка...",
  loadingMessage: "Отправка...",
  successMessage: "Заявка успешно отправлена",
  errorMessage: "Ошибка при отправке заявки",
  contact: {
    name: "Имя",
    namePlaceholder: "Введите имя",
    whatsapp: "Номер WhatsApp",
    whatsappPlaceholder: "+7 777 1234567",
  },
} satisfies WhatsAppCallDictionary;

export const whatsappCallDictEn = {
  title: "Request a Consultation",
  intro: "Leave your name and WhatsApp number, and we will contact you.",
  submit: "Request a Consultation",
  loadingButton: "Sending...",
  loadingMessage: "Sending...",
  successMessage: "Your request has been sent successfully",
  errorMessage: "Failed to send your request",
  contact: {
    name: "Name",
    namePlaceholder: "Enter your name",
    whatsapp: "WhatsApp Number",
    whatsappPlaceholder: "+44 7700 900123",
  },
} satisfies WhatsAppCallDictionary;

export const whatsappCallDictKz = {
  title: "Кеңес беруге тапсырыс беру",
  intro: "Атыңызды және WhatsApp нөміріңізді қалдырыңыз, біз сізбен байланысамыз.",
  submit: "Кеңес беруге тапсырыс беру",
  loadingButton: "Жіберілуде...",
  loadingMessage: "Жіберілуде...",
  successMessage: "Өтініміңіз сәтті жіберілді",
  errorMessage: "Өтінімді жіберу кезінде қате пайда болды",
  contact: {
    name: "Аты",
    namePlaceholder: "Атыңызды енгізіңіз",
    whatsapp: "WhatsApp нөмірі",
    whatsappPlaceholder: "+7 777 1234567",
  },
} satisfies WhatsAppCallDictionary;

export function getWhatsAppCallDictionary(
  lang: Lang
): WhatsAppCallDictionary {
  switch (lang) {
    case "en":
      return whatsappCallDictEn;
    case "kz":
      return whatsappCallDictKz;
    case "ru":
    default:
      return whatsappCallDictRu;
  }
}