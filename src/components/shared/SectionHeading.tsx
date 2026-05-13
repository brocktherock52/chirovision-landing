import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Kept for API compatibility. Site is dark-only now. */
  variant?: "default" | "dark";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-teal">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-[56px]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-pretty text-base leading-relaxed text-dim sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
