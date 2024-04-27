import { City } from "@prisma/client";
import { City as CityColumn, columns } from "./columns";
import { DataTable } from "./data-table";

interface CityClientProps {
  cities: City[];
}

export function CityClient({ cities }: CityClientProps) {
  const formattedCityArray: CityColumn[] = cities.reduce<CityColumn[]>(
    (acc, city) => {
      const { id, name } = city;
      acc.push({
        id,
        name,
      });
      return acc;
    },
    [],
  );

  return (
    <div>
      <DataTable columns={columns} data={formattedCityArray} />
    </div>
  );
}
