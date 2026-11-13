import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { legalDocuments } from "@/content/legal";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Ownership and Source Code Policy",
  description:
    "What you own after paying for a Double Growth project, and what remains under third-party or agency ownership.",
  path: "/ownership",
});

export default function OwnershipPage() {
  return <LegalPage document={legalDocuments.ownership} />;
}
