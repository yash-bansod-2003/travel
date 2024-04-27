import { DashboardHeader } from "@/components/header";
import { HotelForm } from "../_components/form";
import { db } from "@/lib/db";
import { HotelDeleteButton } from "../_components/remove-button";
import { Icons } from "@/components/icons";

interface HotelPageProps {
  params: {
    hotelId: string;
  };
}

export default async function HotelPage({ params }: HotelPageProps) {
  const hotel = await db.hotel.findFirst({
    where: {
      id: params.hotelId,
    },
  });

  const cities = await db.city.findMany();

  return (
    <>
      <DashboardHeader heading={`${hotel ? "Update" : "Create"} Hotel`}>
        {hotel && (
          <HotelDeleteButton variant="destructive" hotelId={hotel.id}>
            <Icons.trash />
          </HotelDeleteButton>
        )}
      </DashboardHeader>
      <HotelForm hotel={hotel} cities={cities} />
    </>
  );
}
