"use client";

import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { motion } from "framer-motion";

type CompanyLogoUploadProps = {
  error?: string;
  onChange: (file: File | null) => void;
  previewUrl?: string;
};

export function CompanyLogoUpload({
  error,
  onChange,
  previewUrl,
}: CompanyLogoUploadProps) {
  return (
    <div className="text-center">
      <motion.label
        className={`relative mx-auto flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border bg-white transition ${
          error
            ? "border-red-400"
            : "border-slate-300 hover:border-[#252525] hover:shadow-[0_14px_32px_rgba(37,37,37,0.12)]"
        }`}
        htmlFor="companyLogo"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        {previewUrl ? (
          <Image
            alt="Company logo preview"
            className="object-cover"
            fill
            sizes="96px"
            src={previewUrl}
            unoptimized
          />
        ) : (
          <ImagePlus aria-hidden="true" className="text-slate-400" size={28} />
        )}
        <input
          accept="image/png,image/jpeg,image/jpg"
          className="sr-only"
          id="companyLogo"
          onChange={(event) => onChange(event.target.files?.[0] ?? null)}
          type="file"
        />
      </motion.label>
      <p className="mt-3 text-sm font-medium text-slate-500">
        Upload your logo
      </p>
      {error ? (
        <p className="mt-2 text-sm font-semibold text-red-500">{error}</p>
      ) : null}
    </div>
  );
}
