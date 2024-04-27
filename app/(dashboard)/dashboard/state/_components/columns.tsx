"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StateOprations } from "./oprations";

export type State = {
  id: string;
  name: string;
};

export const columns: ColumnDef<State>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <StateOprations data={row.original} />,
  },
];
