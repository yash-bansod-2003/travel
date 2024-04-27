import { City, Package } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { formatCityNames } from "@/lib/utils";

interface IPackage extends Package {
  cities: City[];
}

interface DisplayCardProps {
  package1: IPackage;
}

export function DisplayCard({ package1 }: DisplayCardProps) {
  return (
    <Card>
      <CardHeader>
        <div>
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <Image
              src={package1.image}
              alt="Photo by Drew Beamer"
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
        <CardTitle>{package1.name}</CardTitle>
        <CardDescription>{package1.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Cities : {formatCityNames(package1.cities)}</p>
        <p>Estimated price : {package1.price}</p>
        <p>Tour Days : {package1.duration}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/packages/${package1.id}`} className={buttonVariants()}>
          <Icons.bookings className="h-4 w-4 mr-2" />
          Book The Package
        </Link>
      </CardFooter>
    </Card>
  );
}
