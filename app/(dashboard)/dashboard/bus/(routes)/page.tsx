import { db } from "@/lib/db";
import { DashboardHeader } from "@/components/header";
import { buttonVariants } from "@/components/ui/button";
import { BusClient } from "../_components/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function TrainsPage() {
  const buses = await db.bus.findMany();

  return (
    <>
      <DashboardHeader heading="Buses">
        <Link href="/dashboard/bus/new" className={buttonVariants()}>
          Add Bus
        </Link>
      </DashboardHeader>
      {buses?.length ? (
        <BusClient buses={buses} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no buses
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start take bookings as soon as you add a bus.
            </p>
            <Link
              href="/dashboard/bus/new"
              className={cn(buttonVariants({ variant: "outline" }), "mt-4")}
            >
              Add Bus
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
