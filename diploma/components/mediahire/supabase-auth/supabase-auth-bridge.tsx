"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  loginWithEmail,
  signInWithGoogle,
  signUpWithEmail,
  type MediaHireRole,
} from "./auth-service";

type AuthMode = "login" | "signup";

function inputValue(patterns: string[], index = 0) {
  const inputs = Array.from(
    document.querySelectorAll<HTMLInputElement>("input"),
  ).filter((input) => {
    const haystack = [
      input.name,
      input.id,
      input.type,
      input.placeholder,
      input.getAttribute("aria-label"),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return patterns.some((pattern) => haystack.includes(pattern));
  });

  return inputs[index]?.value.trim() || "";
}

function passwordValue(index = 0) {
  const passwordInputs = Array.from(
    document.querySelectorAll<HTMLInputElement>('input[type="password"]'),
  );

  return passwordInputs[index]?.value || "";
}

function splitFullName(fullName: string) {
  const [firstName = "", ...rest] = fullName.trim().split(/\s+/);

  return {
    firstName,
    lastName: rest.join(" "),
  };
}

function getFormValues(role: MediaHireRole) {
  const email = inputValue(["email"]);
  const password = passwordValue(0);
  const directFirstName = inputValue(["first"]);
  const directLastName = inputValue(["last"]);
  const fullNameInput = inputValue(["full name", "name"]);
  const fallbackName = splitFullName(fullNameInput);

  return {
    email,
    firstName: directFirstName || fallbackName.firstName,
    lastName: directLastName || fallbackName.lastName,
    password,
    role,
  };
}

function isGoogleControl(element: HTMLElement | null) {
  return Boolean(element?.textContent?.toLowerCase().includes("google"));
}

function isPrimaryAuthSubmit(element: HTMLElement | null, mode: AuthMode) {
  const label = element?.textContent?.trim().toLowerCase() || "";

  if (isGoogleControl(element)) {
    return false;
  }

  return mode === "signup"
    ? label === "sign up" || label === "signup"
    : label === "log in" || label === "login";
}

function nextOnboardingPath(role: MediaHireRole) {
  return role === "jobseeker"
    ? "/signup/jobseeker/location"
    : "/signup/employer/company-details";
}

export function SupabaseAuthBridge({
  children,
  mode,
  role,
}: {
  children: React.ReactNode;
  mode: AuthMode;
  role: MediaHireRole;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname.includes("google-details")) {
      return;
    }

    let isSubmitting = false;

    async function handleGoogle(event: Event, control: HTMLElement) {
      event.preventDefault();

      if (isSubmitting) {
        return;
      }

      isSubmitting = true;
      control.setAttribute("aria-busy", "true");

      try {
        await signInWithGoogle(role, mode);
      } catch (error) {
        window.alert(error instanceof Error ? error.message : "Google OAuth failed");
        isSubmitting = false;
        control.removeAttribute("aria-busy");
      }
    }

    async function handleEmailAuth(event: Event, control?: HTMLElement | null) {
      event.preventDefault();

      if (isSubmitting) {
        return;
      }

      const values = getFormValues(role);

      if (!values.email || !values.password) {
        window.alert("Please enter email and password.");
        return;
      }

      isSubmitting = true;
      control?.setAttribute("aria-busy", "true");

      try {
        if (mode === "signup") {
          await signUpWithEmail(values);
          window.sessionStorage.setItem(
            "mediahire.pendingEmailSignup",
            JSON.stringify({
              email: values.email,
              password: values.password,
              role,
            }),
          );
          window.location.href = nextOnboardingPath(role);
          return;
        }

        await loginWithEmail(values);
        router.push(role === "jobseeker" ? "/home/jobseeker" : "/account/employer");
      } catch (error) {
        if (mode === "login") {
          window.alert("Incorrect email or password");
          return;
        }

        window.alert(error instanceof Error ? error.message : "Authentication failed");
      } finally {
        isSubmitting = false;
        control?.removeAttribute("aria-busy");
      }
    }

    function handleClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const control = target.closest<HTMLElement>("button, a");

      if (control && isGoogleControl(control)) {
        void handleGoogle(event, control);
        return;
      }

      if (isPrimaryAuthSubmit(control, mode)) {
        void handleEmailAuth(event, control);
      }
    }

    function handleSubmit(event: SubmitEvent) {
      void handleEmailAuth(event, event.submitter as HTMLElement | null);
    }

    document.addEventListener("click", handleClick, true);
    document.addEventListener("submit", handleSubmit, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("submit", handleSubmit, true);
    };
  }, [mode, pathname, role, router]);

  return <>{children}</>;
}
