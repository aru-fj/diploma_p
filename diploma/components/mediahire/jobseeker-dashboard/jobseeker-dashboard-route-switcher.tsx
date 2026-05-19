"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import {
  getStoredJobSeekerProfile,
  jobSeekerProfileStorageKey,
} from "../account-settings/profile-store";
import { supabase } from "@/lib/supabase-client";

const accountAccessKey = "mediahire.jobseeker.accountAccess";

type ProfileRow = {
  avatar_url?: string | null;
  bio?: string | null;
  city?: string | null;
  country?: string | null;
  email?: string | null;
  expected_salary?: number | string | null;
  first_name?: string | null;
  full_name?: string | null;
  job_title?: string | null;
  last_name?: string | null;
  location?: string | null;
  minimum_salary?: number | string | null;
  payment_period?: string | null;
  postal_code?: string | null;
  resume_url?: string | null;
  skills?: string | null;
};

function profileFullName(profile: ProfileRow) {
  return (
    profile.full_name ||
    [profile.first_name, profile.last_name].filter(Boolean).join(" ") ||
    ""
  );
}

function profileLocation(profile: ProfileRow) {
  return (
    profile.location ||
    [profile.city, profile.country].filter(Boolean).join(", ") ||
    ""
  );
}

export function JobSeekerDashboardRouteSwitcher({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function replaceTextNode(node: Node) {
      node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          child.textContent = child.textContent?.replace("My Profile", "Account") ?? "";
          return;
        }

        replaceTextNode(child);
      });
    }

    function renameDropdownProfileItem() {
      const controls = document.querySelectorAll("a, button");

      controls.forEach((control) => {
        if (control.textContent?.trim() === "My Profile") {
          const isMainNav = Boolean(control.getAttribute("href"));

          if (!isMainNav) {
            replaceTextNode(control);
          }
        }
      });
    }

    renameDropdownProfileItem();

    const observer = new MutationObserver(renameDropdownProfileItem);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleDropdownProfileClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const control = target.closest("a, button");
      const label = control?.textContent?.trim();

      if (label === "Home") {
        event.preventDefault();
        router.push("/home/jobseeker");
      }

      if (label === "Search Job") {
        event.preventDefault();
        router.push("/search-job");
      }

      if (label === "Community") {
        event.preventDefault();
        router.push("/community");
      }

      if (label === "Dashboard") {
        event.preventDefault();
        router.push("/account/jobseeker");
      }

      if (label === "My Resume") {
        event.preventDefault();
        router.push("/account/jobseeker/resume");
      }

      if (label === "My Profile") {
        event.preventDefault();
        if (!control?.getAttribute("href")) {
          window.sessionStorage.setItem(accountAccessKey, "true");
          router.push("/account/jobseeker");
          return;
        }

        router.push("/profile/jobseeker");
      }

      if (label === "Account") {
        event.preventDefault();
        window.sessionStorage.setItem(accountAccessKey, "true");
        router.push("/account/jobseeker");
      }

      if (label === "Settings") {
        event.preventDefault();
        router.push("/settings/jobseeker");
      }

      if (label === "Account Setting") {
        event.preventDefault();
        router.push("/account/jobseeker/settings");
      }

      if (label === "Logout" || label === "Log out") {
        event.preventDefault();
        window.sessionStorage.removeItem(accountAccessKey);
        void supabase.auth.signOut().finally(() => {
          router.replace("/");
        });
      }
    }

    document.addEventListener("click", handleDropdownProfileClick);

    return () => {
      document.removeEventListener("click", handleDropdownProfileClick);
    };
  }, [router]);

  useEffect(() => {
    if (pathname !== "/dashboard/jobseeker") {
      return;
    }

    const isDashboardRequestedFromMenu =
      window.sessionStorage.getItem(accountAccessKey) === "true";

    if (isDashboardRequestedFromMenu) {
      router.replace("/account/jobseeker");
      return;
    }

    router.replace("/home/jobseeker");
  }, [pathname, router]);

  useEffect(() => {
    const shouldHydrate =
      pathname.startsWith("/home/jobseeker") ||
      pathname.startsWith("/search-job") ||
      pathname.startsWith("/community") ||
      pathname.startsWith("/profile/jobseeker") ||
      pathname.startsWith("/account/jobseeker") ||
      pathname.startsWith("/dashboard/jobseeker");

    if (!shouldHydrate) {
      return;
    }

    async function getProfileForHydration() {
      const fallbackProfile = getStoredJobSeekerProfile();
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        return fallbackProfile;
      }

      const { data } = await supabase
        .from("profiles")
        .select(
          "avatar_url,bio,city,country,email,expected_salary,first_name,full_name,job_title,last_name,location,payment_period,postal_code,minimum_salary,resume_url,skills",
        )
        .eq("user_id", userData.user.id)
        .maybeSingle();

      const profile = data as ProfileRow | null;
      const authEmail = userData.user.email || "";

      if (!profile) {
        return {
          ...fallbackProfile,
          email: authEmail || fallbackProfile.email,
        };
      }

      return {
        ...fallbackProfile,
        avatarPreview: profile.avatar_url || fallbackProfile.avatarPreview,
        bio: profile.bio || fallbackProfile.bio,
        city: profile.city || fallbackProfile.city,
        country: profile.country || fallbackProfile.country,
        email: profile.email || authEmail || fallbackProfile.email,
        expectedSalary:
          profile.expected_salary?.toString() ||
          profile.minimum_salary?.toString() ||
          fallbackProfile.expectedSalary,
        firstName: profile.first_name || fallbackProfile.firstName,
        fullName: profileFullName(profile) || fallbackProfile.fullName,
        jobTitle: profile.job_title || fallbackProfile.jobTitle,
        lastName: profile.last_name || fallbackProfile.lastName,
        location: profileLocation(profile) || fallbackProfile.location,
        minimumSalary:
          profile.minimum_salary?.toString() || fallbackProfile.minimumSalary,
        paymentPeriod: profile.payment_period || fallbackProfile.paymentPeriod,
        postalCode: profile.postal_code || fallbackProfile.postalCode,
        resumeUrl: profile.resume_url || fallbackProfile.resumeUrl,
        role: profile.job_title || fallbackProfile.role,
        skills: profile.skills || fallbackProfile.skills,
      };
    }

    async function hydratePublicProfile() {
      const profile = await getProfileForHydration();
      try {
        window.localStorage.setItem(
          jobSeekerProfileStorageKey,
          JSON.stringify(profile),
        );
        window.dispatchEvent(
          new CustomEvent("mediahire:jobseeker-profile-updated", {
            detail: { ...profile, source: "supabase-hydration" },
          }),
        );
      } catch {
        // Local storage can be unavailable in private browser contexts.
      }

      const replacements = new Map([
        ["Dana Muhtarova", profile.fullName],
        ["Motion & Designer", profile.role],
        ["Astana, Kazakhstan", profile.location],
        ["dana.muhtarova@gmail.com", profile.email],
        ["danamuhtarova@gmail.com", profile.email],
        ["+7 707 418 2857", profile.mobile],
      ]);

      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();

      while (node) {
        const text = node.textContent?.trim();

        if (text && replacements.has(text)) {
          node.textContent = replacements.get(text) ?? text;
        }

        node = walker.nextNode();
      }

      document.querySelectorAll("input").forEach((input) => {
        const placeholder = input.getAttribute("placeholder")?.toLowerCase() || "";
        const label = input.getAttribute("aria-label")?.toLowerCase() || "";
        const name = input.getAttribute("name")?.toLowerCase() || "";
        const haystack = `${placeholder} ${label} ${name}`;

        if (!input.value && haystack.includes("first")) {
          input.value = profile.firstName;
        }

        if (!input.value && haystack.includes("last")) {
          input.value = profile.lastName;
        }

        if (!input.value && haystack.includes("email")) {
          input.value = profile.email;
        }

        if (!input.value && haystack.includes("location")) {
          input.value = profile.location;
        }

        if (!input.value && haystack.includes("postal")) {
          input.value = profile.postalCode;
        }

        if (!input.value && haystack.includes("salary")) {
          input.value = profile.expectedSalary || profile.minimumSalary;
        }
      });

      if (profile.avatarPreview) {
        document.querySelectorAll("img").forEach((image) => {
          const alt = image.getAttribute("alt") || "";

          if (
            alt.includes("Dana") ||
            alt.includes("Muhtarova") ||
            alt.toLowerCase().includes("avatar") ||
            alt.toLowerCase().includes("profile")
          ) {
            image.setAttribute("src", profile.avatarPreview);
            image.setAttribute("srcset", "");
          }
        });
      }
    }

    function handleProfileUpdate(event: Event) {
      const detail = (event as CustomEvent<{ source?: string }>).detail;

      if (detail?.source === "supabase-hydration") {
        return;
      }

      void hydratePublicProfile();
    }

    void hydratePublicProfile();

    window.addEventListener("mediahire:jobseeker-profile-updated", handleProfileUpdate);

    return () => {
      window.removeEventListener(
        "mediahire:jobseeker-profile-updated",
        handleProfileUpdate,
      );
    };
  }, [pathname]);

  if (pathname === "/dashboard/jobseeker") {
    return null;
  }

  return <>{children}</>;
}
