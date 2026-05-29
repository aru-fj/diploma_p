"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { AuthImagePanel } from "./auth-image-panel";
import { AuthLogo } from "./logo";
import { PrimaryButton } from "./primary-button";
import { ProgressSteps } from "./progress-steps";
import { ResumeUploadBox } from "./resume-upload-box";
import { TestimonialCard } from "./testimonial-card";

const jobSeekerHomeRoute = "/home/jobseeker";
const maxResumeSize = 10 * 1024 * 1024;

export function JobSeekerResumePage() {
  const router = useRouter();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadConfirmed, setIsUploadConfirmed] = useState(false);

  function validateFile(file: File) {
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      return "Only PDF files are allowed";
    }

    if (file.size > maxResumeSize) {
      return "Resume file must be 10 MB or smaller";
    }

    return "";
  }

  function handleFileSelect(file: File) {
    const nextError = validateFile(file);

    if (nextError) {
      setResumeFile(null);
      setError(nextError);
      setIsUploadConfirmed(false);
      return;
    }

    setResumeFile(file);
    setError("");
    setIsUploadConfirmed(false);
  }

  function handleUploadConfirm() {
    if (!resumeFile) {
      setError("Choose a PDF resume before uploading");
      setIsUploadConfirmed(false);
      return;
    }

    setError("");
    setIsUploadConfirmed(true);
  }

  function goToJobSeekerHome() {
    setIsLoading(true);
    router.push(jobSeekerHomeRoute);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!resumeFile) {
      setError("Please upload your resume or choose Skip");
      return;
    }

    goToJobSeekerHome();
  }

  function handleSkip() {
    setError("");
    goToJobSeekerHome();
  }

  return (
    <main className="min-h-screen bg-white px-4 py-3 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-7xl gap-6 lg:grid-cols-[0.72fr_1.3fr] lg:items-start">
        <motion.section
          className="flex items-start justify-center py-3 lg:py-3"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full max-w-[285px]">
            <ProgressSteps activeStep={3} />

            {isUploadConfirmed ? (
              <motion.div
                className="mt-5 flex items-center gap-2.5 rounded-lg bg-[#ecfff1] px-3.5 py-2.5 text-left text-xs font-black text-[#006b16] shadow-[0_14px_36px_rgba(16,185,129,0.12)]"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <CheckCircle2 aria-hidden="true" className="shrink-0" size={20} />
                Data received successfully
              </motion.div>
            ) : null}

            <div
              className={`text-center max-lg:mt-12 ${
                isUploadConfirmed ? "mt-6" : "mt-7"
              }`}
            >
              <AuthLogo compact />
              <h1 className="mt-4 text-[1.25rem] font-black tracking-tight text-slate-900">
                Upload your resume
              </h1>
              <p className="mx-auto mt-1.5 max-w-[260px] text-[11px] leading-5 text-slate-400">
                Upload your resume to find the best job opportunities based on
                your experience.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <ResumeUploadBox
                error={error}
                fileName={resumeFile?.name}
                isDragActive={isDragActive}
                onDragActiveChange={setIsDragActive}
                onFileSelect={handleFileSelect}
                onUploadConfirm={handleUploadConfirm}
              />

              <PrimaryButton compact className="mt-4" isLoading={isLoading} type="submit">
                Finish Up
              </PrimaryButton>
            </form>

            <button
              className="mx-auto mt-2.5 block rounded-full px-6 py-1.5 text-xs font-bold text-slate-500 transition hover:bg-[#eef4ff] hover:text-[#0B63E5] focus:outline-none focus:ring-4 focus:ring-[#0B63E5]/10"
              onClick={handleSkip}
              type="button"
            >
              Skip
            </button>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <AuthImagePanel
            alt="Media creator holding a tablet and filming setup"
            imageClassName="object-center"
            panelClassName="max-lg:min-h-[460px] lg:h-[calc(100vh-1.5rem)] lg:min-h-[460px]"
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1500&q=90"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
            <motion.div
              className="absolute inset-x-6 bottom-6 sm:inset-x-9 sm:bottom-9"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <TestimonialCard
                avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80"
                name="Gulzat Beiman"
                role="Job Seeker"
                text="My application journey with Taint was one of the most thoughtful and human-centered experiences I've had in my career. The recruiters took the time to understand my motivations, asked insightful questions."
              />
            </motion.div>
          </AuthImagePanel>
        </motion.section>
      </div>
    </main>
  );
}
