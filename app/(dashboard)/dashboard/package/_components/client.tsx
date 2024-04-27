import { City, Package, Train } from "@prisma/client";
import { Package as PackageColumn, columns } from "./columns";
import { DataTable } from "./data-table";
import { formatCityNames } from "@/lib/utils";

interface IPackage extends Package {
  cities: City[];
}

interface PackageClientProps {
  packages: IPackage[];
}

export function PackageClient({ packages }: PackageClientProps) {
  const formattedPackageArray: PackageColumn[] = packages.reduce<
    PackageColumn[]
  >((acc, package1) => {
    const { id, name, price, cities, duration } = package1;
    acc.push({
      id,
      name: `${name}-${duration}`,
      price,
      cities: formatCityNames(cities),
    });
    return acc;
  }, []);

  return (
    <div>
      <DataTable columns={columns} data={formattedPackageArray} />
    </div>
  );
}
