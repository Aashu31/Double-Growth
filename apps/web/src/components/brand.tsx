import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      role="img"
      aria-label="Double Growth mark"
      className={cn("h-9 w-9", className)}
    >
      <rect width="40" height="40" rx="11" fill="#081A33" />
      <path
        d="M11 27.5 20 13l9 14.5"
        fill="none"
        stroke="#2F6BFF"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 32 20 17.5 29 32"
        fill="none"
        stroke="#35D6E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
    </svg>
  );
}

export function Brand({
  inverted = false,
  compact = false,
}: {
  inverted?: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3"
      aria-label="Double Growth — home"
    >
      <BrandMark className="transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="flex flex-col">
        <span
          className={cn(
            "text-[0.95rem] font-semibold tracking-[0.14em] uppercase",
            inverted ? "text-white" : "text-ink",
          )}
        >
          Double Growth
        </span>
        {!compact ? (
          <span
            className={cn(
              "hidden text-[0.65rem] font-medium tracking-[0.18em] uppercase sm:block",
              inverted ? "text-white/55" : "text-slate",
            )}
          >
            Build Digital. Grow Business.
          </span>
        ) : null}
      </span>
    </Link>
  );
}
