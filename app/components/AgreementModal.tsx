// app/components/AgreementModal.tsx
"use client";

import type { AgreementDictionary } from "@/dictionaries/agreement";

export default function AgreementModal({
  open,
  agreement,
  onClose,
}: {
  open: boolean;
  agreement: AgreementDictionary;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 max-h-[85vh] overflow-y-auto">
        <h3 className="text-lg font-bold text-[#1A3A5F] mb-4">
          {agreement.title}
        </h3>

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
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-md border text-sm hover:bg-gray-100"
            onClick={onClose}
          >
            {agreement.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
