"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Brand } from "@/components/brand";
import { ButtonLink } from "@/components/ui/button";
import { ServiceIcon } from "@/components/services/service-icon";
import { servicesContent } from "@/content/services";
import { navigation } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [renderedPath, setRenderedPath] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  if (pathname !== renderedPath) {
    setRenderedPath(pathname);
    setOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open && !servicesOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setServicesOpen(false);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, servicesOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const servicesActive = pathname.startsWith("/services");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/90 backdrop-blur-xl transition-shadow",
        scrolled
          ? "border-cloud shadow-[0_10px_30px_-24px_rgba(11,16,32,0.5)]"
          : "border-cloud/70",
      )}
    >
      <div className="hidden border-b border-cloud/70 bg-mist/70 lg:block">
        <div className="container-page flex h-9 items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.12em] text-slate">
          <p>Digital agency &amp; platform · India and worldwide</p>
          <p className="flex items-center gap-2">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Accepting new project enquiries
          </p>
        </div>
      </div>

      <div className="container-page flex h-[4.5rem] items-center justify-between gap-3">
        <Brand />

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {navigation.map((item) =>
            item.href === "/services" ? (
              <div key={item.href} ref={servicesRef} className="relative">
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                      servicesActive
                        ? "bg-mist text-ink"
                        : "text-slate hover:bg-mist/70 hover:text-ink",
                    )}
                    aria-current={servicesActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setServicesOpen((value) => !value)}
                    aria-expanded={servicesOpen}
                    aria-controls="services-menu"
                    aria-label="Open services menu"
                    className={cn(
                      "-ml-1 inline-flex h-8 w-7 items-center justify-center rounded-full text-slate transition-colors hover:text-ink",
                      servicesOpen && "text-ink",
                    )}
                  >
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        servicesOpen && "rotate-180",
                      )}
                    />
                  </button>
                </div>

                {servicesOpen ? (
                  <div
                    id="services-menu"
                    className="absolute left-0 top-full mt-3 w-[44rem] overflow-hidden rounded-3xl border border-cloud bg-white shadow-2xl"
                  >
                    <div className="grid grid-cols-2 gap-1 p-3">
                      {servicesContent.map((service) => (
                        <Link
                          key={service.id}
                          href={`/services/${service.id}`}
                          className="group flex gap-3 rounded-2xl p-3 transition-colors hover:bg-mist"
                        >
                          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mist text-electric group-hover:bg-white">
                            <ServiceIcon name={service.icon} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-ink">
                              {service.name}
                            </span>
                            <span className="mt-0.5 line-clamp-1 block text-xs text-slate">
                              {service.summary}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="flex items-center justify-between border-t border-cloud bg-mist/60 px-5 py-3">
                      <Link
                        href="/services"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-electric"
                      >
                        View the full catalogue
                        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink"
                      >
                        Request a quotation
                        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
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
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href="/pricing" size="sm">
            Get Started
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
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
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-cloud bg-white lg:hidden"
        >
          <nav
            aria-label="Mobile"
            className="container-page flex flex-col gap-1 py-4"
          >
            {navigation.map((item) =>
              item.href === "/services" ? (
                <details key={item.href} className="group rounded-xl">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-4 py-3 text-[0.95rem] font-medium text-slate hover:bg-mist/70 marker:hidden">
                    Services
                    <ChevronDown
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <div className="mb-2 ml-3 grid gap-1 border-l border-cloud pl-3">
                    <Link
                      href="/services"
                      className="rounded-lg px-3 py-2 text-sm font-semibold text-electric"
                    >
                      All services
                    </Link>
                    {servicesContent.map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.id}`}
                        className="rounded-lg px-3 py-2 text-sm text-slate hover:bg-mist hover:text-ink"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
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
              ),
            )}
            <ButtonLink href="/pricing" className="mt-3 w-full" size="md">
              Get Started
            </ButtonLink>
            <p className="mt-3 px-4 text-xs leading-5 text-slate">
              Build Digital. Grow Business. · India and worldwide
            </p>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
