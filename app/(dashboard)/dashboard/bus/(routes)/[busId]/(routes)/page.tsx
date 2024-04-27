import { DashboardHeader } from "@/components/header";
import { BusForm } from "../_components/form";
import { db } from "@/lib/db";
import { BusDeleteButton } from "../_components/remove-button";
import { Icons } from "@/components/icons";

interface BusPageProps {
  params: {
    busId: string;
  };
}

export default async function BusPage({ params }: BusPageProps) {
  const bus = await db.bus.findFirst({
    where: {
      id: params.busId,
    },
  });

  const cities = await db.city.findMany();

  return (
    <>
      <DashboardHeader heading={`${bus ? "Update" : "Create"} Bus`}>
        {bus && (
          <BusDeleteButton variant="destructive" busId={bus.id}>
            <Icons.trash />
          </BusDeleteButton>
        )}
      </DashboardHeader>
      <BusForm bus={bus} cities={cities} />
    </>
  );
}
