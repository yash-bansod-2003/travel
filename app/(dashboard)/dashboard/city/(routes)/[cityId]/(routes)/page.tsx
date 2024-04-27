import { DashboardHeader } from "@/components/header";
import { CityForm } from "../_components/form";
import { db } from "@/lib/db";
import { CityDeleteButton } from "../_components/remove-button";
import { Icons } from "@/components/icons";

interface CityPageProps {
  params: {
    cityId: string;
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const city = await db.city.findFirst({
    where: {
      id: params.cityId,
    },
  });

  const states = await db.state.findMany();

  return (
    <>
      <DashboardHeader heading={`${city ? "Update" : "Create"} City`}>
        {city && (
          <CityDeleteButton variant="destructive" cityId={city.id}>
            <Icons.trash />
          </CityDeleteButton>
        )}
      </DashboardHeader>
      <CityForm city={city} states={states} />
    </>
  );
}
