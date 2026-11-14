import {
  SERVICE_DETAILS,
  findServiceDetail,
  type ServiceDetail,
  type ServiceId,
} from "@double-growth/shared";

export type IconName =
  | "globe"
  | "cart"
  | "layers"
  | "school"
  | "sparkles"
  | "cloud"
  | "wrench"
  | "chart";

export interface ServiceContent extends ServiceDetail {
  icon: IconName;
}

const iconById: Record<ServiceId, IconName> = {
  "business-website": "globe",
  ecommerce: "cart",
  "custom-applications": "layers",
  "school-management": "school",
  "ai-automation": "sparkles",
  "cloud-devops": "cloud",
  "maintenance-support": "wrench",
  "digital-solutions": "chart",
};

export const servicesContent: readonly ServiceContent[] = SERVICE_DETAILS.map(
  (service) => ({
    ...service,
    icon: iconById[service.id],
  }),
);

export function findServiceContent(id: string): ServiceContent | undefined {
  const detail = findServiceDetail(id);
  if (!detail) return undefined;

  return { ...detail, icon: iconById[detail.id] };
}
