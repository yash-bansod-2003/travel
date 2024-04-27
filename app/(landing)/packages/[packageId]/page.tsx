import { db } from "@/lib/db";
import { TrainBox } from "../_components/train-box";
import { HotelBox } from "../_components/hotel-box";
import { BusBox } from "../_components/bus-box";
import { Wrapper } from "../_components/wrapper";

interface PackagePageProps {
  params: {
    packageId: string;
  };
}

export default async function PackagePage({ params }: PackagePageProps) {
  const package1 = await db.package.findFirst({
    where: {
      id: params.packageId,
    },
    include: {
      cities: true,
      steps: {
        include: {
          bus: true,
          hotel: true,
          train: true,
        },
      },
    },
  });

  const booking = await db.booking.findFirst({
    where: {
      packageId: package1?.id,
    },
  });

  return package1 && <Wrapper package1={package1} booking={booking}></Wrapper>;
}
