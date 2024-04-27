import { db } from "@/lib/db";
import { DashboardHeader } from "@/components/header";
import { buttonVariants } from "@/components/ui/button";
import { HotelClient } from "../_components/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function HotelsPage() {
  const hotels = await db.hotel.findMany({
    include: {
      city: true,
    },
  });

  return (
    <>
      <DashboardHeader heading="Hotels">
        <Link href="/dashboard/hotel/new" className={buttonVariants()}>
          Add Hotel
        </Link>
      </DashboardHeader>
      {hotels?.length ? (
        <HotelClient hotels={hotels} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no hotels
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start take bookings as soon as you add a hotel.
            </p>
            <Link
              href="/dashboard/hotel/new"
              className={cn(buttonVariants({ variant: "outline" }), "mt-4")}
            >
              Add Hotel
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
