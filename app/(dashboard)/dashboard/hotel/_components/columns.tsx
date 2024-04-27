"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TrainOprations } from "./oprations";

export type Hotel = {
  id: string;
  name: string;
  city: string;
};

export const columns: ColumnDef<Hotel>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <TrainOprations data={row.original} />,
  },
];
