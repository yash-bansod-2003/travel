import { Bus } from "@prisma/client";
import { Bus as BusColumn, columns } from "./columns";
import { DataTable } from "./data-table";

interface BusClientProps {
  buses: Bus[];
}

export function BusClient({ buses }: BusClientProps) {
  const formattedBusArray: BusColumn[] = buses.reduce<BusColumn[]>(
    (acc, user) => {
      const {
        id,
        arrivalTime,
        departureTime,
        destination,
        price,
        source,
        busNumber,
      } = user;
      acc.push({
        id,
        arrivalTime,
        departureTime,
        destination,
        price,
        source,
        busNumber,
      });
      return acc;
    },
    [],
  );

  return (
    <div>
      <DataTable columns={columns} data={formattedBusArray} />
    </div>
  );
}
