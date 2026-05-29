"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { AuthImagePanel } from "./auth-image-panel";
import { AuthInput } from "./auth-input";
import { AuthLogo } from "./logo";
import { PrimaryButton } from "./primary-button";
import { ProgressSteps } from "./progress-steps";
import { TestimonialCard } from "./testimonial-card";

type SalaryForm = {
  amount: string;
  currency: string;
  paymentPeriod: string;
};

type SalaryErrors = Partial<Record<keyof SalaryForm, string>>;

const initialForm: SalaryForm = {
  amount: "",
  currency: "Dollar",
  paymentPeriod: "",
};

const nextStepRoute = "/signup/jobseeker/resume";
const currencies = [
  { label: "Dollar", symbol: "$", value: "Dollar" },
  { label: "Tenge", symbol: "₸", value: "Tenge" },
  { label: "Ruble", symbol: "₽", value: "Ruble" },
];

export function JobSeekerSalaryPage() {
  const router = useRouter();
  const [form, setForm] = useState<SalaryForm>(initialForm);
  const [errors, setErrors] = useState<SalaryErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const selectedCurrency =
    currencies.find((currency) => currency.value === form.currency) ??
    currencies[0];

  function updateField(field: keyof SalaryForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate() {
    const nextErrors: SalaryErrors = {};
    const normalizedAmount = form.amount.trim();

    if (!normalizedAmount) {
      nextErrors.amount = "Minimum salary amount is required";
    } else if (
      Number.isNaN(Number(normalizedAmount)) ||
      Number(normalizedAmount) <= 0
    ) {
      nextErrors.amount = "Enter a valid salary amount";
    }

    if (!form.paymentPeriod.trim()) {
      nextErrors.paymentPeriod = "Payment period is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goToNextStep() {
    setIsLoading(true);
    router.push(nextStepRoute);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    goToNextStep();
  }

  function handleSkip() {
    setErrors({});
    goToNextStep();
  }

  return (
    <main className="min-h-screen bg-white px-4 py-4 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl gap-7 lg:grid-cols-[0.78fr_1.35fr] lg:items-start">
        <motion.section
          className="flex items-start justify-center py-5 lg:py-4"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full max-w-[305px]">
            <ProgressSteps activeStep={2} />

            <div className="mt-10 text-center max-lg:mt-8">
              <AuthLogo compact />
              <h1 className="mx-auto mt-5 max-w-[285px] text-[1.35rem] font-black leading-tight tracking-tight text-slate-900">
                How much is the minimum salary You want?
              </h1>
              <p className="mx-auto mt-2 max-w-[285px] text-xs leading-5 text-slate-400">
                We use this to match you nearby offers that approximately pay
                this amount or more.
              </p>
            </div>

            <form className="mt-4 space-y-3" onSubmit={handleSubmit} noValidate>
              <div>
                <div>
                  <label
                    className="mb-1.5 ml-3 block text-xs font-bold text-slate-800"
                    htmlFor="minimumSalary"
                  >
                    Minimum Salary Amount
                  </label>
                  <div className="relative">
                    <input
                      className={`h-12 w-full rounded-lg border bg-white px-3 pr-20 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0B63E5] focus:ring-4 focus:ring-[#0B63E5]/10 ${
                        errors.amount ? "border-red-400" : "border-slate-300"
                      }`}
                      id="minimumSalary"
                      inputMode="decimal"
                      onChange={(event) =>
                        updateField("amount", event.target.value)
                      }
                      pattern="[0-9]*[.]?[0-9]*"
                      placeholder="Enter Minimum Salary Amount"
                      type="text"
                      value={form.amount}
                    />
                    <div className="absolute right-2 top-1/2 flex h-8 min-w-14 -translate-y-1/2 items-center justify-center rounded-md border border-slate-200 bg-[#f8fbff] px-2 text-xs font-black text-slate-700 transition hover:border-[#0B63E5]/40 hover:bg-[#eef4ff]">
                      <span aria-hidden="true">{selectedCurrency.symbol}</span>
                      <ChevronDown
                        aria-hidden="true"
                        className="ml-1.5 text-slate-400"
                        size={15}
                      />
                      <select
                        aria-label="Currency"
                        className="absolute inset-0 cursor-pointer opacity-0"
                        onChange={(event) =>
                          updateField("currency", event.target.value)
                        }
                        value={form.currency}
                      >
                        {currencies.map((currency) => (
                          <option key={currency.value} value={currency.value}>
                            {currency.symbol} {currency.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {errors.amount ? (
                    <p className="mt-1.5 text-xs font-semibold text-red-500">
                      {errors.amount}
                    </p>
                  ) : null}
                </div>
              </div>

              <AuthInput
                autoComplete="off"
                compact
                error={errors.paymentPeriod}
                id="paymentPeriod"
                label="Payment Period"
                list="payment-period-options"
                onChange={(event) =>
                  updateField("paymentPeriod", event.target.value)
                }
                placeholder="Enter Payment Period"
                type="text"
                value={form.paymentPeriod}
              />
              <datalist id="payment-period-options">
                <option value="monthly" />
                <option value="hourly" />
                <option value="yearly" />
                <option value="project-based" />
              </datalist>

              <PrimaryButton compact className="mt-1" isLoading={isLoading} type="submit">
                Continue
              </PrimaryButton>
            </form>

            <button
              className="mx-auto mt-3 block rounded-full px-6 py-2 text-xs font-bold text-slate-500 transition hover:bg-[#eef4ff] hover:text-[#0B63E5] focus:outline-none focus:ring-4 focus:ring-[#0B63E5]/10"
              onClick={handleSkip}
              type="button"
            >
              Skip
            </button>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <AuthImagePanel
            alt="Media creator holding a tablet and filming setup"
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
              <TestimonialCard
                avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80"
                name="Aizhan Kuntay"
                role="Job Seeker"
                text="From my first call with Sandro's HR team to the final interview, the process felt curated and intentional. Their thoughtful approach reflected the elegance of their brand. I left each conversation feeling more excited and inspired."
              />
            </motion.div>
          </AuthImagePanel>
        </motion.section>
      </div>
    </main>
  );
}
