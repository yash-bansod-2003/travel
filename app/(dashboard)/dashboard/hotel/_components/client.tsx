import { City, Hotel } from "@prisma/client";
import { Hotel as HotelColumn, columns } from "./columns";
import { DataTable } from "./data-table";

interface IHotel extends Hotel {
  city: City;
}

interface TrainClientProps {
  hotels: IHotel[];
}

export function HotelClient({ hotels }: TrainClientProps) {
  const formattedHotelArray: HotelColumn[] = hotels.reduce<HotelColumn[]>(
    (acc, hotel) => {
      const { id, name, city } = hotel;
      acc.push({
        id,
        name,
        city: city.name,
      });
      return acc;
    },
    [],
  );

  return (
    <div>
      <DataTable columns={columns} data={formattedHotelArray} />
    </div>
  );
}
