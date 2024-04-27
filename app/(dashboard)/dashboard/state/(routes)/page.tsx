import { db } from "@/lib/db";
import { DashboardHeader } from "@/components/header";
import { buttonVariants } from "@/components/ui/button";
import { StateClient } from "../_components/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function StatesPage() {
  const states = await db.state.findMany();

  return (
    <>
      <DashboardHeader heading="States">
        <Link href="/dashboard/state/new" className={buttonVariants()}>
          Add State
        </Link>
      </DashboardHeader>
      {states?.length ? (
        <StateClient states={states} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no states
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start take bookings as soon as you add a State.
            </p>
            <Link
              href="/dashboard/state/new"
              className={cn(buttonVariants({ variant: "outline" }), "mt-4")}
            >
              Add State
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
