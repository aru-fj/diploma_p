export function ProgressSteps({
  activeStep = 0,
  total = 4,
}: {
  activeStep?: number;
  total?: number;
}) {
  return (
    <div
      aria-label="Registration progress"
      className="grid gap-3"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={activeStep + 1}
      style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: total }).map((_, index) => (
        <span
          className={`h-2 rounded-full transition ${
            index <= activeStep ? "bg-[#0B3F91]" : "bg-[#d7e8ff]"
          }`}
          key={index}
        />
      ))}
    </div>
  );
}
