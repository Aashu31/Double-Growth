import type { Metadata } from "next";

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://doublegrowth.in";

export const siteConfig = {
  name: "Double Growth",
  tagline: "Build Digital. Grow Business.",
  description:
    "Double Growth builds business websites, e-commerce platforms, custom web applications and practical AI automation for companies in India and worldwide.",
  url: rawSiteUrl.replace(/\/$/, ""),
  contact: {
    email: null as string | null,
    phone: null as string | null,
    whatsapp: null as string | null,
    address: null as string | null,
  },
  social: [] as { label: string; href: string }[],
  founders: [
    {
      name: null as string | null,
      role: "Co-Founder — Strategy and Client Success",
      focus:
        "Discovery, scope, commercial terms and the relationship that keeps delivery accountable.",
    },
    {
      name: null as string | null,
      role: "Co-Founder — Engineering and Product",
      focus:
        "Architecture, implementation, security and the technical quality of everything we ship.",
    },
  ],
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const legalNavigation = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Ownership Policy", href: "/ownership" },
  { label: "Maintenance and Support", href: "/maintenance" },
] as const;

export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
