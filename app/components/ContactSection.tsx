// components/ContactSection.tsx
"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Script from "next/script";

import { getRecaptchaSiteKey } from "@/lib/recaptcha";
import ContactForm, { type ContactBlock, type ContactFormResult } from "@/components/ContactForm";
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

  const recaptchaSiteKey = useMemo(() => getRecaptchaSiteKey(), []);

  const openAgreement = useCallback(() => setAgreementOpen(true), []);
  const closeAgreement = useCallback(() => setAgreementOpen(false), []);

  // ContactForm вызывает это только перед первой реальной отправкой
  const handleNeedRecaptcha = useCallback(() => {
    if (recaptchaSiteKey) setNeedRecaptcha(true);
  }, [recaptchaSiteKey]);

  const handleResult = useCallback((_r: ContactFormResult) => {
    // analytics hook
  }, []);

  return (
    <section className="contact-section">
      {/* reCAPTCHA v3 грузим лениво, но ОДИН раз и только тут */}
      {needRecaptcha && recaptchaSiteKey ? (
        <Script
          id="recaptcha-v3"
          src={`https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(recaptchaSiteKey)}`}
          strategy="afterInteractive"
        />
      ) : null}

      <div className="contact-section__container">
        <div className="contact-section__grid">
          <div className="contact-section__media">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt=""
                width={1200}
                height={800}
                className="contact-section__img"
                priority={false}
              />
            ) : null}
          </div>

          <div className="contact-section__card card card--pad">
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

      <AgreementModal open={agreementOpen} agreement={agreement} onClose={closeAgreement} />
    </section>
  );
}