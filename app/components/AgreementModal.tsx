"use client";

import type { AgreementDictionary } from "@/dictionaries/agreement";
import ModalShell from "@/components/ModalShell";

export default function AgreementModal({
  open,
  agreement,
  onClose,
}: {
  open: boolean;
  agreement: AgreementDictionary;
  onClose: () => void;
}) {
  return (
    <ModalShell open={open} onClose={onClose} title={agreement.title}>
      <div className="u-text-sm u-text-gray-700 u-space-y-4">
        <p>{agreement.intro1}</p>

        <p>{agreement.personalDataDefinition}</p>

        <ul className="u-list-disc u-pl-6 u-space-y-1">
          <li>{agreement.dataList.firstName}</li>
          <li>{agreement.dataList.lastName}</li>
          <li>{agreement.dataList.email}</li>
          <li>{agreement.dataList.phone}</li>
          <li>{agreement.dataList.comment}</li>
        </ul>

        <p>{agreement.processingIntro}</p>
        <p>{agreement.purposesIntro}</p>

        <ul className="u-list-disc u-pl-6 u-space-y-1">
          {agreement.purposesList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p>{agreement.consentText}</p>

        <h4 className="u-font-semibold u-text--1a3a5f u-mt-4">
          {agreement.contactsTitle}
        </h4>

        <ul className="u-list-disc u-pl-6 u-space-y-1">
          {agreement.contactsList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="u-pt-4 u-flex u-justify-end">
          <button
            type="button"
            className="u-px-4 u-py-2 u-rounded-xl u-border u-border-black-10 u-bg-white-60 u-hover-bg-white-80 u-text-sm u-font-semibold u-text--0f2238"
            onClick={onClose}
          >
            {agreement.closeBtn}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
