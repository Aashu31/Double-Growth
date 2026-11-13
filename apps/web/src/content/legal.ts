export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LegalDocument {
  slug: "privacy" | "terms" | "refund" | "ownership";
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
}

export const legalDocuments: Record<
  LegalDocument["slug"],
  LegalDocument
> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    description:
      "How Double Growth collects, uses, stores and protects information submitted through this website.",
    updated: "14 November 2026",
    sections: [
      {
        heading: "1. Who this policy applies to",
        paragraphs: [
          "This policy applies to visitors of the Double Growth website and to people who submit an enquiry, place a package order or contact the team through the channels published on this site.",
          "Double Growth is operated by two co-founders. The registered business address and formal data-controller details are pending verification and will be published before commercial launch.",
        ],
      },
      {
        heading: "2. Information we collect",
        paragraphs: [
          "We collect only the information you choose to provide through our forms, plus limited technical information required to operate the website securely.",
        ],
        bullets: [
          "Identity and contact details: name, email address, phone number and business name.",
          "Enquiry details: required service, budget range, project description and preferred contact method.",
          "Order details: package selected, billing contact information and GSTIN where provided.",
          "Technical information: IP address, request timestamps, browser information and security logs generated when you use the site.",
        ],
      },
      {
        heading: "3. How we use your information",
        bullets: [
          "To respond to your enquiry and prepare a quotation.",
          "To process and administer an order or subscription.",
          "To deliver, support and maintain services you have purchased.",
          "To protect the website against spam, abuse, fraud and unauthorised access.",
          "To meet accounting, tax and legal obligations.",
        ],
        paragraphs: [
          "We do not sell personal information. We do not use submitted enquiry content to train third-party AI models.",
        ],
      },
      {
        heading: "4. Legal basis and consent",
        paragraphs: [
          "Where you submit an enquiry, you consent to us using the information to respond to that enquiry. Where we process information to perform a contract, comply with law or protect legitimate business interests, we rely on those grounds.",
          "You may withdraw consent for future marketing communication at any time. Withdrawal does not affect processing that has already taken place or processing required to fulfil a contract.",
        ],
      },
      {
        heading: "5. Sharing and processors",
        paragraphs: [
          "We use service providers for hosting, email delivery, payment processing, error monitoring and, where enabled, AI-assisted responses. These providers process information only for the purpose of delivering their service to us.",
        ],
        bullets: [
          "Hosting and deployment providers, which may process data outside India.",
          "Payment providers, which handle payment credentials directly. Double Growth does not store card or UPI credentials.",
          "Email and communication providers used to respond to enquiries.",
          "AI providers, where the chatbot is enabled, subject to the configuration and retention terms of the selected provider.",
        ],
      },
      {
        heading: "6. Cookies and analytics",
        paragraphs: [
          "The website uses only the cookies and storage required for core functionality and security. If analytics or advertising tools are added, this policy and, where required, a consent mechanism will be updated before those tools are enabled.",
        ],
      },
      {
        heading: "7. Retention",
        paragraphs: [
          "Enquiry records are retained for as long as needed to respond and maintain a reasonable sales record, and are then deleted or anonymised. Order, invoice and payment records are retained for the period required by applicable accounting and tax law.",
        ],
      },
      {
        heading: "8. Security",
        paragraphs: [
          "We apply server-side validation, access controls, encrypted transport, rate limiting and restricted secret management. No internet transmission is completely secure, and we cannot guarantee absolute security. If a breach affects personal information, we will notify affected individuals and authorities where required by law.",
        ],
      },
      {
        heading: "9. Your rights",
        paragraphs: [
          "Subject to applicable law, you may request access to the personal information we hold about you, correction of inaccurate information, deletion where retention is not required, and withdrawal of consent.",
          "Requests can be submitted through the contact page. Contact details are pending final verification and will be published before launch.",
        ],
      },
      {
        heading: "10. Children",
        paragraphs: [
          "This website is intended for businesses and adults. We do not knowingly collect personal information from children. Student data processed within Sarthi is governed by separate agreements with the relevant school.",
        ],
      },
      {
        heading: "11. Changes to this policy",
        paragraphs: [
          "We may update this policy as the service changes. The revision date at the top of this page will be updated, and material changes will be communicated where required.",
        ],
      },
    ],
  },
  terms: {
    slug: "terms",
    title: "Terms and Conditions",
    description:
      "The terms that govern use of the Double Growth website and the purchase of services.",
    updated: "14 November 2026",
    sections: [
      {
        heading: "1. Agreement",
        paragraphs: [
          "By using this website or purchasing a service, you agree to these terms. If you are acting for a business, you confirm that you are authorised to accept these terms on its behalf.",
          "A quotation, proposal or written scope may add specific terms for a project. Where those terms conflict with this page, the signed project terms take precedence for that project.",
        ],
      },
      {
        heading: "2. Services",
        paragraphs: [
          "Double Growth provides website development, e-commerce development, custom web applications, school management solutions, AI integration, cloud and DevOps support, maintenance and related digital services.",
          "The exact deliverables, revision limits, timelines and exclusions for a paid engagement are defined in the applicable quotation or agreement.",
        ],
      },
      {
        heading: "3. Quotations and scope",
        bullets: [
          "Quotations are valid for the period stated on the document.",
          "Work begins after written acceptance and receipt of any advance payment required.",
          "Requests outside the agreed scope are quoted separately and may change the timeline.",
          "Client feedback is expected within a reasonable period; delays in feedback may move delivery dates.",
        ],
      },
      {
        heading: "4. Annual package and subscriptions",
        paragraphs: [
          "The Growth Annual package is billed per year. It includes the website scope, deployment support and maintenance scope described on the pricing page, subject to fair-use limits.",
          "The package does not include unlimited development, unlimited hosting or unlimited support. Third-party costs are excluded unless expressly included in a quotation.",
          "Renewal is not automatic unless agreed in writing. Included maintenance and support stop if the subscription is not renewed.",
        ],
      },
      {
        heading: "5. Client responsibilities",
        bullets: [
          "Provide accurate business information, content, images and brand assets.",
          "Ensure you have the right to use all content and materials supplied to us.",
          "Review deliverables and provide consolidated feedback.",
          "Maintain the security of accounts and credentials shared with your team.",
          "Comply with applicable law in the operation of your business.",
        ],
      },
      {
        heading: "6. Payments",
        paragraphs: [
          "Invoices are payable by the due date stated on the invoice. Online payment is enabled only after a payment provider is configured. Until then, payment is completed through the process agreed in writing.",
          "A payment is treated as received only after server-side verification or confirmed settlement. A browser redirect, screenshot or claim of payment is not proof of payment.",
          "Late payment may pause work or support. Taxes, bank charges and currency conversion costs are the responsibility of the client unless stated otherwise.",
        ],
      },
      {
        heading: "7. Third-party services",
        paragraphs: [
          "Projects may rely on third-party services such as hosting, domains, payment gateways, email providers and AI APIs. Those services are governed by their own terms, availability and pricing.",
          "Double Growth is not responsible for outages, policy changes, price changes or discontinuation of a third-party service, but will make reasonable efforts to advise on alternatives.",
        ],
      },
      {
        heading: "8. Intellectual property",
        paragraphs: [
          "Ownership of delivered project code and content transfers according to the Ownership and Source Code Policy, normally on full payment. Pre-existing tools, internal frameworks, third-party libraries and the Double Growth brand remain the property of their respective owners.",
          "Unless written permission is granted, client work is not published in the public portfolio.",
        ],
      },
      {
        heading: "9. Acceptable use",
        paragraphs: [
          "You may not use this website or our services to distribute unlawful content, attempt unauthorised access, interfere with service availability, or infringe the rights of others.",
        ],
      },
      {
        heading: "10. Limitation of liability",
        paragraphs: [
          "To the maximum extent permitted by law, Double Growth is not liable for indirect or consequential loss, loss of profit, loss of data caused by third-party services, or business interruption. Total liability for a claim is limited to the amount paid for the specific service giving rise to the claim, unless applicable law requires otherwise.",
          "Nothing in these terms excludes liability that cannot lawfully be excluded.",
        ],
      },
      {
        heading: "11. Suspension and termination",
        paragraphs: [
          "Either party may terminate a project with written notice. Amounts due for work completed remain payable. On termination, access to accounts, hosting and ongoing support may be withdrawn after reasonable notice, subject to any separate agreement.",
        ],
      },
      {
        heading: "12. Governing law",
        paragraphs: [
          "These terms are intended to be governed by the laws of India. The specific jurisdiction and dispute-resolution process are pending legal review and will be confirmed before commercial launch.",
        ],
      },
      {
        heading: "13. Changes",
        paragraphs: [
          "We may update these terms. The revision date at the top of this page will change. Continued use of the website after an update constitutes acceptance of the revised terms.",
        ],
      },
    ],
  },
  refund: {
    slug: "refund",
    title: "Refund Policy",
    description:
      "How refund requests are assessed for Double Growth services and annual packages.",
    updated: "14 November 2026",
    sections: [
      {
        heading: "1. Scope",
        paragraphs: [
          "This policy applies to amounts paid directly to Double Growth. It does not cover charges collected by third parties such as domain registrars, hosting providers, payment gateways or AI providers.",
        ],
      },
      {
        heading: "2. Before work begins",
        paragraphs: [
          "If a refund is requested before project work has started, we will review the request and, where approved, refund the amount received less any non-recoverable transaction fees and third-party costs already incurred.",
        ],
      },
      {
        heading: "3. After work begins",
        paragraphs: [
          "Once work has started, refunds are assessed against the work completed, the effort committed and any third-party costs incurred. A partial refund may be approved where the delivered work has not yet reached the stage paid for.",
          "Completed and accepted deliverables are not refundable solely because the client changes direction or no longer needs the work.",
        ],
      },
      {
        heading: "4. Annual package",
        paragraphs: [
          "Where a Growth Annual package is cancelled after activation, the unused portion may be considered for a pro-rata refund at our discretion, taking into account work performed, support used and third-party costs. Renewal payments are assessed under the same principle.",
        ],
      },
      {
        heading: "5. Non-refundable items",
        bullets: [
          "Domain registration and renewal fees.",
          "Third-party hosting, licences and API usage already consumed.",
          "Payment gateway and currency conversion charges.",
          "Work explicitly marked as non-refundable in a signed agreement.",
          "Custom work delivered and accepted in full.",
        ],
      },
      {
        heading: "6. How to request a refund",
        paragraphs: [
          "Submit a refund request through the contact page with your order or invoice reference, the payment date and the reason for the request. Contact details are pending final verification and will be published before launch.",
          "We aim to acknowledge complete requests within a reasonable period and communicate a decision after review.",
        ],
      },
      {
        heading: "7. Processing",
        paragraphs: [
          "Approved refunds are processed through the original payment method where possible. Processing time depends on the payment provider and bank. Any refund is made in the original currency, and exchange-rate differences are not recoverable.",
        ],
      },
      {
        heading: "8. Chargebacks",
        paragraphs: [
          "Please contact us before initiating a chargeback so we can review the issue. Initiating a chargeback does not suspend your obligations under the applicable agreement.",
        ],
      },
    ],
  },
  ownership: {
    slug: "ownership",
    title: "Ownership and Source Code Policy",
    description:
      "What you own after paying for a Double Growth project, and what remains under third-party or agency ownership.",
    updated: "14 November 2026",
    sections: [
      {
        heading: "1. Project ownership on full payment",
        paragraphs: [
          "Subject to full payment of the agreed fees and any third-party licence terms, the client owns the custom source code, content and design assets created specifically for the project.",
          "Ownership transfers only after all outstanding amounts for that project have been received and confirmed.",
        ],
      },
      {
        heading: "2. What is not transferred",
        bullets: [
          "Third-party frameworks, libraries and components, which remain under their own licences.",
          "Paid themes, fonts, images or plugins, which may require the client to hold a separate licence.",
          "Double Growth's internal tools, reusable components, processes and brand assets.",
          "Accounts and services registered in Double Growth's name, unless explicitly transferred in writing.",
        ],
      },
      {
        heading: "3. Handover",
        paragraphs: [
          "On completion, the client receives the agreed source repository access, deployment instructions and a list of third-party services required to operate the project.",
          "Where the client requires accounts to be created in their own name, this is arranged before launch. Transfer of domains and hosting is completed once outstanding fees are settled.",
        ],
      },
      {
        heading: "4. Hosting and domains",
        paragraphs: [
          "Hosting and domain accounts should normally be owned by the client. Where Double Growth manages them on the client's behalf, the arrangement, renewal responsibility and costs are stated in the quotation.",
          "Double Growth is not responsible for a domain or service lost because a client-owned account was not renewed.",
        ],
      },
      {
        heading: "5. Cancellation before completion",
        paragraphs: [
          "If a project is cancelled before completion, ownership of work for which payment has been received is handled according to the applicable agreement. Work remains the property of Double Growth until the corresponding invoices are settled.",
        ],
      },
      {
        heading: "6. Portfolio and reference use",
        paragraphs: [
          "Double Growth will not publish a client's project, name, screenshots or results without written permission. Concept demonstrations are labelled as concepts and are never presented as client work.",
        ],
      },
      {
        heading: "7. Open-source compliance",
        paragraphs: [
          "Projects may include open-source dependencies. The client is responsible for complying with the licences of dependencies distributed with the final product. A dependency inventory can be provided on request.",
        ],
      },
    ],
  },
};

export function getLegalDocument(slug: LegalDocument["slug"]): LegalDocument {
  return legalDocuments[slug];
}
