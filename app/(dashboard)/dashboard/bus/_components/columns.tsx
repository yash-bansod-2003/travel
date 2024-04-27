"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BusOprations } from "./oprations";

export type Bus = {
  id: string;
  busNumber: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
};

export const columns: ColumnDef<Bus>[] = [
  {
    accessorKey: "busNumber",
    header: "Bus Number",
  },
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "arrivalTime",
    header: "Arrival Time",
  },
  {
    accessorKey: "departureTime",
    header: "Departure Time",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <BusOprations data={row.original} />,
  },
];
