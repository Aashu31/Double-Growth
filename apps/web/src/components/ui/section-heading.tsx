import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverted = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  inverted?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow", inverted && "text-cyan")}>{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "mt-3 text-3xl font-semibold leading-tight sm:text-4xl",
          inverted ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            inverted ? "text-white/65" : "text-slate",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
