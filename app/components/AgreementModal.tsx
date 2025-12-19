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
      <div className="text-sm text-gray-700 space-y-4">
        <p>{agreement.intro1}</p>

        <p>{agreement.personalDataDefinition}</p>

        <ul className="list-disc pl-6 space-y-1">
          <li>{agreement.dataList.firstName}</li>
          <li>{agreement.dataList.lastName}</li>
          <li>{agreement.dataList.email}</li>
          <li>{agreement.dataList.phone}</li>
          <li>{agreement.dataList.comment}</li>
        </ul>

        <p>{agreement.processingIntro}</p>
        <p>{agreement.purposesIntro}</p>

        <ul className="list-disc pl-6 space-y-1">
          {agreement.purposesList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p>{agreement.consentText}</p>

        <h4 className="font-semibold text-[#1A3A5F] mt-4">
          {agreement.contactsTitle}
        </h4>

        <ul className="list-disc pl-6 space-y-1">
          {agreement.contactsList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="pt-4 flex justify-end">
          <button
            type="button"
            className="px-4 py-2 rounded-xl border border-black/10 bg-white/60 hover:bg-white/80 text-sm font-semibold text-[#0f2238]"
            onClick={onClose}
          >
            {agreement.closeBtn}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
