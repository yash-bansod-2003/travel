import { db } from "@/lib/db";
import { DashboardHeader } from "@/components/header";
import { buttonVariants } from "@/components/ui/button";
import { StepClient } from "../_components/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function TrainsPage() {
  const steps = await db.step.findMany({
    include: {
      package: true,
    },
  });

  return (
    <>
      <DashboardHeader heading="Steps">
        <Link href="/dashboard/step/new" className={buttonVariants()}>
          Add Step
        </Link>
      </DashboardHeader>
      {steps?.length ? (
        <StepClient steps={steps} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no step
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start take bookings as soon as you add a step.
            </p>
            <Link
              href="/dashboard/step/new"
              className={cn(buttonVariants({ variant: "outline" }), "mt-4")}
            >
              Add Step
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
