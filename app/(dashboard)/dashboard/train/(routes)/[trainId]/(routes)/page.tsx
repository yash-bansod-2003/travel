import { DashboardHeader } from "@/components/header";
import { TrainForm } from "../_components/form";
import { db } from "@/lib/db";
import { TrainDeleteButton } from "../_components/remove-button";
import { Icons } from "@/components/icons";

interface TrainPageProps {
  params: {
    trainId: string;
  };
}

export default async function TrainPage({ params }: TrainPageProps) {
  const train = await db.train.findFirst({
    where: {
      id: params.trainId,
    },
  });

  const cities = await db.city.findMany();

  return (
    <>
      <DashboardHeader heading={`${train ? "Update" : "Create"} Train`}>
        {train && (
          <TrainDeleteButton variant="destructive" trainId={train.id}>
            <Icons.trash />
          </TrainDeleteButton>
        )}
      </DashboardHeader>
      <TrainForm train={train} cities={cities} />
    </>
  );
}
