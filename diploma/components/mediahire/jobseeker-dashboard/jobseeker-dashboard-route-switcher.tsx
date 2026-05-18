"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { getStoredJobSeekerProfile } from "../account-settings/profile-store";

const accountAccessKey = "mediahire.jobseeker.accountAccess";

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
        router.replace("/");
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
    if (pathname !== "/profile/jobseeker") {
      return;
    }

    function hydratePublicProfile() {
      const profile = getStoredJobSeekerProfile();
      const replacements = new Map([
        ["Dana Muhtarova", profile.fullName],
        ["Motion & Designer", profile.role],
        ["Graphic Designer", profile.role],
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

      if (profile.avatarPreview) {
        document.querySelectorAll("img").forEach((image) => {
          const alt = image.getAttribute("alt") || "";

          if (alt.includes("Dana") || alt.includes("Muhtarova")) {
            image.setAttribute("src", profile.avatarPreview);
            image.setAttribute("srcset", "");
          }
        });
      }
    }

    hydratePublicProfile();

    window.addEventListener("mediahire:jobseeker-profile-updated", hydratePublicProfile);

    return () => {
      window.removeEventListener(
        "mediahire:jobseeker-profile-updated",
        hydratePublicProfile,
      );
    };
  }, [pathname]);

  if (pathname === "/dashboard/jobseeker") {
    return null;
  }

  return <>{children}</>;
}
