import { City, Train } from "@prisma/client";
import { Train as TrainColumn, columns } from "./columns";
import { DataTable } from "./data-table";

interface ITrain extends Train {
  destination: City;
  source: City;
}

interface TrainClientProps {
  trains: ITrain[];
}

export function TrainClient({ trains }: TrainClientProps) {
  const formattedTrainArray: TrainColumn[] = trains.reduce<TrainColumn[]>(
    (acc, train) => {
      const {
        id,
        arrivalTime,
        departureTime,
        destination,
        price,
        source,
        trainNumber,
        name,
      } = train;
      acc.push({
        id,
        arrivalTime,
        name,
        departureTime,
        destination: destination.name,
        price,
        source: source.name,
        trainNumber,
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
