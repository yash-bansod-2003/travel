"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TrainOprations } from "./oprations";

export type Package = {
  id: string;
  name: string;
  cities: string;
  price: number;
};

export const columns: ColumnDef<Package>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "cities",
    header: "Cities",
  },
  {
    accessorKey: "price",
    header: "Estimated price",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <TrainOprations data={row.original} />,
  },
];
