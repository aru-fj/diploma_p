"use client";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function CountdownTimer({ seconds }: { seconds: number }) {
  if (seconds <= 0) {
    return (
      <p className="mt-4 text-center text-xs font-bold text-red-500">
        Code expired. Please resend a new code.
      </p>
    );
  }

  return (
    <p className="mt-4 text-center text-xs font-medium text-slate-400">
      Your code will expire in{" "}
      <span className="font-black text-[#0B63E5]">{formatTime(seconds)}</span>
    </p>
  );
}
