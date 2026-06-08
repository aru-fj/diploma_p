"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

import {
  DEFAULT_JOBSEEKER_LANGUAGE,
  JOBSEEKER_LANGUAGE_STORAGE_KEY,
  isJobSeekerLanguage,
  translateJobSeekerAttribute,
  translateJobSeekerRawText,
  translateJobSeekerText,
  type JobSeekerLanguage,
} from "@/lib/mediahire/jobseeker-i18n";

type JobSeekerLanguageContextValue = {
  language: JobSeekerLanguage;
  setLanguage: (language: JobSeekerLanguage) => void;
  t: (key: string) => string;
};

const JobSeekerLanguageContext =
  createContext<JobSeekerLanguageContextValue | null>(null);

function isJobSeekerPath(pathname: string | null) {
  if (!pathname) return false;

  return (
    pathname.startsWith("/home/jobseeker") ||
    pathname.startsWith("/profile/jobseeker") ||
    pathname.startsWith("/settings/jobseeker") ||
    pathname.startsWith("/account/jobseeker") ||
    pathname.startsWith("/dashboard/jobseeker")
  );
}

function shouldSkipTextNode(node: Text) {
  const parent = node.parentElement;

  if (!parent) return true;

  return Boolean(
    parent.closest("script, style, textarea, code, pre, [data-no-i18n='true']")
  );
}

function translateTextNode(node: Text, language: JobSeekerLanguage) {
  if (shouldSkipTextNode(node)) return;

  const currentValue = node.nodeValue ?? "";
  const trimmedValue = currentValue.trim();

  if (!trimmedValue) return;

  const translatedValue = translateJobSeekerRawText(language, trimmedValue);

  if (translatedValue !== trimmedValue) {
    node.nodeValue = currentValue.replace(trimmedValue, translatedValue);
  }
}

function translateElementAttributes(
  element: Element,
  language: JobSeekerLanguage
) {
  const attributes = ["placeholder", "aria-label", "title"];

  for (const attribute of attributes) {
    const value = element.getAttribute(attribute);
    const translatedValue = translateJobSeekerAttribute(language, value);

    if (translatedValue && translatedValue !== value) {
      element.setAttribute(attribute, translatedValue);
    }
  }
}

function translateDom(language: JobSeekerLanguage) {
  const root = document.body;

  if (!root) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  while (walker.nextNode()) {
    translateTextNode(walker.currentNode as Text, language);
  }

  root
    .querySelectorAll("[placeholder], [aria-label], [title]")
    .forEach((element) => {
      translateElementAttributes(element, language);
    });
}

function JobSeekerDomTranslator({ language }: { language: JobSeekerLanguage }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!isJobSeekerPath(pathname)) return;

    const run = () => translateDom(language);

    run();

    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(run);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["placeholder", "aria-label", "title"],
    });

    return () => observer.disconnect();
  }, [language, pathname]);

  return null;
}

export function JobSeekerLanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] = useState<JobSeekerLanguage>(
    DEFAULT_JOBSEEKER_LANGUAGE
  );

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(
      JOBSEEKER_LANGUAGE_STORAGE_KEY
    );

    if (isJobSeekerLanguage(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (nextLanguage: JobSeekerLanguage) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(JOBSEEKER_LANGUAGE_STORAGE_KEY, nextLanguage);
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: string) => translateJobSeekerText(language, key),
    }),
    [language]
  );

  return (
    <JobSeekerLanguageContext.Provider value={value}>
      {children}
      <JobSeekerDomTranslator language={language} />
    </JobSeekerLanguageContext.Provider>
  );
}

export function useJobSeekerLanguage() {
  const context = useContext(JobSeekerLanguageContext);

  if (!context) {
    throw new Error(
      "useJobSeekerLanguage must be used inside JobSeekerLanguageProvider"
    );
  }

  return context;
}
