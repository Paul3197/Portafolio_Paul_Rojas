export function SectionHeading({
  index,
  label,
  title,
  description,
  align = "left",
}: {
  index?: string;
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl"
      }
    >
      <div
        className={`flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-gold ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {index && <span className="text-text-muted">/{index}</span>}
        <span>{label}</span>
      </div>
      <h2 className="mt-5 text-balance font-serif text-4xl leading-[1.1] text-text-primary sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-text-secondary sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
