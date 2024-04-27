import { db } from "@/lib/db";
import { DashboardHeader } from "@/components/header";
import { Button, buttonVariants } from "@/components/ui/button";
import { TrainClient } from "../_components/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function TrainsPage() {
  const trains = await db.train.findMany({
    include: {
      source: true,
      destination: true,
    },
  });

  return (
    <>
      <DashboardHeader heading="Trains">
        <Link href="/dashboard/train/new" className={buttonVariants()}>
          Add Train
        </Link>
      </DashboardHeader>
      {trains?.length ? (
        <TrainClient trains={trains} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no trains
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start take bookings as soon as you add a train.
            </p>
            <Link
              href="/dashboard/train/new"
              className={cn(buttonVariants({ variant: "outline" }), "mt-4")}
            >
              Add Train
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
