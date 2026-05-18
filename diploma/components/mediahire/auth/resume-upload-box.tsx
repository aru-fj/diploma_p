"use client";

import type { ChangeEvent, DragEvent } from "react";
import { FileText, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

type ResumeUploadBoxProps = {
  error?: string;
  fileName?: string;
  isDragActive: boolean;
  onDragActiveChange: (isActive: boolean) => void;
  onFileSelect: (file: File) => void;
  onUploadConfirm: () => void;
};

export function ResumeUploadBox({
  error,
  fileName,
  isDragActive,
  onDragActiveChange,
  onFileSelect,
  onUploadConfirm,
}: ResumeUploadBoxProps) {
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      onFileSelect(file);
    }

    event.target.value = "";
  }

  function handleDragOver(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    onDragActiveChange(true);
  }

  function handleDragLeave(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    onDragActiveChange(false);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    onDragActiveChange(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      onFileSelect(file);
    }
  }

  return (
    <div className="mt-12 text-center">
      <h2 className="text-xl font-black tracking-tight text-slate-900">
        Upload your resume
      </h2>
      <p className="mt-2 text-xs font-medium leading-5 text-slate-400">
        You can attach a separate resume file here.
      </p>

      <motion.label
        className={`mt-6 flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-5 py-7 text-center transition ${
          isDragActive
            ? "border-[#0B63E5] bg-[#eef4ff] shadow-[0_18px_36px_rgba(11,99,229,0.12)]"
            : "border-slate-300 bg-white hover:border-[#0B63E5]/60 hover:bg-[#f8fbff]"
        }`}
        htmlFor="resumeFile"
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        whileHover={{ y: -2 }}
      >
        <input
          accept="application/pdf,.pdf"
          className="sr-only"
          id="resumeFile"
          onChange={handleFileChange}
          type="file"
        />
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#eef4ff] text-[#0B63E5]">
          {fileName ? <FileText size={24} /> : <UploadCloud size={25} />}
        </span>
        <span className="mt-4 text-sm font-bold text-slate-400">
          {fileName ?? "Drag & Drop or Choose file"}
        </span>
        <span className="mt-1 text-xs font-semibold text-slate-300">
          To upload PDF MAX 10 MB.
        </span>
      </motion.label>

      {error ? (
        <p className="mt-2 text-sm font-semibold text-red-500">{error}</p>
      ) : null}

      <motion.button
        className="mt-4 inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-xl border border-[#0B63E5] bg-white text-sm font-black text-[#0B63E5] transition hover:-translate-y-0.5 hover:bg-[#eef4ff] focus-within:ring-4 focus-within:ring-[#0B63E5]/10"
        onClick={onUploadConfirm}
        type="button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.985 }}
      >
        Upload resume
      </motion.button>
    </div>
  );
}
