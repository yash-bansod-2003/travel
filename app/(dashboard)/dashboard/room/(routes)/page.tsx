import { db } from "@/lib/db";
import { DashboardHeader } from "@/components/header";
import { buttonVariants } from "@/components/ui/button";
import { RoomClient } from "../_components/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function TrainsPage() {
  const rooms = await db.room.findMany();

  return (
    <>
      <DashboardHeader heading="Rooms">
        <Link href="/dashboard/room/new" className={buttonVariants()}>
          Add Room
        </Link>
      </DashboardHeader>
      {rooms?.length ? (
        <RoomClient rooms={rooms} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no room
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start take bookings as soon as you add a room.
            </p>
            <Link
              href="/dashboard/room/new"
              className={cn(buttonVariants({ variant: "outline" }), "mt-4")}
            >
              Add Room
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
