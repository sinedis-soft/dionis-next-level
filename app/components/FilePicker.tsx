// app/components/FilePicker.tsx
"use client";

import { useCallback, useId, useRef, useState } from "react";

type Props = {
  id?: string;
  name: string;
  label: string;

  required?: boolean;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;

  onValidate: (files: FileList) => boolean;

  pickLabel?: string;
  clearLabel?: string;
  emptyHint?: string;
};

export default function FilePicker({
  id,
  name,
  label,
  required = false,
  accept,
  multiple = false,
  disabled = false,
  onValidate,
  pickLabel = "Выбрать файлы",
  clearLabel = "Очистить",
  emptyHint = "Файлы не выбраны",
}: Props) {
  const autoId = useId();
  const inputId = id ?? `file-${autoId}`;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const pick = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const clear = useCallback(() => {
    setFiles([]);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fl = e.currentTarget.files;
      if (!fl) return;

      const ok = onValidate(fl);
      if (!ok) {
        e.currentTarget.value = "";
        setFiles([]);
        return;
      }

      setFiles(Array.from(fl));
    },
    [onValidate]
  );

  const hint = files.length ? `Выбрано файлов: ${files.length}` : emptyHint;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      {/* mobile: column, desktop: row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
            {label}
            {required ? <span className="text-red-500"> *</span> : null}
          </label>

          <div className="mt-1 text-xs text-gray-500">{hint}</div>
        </div>

        {/* mobile: stacked full width; desktop: inline */}
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-2 sm:shrink-0">
          <button
            type="button"
            className="btn btn-secondary w-full sm:w-auto"
            onClick={pick}
            disabled={disabled}
          >
            {pickLabel}
          </button>

          <button
            type="button"
            className="btn w-full sm:w-auto px-4 disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={clear}
            disabled={disabled || files.length === 0}
          >
            {clearLabel}
          </button>
        </div>
      </div>

      {files.length ? (
        <ul className="mt-3 space-y-1 text-xs text-gray-600">
          {files.slice(0, 6).map((f) => (
            <li key={`${f.name}-${f.size}`} className="truncate">
              {f.name}
            </li>
          ))}
          {files.length > 6 ? (
            <li className="text-gray-500">…и ещё {files.length - 6}</li>
          ) : null}
        </ul>
      ) : null}

      <input
        ref={inputRef}
        id={inputId}
        name={name}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        required={required}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}