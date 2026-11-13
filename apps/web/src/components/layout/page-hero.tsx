import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  variant = "light",
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b",
        dark
          ? "border-white/10 bg-navy text-white"
          : "border-cloud bg-mist/50",
      )}
    >
      {dark ? (
        <>
          <div className="absolute inset-0 grid-surface opacity-60" aria-hidden="true" />
          <div className="absolute inset-0 glow-surface" aria-hidden="true" />
        </>
      ) : null}
      <div className="container-page relative py-14 sm:py-20">
        <div className="max-w-3xl">
          <p className={cn("eyebrow", dark && "text-cyan")}>{eyebrow}</p>
          <h1
            className={cn(
              "mt-3 text-4xl font-semibold leading-[1.1] sm:text-5xl",
              dark ? "text-white" : "text-ink",
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              "mt-5 max-w-2xl text-base leading-7",
              dark ? "text-white/65" : "text-slate",
            )}
          >
            {description}
          </p>
          {children ? <div className="mt-7">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
