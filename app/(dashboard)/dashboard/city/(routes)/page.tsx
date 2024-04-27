import { db } from "@/lib/db";
import { DashboardHeader } from "@/components/header";
import { buttonVariants } from "@/components/ui/button";
import { CityClient } from "../_components/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function CitiesPage() {
  const cities = await db.city.findMany();

  return (
    <>
      <DashboardHeader heading="Cities">
        <Link href="/dashboard/city/new" className={buttonVariants()}>
          Add City
        </Link>
      </DashboardHeader>
      {cities?.length ? (
        <CityClient cities={cities} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no cities
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start take bookings as soon as you add a city.
            </p>
            <Link
              href="/dashboard/city/new"
              className={cn(buttonVariants({ variant: "outline" }), "mt-4")}
            >
              Add City
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
