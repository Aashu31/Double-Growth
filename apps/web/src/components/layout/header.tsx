"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Brand } from "@/components/brand";
import { ButtonLink } from "@/components/ui/button";
import { navigation } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [renderedPath, setRenderedPath] = useState(pathname);

  // Close the mobile menu whenever the route changes, including browser
  // back/forward, without an effect that triggers a cascading render.
  if (pathname !== renderedPath) {
    setRenderedPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-cloud/80 bg-white/90 backdrop-blur-xl">
      <div className="hidden border-b border-cloud/70 bg-mist/70 lg:block">
        <div className="container-page flex h-9 items-center justify-between text-[0.7rem] font-medium tracking-wide text-slate">
          <p>Digital agency and platform · Serving businesses in India and worldwide</p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Accepting new project enquiries
          </p>
        </div>
      </div>

      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Brand />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-mist text-ink"
                  : "text-slate hover:bg-mist/70 hover:text-ink",
              )}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href="/pricing" size="sm">
            Get Started
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cloud text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-navigation"
          className="border-t border-cloud bg-white lg:hidden"
        >
          <nav
            aria-label="Mobile"
            className="container-page flex flex-col gap-1 py-4"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-4 py-3 text-[0.95rem] font-medium",
                  isActive(item.href)
                    ? "bg-mist text-ink"
                    : "text-slate hover:bg-mist/70 hover:text-ink",
                )}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink href="/pricing" className="mt-3 w-full" size="md">
              Get Started
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
