export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: readonly FaqItem[] = [
  {
    question: "What is Double Growth?",
    answer:
      "Double Growth is a digital solutions agency that builds websites, e-commerce platforms, custom web applications and practical automation for businesses. It is founded and run by two co-founders and is also building Sarthi, its School ERP module.",
  },
  {
    question: "What services do you provide?",
    answer:
      "Business websites, e-commerce development, custom web applications, School Management Solutions through Sarthi, AI integration and automation, cloud and DevOps, website maintenance, and broader digital business solutions.",
  },
  {
    question: "How does the ₹3,999 annual package work?",
    answer:
      "The Growth Annual package is ₹3,999 per year. It covers an agreed website package, deployment support, and the maintenance scope listed on the pricing page. It is not unlimited development, unlimited hosting, or unlimited support. Third-party costs such as domains, paid hosting upgrades, payment gateway fees and premium APIs are billed separately unless explicitly included in your quotation.",
  },
  {
    question: "Can I migrate my existing website?",
    answer:
      "Yes, where the existing platform allows it. We review your current site, content, domain and hosting arrangements first, then propose a migration scope. Migration work is quoted separately because it depends on the source platform and the quality of the existing content.",
  },
  {
    question: "Do you develop e-commerce websites?",
    answer:
      "Yes. We build product catalogues, cart and checkout flows, and payment integrations. Payment confirmation is always verified on the backend. A storefront is scoped around your products, order process and payment provider.",
  },
  {
    question: "Is hosting included?",
    answer:
      "Deployment support is included within the agreed package scope. Infrastructure itself is a third-party cost. Where a managed platform or paid server is required, it is either billed at actual cost or set up under an account you own, and the limit is stated in your quotation.",
  },
  {
    question: "Can I own my website source code?",
    answer:
      "Yes. Subject to full payment and any third-party licence terms, ownership of the delivered project code and content is defined in the Ownership and Source Code Policy. Third-party libraries, frameworks and paid assets remain under their own licences.",
  },
  {
    question: "Do you provide maintenance?",
    answer:
      "Yes. Maintenance covers dependency and security updates, bug fixes, small content changes and monitoring within an agreed scope. The specific inclusions, response expectations and any limits are documented in your agreement.",
  },
  {
    question: "How do payments work?",
    answer:
      "Payments are made against an invoice or an approved package order. Online payment is enabled only after a payment provider is configured. Until then, orders are recorded as pending and completed through an agreed manual process. No payment is treated as complete without server-side verification.",
  },
  {
    question: "Can international clients purchase services?",
    answer:
      "Yes, subject to the payment method available at the time. International card or PayPal support depends on provider onboarding. Currency, taxes and transfer charges are confirmed in the quotation before work begins.",
  },
  {
    question: "What happens when my subscription expires?",
    answer:
      "You are notified before the renewal date. If the annual package is not renewed, maintenance and included support stop. Your website continues to operate only while the underlying hosting and services remain funded. Renewal terms are set out in the Terms and Conditions.",
  },
];

export const homepageFaqs = faqs.slice(0, 6);
