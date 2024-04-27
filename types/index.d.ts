import { Icons } from "@/components/icons";

export interface SiteConfig {
  name: string;
  description: string;
}

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon: keyof typeof Icons;
  href: string;
};

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[];
};
