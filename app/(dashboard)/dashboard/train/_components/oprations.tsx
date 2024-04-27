"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Train as TrainColumn } from "./columns";
import { TrainDeleteButton } from "../(routes)/[trainId]/_components/remove-button";
import Link from "next/link";

type TrainOprationsProps = {
  data: TrainColumn;
};

const TrainOprations: React.FC<TrainOprationsProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams<{ storeId: string }>();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <Icons.more className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/train/${data.id}`}>
            <Icons.edit className="h-4 w-4 mr-2" />
            edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <TrainDeleteButton
            trainId={data.id}
            variant="ghost"
            className="w-full"
          >
            <Icons.trash className="h-4 w-4 mr-2" />
            Delete
          </TrainDeleteButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TrainOprations };
