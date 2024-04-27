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
import { City as CityColumn } from "./columns";
import { CityDeleteButton } from "../(routes)/[cityId]/_components/remove-button";
import Link from "next/link";

type CityOprationsProps = {
  data: CityColumn;
};

const CityOprations: React.FC<CityOprationsProps> = ({ data }) => {
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
          <Link href={`/dashboard/city/${data.id}`}>
            <Icons.edit className="h-4 w-4 mr-2" />
            edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <CityDeleteButton cityId={data.id} variant="ghost" className="w-full">
            <Icons.trash className="h-4 w-4 mr-2" />
            Delete
          </CityDeleteButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { CityOprations };
