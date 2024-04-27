"use client";

import { useUser } from "@clerk/nextjs";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserAccountNav } from "@/components/account/user-account-nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { buttonVariants } from "../ui/button";

export function MainNav() {
  const pathname = usePathname();
  const { user } = useUser();
  return (
    <div className="w-full flex justify-between">
      <div className="hidden md:flex">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Icons.logo className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm lg:gap-6">
          <Link
            href="/packages"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/packages"
                ? "text-foreground"
                : "text-foreground/60",
            )}
          >
            Packages
          </Link>
        </nav>
      </div>

      {user ? (
        <UserAccountNav
          user={{
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            imageUrl: user?.imageUrl || "",
          }}
        />
      ) : (
        <Link className={buttonVariants({ variant: "outline" })} href="/signin">
          Log In
        </Link>
      )}
    </div>
  );
}
