import { getMediaHireJob, type MediaHireJob } from "../jobs-data";
import {
  defaultJobSeekerProfile,
  getActiveJobSeekerEmail,
  getStoredJobSeekerProfile,
  jobSeekerProfileStorageKey,
  saveJobSeekerProfile,
  setActiveJobSeekerEmail,
  type JobSeekerProfile,
} from "../account-settings/profile-store";

export type ApplicationStatus =
  | "Applied"
  | "Under Review"
  | "Interviewed"
  | "Accepted"
  | "Rejected";

export type JobApplicationRecord = {
  appliedAt: string;
  id: string;
  jobId: string;
  status: ApplicationStatus;
  updatedAt: string;
};

export type ResumeData = {
  about: string;
  benefits: string;
  education: string;
  experience: string;
  jobPreferences: string;
  languages: string;
  links: string;
  pdfName: string;
  pdfUrl: string;
  skills: string;
};

export type JobSeekerSettings = {
  applicationUpdates: boolean;
  googleIntegration: boolean;
  jobAlerts: boolean;
  language: string;
  messages: boolean;
  password: string;
  profileVisibility: boolean;
  publicPortfolio: boolean;
  theme: string;
};

export const resumeStorageKey = "mediahire-resume";
export const savedJobsStorageKey = "mediahire-saved-jobs";
export const applicationsStorageKey = "mediahire-applications";
export const settingsStorageKey = "mediahire-settings";

export const defaultResumeData: ResumeData = {
  about: "",
  benefits: "",
  education: "",
  experience: "",
  jobPreferences: "",
  languages: "",
  links: "",
  pdfName: "",
  pdfUrl: "",
  skills: "",
};

export const defaultJobSeekerSettings: JobSeekerSettings = {
  applicationUpdates: true,
  googleIntegration: false,
  jobAlerts: true,
  language: "English",
  messages: true,
  password: "",
  profileVisibility: false,
  publicPortfolio: true,
  theme: "Light",
};

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? ({ ...fallback, ...JSON.parse(raw) } as T) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeAccountEmail(email?: string | null) {
  return (email || "").trim().toLowerCase();
}

function scopedStorageKey(key: string, email?: string | null) {
  const normalizedEmail = normalizeAccountEmail(email || getActiveJobSeekerEmail());

  return normalizedEmail ? `${key}:${normalizedEmail}` : key;
}

function writeJson<T>(key: string, value: T, eventName: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(eventName, { detail: value }));
}

function writeScopedJson<T>(
  key: string,
  value: T,
  eventName: string,
  email?: string | null,
) {
  if (typeof window === "undefined") {
    return;
  }

  const normalizedEmail = normalizeAccountEmail(email || getActiveJobSeekerEmail());

  if (normalizedEmail) {
    setActiveJobSeekerEmail(normalizedEmail);
  }

  window.localStorage.setItem(
    scopedStorageKey(key, normalizedEmail),
    JSON.stringify(value),
  );
  window.dispatchEvent(new CustomEvent(eventName, { detail: value }));
}

export function getCurrentUserProfile() {
  return getStoredJobSeekerProfile();
}

export function updateCurrentUserProfile(profile: JobSeekerProfile) {
  saveJobSeekerProfile(profile);
  writeJson(jobSeekerProfileStorageKey, profile, "mediahire:user-state-updated");
}

export function getResumeData() {
  const activeEmail = getActiveJobSeekerEmail();

  if (activeEmail) {
    return readJson<ResumeData>(
      scopedStorageKey(resumeStorageKey, activeEmail),
      defaultResumeData,
    );
  }

  return readJson<ResumeData>(resumeStorageKey, defaultResumeData);
}

export function getResumeDataForEmail(email: string) {
  const normalizedEmail = normalizeAccountEmail(email);

  if (!normalizedEmail) {
    return getResumeData();
  }

  return readJson<ResumeData>(
    scopedStorageKey(resumeStorageKey, normalizedEmail),
    defaultResumeData,
  );
}

export function updateResumeData(resume: ResumeData) {
  writeScopedJson(resumeStorageKey, resume, "mediahire:resume-updated");
  const profile = getStoredJobSeekerProfile();
  updateCurrentUserProfile({
    ...profile,
    bio: resume.about || profile.bio,
    resumeUrl: resume.pdfUrl || profile.resumeUrl,
    skills: resume.skills || profile.skills,
  });
}

