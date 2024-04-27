import { db } from "@/lib/db";
import { DashboardHeader } from "@/components/header";
import { BookingClient } from "./_components/client";

export default async function TrainsPage() {
  const bookings = await db.booking.findMany({
    include: {
      package: true,
    },
  });

  return (
    <>
      <DashboardHeader heading="Bookings"></DashboardHeader>
      {bookings?.length ? (
        <BookingClient bookings={bookings} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no Bookings
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start take bookings as soon as you create packages.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
