"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StepOprations } from "./oprations";

export type Step = {
  id: string;
  order: number;
  package: string;
};

export const columns: ColumnDef<Step>[] = [
  {
    accessorKey: "order",
    header: "Order",
  },
  {
    accessorKey: "package",
    header: "Package",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <StepOprations data={row.original} />,
  },
];
