export const PACKAGE_INCLUSIONS = [
  "A professionally designed business website within the agreed page and feature scope",
  "Responsive implementation for mobile, tablet and desktop",
  "Core SEO setup: page titles, descriptions, sitemap and robots configuration",
  "Contact and enquiry form connected to a validated backend",
  "Deployment support for the agreed hosting target",
  "Maintenance within the published support scope",
  "Access to new platform features released for the package during the term",
] as const;

export const PACKAGE_EXCLUSIONS = [
  "Domain registration and renewal charges",
  "Paid hosting, server upgrades and bandwidth overages",
  "Payment gateway fees and transaction charges",
  "Paid AI provider usage above any agreed allowance",
  "Premium stock assets, custom photography and copywriting",
  "Features outside the written scope, quoted separately",
  "Unlimited development, unlimited hosting or unlimited support",
] as const;

export const PRICING_POLICIES = [
  {
    title: "Hosting policy",
    body: "Deployment support is included within the agreed package scope. Hosting itself is a third-party cost. Where possible it is set up under an account you own, or billed at actual cost with the limit stated in your quotation. Paid upgrades and bandwidth overages are never described as unlimited.",
  },
  {
    title: "Support policy",
    body: "Maintenance covers dependency and security updates, bug fixes and small content changes within the published support scope. It is not unlimited development or unlimited support. Response expectations, included hours and out-of-scope rates are confirmed in your written agreement.",
  },
  {
    title: "Source code ownership",
    body: "Subject to full payment and any third-party licence terms, ownership of the delivered project code and content is defined in the Ownership and Source Code Policy. Frameworks, libraries and paid assets remain under their own licences. Domains and hosting accounts stay separate.",
  },
] as const;
