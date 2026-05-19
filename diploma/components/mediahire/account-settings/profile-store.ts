export type JobSeekerProfile = {
  avatarPreview: string;
  bio: string;
  city: string;
  country: string;
  email: string;
  expectedSalary: string;
  firstName: string;
  fullName: string;
  gender: string;
  jobTitle: string;
  lastName: string;
  location: string;
  minimumSalary: string;
  mobile: string;
  paymentPeriod: string;
  postalCode: string;
  preferredLocation: string;
  preferredPostalCode: string;
  resumeUrl: string;
  role: string;
  skills: string;
  yearOfBirth: string;
};

export const jobSeekerProfileStorageKey = "mediahire.jobseeker.profile";

export const defaultJobSeekerProfile: JobSeekerProfile = {
  avatarPreview: "",
  bio: "",
  city: "Astana",
  country: "Kazakhstan",
  email: "No email added",
  expectedSalary: "",
  firstName: "Job",
  fullName: "Job Seeker",
  gender: "Female",
  jobTitle: "Creative Specialist",
  lastName: "Seeker",
  location: "Astana, Kazakhstan",
  minimumSalary: "",
  mobile: "No phone added",
  paymentPeriod: "",
  postalCode: "",
  preferredLocation: "",
  preferredPostalCode: "",
  resumeUrl: "",
  role: "Creative Specialist",
  skills: "",
  yearOfBirth: "2005",
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
