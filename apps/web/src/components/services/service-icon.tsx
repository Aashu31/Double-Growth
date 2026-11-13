import {
  ChartNoAxesCombined,
  Cloud,
  Globe2,
  Layers3,
  School,
  ShoppingCart,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { IconName } from "@/content/services";
import { cn } from "@/lib/utils";

const icons = {
  globe: Globe2,
  cart: ShoppingCart,
  layers: Layers3,
  school: School,
  sparkles: Sparkles,
  cloud: Cloud,
  wrench: Wrench,
  chart: ChartNoAxesCombined,
} as const;

export function ServiceIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" className={cn("h-6 w-6", className)} />;
}
