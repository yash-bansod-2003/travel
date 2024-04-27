import { db } from "@/lib/db";
import { DashboardHeader } from "@/components/header";
import { buttonVariants } from "@/components/ui/button";
import { PackageClient } from "../_components/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function PackagesPage() {
  const packages = await db.package.findMany({
    include: {
      cities: true,
    },
  });

  return (
    <>
      <DashboardHeader heading="Packages">
        <Link href="/dashboard/package/new" className={buttonVariants()}>
          Add Package
        </Link>
      </DashboardHeader>
      {packages?.length ? (
        <PackageClient packages={packages} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no packages
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start take bookings as soon as you add a package.
            </p>
            <Link
              href="/dashboard/package/new"
              className={cn(buttonVariants({ variant: "outline" }), "mt-4")}
            >
              Add Package
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
