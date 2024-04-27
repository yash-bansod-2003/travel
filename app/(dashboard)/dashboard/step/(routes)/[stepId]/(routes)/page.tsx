import { DashboardHeader } from "@/components/header";
import { StepForm } from "../_components/form";
import { db } from "@/lib/db";
import { StepDeleteButton } from "../_components/remove-button";
import { Icons } from "@/components/icons";

interface RoomPageProps {
  params: {
    stepId: string;
  };
}

export default async function RoomPage({ params }: RoomPageProps) {
  const step = await db.step.findFirst({
    where: {
      id: params.stepId,
    },
  });

  const packages = await db.package.findMany();
  const hotels = await db.hotel.findMany({
    include: {
      city: true,
    },
  });
  const trains = await db.train.findMany({
    include: {
      source: true,
      destination: true,
    },
  });
  const buses = await db.bus.findMany({
    include: {
      source: true,
      destination: true,
    },
  });

  return (
    <>
      <DashboardHeader heading={`${step ? "Update" : "Create"} Step`}>
        {step && (
          <StepDeleteButton variant="destructive" stepId={step.id}>
            <Icons.trash />
          </StepDeleteButton>
        )}
      </DashboardHeader>
      <StepForm
        step={step}
        hotels={hotels}
        buses={buses}
        trains={trains}
        packages={packages}
      />
    </>
  );
}
