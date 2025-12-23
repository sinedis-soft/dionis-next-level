// components/ContactSection.tsx
"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Script from "next/script";

import ContactForm, {
  type ContactBlock,
  type ContactFormResult,
} from "@/components/ContactForm";
import AgreementModal from "@/components/AgreementModal";
import type { AgreementDictionary } from "@/dictionaries/agreement";

type Props = {
  contact: ContactBlock;
  agreement: AgreementDictionary;

  imageSrc?: string;
  context?: string;

  submitUrl?: string;
  recaptchaAction?: string;
};

export default function ContactSection({
  contact,
  agreement,
  imageSrc,
  context = "contacts",
  submitUrl = "/api/contact",
  recaptchaAction = "contact",
}: Props) {
  const [agreementOpen, setAgreementOpen] = useState(false);
  const [needRecaptcha, setNeedRecaptcha] = useState(false);

  const recaptchaSiteKey = useMemo(
    () => process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "",
    []
  );

  const openAgreement = useCallback(() => setAgreementOpen(true), []);
  const closeAgreement = useCallback(() => setAgreementOpen(false), []);

  const handleNeedRecaptcha = useCallback(() => {
    if (recaptchaSiteKey) setNeedRecaptcha(true);
  }, [recaptchaSiteKey]);

  const handleResult = useCallback((_r: ContactFormResult) => {
    // сюда при желании можно повесить аналитику
  }, []);

  return (
    <section className="mt-12 sm:mt-16 border-t border-gray-200 bg-[#F7F7F7] py-12 sm:py-16">
      {/* ✅ reCAPTCHA v3 подгружаем только когда реально нужна */}
      {needRecaptcha && recaptchaSiteKey ? (
        <Script
          id="recaptcha-v3"
          src={`https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(
            recaptchaSiteKey
          )}`}
          strategy="afterInteractive"
        />
      ) : null}

      <div className="max-w-6xl mx-auto px-4">
  <div className="grid gap-8 lg:grid-cols-2 items-stretch">
    {/* LEFT: только картинка, без card и без фона */}
    <div className="h-full flex items-center justify-center">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          width={1200}
          height={800}
          className="max-h-full w-full object-contain"
          priority={false}
        />
      ) : null}
    </div>

    {/* RIGHT: единственная карточка */}
    <div className="card bg-white p-6 sm:p-8 h-full flex flex-col">
      <ContactForm
        t={contact}
        agreement={agreement}
        onOpenAgreement={openAgreement}
        onResult={handleResult}
        onNeedRecaptcha={handleNeedRecaptcha}
        recaptchaSiteKey={recaptchaSiteKey}
        context={context}
        submitUrl={submitUrl}
        recaptchaAction={recaptchaAction}
      />
    </div>
  </div>
</div>


      {/* ✅ единая модалка соглашения (без дублирования) */}
      <AgreementModal open={agreementOpen} agreement={agreement} onClose={closeAgreement} />
    </section>
  );
}
