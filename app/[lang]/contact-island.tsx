"use client";

import Image from "next/image";
import Script from "next/script";
import { useState } from "react";

import type { Lang } from "@/dictionaries/header";
import type { HomeDictionary } from "@/dictionaries/home";
import type { AgreementDictionary } from "@/dictionaries/agreement";

import ContactForm, { type ContactFormResult } from "@/components/ContactForm";
import AgreementModal from "@/components/AgreementModal";
import StatusModal from "@/components/StatusModal";
import DeferredHydration from "@/components/DeferredHydration";

export default function ContactIsland({
  lang: _lang,
  t,
  agreement,
}: {
  lang: Lang;
  t: HomeDictionary;
  agreement: AgreementDictionary;
}) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const [isAgreementOpen, setIsAgreementOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusKind, setStatusKind] = useState<"success" | "error">("success");
  const [statusMessage, setStatusMessage] = useState("");

  function handleFormResult(result: ContactFormResult) {
    setStatusKind(result.kind);
    setStatusMessage(result.message);
    setStatusOpen(true);
  }

  return (
    <>
      {/* грузим recaptcha реально поздно: когда блок почти в зоне видимости */}
      <DeferredHydration rootMargin="1200px" minDelayMs={0}>
        {recaptchaSiteKey && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
            strategy="lazyOnload"
          />
        )}
      </DeferredHydration>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 items-start">
        <div className="flex flex-col justify-end items-center lg:items-center h-full">
          <Image
            src="/director-borovoy.webp"
            alt={t.contact.photoAlt}
            width={500}
            height={900}
            className="w-72 sm:w-80 lg:w-96 h-auto object-contain"
          />
        </div>

        <DeferredHydration rootMargin="900px" minDelayMs={150}>
          <ContactForm
            t={t.contact}
            agreement={agreement}
            onOpenAgreement={() => setIsAgreementOpen(true)}
            onResult={handleFormResult}
          />
        </DeferredHydration>
      </div>

      <StatusModal
        open={statusOpen}
        kind={statusKind}
        titleSuccess={t.contact.modalSuccessTitle}
        titleError={t.contact.modalErrorTitle}
        closeText={t.contact.modalClose}
        message={statusMessage}
        onClose={() => setStatusOpen(false)}
      />

      <AgreementModal
        open={isAgreementOpen}
        agreement={agreement}
        onClose={() => setIsAgreementOpen(false)}
      />
    </>
  );
}
