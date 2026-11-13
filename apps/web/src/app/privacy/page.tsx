import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { legalDocuments } from "@/content/legal";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Double Growth collects, uses, stores and protects information submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalPage document={legalDocuments.privacy} />;
}
