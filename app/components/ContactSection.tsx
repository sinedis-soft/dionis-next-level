// components/ContactSection.tsx
"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import type { AgreementDictionary } from "@/dictionaries/agreement";
import ContactForm, {
  type ContactFormResult,
  type ContactBlock,
} from "@/components/ContactForm";
import AgreementModal from "@/components/AgreementModal";
import StatusModal from "@/components/StatusModal";
import { RecaptchaLazy } from "@/components/RecaptchaLazy";

type Props = {
  contact: ContactBlock;
  agreement: AgreementDictionary;

  // ✅ картинка слева
  imageSrc?: string;
  imageAlt?: string;

  // ✅ разный endpoint и контекст
  submitUrl?: string;
  context?: string;

  // ✅ если захочешь разные action
  recaptchaAction?: string;

  // ✅ можно отключить левую картинку вообще
  showImage?: boolean;

  // ✅ стили секции (если вдруг на разных страницах нужен другой фон/отступы)
  sectionClassName?: string;
};

export default function ContactSection({
  contact,
  agreement,
  imageSrc = "/laiter(1).png",
  imageAlt,
  submitUrl = "/api/contact",
  context = "site-contact",
  recaptchaAction = "contact",
  showImage = true,
  sectionClassName = "py-12 sm:py-16 bg-[#F4F6FA]",
}: Props) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

  const [recaptchaEnabled, setRecaptchaEnabled] = useState(false);
  const enableRecaptcha = useCallback(() => setRecaptchaEnabled(true), []);

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
      {recaptchaSiteKey ? (
        <RecaptchaLazy siteKey={recaptchaSiteKey} enabled={recaptchaEnabled} />
      ) : null}

      <section className={sectionClassName}>
        <div className="max-w-6xl mx-auto px-4">
          <div
            className={
              showImage
                ? "grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 items-start"
                : "grid grid-cols-1 gap-10 items-start"
            }
          >
            {showImage ? (
              <div className="flex flex-col justify-end items-center lg:items-center h-full">
                <Image
                  src={imageSrc}
                  alt={imageAlt ?? contact.photoAlt}
                  width={500}
                  height={900}
                  quality={60}
                  loading="lazy"
                  sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
                  className="w-72 sm:w-80 lg:w-96 h-auto object-contain"
                />
              </div>
            ) : null}

            <ContactForm
              t={contact}
              agreement={agreement}
              onOpenAgreement={() => setIsAgreementOpen(true)}
              onResult={handleFormResult}
              onNeedRecaptcha={enableRecaptcha}
              recaptchaSiteKey={recaptchaSiteKey}
              submitUrl={submitUrl}
              context={context}
              recaptchaAction={recaptchaAction}
            />
          </div>
        </div>
      </section>

      <StatusModal
        open={statusOpen}
        kind={statusKind}
        titleSuccess={contact.modalSuccessTitle}
        titleError={contact.modalErrorTitle}
        closeText={contact.modalClose}
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
