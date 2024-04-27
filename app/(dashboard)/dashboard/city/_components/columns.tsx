"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CityOprations } from "./oprations";

export type City = {
  id: string;
  name: string;
};

export const columns: ColumnDef<City>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CityOprations data={row.original} />,
  },
];
