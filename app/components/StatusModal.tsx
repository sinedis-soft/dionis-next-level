// app/components/StatusModal.tsx
"use client";

export default function StatusModal({
  open,
  kind,
  titleSuccess,
  titleError,
  message,
  closeText,
  onClose,
}: {
  open: boolean;
  kind: "success" | "error";
  titleSuccess: string;
  titleError: string;
  message: string;
  closeText: string;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center">
        <h3 className="text-lg font-semibold text-[#1A3A5F] mb-3">
          {kind === "success" ? titleSuccess : titleError}
        </h3>

        <p className="text-sm text-gray-700 mb-5">{message}</p>

        <button type="button" className="btn w-full" onClick={onClose}>
          {closeText}
        </button>
      </div>
    </div>
  );
}
