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
    <div className="u-rounded-xl u-border u-border-gray-200 u-bg-white u-p-4">
      {/* mobile: column, desktop: row */}
      <div className="u-flex u-flex-col u-gap-3 u-sm-flex-row u-sm-items-start u-sm-justify-between">
        <div className="u-min-w-0">
          <label htmlFor={inputId} className="u-text-sm u-font-medium u-text-gray-700">
            {label}
            {required ? <span className="u-text-red-500"> *</span> : null}
          </label>

          <div className="u-mt-1 u-text-xs u-text-gray-500">{hint}</div>
        </div>

        {/* mobile: stacked full width; desktop: inline */}
        <div className="u-flex u-flex-col u-gap-2 u-sm-flex-row u-sm-gap-2 u-sm-shrink-0">
          <button
            type="button"
            className="btn btn-secondary u-w-full u-sm-w-auto"
            onClick={pick}
            disabled={disabled}
          >
            {pickLabel}
          </button>

          <button
            type="button"
            className="btn u-w-full u-sm-w-auto u-px-4 u-disabled-opacity-60 u-disabled-cursor-not-allowed"
            onClick={clear}
            disabled={disabled || files.length === 0}
          >
            {clearLabel}
          </button>
        </div>
      </div>

      {files.length ? (
        <ul className="u-mt-3 u-space-y-1 u-text-xs u-text-gray-600">
          {files.slice(0, 6).map((f) => (
            <li key={`${f.name}-${f.size}`} className="u-truncate">
              {f.name}
            </li>
          ))}
          {files.length > 6 ? (
            <li className="u-text-gray-500">…и ещё {files.length - 6}</li>
          ) : null}
        </ul>
      ) : null}

      <input
        ref={inputRef}
        id={inputId}
        name={name}
        type="file"
        className="u-hidden"
        accept={accept}
        multiple={multiple}
        required={required}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}