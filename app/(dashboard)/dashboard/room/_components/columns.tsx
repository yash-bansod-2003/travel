"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RoomOprations } from "./oprations";

export type Room = {
  id: string;
  roomNumber: string;
  capacity: number;
  price: number;
};

export const columns: ColumnDef<Room>[] = [
  {
    accessorKey: "roomNumber",
    header: "Room Number",
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <RoomOprations data={row.original} />,
  },
];
