import { Icons } from "@/components/icons";
import { Bus, Step } from "@prisma/client";

interface BusBoxProps {
  bus: Bus;
  step: Step;
}

export function BusBox({ bus, step }: BusBoxProps) {
  return (
    <div className="w-full my-2 border p-4 flex">
      <div className="w-12">
        <Icons.bus className="text-yellow-500" />
      </div>
      <div className="flex-1 flex flex-col">
        <p className="mb-4 text-yellow-400">{step.days}</p>
        <p>
          Bus Number : <strong>{bus.busNumber}</strong>
        </p>
        <p>
          Departure Time : <strong>{bus.departureTime}</strong>
        </p>
        <p>
          arrival Time : <strong>{bus.departureTime}</strong>
        </p>
        <p>Price (per ticket) : {bus.price}</p>
      </div>
    </div>
  );
}
