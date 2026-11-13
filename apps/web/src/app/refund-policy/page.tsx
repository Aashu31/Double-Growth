import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { legalDocuments } from "@/content/legal";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Refund Policy",
  description:
    "How refund requests are assessed for Double Growth projects and the Growth Annual package.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return <LegalPage document={legalDocuments.refund} />;
}
