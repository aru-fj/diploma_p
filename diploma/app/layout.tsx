import type { Metadata } from "next";
import { JobSeekerLanguageProvider } from "@/components/mediahire/i18n/jobseeker-language-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "MediaHire | Creative jobs and portfolios",
  description:
    "A modern job marketplace and portfolio platform for creative media specialists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
      <JobSeekerLanguageProvider>
        {children}
      </JobSeekerLanguageProvider></body>
    </html>
  );
}
