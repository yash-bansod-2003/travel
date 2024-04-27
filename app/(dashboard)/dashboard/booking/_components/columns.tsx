"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Booking = {
  id: string;
  users: string;
  package: string;
  total: number;
};

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "users",
    header: "Users",
  },
  {
    accessorKey: "package",
    header: "Package",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
];
