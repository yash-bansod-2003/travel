import { Icons } from "@/components/icons";
import { Step, Train } from "@prisma/client";

interface TrainBoxProps {
  train: Train;
  step: Step;
}

export function TrainBox({ train, step }: TrainBoxProps) {
  return (
    <div className="w-full my-2 border p-4 flex">
      <div className="w-12">
        <Icons.train className="text-green-500" />
      </div>
      <div className="flex-1 flex flex-col">
        <p className="mb-4 text-green-400">{step.days}</p>
        <p>
          Train Number : <strong>{train.trainNumber}</strong>
        </p>
        <p>
          Departure Time : <strong>{train.departureTime}</strong>
        </p>
        <p>
          arrival Time : <strong>{train.departureTime}</strong>
        </p>
        <p>Price (per ticket) : {train.price}</p>
      </div>
    </div>
  );
}
