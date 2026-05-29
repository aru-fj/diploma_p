"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase-client";
import { upsertProfile } from "@/components/mediahire/supabase-auth/auth-service";
import { AuthImagePanel } from "./auth-image-panel";
import { AuthInput } from "./auth-input";
import { AuthLogo } from "./logo";
import { PasswordInput } from "./password-input";
import { PrimaryButton } from "./primary-button";
import { ProgressSteps } from "./progress-steps";
import { TestimonialCard } from "./testimonial-card";

type GoogleUser = {
  avatar: string | null;
  email: string;
  name: string | null;
};

type GoogleDetailsForm = {
  confirmPassword: string;
  firstName: string;
  lastName: string;
  password: string;
};

type GoogleDetailsErrors = Partial<Record<keyof GoogleDetailsForm, string>>;

function getNameParts(name: string | null) {
  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];
  const [firstName = "", ...lastNameParts] = parts;

  return {
    firstName,
    lastName: lastNameParts.join(" "),
  };
}

export function JobSeekerGoogleDetailsPage({
  googleUser,
}: {
  googleUser?: GoogleUser;
}) {
  const router = useRouter();
  const prefilledName = useMemo(
    () => getNameParts(googleUser?.name ?? null),
    [googleUser?.name],
  );
  const [googleProfile, setGoogleProfile] = useState<GoogleUser>({
    avatar: googleUser?.avatar ?? null,
    email: googleUser?.email ?? "",
    name: googleUser?.name ?? null,
  });
  const [form, setForm] = useState<GoogleDetailsForm>({
    confirmPassword: "",
    firstName: prefilledName.firstName,
    lastName: prefilledName.lastName,
    password: "",
  });
  const [errors, setErrors] = useState<GoogleDetailsErrors>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadGoogleProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!isMounted || !user) {
        return;
      }

      const fullName =
        user.user_metadata?.full_name || user.user_metadata?.name || null;
      const nameParts = getNameParts(fullName);

      setGoogleProfile({
        avatar: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
        email: user.email || "",
        name: fullName,
      });
      setForm((current) => ({
        ...current,
        firstName: current.firstName || nameParts.firstName,
        lastName: current.lastName || nameParts.lastName,
      }));
    }

    void loadGoogleProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  function updateField(field: keyof GoogleDetailsForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
  }

  function validate() {
    const nextErrors: GoogleDetailsErrors = {};

    if (!form.firstName.trim()) {
      nextErrors.firstName = "First name is required";
    }

    if (!form.lastName.trim()) {
      nextErrors.lastName = "Last name is required";
    }

    if (!form.password.trim()) {
      nextErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters";
    }

    if (!form.confirmPassword.trim()) {
      nextErrors.confirmPassword = "Please confirm your password";
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "Passwords must match";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    setSubmitError("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw userError || new Error("Please choose your Google account again.");
      }

      const email = user.email || googleProfile.email;
      const avatar =
        user.user_metadata?.avatar_url ||
        user.user_metadata?.picture ||
        googleProfile.avatar ||
        "";
      const firstName = form.firstName.trim();
      const lastName = form.lastName.trim();

      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          first_name: firstName,
          full_name: [firstName, lastName].filter(Boolean).join(" "),
          last_name: lastName,
          provider: "google",
          role: "jobseeker",
        },
        password: form.password,
      });

      if (updateError) {
        throw updateError;
      }

      await upsertProfile({
        avatarUrl: avatar,
        email,
        firstName,
        jobTitle: "Creative Specialist",
        lastName,
        provider: "google",
        role: "jobseeker",
        userId: user.id,
      });

      window.localStorage.setItem(
        "mediahire.jobseeker.googleProfile",
        JSON.stringify({
          avatar,
          email,
          firstName,
          lastName,
          name: googleProfile.name,
          provider: "google",
        }),
      );
      router.push("/signup/jobseeker/location");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Could not complete Google registration.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white px-4 py-5 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.35fr] lg:items-start">
        <motion.section
          className="flex items-center justify-center py-8 lg:py-6"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full max-w-[360px]">
            <ProgressSteps activeStep={0} />

            <div className="mt-8 text-center">
              <AuthLogo />
              <h1 className="mt-8 text-3xl font-black tracking-tight text-slate-900">
                Give us your information
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-400">
                Please enter your personal details to set up your account and
                personalize your experience
              </p>
              <p className="mt-4 rounded-xl bg-[#eef4ff] px-4 py-3 text-sm font-bold text-[#0B63E5]">
                Signed in with Google as{" "}
                {googleProfile.email || "your selected Google account"}
              </p>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
              <AuthInput
                autoComplete="given-name"
                error={errors.firstName}
                id="firstName"
                label="First Name*"
                onChange={(event) => updateField("firstName", event.target.value)}
                placeholder="Enter your First Name"
                type="text"
                value={form.firstName}
              />

              <AuthInput
                autoComplete="family-name"
                error={errors.lastName}
                id="lastName"
                label="Last Name*"
                onChange={(event) => updateField("lastName", event.target.value)}
                placeholder="Enter your Last Name"
                type="text"
                value={form.lastName}
              />

              <PasswordInput
                autoComplete="new-password"
                error={errors.password}
                id="password"
                isVisible={isPasswordVisible}
                label="Password*"
                onChange={(event) => updateField("password", event.target.value)}
                onToggleVisibility={() =>
                  setIsPasswordVisible((current) => !current)
                }
                placeholder="Enter your Password"
                value={form.password}
              />

              <PasswordInput
                autoComplete="new-password"
                error={errors.confirmPassword}
                id="confirmPassword"
                isVisible={isConfirmVisible}
                label="Confirm Password*"
                onChange={(event) =>
                  updateField("confirmPassword", event.target.value)
                }
                onToggleVisibility={() =>
                  setIsConfirmVisible((current) => !current)
                }
                placeholder="Confirmed your Password"
                value={form.confirmPassword}
              />

              {submitError ? (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">
                  {submitError}
                </p>
              ) : null}

              <PrimaryButton className="mt-2" isLoading={isLoading} type="submit">
                Sign up
              </PrimaryButton>
            </form>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <AuthImagePanel
            alt="Media creator preparing content"
            imageClassName="object-center"
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1500&q=90"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
            <motion.div
              className="absolute inset-x-6 bottom-6 sm:inset-x-9 sm:bottom-9"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <TestimonialCard />
            </motion.div>
          </AuthImagePanel>
        </motion.section>
      </div>
    </main>
  );
}
