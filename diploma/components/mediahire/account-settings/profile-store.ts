export type JobSeekerProfile = {
  avatarPreview: string;
  bio: string;
  city: string;
  country: string;
  email: string;
  experienceYears: string;
  expectedSalary: string;
  firstName: string;
  fullName: string;
  gender: string;
  jobTitle: string;
  lastName: string;
  location: string;
  minimumSalary: string;
  minimumSalaryCurrency: string;
  mobile: string;
  paymentPeriod: string;
  postalCode: string;
  preferredLocation: string;
  preferredPostalCode: string;
  preferredWorkType: string;
  resumeUrl: string;
  role: string;
  skills: string;
  software: string;
  yearOfBirth: string;
};

export const jobSeekerProfileStorageKey = "mediahire.jobseeker.profile";
export const activeJobSeekerEmailStorageKey =
  "mediahire.jobseeker.activeEmail";

function normalizeProfileEmail(email?: string | null) {
  return (email || "").trim().toLowerCase();
}

export function getScopedJobSeekerProfileStorageKey(email: string) {
  return `${jobSeekerProfileStorageKey}:${normalizeProfileEmail(email)}`;
}

export function getActiveJobSeekerEmail() {
  if (typeof window === "undefined") {
    return "";
  }

  return normalizeProfileEmail(
    window.localStorage.getItem(activeJobSeekerEmailStorageKey),
  );
}

export function setActiveJobSeekerEmail(email?: string | null) {
  if (typeof window === "undefined") {
    return;
  }

  const normalizedEmail = normalizeProfileEmail(email);

  if (normalizedEmail) {
    window.localStorage.setItem(activeJobSeekerEmailStorageKey, normalizedEmail);
  }
}

function normalizeProfile(profile: Partial<JobSeekerProfile>): JobSeekerProfile {
  return {
    ...defaultJobSeekerProfile,
    ...profile,
    fullName:
      profile.fullName ||
      `${profile.firstName || defaultJobSeekerProfile.firstName} ${
        profile.lastName || defaultJobSeekerProfile.lastName
      }`.trim(),
  };
}

function readStoredProfileByKey(key: string) {
  if (typeof window === "undefined") {
    return defaultJobSeekerProfile;
  }

  const storedProfile = window.localStorage.getItem(key);

  if (!storedProfile) {
    return defaultJobSeekerProfile;
  }

  try {
    return normalizeProfile(JSON.parse(storedProfile) as Partial<JobSeekerProfile>);
  } catch {
    return defaultJobSeekerProfile;
  }
}

export function getStoredJobSeekerProfileForEmail(email: string) {
  if (typeof window === "undefined") {
    return defaultJobSeekerProfile;
  }

  const normalizedEmail = normalizeProfileEmail(email);

  if (!normalizedEmail) {
    return getStoredJobSeekerProfile();
  }

  const scopedProfile = readStoredProfileByKey(
    getScopedJobSeekerProfileStorageKey(normalizedEmail),
  );

  if (scopedProfile.email || scopedProfile.firstName || scopedProfile.fullName) {
    return {
      ...scopedProfile,
      email: scopedProfile.email || normalizedEmail,
    };
  }

  const legacyProfile = readStoredProfileByKey(jobSeekerProfileStorageKey);
  const legacyEmail = normalizeProfileEmail(legacyProfile.email);

  if (legacyEmail === normalizedEmail) {
    return legacyProfile;
  }

  return {
    ...defaultJobSeekerProfile,
    email: normalizedEmail,
  };
}

export const defaultJobSeekerProfile: JobSeekerProfile = {
  avatarPreview: "",
  bio: "",
  city: "",
  country: "",
  email: "",
  experienceYears: "",
  expectedSalary: "",
  firstName: "",
  fullName: "",
  gender: "",
  jobTitle: "",
  lastName: "",
  location: "",
  minimumSalary: "",
  minimumSalaryCurrency: "Dollar",
  mobile: "",
  paymentPeriod: "",
  postalCode: "",
  preferredLocation: "",
  preferredPostalCode: "",
  preferredWorkType: "",
  resumeUrl: "",
  role: "",
  skills: "",
  software: "",
  yearOfBirth: "",
};

export function getStoredJobSeekerProfile(): JobSeekerProfile {
  if (typeof window === "undefined") {
    return defaultJobSeekerProfile;
  }

  const activeEmail = getActiveJobSeekerEmail();

  if (activeEmail) {
    return getStoredJobSeekerProfileForEmail(activeEmail);
  }

  return readStoredProfileByKey(jobSeekerProfileStorageKey);
}

export function saveJobSeekerProfile(
  profile: JobSeekerProfile,
  eventDetail?: Record<string, unknown>,
) {
  const normalizedProfile = normalizeProfile(profile);
  const email = normalizeProfileEmail(normalizedProfile.email);

  if (email) {
    setActiveJobSeekerEmail(email);
    window.localStorage.setItem(
      getScopedJobSeekerProfileStorageKey(email),
      JSON.stringify(normalizedProfile),
    );
  }

  window.localStorage.setItem(
    jobSeekerProfileStorageKey,
    JSON.stringify(normalizedProfile),
  );
  window.dispatchEvent(
    new CustomEvent("mediahire:jobseeker-profile-updated", {
      detail: { ...normalizedProfile, ...eventDetail },
    }),
  );
}
