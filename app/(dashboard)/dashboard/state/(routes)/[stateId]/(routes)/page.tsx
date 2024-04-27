import { DashboardHeader } from "@/components/header";
import { StateForm } from "../_components/form";
import { db } from "@/lib/db";
import { StateDeleteButton } from "../_components/remove-button";
import { Icons } from "@/components/icons";

interface StatePageProps {
  params: {
    stateId: string;
  };
}

export default async function StatePage({ params }: StatePageProps) {
  const state = await db.state.findFirst({
    where: {
      id: params.stateId,
    },
  });

  return (
    <>
      <DashboardHeader heading={`${state ? "Update" : "Create"} State`}>
        {state && (
          <StateDeleteButton variant="destructive" stateId={state.id}>
            <Icons.trash />
          </StateDeleteButton>
        )}
      </DashboardHeader>
      <StateForm state={state} />
    </>
  );
}
