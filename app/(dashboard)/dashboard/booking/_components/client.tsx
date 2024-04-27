import { Booking, Package } from "@prisma/client";
import { Booking as BookingColumn, columns } from "./columns";
import { DataTable } from "./data-table";
import { formatArrayToString } from "@/lib/utils";

interface IBooking extends Booking {
  package: Package;
}

interface BookingClientProps {
  bookings: IBooking[];
}

export function BookingClient({ bookings }: BookingClientProps) {
  const formattedBookingArray: BookingColumn[] = bookings.reduce<
    BookingColumn[]
  >((acc, user) => {
    const { id, total, package: package1, users } = user;
    acc.push({
      id,
      total,
      package: package1.name,
      users: formatArrayToString(users),
    });
    return acc;
  }, []);

  return (
    <div>
      <DataTable columns={columns} data={formattedBookingArray} />
    </div>
  );
}
