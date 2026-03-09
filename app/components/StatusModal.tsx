// app/components/StatusModal.tsx
"use client";

import ModalShell from "@/components/ModalShell";

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
  const title = kind === "success" ? titleSuccess : titleError;

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={title}
      // делаем подложку как у тебя: bg-black/40
      overlayClassName="u-bg-black-40"
      // делаем панель как у тебя: белая карточка, max-w-sm, центр
      panelClassName="u-max-w-sm u-bg-white u-rounded-2xl u-shadow-xl"
      // чтобы не было лишней шапки с крестиком (у тебя её нет)
      showClose={false}
    >
      <div className="u-text-center">
        <p className="u-text-sm u-text-gray-700 u-mb-5">{message}</p>

        <button type="button" className="btn u-w-full" onClick={onClose}>
          {closeText}
        </button>
      </div>
    </ModalShell>
  );
}