export function updateResumeDataForEmail(email: string, resume: ResumeData) {
  writeScopedJson(resumeStorageKey, resume, "mediahire:resume-updated", email);
  const profile = getStoredJobSeekerProfile();
  updateCurrentUserProfile({
    ...profile,
    bio: resume.about || profile.bio,
    resumeUrl: resume.pdfUrl || profile.resumeUrl,
    skills: resume.skills || profile.skills,
  });
}

export function getSavedJobIds() {
  if (typeof window === "undefined") {
    return [] as string[];
  }

  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(savedJobsStorageKey) || "[]",
    ) as string[];
    const validIds = parsed.filter((jobId) => Boolean(getMediaHireJob(jobId)));

    if (validIds.length !== parsed.length) {
      window.localStorage.setItem(savedJobsStorageKey, JSON.stringify(validIds));
    }

    return validIds;
  } catch {
    return [];
  }
}

export function getSavedJobs() {
  return getSavedJobIds()
    .map((jobId) => getMediaHireJob(jobId))
    .filter(Boolean) as MediaHireJob[];
}

export function isJobSaved(jobId: string) {
  return getSavedJobIds().includes(jobId);
}

export function saveJob(jobId: string) {
  if (!getMediaHireJob(jobId)) {
    return getSavedJobIds();
  }

  const nextIds = Array.from(new Set([jobId, ...getSavedJobIds()]));
  writeJson(savedJobsStorageKey, nextIds, "mediahire:saved-jobs-updated");
  return nextIds;
}

export function unsaveJob(jobId: string) {
  const nextIds = getSavedJobIds().filter((id) => id !== jobId);
  writeJson(savedJobsStorageKey, nextIds, "mediahire:saved-jobs-updated");
  return nextIds;
}

export function toggleSavedJob(jobId: string) {
  return isJobSaved(jobId) ? unsaveJob(jobId) : saveJob(jobId);
}

export function getApplications() {
  if (typeof window === "undefined") {
    return [] as JobApplicationRecord[];
  }

  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(applicationsStorageKey) || "[]",
    ) as JobApplicationRecord[];
    const validApplications = parsed.filter((application) =>
      Boolean(getMediaHireJob(application.jobId)),
    );

    if (validApplications.length !== parsed.length) {
      window.localStorage.setItem(
        applicationsStorageKey,
        JSON.stringify(validApplications),
      );
    }

    return validApplications;
  } catch {
    return [];
  }
}

export function getApplicationForJob(jobId: string) {
  return getApplications().find((application) => application.jobId === jobId);
}

export function applyJob(jobId: string, status: ApplicationStatus = "Applied") {
  if (!getMediaHireJob(jobId)) {
    return getApplications();
  }

  const currentApplications = getApplications();
  const existing = currentApplications.find(
    (application) => application.jobId === jobId,
  );

  if (existing) {
    return currentApplications;
  }

  const now = new Date().toISOString();
  const nextApplications = [
    {
      appliedAt: now,
      id: `${jobId}-${Date.now().toString(36)}`,
      jobId,
      status,
      updatedAt: now,
    },
    ...currentApplications,
  ];
  writeJson(
    applicationsStorageKey,
    nextApplications,
    "mediahire:applications-updated",
  );
  return nextApplications;
}

export function getSettings() {
  const activeEmail = getActiveJobSeekerEmail();

  if (activeEmail) {
    return readJson<JobSeekerSettings>(
      scopedStorageKey(settingsStorageKey, activeEmail),
      defaultJobSeekerSettings,
    );
  }

  return readJson<JobSeekerSettings>(
    settingsStorageKey,
    defaultJobSeekerSettings,
  );
}

export function updateSettings(settings: JobSeekerSettings) {
  writeScopedJson(settingsStorageKey, settings, "mediahire:settings-updated");

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("mediahire:projects-updated", {
        detail: { reason: "settings-updated" },
      }),
    );
  }
}

export function getVisibleProfile() {
  const settings = getSettings();

  return {
    profile: getStoredJobSeekerProfile(),
    resume: getResumeData(),
    settings,
  };
}

export { defaultJobSeekerProfile };
