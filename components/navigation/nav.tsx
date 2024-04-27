"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Home, LineChart, Package, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarNavItem } from "@/types";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

interface DashboardNavProps {
  items: SidebarNavItem[];
}

const DashboardNav: React.FC<DashboardNavProps> = ({ items }) => {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "dashboard"];
        return (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
              path === item.href
                ? "bg-muted text-primary"
                : "text-muted-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default DashboardNav;
