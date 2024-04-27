import { DashboardHeader } from "@/components/header";
import { RoomForm } from "../_components/form";
import { db } from "@/lib/db";
import { RoomDeleteButton } from "../_components/remove-button";
import { Icons } from "@/components/icons";

interface RoomPageProps {
  params: {
    roomId: string;
  };
}

export default async function RoomPage({ params }: RoomPageProps) {
  const room = await db.room.findFirst({
    where: {
      id: params.roomId,
    },
  });

  const hotels = await db.hotel.findMany();

  return (
    <>
      <DashboardHeader heading={`${room ? "Update" : "Create"} Room`}>
        {room && (
          <RoomDeleteButton variant="destructive" roomId={room.id}>
            <Icons.trash />
          </RoomDeleteButton>
        )}
      </DashboardHeader>
      <RoomForm room={room} hotels={hotels} />
    </>
  );
}
