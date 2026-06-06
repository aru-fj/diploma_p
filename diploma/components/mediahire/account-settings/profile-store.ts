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
  resumeUrl: string;
  role: string;
  skills: string;
  software: string;
  yearOfBirth: string;
};

export const jobSeekerProfileStorageKey = "mediahire.jobseeker.profile";

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

  const storedProfile = window.localStorage.getItem(jobSeekerProfileStorageKey);

  if (!storedProfile) {
    return defaultJobSeekerProfile;
  }

  try {
    const parsedProfile = JSON.parse(storedProfile) as Partial<JobSeekerProfile>;

    return {
      ...defaultJobSeekerProfile,
      ...parsedProfile,
      fullName:
        parsedProfile.fullName ||
        `${parsedProfile.firstName || defaultJobSeekerProfile.firstName} ${
          parsedProfile.lastName || defaultJobSeekerProfile.lastName
        }`,
    };
  } catch {
    return defaultJobSeekerProfile;
  }
}

export function saveJobSeekerProfile(profile: JobSeekerProfile) {
  window.localStorage.setItem(jobSeekerProfileStorageKey, JSON.stringify(profile));
  window.dispatchEvent(
    new CustomEvent("mediahire:jobseeker-profile-updated", {
      detail: profile,
    }),
  );
}
