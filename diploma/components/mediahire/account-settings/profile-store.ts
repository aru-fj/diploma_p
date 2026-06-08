export type JobSeekerProfile = {
  avatarPreview: string;
  bio: string;
  coverUrl: string;
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
    return removeUnsafeProfileData(
      normalizeProfile(JSON.parse(storedProfile) as Partial<JobSeekerProfile>),
    );
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
  coverUrl: "",
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

function removeUnsafeProfileData(profile: JobSeekerProfile): JobSeekerProfile {
  return {
    ...profile,
    avatarPreview: profile.avatarPreview?.startsWith("data:")
      ? ""
      : profile.avatarPreview,
  };
}

function safeSetLocalStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    console.warn("Could not save profile to localStorage. Cleaning old profile cache.", error);

    Object.keys(window.localStorage)
      .filter((itemKey) =>
        itemKey.startsWith(jobSeekerProfileStorageKey) ||
        itemKey.toLowerCase().includes("profile") ||
        itemKey.toLowerCase().includes("resume"),
      )
      .forEach((itemKey) => window.localStorage.removeItem(itemKey));

    window.localStorage.setItem(key, value);
  }
}

export function saveJobSeekerProfile(
  profile: JobSeekerProfile,
  eventDetail?: Record<string, unknown>,
) {
  if (typeof window === "undefined") {
    return;
  }

  const normalizedProfile = removeUnsafeProfileData(normalizeProfile(profile));
  const email = normalizeProfileEmail(normalizedProfile.email);
  const serializedProfile = JSON.stringify(normalizedProfile);

  if (email) {
    setActiveJobSeekerEmail(email);
    safeSetLocalStorage(
      getScopedJobSeekerProfileStorageKey(email),
      serializedProfile,
    );
  }

  safeSetLocalStorage(jobSeekerProfileStorageKey, serializedProfile);

  window.dispatchEvent(
    new CustomEvent("mediahire:jobseeker-profile-updated", {
      detail: { ...normalizedProfile, ...eventDetail },
    }),
  );
}