export type JobSeekerProfile = {
  avatarPreview: string;
  city: string;
  email: string;
  firstName: string;
  fullName: string;
  gender: string;
  lastName: string;
  location: string;
  minimumSalary: string;
  mobile: string;
  paymentPeriod: string;
  postalCode: string;
  preferredLocation: string;
  preferredPostalCode: string;
  role: string;
  yearOfBirth: string;
};

export const jobSeekerProfileStorageKey = "mediahire.jobseeker.profile";

export const defaultJobSeekerProfile: JobSeekerProfile = {
  avatarPreview: "",
  city: "Astana",
  email: "danamuhtarova@gmail.com",
  firstName: "Dana",
  fullName: "Dana Muhtarova",
  gender: "Female",
  lastName: "Muhtarova",
  location: "Astana, Kazakhstan",
  minimumSalary: "",
  mobile: "+7 707 418 2857",
  paymentPeriod: "",
  postalCode: "",
  preferredLocation: "",
  preferredPostalCode: "",
  role: "Graphic Designer",
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
