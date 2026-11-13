import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4"
    >
      <Loader2 aria-hidden="true" className="h-7 w-7 animate-spin text-electric" />
      <p className="text-sm font-medium text-slate">Loading page…</p>
    </div>
  );
}
