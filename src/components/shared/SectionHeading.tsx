import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** "dark" inverts text for ink-on-cream sections. */
  variant?: "default" | "dark";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  variant = "default",
}: SectionHeadingProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 text-xs font-semibold uppercase tracking-[0.32em]",
            isDark ? "text-accent" : "text-primary",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-serif text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl",
          isDark ? "text-background" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-6 text-lg leading-relaxed sm:text-xl",
            isDark ? "text-background/75" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
