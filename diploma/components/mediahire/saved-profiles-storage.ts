"use client";

export const SAVED_PROFILES_STORAGE_KEY = "mediahire:saved-profile-ids";
export const SAVED_PROFILES_CHANGED_EVENT = "mediahire:saved-profiles-changed";

export function getSavedProfileIds(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(SAVED_PROFILES_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return [];
  }
}

export function isProfileSaved(profileId: string): boolean {
  return getSavedProfileIds().includes(profileId);
}

export function saveProfile(profileId: string) {
  if (typeof window === "undefined") {
    return;
  }

  const current = getSavedProfileIds();

  if (!current.includes(profileId)) {
    window.localStorage.setItem(
      SAVED_PROFILES_STORAGE_KEY,
      JSON.stringify([...current, profileId])
    );
  }

  window.dispatchEvent(new Event(SAVED_PROFILES_CHANGED_EVENT));
}

export function removeSavedProfile(profileId: string) {
  if (typeof window === "undefined") {
    return;
  }

  const current = getSavedProfileIds();

  window.localStorage.setItem(
    SAVED_PROFILES_STORAGE_KEY,
    JSON.stringify(current.filter((id) => id !== profileId))
  );

  window.dispatchEvent(new Event(SAVED_PROFILES_CHANGED_EVENT));
}

export function toggleSavedProfile(profileId: string): boolean {
  const saved = isProfileSaved(profileId);

  if (saved) {
    removeSavedProfile(profileId);
    return false;
  }

  saveProfile(profileId);
  return true;
}
