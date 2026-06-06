"use client";

export const SAVED_PROJECTS_STORAGE_KEY = "mediahire_jobseeker_saved_projects";
export const SAVED_PROJECTS_CHANGED_EVENT = "mediahire:saved-projects-changed";

export function getSavedProjectIds(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(SAVED_PROJECTS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return [];
  }
}

export function isProjectSaved(projectId: string): boolean {
  return getSavedProjectIds().includes(projectId);
}

export function saveProject(projectId: string) {
  if (typeof window === "undefined") {
    return;
  }

  const current = getSavedProjectIds();

  if (!current.includes(projectId)) {
    window.localStorage.setItem(
      SAVED_PROJECTS_STORAGE_KEY,
      JSON.stringify([...current, projectId]),
    );
  }

  window.dispatchEvent(new Event(SAVED_PROJECTS_CHANGED_EVENT));
}

export function removeSavedProject(projectId: string) {
  if (typeof window === "undefined") {
    return;
  }

  const current = getSavedProjectIds();

  window.localStorage.setItem(
    SAVED_PROJECTS_STORAGE_KEY,
    JSON.stringify(current.filter((id) => id !== projectId)),
  );

  window.dispatchEvent(new Event(SAVED_PROJECTS_CHANGED_EVENT));
}

export function toggleSavedProject(projectId: string): boolean {
  const saved = isProjectSaved(projectId);

  if (saved) {
    removeSavedProject(projectId);
    return false;
  }

  saveProject(projectId);
  return true;
}
