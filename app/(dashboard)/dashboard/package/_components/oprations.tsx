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
import { Package as PackageColumn } from "./columns";
import { PackageDeleteButton } from "../(routes)/[packageId]/_components/remove-button";
import Link from "next/link";

type TrainOprationsProps = {
  data: PackageColumn;
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
          <Link href={`/dashboard/package/${data.id}`}>
            <Icons.edit className="h-4 w-4 mr-2" />
            edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <PackageDeleteButton
            packageId={data.id}
            variant="ghost"
            className="w-full"
          >
            <Icons.trash className="h-4 w-4 mr-2" />
            Delete
          </PackageDeleteButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TrainOprations };
