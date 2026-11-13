import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { legalDocuments } from "@/content/legal";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms and Conditions",
  description:
    "The terms that govern use of the Double Growth website and the purchase of Double Growth services.",
  path: "/terms",
});

export default function TermsPage() {
  return <LegalPage document={legalDocuments.terms} />;
}
