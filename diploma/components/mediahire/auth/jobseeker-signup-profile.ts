"use client";

import {
  getStoredJobSeekerProfile,
  saveJobSeekerProfile,
  setActiveJobSeekerEmail,
  type JobSeekerProfile,
} from "../account-settings/profile-store";
import { getResumeData, updateResumeData } from "../shared/user-state";

type JobSeekerSignupProfile = Partial<
  Pick<
    JobSeekerProfile,
    | "avatarPreview"
    | "city"
    | "email"
    | "firstName"
    | "lastName"
    | "location"
    | "minimumSalary"
    | "minimumSalaryCurrency"
    | "paymentPeriod"
    | "postalCode"
    | "resumeUrl"
  >
> & {
  pdfName?: string;
  pdfUrl?: string;
};

const signupProfileStorageKey = "mediahire.jobseeker.signupProfile";

function cleanText(value: string | undefined) {
  return typeof value === "string" ? value.trim() : undefined;
}

function getFullName(firstName: string, lastName: string) {
  return [firstName, lastName].filter(Boolean).join(" ");
}

export function getStoredJobSeekerSignupProfile(): JobSeekerSignupProfile {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    return JSON.parse(
      window.localStorage.getItem(signupProfileStorageKey) || "{}",
    ) as JobSeekerSignupProfile;
  } catch {
    return {};
  }
}

export function updateJobSeekerSignupProfile(
  update: JobSeekerSignupProfile,
) {
  if (typeof window === "undefined") {
    return;
  }

  const currentDraft = getStoredJobSeekerSignupProfile();
  const nextEmail = cleanText(update.email)?.toLowerCase();
  const currentEmail = cleanText(currentDraft.email)?.toLowerCase();
  const baseDraft =
    nextEmail && currentEmail && nextEmail !== currentEmail ? {} : currentDraft;
  const nextDraft = {
    ...baseDraft,
    ...Object.fromEntries(
      Object.entries(update).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ]),
    ),
  } as JobSeekerSignupProfile;

  window.localStorage.setItem(
    signupProfileStorageKey,
    JSON.stringify(nextDraft),
  );

  if (nextDraft.email) {
    setActiveJobSeekerEmail(nextDraft.email);
  }

  const currentProfile = getStoredJobSeekerProfile();
  const firstName = cleanText(nextDraft.firstName) ?? currentProfile.firstName;
  const lastName = cleanText(nextDraft.lastName) ?? currentProfile.lastName;
  const email = cleanText(nextDraft.email) ?? currentProfile.email;
  const location = cleanText(nextDraft.location) ?? currentProfile.location;
  const city = (cleanText(nextDraft.city) ?? location) || currentProfile.city;
  const postalCode =
    cleanText(nextDraft.postalCode) ?? currentProfile.postalCode;
  const minimumSalary =
    cleanText(nextDraft.minimumSalary) ?? currentProfile.minimumSalary;
  const minimumSalaryCurrency =
    cleanText(nextDraft.minimumSalaryCurrency) ??
    currentProfile.minimumSalaryCurrency;
  const paymentPeriod =
    cleanText(nextDraft.paymentPeriod) ?? currentProfile.paymentPeriod;
  const resumeUrl = cleanText(nextDraft.resumeUrl) ?? currentProfile.resumeUrl;
  const avatarPreview =
    cleanText(nextDraft.avatarPreview) ?? currentProfile.avatarPreview;

  saveJobSeekerProfile({
    ...currentProfile,
    avatarPreview,
    city,
    email,
    expectedSalary: minimumSalary || currentProfile.expectedSalary,
    firstName,
    fullName: getFullName(firstName, lastName),
    lastName,
    location,
    minimumSalary,
    minimumSalaryCurrency,
    paymentPeriod,
    postalCode,
    preferredLocation: location || currentProfile.preferredLocation,
    preferredPostalCode: postalCode || currentProfile.preferredPostalCode,
    resumeUrl,
  });

  if ("pdfName" in update || "pdfUrl" in update) {
    updateResumeData({
      ...getResumeData(),
      pdfName: cleanText(nextDraft.pdfName) ?? "",
      pdfUrl: cleanText(nextDraft.pdfUrl) ?? "",
    });
  }
}
