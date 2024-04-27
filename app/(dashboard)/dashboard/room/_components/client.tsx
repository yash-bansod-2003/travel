import { Room } from "@prisma/client";
import { Room as RoomColumn, columns } from "./columns";
import { DataTable } from "./data-table";

interface RoomClientProps {
  rooms: Room[];
}

export function RoomClient({ rooms }: RoomClientProps) {
  const formattedTrainArray: RoomColumn[] = rooms.reduce<RoomColumn[]>(
    (acc, room) => {
      const { id, capacity, price, roomNumber } = room;
      acc.push({
        id,
        capacity,
        roomNumber,
        price,
      });
      return acc;
    },
    [],
  );

  return (
    <div>
      <DataTable columns={columns} data={formattedTrainArray} />
    </div>
  );
}
