import { City, Package } from "@prisma/client";
import { DisplayCard } from "./display-card";
import { getUniquePackages } from "@/lib/utils";

interface IPackage extends Package {
  cities: City[];
}

interface LandingClientProps {
  packages: IPackage[];
}

export function LandingClient({ packages }: LandingClientProps) {
  return (
    <div className="grid grid-cols-3 gap-10">
      {getUniquePackages(packages).map((package1, index) => (
        <DisplayCard key={index} package1={package1} />
      ))}
    </div>
  );
}
