"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TrainOprations } from "./oprations";

export type Train = {
  id: string;
  trainNumber: string;
  name: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
};

export const columns: ColumnDef<Train>[] = [
  {
    accessorKey: "trainNumber",
    header: "Train Number",
  },
  {
    accessorKey: "name",
    header: "Name",
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
    cell: ({ row }) => <TrainOprations data={row.original} />,
  },
];
